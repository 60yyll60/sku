import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import {util} from './static/util.js'
//加载进度条
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
NProgress.configure({
  easing: 'ease', // 动画方式
  speed: 500, // 递增进度条的速度
  showSpinner: false, // 是否显示加载ico
  trickleSpeed: 200, // 自动递增间隔
  minimum: 0.3 // 初始化时的最小百分比
})
/**
 * 这里是在路由切换显示进度条
 * 后期有请求可以在axios请求时显示
 * https://www.jianshu.com/p/346c05d4d9d8
 */
// 当路由进入前
router.beforeEach((to, from, next) => {
  // 每次切换页面时，调用进度条

  NProgress.start()

  // 这个一定要加，没有next()页面不会跳转的。这部分还不清楚的去翻一下官网就明白了
  next()
})
// 当路由进入后：关闭进度条
router.afterEach(() => {
  // 在即将进入新的页面组件前，关闭掉进度条
  NProgress.done()
})


Vue.config.productionTip = false
Vue.prototype.$util = util;
import tinymce from 'tinymce'
Vue.prototype.$tinymce = tinymce
import VueTinymce from '@packy-tang/vue-tinymce'

Vue.use(VueTinymce)              // 安装vue的tinymce组件


Vue.use(ElementUI);
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
