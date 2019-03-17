<!--
<pagination ref="pagination"
	@change="onListChange" // 获取到数据
	:resource="resource" // 资源对象
	:params="params" // 查询参数
	fun="getList" // 资源对象中获取列表的方法名
	>
</pagination>
 -->
<template>
	<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
			:page-sizes="[10, 15, 30, 50, 100]"
			:page-size="pageSize"
			layout="total, sizes, prev, pager, next, jumper"
			:total="total" style="float:right;">
	</el-pagination>
</template>
<script>
export default {
	props:{
		resource:{
			type:Object
		},
		params:{
			type:Object
		},
		fun: {
			type:String,
			default: 'getList'
		},
		autoload: {
			type:Boolean,
			default: true
		}
	},
	data() {
		return {
			total:0, pageSize:10, pageNum: 1
		}
	},
	methods: {
		//调节列表行数
        handleSizeChange(val) {
            this.pageSize = val;
            this.getList();
		},
        //翻页操作
        handleCurrentChange(val) {
            this.pageNum = val;
            this.getList();
        },
		//获取活动列表
		getList () {
			var vm = this
            let para = {
                pageNum: vm.pageNum,
                pageSize: vm.pageSize
            };
            para = Object.assign(para,this.params)

	        this.resource[this.fun](para).then((res) => {
	        	if(res.code === 1) {
		        	vm.total = res.data.total
		        	vm.pageSize = res.data.pageSize
					vm.$emit('change',res.data.list,res.data)
	        	}
	        });
		}
	},
	created() {
		if(this.autoload) {
			this.getList()
		}
	}
}
</script>