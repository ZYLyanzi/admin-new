<template>
  <el-form :model="ruleForm2" :rules="rules2" ref="ruleForm2" label-position="left" label-width="0px" class="demo-ruleForm login-container">
    <h3 class="title">系统登录</h3>
    <el-form-item prop="account">
      <el-input type="text" v-model="ruleForm2.account" auto-complete="off" placeholder="账号"></el-input>
    </el-form-item>
    <el-form-item prop="checkPass">
      <el-input type="password" v-model="ruleForm2.checkPass" auto-complete="off" placeholder="密码"></el-input>
    </el-form-item>
    <el-checkbox v-model="checked" checked class="remember">记住密码</el-checkbox>
    <el-form-item style="width:100%;">
      <el-button type="primary" style="width:100%;" @click.native.prevent="handleSubmit2" :loading="logining">登录</el-button>
    </el-form-item>
	  <div>
		  {{data}}
	  </div>
  </el-form>
</template>

<script>
	import menu from '@/common/utils/menu'

    import userResource from '@/resources/user'
    import adminResource from '@/resources/administrator'
    import menuResource from '@/resources/menu'
    import axios from 'axios'
    import menuUtils from '@/common/utils/menu_utils'
    import cookie from 'cookie-parser'
    import { mapActions, mapGetters } from 'vuex'
    // import mock from '@/mock/user'
    // mock.bootstrap()
    export default {
        data() {
            return {
                logining: false,
                ruleForm2: {
                    account: '',
                    checkPass: ''
                },
                rules2: {
                    account: [
                        { required: true, message: '请输入账号', trigger: 'blur' },
                        //{ validator: validaePass }
                    ],
                    checkPass: [
                        { required: true, message: '请输入密码', trigger: 'blur' },
                        //{ validator: validaePass2 }
                    ]
                },
                checked: true,
	            data: '',
            };
        },
        methods: {
            handleReset2() {
                this.$refs.ruleForm2.resetFields();
            },
            handleSubmit2(ev) {
                var _this = this;
                this.$refs.ruleForm2.validate((valid) => {
                    if (valid) {
                        // this.logining = true;

	                    let loginParams = { name: this.ruleForm2.account, pwd: this.ruleForm2.checkPass };
	                    //仿登陆
		                    let user = {
			                    name:loginParams.name,
			                    auth_token: 'afcddd5cfa0540b89e9837f716c1c6eb',
			                    id: 78,
			                    avator:'http://img0.imgtn.bdimg.com/it/u=2643935020,1131285829&fm=214&gp=0.jpg',
		                    };
		                    let routers = []
		                    window.sessionStorage.setItem('user', JSON.stringify(user))

		                    _this.data = menu;
		                    let  menu_list = _this.data;
		                    console.log(menu_list);
		                    if(menu_list){
//		                    menu_list.map(function(v){
//			                    v.id = v.menuId
//			                    v.name = v.menuName
//		                    })
			                    window.sessionStorage.setItem('routes',JSON.stringify(menu_list))
			                    this.$store.commit('LOAD_ROUTES')
			                    console.log("this.$store.getters.getRoutes", this.$store.getters.getRoutes)
			                    this.$router.addRoutes(this.$store.getters.getRoutes)
			                    this.$router.push({ path: '/' })
		                    }

	                    //登陆

//                        userResource.login(loginParams).then(res => {
//                            this.logining = false;
//                            let {code , msg , data} = res;
//
//                            if (code === 1) {
//                                let user = {
//                                    name:loginParams.name,
//                                    auth_token:data.auth_token,
//                                    id:data.id,
//                                    avator:'http://img0.imgtn.bdimg.com/it/u=2643935020,1131285829&fm=214&gp=0.jpg',
//                                };
//                                let routers = []
//                                window.sessionStorage.setItem('user', JSON.stringify(user))
//
//
//
//	                            _this.data = menu;
//	                            let  menu_list = _this.data;
//	                            console.log(menu_list);
//	                            if(menu_list){
////		                    menu_list.map(function(v){
////			                    v.id = v.menuId
////			                    v.name = v.menuName
////		                    })
//		                            window.sessionStorage.setItem('routes',JSON.stringify(menu_list))
//		                            this.$store.commit('LOAD_ROUTES')
//		                            console.log("this.$store.getters.getRoutes", this.$store.getters.getRoutes)
//		                            this.$router.addRoutes(this.$store.getters.getRoutes)
//		                            this.$router.push({ path: '/' })
//	                            }
//
//
////                                if(user.name === 'admin') {
////
////                                    menuResource.getList().then(res => {
////                                    	console.log("admin---menu", JSON.stringify(res.data))
////	                                    _this.data = res.data;
//////                                        let  menu_list = res.data.list
//////                                        if(menu_list){
//////                                            window.sessionStorage.setItem('routes',JSON.stringify(menu_list))
//////                                            this.$store.commit('LOAD_ROUTES')
//////                                            this.$router.addRoutes(this.$store.getters.getRoutes)
//////                                            this.$router.push({ path: '/' })
//////                                        }
////                                    })
////
////
////                                }else{
////
////                                    adminResource.queryUserMenu({id:user.id}).then(res => {
////	                                    console.log("user---menu", res.data)
////	                                    _this.data = res.data;
////
////                                        let  menu_list = res.data
//////                                        if(menu_list){
//////                                            menu_list.map(function(v){
//////                                                v.id = v.menuId
//////                                                v.name = v.menuName
//////                                            })
//////                                            window.sessionStorage.setItem('routes',JSON.stringify(menu_list))
//////                                            this.$store.commit('LOAD_ROUTES')
//////                                            this.$router.addRoutes(this.$store.getters.getRoutes)
//////                                            this.$router.push({ path: '/' })
//////                                        }
////
////                                    })
////
////
////                                }
//
//
//
//
//                                // 配置用户authtoken
//                                axios.defaults.headers.common['Authorization'] = user.auth_token;
//
//                            }
//                        });

                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
        },
        computed: {

        },
        created:function(){

        }
    }

</script>

<style lang="scss" scoped>
  .login-container {
    /*box-shadow: 0 0px 8px 0 rgba(0, 0, 0, 0.06), 0 1px 0px 0 rgba(0, 0, 0, 0.02);*/
    -webkit-border-radius: 5px;
    border-radius: 5px;
    -moz-border-radius: 5px;
    background-clip: padding-box;
    margin: 180px auto;
    width: 350px;
    padding: 35px 35px 15px 35px;
    background: #fff;
    border: 1px solid #eaeaea;
    box-shadow: 0 0 25px #cac6c6;
    .title {
      margin: 0px auto 40px auto;
      text-align: center;
      color: #505458;
    }
    .remember {
      margin: 0px 0px 35px 0px;
    }
  }
</style>