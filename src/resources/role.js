import ajax from 'axios'
import url from './api/role.api'
import {api} from '@/config'

const baseURL = api.host;

export default {
	// 获取角色列表
	getRoleList(params) {
		if(typeof params !== 'object'){
			params = {pageNum:1,pageSize:10}
		}
		if(!params.pageNum){
			params.pageNum = 1
		}
		if(!params.pageSize){
			params.pageSize = 30
		}
		return ajax.get(url.getRoleList,{params:params, baseURL:baseURL})
	},
	// 修改角色信息
	modifyRole(params) {
		return ajax.post(url.modifyRole, params, {baseURL:baseURL})
	},
	// 获取角色详情
	getRoleDetail(params) {
		return ajax.get(url.getRoleDetail,{params:params, baseURL:baseURL})
	},
    // 新增角色
    addRole(params) {
		console.log("新增角色1", params )
        return ajax.post(url.addRole, params, {baseURL:baseURL})
    },
    // 删除角色
    delRole(params) {
        return ajax.get(url.delRole, {params:params, baseURL:baseURL})
    }
}