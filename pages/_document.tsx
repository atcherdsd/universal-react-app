import { Html, Head, Main, NextScript } from 'next/document';
import React from 'react';

function Document(): React.JSX.Element {
  return (
    <Html lang="en">
      <Head>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta name="description" content="Smartphone online store" />
      </Head>

      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}

export default Document;
