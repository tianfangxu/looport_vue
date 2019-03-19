<template>
<div>
	<div class="login">
		<div class="contentEx">
			<el-tabs type="border-card" v-model="active">
			    <el-tab-pane label="登录" name="first">
			    	<el-form :model="loginform" status-icon :rules="loginrule" ref="loginform" label-width="100px" class="demo-ruleForm">
						  <el-form-item label="登录账号" prop="username">
						    <el-input type="text" v-model="loginform.username" autocomplete="off"></el-input>
						  </el-form-item>
						  <el-form-item label="登录密码" prop="password">
						    <el-input type="password" v-model="loginform.password" autocomplete="off"></el-input>
						  </el-form-item>
						  <el-form-item style="margin-right: 15%;">
						    <el-button type="primary" @click="submitForm()">登录</el-button>
						  </el-form-item>
					</el-form>
			    </el-tab-pane>
			    <el-tab-pane label="注册" name="second">
			    	注册
			    </el-tab-pane>
			</el-tabs>
		</div>
	</div>
</div>
</template>

<script>
	export default{
		data() {
	      var isnull = (rule, value, callback) => {
	      	console.log(value);
	        if (!value) {
	          callback(new Error('用户或密码不能为空'));
	        }else {
	          callback();
	        }
	      };
	      return {
	        loginform: {
	          username: '',
	          password: ''
	        },
	        loginrule: {
	          username: [
	            { validator: isnull, trigger: 'blur' }
	          ],
	          password: [
	            { validator: isnull, trigger: 'blur' }
	          ]
	        },
	        active:"first",
	      };
	    },
	    methods: {
	      submitForm() {
	      	if(!this.loginform.username || !this.loginform.password){
	      		return;
	      	}
	        var loding = this.$loading({ fullscreen: true });
	        alert(this.loginform.username);
	        sessionStorage['sessionId']=this.loginform.password;
	        loding.close();
	        this.$message({
		          message: '登录成功',
		          type: 'success'
		    });
		    window.location.href="#/index"
	      }
	    }
	}
</script>

<style scoped>
	.login{
		background-color: lightblue;
		background-image: url(../../static/img/backg.png);
		height: 700px;
		padding-top: 300px;
	}
	.contentEx{
		width: 30%;
		margin-left: 35%;
		background-color: white;
		text-align: center;
	}
</style>