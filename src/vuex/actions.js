//test
export const increment = ({commit}) => {
    commit('INCREMENT')
}
export const decrement = ({commit}) => {
    commit('DECREMENT')
}

export const addMenu = ({ commit }, menuItems) => {  
	console.log(menuItems
		)
	if (menuItems.length > 0) {  
	    commit('ADD_MENU', menuItems)  
	}
}  
  
export const loadRoutes = ({ commit }) => {  
  	commit('LOAD_ROUTES')  
}  