import axios from 'axios'
import {Loading, Message} from 'element-ui'
import {api} from '@/config'
import store from '@/vuex/store.js'
axios.defaults.timeout = api.timeout

// axios.defaults.baseURL = api.host

axios.interceptors.request.use(config => {
	config.headers['Content-Type'] =  'application/json;charset=UTF-8';
	store.commit('loading')

	return config
},error => {

	store.commit('closeLoading')
	Message.error({
		message:'加载超时'
	})
	return Promise.reject(error)
})

axios.interceptors.response.use(res => {

	store.commit('closeLoading')
	if(res.data.code < 0){
		let msg = ''
		// switch(res.data.code){
		//     case 2: msg = '登陆校验失败'
		//     case 3: msg = '响应超时'
		//     case 4: msg = '权限不足'
		//     case 5: msg = '请求参数错误'
		//     default : msg = '操作失败'
		// }
		Message.error({
		    message:res.data.msg
		})
	}
	if(res.data.code > 1){
		Message.error({
		    message:res.data.msg
		})
	}
	return res.data
},error => {

	store.commit('closeLoading')
	Message.error({
		message : '加载失败'
	})
	return Promise.reject(error)
})

export default axios