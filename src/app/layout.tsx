import type { Metadata } from "next";
import { Inter } from "next/font/google";
import '../styles/global.css';
import { CartProvider } from "./context/CartContext";
import Navbar from "./components/navbar";
import Footer from "./components/footer";
import NavbarOffer from "./components/navbarOffer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Growthwell",
  description: "real love real care",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
      <CartProvider>
        <Navbar />
        <NavbarOffer />
        {children}
        <Footer />
      </CartProvider>
      </body>
    </html>
  );
}

