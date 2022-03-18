import type { AppProps } from "next/app";

import "../styles/globals.css";
import { Navbar } from "../components/shared";
import Head from "next/head";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Hospitatva</title>
        <link rel="icon" type="image/x-icon" href="/favicon.ico" />
      </Head>
      <Navbar />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
