<template>
	<div>
		<el-row>
		  	<el-col :span="24"><el-tag>系统</el-tag></el-col>
		</el-row>
		<el-row>
		  	<el-col :span="6"><el-tag>用户</el-tag></el-col>
		  	<el-col :span="6"><el-tag>部门</el-tag></el-col>
		  	<el-col :span="6"><el-tag>权限</el-tag></el-col>
		  	<el-col :span="6"><el-tag>菜单</el-tag></el-col>
		</el-row>
		<el-row>
		  	<el-col :span="12"><el-tag>系统</el-tag></el-col>
		  	<el-col :span="12"><el-tag>系统</el-tag></el-col>
		</el-row>
		
	</div>
</template>

<script>
	export default{
		name:"dept"
	}
</script>

<style scoped="scoped">
	.el-col{
		text-align: center;
		}
</style>