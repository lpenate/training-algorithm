import "./globals.css";

export const metadata = {
  title: "Training Algorithm",
  description: "Training algorithm application",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
