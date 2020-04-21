<template>
  <div class="app-container">
    <div class="fm-container">
      <fm-making-form ref="makingForm" upload preview generate-code generate-json clearable>
        <template slot="action">
          <!-- 自定义操作区域插槽 -->
          <el-button type="text" icon="el-icon-upload" @click="postFormList">保存</el-button>
        </template>
      </fm-making-form>
    </div>
  </div>
</template>

<script>

import {
  addForm
} from '@/api/form'

export default {
  name: 'FormMaking',
  data() {
    return {
      listLoading: true,
      jsonData: {}
    }
  },
  created() {

  },
  methods: {
    postFormList() {
      this.listLoading = true
      this.jsonData = this.$refs.makingForm.getJSON()
      if (this.jsonData.list.length > 0) {
        addForm(this.$qs.stringify({
          data: JSON.stringify(this.jsonData)
        })).then((res) => {
          this.listLoading = false
          this.$message({
            message: res.msg,
            type: 'success'
          })
        })
      } else {
        this.$message.error('表单不能为空！')
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .app-container,.fm-container{
    height: calc(100vh - 84px);
  }
</style>

<style>
  #app .app-container .el-aside{
      padding: 0 !important;
    }
</style>
