<template>
  <div class="upload_warp">
    <div class="box">
      <div class="title">支持拖拽</div>
      <div class="tip">Element UI 自带上传组件</div>
      <el-upload
        class="upload-demo"
        drag
        :on-preview="handlePreview"
        :on-remove="handleRemove"
        :file-list="fileList2" 
        :on-success="onSuccess"
        action="http://localhost:3000/upload"
        multiple
      >
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">
          将文件拖到此处，或
          <em>点击上传</em>
        </div>
        <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
      </el-upload>
      <div class="title Tailoring">支持裁剪</div>
      <div class="tip vues">vue-image-crop-upload</div>
      <div>
        <my-upload
          @crop-success="cropSuccess"
          @crop-upload-success="cropUploadSuccess"
          @crop-upload-fail="cropUploadFail"
          v-model="show"
          :width="200"
          :height="200"
          img-format="png"
          :size="size"
          langType="zh"
          :noRotate="false"
          field="Avatar1"
          url="http://localhost:3000/upload"
        ></my-upload>
        <img :src="imgDataUrl" />
      </div>
      <el-button type="primary" @click="toggleShow">上传图片</el-button>
    </div>
  </div>
</template>

<script>
import "babel-polyfill";
import myUpload from "vue-image-crop-upload";
export default {
  data() {
    return {
      imgDataUrl: "",
      show: false,
      size: 2.1,
      fileList2:[],//上传的文件列表
    };
  },
  components: { "my-upload": myUpload },
  methods: {
    /***饿了么ui */
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    //点击已上传的文件链接时的钩子,获取服务器返回的数据
    handlePreview(file) {
      console.log(file);
    },
     //文件上传成功时的钩子
      onSuccess(response, file, fileList) {
        console.log(response.data,file, fileList)    //服务器返回的图片信息，可以提交到表格
        this.$message({
          message: '图片上传成功',
          type: 'success'
        })
        this.$refs.upload.clearFiles()//上传成功清除列表，否则每次上传都要删掉上次上传的列表
      },
    /***vue 插件 */
    toggleShow() {
      this.show = !this.show;
    },
    cropSuccess(imgDataUrl, field) {
      console.log("-------- crop success --------", imgDataUrl, field);
    },
    //上传成功回调
    cropUploadSuccess(jsonData, field) {
      console.log("-------- upload success --------");
      this.imgDataUrl = jsonData.files.Avatar1;
      console.log(jsonData);
      console.log("field: " + field);
    },
    //上传失败回调
    cropUploadFail(status, field) {
      console.log("-------- upload fail --------");
      console.log("上传失败状态" + status);
      console.log("field: " + field);
    },
  },
  mounted() {},
  watch: {},
  computed: {},
};
</script>

<style scoped lang='scss'>
@import "./upload";
</style>