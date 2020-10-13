<template>
  <div class="user">
    <!-- @tab-click="handleClick" -->
    <el-tabs v-model="activeName" type="card" :stretch="true">
      <el-tab-pane label="登陆" name="login">
        <login />
      </el-tab-pane>
      <el-tab-pane label="注册" name="register">
        <register />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import Login from "@/views/user/login";
import Register from "@/views/user/register";
export default {
  name: "User",
  components: {
    Login,
    Register,
  },
  data() {
    return {
      activeName: "login",
    };
  },
  mounted() {
    this.getParams();
  },
  methods: {
    handleClick() {
      console.log(1);
    },
    getParams() {
      // 路由携带的参数
      const routerParams = this.$route.params.type;
      if (routerParams) {
        this.activeName = routerParams;
      }
    },
  },
};
</script>
<style scoped>
.user {
  margin: 0 auto;
  width: 600px;
  height: 600px;
  outline: 1px solid;
  padding-top: 60px;
}
</style>