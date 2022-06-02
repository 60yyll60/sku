<template>
  <div>
    <el-card shadow="never">
      <el-tabs v-model="active" @tab-click="handleClick" >
        <el-tab-pane label="基本" name="0">
          <basic-product></basic-product>
          <el-divider></el-divider>
          <div>
            <el-button size="small" class="inner-button-bg-white">取消</el-button>
            <el-button size="small" class="inner-button-bg-white">保存</el-button>
            <el-button size="small" type="primary">下一步</el-button>
          </div>
        </el-tab-pane>
        <el-tab-pane label="详情" name="1">
          <tinymce-editor></tinymce-editor>
          <el-divider></el-divider>
          <div>
            <el-button size="small" class="inner-button-bg-white">取消</el-button>
            <el-button size="small" class="inner-button-bg-white">保存</el-button>
            <el-button size="small" type="primary">下一步</el-button>
          </div>
        </el-tab-pane>
        <el-tab-pane label="营销" name="2">
          <product-marketing></product-marketing>
          <el-divider></el-divider>
          <div>
            <el-button size="small" class="inner-button-bg-white">取消</el-button>
            <el-button size="small" type="primary">保存</el-button>
          </div>
        </el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>

<script>
import basicProduct from "@/views/product/addProductComponents/basicProduct";
import tinymceEditor from "@/components/tinymceEditor";
import productMarketing from "@/views/product/addProductComponents/productMarketing";
export default {
  name: "addProduct",
  components:{
    basicProduct,tinymceEditor,productMarketing
  },
  data(){
    return{
      active:'',
      value:''
    }
  },
  methods:{
    handleClick(tab, event) {
      console.log(tab, event);
    },
  }
}
</script>

<style scoped>


::v-deep.el-tabs .el-tabs__header .el-tabs__nav-wrap .el-tabs__nav-scroll .el-tabs__nav .el-tabs__item {
  padding: 0 20px;
  font-size: 18px !important;
  font-weight: 600;
}
::v-deep.el-tabs .el-tabs__header .el-tabs__nav-wrap::after {
  content: "";
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 1px;
  background-color: #E4E7ED;
  z-index: 1;
}



</style>
