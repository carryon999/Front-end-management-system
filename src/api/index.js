import http from '@/utils/request'

// 请求首页数据的接口
export const getData = () => {
  // 返回一个promise对象
  return http.get('/home/getData')
}

export const getUser = (params) => {
  // 返回用户也表
  return http.get('/user/getUser', params)
}

export const adduser = (data) => {
  // 返回用户也表
  return http.post('/user/add', data)
}

export const edituser = (data) => {
  // 返回用户也表
  return http.post('/user/edit', data)
}

export const deluser = (data) => {
  // 返回用户也表
  return http.post('/user/del', data)
}

export const getMenu = (data) => {
  // 返回用户也表
  return http.post('/permission/getMenu', data)
}
