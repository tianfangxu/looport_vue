<template>
	<div>
		<!--数据列表-->
		<el-table :data="tableData" style="width: 100%">
		    <el-table-column  prop="id"  label="编号"  width="180"></el-table-column>
		    <el-table-column  prop="name"  label="名称"  width="180"></el-table-column>
		    <el-table-column label="目录" align="center">
			    <el-table-column  v-for="node in tempdata.menulist"  :key="node[0].id" :label="node[0].lable" >
			    	<el-tree
					  :data="node"
					  show-checkbox
					  node-key="id"
					  ref="tree"
					  highlight-current
					  disabled
					  :props="defaultProps" >
					</el-tree>
			    </el-table-column>
		    </el-table-column>
		    <el-table-column  label="操作" > 
		    	<template slot-scope="scope">
			        <el-button @click="handleClick(scope.row)" type="text" size="small">操作</el-button>
			    </template>
		    </el-table-column>
		</el-table>
		 <!--分页栏-->
		<el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="role.page"
            :page-sizes="[5, 10, 20, 40]" 
            :page-size="role.rows"         
            layout="total, sizes, prev, pager, next, jumper"
            :total="tempdata.total">
       </el-pagination>
       
		<!--权限弹窗-->
        <el-dialog  title="操作权限"  :visible.sync="dialogVisible"  :before-close="handleClose">
		  	<el-tree
			  :data="menus"
			  show-checkbox
			  node-key="id"
			  ref="tree"
			  highlight-current
			  :props="defaultProps">
			</el-tree>
		  	<span slot="footer" class="dialog-footer">
		    	<el-button @click="dialogVisible = false">取 消</el-button>
		    	<el-button type="primary" @click="saveRole">保存</el-button>
		  	</span>
		</el-dialog>
	</div>
</template>

<script>
	export default{
		name:"role",
		data(){
			return {
				tableData:[],
				menus:[],
				defaultProps: {
		          children: 'children',
		          label: 'lable'
		        },
				role:{
					page:1,
					rows:5,
				},
				tempdata:{
					total:0,
					rows:[],
					resMenuid:[],
					menulist:[]
				},
				dialogVisible: false
			
			}
		},
		methods:{
			intiMenu(){
				for(var i = 0 ;i < this.menus.length;i++){
					this.tempdata.menulist.push([this.menus[i]]);
				}
			},
			handleClick(rows){
				this.dialogVisible = true;
				this.tempdata.rows = rows;
				this.$nextTick(function() {
					this.$refs.tree.setCheckedNodes(JSON.parse(rows.menuid));
				});
				
			},
			saveRole(){
				this.tempdata.resMenuid = this.$refs.tree.getCheckedNodes();
				var data = this.tempdata.rows;
				data.menuid = JSON.stringify( this.tempdata.resMenuid);
				var loding = this.$loading({ fullscreen: true });
	        	this.$http.post(this.$root.baseUrl+"user/updateRole",data,{
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
		        	this.getData();
		        }, (res) => {
		        	loding.close();
		        	this.$message({
				          message: "服务维护中...",
				          type: 'error'
				    });
		        })
			},
			getData(){
				var loding = this.$loading({ fullscreen: true });
	        	this.$http.post(this.$root.baseUrl+"user/roleAll",this.role,{
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
			getMenuList(){
				var loding = this.$loading({ fullscreen: true });
	        	this.$http.post(this.$root.baseUrl+"user/menuforData",{},{
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
		        	this.menus = res.body.result;
		        	this.intiMenu();
		        }, (res) => {
		        	loding.close();
		        	this.$message({
				          message: "服务维护中...",
				          type: 'error'
				    });
		        })
			},
			handleSizeChange: function (size) {
	               this.role.rows = size;
	        },
	        handleCurrentChange: function(page){
	                this.role.page = page;
	        },
	        handleClose(){
	        	this.dialogVisible = false;
	        }
		},
		created(){
			this.getData();
			this.getMenuList();
		}
	}
</script>

<style>
</style>