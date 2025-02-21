import type { Metadata } from "next";
import { Open_Sans } from "next/font/google";

import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "react-hot-toast";

import Navbar from "@/components/Navbar";

import "@/styles/globals.css";

const openSans = Open_Sans({
  variable: "--font-open-sans",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Scrum Master",
  description: "Full stack scrum board application",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body
          className={`${openSans.className} bg-black text-white antialiased`}
        >
          <Navbar />
          <Toaster />
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
