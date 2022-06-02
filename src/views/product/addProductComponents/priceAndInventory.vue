
<!--规格的价格和库存-->
<template>
  <div class="border border-radius ">
    <div style="font-size: 12px;line-height: 20px" class="padding">
      <span>批量设置</span>
      <el-popover
          placement="bottom"
          width="220" v-model="selectAllPricePopover"
          :visible-arrow="false"
          trigger="click">
        <el-select v-model="it.row" size="small" style="width: 100px;font-size: 12px;margin-right: 8px;margin-bottom: 8px" v-for="(it,index) in selectAllPrice" :key="index">
          <el-option v-for="(item,index) in it.data" :label="item.label" :value="item.value" :key="index" ></el-option>
        </el-select>

        <el-input size="small" v-model="selectAllPrice_price" placeholder="输入价格" style="margin: 13px 0">
          <span slot="suffix" style="line-height: 32px">元</span>
        </el-input>

        <div style="text-align: center;">
          <el-button size="small" class="inner-button-bg-white" style="width: 80px">取消</el-button>
          <el-button size="small" type="primary" style="margin-left: 10px;width: 80px" @click="fillAllPrice">确定</el-button>
        </div>
        <span class="text-blue" slot="reference">价格</span>
      </el-popover>

      <span class="text-blue">库存</span>
      <span class="text-blue">划线价</span>
      <span class="text-blue">成本价</span>
    </div>

    <el-table class="content"
        :data="tableData"
        border
        style="width: 100%;">
      <el-table-column v-for="(item,index) in tableColumn" :key="index"
          prop="" :width="index === 0 || index === 1 ? '118px' : ''"
          :label="item.column" >
        <template slot-scope="scope" >
          <div v-if="!tableColumn[index].prop">
            <el-input v-model="scope.row[tableColumn[index].name]" size="small" :placeholder="tableColumn[index].placeholder">
<!--              <span slot="suffix" v-if="tableColumn[index].unit">{{tableColumn[index].unit}}</span>-->
            </el-input>
          </div>
          <div v-else-if="tableColumn[index].prop === 'image'">
            <img v-if="scope.row[tableColumn[index].name]" :src="scope.row[tableColumn[index].name]" style="width: 50px;height: 50px;border-radius: 7px"/>
            <span v-else style="text-align: center;margin-left: 10px">-</span>
          </div>

          <div v-else>
            <span>{{scope.row[tableColumn[index].name]}}</span>
          </div>
        </template>

      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: "priceAndInventory",
  data(){
    return{
      value:'',
      //表格的列数据 name:字段名，对应tableData value:绑定input的值 column:列名  prop:显示没有输入框的字段
      tableColumn:[],
      //在productSKU赋值用
      columnTemp:[
        {name:'value1', column:'价格(元)',placeholder:'请输入价格',value:''},
        {name:'value2', column:'库存(件)',placeholder:'请输入库存',value:''},
        {name:'value3', column:'划线价(元)',placeholder:'请输入划线价',value:''},
        {name:'value4', column:'成本价(元)',placeholder:'请输入成本价',value:''},
        {name:'value5', column:'商品编码',placeholder:'输入编码',value:''},
        {name:'value6', column:'商品条码',placeholder:'输入商品条码',value:''},
        {name:'value7', column:'重量(kg)',placeholder:'输入重量',value:''},
        {name:'image',column:'规格图',prop:'image'},
      ],
      //几个value和tableColumn的name字段对应
      tableData: [
      // {
      //   id: '12987122',
      //   name: '王小虎',
      //   value1: '234',
      //   value2: '3.2',
      //   value3: 10,
      //   value4: 12,
      //   value5: '10'
      // }
      ],

      //统一设置价格 全部数据
      selectAllPricePopover:false, //控制弹框显示隐藏
      selectAllPrice_price:'',
      selectAllPrice:[
        {
          row:'',
          data:[] //select option 数据 和列要对的上  {label:'全部···',value:0}
        }
      ]
    }
  },
  watch:{
    tableColumn(nVal){
      console.log('当前监听表头数据',nVal);
      let data = nVal.filter(item=>item.column !== '价格(元)'
          && item.column !== '库存(件)'
          && item.column !== '划线价(元)'
          && item.column !== '成本价(元)'
          && item.column !== '商品编码'
          && item.column !== '商品条码'
          && item.column !== '重量(kg)'
          && item.column !== '规格图');
      console.log(data,'组装的数据')
      //循环data给selectAllPrice赋值 ，data有几列select框就有几个
      this.selectAllPrice = [];
      data.forEach(item =>{
        this.selectAllPrice.push({
          row:0,data:[{label:`全部${item.column}`,value:0, name:item.name}]
        })
      })
    },
    tableData(nVal){
      console.log('当前监听表格内数据',nVal);
      //得到表格所有数据的sku数据部分  [{valueName0:'红色'}，{valueName1:'s'}]
      let data = nVal.map(item=> {
        let row = {}
        Object.keys(item).forEach(key =>{
          if(key !== 'value5' && key !== 'value4' && key !== 'value3' && key !== 'value2' && key !== 'value1')
            row[key] = item[key];
        })
        return row
      });
      data.forEach(item=>{
        //获取到表格行数据的值赋值到select框中，但有重复数据
        this.selectAllPrice.forEach(key=>{
          key.data.push({
            label:item[key.data[0].name], //name属性只在第一个元素有
            value:item[key.data[0].name]
          })
        })
      })

      //去重操作
      this.selectAllPrice.forEach(item=>{
        item.data = this.$util.deduplicationObj(item.data)
      })
      console.log('去重的数据',this.selectAllPrice);
    }

  },
  methods: {
    /**
     * 给用户筛选的所有价格赋值的按钮事件
     * 赋值的话表格数据的字段就应该是value1 而且 this.selectAllPrice长度对应表格的列数 valueName后面拼下标就可以找到属性 ：valueName0
     * 写的真tm费劲
     */
    fillAllPrice(){
      console.log(this.selectAllPrice,'所有价格');
      //如果是给全部sku价格赋值
      if(this.selectAllPrice.filter(item => item.row === 0).length === this.selectAllPrice.length){
        this.tableData.forEach(item =>{
          item.value1 = this.selectAllPrice_price;
        })
      } else{
        //生成一个键值对 对应tableData行数据 {valueName0: '红色', valueName1: 'm'}
        let key = {};
        this.selectAllPrice.forEach((item,index) =>{
          (item.row !== 0) && (key[`valueName${index}`] = item.row);
        })
        //判断key是否是tableData行数据的子集
        let data = this.tableData.filter(tableItem => JSON.stringify(Object.assign({}, tableItem, key)) === JSON.stringify(tableItem));
        console.log(data,'data看',)
        data.forEach(it =>{
          it.value1 = this.selectAllPrice_price;
        })
      }
      console.log(this.tableData,'表格数据');
      this.selectAllPricePopover = false;
    }
  }
}
</script>

<style scoped lang="scss">
.d-flex{
  display: flex;
}
.border{
  border: solid 1px #dddddd;
}
.border-radius{
  border-radius: 5px;
}
.padding{
  padding: 8px;
}
.text-blue{
  color: #5a66ff;
  margin-left: 10px;
  cursor: pointer;
}
.background-color-1{
  background-color: #f5f5f5;
}

::v-deep.el-select .el-input__inner {
  font-size: 12px;
  padding: 0 12px;
}

</style>
