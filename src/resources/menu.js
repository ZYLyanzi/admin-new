import ajax from '@/resources/interceptors/http_interceptors'
import url from './api/menu.api'
import {api} from '@/config'

const baseURL = api.host;

export default {

	getList(params) {
		return ajax.get(url.getList,{params:params, baseURL:baseURL})
	},

	getDetail(params) {
		return ajax.get(url.getDetail,{params:params, baseURL:baseURL})
	},

    modify(params) {
        return ajax.post(url.modify, params, {baseURL:baseURL})
    },

    add(params) {
        return ajax.post(url.add, params, {baseURL:baseURL})
    },

    delete(id) {
    	return ajax.get(url.delete, {params:{id:id}, baseURL:baseURL})
    }
}