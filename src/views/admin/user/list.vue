<template>
	<section>
		<!--工具条-->
		<!--<el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
			<el-form :inline="true" :model="filters">
				<el-form-item>
					<el-input v-model="filters.name" placeholder="姓名"></el-input>
				</el-form-item>
				<el-form-item>
					<el-button type="primary">查询</el-button>
				</el-form-item>
			</el-form>
		</el-col>-->
		<el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
			<el-form :inline="true">
				<el-form-item>
					<el-button type="primary" @click="addUser">+添加管理员</el-button>
				</el-form-item>
				<!--<el-button type="danger" @click="batchRemove">批量删除</el-button>-->
			</el-form>
		</el-col>

		<!--列表-->
		<el-table :data="list" highlight-current-row style="width: 100%;">
			<!--<el-table-column type="selection" width="55">
		</el-table-column>-->
		<el-table-column  prop="id" label="用户Id">
		</el-table-column>
		<el-table-column prop="userName" label="用户名">
		</el-table-column>
		<el-table-column prop="fullname" label="姓名">
		</el-table-column>
		<el-table-column prop="rolesVO.name" label="角色">
		</el-table-column>
		<el-table-column prop="createdAt" label="加入时间">
		</el-table-column>
		<el-table-column label="操作">
			<template slot-scope="scope">
				<el-button size="small" @click="editUser(scope.row)">编辑</el-button>
				<el-button type="danger" size="small" @click="del(scope.$index, scope.row)">删除</el-button>
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
<!--弹框内容-->
<el-dialog :title="title" :visible.sync="FormVisible">
	<el-form :model="Form" label-width="80px" :rules="rules" ref="Form">
		<el-form-item label="用户名" prop="userName">
			<el-input v-model="Form.userName"></el-input>
		</el-form-item>
		<el-form-item label="姓名" prop="fullname">
			<el-input v-model="Form.fullname"></el-input>
		</el-form-item>
		<el-form-item label="密码">
			<el-input v-model="Form.pwd" type="password"></el-input>
		</el-form-item>
                 <!--<el-form-item label="确认密码" prop="checkpwd">
					<el-input v-model="Form.checkpwd" type="password"></el-input>
				</el-form-item>			-->
				<el-form-item label="角色">
					<el-select v-model="Form.roleId" placeholder="请选择角色">
						<el-option v-for="item in rolelist" :key="item.id" :label="item.name" :value="item.id"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="submit">提交</el-button>
					<el-button  @click.native="FormVisible = false">取消</el-button>
				</el-form-item>
			</el-form>
		</el-dialog>
	</section>
</template>

<script>
	import adminUser from '@/resources/administrator'
	import adminRole from '@/resources/role'
	import md5 from 'js-md5';
// import Mock from '@/mock/mock'
//      Mock.bootstrap();
export default {
	data() {
		return {
			total: 0,
			pageNum: 1,
			pageSize: 10,
			list: [],
				FormVisible: false,//界面是否显示
				rules: {
					userName: [
					{ required: true, message: '请输入用户名', trigger: 'blur' }
					],
					fullname: [
					{ required: true, message: '请输入姓名', trigger: 'blur' }
					],
				},
				//弹框数据
				Form: {
					id:'',
					userName:'',
					fullname:'',
					pwd:'',
					roleId: '',
					roleName: '',
				},
				rolelist:[],
				title:'新增',

			}
		},
		methods: {
			editUser(row) {
				this.Form = row;
				console.log(row)
			//   this.Form.roleId = row.rolesVO.name;
			//   this.Form.roleName = row.rolesVO.name;
			this.title='修改';
			this.FormVisible = true;
			console.log('编辑',this.Form);


		},
		addUser(){
			this.title = '新增';
			this.FormVisible = true;
			console.log('新增',this.Form)
			this.Form = {
				userName:'',
				fullname:'',
				pwd:'',
				roleId:'',
			}

		},
			//删除管理员
			del(index,row) {
				let para = {
					userId: row.id,
				};
				adminUser.delUser(para).then((res) => {
					this.get_list();
					this.$message({
						message: '删除成功',
						type: 'success'
					});
				});
			},
			submit() {
				console.log("submit", this.Form)
				this.$refs["Form"].validate((valid) => {
					if (valid) {
						let vm = this;
						if (vm.title == "修改"){
							let para = {
								id: vm.Form.id,
								userName: vm.Form.userName,
								fullname: vm.Form.fullname,
								pwd: md5(vm.Form.pwd),
								roleId: vm.Form.roleId,
							};
							if(vm.Form.pwd == vm.Form.pwdCache){
								delete para.pwd;
							}
							//console.log("para", para)
							adminUser.modifyUser(para).then((res) => {
								console.log('修改',res)
								vm.Form.id ='';
								vm.Form.userName='';
								vm.Form.fullname='';
								vm.Form.pwd='';
								vm.Form.roleId=''
								vm.FormVisible = false;
								vm.$message({
									message: '修改成功',
									type: 'success'
								});
								this.get_list();
							});
						}else if (vm.title == "新增"){
							let para = {
								userName: vm.Form.userName,
								fullname: vm.Form.fullname,
								pwd: md5(vm.Form.pwd),
						// checkpwd: md5(vm.Form.checkpwd),
						roleId: vm.Form.roleId,
					};
					adminUser.addUser(para).then((res) => {
						console.log('新增',res)
						vm.Form = {
							userName:'',
							fullname:'',
							pwd:'',
							// checkpwd:'',
							roleId:'',
						};
						vm.FormVisible = false;
						this.get_list();
						vm.$message({
							message: '新增成功',
							type: 'success'
						});
					});
				}

			} else {
				return false;
			}
		});
			},
			get_list () {
				var vm = this;
				let para = {
					pageNum: vm.pageNum,
					pageSize: vm.pageSize
				};
				adminUser.getUserList(para).then((res) => {
					console.log('列表',res)
					for(let item of res.data.list){
						item.pwdCache = item.pwd;
					}
					vm.list = res.data.list;
					console.log("vm.list", vm.list)

					vm.total = res.data.total;
					vm.get_list1();
				});
			},
			//获取角色列表
			get_list1 () {
				var vm = this;
				adminRole.getRoleList({pageNum:1,pageSize:1000}).then((res) => {
					console.log("获取角色列表", res);
					vm.rolelist = res.data.list


				});
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

        },
        created (){
        	this.get_list();

        	console.log("created")
        },
        mounted() {

        },
    }

</script>
