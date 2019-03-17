<template>
	<el-cascader
		:placeholder="placeholder"
		:clearable="true"
		:change-on-select="true"
	    :options="area"
	    v-model="currentArea"
		:props="props"
		:disabled = "disStatus"
		@change="areaChange"
	    >
		<span>{{location.type}}</span>
	</el-cascader>
</template>
<script>
import wm_location from '@/common/utils/wm_location'
export default {
	props:{
		disStatus: false,
		location: {
			type: Array,
			default:function() {
				return []
			}
		},
		placeholder: {
			type: String,
			default:'请选择'
		}
	},
	data() {
		return {
			area:[],
			props:{
				value:'id',
				label: 'name',
				children: 'children'
			},
			currentArea:null,
		}
	},
	methods:{
		areaChange() {
			console.log('areaChange',this.currentArea)
			this.$emit('change',...this.currentArea)
		},
	},
	created() {
		this.area = wm_location
	}
}
</script>