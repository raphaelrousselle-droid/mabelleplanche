import { CartProvider } from "@/components/cart/CartProvider";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";

export default function ShopLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <CartProvider>
      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </div>
    </CartProvider>
  );
}
