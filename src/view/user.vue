<template>
	<div>
		<!--查询表单-->
		<el-form :inline="true" :model="users" class="demo-form-inline">
		  <el-form-item label="名称">
		    <el-input v-model="users.name" placeholder="name"></el-input>
		  </el-form-item>
		  <el-form-item>
		    <el-button type="primary" @click="onSubmit">查询</el-button>
		  </el-form-item>
		</el-form>
		
		<!--数据列表-->
		 <el-table
		    :data="tableData"
		    border
		    style="width: 100%">
		    <el-table-column
		      prop="date"
		      label="日期"
		      width="180">
		    </el-table-column>
		    <el-table-column
		      prop="name"
		      label="姓名"
		      width="180">
		    </el-table-column>
		    <el-table-column
		      prop="address"
		      label="地址">
		    </el-table-column>
		  </el-table>
		 
		 <!--分页栏-->
		<el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-sizes="[5, 10, 20, 40]" 
            :page-size="pagesize"         
            layout="total, sizes, prev, pager, next, jumper"
            :total="tableData.length">
        </el-pagination>
	</div>
</template>

<script>
	export default{
		name:'user',
		data() {
	      return {
	      	currentPage:1, //初始页
            pagesize:10,    //    每页的数据
	        users: {
	          name: '',
	        },
	        tableData: [{
	          date: '2016-05-02',
	          name: '王小虎',
	          address: '上海市普陀区金沙江路 1518 弄'
	        }, {
	          date: '2016-05-04',
	          name: '王小虎',
	          address: '上海市普陀区金沙江路 1517 弄'
	        }, {
	          date: '2016-05-01',
	          name: '王小虎',
	          address: '上海市普陀区金沙江路 1519 弄'
	        }, {
	          date: '2016-05-03',
	          name: '王小虎',
	          address: '上海市普陀区金沙江路 1516 弄'
	        }]
	      }
	    },
	    methods: {
	     	onSubmit() {
	       		console.log('submit!');
	      	},
	      	handleClick(row) {
	       	 	console.log(row);
	      	},
	        handleSizeChange: function (size) {
	                this.pagesize = size;
	                console.log(this.pagesize)  //每页下拉显示数据
	        },
	        handleCurrentChange: function(currentPage){
	                this.currentPage = currentPage;
	                console.log(this.currentPage)  //点击第几页
	        },
	    }
	}
</script>

<style scoped="scoped">
	.el-pagination{
		text-align: center;
		margin-top: 20px;
	}
</style>