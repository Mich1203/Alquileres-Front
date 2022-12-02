import "../styles/globals.css";
import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import { createTheme, NextUIProvider } from "@nextui-org/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SSRProvider } from "@react-aria/ssr";
import { unstable_getServerSession } from "next-auth/next";
import { GetServerSideProps } from "next";
import { authOptions } from "./api/auth/[...nextauth]";

const client = new QueryClient();

const darkTheme = createTheme({
  type: "dark",
  theme: {
    colors: {
      // brand colors
      primary: "#082032",
      secondary: "#2C394B",
      tertiary: "#334756",
      clear: "#fff",
      popper: "#FF4C29",
      dark: "#01263f",
    },
    space: {},
    fonts: {},
  },
});

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  return (
    <SSRProvider>
      <SessionProvider session={session}>
        <QueryClientProvider client={client}>
          <NextUIProvider theme={darkTheme}>
            <Component {...pageProps} />
          </NextUIProvider>
        </QueryClientProvider>
      </SessionProvider>
    </SSRProvider>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await unstable_getServerSession(
    context.req,
    context.res,
    authOptions,
  );

  if (!session) {
    return {
      redirect: {
        destination: "/auth/login",
        permanent: false,
      },
    };
  }

  return {
    props: { session },
  };
};
