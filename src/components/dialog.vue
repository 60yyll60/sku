<template>
  <el-dialog title="收货地址" :visible.sync="dialogFormVisible">
    <el-form :model="form" label-position="right">
      <el-form-item label="活动名称" >
        <el-input v-model="form.val" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="活动区域" >
        <el-select v-model="form.val" placeholder="请选择活动区域">
          <el-option label="区域一" value="shanghai"></el-option>
          <el-option label="区域二" value="beijing"></el-option>
        </el-select>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogFormVisible = false">取 消</el-button>
      <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
export default {
  name: "myDialog",
  data(){
    return{
      form:{
        val:'',
        dialogFormVisible:false
      }
    }
  }
}
</script>

<style scoped>

</style>
