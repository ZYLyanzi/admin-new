<style>
	.avatar-uploader {
		display: inline-block;
		width:100px;
		height:100px;
	}
	.avatar-uploader .el-upload {
		border: 1px dashed #d9d9d9;
		width:100%;height:100%;
		border-radius: 6px;
		cursor: pointer;
		position: relative;
		overflow: hidden;
	}
	.avatar-uploader .el-upload:hover {
		border-color: #409EFF;
	}

	.avatar-uploader .el-upload-list__item {
		width: 100%;
		height: 100%;
		display: inline-block;
	}
	.avatar-uploader-icon {
		font-size: 28px;
		color: #8c939d;
		width: 100%;
		height: 100%;
		line-height: 100%;
		text-align: center;
	}
	.avatar {
		width: 100%;
		height: 100%;
		display: block;
	}
	.el-upload .el-icon-plus:before {
		position: absolute;
		top: 50%;
		left: 50%;
		margin: -14px 0 0 -14px;
	}
	.equipment-upload {
		width: 100%;
		height: 100%;
	}

	.equipment-upload .el-upload-list__item,
	.equipment-upload .el-upload--picture-card {
		width: 60px;
		height: 60px;
	}

	.productImages-box,
	.avatar-uploader .el-upload-list__item {
		width: 60px;
		height: 60px;
	}

	.productImages-box {
		display: table-footer-group;
	}

	.el-upload-dragger {
		width: 100%;
		height: 100%;
		border: none;
	}

</style>
<template>
	<el-upload
	:class="classes"
	:action="setting.uploadUrl"
	:data="upyunData"
	:show-file-list="false"
	:disabled="disabledType"
	:drag="true"
	:on-success="handleSuccess"
	:style="styles"
	:before-upload="beforeUpload">
	<img v-if="defaultImg" :src="defaultImg" class="avatar">
	<i v-else class="el-icon-plus avatar-uploader-icon"></i>
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
					return ['avatar-uploader']
				}
			},
			type: {
				type: String,default:''
			},
			imageUrl: {
				type:String,default:''
			},
			disabledType: {
				type: Boolean
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
				const isImage = (file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/gif');
				const isLt2M = file.size / 1024 / 1024 < 2;
				if (!isImage) {
					this.$message.error('只能上传图片!');
					return
				}
				if (!isLt2M) {
					this.$message.error('上传图片大小不能超过 2MB!');
					return
				}
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