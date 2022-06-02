<template>
  <div>
    <div class="title-box">抵扣设置</div>
    <el-form label-width="90px" label-position="left">
      <el-form-item label="积分抵扣">
        <el-radio v-model="radio" :label="0">关闭</el-radio>
        <el-radio v-model="radio" :label="1">不限制抵扣金额</el-radio>
        <el-radio v-model="radio" :label="2">抵扣上限</el-radio>
      </el-form-item>
      <el-form-item v-show="radio === 2">
        <div style="background-color: #eeefff;padding: 8px 16px;border-radius: 5px">
          金额上限：<el-input size="small" placeholder="请输入上限金额" style="width: 200px"><span slot="suffix" class="el-suffix-button">元</span></el-input>
          <el-checkbox :true-label="1" :false-label="0" style="margin-left: 20px" fill="#626468" text-color="#626468">允许多件累计抵扣</el-checkbox>
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "productMarketing",
  data(){
    return{
      radio:''
    }
  }
}
</script>

<style scoped>
.title-box {
  background-color: #eeefff;
  padding: 10px 20px;
  font-weight: 600;
  font-size: 15px;
  margin: 30px 0;
}
</style>
