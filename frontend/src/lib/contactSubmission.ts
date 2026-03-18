"use server";

import { Readable } from "node:stream";
import { google } from "googleapis";

const MAX_FILE_SIZE_BYTES = 5 * 1024 * 1024;
const ALLOWED_FILE_TYPES = new Set([
  "application/pdf",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "image/jpeg",
  "image/png",
  "image/webp",
  "text/plain",
]);

const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000;
const RATE_LIMIT_MAX = 4;

const rateLimitStore = new Map<string, { count: number; resetAt: number }>();

export type ContactSubmissionInput = {
  name: string;
  email: string;
  subject: string;
  message: string;
  timeline?: string;
  website?: string;
  attachment?: File | null;
  ipAddress: string;
  turnstileToken?: string | null;
};

type StoredAttachment = {
  url: string;
  name: string;
  mimeType: string;
  sizeBytes: number;
};

type GoogleConfig = {
  sheetsId: string;
  sheetName: string;
  driveFolderId: string;
};

function requireEnv(name: string) {
  const value = process.env[name]?.trim();
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value;
}

function getGoogleConfig(): GoogleConfig {
  return {
    sheetsId: requireEnv("GOOGLE_SHEETS_ID"),
    sheetName: process.env.GOOGLE_SHEET_NAME?.trim() || "Submissions",
    driveFolderId: requireEnv("GOOGLE_DRIVE_FOLDER_ID"),
  };
}

function getGoogleAuth() {
  const clientEmail = requireEnv("GOOGLE_SERVICE_ACCOUNT_EMAIL");
  const privateKey = requireEnv("GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY").replace(/\\n/g, "\n");

  return new google.auth.JWT({
    email: clientEmail,
    key: privateKey,
    scopes: [
      "https://www.googleapis.com/auth/drive.file",
      "https://www.googleapis.com/auth/spreadsheets",
    ],
  });
}

function assertStringLength(value: string, label: string, min: number, max: number) {
  const normalized = value.trim();
  if (normalized.length < min || normalized.length > max) {
    throw new Error(`${label} must be between ${min} and ${max} characters.`);
  }
}

function validateEmail(email: string) {
  const normalized = email.trim();
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalized)) {
    throw new Error("A valid email address is required.");
  }
}

function sanitizeFileName(name: string) {
  return name.replace(/[^\w.\-() ]+/g, "_").slice(0, 120) || "attachment";
}

function getClientKey(ipAddress: string) {
  return ipAddress || "anonymous";
}

function assertRateLimit(ipAddress: string) {
  const now = Date.now();
  const key = getClientKey(ipAddress);
  const current = rateLimitStore.get(key);

  if (!current || current.resetAt <= now) {
    rateLimitStore.set(key, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return;
  }

  if (current.count >= RATE_LIMIT_MAX) {
    throw new Error("Too many submissions from this network. Please try again later.");
  }

  rateLimitStore.set(key, { ...current, count: current.count + 1 });
}

export async function verifyTurnstileToken(token: string | null | undefined, ipAddress: string) {
  const secret = process.env.TURNSTILE_SECRET_KEY?.trim();
  if (!secret) return;

  if (!token) {
    throw new Error("Please complete the anti-spam challenge.");
  }

  const response = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      secret,
      response: token,
      remoteip: ipAddress,
    }),
  });

  const payload = (await response.json()) as { success?: boolean };
  if (!payload.success) {
    throw new Error("Challenge verification failed. Please retry.");
  }
}

async function uploadAttachment(auth: ReturnType<typeof getGoogleAuth>, attachment: File) {
  if (!ALLOWED_FILE_TYPES.has(attachment.type)) {
    throw new Error("Unsupported file type. Use PDF, DOCX, TXT, PNG, JPG, or WEBP.");
  }

  if (attachment.size > MAX_FILE_SIZE_BYTES) {
    throw new Error("Attachment is too large. Maximum size is 5 MB.");
  }

  const { driveFolderId } = getGoogleConfig();
  const drive = google.drive({ version: "v3", auth });
  const fileName = `${Date.now()}-${sanitizeFileName(attachment.name)}`;
  const buffer = Buffer.from(await attachment.arrayBuffer());

  const created = await drive.files.create({
    requestBody: {
      name: fileName,
      parents: [driveFolderId],
    },
    media: {
      mimeType: attachment.type,
      body: Readable.from(buffer),
    },
    fields: "id,name,webViewLink",
  });

  const fileId = created.data.id;
  if (!fileId) {
    throw new Error("Attachment upload failed.");
  }

  await drive.permissions.create({
    fileId,
    requestBody: {
      role: "reader",
      type: "anyone",
    },
  });

  return {
    url: created.data.webViewLink || `https://drive.google.com/file/d/${fileId}/view`,
    name: created.data.name || fileName,
    mimeType: attachment.type,
    sizeBytes: attachment.size,
  } satisfies StoredAttachment;
}

async function appendSubmission(
  auth: ReturnType<typeof getGoogleAuth>,
  submission: ContactSubmissionInput,
  attachment: StoredAttachment | null
) {
  const { sheetsId, sheetName } = getGoogleConfig();
  const sheets = google.sheets({ version: "v4", auth });
  const now = new Date().toISOString();

  await sheets.spreadsheets.values.append({
    spreadsheetId: sheetsId,
    range: `${sheetName}!A:J`,
    valueInputOption: "USER_ENTERED",
    requestBody: {
      values: [
        [
          now,
          submission.name.trim(),
          submission.email.trim(),
          submission.subject.trim(),
          submission.timeline?.trim() || "",
          submission.message.trim(),
          attachment?.name || "",
          attachment?.url || "",
          submission.ipAddress,
          "new",
        ],
      ],
    },
  });
}

export async function storeContactSubmission(submission: ContactSubmissionInput) {
  assertRateLimit(submission.ipAddress);

  if (submission.website?.trim()) {
    throw new Error("Spam check failed.");
  }

  assertStringLength(submission.name, "Name", 2, 80);
  validateEmail(submission.email);
  assertStringLength(submission.subject, "Subject", 4, 120);
  assertStringLength(submission.message, "Message", 20, 2400);

  if (submission.timeline) {
    assertStringLength(submission.timeline, "Timeline", 2, 80);
  }

  await verifyTurnstileToken(submission.turnstileToken, submission.ipAddress);

  const auth = getGoogleAuth();
  await auth.authorize();

  const attachment =
    submission.attachment && submission.attachment.size > 0
      ? await uploadAttachment(auth, submission.attachment)
      : null;

  await appendSubmission(auth, submission, attachment);

  return {
    attachmentUrl: attachment?.url ?? null,
  };
}
