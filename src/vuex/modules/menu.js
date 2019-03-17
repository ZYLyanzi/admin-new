export default {
	state :{  
	  	items: [],  
	  	isLoadRoutes: false  ,
	  	currentGroup: null
	},
	mutations : {  
		setGroup(state,index = false) {
			if(!index) {
				index = sessionStorage.getItem('currentgroup')?parseInt(sessionStorage.getItem('currentgroup')):0
			}
			state.currentGroup = index
            sessionStorage.setItem('currentgroup',index)
		}
	},
	getters: {
		currentGroup(state) {
			return state.currentGroup
		}
	}
}