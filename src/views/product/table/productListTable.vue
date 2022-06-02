<template>
  <div>
    <el-table
        ref="multipleTable"
        :data="tableData"
        tooltip-effect="dark"
        style="width: 100%"
        @selection-change="handleSelectionChange">
      <el-table-column
          type="selection"
          width="55">
      </el-table-column>
      <el-table-column
          label="排序" prop="val1"
          width="120">
      </el-table-column>
      <el-table-column
          prop="val2"
          label="商品"
          width="320">
<!-- eslint-disable-next-line vue/no-unused-vars -->
        <template slot-scope="scope">
          <div style="display: flex">
            <div style="width: 75px;height: 75px">
              <el-image
                  style="height: 100%;width: 100%;border-radius: 5px;margin-right: 10px"
                  :src="url"
                  :preview-src-list="[url]">
              </el-image>
            </div>

            <div style="width: calc(100% - 81px);line-height: 18px;margin-left: 10px;font-size: 13px">
              <span><el-tag style="color:#5a7bff;padding: 0 2px;margin-right: 6px" size="mini" color="#eeefff">实</el-tag>
                茅台酒茅台酒茅台酒茅台酒茅台酒茅台酒茅台酒茅台酒茅台酒茅台酒茅台酒茅台酒</span>
              <div>
                <el-tag size="mini" color="#eeefff" style="color:#5a7bff;padding: 0 4px">酒类</el-tag>
              </div>
            </div>
          </div>
        </template>
      </el-table-column>
      <el-table-column
          prop="val3" sortable
          label="价格">
      </el-table-column>
      <el-table-column
          prop="val4"
          label="库存">
      </el-table-column>
      <el-table-column
          prop="val5" sortable
          label="实际销量">
      </el-table-column>
      <el-table-column
          prop="val6"
          label="创建时间">
      </el-table-column>
      <el-table-column
          prop="val7"
          label="营销标签">
<!--         eslint-disable-next-line vue/no-unused-vars -->
        <template slot-scope="scope">
          <div style="color: #ff5353">新品</div>
          <div >热卖</div>
          <div >推荐</div>
        </template>
      </el-table-column>
      <el-table-column
          prop="123"
          label="操作">
        <!--         eslint-disable-next-line vue/no-unused-vars -->
        <template slot-scope="scope">
          <div style="color:#2889ff;">
            <span style="margin-right: 5px">编辑</span>  <span>下架</span>
          </div>
          <div style="color:#2889ff;">
            <span style="margin-right: 5px">复制</span>  <span>删除</span>
          </div>
          <div style="color:#2889ff;">
            <span>分享</span>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <div style="padding: 6px 10px; background-color: #f2f2f2;font-size: 13px;font-weight: 600">店铺名称：<span style="color: #616cfe;font-weight: 500;">店铺名称1</span></div>

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
      url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
      tableData: [{
        val1: '1',
        val3: '$456',
        val4:'100',
        val5:'100',
        val6:'2021-22-11 17:48:00',

      }],
      multipleSelection: []
    }
  },
  methods:{
    toggleSelection(rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    },
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
