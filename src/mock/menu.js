import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import url from '@/resources/api/menu'

export default {
	/**
	* mock bootstrap
	*/
  	bootstrap() {
    	let mock = new MockAdapter(axios);

    	//更新
	    mock.onPost(url.modify).reply(config => {

	      	return new Promise((resolve, reject) => {

		        setTimeout(() => {
		          	
			            resolve([200, {
						    code: 0,
						    tips: 0,
						    msg: "",
						    data: {
						        id: 123
						    }
						}]);
		          	
			        
		        }, 1000);
	      	});
	    });
	    //添加
	    mock.onPost(url.add).reply(config => {

	      	return new Promise((resolve, reject) => {

		        setTimeout(() => {
		          	
			            resolve([200, {
						    code: 0,
						    tips: 0,
						    msg: "",
						    data: {
						        id: 123
						    }
						}]);
		          	
			        
		        }, 1000);
	      	});
	    });
	    //删除
	    mock.onGet(url.delete).reply(config => {
	      	return new Promise((resolve, reject) => {

		        setTimeout(() => {
		          	
			            resolve([200, {
						    code: 0,
						    tips: 0,
						    msg: "",
						   
						}]);
		          	
			        
		        }, 1000);
	      	});
	    });
	}
}