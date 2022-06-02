<template>
  <div>
    <div class="title">商品列表</div>
    <el-button size="mini" type="primary" style="background-color: #5a66ff;margin: 16px 0" @click="addProduct">添加商品</el-button>
    <search-div></search-div>

    <el-card shadow="never" style="margin-top: 10px;padding-bottom: 0">
      <div style="position:relative;">
        <el-tabs v-model="active" @tab-click="handleClick">
          <el-tab-pane label="出售中" name="0"></el-tab-pane>
          <el-tab-pane label="已售罄" name="1"></el-tab-pane>
          <el-tab-pane label="仓库中" name="2"></el-tab-pane>
          <el-tab-pane label="回收站" name="3"></el-tab-pane>
          <el-tab-pane label="审核中" name="4"></el-tab-pane>
        </el-tabs>
        <div style="position: absolute;right: 5%;top: 20%">
          <svg t="1652840324774" style="margin-right: 40px;position: relative;top: 1px;cursor: pointer" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1754" width="16" height="16"><path d="M512 919.552c-224.768 0-407.552-182.784-407.552-407.552 0-8.704 0.512-17.408 1.024-26.112l71.68 4.608c-0.512 7.168-0.512 14.336-0.512 21.504 0 185.344 150.528 335.872 335.872 335.872 86.528 0 168.448-32.768 230.912-92.16l49.152 52.224C716.288 880.128 616.96 919.552 512 919.552zM919.552 512h-71.68c0-11.776-0.512-23.552-2.048-35.328-17.92-171.52-161.28-300.544-334.336-300.544-67.584 0-132.096 19.968-187.904 57.344L284.16 174.08c67.072-45.568 145.92-69.632 227.84-69.632 209.408 0 384 156.672 405.504 365.056 1.536 13.824 2.048 28.16 2.048 42.496z" fill="#707070" p-id="1755"></path><path d="M140.288 290.816L28.16 491.52c-3.072 5.12 1.024 11.776 6.656 11.776H258.56c6.144 0 9.728-6.144 6.656-11.776L153.6 290.816c-3.072-5.632-10.752-5.632-13.312 0zM870.4 675.84L758.272 475.136c-3.072-5.12 1.024-11.776 6.656-11.776h223.744c6.144 0 9.728 6.144 6.656 11.776L883.712 675.84c-2.56 5.12-10.24 5.12-13.312 0zM270.336 202.24a35.84 35.84 0 1 0 71.68 0 35.84 35.84 0 1 0-71.68 0zM728.576 784.896a35.84 35.84 0 1 0 71.68 0 35.84 35.84 0 1 0-71.68 0z" fill="#707070" p-id="1756"></path></svg>
          <svg t="1652840369045" style="cursor: pointer" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2855" width="16" height="16"><path d="M811.323077 590.769231v220.553846H212.676923v-220.553846H118.153846v315.076923h787.692308v-315.076923z" fill="#707070" p-id="2856"></path><path d="M512 712.861538l118.153846-122.092307h-70.892308V118.153846h-94.523076v472.615385h-70.892308z" fill="#707070" p-id="2857"></path></svg>
        </div>
      </div>

      <product-list-table></product-list-table>
    </el-card>


  </div>
</template>

<script>
import searchDiv from "@/components/searchDiv";
import productListTable from "@/views/product/table/productListTable";
export default {
  name: "productList",
  components: {
    searchDiv,productListTable
  },
  data() {
    return {
      active: '',

    }
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
    },
    addProduct(){
      this.$router.push('/addProduct')
    }
  }
}
</script>

<style scoped>
.title {
  font-weight: 600;
  font-size: 17px;
}
::v-deep.el-tabs .el-tabs__nav-wrap .el-tabs__nav-scroll .el-tabs__nav .el-tabs__item.is-active {
  color: #5a66ff;
}
::v-deep.el-tabs .el-tabs__nav-wrap .el-tabs__nav-scroll .el-tabs__nav .el-tabs__active-bar {
  background-color: #5a66ff;
}
::v-deep.el-tabs .el-tabs__nav-wrap .el-tabs__nav-scroll .el-tabs__nav .el-tabs__item:hover {
  color: #5a66ff;
}
::v-deep.el-card .el-card__body, .el-main{
  padding-bottom: 0;
}
</style>
