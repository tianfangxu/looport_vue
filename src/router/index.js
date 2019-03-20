import Vue from 'vue'
import Router from 'vue-router'
import login from '@/view/login'
import index from '@/view/index'
import user from '@/view/user'
import menus from '@/view/menus'
import role from '@/view/role'
import dept from '@/view/dept'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'login',
      component: login
    },
    {
      path: '/index',
      name: 'index',
      component: index,
      children:[
      	{
      		path:'/index/user',
      		name:"user",
      		component: user,
      	},
      	{
      		path:'/index/dept',
      		name:"dept",
      		component: dept,
      	},
      	{
      		path:'/index/menus',
      		name:"menus",
      		component: menus,
      	},
      	{
      		path:'/index/role',
      		name:"role",
      		component: role,
      	}
      ]
    }
  ]
})
