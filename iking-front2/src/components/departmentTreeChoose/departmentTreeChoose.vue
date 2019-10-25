<template>
  <div>
    <el-popover trigger="click" placement="right" width="250" title="选择部门" >
      <div slot="reference" style="display:flex;">
        <el-input
          v-model="departmentTitle"
          :style="{width: width}"
          :placeholder="placeholder"
          readonly
          style="margin-right:10px;"
        />
        <el-button icon="md-trash" @click="clearSelect">清空已选</el-button>
      </div>
      <div class="tree-bar">
        <el-input
          v-model="searchKey"
          placeholder="输入部门名搜索"
          clearable
        />
        <el-tree
          ref="deptTree"
          :data="dataDep"
          :props="defaultProps"
          :filter-node-method="filterNode"
          :default-checked-keys="departmentId"
          node-key="id"
          class="filter-tree"
          show-checkbox
          check-strictly
          @check-change="selectTree"
        />
      </div>
    </el-popover>
  </div>
</template>

<script>
import { departmentService } from '@/api/service'
export default {
  name: 'DepartmentTreeChoose',
  props: {
    multiple: {
      type: Boolean,
      default: false
    },
    width: {
      type: String,
      default: '200px'
    },
    placeholder: {
      type: String,
      default: '点击选择部门'
    }
  },
  data() {
    return {
      departmentTitle: '',
      searchKey: '',
      dataDep: [], // 数据基础集
      selectDep: [], // 当前选中对象集合
      department: [],
      departmentId: [], // 当前选中对象ID集合
      defaultProps: {
        children: 'children',
        label: 'departmentName'
      }
    }
  },
  watch: {
    searchKey(val) {
      this.$refs.deptTree.filter(val)
    }
  },
  created() {
    this.initDepartmentData()
  },
  methods: {
    async initDepartmentData() {
      console.info('initDepartmentData')
      const res = await departmentService.findAllTree()
      if (res.success) {
        this.dataDep = res.resultData
      }
    },
    // 设置默认值
    setDefault(vals) {
      this.departmentId = vals.split(',')
    },
    // 选择
    selectTree(v, checked, indeterminate) {
      if (checked) {
        this.selectDep.push(v)
      } else {
        for (let i = 0; i < this.selectDep.length; i++) {
          if (this.selectDep[i].id === v.id) {
            this.selectDep.splice(i, 1)
          }
        }
      }
      const ids = []
      let title = ''
      this.selectDep.forEach(e => {
        ids.push(e.id)
        if (title === '') {
          title = e.departmentName
        } else {
          title = `${title}、${e.departmentName}`
        }
      })
      this.departmentId = ids
      console.info('===', this.departmentId)
      this.departmentTitle = title
      this.$emit('on-change', this.departmentId)
    },
    // 清空已选
    clearSelect() {
      this.departmentId = []
      this.departmentTitle = ''
      this.selectDep = []
      this.dataDep = []
      this.initDepartmentData()
      this.$emit('on-change', this.departmentId)
    },
    // 无用
    setSelectDep(ids, title) {
      this.departmentId = ids
      this.departmentTitle = title
      this.$emit('on-change', this.departmentId)
    },
    filterNode(value, data) {
      if (!value) return true
      return data.label.indexOf(value) !== -1
    }
  }
}
</script>

<style lang="scss">
.tree-bar {
    max-height: 500px;
    overflow: auto;
    margin-top: 5px;
}

.tree-bar::-webkit-scrollbar {
    width: 6px;
    height: 6px;
}

.tree-bar::-webkit-scrollbar-thumb {
    border-radius: 4px;
    -webkit-box-shadow: inset 0 0 2px #d1d1d1;
    background: #e4e4e4;
}

.ivu-tree .ivu-tree-empty {
    margin-top: 10px;
    font-size: 12px;
}
</style>
