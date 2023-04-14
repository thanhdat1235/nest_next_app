import "../styles/globals.css";
import PageWithLayoutType from "../src/types/pageWithLayout";
import React from "react";

import "react-toastify/dist/ReactToastify.css";
import { Provider } from "react-redux";
import Head from "next/head";
import { persistor, store } from '../src/redux/store';
import { PersistGate } from 'redux-persist/integration/react';

type AppLayoutProps = {
  Component: PageWithLayoutType;
  pageProps: any;
};

function MyApp({ Component, pageProps }: AppLayoutProps) {
  const Layout = Component.layout || ((children) => <>{children}</>);
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
      </PersistGate>
    </Provider>
  );
}

export default MyApp;
