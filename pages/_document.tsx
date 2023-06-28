import { Html, Head, Main, NextScript } from 'next/document';
import React from 'react';

function Document(): React.JSX.Element {
  return (
    <Html lang="en">
      <Head></Head>

      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}

export default Document;
