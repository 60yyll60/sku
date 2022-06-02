<template>
  <el-container>
    <div :style="isShowNavigation ? 'width:230px' : 'width:100px'">
      <el-aside width="100px" style="left: 0">
        <div style="margin-top: 20px">
          <el-avatar size="large" src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"></el-avatar>
          <navigation-menu :firstRouterList="firstRouterList" @firstLevelNavigation="firstLevelNavigation"></navigation-menu>
        </div>
      </el-aside>
      <transition>

        <el-aside width="130px" style="background-color: #ffffff;left: 100px" v-show="isShowNavigation">
          <div style="display: flex; flex-direction: column;text-align: left;margin-left: 10px;margin-top: 20px">
            <div style="padding: 20px;font-weight: 600">{{ childrenTitle }}</div>
            <dynamic-navigation-menu :router-list.sync="routerList"></dynamic-navigation-menu>
          </div>
        </el-aside>
      </transition>

    </div>
    <el-main style="width: calc(100vw - 230px)">
      <router-view class="fade-in-right"></router-view>
    </el-main>
  </el-container>
</template>

<script>
import navigationMenu from "@/components/pageIndex/navigationMenu";
import dynamicNavigationMenu from "@/components/pageIndex/dynamicNavigationMenu";
export default {
  name: "pageIndex",
  components:{navigationMenu,dynamicNavigationMenu},
  data() {
    return {
      activeTree:'',
      firstRouterList:[],
      routerList: [],
      isShowNavigation:false,
      childrenTitle:''
    };
  },
  mounted() {
    this.$nextTick(()=>{
      let start = new Date();
      this.getRouter();
      let end = new Date();
      console.log('加载所需用时',end - start)
    })

  },
  methods: {
    getRouter(){
      let data = this.$router.options.routes[0].children;
      console.log(data,'所有路由',`当前路由${this.$route.path}`);
      data.forEach(item => {
        let row = {};
        item.meta && (row = item.meta);
        item.meta && ( row.isCheck = this.$route.path === item.meta.path);
        let tempArr = [];
        item.children && item.children.forEach(it =>{
          let row = {};
          it.meta && (row = it.meta);
          it.meta && (row.isCheck = false);
          it.meta && tempArr.push(row);

        })
        item.children && (item.children = tempArr);
        item.meta && item.children && (row.children = item.children);
        !this.$util.isEmpty(row) && this.firstRouterList.push(row);
      })
      console.log(this.firstRouterList,'路由组装结束')


      this.firstRouterList.forEach(item => {
        //给一级导航显示高亮
        if(item.isCheck){
          if(item.children && item.children.length > 0)
            this.firstLevelNavigation(item);
        }else if(item.children && item.children.filter(it => {
          return it.path === this.$route.path
        }).length > 0){
          item.isCheck = true;
            this.firstLevelNavigation(item);
        }

        //二级导航显示高亮
        console.log(this.routerList,'组装后的')
        this.routerList.forEach(routerI => {
          routerI.children && routerI.children.forEach(routerItem => {
            if(routerItem.path === this.$route.path){
              routerItem.isCheck = true;
            }else if(routerItem.children && routerItem.children.filter(cItem => cItem === this.$route.path).length >0){
              routerItem.isCheck = true;
            }
          })
        })

        let childRouterIndex = -1;
        item.children && item.children.forEach((key,id) => {
          key.isCheck = false;
          if(this.$route.path === key.path){
            childRouterIndex = id;
          }
        })
        if(childRouterIndex !== -1){
          item.children[childRouterIndex].isCheck = true;
        }
      })
    },
    firstLevelNavigation(item){
      console.log(item);
      this.isShowNavigation = false;
      if(!item.children)return;
      this.isShowNavigation = true;
      this.childrenTitle = item.name;

      this.routerList = [];
      let tempArr = item.children;
      tempArr = this.routerMap(tempArr);
      //去重 ，大概是循环要遍历每个元素，所以组装后的有重复
      tempArr = this.$util.deduplicationObj(tempArr);
      this.routerList = tempArr;


    },
    //再拼装成菜单栏的数据
    routerMap(routes,parentTitle = ""){
      if(!Array.isArray(routes) && routes.length<=0)return console.log('数组长度错误');
      let arr = [];
      for (let i = 0; i < routes.length; i++) {
        let row = {};
        if(routes[i].parentTitle){
          //第二次 parentTitle !== ''
          if(routes[i].parentTitle === parentTitle){
            row.name = routes[i].name;
            row.path = routes[i].path;
            row.isCheck =  routes[i].isCheck;
            routes[i].children && ( row.children =routes[i].children)
          }else{
            //只在第一次执行
            if(parentTitle === ""){
              row.name = routes[i].parentTitle;
              row.path = '';
              row.children = this.routerMap(routes.filter(item=>item.parentTitle),routes[i].parentTitle);
            }
          }
        }else{
          row.name = routes[i].name;
          row.path = routes[i].path;
          row.isCheck = routes[i].isCheck;
          routes[i].children && ( row.children =routes[i].children)
        }
        !this.$util.isEmpty(row) && arr.push(row);
      }
      return arr
    },
  }
}
</script>

<style scoped lang="scss">


@-webkit-keyframes fade-in-right {
  0% {
    -webkit-transform: translateX(40px);
    transform: translateX(40px);
    opacity: 0;
  }
  100% {
    -webkit-transform: translateX(0);
    transform: translateX(0);
    opacity: 1;
  }
}

@keyframes fade-in-right {
  0% {
    -webkit-transform: translateX(40px);
    transform: translateX(40px);
    opacity: 0;
  }
  100% {
    -webkit-transform: translateX(0);
    transform: translateX(0);
    opacity: 1;
  }
}

//出现时
.v-enter-active{
  -webkit-animation: fade-in-right 0.2s cubic-bezier(0.390, 0.575, 0.565, 1.000) both;
  animation: fade-in-right 0.2s cubic-bezier(0.390, 0.575, 0.565, 1.000) both;
}

@-webkit-keyframes fade-out-left {
  0% {
    -webkit-transform: translateX(0);
    transform: translateX(0);
    opacity: 1;
  }
  100% {
    -webkit-transform: translateX(-50px);
    transform: translateX(-50px);
    opacity: 0;
  }
}
@keyframes fade-out-left {
  0% {
    -webkit-transform: translateX(0);
    transform: translateX(0);
    opacity: 1;
  }
  100% {
    -webkit-transform: translateX(0px);
    transform: translateX(-0px);
    opacity: 0;
  }
}
//退出时
.v-leave-active {
  -webkit-animation: fade-out-left 0.2s cubic-bezier(0.250, 0.460, 0.450, 0.940) ;
  animation: fade-out-left 0.2s cubic-bezier(0.250, 0.460, 0.450, 0.940) ;
}























.el-header, .el-footer {
  background-color: #B3C0D1;
}

.el-aside {
  background-color: #404262;
  text-align: center;
  position: fixed;
  height: 100vh;
  display: flex;
}

.el-main {
  background-color: #f2f2f2;
  min-height: 100vh;
}

</style>
