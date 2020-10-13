<template>
  <div class="forget">
    <div class="logo"></div>
    <el-steps :active="active" finish-status="success" align-center>
      <el-step title="输入账号"></el-step>
      <el-step title="验证账号"></el-step>
      <el-step title="重置密码"></el-step>
      <el-step title="完成"></el-step>
    </el-steps>
    <div class="content">
      <div class="forgetForm">
        <el-input v-if="active!=4" v-model="username" placeholder="邮箱" :disabled="active!=0"></el-input>
        <div v-if="active==1" class="mt-15">
          <el-input v-model="code" style="width: 209px"></el-input>
          <el-button  @click="getCode" :disabled="codeFlag" style="width: 130px">
            {{ codeContent}}
          </el-button>
        </div>
        <div v-if="active==3" class="mt-15">
          <el-input v-model="password" style="width: 340px" placeholder="输入新密码"></el-input>
        </div>
      </div>
      <el-button v-if="active!=4" type="primary" @click="submitForm">下一步</el-button>
      <el-button v-if="active==4" type="primary" @click="submitForm">登录</el-button>
    </div>
  </div>
</template>
<script>
import { forget, getForgetCode, setForget, setForgetCode } from '@/utils/api.js'
export default {
  name: "Forget",
  data() {
    return {
      active:0,
      username: "",
      code:'',
      password: "",
      codeFlag: false,
      codeContent: "获取验证码",
      codeTime: 60,
      rules: {
        username: [
          { required: true, message: "请输入账户", trigger: "blur" },
        ]
      },
    };
  },
  methods: {
    getCode(){
      // 获取验证码
      let data = {'username': this.username}
      this.daoTime()
      getForgetCode(data).then(res=>{
        let ret = res['data']
        if (ret['code'] != 200) {
          this.$message.error(ret['msg'])
        }
      })
    },
    submitForm() {
      if (this.username) {
        if (this.active == 0) {
          this.getForget()
        }else if (this.active == 1) {
          this.setForgetCode()
        }else if(this.active == 3){
          this.saveForget()
        }else if(this.active == 4){
          this.$router.push({ name: "User", params: { type: 'login' }})
        }
      }else{
        this.$message.error('请输入账号')
      }
    },
    getForget(){
      // 判断是否注册
      let data = {'username': this.username}
        forget(data).then(res=>{
          let ret = res['data']
          if (ret['code'] == 200) {
            this.active = 1
          }else{
            this.$message.error(ret['msg'])
          }
        })
    },
    setForgetCode(){
      let data = {'username': this.username, 'code': this.code}
      setForgetCode(data).then(res=>{
        let ret = res['data']
        if (ret['code'] == 200) {
          this.active = 3
        }else{
          this.$message.error(ret['msg'])
        }
      })
    },
    saveForget(){
      if(this.password && this.password.length>=6&&this.password.length<=10){
        let data = {'username': this.username, 'password': this.password}
        setForget(data).then(res=>{
          let ret = res['data']
          if (ret['code'] == 200) {
            this.active = 4
            // this.$router.push({ name: "Home" })
          }else{
            this.$message.error(ret['msg'])
          }
        })
      }else{
        this.$message.error('密码长度在 6 到 10 个字符')
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
.forget{
  width: 1140px;
  margin: 0 auto;
}
.forget .logo{
  width: 1140px;
  height: 150px;
}
.forget .content{
  margin-top: 60px;
  width: 1140px;
  text-align: center;
}
.content .el-button{
  width: 340px;
}
.forgetForm {
  width: 340px;
  margin: 0 auto;
  padding: 15px 0;
}
.mt-15{
  margin-top: 15px;
}
</style>