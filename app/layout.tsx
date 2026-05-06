import type { Metadata } from "next";
import { Manrope, Instrument_Sans } from "next/font/google";
import "./globals.css";
import Footer from "./components/footer";


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
  title: "Weebil", 
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
        <Footer />
      </body>
    </html>
  );
}