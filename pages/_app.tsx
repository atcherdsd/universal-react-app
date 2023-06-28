import type { AppProps } from 'next/app';
import React from 'react';
import '../styles/About.css';
import '../styles/Card.css';
import '../styles/global.css';
import '../styles/GoodsUnit.css';
import '../styles/Header.css';
import '../styles/NotFound.css';
import '../styles/Search.css';
import '../styles/SearchResult.css';

function App({ Component, pageProps }: AppProps): React.JSX.Element {
  return <Component {...pageProps} />;
}

export default App;
