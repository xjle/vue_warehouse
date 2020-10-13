<template>
  <div class="register">
    <el-form
      :model="registerForm"
      :rules="rules"
      ref="registerForm"
      label-width="100px"
      class="registerForm"
    >
      <el-form-item label="邮箱" prop="email">
        <el-input v-model="registerForm.email"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="registerForm.password" type="password"></el-input>
      </el-form-item>
      <el-form-item label="验证码" prop="code">
        <el-input v-model="registerForm.code" style="width: 170px"></el-input>
        <el-button
          v-if="!api"
          @click="getCode"
          :disabled="codeFlag"
          style="width: 130px"
        >
          {{ codeContent }}
        </el-button>
      </el-form-item>
      <el-form-item label="类型" prop="type">
        <el-radio-group v-model="registerForm.type" @change="btnChange">
          <el-radio label="user">用户</el-radio>
          <el-radio label="admin">管理员</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('registerForm')"
          >注册</el-button
        >
        <el-button @click="resetForm('registerForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { getCode, registerUser, registerAdmin } from "@/utils/api.js";
export default {
  name: "Register",
  data() {
    return {
      codeFlag: false,
      codeContent: "获取验证码",
      codeTime: 60,
      api: false,
      registerForm: {
        email: "",
        password: "",
        type: "user",
        code: "",
      },
      rules: {
        email: [
          { required: true, message: "请输入邮箱地址", trigger: "blur" },
          {
            type: "email",
            message: "请输入正确的邮箱地址",
            trigger: ["blur", "change"],
          },
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
        code: [{ required: true, message: "请输入验证码", trigger: "blur" }],
      },
    };
  },
  methods: {
    submitForm(formName) {
      //  提交表单
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.api) {
            this.getRegisterAdmin();
          } else {
            this.getRegisterUser();
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },

    resetForm(formName) {
      // 清空表单
      this.$refs[formName].resetFields();
    },
    getRegisterAdmin() {
      registerAdmin(this.registerForm).then((res) => {
        let ret = res["data"];
        if (ret["code"] == 200) {
          // this.$router.push({ name: "Home" });
          this.$message.success(ret["msg"]);
        } else {
          this.$message.error(ret["msg"]);
        }
      });
    },
    getRegisterUser() {
      registerUser(this.registerForm).then((res) => {
        let ret = res["data"];
        if (ret["code"] == 200) {
          this.$router.push({ name: "Home" });
        } else {
          this.$message.error(ret["msg"]);
        }
      });
    },
    getCode() {
      // 获取验证码
      if (this.registerForm["email"]) {
        let data = { email: this.registerForm["email"] };
        getCode(data).then((res) => {
          this.daoTime();
          let ret = res.data;
          if (ret["code"] == 200) {
            this.$message.success(ret["msg"]);
          } else {
            this.$message.error(ret["msg"]);
          }
        });
      } else {
        this.$message.error("请输入邮箱");
      }
    },
    btnChange(val) {
      // 判断用户类型
      if (val == "user") {
        this.api = false;
      } else if (val == "admin") {
        this.api = true;
      }
    },
    daoTime() {
      // 获取验证码间隔
      if (this.codeFlag) return;
      this.codeFlag = true;
      this.codeContent = `${this.codeTime}s后重新发送`;
      let clock = window.setInterval(() => {
        this.codeTime--;
        this.codeContent = `${this.codeTime}s后重新发送`;
        if (this.codeTime < 0) {
          window.clearInterval(clock);
          this.codeTime = 60;
          this.codeContent = "获取验证码";
          this.codeFlag = false;
        }
      }, 1000);
    },
  },
};
</script>
<style scoped>
.registerForm {
  width: 400px;
  margin: 0 auto;
}
</style>