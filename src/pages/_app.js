import "../styles/globals.css";
import Navbar from "../components/Navbar";
import { CartProvider } from "../contexts/CartContext";

export default function App({ Component, pageProps }) {
  return (
    <>
      <CartProvider>
        <Navbar />
        <Component {...pageProps} />
      </CartProvider>
    </>
  )
}
