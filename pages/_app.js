import React from 'react';

import { Provider } from 'react-redux';

import configureStore from '../store/index';

import '../styles/index.css'

const {  store, dispatch } = configureStore();

function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store} >
      <Component {...pageProps} />
    </Provider >
  )
}

export default MyApp
