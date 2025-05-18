import "../styles/globals.css";
import Navbar from "../components/Navbar";
import { CartProvider } from "../contexts/CartContext";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Loader from "../components/Loader";

export default function App({ Component, pageProps }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const handleStart = () => {
      setLoading(true);
      document.body.style.overflow = 'hidden';
    };

    const handleStop = () => {
      setLoading(false);
      document.body.style.overflow = '';
    };

    router.events.on('routeChangeStart', handleStart);
    router.events.on('routeChangeComplete', handleStop);
    router.events.on('routeChangeError', handleStop);

    return () => {
      router.events.off('routeChangeStart', handleStart);
      router.events.off('routeChangeComplete', handleStop);
      router.events.off('routeChangeError', handleStop);
    };
  }, [router]);

  return (
    <>
      <CartProvider>
        <Navbar />
        {loading && <Loader />}
        <Component {...pageProps} />
      </CartProvider>
    </>
  )
}
