import { Poppins } from "next/font/google";
import "./globals.css";
import PageContainer from "~/components/layout/pageContainer";
import Navbar from "~/components/layout/navbar";
import { Toaster } from "sonner";
import { BackgroundGradientAnimation } from "~/components/ui/backgorund-gradient-animation";
import { cn } from "~/lib/utils";
const inter = Poppins({ subsets: ["latin"], weight: "400" });
import type { Metadata, Viewport } from "next";

const APP_NAME = "Binsense";
const APP_DEFAULT_TITLE = "binsense";
const APP_TITLE_TEMPLATE = "%s - Binsesnse";
const APP_DESCRIPTION = "Lightest trash classifier";

export const metadata: Metadata = {
  applicationName: APP_NAME,
  title: {
    default: APP_DEFAULT_TITLE,
    template: APP_TITLE_TEMPLATE,
  },
  description: APP_DESCRIPTION,
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: APP_DEFAULT_TITLE,
    // startUpImage: [],
  },
  formatDetection: {
    telephone: false,
  },
  openGraph: {
    type: "website",
    siteName: APP_NAME,
    title: {
      default: APP_DEFAULT_TITLE,
      template: APP_TITLE_TEMPLATE,
    },
    description: APP_DESCRIPTION,
  },
  twitter: {
    card: "summary",
    title: {
      default: APP_DEFAULT_TITLE,
      template: APP_TITLE_TEMPLATE,
    },
    description: APP_DESCRIPTION,
  },
};

export const viewport: Viewport = {
  themeColor: "#FFFFFF",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} dark bg-gradient-to-br from-purple-600 to-pink-600 bg-blur min-h-screen w-full`}
      >
        <Toaster position="bottom-right" />
        <BackgroundGradientAnimation />
        <Navbar />
        <PageContainer>{children}</PageContainer>
      </body>
    </html>
  );
}
