import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Riyansh Amrit — Luxury Ayurvedic Formulations",
    template: "%s | Riyansh Amrit",
  },
  description:
    "Riyansh Amrit — authentic Ayurvedic juices, tonics, and supplements.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <header className="site-header">
          <Link href="/" className="brand">
            Riyansh Amrit
          </Link>
          <nav>
            <Link href="/store">Store</Link>
            <Link href="/login">Login</Link>
            <Link href="/cart">Cart</Link>
          </nav>
        </header>
        <main>{children}</main>
        <footer className="site-footer">
          © {new Date().getFullYear()} Riyansh Amrit
        </footer>
      </body>
    </html>
  );
}
