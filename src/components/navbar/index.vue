<template>
  <div class="nav-bar clearfix">
    <div class="logo">logo</div>
    <div class="content"></div>
    <div class="user">
      <user-info />
    </div>
  </div>
</template>
<script>
import UserInfo from "./userinfo/index";
export default {
  name: "NarBar",
  components: {
    UserInfo,
  },
  data() {
    return {
      activeIndex: "1",
    };
  },
  methods: {
    handleSelect() {
      console.log(1);
    },
  },
};
</script>
<style scoped>
.nav-bar {
  margin: 0;
  padding: 0;
  width: 100%;
}
.logo {
  height: 60px;
  width: 230px;
  /* outline: 1px solid; */
  float: left;
}
.content {
  height: 60px;
  float: left;
  width: 720px;
  outline: 1px solid;
}
.user {
  height: 60px;
  float: left;
  width: 190px;
  outline: 1px solid;
}
</style>