import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// import http from '@/utils/http.js'
import '@/assets/css/style.css'
import '@/assets/css/iconfont/iconfont.css'
import {
  Button, Container, Header, Main, Footer, Menu, MenuItem,
  Submenu, Popover, Table, TableColumn, Form, FormItem,
  Input, Radio, RadioGroup, Tabs, TabPane, Message, Steps,
  Step, Pagination
} from 'element-ui'

import 'element-ui/lib/theme-chalk/index.css'

Vue.config.productionTip = false
// Vue.prototype.$http = http
Vue.use(Button)
Vue.use(Container)
Vue.use(Header)
Vue.use(Footer)
Vue.use(Main)
Vue.use(Menu)
Vue.use(MenuItem)
Vue.use(Submenu)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Popover)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)
Vue.use(Radio)
Vue.use(RadioGroup)
Vue.use(Tabs)
Vue.use(TabPane)
Vue.use(Steps)
Vue.use(Step)
Vue.use(Pagination)
Vue.prototype.$message = Message
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
