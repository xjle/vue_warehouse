/* eslint-disable vue/no-unused-vars */
<template>
  <div class="management">
   <vue-table :table-label="tableLabel" :default-sort="defaoultSort" :table-data="tableData"  :table-option="tableOption" @handleButton="handleButton"/>
  </div>
</template>
<script>
import VueTable from '@/components/vueTable'
import { findUser, editUser } from '@/utils/api.js'
  export default {
    components:{
      VueTable
    },
    name:'Management',
    data() {
      return {
        tableLabel: [
          { prop: 'id', label: 'id', show: false },
          { prop: 'username', label: '姓名', sortable: true },
          { prop: 'n_name', label: '昵称', sortable: true },
          { prop: 'email', label: '邮箱', sortable: true },
          { prop: 'phone', label: '手机号', sortable: true },
          { prop: 'type', label: '角色', sortable: true },
          { prop: 'date', label: '注册时间', sortable: true },
      ],
      tableOption:{
        label: '操作',
        align: 'center',
        options: [
          {
            type: 'primary',
            label: '编辑',
            methods: 'edit',
          },
          {
            type: 'danger',
            label: '删除',
            methods: 'del',
          },
        ],
      },
      tableData: [],
      defaoultSort: 'date',
      }
    },
    mounted(){
      this.getFindUser()
    },
    methods: {
      getFindUser(){
        findUser().then(res=>{
          let ret = res['data']
          if (ret['code'] == 200) {
            ret['data'].forEach(item => {
              this.tableData.push({
                'id': item['id'],
                'username': item['username'] ? item['username']:'-',
                'email': item['email'] ? item['email']:'-',
                'phone': item['phone'] ? item['phone']:'-',
                'n_name': item['n_name'] ? item['n_name']:'-',
                'type': item['type']==300 ? '管理员':'普通用户',
                'date': item['time']
              })
            });
          }
        })
      },
      handleButton(data){
        if (data['methods']=="edit") {
          this.getEditUser()
        }else if(data['methods']=="del"){
          this.getDelUser()
        }
      },
      getEditUser(){
        let x = false
        if (x) {
          editUser()
        }
      },
      getDelUser(){
        let x = false
        if (x) {
          editUser()
        }
      }
    },
  }
</script>
<style scoped>

</style>