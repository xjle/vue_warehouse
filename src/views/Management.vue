/* eslint-disable vue/no-unused-vars */
<template>
  <div class="management">
    <vue-table
      :table-label="tableLabel"
      :default-sort="defaoultSort"
      :table-data="tableData"
      :table-option="tableOption"
      @handleButton="handleButton"
    />
    <el-dialog title="提示" :visible.sync="Visible" width="30%">
      <template v-if="flag">
        <el-form :model="editForm" label-width="100px" class="editForm">
          <el-form-item label="账户" prop="username">
            <el-input v-model="username" disabled></el-input>
          </el-form-item>
          <el-form-item label="类型" prop="r">
            <el-select v-model="value">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="getEditUser">提交</el-button>
            <el-button @click="closeVisible">取消</el-button>
          </el-form-item>
        </el-form>
      </template>
      <template v-else>
        <span>是否删除{{ username }}</span>
        <span slot="footer" class="dialog-footer">
          <el-button @click="closeVisible">取 消</el-button>
          <el-button type="danger" @click="getDelUser">确 定</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>
<script>
import VueTable from "@/components/vueTable";
import { findUser, editUser, delUser } from "@/utils/api.js";
export default {
  name: "Management",
  components: {
    VueTable,
  },
  inject: ["reload"],
  data() {
    return {
      editForm: {},
      tableLabel: [
        { prop: "id", label: "id", show: false },
        { prop: "username", label: "姓名", sortable: true },
        { prop: "n_name", label: "昵称", sortable: true },
        { prop: "email", label: "邮箱", sortable: true, width: "200px" },
        { prop: "phone", label: "手机号", sortable: true, width: "160px" },
        { prop: "type", label: "角色", sortable: true },
        { prop: "date", label: "注册时间", sortable: true, width: "200px" },
      ],
      tableOption: {
        label: "操作",
        align: "center",
        options: [
          {
            type: "primary",
            label: "编辑",
            methods: "edit",
          },
          {
            type: "danger",
            label: "删除",
            methods: "del",
          },
        ],
      },
      tableData: [],
      defaoultSort: "date",
      options: [
        {
          value: 0,
          label: "普通用户",
        },
        {
          value: 300,
          label: "管理员",
        },
      ],
      value: "",
      Visible: false,
      id: "",
      username: "",
      flag: true,
    };
  },
  mounted() {
    this.getFindUser();
  },
  methods: {
    getFindUser() {
      findUser().then((res) => {
        let ret = res["data"];
        if (ret["code"] == 200) {
          ret["data"].forEach((item) => {
            this.tableData.push({
              id: item["id"],
              username: item["username"] ? item["username"] : "-",
              email: item["email"] ? item["email"] : "-",
              phone: item["phone"] ? item["phone"] : "-",
              n_name: item["n_name"] ? item["n_name"] : "-",
              type: item["type"] == 300 ? "管理员" : "普通用户",
              date: item["time"],
            });
          });
        }
      });
    },
    handleButton(data) {
      this.id = data["row"]["id"];
      if (data["methods"] == "edit") {
        this.flag = true;
        this.Visible = true;
        this.username =
          data["row"]["username"] != "-"
            ? data["row"]["username"]
            : data["row"]["phone"] != "-"
            ? data["row"]["phone"]
            : data["row"]["email"];
        this.value = data["row"]["type"] == "管理员" ? 300 : 0;
      } else if (data["methods"] == "del") {
        // this.getDelUser(data["row"]["id"]);
        this.flag = false;
        this.Visible = true;
      }
    },
    getEditUser() {
      let data = { id: this.id, r: this.value };
      console.log(typeof this.value);
      editUser(data).then((res) => {
        let ret = res["data"];
        if (ret["code"] == 200) {
          this.reload();
          this.closeVisible();
          this.$message.success(ret["msg"]);
        }
      });
    },
    getDelUser(id) {
      let data = { id: id };
      delUser(data).then((res) => {
        let ret = res["data"];
        console.log(ret);
      });
    },
    closeVisible() {
      this.Visible = false;
    },
  },
};
</script>
<style scoped>
</style>