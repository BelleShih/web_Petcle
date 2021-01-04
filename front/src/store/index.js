import Vue from 'vue'
import Vuex from 'vuex'
import persistedstate from 'vuex-persistedstate'
// import example from './module-example'

Vue.use(Vuex)

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Store instance.
 */

export default function (/* { ssrContext } */) {
  const Store = new Vuex.Store({
    state: {
      user: {
        name: '',
        account: '',
        password: '',
        passwordcheck: '',
        email: '',
        pet: null,
        uploadphotos: [],
        album: [],
        petpage: [],
        discuss: []
      }
    },
    mutations: {
      logout (state) {
        state.user.name = ''
        state.user.id = ''
      }
    },
    actions: {
    },
    modules: {
    },
    plugins: [persistedstate()],

    // enable strict mode (adds overhead!)
    // for dev mode only
    strict: process.env.DEBUGGING
  })

  return Store
}
