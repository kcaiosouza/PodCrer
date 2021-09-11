import Head from 'next/head';
import React, { useState } from 'react';
import { ThemeProvider } from 'styled-components';
//import usePersistedState from '../utils/usePersistedState';

import light from '../styles/themes/light';
import dark from '../styles/themes/dark';

import { Header } from '../components/Header';
import { Player } from '../components/Player';


import GlobalStyle from '../styles/global';
import { AppComponent } from '../styles/app';
import { PLayerContextProvider } from '../contexts/PlayerContext';

//NProgress config
import Router from 'next/router';
import NProgress from 'nprogress';


function MyApp({ Component, pageProps }) {

  NProgress.configure({showSpinner: false});
  Router.events.on("routeChangeStart", () => NProgress.start());
  Router.events.on("routeChangeComplete", () => NProgress.done());
  Router.events.on("routeChangeError", () => NProgress.done());

  const [theme, setTheme] = useState(light);

  const toggleTheme = () => {
    setTheme(theme.title === 'light' ? dark : light);
  };

  return (
    <>
    <Head>
      <script src='/nprogress.js'></script>
      <link rel='stylesheet' href='/nprogress.css'/>
    </Head>
    <PLayerContextProvider>
      <ThemeProvider theme={theme}>
        <AppComponent>
          <GlobalStyle />
          <main>
            <Header toggleTheme={toggleTheme}/>
            <Component {...pageProps} />
          </main>
          <Player />
        </AppComponent>
      </ThemeProvider>
    </PLayerContextProvider>
    </>
  );
}

export default MyApp
