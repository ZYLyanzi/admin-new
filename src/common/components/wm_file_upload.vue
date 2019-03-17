<template>
	<el-upload
		:class="classes"
		:action="setting.uploadUrl"
		:data="upyunData"
		:on-success="handleSuccess"
		:before-upload="beforeUpload"
		multiple
		:limit="1"
		ref="file_upload"
		>
		<el-button size="small" type="primary">点击上传</el-button>
		<!-- <div slot="tip" class="el-upload__tip">只能上传apk文件，且不超过50Mb</div> -->
	</el-upload>
</template>
<script>
	import store from '@/vuex/store'
	import upyun from '@/resources/upyun'
	import {upyun as upyunConfig,upyunTest as upyunTestConfig} from '@/config'
	export default {
		props:{
			styles: {
				type:Object,default:function(){
					return {}
				}
			},
			classes: {
				type:Array,default:function() {
					return ['']
				}
			},
			type: {
				type: String,default:''
			},
			imageUrl: {
				type:String,default:''
			},
			remark: {
				type:Object,default:function(){
					return {}
				}
			}
		},
		data() {
			return {
				setting:{
					imgPath:'',
					uploadUrl: '',
				},
				upyunData: {
					authorization:'',
					policy:''
				},
				defaultImg: ''
			}
		},
		methods: {
			handleSuccess(res, file) {
				let vm = this;
				if (res.code = 200){
					vm.defaultImg = vm.setting.imgUrl+res.url

					vm.$emit('success',vm.defaultImg, res, vm.remark)
				}
			},
			//文件上传前钩子
			beforeUpload(file) {
				// const isImage = (file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/gif');
				// const isLt2M = file.size / 1024 / 1024 < 2;
				// if (!isImage) {
				// 	this.$message.error('只能上传图片!');
				// 	return
				// }
				// if (!isLt2M) {
				// 	this.$message.error('上传图片大小不能超过 2MB!');
				// 	return
				// }
				let vm = this;
				vm.upyunData.authorization = "";
				vm.upyunData.policy = "";
				let fileType = file.name.split('.').pop();
				let fileName = Date.now() + parseInt(Math.random()*1000) + "." + fileType;
				//同步请求
				let res = upyun.getUploadSign(fileName, 1);
				vm.upyunData.authorization = res.data.sign;
				vm.upyunData.policy = res.data.policy;
			},
			setDefault(url) {
				this.defaultImg = url
			},
			clearFiles() {
				this.$refs.file_upload.clearFiles()
			}
		},
		created() {
			let _vm = this
			// 加载图片上传配置
			if(!window.upyun_bucket) {
				let upyunData = upyun.getUploadSign('1.jpg', 1);
				window.upyun_bucket = upyunData.data.bucket
			}

			if(window.upyun_bucket == 'wm-production'){
				this.setting.uploadUrl = upyunConfig.uploadUrl
				this.setting.imgUrl = upyunConfig.imgUrl
			}else{
				this.setting.uploadUrl = upyunTestConfig.uploadUrl
				this.setting.imgUrl = upyunTestConfig.imgUrl
			}

			if(this.imageUrl) {
				this.defaultImg = this.imageUrl
			}


		}
}
</script>