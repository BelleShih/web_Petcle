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
        id: '',
        account: ''
      },
      like: []
    },
    computed: {

    },
    mutations: {
      logout (state) {
        state.user.account = ''
        state.user.id = ''
      },
      login (state, data) {
        state.user.account = data.account
        state.user.id = data._id
        state.user.name = data.name
      },
      like (state, photo) {
        state.like.push(photo)
      },
      delPhoto (state, index) {
        state.like.splice(index, 1)
      }
    },
    actions: {
    },
    modules: {
    },
    plugins: [persistedstate()],
    getters: {
      stars (state) {
        return state.like
      }
    },

    // enable strict mode (adds overhead!)
    // for dev mode only
    strict: process.env.DEBUGGING
  })

  return Store
}
