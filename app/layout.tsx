import type { Metadata } from "next";
import { Geist, Geist_Mono ,Space_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
}); 

const spaceMono = Space_Mono({
  variable: "--font-space-mono",
  subsets: ["latin"],
  weight: ["400", "700"], // Space Mono requires specific weights
});

export const metadata: Metadata = {
  title: "Manas Builds",
  description: "portfolio website for manas",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${spaceMono.variable} antialiased bg-foreground`}
      >
        <Navbar />
        {children}
      </body>
    </html>
  );
}
