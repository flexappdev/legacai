import type { Metadata } from "next";
import "./globals.css";
import { Analytics } from "@/lib/analytics";

export const metadata: Metadata = {
  title: "Legacai — Your legacy, alive",
  description:
    "An AI agent trained on everything you choose to leave behind — documents, photographs, voice, journals, even your ChatGPT and Claude conversations.",
  openGraph: {
    title: "Legacai — Your legacy, alive",
    description: "Storage keeps your files. Legacai keeps you.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
