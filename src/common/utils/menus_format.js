const menuFormat = function(menus,id = 0) {

	let arr = []
	for(let i = 0; i < menus.length; i++ ) {

		if(id === menus[i].parent) {
			arr.push(menus[i])
		}

	}
	
	for (var i = arr.length - 1; i >= 0; i--) {
		arr[i].children = menuFormat(menus,arr[i].id)
	}

	return arr
}

export default menuFormat