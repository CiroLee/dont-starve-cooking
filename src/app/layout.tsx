import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: "烹饪大全 饥荒 | don't starve cooking ",
  description: '饥荒联机版 烹饪大全 舒适的UI交互',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
