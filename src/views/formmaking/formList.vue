<template>
  <div class="app-container">
    <!--工具条-->
    <div class="filter-container">
      <el-input v-model="listQuery.key" placeholder="表单key" style="width: 300px;" class="filter-item" @keyup.enter.native="handleFilter" />
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
      <el-table-column label="id" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.id }}</span>
        </template>
      </el-table-column>
      <el-table-column label="key" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.key }}</span>
        </template>
      </el-table-column>
      <el-table-column label="标题" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.title }}</span>
        </template>
      </el-table-column>
      <el-table-column label="创建时间" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.create_time | parseTime() }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <span>
            <router-link :to="{path:'/formmaking/dataList', query:{key:scope.row.key} }">
              <el-button size="small" type="success">
                查看数据
              </el-button>
            </router-link>
            <el-button size="small" type="info" @click="handleDelete(scope.$index, scope.row)">
              删除
            </el-button>
          </span>
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getFormList" />
  </div>
</template>

<script>
import waves from '@/directive/waves'
import Pagination from '@/components/Pagination' // Secondary package based on el-pagination
import { parseTime } from '@/utils'

import {
  getFormList,
  delForm
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
    this.getFormList()
  },
  methods: {
    // 获取数据
    getFormList() {
      this.listLoading = true
      getFormList(this.$qs.stringify(this.listQuery)).then((res) => {
        this.listLoading = false
        this.list = res.data.list
        this.total = res.data.total
        this.lableList = res.data.title
      })
    },
    // 搜索
    handleFilter() {
      this.listQuery.page = 1
      this.getFormList()
    },
    // 删除
    handleDelete(index, row) {
      this.$confirm('确认删除吗？', '提示', {}).then(() => {
        this.editLoading = true
        const para = { key: row.key }
        delForm(this.$qs.stringify(para)).then(res => {
          this.editLoading = false
          this.$notify({
            title: '删除成功',
            message: res.msg,
            type: 'success',
            duration: 2000
          })
          this.getFormList()
        })
      })
    }
  }
}
</script>
