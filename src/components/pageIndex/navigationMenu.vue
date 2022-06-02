<template>
  <div class="main">
    <el-menu
        :default-active="active" style="width: 100px"
        class="el-menu-vertical-demo"
        @open="handleOpen" router @select="clickMenu"
        @close="handleClose" background-color="#404262" text-color="#b2b3c0" active-text-color="#b2b3c0">

      <el-menu-item :index="item.path" @click="selectMenu(item)"  v-for="(item,index) in routerList" :key="index"
                    :class="isActive(item) ? 'm-active':''">
        <i class="el-icon-setting"></i>
        <span slot="title">{{ item.name }}</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
export default {
  name: "navigationMenu",
  props:{
    firstRouterList:{
      type:Array,
      default:function (){
        return []
      }
    }
  },
  data(){
    return{
      active:'homePage',
    }
  },
  created() {
  },
  computed:{
    routerList:{
      get(){
        return this.firstRouterList
      },
      set(e){
        this.$emit('update:firstRouterList',e)
      }
    }
  },
  methods:{
    isActive(item){
        // return item.children && item.children.filter(it => it.path === this.$route.path)? 'm-active' : '' || ''
      return item.isCheck ? 'm-active' : '' || ''
    },
    selectMenu(item){
      this.routerList.forEach(item => {
        item.isCheck = false;
        item.children && item.children.forEach(key => {
          if(item.path === key.path){
            key.isCheck = true;
          }
        })
      })
      item.isCheck = true;
      this.$emit('firstLevelNavigation',item);
    },
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    clickMenu(path){
      console.log(path);
      this.active = path;
    }
  }
}
</script>

<style scoped>
::v-deep.el-menu-item [class^=el-icon-] {
  margin-right: 2px !important;
}

.m-active{
  background-color: white !important;
  border-left: solid 4px #5a66ff;
  border-right: solid 1px #ececf0;
  color: #000000 !important;
}

::v-deep.el-menu-item {
  height: 45px;
  line-height: 45px;
}
.el-menu-vertical-demo{
  margin-top: 15px;
}
</style>
