<template>
  <div>
    <div class="bg-color table-title">
      <div style="width: 20%">商品</div>
      <div style="width: 15%">单价/数量</div>
      <div class="width-200">买家</div>
      <div  class="width-200">实付款</div>
      <div style="width: 10%">支付/配送</div>
      <div>状态</div>
      <div>操作</div>
    </div>
    <div class="table_content">
      <div class="bg-color t_head" style="display: flex;justify-content: space-between;min-width: 1000px;">
        <div>
          下单时间：2021-9-10 11:27:47 订单编号：1021210910112748926018
          <span style="color: #5a6bfe">复制</span>
        </div>
        <div style="color: #5a6bfe">打印小票 <span style="color: black"> | </span> 备注</div>
      </div>

      <div class="t_content">
        <div class="border_right" style="width: 20%">
          <div style="display: flex">
            <div style="width: 75px;height: 75px;border-right: 5px">
              <el-image
                  style="height: 100%;width: 100%;border-radius: 5px;margin-right: 10px"
                  src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg"
                  :preview-src-list="['https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg']">
              </el-image>
            </div>

            <div style="width: calc(100% - 81px);line-height: 18px;margin-left: 6px;font-size: 13px">
              <div style="max-width: 200px" class="text-3-hidden">
                <el-tag style="color:#5a7bff;padding: 0 2px;margin-right: 6px" size="mini" color="#eeefff">实</el-tag>
                贵州埋汰酒 入地埋汰贵州埋汰酒 入地埋汰贵州埋汰酒入地埋汰贵州埋汰酒
              </div>
              <div>
                <el-tag size="mini" color="#eeefff" style="color:#5a7bff;padding: 0 4px">酒类</el-tag>
              </div>
            </div>
          </div>
        </div>
        <div class="border_right" style="width: 15%">
          <div>￥11</div>
          <div>x1</div>
          <div>积分抵扣：￥1.00</div>
        </div>
        <div class="border_right width-200">
          <div>小伙子</div>
          <div>12345678911</div>
        </div>
        <div class="border_right width-200">
          <div>￥10.00</div>
          <div>(含运费：￥0.00)</div>
        </div>
        <div class="border_right" style="width: 10%">
          <div>--</div>
          <div>快递:一路顺丰</div>
        </div>
        <div class="border_right">
<!--          临时判断-->
          <div style="color: #ff9900;font-size: 18px;font-weight: 600" v-if="statu == 0">待发货</div>
          <div style="color: #ff0000;font-size: 18px;font-weight: 600" v-if="statu == 1">待付款</div>
          <div style="color: #5a66ff;font-size: 18px;font-weight: 600" v-if="statu == 2">待收货</div>
          <div style="color: #07c193;font-size: 18px;font-weight: 600" v-if="statu == 3">已完成</div>
        </div>
        <div style="color: #5a66ff">
          <div v-if="statu == 1">确认付款</div>
          <div v-if="statu == 1">关闭订单</div>
          <div  v-if="statu == 2">确认收货</div>
          <div  v-if="statu == 2">修改物流</div>
          <div  v-if="statu == 2">物流信息</div>

          <div v-if="statu == 0">确认发货</div>
          <div v-if="statu == 0">修改收货信息</div>
          <div v-if="statu == 0">退款</div>
        </div>
      </div>
    </div>


    <div class="table_content">
      <div class="bg-color t_head" style="display: flex;justify-content: space-between;min-width: 1000px;">
        <div>
          下单时间：2021-9-10 11:27:47 订单编号：1021210910112748926018
          <span style="color: #5a6bfe">复制</span>
        </div>
        <div style="color: #5a6bfe">打印小票 <span style="color: black"> | </span> 备注</div>
      </div>

      <div class="t_content">
        <div class="border_right" style="width: 20%">
          <div style="display: flex">
            <div style="width: 75px;height: 75px;border-right: 5px">
              <el-image
                  style="height: 100%;width: 100%;border-radius: 5px;margin-right: 10px"
                  src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg"
                  :preview-src-list="['https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg']">
              </el-image>
            </div>

            <div style="width: calc(100% - 81px);line-height: 18px;margin-left: 6px;font-size: 13px">
              <div style="max-width: 200px" class="text-3-hidden">
                <el-tag style="color:#5a7bff;padding: 0 2px;margin-right: 6px" size="mini" color="#eeefff">实</el-tag>
                贵州埋汰酒 入地埋汰贵州埋汰酒 入地埋汰贵州埋汰酒入地埋汰贵州埋汰酒
              </div>
              <div>
                <el-tag size="mini" color="#eeefff" style="color:#5a7bff;padding: 0 4px">酒类</el-tag>
              </div>
            </div>
          </div>
        </div>
        <div class="border_right" style="width: 15%">
          <div>￥11</div>
          <div>x1</div>
          <div>积分抵扣：￥1.00</div>
        </div>
        <div class="border_right width-200">
          <div>小伙子</div>
          <div>12345678911</div>
        </div>
        <div class="border_right width-200">
          <div>￥10.00</div>
          <div>(含运费：￥0.00)</div>
        </div>
        <div class="border_right" style="width: 10%">
          <div>--</div>
          <div>快递:一路顺丰</div>
        </div>
        <div class="border_right">
          <!--          临时判断-->
          <div style="color: #ff9900;font-size: 18px;font-weight: 600" v-if="statu == 0">待发货</div>
          <div style="color: #ff0000;font-size: 18px;font-weight: 600" v-if="statu == 1">待付款</div>
          <div style="color: #5a66ff;font-size: 18px;font-weight: 600" v-if="statu == 2">待收货</div>
          <div style="color: #07c193;font-size: 18px;font-weight: 600" v-if="statu == 3">已完成</div>
        </div>
        <div style="color: #5a66ff">
          <div v-if="statu == 1">确认付款</div>
          <div v-if="statu == 1">关闭订单</div>
          <div  v-if="statu == 2">确认收货</div>
          <div  v-if="statu == 2">修改物流</div>
          <div  v-if="statu == 2">物流信息</div>

          <div v-if="statu == 0">确认发货</div>
          <div v-if="statu == 0">修改收货信息</div>
          <div v-if="statu == 0">退款</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "orderTable",
  props:{
    statu:{
      type:String || Number,
      default: function (){
        return '1'
      }
    }
  }
}
</script>

<style scoped lang="scss">
.bg-color {
  background-color: #f2f2f2;
}

.table-title {
  //padding: 10px 6px;
  display: flex;
  align-items: center;
  font-size: 14px;

  div {
    min-width: 132px;
    //min-width: 180px;
    padding: 10px 6px;
  }
}


.table_content {
  border-radius: 5px;
  border: solid 1px #e7e7e7;
  font-size: 14px;
  margin-top: 20px;

  .t_head {
    padding: 6px 10px;
  }

  .t_content {

    display: flex;
    font-size: 14px;

    .border_right {
      border-right: solid 1px #e7e7e7;
    }
  }
  .t_content>div {
    //padding: 10px 20px;
    padding: 20px 6px;
    min-width: 120px;
    //box-sizing: border-box;
    display: flex;
    justify-content: center;
    flex-direction: column;
    line-height: 24px;
  }
}

.width-160{
  width: 160px;
}
.width-180{
  width: 180px;
}
.width-200{
  width: 200px;
}
.width-210{
  width: 210px;
}
.width-250{
  width: 250px;
}
</style>
