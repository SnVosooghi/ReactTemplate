/* global */
import { init } from '@rematch/core';
import createPersistPlugin, { getPersistor } from '@rematch/persist';
import createLoadingPlugin from '@rematch/loading';
import * as models from '../models';

// Create plugins

const loadingPlugin = createLoadingPlugin({});

const configureStore = () => {
  const store = init({
    models,
  });

  const { dispatch } = store;

  return {  store, dispatch };
};

export default configureStore;
