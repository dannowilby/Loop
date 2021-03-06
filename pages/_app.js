import React from 'react'
import App, { Container } from 'next/app';
import Head from 'next/head';
import { Provider } from 'react-redux';

import Header from '../components/Header/index';

import withReduxStore from '../state/with-store';

class Main extends App {

  render () {
    const { Component, pageProps, reduxStore } = this.props

    return (
      <Container>

        <Head>
          <link href="https://fonts.googleapis.com/css?family=Baloo" rel="stylesheet" />
          <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css" integrity="sha384-MCw98/SFnGE8fJT3GXwEOngsV7Zt27NXFoaoApmYm81iuXoPkFOJwJ8ERdknLPMO" crossOrigin="anonymous" />
          <title>Loop</title>
        </Head>
        
        <Provider store={reduxStore}>
          <Component {...pageProps} />
        </Provider>

      </Container>
    )
  }
}

export default withReduxStore(Main);
