<template>
  <div>
    <el-table
        ref="multipleTable"
        :data="tableData"
        tooltip-effect="dark"
        style="width: 100%">
      <el-table-column
          label="规格名称" prop="val1"
          width="120">
      </el-table-column>
      <el-table-column
          prop="val2"
          label="规格值"
          width="380">
        <!-- eslint-disable-next-line vue/no-unused-vars -->
      </el-table-column>
      <el-table-column
          prop="val3"
          label="所属分类">
      </el-table-column>
      <el-table-column
          prop="val4"
          label="创建时间">
      </el-table-column>
      <el-table-column
          prop="123" width="102px"
          label="操作">
        <!--         eslint-disable-next-line vue/no-unused-vars -->
        <template slot-scope="scope">
          <div style="color:#2889ff;">
            <span style="margin-right: 5px">编辑</span>  <span>删除</span>
          </div>
        </template>
      </el-table-column>
    </el-table>

    <div style="padding: 20px;display: flex;justify-content: right;align-items: center">
      <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="pageNum" background
          :page-sizes="[100, 200, 300, 400]"
          :page-size="100"
          layout="total, sizes, prev, pager, next, jumper"
          :total="400">
      </el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  name: "productListTable",
  data(){
    return{
      pageNum:1,
      tableData: [{
        val1: '尺寸',
        val2: '大、小',
        val3:'服饰鞋包>女装>T恤',
        val4:'2020-1-1 20:20:00',
      }],
      multipleSelection: []
    }
  },
  methods:{
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    }
  }
}
</script>

<style scoped>

</style>
