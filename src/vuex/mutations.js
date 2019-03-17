// 定义所需的 mutations
import Vue from 'vue'
import tree from '@/common/utils/format_tree_data'
import menusFormat from '@/common/utils/menus_format'
export const INCREMENT = (state) => {
    state.count++
};

export const DECREMENT = (state) => {
    state.count--
};

export const UPDATE_USER = (state,user) => {
	state.user.name = user.name
	state.user.avator = user.avator
	state.user.menu_list = user.menu_list
	state.user.auth_token = user.auth_token
	state.user.id = user.id
};
export const REMOVE_USER = (state) => {
	state.user = {}
};

export const EXPAND_MENU = (state,menuItem) => {
	if(menuItem.index > -1){
		if(state.items[menuItem.index] && state.items[menuItem.index].meta) {

		}
	}
}

export const ADD_MENU = (state,menuItems) => {
	if(menuItems.length > 0){
		menuItems.sort(function(a,b) {
			return a.parent - b.parent
		})
		state.menu.items = menuItems
	}else{

	}
}

export const LOAD_ROUTES = (state) => {
	let routers = []
	let menu_list = window.sessionStorage.getItem('routes')
	menu_list = JSON.parse(menu_list)
	if(menu_list && menu_list.length > 0){
		state.menu.items = menusFormat(menu_list)
		window.sessionStorage.setItem('isLoadRoutes',true)
	}else{
		state.menu.items = []
	}
}

export const loading = (state) => {
	state.loading = true
}

export const closeLoading = (state) => {
	state.loading = false
}
