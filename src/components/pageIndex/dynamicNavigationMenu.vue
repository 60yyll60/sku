<template>
  <el-menu
      :default-active="routerIndex"
      class="el-menu-vertical-demo"
      @open="handleOpen" router
      @close="handleClose">

    <div v-for="(item,index) in routerList" :key="index">
<!--      二级菜单分类-->
      <el-submenu index="1" v-if="item.children">
        <template slot="title">
          <span>{{ item.name }}</span>
        </template>
        <el-menu-item :index="itemChildrenRow.path" :class="itemChildrenRow.isCheck ? 'm-active' : ''" @click="clickRouter(itemChildrenRow,item.children)"
                      v-for="(itemChildrenRow,index) in item.children" :key="index">{{ itemChildrenRow.name }}</el-menu-item>
      </el-submenu>
      <!--不分类-->
      <el-menu-item v-if="!item.children && item.name" :index="item.path" :class="$route.path === item.path ? 'm-active' : ''" @click="clickRouter(item,routerList)">
        <span slot="title">{{ item.name }}</span>
      </el-menu-item>
    </div>


<!--    <el-submenu index="1">-->
<!--      <template slot="title">-->
<!--        <span>商品管理</span>-->
<!--      </template>-->
<!--      <el-menu-item index="/productList" :class="this.$route.path === '/productList' ? 'm-active' : ''">商品列表</el-menu-item>-->
<!--      <el-menu-item index="/skuManager" :class="this.$route.path === '/skuManager' ? 'm-active' : ''">商品规格</el-menu-item>-->
<!--      <el-menu-item index="#">参数管理</el-menu-item>-->
<!--      <el-menu-item index="#">商品分类</el-menu-item>-->
<!--    </el-submenu>-->
<!--    <el-menu-item index="#" :class="this.$route.path === '/#' ? 'm-active' : ''">-->
<!--      <span slot="title">商品分组</span>-->
<!--    </el-menu-item>-->
  </el-menu>
</template>

<script>
export default {
  name: "dynamicNavgationMenu",
  data(){
    return{
      routerIndex:this.$route.path
    }
  },
  props:{
    routerList:{
      type:Array,
      default:function (){
        return []
      }
    }
  },
  computed:{
    routerListVal:{
      get(){
        return this.routerList
      },
      set(e){
        this.$emit('update:routerList',e)
      }
    }
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    clickRouter(row,arr){
      console.log(row,arr);
      arr.forEach(item => {
        item.isCheck = false;
        item.children && item.children.forEach(key=>{
          key.isCheck && (key.isCheck = false);
        })
      })
      row.isCheck = true;
      console.log(row);

    }
  }
}
</script>

<style scoped>
.m-active{
  background-color: #eeefff !important;
  color: #5a66ff !important;
  border-radius: 1px;
}

::v-deep.el-menu .el-submenu__title {
  height: 30px;
  line-height: 30px;
  font-size: 14px;
  color: #303133;
  padding: 0 30px;

  display: flex;
  flex-direction: row-reverse;
}

::v-deep.el-menu .el-menu-item {
  height: 30px;
  line-height: 30px;
  font-size: 14px;
  color: #303133;
  padding: 0 20px;
  min-width: 100px;
}
::v-deep .el-menu.el-menu--inline .el-menu-item{
  padding-left: 30px !important;
}
::v-deep.el-menu{
  border: initial;
  width: 110px;
}
::v-deep.el-menu .el-menu-item:focus, .el-menu-item:hover {
  outline: 0;
  background-color: initial;
  color: #5a66ff;
}
::v-deep.el-menu .el-submenu__title:hover {
  background-color: initial;
}
::v-deep.el-menu .el-submenu {
  width: 100%;
}

::v-deep.el-menu .el-submenu__title .el-submenu__icon-arrow {
  position: absolute;
  top: 50%;
  left: 0;
  margin-top: -7px;
  transition: transform .3s;
  font-size: 12px;
  width: 13px;
}

::v-deep.el-menu .el-submenu__title .el-icon-arrow-down:before {
  content: "\e791";
}

::v-deep.el-menu .el-submenu.is-opened > .el-submenu__title .el-submenu__icon-arrow {
  transform: rotateZ(90deg);
}
</style>
