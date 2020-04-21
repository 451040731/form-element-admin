import request from '@/utils/request'

// 添加表单
export function addForm(data) {
  return request({
    url: '/Admin/form/addForm',
    method: 'post',
    data
  })
}

// 表单列表
export function getFormList(data) {
  return request({
    url: '/Admin/form/getFormList',
    method: 'post',
    data
  })
}

// 删除表单
export function delForm(data) {
  return request({
    url: '/admin/form/delForm',
    method: 'post',
    data
  })
}

// 获取表单详情
export function getFormInfo(data) {
  return request({
    url: '/Admin/form/getFormInfo',
    method: 'post',
    data
  })
}

// 表单页面提交
export function save(data) {
  return request({
    url: '/Admin/form/save',
    method: 'post',
    data
  })
}

// 获取表单数据
export function getFormDataList(data) {
  return request({
    url: '/Admin/form/getFormDataList',
    method: 'post',
    data
  })
}
