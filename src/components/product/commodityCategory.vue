<template>
  <!--  商品类目-->
  <el-dialog append-to-body
             title="选择类目"
             :visible.sync="getVal"
             width="900px" :modal="false"
             :before-close="handleClose">
    <p style="margin-bottom: 20px">最近使用：
      <el-tag size="small" style="color: #222222;border-color: #f5f5f5;margin-right: 10px" color="#f5f5f5">珠宝首饰>水晶玛瑙>脚链</el-tag>
      <el-tag size="small" style="color: #222222;border-color: #f5f5f5" color="#f5f5f5" >珠宝首饰>水晶玛瑙>脚链</el-tag>
    </p>
    <el-card style="background-color: #fafafa;border-radius: initial !important;" shadow="never">
      <div class="pa-3 d-flex justify-space-between align-center" style="background-color: #fafafa">
        <div class="dialog-box slider-y">
          <el-input
              popper-class="my-autocomplete"
              v-model="value" size="small"
              placeholder="搜索一级类目">
            <i
                class="el-icon-search el-input__icon"
                slot="suffix">
            </i>
          </el-input>
          <div class="row pa-3 py-1 item-hover-pointer row-active" style="font-size: 14px">
            上半年佛爱上弄发表
          </div>
          <div class="row pa-3 py-1 item-hover-pointer" style="font-size: 14px">
            上半年佛
          </div>
        </div>
        <div class="dialog-box slider-y">
          <el-input
              popper-class="my-autocomplete"
              v-model="value" size="small"
              placeholder="搜索二级类目">
            <i
                class="el-icon-search el-input__icon"
                slot="suffix">
            </i>
          </el-input>
          <div class="row pa-3 py-1 item-hover-pointer row-active" style="font-size: 14px">
            爱上反射镜
          </div>
          <!--            <div style="width: 100%;height: 100%;font-size: 14px" class="d-flex justify-center align-center">请选择一级类目</div>-->
        </div>
        <div class="dialog-box slider-y">
          <el-input
              popper-class="my-autocomplete"
              v-model="value" size="small"
              placeholder="搜索三级类目">
            <i
                class="el-icon-search el-input__icon"
                slot="suffix">
            </i>
          </el-input>
          <div class="row pa-3 py-1 item-hover-pointer row-active" style="font-size: 14px">
            发给甲方给
          </div>
          <!--            <div  style="width: 100%;height: 100%;font-size: 14px" class="d-flex justify-center align-center ">请选择二级类目</div>-->
        </div>
      </div>
    </el-card>


    <span slot="footer" class="dialog-footer">
      <el-button @click="closeDialog" size="small">取 消</el-button>
      <el-button type="primary" @click="closeDialog" size="small">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
export default {
  name: "commodityCategory",
  props: {
    visible: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      // eslint-disable-next-line vue/no-computed-properties-in-data
      categoryDialog: this.getVal,
      value: ''
    }
  },
  computed: {
    getVal: {
      get() {
        return this.visible
      },
      set(e) {
        this.$emit('update:visible', e)
      }
    }
  },
  methods: {
    closeDialog() {
      this.categoryDialog = false
      this.$emit('update:visible', false)
    },
    handleClose(done) {
      this.$confirm('确认关闭？')
          .then(() => {
            done();
          })
          .catch(() => {
          });
    },
  }
}
</script>

<style scoped lang="scss">
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

.dialog-box {
  border: solid 1px #dddddd;
  border-radius: 6px;
  height: 400px;
  width: 32%;
  background-color: white;
  position: relative;

  .row:hover {
    background-color: #fafafa;
  }

  .row-active {
    background-color: #e7e8f8;
    color: #5a66ff;
  }

  .row-active:hover {
    background-color: #e7e8f8 !important;
  }
}
.title-box {
  background-color: #f4f6f8;
  padding: 10px 20px;

  font-weight: 600;
  margin: 30px 0;

}
</style>
