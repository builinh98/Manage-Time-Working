// import Vue from 'vue'
// import Vuex from 'vuex'
// import { IUserState } from './modules/user'

// Vue.use(Vuex)

// export interface IRootState {
//   user: IUserState
// }

// // Declare empty store first, dynamically register all modules later.
// export default new Vuex.Store<IRootState>({})
import Vuex from 'vuex'
import UserModule from './modules/user'

export function createStore() {
  return new Vuex.Store({
    modules: {
      UserModule
    }
  })
}