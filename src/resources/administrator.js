import ajax from 'axios';
import {api} from '@/config'
import url from './api/administrator.api'

const baseURL = api.host;

export default {
	// 获取管理员列表
	getUserList(params) {
		if(typeof params !== 'object'){
			params = {pageNum:1,pageSize:10}
		}
		if(!params.pageNum){
			params.pageNum = 1
		}
		if(!params.pageSize){
			params.pageSize = 10
		}
		return ajax.get(url.getUserList,{params:params, baseURL:baseURL})
	},
	// 修改管理员信息
	modifyUser(params) {
		return ajax.post(url.modifyUser, params, {baseURL:baseURL})
	},
    // 新增管理员
    addUser(params) {
        return ajax.post(url.addUser, params, {baseURL:baseURL})
    },
    // 删除管理员
    delUser(params) {
        return ajax.get(url.delUser, {params:params, baseURL:baseURL})
    },
    // 获取用户菜单
    queryUserMenu(params) {
    	return ajax.get(url.queryUserMenu,{params:params, baseURL:baseURL})
    }
}