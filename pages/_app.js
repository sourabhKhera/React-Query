import React from 'react'
import { QueryClient, QueryClientProvider } from 'react-query'
import App from 'next/app'
import { createGlobalStyle } from 'styled-components'
import normalize from 'styled-normalize'

const queryClient = new QueryClient();

//

const GlobalStyles = createGlobalStyle`
  ${normalize};
  html, body, body, [data-reactroot] {
    min-height: 100%;
    max-width: 100%;
  }

  html, body {
    width: 100%;
    font-size: 16px;
    font-family: "Helvetica", "Georgia", sans-serif;
  }

  * {
    box-sizing: border-box;
  }

  input {
    max-width: 100%;
  }

  a {
    text-decoration: none;
    cursor: pointer;
  }
`

export default class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props
    return (
      <QueryClientProvider client={queryClient}>
        <GlobalStyles />
        <Component {...pageProps} />
      </QueryClientProvider>
    )
  }
}
