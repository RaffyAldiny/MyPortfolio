import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import theme from "@/theme";

const poppins = localFont({
  src: [
    { path: "../public/fonts/Poppins-Regular.woff2", weight: "400", style: "normal" },
    { path: "../public/fonts/Poppins-Medium.woff2", weight: "500", style: "normal" },
    { path: "../public/fonts/Poppins-SemiBold.woff2", weight: "600", style: "normal" },
    { path: "../public/fonts/Poppins-Bold.woff2", weight: "700", style: "normal" },
    { path: "../public/fonts/Poppins-ExtraBold.woff2", weight: "800", style: "normal" },
    { path: "../public/fonts/Poppins-Black.woff2", weight: "900", style: "normal" },
  ],
  display: "swap",
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: "Rafael | Portfolio",
  description: "Computer Science Graduate & Full-Stack Developer",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={poppins.variable}>
      <body className="antialiased">
        <AppRouterCacheProvider>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <main>{children}</main>
          </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
