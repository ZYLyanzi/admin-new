<template>
	<el-cascader
		:placeholder="placeholder"
		:clearable="true"
		:change-on-select="true"
	    :options="area"
	    v-model="currentArea"
		:props="props"
		@change="areaChange"
	    >
	</el-cascader>
</template>
<script>
import location from '@/resources/app/location'
export default {
	props:{
		location: {
			type:Array,
			default:function() {
				return []
			}
		},
		placeholder: {
			type:String,
			default:'请选择'
		},
		default: {
			type:Number,
			default: 0
		}
	},
	data() {
		return {
			area:[],
			props:{
				value:'provinceId',
				label: 'provinceName',
				children: 'children'
			},
			currentArea:null,
		}
	},
	methods:{
		areaChange() {
			console.log('areaChange',arguments)
			this.$emit('change',...this.currentArea)
		},
		setDefault(provinceId) {
			this.currentArea = [provinceId]

		console.log(this.currentArea)
		}
	},
	created() {
		location.getProvince().then(res => {
			if(res.code === 1) {
				this.area = res.data
			}
		})
	}
}
</script>