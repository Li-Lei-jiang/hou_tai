<template>
  <div>
    <div class="warp">
      <div class="head">
        <div class="head_txt">
          <div>
            <div>欢迎&nbsp;{{user.username}}&nbsp;来到追梦后台管理系统</div>
            <div class="newtime">当前时间&nbsp;:&nbsp;{{currentTime}}</div>
          </div>
          <div>{{timeText}},亲爱的&nbsp;{{user.username}}&nbsp;,上次登陆时间&nbsp;:&nbsp;{{user.date}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      user: {}, //用户名
      currentTime: "", //当前时间
      timeText: "",
      timeHour: "", //小时
    };
  },
  components: {},
  created() {
    if (this.user) {
      this.user = this.getUser.userData;
    }
    this.getTime();
  },
  methods: {
    getTime() {
      setInterval(() => {
        this.currentTime = new Date().toLocaleString();
      }, 1000);
      this. getHour()
    },
    getHour() {
       let time = new Date().toLocaleString();
      // setInterval(() => {
      //   let time = new Date().toLocaleString();
      //   this.timeText = time.substr(10, 2);
      //   this.timeHour = time.substr(12, 1);
      // }, 3600);

      this.timeText = time.substr(10, 2);
      this.timeHour = time.substr(12, 1);
      //  - 如果早上6-12点，就提示早上好
      //   - 如果早上12-2点，就提示中午好
      //   - 如果下午2-6点，就提示下午好
      //   - 如果晚上6-12点，就提示晚上好
      //   - 如果凌晨12点-凌晨6点，就提示该睡觉了
      if(this.timeText=='上午'&&this.timeHour<12){
        this.timeText = '早上好'
      }else if(this.timeText=='上午'&&this.timeHour<3){
        this.timeText = '中午好'
      }else if(this.timeText=='下午'&&this.timeHour<6&&this.timeHour>2){
         this.timeText = '下午好'
      }else if (this.timeText=='下午'&&this.timeHour<12&&this.timeHour>6){
        this.timeText = '晚上好'
      }else {
        this.timeText = '该睡觉觉了'
      }
    },
  },
  mounted() {},
  watch: {},
  computed: {
    getUser() {
      return this.$store.state.userData;
    },
  },
};
</script>

<style scoped lang='scss'>
@import "./heads";
</style>