<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<style lang="scss">
#app {
  font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
}

::v-deep.el-menu-item {
  margin-right: 2px !important;
}
p{
  margin: 0;
}
div{
  letter-spacing: 1px;
}
//进度条的颜色
#nprogress .bar {
  background:  #009faa !important; //自定义颜色
}
.slider-y {
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
  /*使滚动变得平滑*/
  scroll-behavior: auto;
  scroll-behavior: smooth;
}

//文本三行省略
.text-3-hidden{
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
}

//组件的样式写在这
.pictureOverlayUpload{
  .el-upload--picture-card {
    width: 72px !important;
    height: 72px !important;
    line-height: 20px !important;
  }
  .el-upload-list--picture-card .el-upload-list__item {
    width: 72px !important;
    height: 72px !important;
  }
  .hide .el-upload--picture-card {
    display: none !important;
  }
}

/*更改element ui 的全局样式适应该项目*/
.el-card {
  border-radius: 8px !important;
}
.el-form-item__label {
  font-weight: 600 !important;
  font-size: 13px !important;
}
.el-table th.el-table__cell {
  background-color: #f2f2f2 !important;
  padding: 5px 0 !important;
}
.el-avatar, .el-cascader-panel, .el-radio, .el-radio--medium.is-bordered .el-radio__label, .el-radio__label {
  font-size: 13px !important;
}
.el-radio__label {
  vertical-align: middle !important;
}
.el-table thead {
  color: #474747 !important;
  font-weight: 500;
  /* background: red; */
}

.el-pagination.is-background .el-pager li:not(.disabled).active {
  background-color: #0052d9 !important;

}

.el-pagination.is-background .el-pager li:not(.disabled) {
  border-radius: 5px !important;
}

.el-pagination.is-background .el-pager li:not(.disabled):hover {
  color: #0052d9 !important;
}

.el-dialog {
  z-index: 9999 !important;
}

.el-textarea__inner, .el-input__inner, .el-select {
  border-radius: 5px !important;
}
//按钮白底灰边
.button-bg-white { //在按钮父元素添加
  .el-button:hover {
    color: #222222 !important;
    border-color: #dddddd !important;
    background-color: #f5f5f5 !important;
  }
  .el-button:focus{
    color: #222222 !important;
    border-color: #dddddd !important;
  }
  .el-button {
    background-color: #ffffff !important;
  }
}
.inner-button-bg-white:hover{ //直接在按钮上添加样式
  color: #222222 !important;
  border-color: #dddddd !important;
  background-color: #f5f5f5 !important;
}
.inner-button-bg-white:focus{
  color: #222222 !important;
  border-color: #dddddd !important;
}
.el-radio__inner::after {
  width: 6px !important;
  height: 6px !important;
}
.el-checkbox__input.is-checked+.el-checkbox__label {
  color: #626468 !important;
}
//把input suffix改为统一样式
.el-suffix-button{
    background: #f5f5f5 !important;
    padding: 8px !important;
    border-top-right-radius: 5px !important;
    border-bottom-right-radius: 5px !important;
    position: relative !important;
    left: 5px !important;
    color: #101010 !important;
    border: solid 1px #d5d6d7 !important;


}

.el-table {
  .el-table__body-wrapper .el-input .el-input__suffix .el-input__prefix, .el-input__suffix {
    position: absolute;
    top: 4px !important;
  }
}
.el-button--primary {
  color: #FFF;
  background-color:#5a66ff !important;
  border-color: #5a66ff !important;
  border-radius: 5px !important;
}

/*更改element ui 的全局样式适应该项目*/



/*路由切换过渡动画*/
.fade-in-right {
  -webkit-animation: fade-in-right 0.2s cubic-bezier(0.390, 0.575, 0.565, 1.000) both;
  animation: fade-in-right 0.2s cubic-bezier(0.390, 0.575, 0.565, 1.000) both;
}

@-webkit-keyframes fade-in-right {
  0% {
    -webkit-transform: translateX(40px);
    transform: translateX(40px);
    opacity: 0;
  }
  100% {
    -webkit-transform: translateX(0);
    transform: translateX(0);
    opacity: 1;
  }
}

@keyframes fade-in-right {
  0% {
    -webkit-transform: translateX(40px);
    transform: translateX(40px);
    opacity: 0;
  }
  100% {
    -webkit-transform: translateX(0);
    transform: translateX(0);
    opacity: 1;
  }
}
</style>
