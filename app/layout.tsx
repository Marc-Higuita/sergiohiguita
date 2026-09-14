import type { Metadata } from "next";
import "./globals.css";
import Preloader from "@/app/components/Preloader"; 
import MobileAlert from "@/app/components/MobileAlert";

export const metadata: Metadata = {
  title: "Sergio Higuita | Official Portfolio",
  description: "Portafolio oficial de Sergio Andrés Higuita",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className="bg-[#0B0F17] text-white antialiased">
        <Preloader />
        <MobileAlert />
        {children}
      </body>
    </html>
  );
}