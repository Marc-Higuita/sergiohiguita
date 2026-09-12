import './globals.css';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className="scroll-smooth">
      <body className="w-full min-h-screen bg-[#E8F4FC] text-[#0D0D0D] antialiased">
        {children}
      </body>
    </html>
  );
}