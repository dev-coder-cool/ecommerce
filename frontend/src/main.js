import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import './styles/all.scss'
import Vuelidate from 'vuelidate'
import axios from 'axios'

// icons
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
// import { faShoppingCart, faShapes, faInfo, faInfoCircle, faUser } from '@fortawesome/free-solid-svg-icons'
import {  faBadgeCheck, faBars, faCashRegister, faMicrochip, faMemory, faRedo, faWindowClose, faCreditCard, faWindowMinimize, faCompressAlt, faLambda, faTimes, faAngleDoubleRight, faHomeLg, faInfoCircle, faShoppingCart, faServer, faSignOut, faSparkles, faCubes, faGamepadAlt, faStream, faStore, faUserAlt, faSackDollar, faHandHoldingUsd, faBoxes, faHistory, faTrashAlt, faEdit, faPlus, faCartPlus } from '@fortawesome/pro-duotone-svg-icons'


library.add([
  faLambda,
  faAngleDoubleRight,
  faHomeLg,
  faInfoCircle,
  faShoppingCart,
  faSignOut,
  faSparkles,
  faStream,
  faStore,
  faUserAlt,
  faSackDollar,
  faHandHoldingUsd,
  faBoxes,
  faHistory,
  faServer,
  faGamepadAlt,
  faCubes,
  faTrashAlt,
  faEdit,
  faPlus,
  faTimes,
  faCompressAlt,
  faWindowMinimize,
  faCartPlus,
  faCreditCard,
  faMicrochip,
  faMemory,
  faRedo,
  faWindowClose,
  faCashRegister,
  faBadgeCheck,
  faBars
]);

Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.use(Vuelidate)

Vue.config.productionTip = false

// load auth token from local storage and attach to every axios request in the future
const authToken = localStorage.getItem('authToken')
if (authToken) {
  axios.defaults.headers.common['Authorization'] = authToken
} else {
  axios.defaults.headers.common['Authorization'] = null
}


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
