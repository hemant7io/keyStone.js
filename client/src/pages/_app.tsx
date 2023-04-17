import Header from "../components/header";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import AuthContextProvider from "../lib/auth";
export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <AuthContextProvider>
        <Header />
        <div className="pt-[5 rem]">
          <Component {...pageProps} />
        </div>
      </AuthContextProvider>
    </>
  );
}
