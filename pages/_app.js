import "@/styles/globals.css";
import Navbar from "./components/navbar";
import BlockedPage from "./components/BlockedPage";

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
        <BlockedPage>
          <Component {...pageProps} />
        </BlockedPage>
      )}
    </>
  );
}
