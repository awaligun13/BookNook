//i put my navbar in here so it shows up on every page.
//I also wrapped all my non public pages in the blocked page function, which covers the private pages with the sign in popup

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
