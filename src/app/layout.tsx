import type { Metadata } from "next";
import { Montserrat, Exo_2, Inter } from "next/font/google";
import "./globals.css";
import PublicLayout from '@/layouts/PublicLayout';
import { ThemeProvider } from '@/components/ThemeProvider';

// Geist fonts removed

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  weight: ["100", "900"],
});

const exo2 = Exo_2({
  subsets: ["latin"],
  variable: "--font-exo2",
  weight: ["100", "400", "500", "600", "700", "900"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["100", "300", "400", "500", "600", "700", "900"],
});

export const metadata: Metadata = {
  title: "Digital Products SaaS",
  description: "Platform for selling digital products with integrated payment gateway",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className={`min-h-screen bg-white dark:bg-dark-800 ${montserrat.variable} ${exo2.variable} ${inter.variable} antialiased`}>
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
