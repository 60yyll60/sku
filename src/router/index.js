import Vue from 'vue'
import VueRouter from 'vue-router'
import pageIndex from "@/views/pageIndex";


Vue.use(VueRouter)
/**
 * 路由
 * 没有children则为一级菜单，第二个导航不用展示
 * 在children的每个路由下面 有meta属性的则是要展示在导航菜单上的 其中parentTitle属性为该路由的父级菜单。
 * 父级菜单就只是做个分类，如果meta包含children属性，children必须是一个字符串数组，里面对应的为改页面跳转的页面，
 * 目的是为了导航高亮不消失
 */
const routes = [
  {
    path: '',
    component: pageIndex,
    children:[
      /**
       * 首页没有二级导航就不用添加children字段
       */
      {
        path:'/',
        name:'homePage',
        component: () => import('../views/homePage'),
        meta:{path:'/',name:'首页'},
      },
      /**
       * 商品
       */
      {
        path:'',
        component: () => import('../views/product/productMain'),
        meta:{path:'/productList',name:'商品'},
        children: [
          /**
           * 商品管理
           */
          {
            path:'productList',
            name:'productList',
            component: () => import('../views/product/productList'),
            meta:{path:'/productList',name:'商品列表',parentTitle:'商品管理',children:['/addProduct']}
          },
          /**
           * 规格管理
           */
          {
            path:'skuManager',
            name:'skuManager',
            component: () => import('../views/product/skuManager'),
            meta:{path:'/skuManager',name:'规格管理',parentTitle:'商品管理',children:['/addSku']}
          },
          /**
           * 添加规格页面
           */
          {
            path:'addSku',
            name:'skuManager',
            component: () => import('../views/product/addSku/addSku'),
            meta:{path:'/addSku'}
          },
          /**
           * 添加商品
           */
          {
            path:'addProduct',
            name:'productList',
            component: () => import('../views/product/addProduct'),
            meta:{path:'/addProduct'}
          },
          /**
           * 商品分组
           */
          {
            path:'productCategory',
            name:'productCategory',
            component: () => import('../views/product/productCategory'),
            meta:{path:'/productCategory',name:'商品分组'}
          },
        ]
      },
      /**
       * 订单
       */
      {
        path:'',
        component: () => import('../views/order/orderMain'),
        meta:{path:'/orderSearch',name:'订单'},
        children: [
          {
            path:'orderSearch',
            name: 'orderSearch',
            component: () => import('../views/order/orderManager/orderSearch'),
            meta:{path:'/orderSearch',name:'订单查询',parentTitle:'订单管理'}
          }
        ]
      }
    ]
  }
]



const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
