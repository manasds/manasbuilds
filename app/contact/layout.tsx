import type { Metadata } from "next";

// The contact page is a client component, so its metadata lives here.
export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with Manas on GitHub, X (Twitter) or Cal.com to talk about projects, ideas or opportunities.",
  alternates: { canonical: "/contact" },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
