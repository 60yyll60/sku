<!--可新增条目的选择框  规格页面用的多-->
<template>
<!--  eslint-disable-next-line vue/no-mutating-props -->
  <el-select v-model="getVal" filterable allow-create @change="selectSKUChange" default-first-option size="small" placeholder="请选择规格">
    <el-option
        v-for="item in options"
        :key="item.value"
        :label="item.label"
        :value="item.value">
    </el-option>
  </el-select>
</template>

<script>
export default {
  name: "searchSelect",
  computed:{
    getVal:{
      get() {
        return this.value
      },
      set(e) {
        this.$emit('update:value', e)
      }
    }
  },
  props:{
    options:{
      type:Array,
      default: function (){
        return [{
          value: '颜色',
          label: '颜色'
        }, {
          value: '尺寸',
          label: '尺寸'
        }, {
          value: '款式',
          label: '款式'
        }]
      }
    },
    value:{
      type:String
    }
  },
  data(){
    return{
      selectVal:'',
      temp:this.value
    }
  },
  methods:{
    // eslint-disable-next-line no-unused-vars
    selectSKUChange(val){
      //双向绑定用
      this.$emit('input',val)
      //给父组件监听改变用
      this.$emit('change',val)
    }
  }
}
</script>

<style scoped>

</style>
