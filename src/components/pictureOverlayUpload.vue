<template>
<!--  上传后覆盖上传框-->
  <div class="pictureOverlayUpload" style="display: inline-block;margin-right: 20px">
    <el-upload :class="{ hide: isShowUpload }"
        action="https://jsonplaceholder.typicode.com/posts/"
        list-type="picture-card" :auto-upload="false"
        :on-change="handleIntroduceUploadHide"
        :on-remove="handleIntroduceRemove">
      <slot name="trigger">
        <div class="flex-center">
          <svg v-if="icon === 'plus'" t="1653355928572" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2923" width="20" height="20"><path d="M576 64H448v384H64v128h384v384h128V576h384V448H576z" fill="#5a66ff" p-id="2924"></path></svg>
          <svg v-if="icon === 'video'" t="1653356652359" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4459" width="20" height="20"><path d="M725.632 827.904c-63.104 42.88-136.832 65.408-213.504 65.408-210.304 0-381.312-171.008-381.312-381.184 0-75.52 22.016-148.608 63.744-211.072 8.576-12.672 4.992-29.952-7.68-38.528-12.672-8.576-29.952-4.992-38.528 7.68-47.872 71.68-73.088 155.392-73.088 241.92 0 240.768 195.968 436.608 436.864 436.608 87.68 0 172.416-25.856 244.736-74.88 12.672-8.576 16-25.856 7.424-38.656-8.704-12.544-25.984-15.872-38.656-7.296zM512 75.136c-93.312 0-182.272 28.928-257.408 83.84-12.416 9.088-15.104 26.496-6.016 38.784 9.088 12.416 26.496 15.104 38.784 6.016 65.536-47.744 143.232-73.088 224.64-73.088 210.176 0 381.184 171.136 381.184 381.312 0 81.408-25.216 159.104-73.088 224.512-9.088 12.416-6.272 29.824 6.016 38.784 4.864 3.712 10.624 5.376 16.384 5.376 8.576 0 17.024-3.968 22.4-11.52 54.912-75.136 83.84-164.096 83.84-257.28C948.864 271.104 753.024 75.136 512 75.136z m-84.864 611.968c4.864 0 9.6-1.152 13.952-3.84l251.904-145.408c8.576-4.864 13.824-14.08 13.824-24.064 0-9.984-5.248-19.072-13.824-24.064L441.216 344.32c-8.704-4.864-19.2-4.864-27.904 0-8.576 4.864-13.824 14.08-13.824 24.064V659.2c0 9.984 5.248 19.072 13.824 24.064 4.224 2.56 9.088 3.84 13.824 3.84z m27.904-270.592l168.576 97.28-168.576 97.28v-194.56z" p-id="4460" fill="#5a66ff"></path></svg>
          <div style="font-size: 12px">{{ description }}</div>
        </div>
      </slot>
    </el-upload>

  </div>

</template>

<script>
export default {
  name: "pictureOverlayUpload",
  props:{
    description:{
      type:String,
      default:'上传图片'
    },
    //图片 只有 plus 和 video
    icon:{
      type:String,
      default:'plus'
    }
  },
  data() {
    return {
      dialogImageUrl: '',
      dialogVisible: false,
      isShowUpload:false
    };
  },
  methods: {
    handleIntroduceUploadHide(file, fileList) {
      this.isShowUpload =
          fileList.length >= 1;
      console.log(file,'上传之前');
      this.findvideocover(file.url,file);
    },
    handleIntroduceRemove(file, fileList) {
      this.isShowUpload =
          fileList.length >= 1;
    },




    //截取视频第一帧作为播放前默认图片
    findvideocover(url,file) {
      // const  video = document.getElementById("myvideo"); // 获取视频对象
      const video = document.createElement("video") // 也可以自己创建video
      video.src=url // url地址 url跟 视频流是一样的

      // var canvas = document.getElementById('mycanvas') // 获取 canvas 对象
      var canvas = document.createElement('canvas') // 获取 canvas 对象
      const ctx = canvas.getContext('2d'); // 绘制2d
      video.crossOrigin = 'anonymous' // 解决跨域问题，也就是提示污染资源无法转换视频
      video.currentTime = 1 // 第一帧

      video.oncanplay = () => {
        console.log(video.clientWidth, video.clientHeight);
        canvas.width = video.clientWidth ? video.clientWidth : 320; // 获取视频宽度
        canvas.height = video.clientHeight ? video.clientHeight : 320; //获取视频高度
        // 利用canvas对象方法绘图
        ctx.drawImage(video, 0, 0, canvas.width,canvas.height)
        // 转换成base64形式
        this.videoFirstimgsrc = canvas.toDataURL ("image/png"); // 截取后的视频封面
        file.url = this.videoFirstimgsrc;
        // base64转成bolb文件
        const fileBolb = this.base64toFile(this.videoFirstimgsrc, this.getFileName(file))

        console.log('生成的图片',fileBolb)

      }
    },

    base64toFile (baseUrl, filename = 'file') {
      let arr = baseUrl.split(',');
      let type = arr[0].match(/:(.*?);/)[1];   // 解锁图片类型
      let bytes = atob(arr[1]); // 解码base64
      let n = bytes.length
      let bufferArray = new Uint8Array(n);
      while (n--) {
        bufferArray[n] = bytes.charCodeAt(n);
      }
      return new File([bufferArray ],filename,{ type });

    },

    getFirstPngUrl(file){
      const fd = new FormData();
      fd.append('file',file);
      fd.append('sid',this.uploadData.sid);
      // this.$post为我自己封装的axios的post方法。可直接用axios的post方法
      this.$post('http://www.baidu.com', fd, { headers: {'Content-Type': 'multipart/form-data',  },}).then(res=>{
        this.videoFirstimgsrc = res.url;
        this.videoWriteFileList[0].url = res.url;
      })
    },

    getFileName(file){
      const type = file.raw.type.split("/")[1];
      let name = '';
      if(type){
        name = file.raw.name.substring(0, file.raw.name.indexOf(`.${type}`));
      }
      return `${name}.png`;
    },
  }
}
</script>

<style scoped lang="scss">
.flex-center{
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #5a66ff;
}
</style>
