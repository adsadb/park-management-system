import Mock from 'mockjs'
import { doCustomTimes } from '@/libs/util'
import orgData from './data/org-data'
import { treeData } from './data/tree-select'
const Random = Mock.Random

export const getTableData = req => {
  let tableData = []
  doCustomTimes(5, () => {
    tableData.push(Mock.mock({
      name: '@name',
      email: '@email',
      createTime: '@date'
    }))
  })
  return tableData
}

export const getDragList = req => {
  let dragList = []
  doCustomTimes(5, () => {
    dragList.push(Mock.mock({
      name: Random.csentence(10, 13),
      id: Random.increment(10)
    }))
  })
  return dragList
}

export const uploadImage = req => {
  return Promise.resolve()
}

export const getOrgData = req => {
  return orgData
}

export const getTreeSelectData = req => {
  return treeData
}

//kpy
export const getDeviceTableData = req => {
  let tableData = []
  doCustomTimes(5, () => {
    tableDatas.push(Mock.mock({
      ename: '@name',
      etype: '@email',
      eclass: Random.cword('零一二三四五六七八九十', 3, 4),
      eip:'@id',
      eport:'@id',
      emodel:Random.cword('零一二三四五六七八九十', 1, 3),
      ecreate:Mock.mock('@date("yyyy-MM-dd")'),
      estate:Random.cword('零一二三四五六七八九十', 4, 5)
    }))
  })
  return tableDatas
}
// Mock.mock('/equipment/list', 'get', getDeviceTableData);