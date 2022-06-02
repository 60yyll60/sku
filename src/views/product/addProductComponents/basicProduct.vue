<!--商品的基本信息-->
<template>
  <div>
    <div class="title-box">商品类型</div>
    <div style="display: flex;align-items: center;font-size: 13px">
      <div class="select-box select-box-active">
        <div style="font-weight: 600;font-size: 15px">实体商品</div>
        <div>物流发货</div>
        <div style="position:absolute;right: 0;bottom: 0;display: flex">

          <!--右下角的勾勾-->
          <svg t="1652857441222" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
               p-id="2014" width="30" height="30">
            <path
                d="M256 1024h768V256l-768 768z m493.6-108.8L704 960l-45.6-45.6L576 832l45.6-45.6L704 869.6l210.4-210.4 45.6 45.6-210.4 210.4z"
                p-id="2015" fill="#2d8cf0"></path>
          </svg>
        </div>
      </div>
      <div class="select-box">
        <div style="font-weight: 600;font-size: 15px">虚拟商品</div>
        <div>无需物流</div>
      </div>
    </div>
    <div style="font-size: 12px;color: #939799;margin-top: 10px">商品类型在商品保存后无法修改，请谨慎选择</div>

    <div class="title-box">基本信息</div>

    <el-form label-position="right" label-width="80px" style="width: 35%;min-width: 600px">
      <el-form-item label="商品标题:">
        <el-input
            type="textarea" placeholder="请输入商品标题" :rows="1" v-model="value" maxlength="30" show-word-limit>
        </el-input>
      </el-form-item>
      <el-form-item label="虚拟销量:">
        <el-input
            type="textarea" placeholder="请输入" :rows="1" v-model="value" maxlength="10" show-word-limit>
        </el-input>
      </el-form-item>
      <el-form-item label="商品单位:">
        <el-input type="textarea" placeholder="请输入" :rows="1" v-model="value" maxlength="10"
                  show-word-limit></el-input>
      </el-form-item>
      <el-form-item label="商品主图:">
        <picture-overlay-upload></picture-overlay-upload>
      </el-form-item>
      <el-form-item label="主图视频:">
        <picture-overlay-upload icon="video" description="上传视频"></picture-overlay-upload>
        <picture-overlay-upload description="视频封面"></picture-overlay-upload>

      </el-form-item>
      <el-form-item label="商品类目:">
        <el-button style="background-color: #f5f5f5;border: solid 1px #dddddd" size="small" @click="openDialog">选择商品类目
        </el-button>
        <div style="font-size: 12px;color: #888888;line-height: 20px">准确选择商品类目有助于商品信息的完善与数据分析的精准</div>
      </el-form-item>
      <el-form-item label="营销标签:">
        <el-checkbox-group v-model="checkList">
          <el-checkbox label="推荐" ></el-checkbox>
          <el-checkbox label="新品" ></el-checkbox>
          <el-checkbox label="热卖" ></el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="商品排序:">
        <el-input v-model="value" size="small" placeholder="请输入排序"  type="number" maxlength="4" show-word-limit></el-input>
        <div style="font-size: 12px;color: #888888;line-height: 20px">最多4位数字，数字越大，排名越靠前，默认排序为创建时间</div>
      </el-form-item>
      <el-form-item label="显示销量:">
        <el-radio v-model="radioTemp" :label="0">是</el-radio>
        <el-radio v-model="radioTemp" :label="1">否</el-radio>
        <div style="font-size: 12px;color: #888888;line-height: 20px">显示销量=实际销量+虚拟销量</div>
      </el-form-item>
      <el-form-item label="虚拟销量:">
        <el-input v-model="value" size="small" placeholder="请输入虚拟销量"></el-input>
      </el-form-item>
    </el-form>

    <div class="title-box">物流设置</div>

    <el-form label-position="right" label-width="100px" style="width: 35%;min-width: 600px">
      <el-form-item label="发货方式:">
        <el-checkbox-group v-model="checkList" @change="checkbox">
          <el-checkbox label="物流发货" ></el-checkbox>
          <el-checkbox label="到店核销" ></el-checkbox>
        </el-checkbox-group>
        <div v-show="checkList.length !== 0" style="background-color: #eeefff;padding: 5px 10px;border-radius: 5px;width: 184%">

          <el-form-item label="运费设置：" label-position="left" label-width="90px" v-show="checkList.filter(item => item === '物流发货').length !== 0">
            <el-radio v-model="radioTemp" label="1">固定运费</el-radio>
            <el-radio v-model="radioTemp" label="2">运费模板</el-radio>
          </el-form-item>
          <el-form-item label-position="left" label-width="80px" v-show="checkList.filter(item => item === '物流发货').length !== 0">
            <div style="font-size: 13px;">运费统一设置为
              <el-input size="small" placeholder="请输入成本价" style="width: 150px">
                <span style="line-height: 34px" slot="suffix" class="el-suffix-button">元</span>
              </el-input>
              选择固定运费模板即支持全国配送（不包括港澳台和新疆及西藏地区）
            </div>
          </el-form-item>
          <el-form-item label="选择核销门店：" label-position="left" label-width="120px"  v-show="checkList.filter(item => item === '到店核销').length !== 0">
            <el-radio v-model="radioTemp" label="1">所有核销门店</el-radio>
            <el-radio v-model="radioTemp" label="2">部分核销门店</el-radio>
            <span style="color: #5a6fff">创建核销门店</span>
          </el-form-item>
        </div>
      </el-form-item>
    </el-form>

    <div class="title-box">规格与库存</div>

    <product-s-k-u></product-s-k-u>

    <div class="title-box">上下架设置</div>
<!--    商品类目模态框-->
    <commodity-category :visible.sync="categoryDialog"></commodity-category>

    <el-form label-position="right" label-width="100px" style="width: 35%;min-width: 600px">
      <el-form-item label="上架时间:">
        <el-radio v-model="radioTemp" :label="0">立即上架</el-radio>
        <el-radio v-model="radioTemp" :label="1">定时上架</el-radio>
        <el-radio v-model="radioTemp" :label="2">暂不上架</el-radio>
        <div v-show="radioTemp === 1" style="background-color: #f5f5f5;padding: 5px 10px;border-radius: 5px">
          <el-date-picker size="small"
              v-model="dateTemp" :picker-options="endDateOpt"
              type="datetime"
              placeholder="选择日期时间">
          </el-date-picker>
        </div>
      </el-form-item>
      <el-form-item label="下架时间:">
        <el-radio v-model="radioTemp" :label="0">不限制</el-radio>
        <el-radio v-model="radioTemp" :label="1">定时下架</el-radio>
        <div v-show="radioTemp === 1" style="background-color: #f5f5f5;padding: 5px 10px;border-radius: 5px">
          <el-date-picker size="small"
                          v-model="dateTemp" :picker-options="endDateOpt"
                          type="datetime"
                          placeholder="选择日期时间">
          </el-date-picker>
        </div>
      </el-form-item>
    </el-form>


  </div>
</template>

<script>
import productSKU from "@/views/product/addProductComponents/productSKU";
import commodityCategory from "@/components/product/commodityCategory";
import pictureOverlayUpload from "@/components/pictureOverlayUpload";
export default {
  name: "basicProduct",
  components: {
    productSKU,commodityCategory,pictureOverlayUpload
  },
  data() {
    return {
      value: '',
      radioTemp: 0,
      dateTemp:'',
      checkList:[],

      dialogImageUrl: '',
      dialogVisible: false,
      categoryDialog: false,
      endDateOpt:{
        disabledDate(time) {
          return time.getTime() < Date.now() - 8.64e7;
        }
      }
    }
  },
  methods: {
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    openDialog() {
      this.categoryDialog = true;
    },

    checkbox(){
      console.log(this.checkList);
    }

  }
}
</script>

<style scoped lang="scss">

.select-box {
  text-align: center;
  line-height: 23px;
  padding: 10px 30px;
  border: solid 1px #dcdee2;
  margin-right: 20px;
  /*margin-top: 20px;*/
  cursor: pointer;
  position: relative;
}

.select-box-active {
  border: solid 2px #2d8cf0;
}

.title-box {
  background-color: #eeefff;
  padding: 10px 20px;
  font-size: 15px;
  font-weight: 600;
  margin: 30px 0;

}




.pa-3 {
  padding: 6px;
}

.d-flex {
  display: flex;
}

.justify-center {
  justify-content: center;
}

.justify-space-between {
  justify-content: space-between;
}

.align-center {
  align-items: center;
}

.item-hover-pointer {
  cursor: pointer;
}


::v-deep.el-dialog__wrapper .el-dialog .el-dialog__body {
  padding: 10px 20px;
}

::v-deep.el-dialog__wrapper .el-dialog .el-dialog__body .el-card__body, .el-main {
  padding: 5px;
}

::v-deep.el-dialog__wrapper .el-dialog .el-dialog__body .el-input__inner {
  border-radius: 0px;
  border: indianred;
  border-bottom: solid 1px #dddddd;
}

::v-deep.el-dialog__wrapper .el-dialog .el-dialog__body .el-input {
  position: sticky;
  top: 0;
}

::v-deep.el-textarea .el-input__count {
  color: #909399;
  background: initial;
  position: absolute;
  font-size: 12px;
  bottom: -3px;
  right: 10px;
}

::v-deep.el-input--small .el-textarea__inner {
  font-family: initial;
  bottom: 4px;
  position: relative;
}

::v-deep.el-form-item .el-form-item__content .el-upload--picture-card {
  width: 90px;
  height: 90px;
  line-height: 93px;
}

::v-deep.el-form-item .el-form-item__content .el-upload-list--picture-card .el-upload-list__item {
  width: 90px;
  height: 90px;
}

</style>
