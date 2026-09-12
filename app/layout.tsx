import type { Metadata } from "next";
import "./globals.css";
import Preloader from "@/app/components/Preloader"; 

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
        <Preloader /> {/* <--- Lo colocamos aquí para que cubra toda la web y cambios de ruta */}
        {children}
      </body>
    </html>
  );
}