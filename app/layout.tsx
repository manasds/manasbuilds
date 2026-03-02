import type { Metadata } from "next";
import { Geist, Geist_Mono, Space_Mono } from "next/font/google";
import "./globals.css";
import {Nav} from "../components/nav";
import { ThemeProvider } from "../providers/themeprovider";
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
  description: "Hey this is manas , I love learning about engineering and tech , and also building for it ",
  openGraph: {
    title: 'Manas | Full-Stack Developer',
    description: 'Building modern, type-safe web applications.',
    url: 'https://manasbuilds.me',
    siteName: 'Manas Builds',
    locale: 'en_US',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${spaceMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Nav />
          <main className="bg-background text-foreground">
            {children}
            </main>
        </ThemeProvider>
      </body>
    </html>
  );
}
