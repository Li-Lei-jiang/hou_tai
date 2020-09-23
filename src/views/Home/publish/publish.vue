<template>
  <div class="publishwarp">
    <div class="header">
      <div class="pubbut">
        <el-button type="danger" size="mini">查看</el-button>
        <el-button type="primary" size="mini" style="margin-left: 20px;">发布</el-button>
      </div>
    </div>
    <div class="k_from">
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="活动名称" prop="title">
          <el-input v-model="ruleForm.title" placeholder="请输入文章标题" maxlength="20"></el-input>
        </el-form-item>
        <el-form-item label="文章摘要" prop="abstract">
          <el-input v-model="ruleForm.abstract" placeholder="请输入文章摘要" maxlength="20"></el-input>
        </el-form-item>
        <div style="display: flex;">
          <el-form-item label="作者" prop="name">
            <el-input v-model="ruleForm.name" placeholder="作者" style="width:217px" maxlength="6"></el-input>
          </el-form-item>
          <el-form-item label="类目" prop="category">
            <el-select v-model="ruleForm.category" placeholder="请选择类目">
              <el-option label="Vue" value="Vue"></el-option>
              <el-option label="Node.js" value="Node.js"></el-option>
              <el-option label="性能优化" value="性能优化"></el-option>
              <el-option label="Javascript" value="Javascript"></el-option>
              <el-option label="小程序" value="小程序"></el-option>
              <el-option label="工具类" value="工具类"></el-option>
              <el-option label="其他" value="其他"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="来源" prop="source">
            <el-select v-model="ruleForm.source" placeholder="请选择来源">
              <el-option label="原创" value="原创"></el-option>
              <el-option label="转载" value="转载"></el-option>
              <el-option label="与他人合作" value="与他人合作"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="重要性" prop="importance">
            <el-select v-model="ruleForm.importance" placeholder="请选重要等级">
              <el-option label="1" value="1"></el-option>
              <el-option label="2" value="2"></el-option>
              <el-option label="3" value="3"></el-option>
              <el-option label="4" value="4"></el-option>
              <el-option label="5" value="5"></el-option>
            </el-select>
          </el-form-item>
          <div class="block">
            <span class="demonstration">发布时间</span>
            <el-date-picker v-model="ruleForm.releTime" type="datetime" placeholder="选择日期时间"></el-date-picker>
          </div>
        </div>
        <div id="main">
          <mavon-editor v-model="ruleForm.value" />
        </div>
        <div style="margin-top: 49px;text-align: center;">
          <el-button type="primary" @click="submitForm('ruleForm')">发布</el-button>
        </div>
      </el-form>
    </div>
  </div>
</template>


<script>
export default {
  data() {
    return {
      ruleForm: {
        title: "", //标题
        abstract: "", //摘要
        name: "", //作者
        category: "", //类目
        source: "", //来源
        importance: "", //中要等级
        releTime: "", //发布时间
        value: "", //马克飞象编辑器
      },
      rules: {
        title: [
          { required: true, message: "请输入文章标题", trigger: "blur" },
          {
            min: 2,
            max: 20,
            message: "长度在 2 到 20 个字符",
            trigger: "blur",
          },
        ],
        abstract: [
          { required: true, message: "请输入文章摘要", trigger: "blur" },
          {
            min: 4,
            max: 20,
            message: "长度在 4 到 20 个字符",
            trigger: "blur",
          },
        ],
        name: [
          { required: true, message: "请输入作者名", trigger: "blur" },
          {
            min: 2,
            max: 6,
            message: "长度在 2 到 6 个字符",
            trigger: "blur",
          },
        ],
        category: [
          { required: true, message: "请选择类目", trigger: "change" },
        ],
        source: [{ required: true, message: "请选择来源", trigger: "change" }],
        importance: [
          { required: true, message: "请选重要等级", trigger: "change" },
        ],
      },
    };
  },
  components: {},
  methods: {
    submitForm(ruleForm) {
      this.$refs[ruleForm].validate((valid) => {
        if (valid) {
          /***title: 文章标题
          abstract: 文章摘要
          author: 作者
          category: 类目
          source: 来源
          star: 重要性
          text: 文章内容
          date: 发布时间 */
          let obj = {};
          obj.title = this.ruleForm.title;
          obj.abstract = this.ruleForm.abstract;
          obj.author = this.ruleForm.name;
          obj.category = this.ruleForm.category;
          obj.source = this.ruleForm.source;
          obj.star = this.ruleForm.importance;
          obj.text = this.ruleForm.value;
          obj.date = this.ruleForm.releTime;
          this.$api
            .ReleaseallArticle(obj)
            .then((res) => {
              if (res.code == 200) {
                this.$message({
                  showClose: true,
                  message: res.data,
                  type: "success",
                });
              } else {
                this.$message({
                  showClose: true,
                  message: "发生了未知的情况，技术部正在排查···",
                  type: "error",
                });
              }
            })
            .catch((err) => {
              console.log(err);
            });
          console.log(this.ruleForm);
        } else {
          this.$message({
            showClose: true,
            message: "请检查表单是否输入正确",
            type: "error",
          });
          return false;
        }
      });
    },
  },
  mounted() {},
  watch: {},
  computed: {},
};
</script>

<style scoped lang='scss'>
@import "./publish";
</style>