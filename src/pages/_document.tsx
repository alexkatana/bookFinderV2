import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="ru">
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>BookFinder</title>
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}