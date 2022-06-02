<template>
  <div>
    <el-breadcrumb separator="/" style="margin-bottom: 20px">
      <el-breadcrumb-item :to="{ path: '/skuManager' }">规格管理</el-breadcrumb-item>
      <el-breadcrumb-item>添加规格</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card shadow="never">
      <el-form label-position="right" label-width="100px">
        <div style="font-size: 14px ;font-weight: 600;margin-bottom: 10px;color: #102626">规格信息</div>
        <el-form-item label="规格名称:" style="width: 24%;min-width: 300px">
          <el-input size="small" v-model="name" placeholder="输入规格名，如颜色、大小" ></el-input>
        </el-form-item>
        <el-form-item label="所属分类:" style="width: 24%;min-width: 300px">
          <el-button size="small" class="inner-button-bg-white" style="width: 100%" @click="show = true">选择商品分类</el-button>
        </el-form-item>
        <el-form-item label="规格值:" style="width: 24%;min-width: 300px">
          <el-input size="small" placeholder="输入规格名，如蓝色、红色" style="width: 100%;margin-right: 6px" v-model="value" ></el-input>
          <el-button class="inner-button-bg-white" size="small" style="position: absolute;top: 11%;right: -80px;" @click="add({value})">+添加</el-button>
        </el-form-item>
        <el-form-item style="width: 39%;margin-top: 4px">
          <div class="box">
            <div v-if="list2.length<= 0" style="color: #9b9b9b;display: flex;justify-content: center;align-items: center;height: 300px" >暂无规格值</div>
            <div style="background-color:#fafafa ;padding: 2px 20px 2px 2px;display: flex;justify-content: space-between;align-items: center;margin-bottom: 10px"
                 v-for="(item,index) in list2" :key="index">
              <el-input size="small" v-model="item.value" style="min-width: 200px;width: 60%"></el-input>
              <svg style="cursor: pointer" @click="remove(index)" t="1653892444493" class="icon"  viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="17170" width="18" height="18"><path d="M902.4 172.8l-185.6-38.4c-6.4 0-32-12.8-25.6-38.4v-12.8c0-12.8-6.4-25.6-19.2-25.6L403.2 0c-12.8 0-25.6 6.4-25.6 19.2v12.8c-12.8 32-44.8 25.6-44.8 25.6L153.6 19.2c-12.8 0-25.6 6.4-25.6 19.2l-12.8 64c0 12.8 6.4 25.6 19.2 25.6l755.2 153.6c12.8 0 25.6-6.4 25.6-19.2l12.8-64c-6.4-12.8-12.8-25.6-25.6-25.6zM844.8 320H185.6c-12.8 0-19.2 6.4-19.2 19.2v595.2c0 51.2 38.4 89.6 83.2 89.6h531.2c44.8 0 83.2-38.4 83.2-83.2V339.2c6.4-12.8-6.4-19.2-19.2-19.2z m-480 595.2c0 12.8-12.8 19.2-19.2 19.2h-38.4c-12.8 0-19.2-12.8-19.2-19.2V524.8c0-12.8 12.8-19.2 19.2-19.2h38.4c12.8 0 19.2 12.8 19.2 19.2v390.4z m192 0c0 12.8-12.8 19.2-19.2 19.2h-38.4c-12.8 0-19.2-12.8-19.2-19.2V524.8c0-12.8 12.8-19.2 19.2-19.2h38.4c12.8 0 19.2 12.8 19.2 19.2v390.4z m192 0c0 12.8-12.8 19.2-19.2 19.2h-38.4c-12.8 0-19.2-12.8-19.2-19.2V524.8c0-12.8 12.8-19.2 19.2-19.2h38.4c12.8 0 19.2 12.8 19.2 19.2v390.4z" fill="#040000" p-id="17171"></path></svg>
            </div>

          </div>
        </el-form-item>
      </el-form>
      <el-divider></el-divider>

      <div>
        <el-button class="inner-button-bg-white" size="small" style="width: 80px">取消</el-button>
        <el-button size="small" type="primary" style="width: 80px">保存</el-button>
      </div>
    </el-card>


    <commodity-category :visible.sync="show"></commodity-category>
  </div>
</template>

<script>
import commodityCategory from "@/components/product/commodityCategory";
export default {
  name: "addSku",
  components:{commodityCategory},
  data(){
    return{
      show:false,
      name:'',
      value:'',
      list2:[]
    }
  },
  methods:{
    add(item){
      if(item.value !== ''){
        this.list2.push(JSON.parse(JSON.stringify(item)));
        this.value = '';
      }
    },
    remove(index){
      this.list2.splice(index,1)
    }
  }
}
</script>

<style scoped>
::v-deep .el-card .el-form-item__label {
  color: #102626;
}
::v-deep.el-card .el-form-item {
  margin-bottom: 8px !important;
}
.box{
  border-radius: 5px;
  border: solid 1px #cbcbcb;
  min-height: 300px;
  padding: 10px;
}
</style>
