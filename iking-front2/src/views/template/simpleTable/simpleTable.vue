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
            width="60"/>
          <el-table-column
            type="index"
            width="60"/>
          <el-table-column
            property="name"
            label="姓名"
            sortable/>
          <el-table-column
            property="createTime"
            label="创建时间"
            sortable/>
          <el-table-column
            property="updateTime"
            label="更新时间"
            sortable/>

          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button
                type="primary"
                icon="el-icon-edit"
                @click="edit(scope.row)">编辑</el-button>
              <el-button
                type="danger"
                icon="el-icon-delete"
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
        <el-form-item label="名称" prop="name">
          <el-input v-model="form.name" />
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

export default {
  name: 'SimpleTable',
  data() {
    return {
      sortColumn: 'createTime', // 排序字段
      sortType: 'desc', // 排序方式
      modalType: 0, // 0:添加  1:编辑
      modalVisible: false, // 添加或编辑显示
      modalTitle: '', // 添加或编辑标题
      form: {
        // 添加或编辑表单对象初始化数据
        name: ''
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
      total: 0 // 表单数据总数
    }
  },
  created() {
    // 初始化默认加载表格数据
    this.getDataList()
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
    // 获取表格数据
    getDataList() {
      // const params = {
      //   pageNumber: this.pageNumber,
      //   pageSize: this.pageSize,
      //   sort: this.sortColumn,
      //   order: this.sortType
      // }
      // 请求后端获取表单数据 请自行修改接口
      // this.getRequest("请求路径", params).then(res => {
      //   if (res.success === true) {
      //     this.data = res.result.content;
      //     this.total = res.result.totalElements;
      //   }
      // });
      // 以下为模拟数据
      this.data = [
        {
          id: '1',
          name: 'X-BOOT',
          createTime: '2018-08-08 00:08:00',
          updateTime: '2018-08-08 00:08:00'
        },
        {
          id: '2',
          name: 'Exrick',
          createTime: '2018-08-07 00:08:00',
          updateTime: '2018-08-07 00:08:00'
        }
      ]
      this.total = this.data.length
    },
    // 弹框关闭
    handleClose() {
      this.$refs.form.resetFields()
      this.modalVisible = false
    },
    // 弹框提交
    handleSubmit() {
      this.$refs.form.validate(valid => {
        if (valid) {
          if (this.modalType === 0) {
            // 添加 避免编辑后传入id等数据 记得删除
            delete this.form.id
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
    }
  }
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
@import "./simpleTable.scss";
</style>
