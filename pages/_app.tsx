import type { AppProps } from 'next/app';
import React from 'react';

function App({ Component, pageProps }: AppProps): React.JSX.Element {
  return <Component {...pageProps} />;
}

export default App;
