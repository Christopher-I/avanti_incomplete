import Document, { Head, Html, Main, NextScript } from 'next/document'
import React from 'react'
import { Reset } from 'styled-reset'
import { ServerStyleSheet } from 'styled-components'

class CustomDocument extends Document {
  static async getInitialProps(ctx): Promise<typeof props> {
    let props
    const originalRenderPage = ctx.renderPage
    const sheet = new ServerStyleSheet()

    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: (App) => (props) =>
            sheet.collectStyles(<App {...props} />),
        })

      const initialProps = await Document.getInitialProps(ctx)

      props = {
        ...initialProps,
        styles: (
          <>
            {initialProps.styles}
            {sheet.getStyleElement()}
          </>
        ),
      }

      return props
    } finally {
      sheet.seal()
    }
  }

  render(): JSX.Element {
    return (
      <Html lang="en">
        <Head>
          <meta name="theme-color" content="#fff" />
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
          <link
            href="https://fonts.googleapis.com/css2?family=Open+Sans&family=Oswald:wght@400;500&display=swap"
            rel="stylesheet"
          />
          <Reset />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default CustomDocument
