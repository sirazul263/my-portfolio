import "@/styles/globals.css";
import type { AppProps } from "next/app";
import "@fontsource/fira-code/index.css"; // All weights/styles
import Head from "next/head";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />
      </Head>
      <Component {...pageProps} />
    </>
  );
}
