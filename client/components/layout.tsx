import Head from "next/head";
import Navbar from "./Navbar";
import Footer from "./Footer";

export const siteTitle = "Next.js Sample Website";

export default function Layout({
  children,
  home,
}: {
  children: React.ReactNode;
  home?: boolean;
}) {
  /*
   * Added this to toggle the is-active className. See:
   *
   * https://bulma.io/documentation/components/navbar/#navbar-menu
   * https://github.com/jgthms/bulma/issues/856
   */

  return (
    <>
      <Head>
        <title>
          {siteTitle} {home ? "Homepage" : ""}
        </title>
        <meta name='viewport' content='width=device-width, initial-scale=1' />
      </Head>
      <header>
        <Navbar />
      </header>
      {children}
      <Footer />
    </>
  );
}
