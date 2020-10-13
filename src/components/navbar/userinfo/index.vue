<template>
  <div class="user">
    <div v-if="!status" class="user-info">
      <el-button type="primary" @click="btnUser('login')">登陆</el-button>
      /
      <el-button @click="btnUser('register')">注册</el-button>
    </div>
    <div v-else class="user-info">
      <el-popover width="150" trigger="click">
        <ul>
          <li v-for="(item, i) in prpoverList" :key="i" class="li-info">
            <!-- <a v-if="item.role<=r" href="#">
              <i class="iconfont" :class="item.icon"></i>
              {{ item.name }}
            </a> -->
            <template v-if="item.logout">
                <a :href="item.href" @click="logout">
                  <i :class="item.icon" class="iconfont"></i>
                  {{ item.name }}
                </a>
              </template>
            <template v-else>
                <a v-if="item.role<=r" :href="item.href" >
                  <i :class="item.icon" class="iconfont"></i>
                  {{ item.name }}
                </a>
              </template>
          </li>
        </ul>
        <a href="javascript:;" slot="reference">
          {{ username }}
          <i class="iconfont icon-down" style="font-size: 12px"></i>
        </a>
      </el-popover>
    </div>
  </div>
</template>
<script>
import { getLoginStatus, getLogout } from "@/utils/api.js";
export default {
  name: "UserInfo",
  data() {
    return {
      r: null,
      username: "",
      status: false,
      prpoverList: [
        { name: "个人设置", role: 0, href: "/setting", logout: false,icon: "icon-set" },
        { name: "后台管理", role: 300, href: "/management",logout: false, icon: "icon-management" },
        { name: "退出登陆", role: 0, href: "/", logout: true, icon: "icon-logout" },
      ],
    };
  },
  mounted() {
    this.getStatus()
  },
  methods: {
    btnUser(val) {
      this.$router.push({ name: "User", params: { type: val } });
    },
    getStatus() {
      getLoginStatus().then((res) => {
        let ret = res["data"];
        if (ret["code"] == 200) {
          this.r = ret["r"];
          this.status = ret["status"];
          // (/(\d{3})\d{4}(\d{4})/, '$1****$2')
          this.username = ret['username'].replace(/(.{2}).+(.{2}@.+)/ig, '$1****$2');
        }
      });
    },
    logout(){
      getLogout().then(res=>{
        let ret = res['data']
        if (ret['code'] == 200) {
          this.$router.go(0)
        }
      })
    }
  },
};
</script>
<style scoped>
.user-info {
  height: 100%;
  /* outline: 1px solid; */
  text-align: center;
  line-height: 56px;
}
.li-info{
  text-align: center;
  line-height: 34px;
}
.li-info:hover{
  background: #ccc;
}
</style>