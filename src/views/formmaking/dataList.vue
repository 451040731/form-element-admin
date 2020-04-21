<template>
  <div class="app-container">
    <!--工具条-->
    <div class="filter-container">
      <el-input v-model="listQuery.key" placeholder="用户id查询" style="width: 300px;" class="filter-item" @keyup.enter.native="handleFilter" />
      <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">
        搜索
      </el-button>
    </div>

    <!--列表-->
    <el-table
      :key="tableKey"
      v-loading="listLoading"
      :data="list"
      border
      fit
      highlight-current-row
      style="width: 100%;"
    >
      <el-table-column v-for="(item,index) in lableList" :key="index" :label="item.name" :property="item.model">
        <template slot-scope="scope">
          <span>{{ scope.row.data[scope.column.property] }}</span>
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getFormDataList" />
  </div>
</template>

<script>
import waves from '@/directive/waves'
import Pagination from '@/components/Pagination' // Secondary package based on el-pagination
import { parseTime } from '@/utils'

import {
  getFormDataList
} from '@/api/form'

export default {
  components: { Pagination },
  directives: { waves },
  data() {
    return {
      tableKey: 0,
      lableList: [],
      typeList: [],
      list: [],
      total: 0,
      listLoading: true,
      listQuery: {
        key: '',
        page: 1,
        limit: 10
      }
    }
  },
  created() {
    const key = this.$route.query && this.$route.query.key
    this.listQuery.key = key
    this.getFormDataList()
  },
  methods: {
    // 获取数据
    getFormDataList() {
      this.listLoading = true
      getFormDataList(this.$qs.stringify(this.listQuery)).then((res) => {
        this.listLoading = false
        this.list = res.data.list
        this.total = res.data.total
        this.lableList = res.data.title
      })
    },
    // 搜索
    handleFilter() {
      this.listQuery.page = 1
      this.getFormDataList()
    }
  }
}
</script>
