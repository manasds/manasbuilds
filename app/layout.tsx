import type { Metadata } from "next";
import { Geist, Geist_Mono, Space_Mono } from "next/font/google";
import "./globals.css";
import { Nav } from "../components/nav";
import { VideoBackground } from "../components/VideoBackground";
import { ThemeProvider } from "../providers/themeprovider";
import Script from "next/script";

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
  metadataBase: new URL("https://manasbuilds.me"),
  title: {
    default: "Manas - Full Stack Developer",
    template: "%s | Manas",
  },
  description:
    "Hey this is manas, I love learning about engineering and tech, and also building for it ",
  openGraph: {
    title: "Manas | Full-Stack Developer",
    description: "Building modern, type-safe web applications.",
    url: "https://manasbuilds.me",
    siteName: "Manas Builds",
    locale: "en_US",
    type: "website",
    images: [
      { url: "/manasbuildshome.png", alt: "manas builds portfolio homepage" },
    ],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  twitter: {
    title: "manas",
    card: "summary_large_image",
    creator: "@manastwts",
    site: "@manastwts",
    description:
      "Full Stack Developer specializing in React, Next.js, TypeScript & Node.js.",
    images: ["/manasbuildshome.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${spaceMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <VideoBackground />
          <Nav />
          <main className="text-foreground">{children}</main>
        </ThemeProvider>
        {process.env.NODE_ENV === "production" && (
          <>
            <Script
              src="https://www.googletagmanager.com/gtag/js?id=G-BN93LWZDMC"
              strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
              {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-BN93LWZDMC');
            `}
            </Script>
          </>
        )}
      </body>
    </html>
  );
}
