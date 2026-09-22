import Link from "next/link";
import "./globals.css";

export const metadata = {
  title: "Riyansh Amrit Admin",
  robots: { index: false, follow: false },
};

const NAV = [
  { href: "/", label: "Dashboard" },
  { href: "/products", label: "Products" },
  { href: "/categories", label: "Categories" },
  { href: "/orders", label: "Orders" },
  { href: "/customers", label: "Customers" },
  { href: "/coupons", label: "Coupons" },
  { href: "/transactions", label: "Transactions" },
  { href: "/activity", label: "Activity" },
  { href: "/login", label: "Login" },
];

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <aside className="sidebar">
          <strong>RA Admin</strong>
          <p className="sidebar-hint">:3050 · API backend</p>
          <nav>
            {NAV.map((item) => (
              <Link key={item.href} href={item.href}>
                {item.label}
              </Link>
            ))}
          </nav>
        </aside>
        <main className="content">{children}</main>
      </body>
    </html>
  );
}
