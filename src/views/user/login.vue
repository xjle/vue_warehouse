<template>
  <div class="login">
    <el-form
      :model="loginForm"
      :rules="rules"
      ref="loginForm"
      label-width="100px"
      class="loginForm"
    >
      <el-form-item label="账户" prop="username">
        <el-input
          v-model="loginForm.username"
          placeholder="手机号|邮箱"
        ></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input
          v-model="loginForm.password"
          type="password"
          placeholder="密码"
        ></el-input>
      </el-form-item>
      <el-form-item label="类型" prop="type">
        <el-radio-group v-model="loginForm.type">
          <el-radio label="user">用户</el-radio>
          <el-radio label="admin">管理员</el-radio>
        </el-radio-group>
      </el-form-item>
      <template>
        <div class="am-checkbox">
          <!-- <router-link to="/forget">忘记密码？</router-link> -->
          <a href="/forget/" class="fs16">忘记密码？</a>
        </div>
      </template>
      <el-form-item>
        <el-button type="primary" @click="submitForm('loginForm')"
          >登陆</el-button
        >
        <el-button @click="resetForm('loginForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { login } from "@/utils/api.js";
export default {
  name: "Login",
  data() {
    return {
      loginForm: {
        username: "",
        password: "",
        type: "user",
      },
      rules: {
        username: [
          { required: true, message: "请输入账户", trigger: "blur" },
          // {
          //   type: "email",
          //   message: "请输入正确的邮箱地址",
          //   trigger: ["blur", "change"],
          // },
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          {
            min: 6,
            max: 10,
            message: "长度在 6 到 10 个字符",
            trigger: "blur",
          },
        ],
      },
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.getLogin();
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    getLogin() {
      login(this.loginForm).then((res) => {
        let ret = res["data"];
        if (ret["code"] == 200) {
          // this.$message.success(ret["msg"]);
          this.$router.push({ name: "Home" });
        } else {
          this.$message.error(ret["msg"]);
        }
      });
    },
    resetForm(formName) {
      // 清除表单
      this.$refs[formName].resetFields();
    },
  },
};
</script>
<style scoped>
.loginForm {
  width: 400px;
  margin: 0 auto;
}
.am-checkbox {
  text-align: right;
  padding-bottom: 20px;
  padding-right: 24px;
}
.am-checkbox a {
  color: #0e90d2;
}
</style>