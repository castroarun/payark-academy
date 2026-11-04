import { Outfit, JetBrains_Mono } from "next/font/google";
import AppChrome from "@/components/layout/AppChrome";
import "./globals.css";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["400", "500", "600", "700"],
});

export const metadata = {
  title: "PayArk — From Zero to Payment Architect",
  description:
    "A structured, self-paced training academy for mastering enterprise payment systems. 44 modules, 4 certification levels, 32 weeks.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // suppressHydrationWarning: the LLM track sets data-llm-theme on <html> before React loads
    <html lang="en" className={`${outfit.variable} ${jetbrains.variable}`} suppressHydrationWarning>
      <body className="font-display antialiased bg-bg text-t1 min-h-screen">
        <AppChrome>{children}</AppChrome>
      </body>
    </html>
  );
}
