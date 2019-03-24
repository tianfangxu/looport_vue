<template>
	<div>
		<el-button type="success" @click="addFirstMenu">新增</el-button>
		<!--数据表-->
		<el-table :data="tableData" style="width: 100%">
			<el-table-column type="expand">
				<template slot-scope="props">
					<el-table :data="props.row.list">
						<el-table-column  prop="id"  label="编号"  width="180"></el-table-column>
					    <el-table-column prop="name"  label="名称"  width="180"></el-table-column>
					    <el-table-column prop="order" label="排序" width="180"> </el-table-column>
					    <el-table-column prop="level" label="菜单级别" width="180"> </el-table-column>
					    <el-table-column label="菜单内方法" width="180">
					    	<template slot-scope="scope1">
					    		<el-tag v-for="tag in JSON.parse(scope1.row.methods)" :key="tag.code" closable @close="handleClose(tag,scope1.row,props.row)" >
									{{tag.name}}
								</el-tag>
					    	</template>
					    </el-table-column>
					    <el-table-column  label="操作" > 
					    	<template slot-scope="scope1">
						        <el-button @click="handleClick(scope1.row)" type="text" size="small">添加方法</el-button>
						        <el-button @click="deleteMenu(scope1.row)" type="text" size="small" style="color: red;">删除</el-button>
						    </template>
					    </el-table-column>
					</el-table>
				</template>
			</el-table-column>
		    <el-table-column  prop="id"  label="编号"  width="180"></el-table-column>
		    <el-table-column prop="name"  label="名称"  width="180"></el-table-column>
		    <el-table-column prop="order" label="排序" width="180"> </el-table-column>
		    <el-table-column prop="pid" label="上级菜单" width="180"> </el-table-column>
		    <el-table-column prop="level" label="菜单级别" width="180"> </el-table-column>
		    <el-table-column prop="methods" label="菜单内方法" width="180">
		    	<template slot-scope="scope2">
		    		<el-tag v-for="tag in JSON.parse(scope2.row.methods)" :key="tag.code" closable @close="handleClose2(tag,scope2.row)" >
						{{tag.name}}
					</el-tag>
		    	</template>
		    </el-table-column>
		    <el-table-column  label="操作" > 
		    	<template slot-scope="scope">
			        <el-button @click="addSecondMenu(scope.row.id)" type="text" size="small">添加下级菜单</el-button>
			        <el-button @click="handleClick(scope.row)" type="text" size="small">添加方法</el-button>
			        <el-button @click="deleteMenu(scope.row)" type="text" size="small" style="color: red;">删除</el-button>
			    </template>
		    </el-table-column>
		</el-table>
		
		 <!--分页栏-->
		<el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="menus.page"
            :page-sizes="[5, 10, 20, 40]" 
            :page-size="menus.rows"         
            layout="total, sizes, prev, pager, next, jumper"
            :total="tempdata.total">
        </el-pagination>
        
        <!--方法弹窗-->
        <el-dialog  title="新增方法"  :visible.sync="dialogVisible"  :before-close="menuClose">
		  	<el-form :model="methods" :inline="true" >
		  		<el-form-item label="名称" :label-width="formLabelWidth">
		  			<el-input v-model="methods.name" placeholder="名称" ></el-input>
		  		</el-form-item>
		  		<el-form-item label="编码" :label-width="formLabelWidth">
		  			<el-input v-model="methods.code" placeholder="编码"></el-input>
		  		</el-form-item>
		  	</el-form>
		  	<span slot="footer" class="dialog-footer">
		    	<el-button @click="menuClose">取 消</el-button>
		    	<el-button type="primary" @click="addMenu">确 定</el-button>
		  	</span>
		</el-dialog>
		
		<!--菜单弹窗-->
		<el-dialog title="新增菜单" :visible.sync="dialogFormVisible" :before-close="closeAddMenu">
		 	<el-form :model="form" :inline="true" >
			    <el-form-item label="编号" :label-width="formLabelWidth">
			      <el-input v-model="form.id" autocomplete="off"></el-input>
			    </el-form-item>
			    <el-form-item label="名称" :label-width="formLabelWidth">
			      <el-input v-model="form.name" autocomplete="off"></el-input>
			    </el-form-item>
			</el-form>
			<el-form :model="form" :inline="true" >
			    <el-form-item label="排序" :label-width="formLabelWidth">
			      <el-input v-model="form.order" autocomplete="off"></el-input>
			    </el-form-item>
			    <el-form-item label="方法" :label-width="formLabelWidth">
			     	<el-tag  :key="tag"  v-for="tag in dynamicTags"  closable  :disable-transitions="false"  @close="handleClose3(tag)">
					  {{tag}}
					</el-tag>
					<el-input  class="input-new-tag"  v-if="inputVisible"  v-model="inputValue"  ref="saveTagInput"  size="small"  @keyup.enter.native="handleInputConfirm"  @blur="handleInputConfirm">
					</el-input>
					<el-button v-else class="button-new-tag" size="small" @click="showInput">+ 名称</el-button>
			    </el-form-item>
			</el-form>
			<el-form :model="form" :inline="true" >
				<el-form-item label="上级菜单" :label-width="formLabelWidth">
			      <el-input v-model="form.pid" autocomplete="off" :disabled="true"></el-input>
			    </el-form-item>
			    <el-form-item label="菜单级别" :label-width="formLabelWidth">
			      <el-input v-model="form.level" autocomplete="off" :disabled="true"></el-input>
			    </el-form-item>
			</el-form>
			  	<div slot="footer" class="dialog-footer">
			    <el-button @click="closeAddMenu">取 消</el-button>
			    <el-button type="primary" @click="addMenuSubmit">确 定</el-button>
		  	</div>
		</el-dialog>
	</div>
</template>

<script>
	export default{
		name:"menus",
		data(){
			return {
				tableData:[],
				menus:{
					page:1,
					rows:5
				},
				tempdata:{
					total:0,
					rowwsDate:{},
				},
				dialogVisible:false,
				dialogFormVisible: false,
				methods:{
					name:'',
					code:''
				},
				form: {
					id:'',
		         	name: '',
		         	order: '',
		         	pid:'',
		         	level:'',
		         	methods:[]
		          
		        },
		        formLabelWidth: '80px',
		        dynamicTags: [],
		        inputVisible: false,
		        inputValue: ''
			}
		},
		methods:{
			menuDate(){
				var loding = this.$loading({ fullscreen: true });
				this.$http.post(this.$root.baseUrl+"user/menuall",this.menus,{
		        	headers:{
						'Content-Type': 'application/json',
						'access-token':sessionStorage['sessionId']
					}
		        }).then((res) => {
		        	loding.close();
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
			handleSizeChange: function (size) {
	               this.menus.rows = size;
	               this.menuDate();
	        },
	        handleCurrentChange: function(page){
	                this.menus.page = page;
	                this.menuDate();
	        },
	        handleClick(row) {
	       	 	this.tempdata.rowwsDate = row;
	       	 	this.dialogVisible = true;
	      	},
	      	handleClose(data,list,parent){
	      		this.$confirm('确认删除该方法？').then(_ => {
	      			//页面删除
		            var li = JSON.parse(list.methods);
		            var templist = [];
		      		for(var i in this.tableData){
		      			if(this.tableData[i].id == parent.id){
		      				for(var k in this.tableData[i].list){
		      					if(this.tableData[i].list[k].id == list.id){
				      				for(var j in li){
				      					if(li[j].code != data.code){
				      						templist.push(li[j]);
				      					}
				      				}
				      				this.tableData[i].list[k].methods = JSON.stringify(templist);
		      					}
		      				}
		      			}
		      		}
		      		//后台删除
		      		list.methods= JSON.stringify(templist);
		      		this.updateMethods(list);
		        }).catch(_ => {});
	      	},
	      	handleClose2(tag,data){
	      		this.$confirm('确认删除该方法？').then(_ => {
	      			var templist = [];
		      		var li = JSON.parse(data.methods);
		      		for(var i in this.tableData){
		      			if(this.tableData[i].id == data.id){
		      				for(var j in li){
		      					if(li[j].code != tag.code){
		      						templist.push(li[j]);
		      					}
		      				}
		      				this.tableData[i].methods = JSON.stringify(templist);
		      			}
		      		}
		      		
		      		//后台删除
		      		data.methods= JSON.stringify(templist);
		      		this.updateMethods(data);
	      		}).catch(_ => {});
	      		
	      	},
	      	updateMethods(data){
	      		var loding = this.$loading({ fullscreen: true });
				this.$http.post(this.$root.baseUrl+"user/updateMenuMethod",data,{
		        	headers:{
						'Content-Type': 'application/json',
						'access-token':sessionStorage['sessionId']
					}
		        }).then((res) => {
		        	loding.close();
		        }, (res) => {
		        	loding.close();
		        	this.$message({
				          message: "服务维护中...",
				          type: 'error'
				    });
		        })
	      	},
			menuClose(){
				this.dialogVisible = false;
				this.methods.name = '';
				this.methods.code = '';
			},
			addMenu(){
				var data = this.tempdata.rowwsDate;
				var list = JSON.parse(data.methods);
				list.push(this.methods);
				data.methods = JSON.stringify(list)
				this.menuClose();
				this.updateMethods(data);
			},
			handleClose3(tag) {
		        this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
		    },
		
		    showInput() {
		        this.inputVisible = true;
		        this.$nextTick(_ => {
		          this.$refs.saveTagInput.$refs.input.focus();
		        });
		    },
		
		    handleInputConfirm() {
		        let inputValue = this.inputValue;
		        if (inputValue) {
		          this.dynamicTags.push(inputValue);
		        }
		        this.inputVisible = false;
		        this.inputValue = '';
		    },
		    addFirstMenu(){
		    	this.dialogFormVisible = true;
		    	this.form.pid = '0000'
		    	this.form.level = '1'
		    },
		    addSecondMenu(id){
		    	this.dialogFormVisible = true;
		    	this.form.pid = id
		    	this.form.level = '2'
		    },
		    closeAddMenu(){
		    	this.dialogFormVisible = false;
				this.form.id='';
	         	this.form.name= '';
	         	this.form.order= '';
	         	this.form.pid='';
	         	this.form.level='';
	         	this.form.methods=[];
	         	this.dynamicTags=[]
		    },
		    addMenuSubmit(){
		    	var data = this.form;
		    	var me = [];
		    	this.dynamicTags.forEach( (e,i) => {
		    		me.push({"name":this.dynamicTags[i],"code":this.$root.randomstr()});
		    	});
		    	data.methods = JSON.stringify(me);
		    	
		    	var loding = this.$loading({ fullscreen: true });
				this.$http.post(this.$root.baseUrl+"user/addMenu",data,{
		        	headers:{
						'Content-Type': 'application/json',
						'access-token':sessionStorage['sessionId']
					}
		        }).then((res) => {
		        	loding.close();
		        	this.menuDate();
		        	this.closeAddMenu();
		        }, (res) => {
		        	loding.close();
		        	this.$message({
				          message: "服务维护中...",
				          type: 'error'
				    });
		        })
		    },
		    deleteMenu(data){
		    	this.$confirm('确认删除该菜单？').then(_ => {
			    	var loding = this.$loading({ fullscreen: true });
					this.$http.post(this.$root.baseUrl+"user/deleteMenu",data,{
			        	headers:{
							'Content-Type': 'application/json',
							'access-token':sessionStorage['sessionId']
						}
			        }).then((res) => {
			        	loding.close();
			        	this.menuDate();
			        	this.closeAddMenu();
			        }, (res) => {
			        	loding.close();
			        	this.$message({
					          message: "服务维护中...",
					          type: 'error'
					    });
			        })
		        }).catch(_ => {});
		    }
		},
		created(){
	    	this.menuDate();
	    }
	}
</script>

<style scoped="scoped">
	  .button-new-tag {
	    margin-left: 10px;
	    height: 32px;
	    line-height: 30px;
	    padding-top: 0;
	    padding-bottom: 0;
	  }
	  .input-new-tag {
	    width: 90px;
	    margin-left: 10px;
	    vertical-align: bottom;
	  }
</style>