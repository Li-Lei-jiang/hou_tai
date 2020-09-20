<template>
  <div class="hwarp">
    <div class="header">
      <div class="itembox" v-for="(item,index) in homeData" :key="index">
        <div class="minibox">
          <div class="ico">
            <img src="../../imgas/ren.png" alt />
          </div>
          <div class="rigtext">
            <div
              style="color:#8F8F8F;font-size:20px;"
            >{{index.charAt(0).toUpperCase() + index.slice(1)}}</div>
            <div style="color:#666666;font-size:20px;">{{item}}</div>
          </div>
        </div>
      </div>
    </div>
    <!-- 折线图 -->
    <div id="main"></div>
    <!-- 雷达 玫瑰 柱状图 -->
    <div class="chartsShow">
      <div class="itemshow">
        <div id="radar"></div>
      </div>
      <div class="itemshow">
        <div id="pie"></div>
      </div>
      <div class="itemshow"></div>
    </div>
    <!-- 底部表格 -->
    <div class="endbox">
      <div class="left">
        <el-table :data="tableData">
          <el-table-column prop="num" label="Order_No" width="520" style></el-table-column>
          <el-table-column prop="price" label="Price" width="280"></el-table-column>
          <el-table-column prop="status" label="Status">
            <template slot-scope="scope">
              <el-button
                :style="scope.row.status===0? 'el-button--danger':'el-button--success'"
                size="mini"
                :type="scope.row.status===0? 'danger':'success'"
                @click="handleDelete(scope.$index, scope.row)"
              >{{scope.row.status===0? 'pending':'success'}}</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="rig">
        <div class="rig_bg">
          <img src="../../imgas/shouyee.png" alt />
        </div>
        <div class="rig_progress">
          <div v-for="(item,index) in progress" :key="index" style="    height: 40px;
    line-height: 25px;">
            <div style="display: inline-block;">{{item.name}}</div>
            <el-progress :percentage="item.progress" v-if="index === 1" status="success"></el-progress>
            <el-progress :percentage="item.progress" v-else></el-progress>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      homeData: {}, //kaitou展示内容
      xAdata: [],
      tarr: [],
      radarname: [],
      indicator: [], //饼图展示区域
      tableData: [], //订单
      progress: [], //进度条
    };
  },
  components: {},
  created() {
    this.gethomeLineChat();
    this.getRadarChat();
    this.getRingChat();
    this.getHomeData();
    this.getOrderData();
  },
  methods: {
    //获取折线图数据
    gethomeLineChat() {
      this.$api
        .gethomeChat()
        .then((res) => {
          if (res.code == 0) {
            let d = res.data;
            let obj = {
              type: "line",
              color: "#3C88F7",
              data: [],
              smooth: true,
              name: "actual",
            };
            let obj1 = {
              type: "line",
              data: [],
              smooth: true,
              color: "#FD1C5F",
              name: "expected",
            };
            this.tarr = [];
            d.filter((item) => {
              this.xAdata.push(item.date);
              obj.data.push(item.actual);
              obj1.data.push(item.expected);
            });
            this.tarr.push(obj, obj1);
            // 基于准备好的dom，初始化echarts实例
            var myChart = this.$echarts.init(document.getElementById("main"));

            // 指定图表的配置项和数据
            // 绘制图表
            myChart.setOption({
              // title: { text: '在Vue中使用echarts' },
              legend: {
                textStyle: {
                  color: "#333333", // 图例文字颜色
                },
                padding: 20,
              },
              grid: { show: "true", borderWidth: "0" },
              tooltip: {},
              xAxis: {
                data: this.xAdata,
              },
              yAxis: {
                type: "value",
              },
              series: this.tarr,
            });
          } else {
            this.$message.error("获取失败");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },

    //雷达图
    getRadarChat() {
      this.$api
        .getRadarChat()
        .then((res) => {
          if (res.code == 0) {
            let d = res.data;
            d.filter((item) => {
              let obj1 = {
                  name: "",
                  type: "radar",
                  value: [],
                },
                obj2 = {},
                arr = [];
              obj1.name = item.name;
              arr.push(item.sales);
              arr.push(item.ministration);
              arr.push(item.techology);
              arr.push(item.delelopmer);
              arr.push(item.marketing);
              // Dividing line
              obj1.value = arr;
              obj2 = item;
              // console.log(item.sales);
              this.indicator.push(obj2);
              this.radarname.push(obj1);
            });
            //  console.log(this.radarname);
          } else {
            this.$message.error("获取失败");
          }
          // console.log(res);
          // console.log(this.radarname);

          var myChart = this.$echarts.init(document.getElementById("radar"));
          // 绘制图表
          myChart.setOption({
            tooltip: {},
            legend: {
              //  padding: 20,
            },
            radar: {
              // shape: 'circle',
              name: {
                textStyle: {
                  color: "#fff",
                  backgroundColor: "#999",
                  borderRadius: 3,
                  padding: [3, 5],
                },
              },
              indicator: this.indicator,
            },
            series: this.radarname,
          });
        })
        .catch((err) => {
          console.log(err);
        });
    },
    //饼图
    getRingChat() {
      this.$api
        .getRingChat()
        .then((res) => {
          if (res.code == 0) {
            let d = res.data,
              arr = [];
            d.filter((item) => {
              let obj = {};
              obj.name = item.name;
              obj.value = item.data;
              arr.push(obj);
            });
            var myChart = this.$echarts.init(document.getElementById("pie"));
            myChart.setOption({
              title: {
                left: "center",
              },
              tooltip: {
                trigger: "item",
                formatter: "{a} <br/>{b} : {c} ({d}%)",
              },
              legend: {
                left: "center",
                padding: 30,
                top: "top",
                data: arr.name,
              },
              toolbox: {},
              color: ["#19D4AE", "#5AB1EF", "#FA6E86", "#FFB980", "#0067A6"],
              series: [
                {
                  name: "面积模式",
                  type: "pie",
                  radius: [30, 110],
                  center: ["50%", "50%"],
                  roseType: "area",
                  data: arr,
                },
              ],
            });
          } else {
            this.$message.error("获取失败");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    //总数据
    getHomeData() {
      this.$api
        .getHomeData()
        .then((res) => {
          if (res.code == 0) {
            this.homeData = res.data;
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    //订单
    getOrderData() {
      this.$api
        .getOrderData()
        .then((res) => {
          if (res.code == 0) {
            let d = res.data;
            d.filter((item) => {
              let pr = "￥" + item.price;
              item.price = pr;
            });
            this.tableData = d;
          }
          this.getProgress();
          // console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    //获取进度条
    getProgress() {
      this.$api
        .getProgress()
        .then((res) => {
          if (res.code == 0) {
            let d = res.data;
            d.filter((item) => {
              let cot = item.progress * 100;
              item.progress = cot;
            });
            this.progress = d;
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    //获取表格选中项
    handleDelete(index, row) {
      console.log(index, row);
    },

  },
  mounted() {},
  watch: {},
  computed: {},
};
</script>

<style   scoped lang='scss'>
@import "./Home.css";
</style>
<style>
.el-table--enable-row-transition .el-table__body td {
  text-align: center;
}
.el-table td,
.el-table th.is-leaf {
  text-align: center;
}
.el-button--success {
  color: #67c23a !important;
  background-color: #f0f9eb !important;
  border-color: #f0f9eb !important;
}

.el-button--danger {
  background: #fef0f0 !important;
  background-color: #fef0f0 !important;
  color: #f8956c !important;
  border: 0 !important;
}
.el-table {
  width: 97%;
  margin: 0 auto;
}
</style>