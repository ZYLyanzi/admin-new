//test
import menuUtils from '@/common/utils/menu_utils'
export const getCount = state => {
    return state.count
}

export const menuitems = state => state.menu.items;
export const getRoutes = state => {
	let routes = [], arr = []
	for (var i = state.menu.items.length - 1; i >= 0; i--) {

		// arr.push(state.menu.items[i].children)
		arr = [...arr, ...state.menu.items[i].children]
	}
	menuUtils(routes,arr)
	return routes
}
export const menus = state => {
	return state.menu.items
}
export const isLoadRoutes = state => state.menu.isLoadRoutes

export const loading = state => state.loading

