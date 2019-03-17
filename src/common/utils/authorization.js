export const routerAllow = function(router){

	let user = JSON.parse(localStorage.getItem('user'))
	if(user.name === 'admin'){
		return true
	}

	let list = localStorage.getItem('menu_list')
	if(router.hidden || list.indexOf(router.path+';') >= 0){
		return true
	}else{
		return false
	}
}