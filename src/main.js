// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import VueResource from 'vue-resource'

import common from './tools/filters';

//全局过滤器
Object.keys(common).forEach(key => {
		Vue.filter(key, common[key])
})


Vue.use(ElementUI);
Vue.use(VueResource)

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
  data:{
  	baseUrl:"http://localhost:9527/",
  	userNike:'',
  },
  methods:{
  	islogin(){
  		if(!sessionStorage['sessionId']){
  				window.location.href="#/"
  		}
  	},
  	randomstr(){		//生产随机字符串
  		return Math.random().toString(36).substr(7);
  	}
  }
})
