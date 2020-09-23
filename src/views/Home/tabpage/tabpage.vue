<template>
  <div>
    <el-tabs v-model="activeName">
      <el-tab-pane :label="'未读消息'+'（'+getunread+'）'" name="first">
        <div class="tabpag" v-if="tabData&&tabData.length>0">
          <div class="tabItem" v-for="(item,index) in tabData" :key="index">
            <div style=" padding-left:10px;">{{item.msg}}</div>
            <div style="margin-right: 40px;">
              {{item.time}}
              <el-button size="mini" style="margin-left:15px;" @click="getRow(item)">标记为已读</el-button>
            </div>
          </div>
          <div style="margin-top:30px">
            <el-button type="primary" style="margin:25px 0 15px 20px;" @click="allread">全部标记为已读</el-button>
          </div>
        </div>
        <div v-else class="noItem">暂无未读消息</div>
      </el-tab-pane>
      <el-tab-pane :label="'未读消息'+'（'+getRead+'）'" name="second">
        <div class="tabpag" v-if="readData&&readData.length>0">
          <div class="tabItem" v-for="(item,index) in readData" :key="index">
            <div style=" padding-left:10px;">{{item.msg}}</div>
            <div style="margin-right: 40px;">
              {{item.time}}
              <el-button size="mini" style="margin-left:15px;" @click="getReadRow(item)">删除</el-button>
            </div>
          </div>
          <div style="margin-top:30px">
            <el-button type="danger" plain style="margin:25px 0 15px 20px;" @click="allReadread">全部删除</el-button>
          </div>
        </div>
        <div v-else class="noItem">暂无已读消息</div>
      </el-tab-pane>
      <el-tab-pane :label="'未读消息'+'（'+getRecycleBin+'）'" name="third">
        <div class="tabpag" v-if="recycleBinData&&recycleBinData.length>0">
          <div class="tabItem" v-for="(item,index) in recycleBinData" :key="index">
            <div style=" padding-left:10px;">{{item.msg}}</div>
            <div style="margin-right: 40px;">
              {{item.time}}
              <el-button size="mini" style="margin-left:15px;" type="warning" @click="reduction(item)">还原</el-button>
            </div>
          </div>
          <div style="margin-top:30px">
            <el-button type="info" plain style="margin:25px 0 15px 20px;" @click="delAll">清空回收站</el-button>
          </div>
        </div>
        <div v-else class="noItem">回收站暂无消息</div>

      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeName: "first  ",
      tabData: [
        //现有未读的
        {
          msg: "【该系统将于今晚凌晨2点到5点进行升级维护】",
          time: "2020-9-23 20: 00:00",
        },
        {
          msg: "今晚12点发大红包先到先得",
          time: "2020-9-23 21: 00:00",
        },
      ],
      readData: [
        {
          msg: "今晚吃鸡大吉大利",
          time: "2020-9-23 16: 00:00",
        },
      ], //已读
      recycleBinData: [
        {
          msg: "您的优惠卷将于今晚过期，请注意时间",
          time: "2020-9-23 11: 00:00",
        },
      ], //回收站
    };
  },
  components: {},
  created() {},
  methods: {
    //得到点击的那一行数据
    getRow(item) {
      this.tabData.splice(item, 1);
      this.readData.push(item);
      // console.log(item,index);
    },
    //一键全部已读
    allread() {
      let tabData = this.tabData;
      tabData.filter((item) => {
        //先添加
        this.readData.push(item);
      });
      this.tabData.splice(0); //后删除
      
    },
    /***已读消息 */
    getReadRow(item) {
      this.readData.splice(item, 1);
      this.recycleBinData.push(item);
    },
    //删除全部
    allReadread() {
      let readData = this.readData;
      readData.filter((item) => {
        //先添加
        this.recycleBinData.push(item);
      });
      this.readData.splice(0); //后删除
    },
    /***回收站 */
    //还原
    reduction(item){
       this.recycleBinData.splice(item, 1);
      this.readData.push(item);
    },
    //清空回收站
    delAll(){
      this.recycleBinData = [];
    },
  },
  mounted() {},
  watch: {},
  computed: {
    //获取标签选中页的长度即消息数量
    getunread: function () {
      return this.tabData.length;
    },
    //已读
    getRead: function () {
      return this.readData.length;
    },
    //回收站
    getRecycleBin: function () {
      return this.recycleBinData.length;
    },
  },
};
</script>

<style scoped lang='scss'>
@import "./tabpage";
</style>