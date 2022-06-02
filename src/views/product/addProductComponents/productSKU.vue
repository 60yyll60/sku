<template>
  <div>
    <el-form label-position="right" label-width="90px">
      <el-form-item label="商品规格">
        <el-radio v-model="radio" :label="1">统一规格</el-radio>
        <el-radio v-model="radio" :label="2">多规格</el-radio>
      </el-form-item>

      <div v-show="radio === 1">
        <el-form-item label="价格">
          <el-input placeholder="请输入价格" v-model="value" size="small">
            <span slot="suffix">元</span>
          </el-input>
        </el-form-item>
        <el-form-item label="库存">
          <el-input placeholder="请输入价格" v-model="value" size="small">
            <span slot="suffix">件</span>
          </el-input>
          <p style="font-size: 12px; color: #888888;line-height: 20px;margin: 0">
            库存为0时，会放到【已售罄】的商品列表里面，保存后买家看到的商品可售库存同步更新</p>
        </el-form-item>
        <el-form-item label="划线价">
          <el-input placeholder="请输入划线价" v-model="value" size="small">
            <span slot="suffix">元</span>
          </el-input>
        </el-form-item>
        <el-form-item label="成本价">
          <el-input placeholder="请输入成本价" v-model="value" size="small">
            <span slot="suffix">元</span>
          </el-input>
        </el-form-item>
        <el-form-item label="商品编码">
          <el-input placeholder="请输入编码" v-model="value" size="small">
            <span slot="suffix">元</span>
          </el-input>
        </el-form-item>
        <el-form-item label="商品条码">
          <el-input placeholder="请输入条码" v-model="value" size="small">
          </el-input>
        </el-form-item>
        <el-form-item label="商品编码">
          <el-input placeholder="请输入编码" v-model="value" size="small">
          </el-input>
        </el-form-item>
      </div>

      <!--      狗日的多规格-->
      <div v-show="radio === 2">
        <el-form-item label="规格设置" style="width: 100%">
          <div class="border pa-3 border-radius">
            <!--            第一步-->
            <div class="pa-2 background-color-1 border-radius button-bg-white" v-show="skuState === 0">
              <el-button size="small" @click="addSKU">添加规格</el-button>
            </div>
            <!--            当skustate = 1 的时候显示添加子规格-->
            <div class="border border-radius button-bg-white" style="margin-top: 10px" v-show="skuState === 1"
                 v-for="(item,index) in skus" :key="index">
              <div class="background-color-1 pa-2">
                <search-select v-model="item.value" @change="selectSkuChange"></search-select>
                <el-checkbox v-model="isAddImage" style="margin-left: 20px" v-show="index === 0">添加规格图片</el-checkbox>
                <div style="float: right;position: relative;top: 2px;cursor: pointer" @click="delSku(index)">
                  <svg t="1652924417891" class="icon" viewBox="0 0 1024 1024" version="1.1"
                       xmlns="http://www.w3.org/2000/svg" p-id="2088" width="18" height="18">
                    <path
                        d="M256 333.872a28.8 28.8 0 0 1 28.8 28.8V768a56.528 56.528 0 0 0 56.544 56.528h341.328A56.528 56.528 0 0 0 739.2 768V362.672a28.8 28.8 0 0 1 57.6 0V768a114.128 114.128 0 0 1-114.128 114.128H341.328A114.128 114.128 0 0 1 227.2 768V362.672a28.8 28.8 0 0 1 28.8-28.8zM405.344 269.648a28.8 28.8 0 0 0 28.8-28.8 56.528 56.528 0 0 1 56.528-56.544h42.656a56.528 56.528 0 0 1 56.544 56.544 28.8 28.8 0 0 0 57.6 0 114.128 114.128 0 0 0-112.64-114.128h-45.648a114.144 114.144 0 0 0-112.64 114.128 28.8 28.8 0 0 0 28.8 28.8z"
                        p-id="2089"></path>
                    <path
                        d="M163.2 266.672a28.8 28.8 0 0 1 28.8-28.8h640a28.8 28.8 0 0 1 0 57.6H192a28.8 28.8 0 0 1-28.8-28.8zM426.672 371.2a28.8 28.8 0 0 1 28.8 28.8v320a28.8 28.8 0 0 1-57.6 0V400a28.8 28.8 0 0 1 28.8-28.8zM597.344 371.2a28.8 28.8 0 0 1 28.8 28.8v320a28.8 28.8 0 0 1-57.6 0V400a28.8 28.8 0 0 1 28.8-28.8z"
                        p-id="2090"></path>
                  </svg>
                </div>
              </div>
              <div style="padding: 10px 20px;color: #5a66ff;cursor: pointer;    align-items: flex-start;display: flex;">
                <div style="display: inline-block" v-for="(item_item,index_index) in item.skuList" :key="index_index">
                  <el-tag closable style="margin-right: 20px;min-width: 75px"
                          @close="removeTag(item.skuList,index_index)">{{ item_item.value }}
                  </el-tag>
                  <picture-overlay-upload v-show="isAddImage && index === 0"></picture-overlay-upload>
                </div>


                <!--+添加规格值-->
                <el-popover
                    placement="right"
                    width="400" v-model="item.popoverVisible"
                    trigger="manual">
                  <div>
                    <!--                    这个数据要在规格值中找到对应的子数据-->
                    <search-select :value.sync="skuListRowValue" :options="[{
                      value: '红色',
                      label: '红色'
                    }, {
                      value: 'S',
                      label: 'S'
                    }, {
                      value: '夏季款',
                      label: '夏季款'
                    },
                    {
                      value: '白色',
                      label: '白色'
                    }]"></search-select>
                    <el-button size="mini" style="width: 70px;margin-left: 20px" type="primary"
                               @click="addSkuListRow(index)">确定
                    </el-button>
                    <el-button size="mini" style="width: 70px" @click="item.popoverVisible = false">取消</el-button>
                  </div>
                  <span slot="reference" @click="popoverShow(item)">+添加规格值</span>
                </el-popover>
              </div>
            </div>
            <!--            后续添加-->
            <div class="pa-2 background-color-1 border-radius button-bg-white" style="margin-top: 10px"
                 v-show="skuState === 1">
              <el-button size="small" @click="addSkusRow">添加规格</el-button>
              <el-button size="small" @click="sort">自定义排序</el-button>
            </div>
            <p style="font-size: 12px; color:#888888;">如有颜色，尺码等多种规格，请添加商品规格。仅第一个商品规格可以配置图片</p>
          </div>
        </el-form-item>


        <el-form-item label="价格与库存" style="line-height: 21px;width: 100%"
                      v-show="this.skuState !== 0 && $refs.priceTable.tableColumn.length > 8">
          <price-and-inventory ref="priceTable"></price-and-inventory>
        </el-form-item>
      </div>

    </el-form>

    <el-dialog
        title="规格排序" :close-on-click-modal="false" :close-on-press-escape="false" :show-close="false"
        :visible.sync="dialogVisible"
        width="40%" append-to-body style="padding: 0">
      <div v-for="(item,index) in skus" :key="index">
        <div style="line-height: 38px">{{ item.value }}</div>
        <draggable v-model="item.skuList" v-bind="dragOptionsChips" style="display: flex" :grop="'grop' + index" @start="itemStart">
            <div style="background-color: #f1f1f1;padding: 6px 12px;margin-right: 6px;cursor: pointer"
                 v-for="(item_item,index_index) in item.skuList" :key="index_index">{{ item_item.value }}</div>
        </draggable>
      </div>
      <span slot="footer" class="dialog-footer">
    <el-button @click="dialogClose" size="small" class="inner-button-bg-white">取 消</el-button>
    <el-button type="primary" @click="determineDialog" size="small">确 定</el-button>
  </span>
    </el-dialog>
  </div>
</template>

<script>
import searchSelect from "@/components/searchSelect/searchSelect";
import pictureOverlayUpload from "@/components/pictureOverlayUpload";
//导入draggable组件
import draggable from 'vuedraggable'
//价格和库存
import priceAndInventory from "@/views/product/addProductComponents/priceAndInventory";

let row = {
  value: '',
  popoverVisible: false,
  skuList: []
}

//拖拽顺序改变前的临时数组
let sortTempSkus = []
export default {
  name: "productSKU",
  components: {searchSelect, pictureOverlayUpload, priceAndInventory,draggable},
  data() {
    return {
      radio: 2,
      value: "",

      //控制自定义排序模态框显示和隐藏
      dialogVisible: false,
      //用来表示添加规格的步骤 0只显示添加按钮
      skuState: 0,
      //用来控制规格是否添加图片
      isAddImage: false,
      //
      skuList: [{value: '规格1', image: '', name: 'value0'}],

      //整体循环在页面上的数据
      skus: [],


      //用来获取自定义组件的值
      skuRowValue: '', //这个字段已经改在skus数组里面 popoverVisible
      skuListRowValue: '',

      //用来手动控制popover 的显示和隐藏
      visible: false
    }
  },
  computed: {
    getChildComponentsTableData: {
      get() {
        return this.$refs.priceTable.tableData
      }
    },
      dragOptionsChips() {
        return {
          animation: 200,
          disabled: false,
          ghostClass: "ghost",
          sort: true,
          chosenClass:"chosen",
          forceFallback:true
        };
      },
  },
  mounted() {
  },
  methods: {
    //开始拖拽的事件
    itemStart(){
      sortTempSkus =JSON.parse(JSON.stringify(this.skus))
      console.log(sortTempSkus);
    },
    //对话框关闭
    dialogClose(){
      this.dialogVisible = false;
      if(sortTempSkus.length > 0){
        this.skus = JSON.parse(JSON.stringify(sortTempSkus))
        sortTempSkus = [];
      }
    },
    determineDialog(){
      this.dialogVisible = false
      this.assemblyData();
    },
    sort(){
      if(this.skus.length === 0){
        return this.$message.warning('请先添加规格')
      }else{
        if(this.skus[0].skuList.length === 0){
          return this.$message.warning('请先添加规格')
        }
      }
      this.dialogVisible = true
    },
    //选择一条规格名改变值的时候触发
    selectSkuChange(val) {
      console.log(val);
      // this.assemblyData();
    },
    //当点击添加规格按钮的时候
    addSKU() {
      this.skuState = 1;
      //
      this.skus.push(JSON.parse(JSON.stringify(row)));
    },
    //选择规格时候发生变化，在已有条目中没有的时候保存到数据库
    selectSKUChange(val) {
      console.log(val, this.value);
    },
    //新增一条规格
    addSkusRow() {
      this.skus.push(JSON.parse(JSON.stringify(row)));
    },
    /**
     *新增一条规格 在这个方法组装数据在表格展示
     * @param index
     * @returns {boolean}
     */
    addSkuListRow(index) {

      if (this.skuListRowValue === '') return
      //判断该规格是否有同样的值
      if (this.skus[index].skuList.filter(it => it.value === this.skuListRowValue).length > 0) {
        return this.$util.showMessage(this, '已有相同的规格值');
      }
      this.skus[index].skuList.push({
        value: this.skuListRowValue,
        image: '',
        //设置用来当作tableData里面的字段名
        name: index + 'value' + this.skus[index].skuList.length
      })
      this.skus[index].popoverVisible = false; //隐藏弹窗
      this.skuListRowValue = ""; //置空已选择

      //组装数据
      this.assemblyData();
    },
    /**
     * 组装成前端表格展示用
     * sku对象形式：[{红色 , M}，{红色 , L} ...]
     */
    assemblyData() {
      console.log(this.skus, '组装前的数组');
      // eslint-disable-next-line no-unused-vars
      let data = [];

      this.skus.forEach(item => {
        let row = []
        item.skuList.forEach(item_item => {
          row.push(item_item.value)
        })
        data.push(row);
      })
      //用二维数组的下标来判断属于哪个规格
      console.log(data, '二维数组格式');

      // eslint-disable-next-line no-unused-vars
      let skuData = this.SkuAssemblyData(data);
      console.log(skuData, 'sku格式');
      //拼装成表格需要的数据
      let tableData = [];
      let tempAttributes = [];//储存属性名
      skuData.forEach((item, index) => {
        let row = {};
        item.forEach((item_item, index_index) => {
          //只赋值一次属性名
          if (index === 0) {
            tempAttributes.push('valueName' + index_index)
          }
          row[tempAttributes[index_index]] = item_item; //组成对象形式 属性为value加下标
          /**
           * 在这赋值tableData的数据 后面value字段需要改名也在这改
           */
          row.value1 = '';
          row.value2 = '';
          row.value3 = '';
          row.value4 = '';
          row.value5 = '';
        })
        tableData.push(row);
      })

      console.log(tempAttributes, 'tempAttributes-储存的列名')
      //表格需要的列名
      let tableColumn = [];
      //取出skus中不为空的属性
      let skusTemp = []
      this.skus.forEach(item => {
        if (item.skuList.length > 0) {
          skusTemp.push(item)
        }
      })
      tempAttributes.forEach((item, index) => {
        let row = {};
        row.name = item;
        row.column = skusTemp[index].value
        row.prop = '-';
        tableColumn.push(row);
      })

      console.log('拼装的表格数据', tableData)
      console.log('拼装的表格列名', tableColumn);
      tableColumn = tableColumn.concat(this.$refs.priceTable.columnTemp);
      console.log('cancat结果', tableColumn, this.$refs.priceTable.columnTemp)
      this.$refs.priceTable.tableData = tableData;
      this.$refs.priceTable.tableColumn = tableColumn;
      console.log(this.$refs.priceTable.tableColumn)
    },

    /**
     * 将组装好的二维数组 拼成sku格式
     * sku格式：[['红色','s'],['红色','m']]
     * @param arr
     * @constructor
     */
    SkuAssemblyData(arrT) {
      //arr需要这种二维数组格式
      // arr = [
      //   ["大杯", "中杯"],
      //   ["全糖", "七分糖"],
      //   ["去冰", "少冰", "正常冰"]
      // ];
      let arr = [];
      //循环删除二维数组元素中的空数组
      arrT.forEach(item => {
        if (item.length !== 0) {
          arr.push(item)
        }
      })
      console.log(arr, '去重后')
      const getSkuData = arr => {
        let res = [[]];
        arr.map(item => {
          let s = [];
          res.map(v => {
            item.map(ele => {
              s.push(v.concat(ele));
            });
          });
          res = s;
        });
        return res;
      };
      return getSkuData(arr)
    },
    //删除一条规格标题
    delSku(index) {
      this.skus.splice(index, 1);
      this.assemblyData();
      //回到第一步的状态
      if (this.skus.length < 1) {
        this.skuState = 0;
        //并且清除表格数据
        this.$refs.priceTable.tableData = [];
        this.$refs.priceTable.tableColumn = [];
      }

    },

    //控制popover的显示和隐藏
    popoverShow(item) {
      console.log(item);
      this.skus.forEach(val => {
        val.popoverVisible = false;
      })
      if (item.value === '') {
        return this.$util.showMessage(this, '请先选择规格');
      }
      item.popoverVisible = !item.popoverVisible;
    },

    //移除一条标签规格
    removeTag(arr, index) {
      arr.splice(index, 1);
      this.assemblyData();
    }
  }
}
</script>

<style scoped>
.el-form .el-form-item {
  width: 35%;
  min-width: 600px;
}

.border {
  border: solid 1px #dddddd;
}

.border-radius {
  border-radius: 5px;
}

.pa-2 {
  padding: 6px;
}

.pa-3 {
  padding: 10px;
}

.background-color-1 {
  background-color: #f5f5f5;
}


::v-deep.el-form .el-form-item {
  margin-bottom: 18px;
}
::v-deep.el-dialog__wrapper .el-dialog__body {
  padding: 10px 20px;
}
</style>
