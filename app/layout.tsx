import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import PageContainer from "~/components/layout/pageContainer";
import Navbar from "~/components/layout/navbar";
import { Toaster } from "sonner";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} dark bg-slate-950 min-h-screen w-full`}>
        <Toaster position="bottom-right"/>
      <Navbar />
        <PageContainer>
        {children}
        </PageContainer>
      </body>
    </html>
  );
}
