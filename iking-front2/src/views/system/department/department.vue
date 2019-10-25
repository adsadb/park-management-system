<template>
  <div class="app-container">
    <!-- 功能按钮 -->
    <el-row>
      <el-button type="primary" @click="openDialog(null, 'add')">新增</el-button>
      <el-button type="danger" @click="openDialog(null, 'delete')">删除</el-button>
    </el-row>
    <!-- 表格内容 -->
    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
      @selection-change="handleSelectionChange">
      <el-table-column
        type="selection"
        width="55"/>
      <el-table-column align="center" label="角色名称" min-width="95">
        <template slot-scope="scope">
          {{ scope.row.roleName }}
        </template>
      </el-table-column>
      <el-table-column label="角色描述">
        <template slot-scope="scope">
          {{ scope.row.roleDescription }}
        </template>
      </el-table-column>
      <el-table-column label="是否默认" min-width="110" align="center">
        <template slot-scope="scope">
          <el-button v-if="scope.row.isDefault" size="mini" type="success" icon="el-icon-check" circle @click="openDialog(scope.row, 'changeDefault')"/>
          <el-button v-else size="mini" type="danger" icon="el-icon-close" circle @click="openDialog(scope.row, 'changeDefault')" />
        </template>
      </el-table-column>
      <el-table-column label="角色状态" min-width="110" align="center">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.state === 1">正常</el-tag>
          <el-tag v-else-if="scope.row.state === 0" type="danger">禁用</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作" min-width="110" align="center">
        <template slot-scope="scope">
          <el-button type="primary" @click="openDialog(scope.row, 'edit')">修改</el-button>
          <el-button :type="scope.row.state === 1 ? '' : 'success'" @click="openDialog(scope.row, 'changeState')">{{ scope.row.state === 1 ? "停用" : "启用" }}</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 弹框内容 -->
    <!-- 添加/修改角色 -->
    <el-dialog
      :visible.sync="editRoleVisible"
      :title="`${ dialogType === 'add' ? '添加' : '修改'}角色`">
      <el-form ref="roleForm" :model="roleForm" label-width="80px">
        <el-form-item label="角色名称">
          <el-input v-model="roleForm.roleName"/>
        </el-form-item>
        <el-form-item label="角色描述">
          <el-input v-model="roleForm.roleDescription" type="textarea"/>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editRoleVisible = false">取 消</el-button>
        <el-button type="primary" @click="commit">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>

import { roleService } from '@/api/service'
import { formCheck } from '@/utils/utils'

export default {
  data() {
    return {
      list: null,
      listLoading: true,
      singleSelect: {}, // 当前单个选中
      multipleSelection: {}, // 多选
      dialogType: 'add', // 弹出框类型
      editRoleVisible: false, // 编辑角色弹框
      roleForm: {
        id: '',
        roleName: '', // 角色名称
        roleDescription: '' // 角色描述
      }
    }
  },
  created() {
    this.getTableData()
  },
  methods: {
    async getTableData() {
      this.listLoading = true
      const response = await roleService.getAll()
      if (response.success) {
        this.list = response.resultData
        this.listLoading = false
      }
    },
    // 表格多选
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    // 打开更改默认弹框
    openDialog(row, type) {
      this.dialogType = type
      this.singleSelect = row || {}
      console.info(this.dialogType)
      if (this.dialogType === 'add') {
        this.roleForm = {
          id: '',
          roleName: '',
          roleDescription: ''
        }
        this.editRoleVisible = true
      } else if (this.dialogType === 'edit') {
        this.editRoleVisible = true
        this.roleForm = Object.assign({}, this.singleSelect)
      } else if (this.dialogType === 'changeDefault') {
        this.commit()
      } else if (this.dialogType === 'changeState') {
        this.commit()
      } else if (this.dialogType === 'delete') {
        if (!this.multipleSelection.length || this.multipleSelection.length === 0) {
          this.$message.error('请选中要操作的数据')
          return
        }
        this.$confirm('此操作将删除所选中的角色, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.deleteRole()
        })
      }
    },
    // 提交修改角色
    commit() {
      if (this.dialogType === 'add') {
        this.addRole()
      } else if (this.dialogType === 'edit') {
        this.editRole()
      } else if (this.dialogType === 'changeDefault') {
        this.changeDefault()
      } else if (this.dialogType === 'changeState') {
        this.changeState()
      }
    },
    // 提交更改状态
    async changeState() {
      const param = Object.assign({}, this.singleSelect)
      param.state = param.state === 1 ? 0 : 1
      const response = await roleService.updateRole(param)
      if (response.success) {
        this.$message({
          message: '角色修改成功',
          type: 'success'
        })
        this.getTableData()
      } else {
        this.$message.error(response.message)
      }
    },
    // 提交更改默认请求
    async changeDefault() {
      const param = Object.assign({}, this.singleSelect)
      param.isDefault = !param.isDefault
      console.info()
      const response = await roleService.updateRole(param)
      if (response.success) {
        this.$message({
          message: '角色修改成功',
          type: 'success'
        })
        this.getTableData()
      } else {
        this.$message.error(response.message)
      }
      this.changeDefaultVisible = false
    },
    // 修改角色
    async editRole() {
      const valid = formCheck(this, 'roleForm')
      if (!valid) {
        return
      }
      const response = await roleService.updateRole(this.roleForm)
      if (response.success) {
        this.$message({
          message: '角色修改成功',
          type: 'success'
        })
        this.getTableData()
        this.editRoleVisible = false
      } else {
        this.$message.error(response.message)
      }
    },
    // 添加角色
    async addRole() {
      const valid = formCheck(this, 'roleForm')
      if (!valid) {
        return
      }
      const response = await roleService.addRole(this.roleForm)
      if (response.success) {
        this.$message({
          message: '角色添加成功',
          type: 'success'
        })
        this.getTableData()
        this.editRoleVisible = false
      } else {
        this.$message.error(response.message)
      }
    },
    async deleteRole() {
      const ids = []
      for (const role of this.multipleSelection) {
        console.info(role)
        ids.push(role.id)
      }
      console.info(ids)
      const response = await roleService.deleteRole(ids)
      if (response.success) {
        this.$message({
          message: '角色删除成功',
          type: 'success'
        })
        this.getTableData()
        this.editRoleVisible = false
      } else {
        this.$message.error(response.message)
      }
    }
  }
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
@import "./department.scss";
</style>
