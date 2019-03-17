const path = '/wm-app-admin/menus/'
export default {
	/*
	*method : get
	*params : {pageNum:number,pageSize:number}
	*/
	getList : path+ 'queryMenusList',
	/*
	*method : get
	*params : 
	*/
	delete: path+ 'delMunusInfo',
	/*
	*method : get
	*params : {id:int}
	*/
	getDetail : path+ 'detail',
    /*
    *method : post
    *params :
    */
    modify: path+ 'updMenusInfo',
    /*
    *method : post
    *params :
    */
    add: path+ 'addMenusInfo',

}