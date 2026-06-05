import Head from 'next/head';
import React, { useState, useEffect } from 'react';
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

  useEffect(() => {
    if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
      const ua = navigator.userAgent.toLowerCase();
      const isTV = ua.includes('smarttv') || 
                   ua.includes('tizen') || 
                   ua.includes('webos') || 
                   ua.includes('smart-tv') || 
                   ua.includes('netcast') || 
                   ua.includes('opera tv') || 
                   ua.includes('appletv') || 
                   ua.includes('hbbtv') || 
                   ua.includes('ce-html');

      if (!isTV) {
        window.addEventListener('load', () => {
          navigator.serviceWorker.register('/sw.js')
            .then(reg => console.log('Service Worker registrado:', reg.scope))
            .catch(err => console.warn('Erro ao registrar Service Worker:', err));
        });
      } else {
        console.log('Dispositivo de TV detectado. Ignorando registro de Service Worker.');
      }
    }
  }, []);

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
