import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { LoginUsers, Users } from './data/user';
import url from '@/resources/api/user.api'
let _Users = Users;

export default {
	/**
	* mock bootstrap
	*/
  	bootstrap() {
    	let mock = new MockAdapter(axios);

    	//登录
	    mock.onGet(url.login).reply(config => {
	    	if(!config.data){
	    		return false;
	    	}
		      	let {name, pwd} = JSON.parse(config.data);
		      	return new Promise((resolve, reject) => {
		        let user = null;
		        setTimeout(() => {
		          	let hasUser = LoginUsers.some(u => {
		            	if (u.name === name && u.pwd === pwd) {
			              	user = JSON.parse(JSON.stringify(u));
			              	user.pwd = undefined;
			              	return true;
			            }
		          	});

		          	if (hasUser) {
			            resolve([200, { code: 0, msg: '请求成功', data:user }]);
		          	} else {
			            resolve([200, { code: 500, msg: '账号或密码错误' }]);
		          	}
		        }, 1000);
		      });
	    });
	}
}