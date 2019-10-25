import request from '@/utils/request'

/**
 * 用户
 */
export const userService = {
  // 登录
  login: param => request.postForm('/user/login', param),
  // 用户信息
  getInfo: param => request.get('/sysUser/info', param),
  // 退出登录
  logout: param => request.post('/logout', param),
  // 获取用户列表
  getAllUserList: param => request.post('/sysUser/getByPramas', param),
  // 修改用户手机号
  updateUserTEL: param => request.postForm('/system/updateTel', param),
  //修改用户密码
  updateUserPs: param => request.postForm('/system/updatePas', param),
  // 添加用户
  addUser: param => request.postForm('/user/register', param)
}

/**
 * 角色
 */
export const roleService = {
  // 查询全部角色
  getAll: param => request.get('/sysRole/getAll', param),
  // 添加角色
  addRole: param => request.postForm('/sysRole/save', param),
  // 修改角色
  updateRole: param => request.putForm('/sysRole/update', param),
  // 删除角色
  deleteRole: param => request.delete(`/sysRole/delByIds/${param}`)
}

/**
 * 部门
 */
export const departmentService = {
  // 查询所有部门树
  findAllTree: param => request.get('/sysDepartment/findAllTree', param)
}

/**
 * 设备
 */
export const deviceService = {
  //查询所有设备
  findAllDevice: param => request.get('/equipment/list'),
  //添加设备
  addDevice: param => request.postForm('/equipment/create', param),
  //修改设备
  updateDevice: param => request.postForm('/equipment/update',param),
  //删除设备
  deleteDevice: param => request.get(`/equipment/delequ/${param}`),
  //查询相应摄像机通道号
  selectChannel: param => request.postForm('/equipment/selectEwayByEclass', param),

}
  

/**
 * 员工
 */
export const personService = {
  //查询所有员工
  findAllPerson: param => request.get('/view/listperson'),
  //添加员工
  addPerson: param => request.postForm('/view/add',param),
  //修改员工
  updatePerson: param => request.postForm('/view/update',param),
  //删除员工
  deletePerson: param => request.get(`/view/delper/${param}`)
}

/**
 * 考勤记录
 */
export const checkService = {
  //查询所有记录
  findAllCheck: param => request.get('/check/selectAllPersonNote'),//GET POST有问题
  //添加请假备注
  addLeaveInfo: param => request.postForm('/check/addLeaveInfo',param),
  //设置上下班时间和周期
  addCheckSet: param => request.postForm('/check/checkSet',param),
  //将参与考勤的人员加入list中
  selectPerson: param => request.postForm('/check/selectperson',param)
}
/**
 *  区域入侵
 */
export const regionService = {
  //设置入侵区域
  setRegion: param => request.postForm('/region/postRegion',param)
}
