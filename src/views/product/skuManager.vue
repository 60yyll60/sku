<template>
  <div>
    <div class="title">规格管理</div>
    <el-card shadow="never">
      <div class="top">
        <el-button size="small" type="primary" @click="addSku">新建规格</el-button>

        <el-select for="click" filterable disabled v-model="optionValue" @click.native="selectCategory" size="small"
                   style="width: 120px">
          <el-option
              v-for="item in [{value:1,label:'全部分类'}]"
              :key="item.value"
              :label="item.label"
              :value="item.value">
          </el-option>
        </el-select>
      </div>

      <sku-manager-table></sku-manager-table>
    </el-card>
    <commodity-category :visible.sync="show"></commodity-category>
  </div>
</template>

<script>
import commodityCategory from "@/components/product/commodityCategory";
import skuManagerTable from "@/views/product/table/skuManagerTable";
export default {
  name: "skuManager",
  components: {commodityCategory,skuManagerTable},
  data() {
    return {
      optionValue: '全部分类',
      show: false
    }
  },
  methods: {
    addSku(){
      this.$router.push('/addSku')
    },
    selectCategory() {
      this.show = true;
    }
  }
}
</script>

<style scoped>
.title {
  font-weight: 600;
  font-size: 17px;
  margin-bottom: 16px;
}

.top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

::v-deep.el-select .el-input.is-disabled .el-input__inner {
  background-color: white;
  border-color: #cbcbcb;
  color: #101010;
  cursor: pointer;
}
</style>
