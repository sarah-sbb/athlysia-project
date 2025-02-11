import '../styles/globals.css';
import Head from 'next/head';

function App({ Component, pageProps }) {
  // Vérifier si la page définit une méthode getLayout, sinon retourner la page telle quelle.
  const getLayout = Component.getLayout || ((page) => page);

  return (
    <>
      <Head>
        <title>Athlysia</title>
      </Head>
      {getLayout(<Component {...pageProps} />)}
    </>
  );
}

export default App;