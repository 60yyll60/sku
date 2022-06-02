<template>
  <div>
    <div class="title">订单查询</div>
    <search-div :div-data="arrData">
      <template slot="text">
        <div style="display: flex; color:#5a66ff;align-items: center;cursor: pointer">
          <svg t="1653894973478" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="18848" width="18" height="18"><path d="M140.82998676543212 938.7192663241431h744.8649919537726c27.774627235207902 0 50.499322120301564-22.72469488509366 50.499322120301564-50.499320739460735v-176.74762534979425c0-15.149797050342714-10.099864700228474-25.249660369730368-25.249660369730368-25.249660369730368s-25.249660369730368 10.099864700228474-25.24966175057119 25.249660369730368v176.74762534979425H140.82998676543212V143.35495225006883h744.8649919537726v156.5478973301781c0 15.149797050342714 10.099864700228474 25.249660369730368 25.24966175057119 25.249660369730368s25.249660369730368-10.099864700228474 25.249660369730368-25.249660369730368v-156.5478973301781c0-27.774627235207902-22.72469488509366-50.499322120301564-50.499322120301564-50.499320739460735H140.82998676543212c-27.774627235207902 0-50.499322120301564 22.72469488509366-50.499322120301564 50.499320739460735v744.8649933346134c0 27.774627235207902 20.19972801961613 50.499322120301564 50.499322120301564 50.499320739460735z" fill="#5a66ff" p-id="18849"></path><path d="M691.2725908344311 734.1970151199814c5.049932350114237 5.049932350114237 12.624830184865184 7.574897834750945 17.674762534979426 7.574897834750945s12.624830184865184-2.524965484636708 17.674762534979426-7.574897834750945l201.99728710036538-201.99728710036538c2.524965484636708-2.524965484636708 5.049932350114237-5.049932350114237 5.049932350114237-7.574897834750945 2.524965484636708-5.049932350114237 2.524965484636708-12.624830184865184 0-20.19972801961613-2.524965484636708-2.524965484636708-2.524965484636708-5.049932350114237-5.049932350114237-7.574899215591769l-201.99728710036538-201.9972857195246c-10.099864700228474-10.099864700228474-25.249660369730368-10.099864700228474-35.34952506995885 0s-10.099864700228474 25.249660369730368 0 35.34952506995885l159.07286281481484 159.07286281481484H375.6518320702789c-15.149797050342714 0-25.249660369730368 10.099864700228474-25.249660369730368 25.249660369730368s10.099864700228474 25.249660369730368 25.249660369730368 25.24966175057119h474.6936215789669l-159.07286281481484 159.07286281481484c-10.099864700228474 10.099864700228474-10.099864700228474 25.249660369730368 0 35.34952506995885z" fill="#5a66ff" p-id="18850"></path></svg>
          <span style="margin-left: 10px">导出订单</span>
        </div>
      </template>
    </search-div>

    <el-card shadow="never" style="margin-top: 20px">
      <el-tabs v-model="activeName" @tab-click="handleClick" >
        <el-tab-pane label="待发货" name="first">
          <order-table statu="0"></order-table>
        </el-tab-pane>
        <el-tab-pane label="待付款" name="second">
          <order-table ></order-table>
        </el-tab-pane>
        <el-tab-pane label="待收货" name="third">
          <order-table statu="2"></order-table>
        </el-tab-pane>
        <el-tab-pane label="已完成" name="fourth">
          <order-table statu="3"></order-table>
        </el-tab-pane>
        <el-tab-pane label="已关闭" name="1">
          <order-table statu="3"></order-table>
        </el-tab-pane>
        <el-tab-pane label="全部订单" name="h">
          <order-table statu="0"></order-table>
        </el-tab-pane>
      </el-tabs>
    </el-card>

  </div>
</template>

<script>
import searchDiv from "@/components/searchDiv";
import orderTable from "@/views/order/components/orderTable";
export default {
  name: "orderSearch",
  components:{searchDiv,orderTable},
  data(){
    return{
      arrData:[
        [{name: '订单信息:', type: 'input', value: ''}, {
          name: '会员信息:',
          type: 'input',
          value: '',
          option: [{label: '全部', value: 0}]
        }, {name: '配送方式:', type: 'select', value: '', option: [{label: '全部', value: 0}]}],
        [
          {name: '下单时间:', type: 'date', value: ''}, {name: '支付方式:', type: 'select', value: '', option: [{label: '全部', value: 0}]}, {name: '收件人：', type: 'input',value:''}
        ],
        [
          {name:'商品类型：',type: 'select', value: ''},
          {name:'',type: 'button'},{value:'导出订单',type: 'text',name: ''}
        ]
      ],
      activeName: 'first'
    }
  },
  methods:{
    handleClick(tab, event) {
      console.log(tab, event);
    }
  }
}
</script>

<style scoped>
.title {
  font-weight: 600;
  font-size: 17px;
  margin-bottom: 20px;
}
::v-deep.el-card .el-tabs__item.is-active {
  color: #5a66ff;
}
::v-deep.el-card .el-tabs__active-bar {
  background-color: #5a66ff;
}
::v-deep .el-card .el-tabs__item:hover {
  color: #5a66ff;
}
</style>
