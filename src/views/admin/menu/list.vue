<style>
	.el-tree-node__content {
		padding:5px 0;
	}
</style>
<template>
	<el-container>
		<!--工具条-->
		<el-header class="toolbar" >
			<el-row>
				<el-col :span="24" >
					<el-button type="success" @click="groupHandle('create')">+添加导航组</el-button>
					<el-button type="warning" @click="groupHandle('edit')">*编辑当前组</el-button>
					<el-button type="primary" @click="append()">+添加菜单组</el-button>
				</el-col>
			</el-row>
		</el-header>
		<el-header class="toolbar" style="background:inherit;">
			<el-row>
				<el-tabs @tab-click="groupChange">
				    <el-tab-pane v-for="item,index in allMenus" :key="item.id" :label="item.name" :name="item.name"></el-tab-pane>
				</el-tabs>
			</el-row>
		</el-header>
		<el-main>
			<el-row>
				<el-tree
				  	:data="tree"
				  	ref='tree1'
				  	node-key="id"
				  	:default-expanded-keys="[2, 3]"
				  	:default-checked-keys="[5]"
				  	:props="defaultProps"
				  	:expand-on-click-node="false"
					:render-content="renderContent">
				  	>
				</el-tree>
			</el-row>
		</el-main>
		
		<!--编辑菜单组-->
		<el-dialog :title="groupDialog.title" :visible.sync="groupDialog.visible">
			<el-form :model="groupDialog.data">
				<el-form-item label="名称" label-width="60px">
					<el-input v-model="groupDialog.data.name" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item  label="" label-width="60px">
					<el-button type="primary" @click="groupHandle('submit')">确 定</el-button>
					<el-button @click="groupHandle('close')">取 消</el-button>
				</el-form-item>
			</el-form>
		</el-dialog>
		<!-- 编辑菜单内容 -->
		<el-dialog :title="titleStatus" :visible.sync="dialogEditVisible">
			<el-form :model="menuData">
				<el-form-item label="名称" :label-width="formLabelWidth">
					<el-input v-model="menuData.name" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="所属组" :label-width="formLabelWidth" v-if="">
				  	<el-select v-model="menuData.parent" placeholder="请选择">
					    <el-option
					      v-for="group in allMenus"
					      :key="group.id"
					      :label="group.name"
					      :value="group.id">
					    </el-option>
				  </el-select>
				</el-form-item>
				<el-form-item label="路径" :label-width="formLabelWidth">
					<el-input v-model="menuData.path" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="模块" :label-width="formLabelWidth">
					<el-input v-model="menuData.component" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="重定向" :label-width="formLabelWidth">
					<el-input v-model="menuData.redirect" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="排序" :label-width="formLabelWidth">
					<el-input v-model="menuData.sort" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="图标样式" :label-width="formLabelWidth">
					<el-input v-model="menuData.iconCls" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="是否隐藏" :label-width="formLabelWidth">
					<el-switch
					  	v-model="menuData.hidden"
					  	active-text="是"
					  	inactive-text="否">
					</el-switch>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="closeEditDialog">取 消</el-button>
				<el-button type="primary" @click="submitEdit">确 定</el-button>
			</div>
		</el-dialog>
	</el-container>
</template>

<script>
	import menuResouce from '@/resources/menu'

	import menu from '@/common/utils/menu'

	// import Mock from '@/mock/menu'
	import TreeData from '@/common/utils/format_tree_data'
	import menusFormat from '@/common/utils/menus_format'
	import adminResource from '@/resources/administrator'
    import menuResource from '@/resources/menu'
    // Mock.bootstrap();
	export default {
		data() {
			return {
				tree : [],
				defaultProps: {
					label:'name'
				},
				multipleSelection: [],
                dialogEditVisible: false,
                menuData: {
			        name: '',//菜单名
                    path: '',//路径
			        iconCls: '',//图标样式class
			        sort:0,//排序
			        component:'',//组件
			        parent:0,//父级id
			        hidden:false,//是否隐藏
			        redirect:'',//重定向
			        children:[]//
                },
                formLabelWidth: '80px',
				titleStatus: "编辑菜单",
				currentNode:null,
				currentData:null,
				group : 0,
				groupDialog: {
					title: '',
					visible: false,
					data: { name: '', path: '', iconCls: '', sort:0, component:'', parent:0, hidden:false, redirect:'', children:[] },
					close() {
						console.log(this)
					}
				},
				allMenus:[]
			}
		},
		created() {
			let vm = this

			vm.allMenus = menusFormat(menu);
			vm.tree = vm.allMenus[0].children;

//			menuResouce.getList().then(res => {
//				for (var i = res.data.list.length - 1; i >= 0; i--) {
//					if(res.data.list[i].createdAt) delete res.data.list[i].createdAt
//					if(res.data.list[i].updatedAt) delete res.data.list[i].updatedAt
//				}
//				vm.allMenus = menusFormat(res.data.list)
//				vm.tree = vm.allMenus[0].children
//				// vm.tree = vm.allMenus[0].children
//				// for (var i = vm.tree.length - 1; i >= 0; i--) {
//				// 	if(!vm.tree[i].children){
//				// 		vm.tree[i].children = []
//				// 	}
//				// }
//			});

		},
		methods: {
			groupHandle(act,obj) {
				let vm = this, gd = vm.groupDialog, gr = gd.data
				if(act === 'submit') {
					console.log(gr)
					if(gr.id > 0) {
						menuResouce.modify(gr).then( res => {
							if(res.code !== 1) { this.$message({message:'操作失败',type:'fail'});return }
							vm.allMenus[vm.group] = {...vm.allMenus[vm.group],...gr}
							gd.visible = false
						})
					}else {
						menuResouce.add(gr).then( res => {
							if(res.code !== 1) { this.$message({message:'操作失败',type:'fail'});return }
							vm.allMenus.push({
								...gr,...res.data
							})
							gd.visible = false
						})
					}
					return 
				}
				if(act === 'create') {
					gd.title = '添加菜单组'
					gd.data = { name: '', path: '', iconCls: '', sort:0, component:'', parent:0, hidden:1, redirect:'', children:[] }
					gd.visible = true
					return 
				}			
				if(act === 'edit') {
					gd.title = '编辑菜单组'
					gd.data = {...vm.allMenus[vm.group]}
					gd.visible = true
					return 
				}
				if(act === 'close') {
					gd.visible = false
					return 
				}
			},
			groupChange(v) {
				this.tree = this.allMenus[v.index].children
				this.group = v.index
			},
			parentChange() {
				console.log(arguments)
			},
			openEditDialog() {
				this.dialogEditVisible = true
			},
			closeEditDialog() {
				this.currentData = null
				this.currentNode = null
				this.dialogEditVisible = false
			},
			submitEdit() {
				let menu = this.menuData, vm = this
				menu.hidden = menu.hidden?1:0
				if(typeof menu.id !== 'undefined'){
					menuResouce.modify(menu).then( res => {
						if (res.code === 1) {
							this.$message({message:'修改成功',type:'success'})
							this.currentNode.data = menu
							this.closeEditDialog()

							this.queryMenuList();
						}
					})
				}else {
					menuResouce.add(menu).then( res => {
						if(res.code === 1 && res.data.id !== 0){
							vm.$message({message:'添加成功',type:'success'})
							menu.id = res.data.id
							if(vm.currentNode){
								if(!vm.currentData.children){
									vm.currentData.children = []
								}
								vm.currentData.children.push({...menu})
							}else{
								menu.children = []
								vm.allMenus[vm.group].children.push(menu)
							}
							vm.closeEditDialog()
							vm.currentNode = null;

							this.queryMenuList();
						}else {

						}
					})
				}
			},
			queryMenuList() {

				let user = JSON.parse(sessionStorage.user);

				if(user.name === 'admin') {
					menuResource.getList().then(res => {
						let  menu_list = res.data.list
						if(menu_list){
							window.sessionStorage.setItem('routes',JSON.stringify(menu_list))
							this.$store.commit('LOAD_ROUTES')
							this.$router.addRoutes(this.$store.getters.getRoutes)
							//this.$router.push({ path: '/' })
						}
					})
				}else{
					adminResource.queryUserMenu({id:user.id}).then(res => {
						let  menu_list = res.data
						if(menu_list){
							menu_list.map(function(v){
								v.id = v.menuId
								v.name = v.menuName
							})
							window.sessionStorage.setItem('routes',JSON.stringify(menu_list))
							this.$store.commit('LOAD_ROUTES')                           
							this.$router.addRoutes(this.$store.getters.getRoutes)
							//this.$router.push({ path: '/' })
						}

					})
				}

				// 配置用户authtoken
				axios.defaults.headers.common['Authorization'] = user.auth_token;
			},
			append(node,data) {
				this.titleStatus = '添加菜单'
				this.menuData = {
			        name: '',
                    path: '',
			        iconCls: '',
			        sort:0,
			        component:'',
			        parent:this.allMenus[this.group].id,
			        hidden:true,
			        redirect:'',
                }
                if(data) {
                	this.currentData = data
					this.menuData.parent = data.id
                }
				if(node) this.currentNode = node
				this.openEditDialog()
			},
			modify(node,data) {
				this.titleStatus = '编辑菜单'
				this.currentNode = node
				this.menuData = {...data}
				this.menuData.hidden = this.menuData.hidden===1?true:false
				this.openEditDialog()
			},
			remove(node,data) {
				this.$confirm('此操作将永久删除该菜单, 是否继续?', '提示',{
				 	confirmButtonText: '确定',
			        cancelButtonText: '取消',
			        type: 'warning'
				}).then(() => {
					menuResouce.delete(data.id).then(res => {
						if(res.code === 1){
							node.visible = false
							this.$message({
								message:'删除成功',
								type:'success'
							})
						}
					})
				})
			},
			renderContent(h, { node, data, store }) {
				let temp = (
		          	<span style="flex: 1; display: flex; align-items: center; justify-content: space-between; font-size: 14px; padding-right: 8px;">
			            <span>
			              	<span>{node.label}</span>
			            </span>
			            <span>
			            	{	
			            		data.children?
			              		<el-button style="font-size: 12px;margin-left:5px;" size="mini" type="success" round on-click={ () => this.append(node,data) }>添加子菜单</el-button>
			              		:''
			            	}
			            	<i>&nbsp;</i>
			              	<el-button style="font-size: 12px;margin-left:5px;" size="mini" type="primary" round on-click={ () => this.modify(node, data) }>编辑</el-button>
			              	<i>&nbsp;</i>
			              	<el-button style="font-size: 12px;margin-left:5px;" size="mini" type="danger" round on-click={ () => this.remove(node, data) }>删除</el-button>
			            </span>
		          	</span>)

	          	return temp;},
		},
	}
</script>