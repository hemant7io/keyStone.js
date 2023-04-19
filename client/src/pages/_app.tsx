import Header from "../components/header";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { ApolloProvider } from "@apollo/client";
import client from "../lib/apollo-client";
export default function App({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={client}>
      <Header />
      <div className="pt-[5rem]">
        <Component {...pageProps} />
      </div>
    </ApolloProvider>
  );
}
