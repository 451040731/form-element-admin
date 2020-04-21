<template>
  <div class="app-container">
    <fm-generate-form
      v-if="jsonData"
      ref="generateForm"
      :data="jsonData"
    />
    <el-button type="primary" @click="handleSubmit">提交</el-button>
    <el-button type="info" @click="resetSubmit">重置</el-button>
  </div>
</template>

<script>
import {
  getFormInfo,
  save
} from '@/api/form'

export default {
  data() {
    return {
      listLoading: true,
      jsonData: ''
    }
  },
  mounted() {
    this.getFormInfo()
  },
  methods: {
    // 获取数据
    getFormInfo() {
      this.listLoading = true
      getFormInfo(this.$qs.stringify({
        key: '5e6b3a347854be07b850d091'
      })).then((res) => {
        this.listLoading = false
        this.jsonData = JSON.parse(res.data.field)
      })
    },
    // 提交
    handleSubmit() {
      this.$refs.generateForm.getData().then(data => {
        this.$confirm('确认提交数据吗？', '提示', {}).then(() => {
          this.editLoading = true
          save(this.$qs.stringify({
            key: '5e6b3a347854be07b850d091',
            formData: JSON.stringify(data)
          })).then(res => {
            this.editLoading = false
            this.$notify({
              title: '提示',
              message: res.msg,
              type: 'success',
              duration: 2000
            })
          })
        })
      }).catch(e => {
        // data check failed
      })
    },
    // 重置
    resetSubmit() {
      this.$confirm('确认重置表单吗？', '提示', {}).then(() => {
        this.$refs.generateForm.reset()
      })
    }
  }
}
</script>
