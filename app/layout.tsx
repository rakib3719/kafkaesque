import type { Metadata } from "next";
import { Cinzel, Playfair_Display, EB_Garamond } from "next/font/google";
import "./globals.css";

const cinzel = Cinzel({
  variable: "--font-cinzel",
  subsets: ["latin"],
  weight: ["400", "600", "700", "900"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
});

const ebGaramond = EB_Garamond({
  variable: "--font-garamond",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "THE EXISTENTIAL LABYRINTH — Kafkaesque Archives",
  description: "An immersive digital archive through Franz Kafka's 3 Canonical Chambers, Vintage Typewriter Studio, Manuscripts, and Existential Bureaucracy.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${cinzel.variable} ${playfair.variable} ${ebGaramond.variable} dark h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#0a0a0c] text-[#e5ded4] font-serif selection:bg-[#d4a359] selection:text-[#0a0a0c]">
        {children}
      </body>
    </html>
  );
}

