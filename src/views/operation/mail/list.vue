<style scoped>
</style>
<template>
	<section>
		<!--工具条-->
		<el-row>
			<el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
				<el-form :inline="true" class="demo-form-inline">
					<el-form-item  label="分支行号">
						<el-input v-model="searchPra" placeholder="分支行号"></el-input>
					</el-form-item>
					<el-form-item  label="申请人">
						<el-input v-model="searchPra" placeholder="申请人"></el-input>
					</el-form-item>
					<el-form-item prop="signupStartTime"  label="开始申请日期">
						<el-date-picker
								v-model="searchPra"
								type="datetime"
								value-format="yyyy-MM-dd HH:mm:ss"
								placeholder="选择开始申请日期">
						</el-date-picker>
					</el-form-item>
					<el-form-item prop="signupStartTime"  label="截止申请日期">
						<el-date-picker
								v-model="searchPra"
								type="datetime"
								value-format="yyyy-MM-dd HH:mm:ss"
								placeholder="选择截止申请日期">
						</el-date-picker>
					</el-form-item>
					<el-form-item  label="客户姓名">
						<el-input v-model="searchPra" placeholder="客户姓名"></el-input>
					</el-form-item>
					<el-form-item label="证件类型">
						<el-select v-model="searchPra" placeholder="全部">
							<el-option label="全部" value="2"></el-option>
							<el-option label="机构1" value="1"></el-option>
							<el-option label="机构2" value="0"></el-option>
						</el-select>
					</el-form-item>
					<el-form-item  label="证件号码">
						<el-input v-model="searchPra" placeholder="证件号码"></el-input>
					</el-form-item>
					<el-form-item  label="邮件地址">
						<el-input v-model="searchPra" placeholder="邮件地址"></el-input>
					</el-form-item>
					<el-form-item  label="发送状态">
						<el-select v-model="searchPra" placeholder="全部">
							<el-option label="全部" value="2"></el-option>
							<el-option label="机构1" value="1"></el-option>
							<el-option label="机构2" value="0"></el-option>
						</el-select>
					</el-form-item>
					<el-form-item  label="邮件模板代码">
						<el-input v-model="searchPra" placeholder="邮件模板代码"></el-input>
					</el-form-item>
				</el-form>
			</el-col>
		</el-row>
		<el-col :span="24" class="toolbar">
			<el-button type="success" v-on:click="getList()" > 查询</el-button>
			<el-button type="warning" v-on:click="resert()" > 重置</el-button>
		</el-col>

		<!--&lt;!&ndash;列表&ndash;&gt;-->
		<el-table :data="list" highlight-current-row  @selection-change="handleSelectionChange"  style="width: 100%;">
			<el-table-column type="selection"  width="45">
			</el-table-column>
			<el-table-column prop="id" label="分支行号" >
			</el-table-column>
			<el-table-column prop="name" label="案件编号" >
			</el-table-column>
			<el-table-column prop="name" label="客户姓名" >
			</el-table-column>
			<el-table-column prop="name" label="证件类型" >
			</el-table-column>
			<el-table-column prop="name" label="证件号码" >
			</el-table-column>
			<el-table-column prop="name" label="邮件地址" >
			</el-table-column>
			<el-table-column prop="name" label="短信模板编号" width="150">
			</el-table-column>
			<el-table-column prop="name" label="发送时间" >
			</el-table-column>
			<el-table-column prop="name" label="创建人" >
			</el-table-column>
			<el-table-column prop="name" label="创建时间" >
			</el-table-column>
			<el-table-column prop="name" label="发送状态" >
			</el-table-column>

			<el-table-column label="操作" width="150">
				<template slot-scope="scope">
					<!--<el-button size="small" v-if="scope.row.on_shelf" v-on:click="modify_state(scope.row.id, scope.row, 0)">发送</el-button>-->
					<!--<el-button size="small" v-if="!scope.row.on_shelf" v-on:click="modify_state(scope.row.id, scope.row, 1)">发送</el-button>-->
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

	</section>
</template>

<script>
	import {mail} from '@/resources/'
	export default {
		data () {
			return {
				total: 0,
				pageNum: 1,
				pageSize: 10,
				//查询条件
				searchPra: '',
				list : [],	//查询结果
				multipleSelection: [],//批量选择的数组
			}
		},
		computed : {
		},
		methods: {
			//批量发送
			groupChangeState(on_shelf) {
				let ids = '';
				let vm = this;
				console.log("批量发送", this.multipleSelection.length)
				if (!this.multipleSelection.length){
					this.$message({
						message: '请先选择用户',
						type: 'warning'
					});
					return;
				}else{
					for(let productItem of this.multipleSelection){
						if (on_shelf === 0 && productItem.on_shelf === 1) {
							ids += productItem.id+','
						}else if (on_shelf === 1 && productItem.on_shelf === 0){
							ids += productItem.id+','
						}
					}
				}
				ids = ids.substring(0,ids.length-1);
				console.log("productIds", ids);
				if(ids.length < 1){
					return;
				}
				let paras = {
					productIds: ids,
					status : on_shelf
				}
				vm.send(paras)
			},

			//批量发送
			send(paras, item){
				let vm = this;
				message.sendMessage(paras).then((res) => {
					if (res.code == 1){
						this.$message({
							message: '操作成功',
							type: 'success'
						});
						if (item){
							if (item.on_shelf == 0){
								item.on_shelf =1
							}else if (item.on_shelf == 1){
								item.on_shelf = 0
							}
						}else {
							vm.get_list();
						}
					}
				});
			},
			//全选操作
			handleSelectionChange(val) {
				let list = [];
				if(val) {
					for(let productItem of val){
						let item = {
							id: productItem.id,
							on_shelf: productItem.on_shelf
						};
						list.push(item);
					}
				}
				this.multipleSelection = list;
				console.log("全选操作", this.multipleSelection);
			},
			//查询操作
			searchTableData() {
				this.get_list();
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

			//获取列表
			getList () {
				console.log('begin to get list');
				let vm = this;
				message.getList(this.searchPra).then((res) => {
					// vm.list = res.data.list;
					// vm.total = res.data.total;
				});
			},
			//重置
			resert(){

			}
		},
		created (){
			// this.get_list();
		},
		filters : {
		}
	}
</script>