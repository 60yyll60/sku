<template>
  <div>
    <el-card shadow="never" style="">
      <div class="box-card" v-for="(item,index) in divData" :key="index"
           :class="index !== divData.length - 1  ? 'margin-bottom' : ''">
        <div class="column" v-for="(item_item,index_index) in item" :key="index_index">
          <div class="title" v-if="item_item.name">{{ item_item.name }}</div>
          <el-input size="small" placeholder="商品名称/编码/条码" v-if="item_item.type === 'input'"
                    v-model="item_item.value" style="width: 200px;"></el-input>
          <el-select size="small" style="width: 200px" placeholder="请选择" v-if="item_item.type === 'select'"
                     v-model="item_item.value">
            <el-option v-for="(it_option,it_index) in item_item.option" :key="it_index" :label="it_option.label"
                       :value="it_option.value"></el-option>
          </el-select>
          <el-date-picker v-if="item_item.type === 'date'" style="width: 200px"
                          v-model="item_item.value"
                          type="date" size="small"
                          placeholder="选择日期">
          </el-date-picker>
          <div v-if="item_item.type === 'button'">
            <el-button size="mini" type="primary" style="background-color: #5a66ff;width: 70px">搜索</el-button>
            <el-button size="mini" style="width: 70px" class="inner-button-bg-white">重置</el-button>
          </div>
          <div v-if="item_item.type === 'text'">
            <slot name="text">
              <span style="color: #5a66ff">{{item_item.value}}</span>
            </slot>
          </div>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "searchDiv",
  props:{
    divData:{
      type:Array,
      default:function (){
        return [
          [{name: '商品名称:', type: 'input', value: ''}, {
            name: '商品分类:',
            type: 'select',
            value: '',
            option: [{label: '全部', value: 0}]
          }, {name: '商品类型:', type: 'select', value: '', option: [{label: '全部', value: 0}]}],
          [{name: '创建时间:', type: 'date', value: ''}, {
            name: '营销标签:',
            type: 'select',
            value: '',
            option: [{label: '全部', value: 0}]
          }, {name: '', type: 'button'}]
        ]
      }
    }
  },
  data() {
    return {
    }
  }
}
</script>

<style scoped lang="scss">

.box-card {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  font-size: 13px;
  font-weight: 600;
}

.margin-bottom {
  margin-bottom: 16px;
}

.column {
  margin-right: 30px;
  display: flex;
  align-items: center;

  .el-input__inner {
    max-width: 200px;
  }

}

.title {
  min-width: 70px;
}


/*::v-deep.el-select .el-input__inner{*/
/*  width: 93%;*/
/*}*/
/*::v-deep.el-select .el-input__suffix{*/
/*  right: 14px;*/
/*}*/
</style>
