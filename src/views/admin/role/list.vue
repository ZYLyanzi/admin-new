<style scoped>
	.dialog{
		z-index: 999;
		position: fixed;
		top: 10%;
		right: 0;
		bottom: 0;
		left: 0;
		overflow: hidden;
		margin: 0;

	}
	.el-dialog{

	}
	.dialog-content{
		height: 500px;
		overflow-y:scroll;
	}

.el-dialog-bg{
	position: fixed;
	left: 0;
	top: 0;
	z-index: 3000;
	width: 100%;
	height: 100%;
	background: #000;
	opacity: 0.5;
}
</style>
<template>
	<section>
		<!--工具条-->
		<el-col :span="24" class="toolbar">
			<!--<el-button type="danger" @click="del">批量删除</el-button>-->
			<el-button type="primary" @click="addRole" ref="tianjia">+添加角色</el-button>
		</el-col>
		<!--&lt;!&ndash;列表&ndash;&gt;-->
		<el-table :data="list" highlight-current-row   style="width: 100%;">
			<!--<el-table-column type="selection"  width="45">-->
			<!--</el-table-column>-->
			<el-table-column prop="id" label="角色id" >
			</el-table-column>
			<el-table-column prop="name" label="角色名">
			</el-table-column>
			<el-table-column label="操作" width="250">
				<template slot-scope="scope">
					<!--<el-button size="small" v-on:click="getDetail(scope.row.id)"> 查看</el-button>-->
					<el-button size="small" v-on:click="editRole(scope.row.id)">编辑</el-button>
					<el-button type="danger" size="small" v-on:click="del(scope.row.id)"> 删除</el-button>
				</template>
			</el-table-column>
		</el-table>
		<!--工具条-->
		<el-col :span="24" class="toolbar">
			<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
						   :page-sizes="[10, 15, 30, 50, 100]"
						   :page-size="pageSize"
						   layout="total, sizes, prev, pager, next, jumper"
						   :total="total" style="float:right;">
			</el-pagination>
		</el-col>

		<!--弹窗内容-->
		<div class="dialog"  v-show="dialogAddVisible" >
			<!--弹出层背景-->
			<div class="el-dialog-bg"></div>
			<div class="el-dialog" style="z-index: 30001" ref="dialog">
				<div class="el-dialog__header">
					<span class="el-dialog__title">{{titleStatus}}</span>
					<button type="button" aria-label="Close" class="el-dialog__headerbtn"><i class="el-dialog__close el-icon el-icon-close" @click="cancelAddDialog"></i></button>
				</div>
				<div class="el-dialog__body">
					<el-form :model="addRoleData">
						<el-form-item label="角色名称" :label-width="formLabelWidth">
							<el-input v-model="addRoleData.name" auto-complete="off" :disabled="popstate"></el-input>
						</el-form-item>

						<el-form-item label="角色权限" :label-width="formLabelWidth" v-if="!popstate" class="dialog-content">
							<el-tree
									ref="tree"
									:data="tree_data"
									:props="defaultProps"
									:check-strictly="true"
									node-key="id"
									:default-expanded-keys="addRoleData.menusArr"
									:default-checked-keys="addRoleData.menusArr"
									show-checkbox
									 @check-change="handleCheckChange"
									 @node-click="handleNodeClick"
									>
							</el-tree>
						</el-form-item>

						<el-form-item label="角色权限" :label-width="formLabelWidth" v-if="popstate" class="dialog-content">

							<el-tree
									 ref="treechakan"
									 :data="tree_data_chakan"
									 node-key="id"
									 :props="defaultProps"
									 :check-strictly="true"
									 :default-expanded-keys="addRoleData.menusArr"
									 :default-checked-keys="addRoleData.menusArr"
									 show-checkbox>
							</el-tree>

						</el-form-item>
					</el-form>
				</div>

				<div class="el-dialog__footer" v-if="!popstate">
					<div class="dialog-footer">
						<el-button @click="cancelAddDialog">取 消</el-button>
						<el-button type="primary" @click="okAddDialog">确 定</el-button>
					</div>
				</div>

			</div>
		</div>

	</section>
</template>


<script>
import adminRole from '@/resources/role'
import ElCol from "element-ui/packages/col/src/col";

export default {
	data () {
		return {
			total: 0,
			pageNum: 1,
			pageSize: 10,
			list : [{id: 1, name: "微马"}, {id: 2, name: "体育"}],
			multipleSelection: [],
			dialogAddVisible: false,
			addRoleData: {
				id: 0,
				name: '',
				menusArr: [],
			},
			menus: [],
			formLabelWidth: '80px',
			titleStatus: "新增角色",
			popstate: false,
			tree_data: [],
            tree_data_chakan: [],
			defaultProps: {
				label: 'name',
				children: 'children'
			},
			checkedData:[]
		};
	},
	methods: {
		handleNodeClick(o,n,t) {
			console.log(arguments)
		},
		handleCheckChange(o,currentChecked,hasChildrenChecked) {
// 			let t = this.$refs.tree
// console.log('!currentChecked',!currentChecked)
// 			if(!currentChecked) {
// 				let children = []
// 				o.children.forEach(v => {
// 					children.push(v.id)
// 				})
// 				t.setChecked(children,currentChecked,true)
// 			}
// 			console.log('hasChildrenChecked',arguments)
// 			if(hasChildrenChecked) {
// 				console.log('leaf nodes',t.getCheckedNodes(true))
// 			}
// 			console.log(t.getCheckedKeys())
		},
		fillData(arr) {
			let vm = this
			if(vm.checkedData.length < 1) return
			arr.forEach(v => {
				if(vm.checkedData.includes(v.id) && !vm.checkedData.includes(v.parent)) {
					vm.checked.push(v.parent)
				}
				
				if(v.children.length > 0) {
					vm.fillData(v.children)
				}
			})
		},
		resetChecked() {
			this.$refs.tree.setCheckedKeys([]);
            console.log("resetChecked2", this.$refs.tree.getCheckedKeys());
		},
        setTreeCheckedKeys() {

		    console.log("setCheckedKeysdialog", this.$refs);

		    console.log("setCheckedKeystreechakan", this.$refs.treechakan);

		    if (this.popstate) {
		        console.log("查看2", this.addRoleData.menusArr);
                this.$refs.treechakan.setCheckedKeys([5]);
                console.log("查看2", this.$refs.treechakan.getCheckedKeys());
            }else {
                console.log("编辑");
                this.$refs.tree.setCheckedKeys(this.addRoleData.menusArr);
            }
        },
        // 查看
		getDetail (id) {
			this.popstate = true;
			this.titleStatus = "查看角色";

			this.getRoleDetail(id);

            for (let item of this.tree_data_chakan){
                console.log("查看角色item", item);
                item.disabled = true;
                for (let next of item.children) {
                    next.disabled = true;
                }
            }
            console.log("查看角色3", this.tree_data_chakan);
            console.log("查看角色4", this.tree_data);
		},

		// 编辑角色
		editRole (id ) {
            this.popstate = false;
            this.titleStatus = "修改角色";
            console.log("编辑角色", this.tree_data);
			this.getRoleDetail(id);
		},
		//新增
		addRole() {
            this.popstate = false;
			this.addRoleData.id = 0;
			this.addRoleData.name = '';
			this.addRoleData.menusArr = [];
			console.log("新增角色", this.addRoleData);
			this.dialogAddVisible = true;
			this.titleStatus = "新增角色";
			this.resetChecked();
		},
		//删除角色
		del(id) {
            let vm = this;
			let para = {
				rolesId: id
			};
			adminRole.delRole(para).then((res) => {
				if(res.code == 1){
                    vm.$message({
                        message: '删除成功',
                        type: 'success'
                    });
                    this.get_list();
				}else if (res.code < 1){
                    vm.$message({
                        message: res.msg,
                        type: 'error'
                    });
				}
			});
		},

		//取消弹窗
		cancelAddDialog() {
			this.dialogAddVisible = false;
			this.addRoleData.id = 0;
			this.addRoleData.name = '';
			this.addRoleData.menusArr = [];
			this.resetChecked();
		},
		okAddDialog() {
			let vm = this;
			if (vm.titleStatus == "修改角色"){
			    console.log("修改角色ok")
				let para = {
					id: vm.addRoleData.id,
					name: vm.addRoleData.name,
                    menuIds: vm.$refs.tree.getCheckedKeys()
				};

				adminRole.modifyRole(para).then((res) => {
					vm.addRoleData.id = 0;
					vm.addRoleData.name = '';
					vm.addRoleData.menusArr = [];
					this.resetChecked();
                    this.get_list();
					vm.dialogAddVisible = false;
					vm.$message({
						message: '修改成功',
						type: 'success'
					});
				});
			}else if (vm.titleStatus == "新增角色"){
				let para = {
					name: vm.addRoleData.name,
					menuIds: vm.$refs.tree.getCheckedKeys()
				};
				adminRole.addRole(para).then((res) => {
					vm.dialogAddVisible = false;
					vm.addRoleData.id = 0;
					vm.addRoleData.name = '';
					vm.addRoleData.menusArr = [];
					this.resetChecked();
					this.get_list();
					vm.$message({
						message: '新增成功',
						type: 'success'
					});
				});
			}

		},
		//翻页操作
		handleSizeChange(val) {
			this.pageSize = val;
			this.get_list();
		},
		//翻页操作
		handleCurrentChange(val) {
			this.pageNum = val;
			this.get_list();
		},
		//获取角色详情
		getRoleDetail(id){
			let vm = this;
			let para = {
				rolesId: id,
			};
			adminRole.getRoleDetail(para).then((res) => {
				console.log("获取角色详情", res);

				vm.addRoleData.id = res.data.id;
				vm.addRoleData.name = res.data.name;
				vm.addRoleData.menusArr = res.data.menus;
				vm.dialogAddVisible = true;

                this.setTreeCheckedKeys()

//				if (!vm.popstate){
//                    this.setTreeCheckedKeys()
//                }else {
//
//                }

			});
		},
		//获取角色列表
		get_list () {
			var vm = this;
			let para = {
				pageNum: vm.pageNum,
				pageSize: vm.pageSize
			};
			adminRole.getRoleList(para).then((res) => {
				console.log("获取角色列表", res);
				vm.list = res.data.list;
				vm.total = res.data.total;
			});
		}
	},
	created (){
		this.get_list();

		this.tree_data = this.$store.getters.menus;

        let list = JSON.stringify(this.tree_data);

        this.tree_data_chakan = JSON.parse(list);

		console.log("created获取tree_data3", this.tree_data);
        console.log("created获取tree_data_chakan4", this.tree_data_chakan)

	},
	components : {
		ElCol
	},
}
</script>