<template>
  <div class="home">
    <el-container>
      <el-header>
        <nav-bar />
      </el-header>
      <el-main>
        <router-view v-if="isRouterAlive" />
      </el-main>
      <el-footer>Footer</el-footer>
    </el-container>
  </div>
</template>

<script>
import NavBar from "@/components/navbar/index";
export default {
  name: "Home",
  mounted() {},
  components: {
    NavBar,
  },
  provide() {
    return {
      reload: this.reload,
    };
  },
  data() {
    return {
      isRouterAlive: true,
    };
  },
  methods: {
    reload() {
      //  刷新页面
      this.isRouterAlive = false;
      this.$nextTick(function () {
        this.isRouterAlive = true;
      });
    },
  },
};
</script>
<style scoped>
.home {
  width: 1140px;
  margin: 0 auto;
}
.el-header {
  height: 79px;
  width: 100%;
  padding: 0;
  background: pink;
}
.el-main {
  width: 100%;
  min-height: 600px;
  outline: 1px solid;
  margin: 0;
  padding: 0;
}
</style>
