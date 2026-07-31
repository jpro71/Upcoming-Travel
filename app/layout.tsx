import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Upcoming Travel",
  description: "Shared Family Travel Dashboard",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}