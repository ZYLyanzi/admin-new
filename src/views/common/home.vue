<style scoped>
	.name-icon {
		display: inline-block;    margin-right: 5px;
		width:24px;height:24px;line-height: 24px;text-align: center;
		font-weight:bold;color:#fff;background:#20a0ff;
		text-decoration: none;
		font-family: 'Georgia';
	}
</style>
<template>
	<el-row class="container">
		<el-col :span="24" class="header">
			<el-col :span="10" class="logo" :class="collapsed?'logo-collapse-width':'logo-width'">
				<el-dropdown split-button type="success" v-if="!collapsed" @command="chooseGroup">
				  {{group.name}}
				  <el-dropdown-menu slot="dropdown">
				    <el-dropdown-item v-for="item,index in allMenus" :key="item.id" v-text="item.name" :command="index"></el-dropdown-item>
				  </el-dropdown-menu>
				</el-dropdown>

			</el-col>
			<el-col :span="10">
				<div class="tools" @click.prevent="collapse">
					<i class="el-icon-menu"></i>
				</div>
			</el-col>
			<el-col :span="4" class="userinfo">
				<el-dropdown trigger="hover">
					<span class="el-dropdown-link userinfo-inner"><img :src="sysUserAvatar" /> {{sysUserName}}</span>
					<el-dropdown-menu slot="dropdown">
						<el-dropdown-item>我的消息</el-dropdown-item>
						<el-dropdown-item>设置</el-dropdown-item>
						<el-dropdown-item divided @click.native="logout">退出登录</el-dropdown-item>
					</el-dropdown-menu>
				</el-dropdown>
			</el-col>
		</el-col>
		<el-col :span="24" class="main">
			<aside :class="collapsed?'menu-collapsed':'menu-expanded'">
				<!--导航菜单-->
				<el-menu :default-active="$route.path" :class="collapsed?'el-menu-vertical-demo':'el-menu-vertical-demo zhedieqian'" @open="handleopen" @close="handleclose" @select="handleselect"
					 unique-opened router v-show="!collapsed" ref="zhedieqian">
					<template v-for="(item,index) in group.children" v-if="!item.hidden">
						<el-submenu :index="index+''" v-if="!item.leaf">
							<template slot="title">
								<i :class="item.iconCls" v-if="item.iconCls"></i>
								<i class="name-icon" v-if="!item.iconCls" >{{item.name | nameIcon}}</i>
								{{item.name}}
							</template>
							<el-menu-item v-for="child in item.children" :index="child.path" :key="child.path" v-if="!child.hidden">{{child.name}}</el-menu-item>
						</el-submenu>
						<el-menu-item v-if="item.leaf&&item.children.length>0" :index="item.children[0].path"><i :class="item.iconCls"></i>{{item.children[0].name}}</el-menu-item>
					</template>
				</el-menu>
				<!--导航菜单-折叠后-->
				<ul class="el-menu el-menu-vertical-demo collapsed" v-show="collapsed" ref="menuCollapsed">
					<li v-for="(item,index) in group.children" :key="index" v-if="!item.hidden" class="el-submenu item">
						<template v-if="!item.leaf">
							<div class="el-submenu__title" style="padding-left: 20px;" @mouseover="showMenu(index,true)" @mouseout="showMenu(index,false)"><i class="name-icon" >{{item.name | nameIcon}}</i></i></div>
							<ul class="el-menu submenu" :class="'submenu-hook-'+index" @mouseover="showMenu(index,true)" @mouseout="showMenu(index,false)">
								<li v-for="child in item.children" v-if="!child.hidden" :key="child.path" class="el-menu-item" style="padding-left: 40px;" :class="$route.path==child.path?'is-active':''" @click="$router.push(child.path)">{{child.name}}</li>
							</ul>
						</template>
						<template v-else>
							<li class="el-submenu">
								<div class="el-submenu__title el-menu-item" style="padding-left: 20px;height: 56px;line-height: 56px;padding: 0 20px;" :class="$route.path==item.children[0].path?'is-active':''" @click="$router.push(item.children[0].path)"><i :class="item.iconCls"></i></div>
							</li>
						</template>
					</li>
				</ul>
			</aside>
			<section class="content-container" v-loading="loading">
				<div class="grid-content bg-purple-light">
					<el-col :span="24" class="breadcrumb-container">
						<strong class="title">{{$route.name}}</strong>
						<el-breadcrumb separator="/" class="breadcrumb-inner">
							<el-breadcrumb-item v-for="item in $route.matched" :key="item.path">
								{{ item.name }}
							</el-breadcrumb-item>
						</el-breadcrumb>
					</el-col>
					<el-col :span="24" class="content-wrapper">
						<transition name="fade" mode="out-in">
							<router-view></router-view>
						</transition>
					</el-col>
				</div>
			</section>
		</el-col>
	</el-row>
</template>

<script>
	import { mapGetters } from 'vuex'
	import menuUtils from '@/common/utils/menu_utils'
	export default {
		data() {
			return {
				sysName:'微马体育业务运营支持系统',
				collapsed:false,
				sysUserName: '',
				sysUserAvatar: '/static/images/user.jpg',
				form: {
					name: '',
					region: '',
					date1: '',
					date2: '',
					delivery: false,
					type: [],
					resource: '',
					desc: ''
				},
				menu_list : [],
				allMenus: [],
				group:{}
			}
		},
		methods: {
			chooseGroup(index) {
				this.group = this.allMenus[index]
				// this.menu_list = this.group.children
				this.$store.commit('setGroup',index)
			},
			onSubmit() {
				console.log('submit!');
			},
			handleopen() {
				console.log('handleopen');
			},
			handleclose() {
				//console.log('handleclose');
			},
			handleselect: function (a, b) {
			},
			//退出登录
			logout: function () {
				var _this = this;
				this.$confirm('确认退出吗?', '提示', {
					//type: 'warning'
				}).then(() => {
					sessionStorage.removeItem('user');
					sessionStorage.removeItem('menu_list');
					sessionStorage.removeItem('routes');
					// this.$store.commit('REMOVE_USER')
					_this.$router.push('/login');
				}).catch(() => {

				});


			},
			//折叠导航栏
			collapse:function(){
				this.collapsed=!this.collapsed;
			},
			showMenu(i,status){
				this.$refs.menuCollapsed.getElementsByClassName('submenu-hook-'+i)[0].style.display=status?'block':'none';
			},

		},
		created() {
			var user = sessionStorage.getItem('user');
			if (user) {
				user = JSON.parse(user);
				this.sysUserName = user.name || '';
			}
			this.allMenus = this.$store.getters.menus
			if(this.currentGroup === null) {
				this.$store.commit('setGroup')
			}
			this.group = this.allMenus[this.currentGroup]?this.allMenus[this.currentGroup]:this.allMenus[0]
			this.menu_list = this.group.children

		},
		watch: {
			newMenus(m) {
				this.allMenus = this.newMenus;
				if(this.currentGroup === null) {
					this.$store.commit('setGroup')
				}
				this.group = this.allMenus[this.currentGroup]?this.allMenus[this.currentGroup]:this.allMenus[0]
				this.menu_list = this.group.children
			}
		},
		filters: {
			nameIcon: function (name) {
				return name.charAt(0).toUpperCase()
			}
		},
		computed: {
			currentGroup() {
				return this.$store.getters.currentGroup
			},
			loading() {
				return this.$store.getters.loading
			},
			...mapGetters({
				newMenus: 'menus'
			}),
		}
	}

</script>

<style scoped lang="scss">
	@import '~scss_vars';

	.container {
		position: absolute;
		top: 0px;
		bottom: 0px;
		width: 100%;
		.header {
			height: 60px;
			line-height: 60px;
			background: $color-primary;
			color:#fff;
			.userinfo {
				text-align: right;
				padding-right: 35px;
				float: right;
				.userinfo-inner {
					cursor: pointer;
					color:#fff;
					img {
						width: 40px;
						height: 40px;
						border-radius: 20px;
						margin: 10px 0px 10px 10px;
						float: right;
					}
				}
			}
			.logo {
				//width:230px;
				height:60px;
				font-size: 22px;
				padding-left:20px;
				padding-right:20px;
				border-color: rgba(238,241,146,0.3);
				border-right-width: 1px;
				border-right-style: solid;
				img {
					width: 40px;
					float: left;
					margin: 10px 10px 10px 18px;
				}
				.txt {
					color:#fff;
				}
			}
			.logo-width{
				width:230px;
			}
			.logo-collapse-width{
				width:60px
			}
			.tools{
				padding: 0px 23px;
				width:14px;
				height: 60px;
				line-height: 60px;
				cursor: pointer;
			}
		}
		.main {
			display: flex;
			// background: #324057;
			position: absolute;
			top: 60px;
			bottom: 0px;
			overflow: hidden;
			aside {
				flex:0 0 230px;
				width: 230px;
				// position: absolute;
				// top: 0px;
				// bottom: 0px;
				.el-submenu .el-menu {
					background-color: #e4e8f1 !important;
				}
				.el-menu{
					height: 100%;
					width: 230px;
					background-color: #eef1f6 !important;
					overflow-y: auto;
				}
				.collapsed{
					width:60px;
					.item{
						position: relative;
					}
					.submenu{
						position:absolute;
						top:0px;
						left:60px;
						z-index:99999;
						height:auto;
						display:none;
					}

				}
			}
			.menu-collapsed{
				flex:0 0 60px;
				width: 60px;
			}
			.menu-expanded{
				flex:0 0 230px;
				width: 230px;
				.zhedieqian{
					width: 230px !important;
				}
			}
			.content-container {
				// background: #f1f2f7;
				flex:1;
				// position: absolute;
				// right: 0px;
				// top: 0px;
				// bottom: 0px;
				// left: 230px;
				overflow-y: scroll;
				padding: 20px;
				.breadcrumb-container {
					//margin-bottom: 15px;
					.title {
						width: 200px;
						float: left;
						color: #475669;
					}
					.breadcrumb-inner {
						float: right;
					}
				}
				.content-wrapper {
					background-color: #fff;
					box-sizing: border-box;
				}
			}
		}
	}
</style>