<template>
  <div class="updetwarp">
    <div class="uptab">
      <el-table :data="tableData" border style="width: 100%" stripe v-loading="loading">
        <el-table-column type="index" label="#" width="50"></el-table-column>
        <el-table-column prop="date" label="标题" width="300"></el-table-column>
        <el-table-column prop="name" label="作者" width="80"></el-table-column>
        <el-table-column prop="name" label="类目" width="150"></el-table-column>
        <el-table-column prop="name" label="来源" width="80"></el-table-column>
        <el-table-column label="重要性" width="150">
          <el-rate v-model="value1"></el-rate>
        </el-table-column>
        <el-table-column prop="name" label="发布时间" width="250"></el-table-column>
        <el-table-column label="操作">
          <el-button type="primary" size="mini">编辑</el-button>
          <el-button type="danger" size="mini">删除</el-button>
          <el-button type="success" size="mini">查看</el-button>
        </el-table-column>
      </el-table>
    </div>
    <div class="upbut">
      <div class="block">
        <!-- :page-sizes="[100, 200, 300, 400]" -->
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage4"
          :page-size="10"
          layout="total, sizes, prev, pager, next, jumper"
          :total="200"
        ></el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: [],
      currentPage4: 4,
      value1: null,
      loading: true,
    };
  },
  components: {},
  created() {
    this.getallArticle();
  },
  methods: {
    //获取所有发布文章
    getallArticle() {
      this.$api
        .getallArticle()
        .then((res) => {
          if (res.code == 200) {
            this.loading = false;
            let d = res.data;
            this.tableData = d;
            if(d.length ===0){
               this.$message.error('哎? 空空如也!');
            }else{
              console.log(d);
            }

          }
        })
        .catch((err) => {
          this.loading = false;
          console.log(err);
        });
    },
    // ```
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },
  },
  mounted() {},
  watch: {},
  computed: {},
};
</script>

<style scoped lang='scss'>
@import "./updet";
</style>