<template>
  <div>
    <div class="warp">
      <div class="loginBox">
        <div class="formbox">
          <h2>欢迎来到追梦者管理系统</h2>
          <el-form
            :label-position="labelPosition"
            :model="ruleForm"
            class="el-form"
            ref="ruleForm"
            status-icon
            :rules="rules"
            async-validator="true"
          >
            <el-form-item
              label="请输入用户名"
              prop="user"
              inline="true"
              label-width="130px"
              :rules="rules.user"
            >
              <el-input type="text" v-model="ruleForm.user" autocomplete="off" style="width:400px"></el-input>
            </el-form-item>
            <el-form-item
              label="请输入密码"
              prop="pass"
              inline="true"
              label-width="130px"
              :rules="rules.pass"
            >
              <el-input
                type="password"
                v-model="ruleForm.pass"
                autocomplete="off"
                style="width:400px"
              ></el-input>
            </el-form-item>

            <div class="endbut">
              <el-button type="primary" @click="submitForm('ruleForm')" :loading="flag">立即注册</el-button>
              <el-button type="primary" @click="toLogin">立即登陆</el-button>
            </div>
          </el-form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    var checkuser = (rule, value, callback) => {
      if (value == "") {
        return callback(new Error("请输入用户名"));
      } else {
        callback();
      }
    };
    var checkpass = (rule, value, callback) => {
      if (value == "") {
        return callback(new Error("请输入用户名"));
      } else {
        callback();
      }
    };
    return {
      loading: false,
      flag: false,
      labelPosition: "center",
      ruleForm: {
        user: "",
        pass: "",
      },
      rules: {
        user: [
          {
            required: true,
            message: "请输入用户名",
            trigger: "blur",
            validator: checkuser,
          },
          {
            min: 6,
            max: 15,
            message: "长度在 6 到 15 个字符",
            trigger: "blur",
          },
        ],
        pass: [
          {
            required: true,
            message: "请输入密码",
            trigger: "blur",
            validator: checkpass,
          },
          {
            min: 6,
            max: 15,
            message: "长度在 6 到 15 个字符",
            trigger: "blur",
          },
        ],
      },
    };
  },
  components: {},
  methods: {
    submitForm(formName) {
      //提交注册
      this.flag = true;
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let username = this.ruleForm.user,
            password = this.ruleForm.pass;
          if (this.loading) {
            return false;
          }
          this.loading = true;
          this.$api
            .Register({
              username,
              password,
            })
            .then((res) => {
              if (res.code == 200) {
                this.$message({
                  message: res.message,
                  type: "success",
                });
                this.flag = false;
                this.loading = false;
              } else {
                this.$message.error({
                  message: res.message,
                });
                this.flag = false;
                this.loading = false;
              }
            })
            .catch((err) => {
              this.loading = false;
              console.log(err);
            });
        }
      });
    },
    toLogin() {
      //去登陆页
      if (this.loading) {
        return false;
      }
      this.loading = true;
      this.$router.push("/login");
      this.loading = false;
    },
  },
  mounted() {},
  watch: {},
  computed: {},
};
</script>

<style  lang='scss'>
@import "../login/login";
</style>