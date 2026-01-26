// frontend/app/layout.tsx
import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";

import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import theme from "@/theme";
import SiteHeader from "@/components/SiteHeader";

// Configure Poppins with a CSS variable
// We include 800 weight if you want extra bold for the name
const poppins = Poppins({
  weight: ["300", "400", "500", "600", "700", "800"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-poppins", // This allows us to use it in our MUI theme
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
          {/* We pass the font variable through the theme provider */}
          <ThemeProvider theme={theme}>
            {/* CssBaseline kicks off the MUI reset and applies our theme font */}
            <CssBaseline />
            <SiteHeader />
            <main>{children}</main>
          </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}