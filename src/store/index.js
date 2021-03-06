import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

import user from './user';
import message from './message';

const debug = process.env.NODE_ENV !== 'production';

export default new Vuex.Store({
  modules: {
    message,
    user,
  },
  strict: debug,
});
