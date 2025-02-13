import '../styles/globals.css';
import Head from 'next/head';

//redux imports



// redux-persist imports
import { persistStore, persistReducer } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';
import storage from 'redux-persist/lib/storage';



function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Check To Pic</title>
      </Head>
      <Component {...pageProps} />
    </>
  );
}

export default App;
