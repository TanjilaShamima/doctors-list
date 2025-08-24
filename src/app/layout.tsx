import { TopNav } from "@/@components/layout/TopNav";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Header } from "@/@components/common/Header";
import { Footer } from "@/@components/common/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Tech.care | Patient Dashboard",
  description: "Patient Dashboard for Tech.care",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen`}
      >
        <div className="mx-auto max-w-[1568px] flex flex-col min-h-screen px-3 md:px-6 py-3 gap-4">
          <Header>
            <TopNav />
          </Header>
          <div className="flex-1 pb-6">{children}</div>
          <Footer />
        </div>
      </body>
    </html>
  );
}
