import type { Metadata } from "next";
import "./globals.css";
export const metadata: Metadata = {
  title: "Bun Chat AI",
  description: "Prototype bun chat AI",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.png" />
      </head>
     <body>
        {children}
      </body>
    </html>
  );
}
