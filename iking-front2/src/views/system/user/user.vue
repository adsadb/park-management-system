<template>
  <div class="app-container">
    <el-card>
      <!-- 操作区 -->
      <el-row class="operation">
        <el-button type="primary" icon="md-add" @click="add">添加</el-button>
        <el-button icon="md-trash" @click="delAll">批量删除</el-button>
        <el-button icon="md-refresh" @click="getDataList">刷新</el-button>
      </el-row>
      <!-- 统计提示区 -->
      <el-row class="alert">
        <el-alert :title="`已选择${selectCount}项`" description="这里还可以做一些数据统计显示" show-icon/>
      </el-row>
      <!-- 表格内容 -->
      <el-row>
        <el-table ref="table" :data="data" border @sort-change="changeSort" @selection-change="changeSelect">
          <el-table-column
            type="selection"
            width="40"/>
          <el-table-column
            property="nickName"
            label="昵称"
            sortable/>
          <el-table-column
            property="userAccount"
            label="账号"
            sortable/>
          <el-table-column
            property="personName"
            label="真实姓名"
            sortable/>
          <el-table-column
            property="userMobile"
            label="手机号"
            sortable/>
          <el-table-column
            property="departmentNames"
            label="所属部门"
            sortable/>
          <el-table-column
            property="roleNames"
            label="拥有角色"
            sortable/>
          <el-table-column
            property="headPhoto"
            label="头像"
            width="70">
            <template slot-scope="scope">
              <img :src="scope.row.headPhoto">
            </template>
          </el-table-column>
          <el-table-column
            property="state"
            label="状态"
            width="70"
            sortable>
            <template slot-scope="scope">
              <el-tag :type="scope.row.state === 1 ? '' : 'danger'" size="medium">{{ scope.row.state === 1 ? '正常' : '禁用' }}</el-tag>
            </template>
          </el-table-column>
          <el-table-column
            property="createBy"
            label="创建人"
            sortable/>
          <el-table-column
            property="createTime"
            label="创建时间"
            width="135"
            sortable/>
          <el-table-column
            label="操作"
            width="220">
            <template slot-scope="scope">
              <el-button
                type="primary"
                @click="edit(scope.row)">编辑</el-button>
              <el-button
                @click="changeState(scope.row)">禁用</el-button>
              <el-button
                type="danger"
                @click="remove(scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-row>
      <!-- 分页区域 -->
      <el-row type="flex" justify="end" class="page">
        <el-pagination
          :current-page="pageNumber"
          :total="total"
          :page-size="pageSize"
          @current-change="changePage"
          @size-change="changePageSize"/>
      </el-row>
    </el-card>
    <!-- 弹框内容 -->
    <el-dialog :title="modalTitle" :visible.sync="modalVisible" :before-close="handleClose" width="500px">
      <!-- 表单 -->
      <el-form ref="form" :model="form" :rules="formValidate" label-width="80px">
        <el-row>
          <el-col :span="14">
            <el-form-item label="昵称" >
              <el-input v-model="form.nickName" placeholder="请输入昵称" />
            </el-form-item>
            <el-form-item label="账号" >
              <el-input v-model="form.userAccount" placeholder="请输入账号" />
            </el-form-item>
            <el-form-item label="性别" >
              <el-radio-group v-model="form.userSex">
                <el-radio :label="1">男</el-radio>
                <el-radio :label="0">女</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="手机号" >
              <el-input v-model="form.userMobile" placeholder="请输入手机号" />
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label-width="30px" >
              <el-upload
                ref="uploadImage"
                :headers="headers"
                :show-file-list="false"
                :action="uploadaction"
                :data="operation"
                :on-success="handleSuccess"
                :before-upload="handleBeforeUpload"
                class="avatar-uploader">
                <img v-if="form.imageUrl" :src="form.imageUrl" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"/>
              </el-upload>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="部门" >
          <department-tree-choose ref="depTree" width="285px" @on-change="handleSelectDepTree"/>
        </el-form-item>
        <el-form-item label="角色" >
          <el-select v-model="form.roleIdList" multiple placeholder="请选择角色" style="width:100%">
            <el-option
              v-for="item in roleList"
              :key="item.id"
              :label="item.roleName"
              :value="item.id"/>
          </el-select>
        </el-form-item>
        <el-form-item label="真实姓名" >
          <el-input v-model="form.personName" placeholder="请输入真实姓名" />
        </el-form-item>
        <el-form-item label="身份证号" >
          <el-input v-model="form.cardId" placeholder="请输入身份证号" />
        </el-form-item>
        <el-form-item label="家庭住址" >
          <el-input v-model="form.userAddress" placeholder="请输入家庭住址" />
        </el-form-item>
        <el-form-item label="邮箱" >
          <el-input v-model="form.userEmail" placeholder="请输入邮箱" />
        </el-form-item>
        <el-form-item label="描述" >
          <el-input v-model="form.userDescription" placeholder="请输入描述" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="handleClose">取消</el-button>
        <el-button type="primary" @click="handleSubmit">提交</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>

import { userService, roleService } from '@/api/service'
import departmentTreeChoose from '@/components/departmentTreeChoose/departmentTreeChoose'

export default {
  name: 'SimpleTable',
  components: {
    departmentTreeChoose
  },
  data() {
    return {
      sortColumn: 'create_time', // 排序字段
      sortType: 'desc', // 排序方式
      modalType: 0, // 0:添加  1:编辑
      modalVisible: false, // 添加或编辑显示
      modalTitle: '', // 添加或编辑标题
      form: {
        // 添加或编辑表单对象初始化数据
        nickName: '',
        personName: '',
        userSex: 1,
        userMobile: '',
        cardId: '',
        userAccount: '',
        userAddress: '',
        userEmail: '',
        userDescription: '',
        imageUrl: '',
        departmentIds: ''
      },
      // 表单验证规则
      formValidate: {
        name: [{ required: true, message: '不能为空', trigger: 'blur' }]
      },
      selectList: [], // 多选数据
      selectCount: 0, // 多选计数
      data: [], // 表单数据
      pageNumber: 1, // 当前页数
      pageSize: 10, // 页面大小
      total: 0, // 表单数据总数
      uploadaction: '',
      roleList: [], // 角色列表
      operation: {
        op: 'upload',
        insertOnly: 0,
        fileContent: ''
      },
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Authorization': this.QCloud.GetSign()
      }
    }
  },
  created() {
    // 初始化默认加载表格数据
    this.getDataList()
    // 获取角色列表
    this.getRoleList()
  },
  methods: {
    // 翻页
    changePage(v) {
      this.pageNumber = v
      this.getDataList()
    },
    // 改变每页数量
    changePageSize(v) {
      this.pageSize = v
      this.getDataList()
    },
    // 改变排序
    changeSort(e) {
      this.sortColumn = e.key
      this.sortType = e.order
      if (e.order === 'normal') {
        this.sortType = ''
      }
      this.getDataList()
    },
    // 获取角色列表
    async getRoleList() {
      const res = await roleService.getAll()
      console.info(res)
      if (res.success === true) {
        this.roleList = res.resultData ? res.resultData : []
      }
    },
    // 获取表格数据
    async getDataList() {
      const params = {
        pageNumber: this.pageNumber,
        pageSize: this.pageSize,
        sort: this.sortColumn,
        order: this.sortType
      }
      // 请求后端获取表单数据 请自行修改接口
      const res = await userService.getAllUserList(params)
      if (res.success === true) {
        this.data = res.resultData ? res.resultData : []
        this.total = res.total ? res.total : 0
      }
    },
    // 弹框关闭
    handleClose() {
      this.form = {
        // 添加或编辑表单对象初始化数据
        nickName: '',
        personName: '',
        userSex: 1,
        userMobile: '',
        cardId: '',
        userAccount: '',
        userAddress: '',
        userEmail: '',
        userDescription: '',
        imageUrl: ''
      }
      this.modalVisible = false
    },
    // 弹框提交
    async handleSubmit() {
      await this.$refs.form.validate(async valid => {
        if (valid) {
          if (this.modalType === 0) {
            console.info(this.form)
            // 添加 避免编辑后传入id等数据 记得删除
            delete this.form.id
            const res = await userService.addUser(this.form)
            if (res.success === true) {
              this.$message.success('操作成功')
              this.getDataList()
              this.modalVisible = false
            } else {
              this.$message({
                showClose: true,
                message: res.message,
                type: 'error'
              })
            }
          } else {
            // 编辑
            // this.postRequest("请求地址", this.form).then(res => {
            //   if (res.success === true) {
            //     this.$message.success("操作成功");
            //     this.getDataList();
            //     this.modalVisible = false;
            //   }
            // });
            // 模拟请求成功
            this.$message({
              message: '操作成功',
              type: 'success'
            })
            this.getDataList()
            this.modalVisible = false
          }
        }
      })
    },
    // 添加按钮
    add() {
      this.modalType = 0
      this.modalVisible = true
      this.modalTitle = '添加'
      delete this.form.id
    },
    // 编辑按钮
    edit(v) {
      this.modalType = 1
      this.modalTitle = '编辑'
      // 转换null为""
      for (const attr in v) {
        if (v[attr] === null) {
          v[attr] = ''
        }
      }
      this.modalVisible = true
      const str = JSON.stringify(v)
      const data = JSON.parse(str)
      this.$nextTick(() => {
        this.form = data
        this.$refs.depTree.setDefault(this.form.departmentIds)
        this.form.roleIdList = this.form.roleIds.split(',')
      })
    },
    // 删除按钮
    remove(v) {
      this.$confirm('您确认要删除 ' + v.name + ' ?', '确认删除', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // 删除
        // this.deleteRequest("请求地址，如/deleteByIds/" + v.id).then(res => {
        //   if (res.success === true) {
        //     this.$message.success("操作成功");
        //     this.getDataList();
        //   }
        // });
        // 模拟请求成功
        this.$message({
          message: '操作成功',
          type: 'success'
        })
        this.getDataList()
      })
    },
    // 禁用、启用
    changeState(v) {
      this.$confirm(`您确认要${v.state === 1 ? '禁用' : '启用'}${v.userAccount}?`, `${v.state === 1 ? '禁用' : '启用'}账号`, {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async() => {
        // 删除
        const param = {
          id: v.id,
          state: v.state === 1 ? 0 : 1
        }
        const res = await userService.updateUser(param)
        if (res.success) {
          this.$message({
            message: '操作成功',
            type: 'success'
          })
          this.getDataList()
        }
      })
    },
    // 改变当前选择
    changeSelect(e) {
      this.selectList = e
      this.selectCount = e.length
    },
    // 批量删除
    delAll() {
      if (this.selectCount <= 0) {
        this.$message.warning('您还未选择要删除的数据')
        return
      }
      this.$Modal.confirm({
        title: '确认删除',
        content: '您确认要删除所选的 ' + this.selectCount + ' 条数据?',
        onOk: () => {
          // let ids = ''
          // this.selectList.forEach(function(e) {
          //   ids += e.id + ','
          // })
          // ids = ids.substring(0, ids.length - 1)
          // 批量删除
          // this.deleteRequest("请求地址，如/deleteByIds/" + ids).then(res => {
          //   if (res.success === true) {
          //     this.$message.success("操作成功");
          //     this.getDataList();
          //   }
          // });
          // 模拟请求成功
          this.$message({
            message: '操作成功',
            type: 'success'
          })
          this.getDataList()
        }
      })
    },
    handleBeforeUpload(file) {
      return new Promise((resolve, reject) => {
        const dateName = this.fmt.dateFormat(new Date()).split(' ')[0].split('-')
        const filePath = `/${this.baseInfo.name}/${dateName[0]}/${dateName[1]}/${dateName[2]}/`
        const imgUrl = file.name
        this.operation.fileContent = file
        const fileName = this.QCloud.Guid() + imgUrl.substring(imgUrl.lastIndexOf('.'), imgUrl.length)
        this.uploadaction = global.pictureURL + filePath + fileName
        this.$refs.uploadImage.$nextTick(_ => {
          resolve(file)
        })
      })
    },

    handleSuccess(res, file) {
      // 因为上传过程为实例，这里模拟添加 url
      file.url = res.data.source_url
      file.name = res.data.vid
      this.form.imageUrl = res.data.access_url
    },
    // 部门树选择
    handleSelectDepTree(ids) {
      this.form.departmentIdList = ids
    }
  }
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
@import "./user.scss";
</style>
