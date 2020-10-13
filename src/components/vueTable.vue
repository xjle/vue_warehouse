<template>
  <div>
    <div>
      <slot name="btn-list"></slot>
      <template >
        <!-- <el-button v-clipboard:copy="copyTableData" v-clipboard:success="sucCopy" v-clipboard:error="errCopy" style="float: right;margin-right:10px;"
          ><i class="el-icon-document-copy" /> 一键复制</el-button
        >  -->
        <el-input v-model="input" placeholder="请输入内容" prefix-icon="el-icon-search" class="table-input" />
      </template>
      <slot name="tag-tip"></slot>
    </div>
    <el-table
      ref="table"
      :default-sort="{
        prop: tableConfig.defaultSort,
        order: tableConfig.order,
      }"
      :data="tableConfig.tableData.slice((pager.currentPage - 1) * pager.pageSize, pager.currentPage * pager.pageSize)"
      stripe
      fit
      height="555px"
      highlight-current-row
      tooltip-effect="dark"
      style="width: 100%"
      row-key="id"
      :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
      @sort-change="handleSortChange"
      @selection-change="handleSelectionChange"
    >
      <el-table-column v-if="tableConfig.selection" type="selection" width="25px" />
      <template v-for="(item, index) in tableConfig.tableLabel">
        <el-table-column
          v-if="item.show != false"
          :key="index"
          :width="item.width ? item.width : ''"
          :min-width="item.minWidth ? item.minWidth : ''"
          :align="item.align ? item.align : 'left'"
          :label="item.label"
          :prop="item.prop"
          :sortable="item.sortable"
          :fixed="item.fixed ? item.fixed : false"
          :sort-method="sortMethod"
          :header-align="item.headerAlign ? item.headerAlign : ''"
          :show-overflow-tooltip="item.tooltip ? item.tooltip : false"
        >
          <template slot="header">
            <span v-html="item.label" />
          </template>
          <template slot-scope="scope">
            <template v-if="item.render">
              <span v-html="item.render(scope.row)" />
            </template>
            <template v-else>
              <span v-html="scope.row[item.prop]" />
            </template>
          </template>
        </el-table-column>
      </template>
      <el-table-column
        v-if="tableConfig.tableOption.label"
        :width="tableConfig.tableOption.width"
        :label="tableConfig.tableOption.label"
        :align="tableConfig.tableOption.align ? tableConfig.tableOption.align : 'left'"
        class-name="small-padding fixed-width"
      >
        <template slot-scope="scope">
          <el-button
            v-for="(item, index) in tableConfig.tableOption.options"
            :key="index"
            :type="item.type"
            :icon="item.icon"
            size="mini"
            @click="handleButton(item.methods, scope.row)"
          >
            {{ item.label }}
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      v-if="tableConfig.pagination"
      background
      :pager-count="pagerCount"
      :current-page="pager.currentPage"
      :page-sizes="pager.pageSizes"
      :page-size="pager.pageSize"
      :layout="layout"
      :total="pager.total"
      style="margin-top: 30px;"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
  </div>
</template>
<script>
import {getSortFun } from '@/utils/utils.js'
  export default {
    props:{
      pagination: {
        // 是否有分页
        type: Boolean,
        default: true,
      },
      tableData: {
        // 表格数据
        type: Array,
        default: () => {
          return []
        },
      },
      tableLabel: {
        // 表头数据
        type: Array,
        default: () => {
          return []
        },
      },
      tableOption: {
        // 表格设置
        type: Object,
        default: () => {
          return {}
        },
      },
      defaultSort: {
        // 默认排序（将需要默认排序的字段传过来）
        type: String,
        default: '',
      },
      order: {
        // 默认排序（将需要默认排序的字段传过来）
        type: String,
        default: 'descending',
      },
      selection: {
        type: Boolean,
        default: false,
      },
      pagerCount: {
        // 页码按钮的数量，当总页数超过该值时会折叠
        type: Number,
        default: 7,
      },
      layout: {
        // 分页组件显示
        type: String,
        default: 'total, sizes, prev, pager, next, jumper',
      },
      size: {
        // 每页条数
        type: Number,
        default: 10,
      },
      total: {
        // 总条数
        type: Number,
        default: 0,
      },
      currentPage: {
        // 默认显示的当前页数
        type: Number,
        default: 1,
      },
      pageSizes: {
        // 可供选择的每页条数
        type: Array,
        default: () => {
          return [10, 20, 30, 50, 100, 200, 300]
        },
      },
      tableCellStyle: {
        //行颜色
        type: String,
        default: '',
      },
      tableHeaderStyle: {
        //表头颜色
        type: String,
        default: '',
      },
    },
    computed:{
      tableConfig: function() {
        let config = {
          pagination: this.pagination,
          tableData: this.tableData,
          tableLabel: this.tableLabel,
          tableOption: this.tableOption,
          defaultSort: this.sort.prop,
          order: this.sort.order,
          headerAlign: this.headerAlign,
          selection: this.selection,
        }
        if (this.input) {
          config['tableData'] = []
          for (let item of this.tableData) {
            if (JSON.stringify(item).indexOf(this.input) >= 0) {
              config['tableData'].push(item)
            }
          }
        }
        if (this.sort.prop) {
          config['tableData'].sort(getSortFun(this.sort.order, this.sort.prop, this.multiFieldSort ? { order: 'desc', sortBy: this.multiFieldSort } : ''))
        }
        return config
      },
      pager: function() {
        return {
          layout: this.layout,
          total: this.dataTotal ? this.dataTotal : this.tableConfig['tableData'].length,
          currentPage: this.page,
          pageSize: this.pageSize,
          pageSizes: this.sizes,
        }
      },
    },
    watch: {
      input() {
        this.page = this.currentPage
      },
      size(val) {
        this.pageSize = val
      },
      currentPage(val) {
        this.page = val
      },
      total(val) {
        this.dataTotal = val
      },
      pageSizes: {
        handler(val) {
          this.sizes = val
        },
        deep: true,
      },
      tableData: {
        // 深度监听，可监听到对象、数组的变化
        handler() {
          this.page = this.currentPage
          this.$nextTick(() => {
            this.$refs.table.doLayout()
          })
        },
        deep: true,
      },
    },
    data() {
      return {
        scope:'scope',
        input: '',
        sizes: this.pageSizes,
        pageSize: this.size,
        page: this.currentPage,
        dataTotal: this.total,
        sort: {
          prop: this.defaultSort,
          order: this.order,
        },
      }
    },
    methods: {
      handleButton(methods, row) {
        // 按钮事件
        this.$emit('handleButton', {
          methods: methods,
          row: row,
        })
      },
      handleSortChange(val) {
        // 排序
        this.sort.prop = val.prop
        this.sort.order = val.order ? val.order : this.order
        this.page = 1
      },
      handleSelectionChange(val) {
        this.$emit('handleSelectionChange', val)
      },
      handleSizeChange(val) {
        this.$emit('handleSizeChange', val)
        this.pageSize = val
      },
      handleCurrentChange(val) {
        this.$emit('handleCurrentChange', val)
        this.page = val
      },
      sortMethod(a, b) {
        if (this.sort.prop) {
          const reg = /<[^>]+>/g
          let sort = this.sort.prop
          if (a[sort] === b[sort] && this.multiFieldSort) {
            sort = this.multiFieldSort
            if (parseFloat(a[sort]) !== 'NaN' && parseFloat(b[sort]) !== 'NaN' && (!isNaN(a[sort]) || a[sort].indexOf('%') >= 0)) {
              return parseFloat(b[sort]) - parseFloat(a[sort])
            } else if (reg.test(a[sort]) && reg.test(b[sort])) {
              let a_text = a[sort].trim()
              let b_text = b[sort].trim()
              if (!isNaN(parseFloat(a_text)) || !isNaN(parseFloat(b_text))) {
                return parseFloat(b_text) - parseFloat(a_text)
              } else {
                return b_text.localeCompare(a_text)
              }
            } else {
              return b[sort].localeCompare(a[sort])
            }
          } else {
            if (parseFloat(a[sort]) !== 'NaN' && parseFloat(b[sort]) !== 'NaN' && (!isNaN(a[sort]) || a[sort].indexOf('%') >= 0)) {
              return parseFloat(a[sort]) - parseFloat(b[sort])
            } else if (reg.test(a[sort]) && reg.test(b[sort])) {
              let a_text = a[sort].trim()
              let b_text = b[sort].trim()
              if (!isNaN(parseFloat(a_text)) || !isNaN(parseFloat(b_text))) {
                return parseFloat(a_text) - parseFloat(b_text)
              } else {
                return a_text.localeCompare(b_text)
              }
            } else {
              return a[sort].localeCompare(b[sort])
            }
          }
        }
      },
    },
  }
</script>
<style scoped>
.table-input {
  width: 270px !important;
  float: right;
  margin: 10px;
}
</style>