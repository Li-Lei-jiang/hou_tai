<template>
  <div>
    <div class="warp">
      <el-container class="subject">
        <el-aside width="202px">
          <el-menu
            default-active="2"
            class="el-menu-vertical-demo subject"
            @select="handleOpen"
            background-color="#545c64"
            text-color="#fff"
            active-text-color="#ffd04b"
          >
            <el-menu-item index="1">
              <i class="el-icon-menu"></i>
              <span slot="title">首页</span>
            </el-menu-item>
            <el-menu-item index="2">
              <i class="el-icon-menu"></i>
              <span slot="title">已发布</span>
            </el-menu-item>
            <el-menu-item index="3">
              <i class="el-icon-s-help"></i>
              <span slot="title">统计</span>
            </el-menu-item>
            <el-menu-item index="4">
              <i class="el-icon-check"></i>
              <span slot="title">发表文章</span>
            </el-menu-item>
            <el-menu-item index="5">
              <i class="el-icon-s-finance"></i>
              <span slot="title">标签页</span>
            </el-menu-item>
            <el-menu-item index="6">
              <i class="el-icon-s-marketing"></i>
              <span slot="title">导出excel</span>
            </el-menu-item>
            <el-menu-item index="7">
              <i class="el-icon-upload"></i>
              <span slot="title">图片上传</span>
            </el-menu-item>
            <el-menu-item index="8">
              <i class="el-icon-setting"></i>
              <span slot="title">退出系统</span>
            </el-menu-item>
          </el-menu>
        </el-aside>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  components: {},
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
  },
  mounted() {},
  watch: {},
  computed: {},
};
</script>

<style scoped lang='scss'>
@import "./subject";
.el-header,
.el-footer {
  background-color: #b3c0d1;
  color: #333;
  text-align: center;
}

.el-aside {
  background-color: #d3dce6;
  color: #333;
  text-align: center;
}

.el-main {
  background-color: #e9eef3;
  color: #333;
  text-align: center;
}

body > .el-container {
  margin-bottom: 40px;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
}

.el-container:nth-child(7) .el-aside {
}
</style>