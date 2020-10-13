import http from '@/utils/http.js'
export function getLoginStatus() {
  return http({
    url: '/user/login_status/',
    method: 'GET'
  })
}
export function getTest() {
  return {
    url: '/api/test/',
    method: "GET",
  }
}
export function getCode(data) {
  /**
   * 获取邮箱注册验证码
   */
  return http({
    url: '/user/register_code/',
    method: "POST",
    data
  })
}
export function registerUser(data) {
  /**
   * 注册用户账号
   */
  return http({
    url: '/user/register/',
    method: "POST",
    data
  })
}
export function registerAdmin(data) {
  /**
   * 注册管理账号
   */
  return http({
    url: '/admin/register/',
    method: "POST",
    data
  })
}
export function login(data) {
  /**
   * 登录账号
   */
  return http({
    url: '/user/login/',
    method: "POST",
    data
  })
}
export function forget(data) {
  /**
   * 忘记密码
   */
  return http({
    url: '/user/forget/',
    method: "POST",
    data
  })
}
export function getForgetCode(data) {
  /**
   * 获取邮箱重置密码验证码
   */
  return http({
    url: '/user/get_code/',
    method: "POST",
    data
  })
}
export function setForgetCode(data) {
  /**
   * 验证验证码
   */
  return http({
    url: '/user/set_code/',
    method: "POST",
    data
  })
}
export function setForget(data) {
  /**
   * 重置密码
   */
  return http({
    url: '/user/set_forget/',
    method: "POST",
    data
  })
}
export function getLogout() {
  /**
   * 退出登录
   */
  return http({
    url: '/user/logout/',
    method: "GET",
  })
}
export function findUser() {
  /**
   * 查询用户
   */
  return http({
    url: '/admin/find_user/',
    method: "GET",
  })
}
export function editUser(data) {
  /**
   * 修改用户
   */
  console.log(typeof data['r']);
  return http({
    url: '/admin/update_user/',
    method: "POST",
    data
  })
}
export function delUser(data) {
  /**
   * 删除用户
   */
  return http({
    url: '/admin/del_user/',
    method: "POST",
    data
  })
}
