import ajax from 'axios'
import md5 from 'js-md5'
import {api} from '@/config'
import url from './api/user.api'

const baseURL = api.host;

export default {
	
	login(params) {
		params.pwd = md5(params.pwd)
		return ajax.get(url.login,{params:params, baseURL:baseURL})
	},

	getMenuList(id) {
		return ajax.get(url.getMenuList,{params:{id:id}, baseURL:baseURL})
	}
}