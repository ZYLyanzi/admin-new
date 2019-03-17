import ajax from 'axios'
import url from './api/message.api'

export default {
     //获取列表
    getList(params) {
		return ajax.get(url.getList,{params:params,})
	},
    // 发送短信
    sendMessage(params) {
        return ajax.post(url.sendMessage, params)
    },
}