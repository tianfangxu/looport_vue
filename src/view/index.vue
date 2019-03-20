<template>
	<el-container>
		  <el-header height="110px">
		  		<h1>{{nike + ','}}欢迎来到looport</h1>
		  		<a class="logout" @click="logout">退出</a>
		  </el-header>
		  <el-container>
			    <el-aside width="300px">
			    	<el-menu
				      default-active="1"
				      class="el-menu-vertical-demo"
				      @open="handleOpen"
				      @close="handleClose">
				       <el-submenu index="1">
				       	<template slot="title">
				        	<i class="el-icon-menu"></i>
				        	<span>系统</span>
				        </template>
				        <el-menu-item index="1-1" @click="linkHref('#/index/user')">
				        	<span>用户</span>
				        </el-menu-item>
				        <el-menu-item index="1-2" @click="linkHref('#/index/dept')">
				        	<span>部门</span>
				        </el-menu-item>
				        <el-menu-item index="1-3" @click="linkHref('#/index/menus')">
				        	<span>菜单</span>
				        </el-menu-item>
				        <el-menu-item index="1-4" @click="linkHref('#/index/role')">
				        	<span>权限</span>
				        </el-menu-item>
				      </el-submenu>
				    </el-menu>
			    </el-aside>
			    <el-main>
			    	<router-view/>
			    </el-main>
		  </el-container>
	</el-container>
</template>

<script>
	export default {
	  	name: 'index',
	  	data(){
	  		return {
	  			nike:'',
	  		}
	  	},
	   	methods: {
	      handleOpen(key, keyPath) {this.linkHref('#/index/user')},
	      handleClose(key, keyPath) {window.location.href="#/index";},
	      linkHref(uri){window.location.href=uri;},
	      logout(){
	      	sessionStorage['sessionId']='';
	      	window.location.href="#/";
	      },
	      
	    },
	    created(){
	    	this.$root.islogin();
	    	this.nike = this.$root.userNike;
	    	console.log(this.nike)
	    }
	}
</script>

<style scoped>
	.el-header{
		background-color: lightcyan;
		color: cadetblue;
		text-align: center;
	}
	.logout{
		float: right;
	}
</style>