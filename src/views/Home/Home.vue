<template>
  <div class="hwarp">
    <div class="header">
      <div class="itembox" v-for=" i in 4" :key="i">
        <div class="minibox">
          <div class="ico">
            <img src="../../imgas/ren.png" alt />
          </div>
          <div class="rigtext">
            <div>NWAD DAS</div>
            <div>8000</div>
          </div>
        </div>
      </div>
    </div>
    <!-- 折线图 -->
    <!-- 为 ECharts 准备一个具备大小（宽高）的 DOM -->
    <div id="main" style="width: 100%;height:400px;margin-top: 50px;"></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      xAdata: [],
      tarr: [],
    };
  },
  components: {},
  created() {
    this.gethomeLineChat();
  },
  methods: {
    showLine() {
      // 基于准备好的dom，初始化echarts实例
      var myChart = this.$echarts.init(document.getElementById("main"));

      // 指定图表的配置项和数据
      // 绘制图表
      myChart.setOption({
        // title: { text: '在Vue中使用echarts' },
        legend:{},
        tooltip: {},
        xAxis: {
          data: this.xAdata,
        },
        yAxis: {
          type: 'value'
        },
        series: this.tarr,
      });
    },
    gethomeLineChat() {
      this.$api
        .gethomeChat()
        .then((res) => {
          if (res.code == 0) {
            let d = res.data;
            let obj = {
              type: "line",
              data: [],
              name:'actual'
            };
            let obj1 = {
              type: "line",
              data: [],
               name:'expected'
            };
            this.tarr = [];
            d.filter((item) => {
              this.xAdata.push(item.date);
              obj.data.push(item.actual);
              obj1.data.push(item.expected);
            });
            this.tarr.push(obj, obj1);
            console.log(this.tarr);
            this.showLine();
          } else {
            this.$message.error("获取失败");
          }
        })
        .catch((err) => {
          console.log(err);
        });
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