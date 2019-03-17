export default {
	state :{
		run: false
	},
	mutations:{
		setRun(state,data){
			state.run = data
		}
	},
	getters: {
	   getRun(state){
		return state.run
	 }
  },

}