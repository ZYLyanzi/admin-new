import babelpolyfill from 'babel-polyfill'
import '@/assets/styles/base.css'
import 'element-ui/lib/theme-chalk/index.css'
import 'font-awesome/css/font-awesome.min.css'
import Vue from 'vue'
import App from './App'
import ElementUI from 'element-ui'

import AMap from 'vue-amap';

import '@/common/utils/vue_error_handler'

//import './assets/theme/theme-green/index.css'
import store from './vuex/store'
import Vuex from 'vuex'
//import NProgress from 'nprogress'
//import 'nprogress/nprogress.css'
import router from './routes'
import axios from './resources/interceptors/http_interceptors'

import menuUtils from '@/common/utils/menu_utils'

// import '../static/UEditor/ueditor.config.js'
// import '../static/UEditor/ueditor.all.js'
// import '../static/UEditor/lang/zh-cn/zh-cn.js'
// import '../static/UEditor/ueditor.parse.min.js'
Vue.use(AMap)
AMap.initAMapApiLoader({
    key: '5b82cd57357c42dd95702dd2679d8702',
    plugin: ['AMap.Autocomplete', 'AMap.PlaceSearch', 'AMap.Scale', 'AMap.OverView', 'AMap.ToolBar', 'AMap.MapType', 'AMap.PolyEditor', 'AMap.CircleEditor', 'AMap.Geocoder'],
    // 默认高德 sdk 版本为 1.4.4
    v: '1.4.4',
});

Vue.use(ElementUI)
Vue.use(Vuex)

store.commit('LOAD_ROUTES')
router.addRoutes(store.getters.getRoutes)


new Vue({
  	router,
  	store,
  	render: h => h(App)
}).$mount('#app')

