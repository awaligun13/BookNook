import "@/styles/globals.css";
import Navbar from "./components/navbar";
import ProtectedRoute from "./components/ProtectedRoute";

export default function App({ Component, pageProps, router }) {

  const publicPaths = ["/"];
  const isPublic = publicPaths.includes(router.pathname);

  return (
    <>
      <title>BookNook</title>
      <Navbar />
      {isPublic ? (
        <Component {...pageProps} />
      ) : (
        <ProtectedRoute>
          <Component {...pageProps} />
        </ProtectedRoute>
      )}
    </>
  );
}
