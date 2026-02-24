import { Outfit, JetBrains_Mono } from "next/font/google";
import Header from "@/components/layout/Header";
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
    <html lang="en" className={`${outfit.variable} ${jetbrains.variable}`}>
      <body className="font-display antialiased bg-bg text-t1 min-h-screen">
        <Header />
        <main className="max-w-6xl mx-auto px-4 sm:px-6 py-8">{children}</main>
      </body>
    </html>
  );
}
