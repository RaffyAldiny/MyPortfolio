import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";

import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import theme from "@/theme";
import SiteHeader from "@/components/SiteHeader";
import { HeaderThemeProvider } from "@/context/HeaderTheme"; // <--- IMPORT

const poppins = Poppins({
  weight: ["300", "400", "500", "600", "700", "800"],
  subsets: ["latin"],
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
            
            {/* WRAP APP IN PROVIDER */}
            <HeaderThemeProvider>
               <SiteHeader />
               <main>{children}</main>
            </HeaderThemeProvider>

          </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}