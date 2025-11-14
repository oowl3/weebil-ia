import type { Metadata } from "next";
import { Manrope, Instrument_Sans } from "next/font/google";
import "./globals.css";

const manrope = Manrope({
  subsets: ["latin"],
  display: "swap", 
  variable: "--font-manrope", 
});


const instrumentSans = Instrument_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-instrument-sans", 
});

export const metadata: Metadata = {
  title: "Weebil - AracnoScan", 
  description: "Identificación de arácnidos con IA",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body
        className={`${manrope.variable} ${instrumentSans.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}