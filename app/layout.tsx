import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Training Algorithm",
  description: "Training algorithm application",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
