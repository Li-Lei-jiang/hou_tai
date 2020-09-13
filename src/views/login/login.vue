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
            <el-form-item
              label="请输入验证码"
              prop="code"
              inline="true"
              label-width="130px"
              :rules="rules.code"
            >
              <el-input type="text" v-model="ruleForm.code" autocomplete="off" style="width:150px"></el-input>
              <div v-html="codes" @click="getCode" class="codes"></div>
            </el-form-item>

            <div class="endbut">
              <el-button type="primary" @click="submitForm('ruleForm')">立即登陆</el-button>
              <el-button type="primary" @click="toRegister">立即注册</el-button>
            </div>
          </el-form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapState} from 'vuex'
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
    var checkcode = (rule, value, callback) => {
      if (value == "") {
        return callback(new Error("请输入用户名"));
      } else {
        callback();
      }
    };
    return {
      codes: "", //svn 图片
      flag: false,
      ruleForm: {
        user: "",
        pass: "",
        code: "", //code
      },
      labelPosition: "center",
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
        code: [
          {
            required: true,
            message: "请输入验证码",
            trigger: "blur",
            validator: checkcode,
          },
          { min: 4, max: 4, message: "长度在4字符", trigger: "blur" },
        ],
      },
    };
  },
  components: {

  },
  created() {
    this.getCode();
  },
  methods: {
    getCode() {
      this.$api
        .getCode()
        .then((res) => {
          if (res.length > 0) {
            this.codes = res;
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    toRegister() {
      this.$router.push("/register");
       console.log(this.$store.state.userData)
    },
    submitForm(formName) {
      //登陆
      let t = this;
      if (t.flag) {
        return false;
      }

      t.flag = true;
      t.$refs[formName].validate((valid) => {
        if (valid) {
          let obj = {};
          obj.username = t.ruleForm.user;
          obj.password = t.ruleForm.pass;
          obj.code = t.ruleForm.code;
          t.$api
            .login(obj)
            .then((res) => {
              if (res.code == 200) {
                t.$message({
                  message: res.message,
                  type: "success",
                });
                this.$store.commit('getUserData',{
                  userData:res.data[0]
                })
                setTimeout(()=>{
                   t.$router.push('/');
                },1000)

                t.flag = false;
              } else {
                t.$message.error({
                  message: res.message,
                });
                 t.flag = false;
                return false;
              }
            })
            .catch((err) => {
               t.flag = false;
              console.log(err);
            });
        }
      });
    },
  },
  mounted() {},
  watch: {},
  computed: {
     ...mapState(['userData'])
  },
};
</script>

<style  lang='scss'>
@import "./login";
</style>