import "../styles/globals.css";
import PageWithLayoutType from "../src/types/pageWithLayout";
import React from "react";

import "react-toastify/dist/ReactToastify.css";
import store from "../src/redux/store";
import { Provider } from "react-redux";
import Head from "next/head";

type AppLayoutProps = {
  Component: PageWithLayoutType;
  pageProps: any;
};

function MyApp({ Component, pageProps }: AppLayoutProps) {
  const Layout = Component.layout || ((children) => <>{children}</>);
  return (
    <Provider store={store}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Provider>
  );
}

export default MyApp;
