<template>
<div>
	<div class="login">
		<div class="contentEx">
			<el-tabs type="border-card" v-model="active">
			    <el-tab-pane label="登录" name="first">
			    	<el-form :model="loginform" status-icon :rules="loginrule" ref="loginform" label-width="100px" class="demo-ruleForm">
						  <el-form-item label="登录账号" prop="name">
						    <el-input type="text" v-model="loginform.name" autocomplete="off"></el-input>
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
	        if (!value) {
	          callback(new Error('用户或密码不能为空'));
	        }else {
	          callback();
	        }
	      };
	      return {
	        loginform: {
	          name: '',
	          password: ''
	        },
	        loginrule: {
	          name: [
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
	      	if(!this.loginform.name || !this.loginform.password){
	      		return;
	      	}
	        var loding = this.$loading({ fullscreen: true });
	        this.$http.post(this.$root.baseUrl+"user/login",this.loginform,{
	        	headers:{
					'Content-Type': 'application/json'
				}
	        }).then((res) => {
	        	res = res.body;
	        	if(res.code == 100010001){
	        		sessionStorage['sessionId']=res.result.sessionId;
	        		this.$root.userNike = res.result.user;
			        loding.close();
			        this.$message({
				          message: res.msg,
				          type: 'success'
				    });
				    window.location.href="#/index"
	        	}else{
	        		loding.close();
			        this.$message({
				          message: res.msg,
				          type: 'error'
				    });
	        	}
	        }, (res) => {
	        	loding.close();
	        	this.$message({
			          message: "服务维护中...",
			          type: 'error'
			    });
	        })
	        
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