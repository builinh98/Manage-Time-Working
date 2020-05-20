// import Vuex from 'vuex'
// import UserModule from './modules/user'

// export function createStore() {
//   return new Vuex.Store({
//     modules: {
//       UserModule
//     }
//   })
// }
import { getModule } from 'vuex-module-decorators'
import { Store } from 'vuex';
import UserModule from './modules/user'

export let userModule : UserModule;

function initializeStores(store: Store<any>): void {
	userModule = getModule(UserModule, store);
}

export const plugins = [initializeStores];