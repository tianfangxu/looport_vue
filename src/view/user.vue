<template>
	<div>
		<!--查询表单-->
		<el-form :inline="true" :model="users" class="demo-form-inline">
		  <el-form-item label="名称">
		    <el-input v-model="users.name" placeholder="name"></el-input>
		  </el-form-item>
		  <el-form-item>
		    <el-button type="primary" @click="onSubmit">查询</el-button>
		    <el-button type="success" @click="dialogVisible = true">新增</el-button>
		  </el-form-item>
		</el-form>
		
		<!--数据列表-->
		<el-table :data="tableData" style="width: 100%">
		    <el-table-column  prop="nike"  label="昵称"  width="180"></el-table-column>
		    <el-table-column prop="name"  label="用户"  width="180"></el-table-column>
		    <el-table-column prop="password" label="密码" width="180"> </el-table-column>
		    <el-table-column label="注册日期" width="180">
		    	<template slot-scope='scope'>
		    		{{scope.row.createtime | timeForMart}} 
		    	</template>
		    </el-table-column>
		    <el-table-column  label="操作" > 
		    	<template slot-scope="scope">
			        <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
			        <el-button type="text" size="small">编辑</el-button>
			    </template>
		    </el-table-column>
		</el-table>
		 
		 <!--分页栏-->
		<el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="users.page"
            :page-sizes="[5, 10, 20, 40]" 
            :page-size="users.rows"         
            layout="total, sizes, prev, pager, next, jumper"
            :total="tempdata.total">
        </el-pagination>
        
        <!--弹窗-->
        <el-dialog  title="新增用户"  :visible.sync="dialogVisible"  width="30%"  :before-close="handleClose">
		  	<el-form :model="addusers" status-icon :rules="rules2" >
		  		<el-form-item label="昵称" prop="nike">
		  			<el-input v-model="addusers.nike" placeholder="昵称" ></el-input>
		  		</el-form-item>
		  		<el-form-item label="用户名" prop="name">
		  			<el-input v-model="addusers.name" placeholder="用户名"></el-input>
		  		</el-form-item>
		  		<el-form-item label="密码" prop="password">
		  			<el-input type="password" v-model="addusers.password" placeholder="密码"></el-input>
		  		</el-form-item>
		  		<el-form-item label="确认密码"  prop="checkpass">
		  			<el-input type="password" v-model="addusers.checkpass" placeholder="确认密码"></el-input>
		  		</el-form-item>
		  	</el-form>
		  	<span slot="footer" class="dialog-footer">
		    	<el-button @click="handleClose">取 消</el-button>
		    	<el-button type="primary" @click="addUser">确 定</el-button>
		  	</span>
		</el-dialog>
	</div>
</template>

<script>
	export default{
		name:'user',
		data() {
			var validatePass = (rule, value, callback) => {
				if (!value) {
		          	callback(new Error('请再次输入密码'));
		        } else if (value !== this.addusers.password) {
		          	callback(new Error('两次输入密码不一致!'));
		        } else {
		          	callback();
		        }
			}
			var checknull = (rule, value, callback) => {
				if (!value) {
		          	callback(new Error('必须输入'));
		        } else {
		          	callback();
		        }
			}
			
		    return {
	            dialogVisible:false,
		        users: {
		         	name: '',
		          	page:1, //初始页
	            	rows:5, //每页的数据
		        },
		        tableData: [],
		        addusers:{
		        	nike:"",
		        	name:"",
		        	password:"",
		        	checkpass:''
		        },
		        rules2:{
		        	checkpass: [
			            { validator: validatePass, trigger:'blur'}
			        ],
			        nike :[
			        	{ validator: checknull, trigger: 'blur' }
			        ],
			        password :[
			        	{ validator: checknull, trigger: 'blur' }
			        ],
			        name :[
			        	{ validator: checknull, trigger: 'blur' }
			        ],
		        },
		        tempdata:{
		        	total:0,
		        }
		    }
	    },
	    methods: {
	     	onSubmit() {
	     		this.users.page = 1;
	       		this.getUserDate();
	      	},
	      	handleClick(row) {
	       	 	console.log(row);
	      	},
	        handleSizeChange: function (size) {
	               this.users.rows = size;
	               this.getUserDate();
	        },
	        handleCurrentChange: function(page){
	                this.users.page = page;
	                this.getUserDate();
	        },
	        getUserDate(){
	        	var loding = this.$loading({ fullscreen: true });
	        	this.$http.post(this.$root.baseUrl+"user/all",this.users,{
		        	headers:{
						'Content-Type': 'application/json',
						'access-token':sessionStorage['sessionId']
					}
		        }).then((res) => {
		        	loding.close();
		        	if(res.body.code == 100010002){
				        this.$message({
					          message: res.body.msg,
					          type: 'error'
					    });
					    return;
		        	}
		        	this.tableData = res.body.result;
		        	this.tempdata.total = res.body.total;
		        }, (res) => {
		        	loding.close();
		        	this.$message({
				          message: "服务维护中...",
				          type: 'error'
				    });
		        })
	        	
	        },
	        handleClose() {
	        	this.clearUserForm();
		       	this.dialogVisible = false;
		    },
		    clearUserForm(){
		    	this.addusers.nike = '';
		    	this.addusers.name = '';
		    	this.addusers.password = '';
		    	this.addusers.checkpass = '';
		    },
		    addUser(){
		    	var loding = this.$loading({ fullscreen: true });
		    	var data = this.addusers;
		    	delete data.checkpass;
	        	this.$http.post(this.$root.baseUrl+"user/save",data,{
		        	headers:{
						'Content-Type': 'application/json',
						'access-token':sessionStorage['sessionId']
					}
		        }).then((res) => {
		        	loding.close();
		        	this.clearUserForm();
		       		this.dialogVisible = false;
		        	this.getUserDate();
		        	this.$message({
				          message: res.body.msg,
				          type: 'success'
				    });
		        }, (res) => {
		        	loding.close();
		        	this.$message({
				          message: "服务维护中...",
				          type: 'error'
				    });
		        })
		    	
		    }
	    },
	    created(){
	    	this.getUserDate();
	    }
	}
</script>

<style scoped="scoped">
	.el-pagination{
		margin-top: 20px;
	}
</style>