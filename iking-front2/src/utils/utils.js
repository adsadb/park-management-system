/**
 * form表单检验
 */
export function formCheck(obj, name) {
  let result = false
  obj.$refs[name].validate((valid) => {
    if (valid) {
      result = true
    } else {
      obj.$Message.warning('请完善信息!')
      result = false
    }
  })
  return result
}
export const formatJs = {
  // 字符串转Date
  strToDate(s) {
    const str = s.replace(/-/g, '/')
    const date = new Date(str)
    return date
  },
  // 對象的深度拷貝
  deepCopy(source) {
    const result = {}
    for (const key in source) {
      result[key] = typeof source[key] === 'object' ? this.deepCopy(source[key]) : source[key]
    }
    return result
  },
  // 判斷對象是否相等
  objContrast(x, y) {
    // 严格相等
    if (x === y) {
      return x !== 0 || 1 / x === 1 / y
    }

    if (x == null && y == null) {
      return true
    }

    // 如果不是严格相等，则他们都需要是对象
    if (!(x instanceof Object) || !(y instanceof Object)) {
      return false
    }

    // 原型链判断（使用构造函数判断）
    if (x.constructor !== y.constructor) {
      return false
    }

    for (var p in x) {
      // 继承属性测试
      if (x.hasOwnProperty(p)) {
        if (!y.hasOwnProperty(p)) {
          return false
        }

        // 如果严格相等
        if (x[p] === y[p]) {
          continue
        }

        // 数字、字符串、布尔值的函数，必须严格相等
        if (typeof (x[p]) !== 'object') {
          return false
        }
        // 数组和对象必须尽想递归测试
        /* if ( ! Object.equals( x[ p ],  y[ p ] ) ) {
         return false;
         }*/
      }
    }

    for (p in y) {
      // 允许 x[p] 是未定义的
      if (y.hasOwnProperty(p) && !x.hasOwnProperty(p)) {
        return false
      }
    }
    return true
  },
  // 秒数转日期
  dateFormat(str) {
    if (str == null) {
      oTime = null
      return oTime
    }
    const oDate = new Date(str)
    const oYear = oDate.getFullYear()
    const oMonth = oDate.getMonth() + 1
    const oDay = oDate.getDate()
    const oHour = oDate.getHours()
    const oMin = oDate.getMinutes()
    const oSen = oDate.getSeconds()
    let oTime = oYear + '-' + this.getzf(oMonth) + '-' + this.getzf(oDay) + ' ' + this.getzf(oHour) + ':' + this.getzf(oMin) + ':' + this.getzf(oSen)// 最后拼接时间
    return oTime
  },
  // 补0操作
  getzf(num) {
    if (parseInt(num) < 10) {
      num = '0' + num
    }
    return num
  },
  numToMoneyValue(s) {
    let n = 2
    if (typeof (s) === 'number') {
      s = s.toFixed(n)
    }
    if (s === '' || s == null) return ''
    n = n > 0 && n <= 20 ? n : 2
    s = parseFloat((s + '').replace(/[^\d\.-]/g, '')).toFixed(n) + ''
    if (s * 1 === 0) return '0.00'
    const l = s.split('.')[0].split('').reverse()
    const r = s.split('.')[1]
    let t = ''
    for (let i = 0; i < l.length; i++) {
      t += l[i] + ((i + 1) % 3 === 0 && (i + 1) !== l.length ? ',' : '')
    }
    return t.split('').reverse().join('').replace('-,', '-') + '.' + r
  },
  // 加减乘除
  accDiv(arg1, arg2) {
    let t1 = 0
    let t2 = 0
    let r1 = 0
    let r2 = 0
    t1 = arg1.toString().split('.')[1].length
    t2 = arg2.toString().split('.')[1].length
    r1 = Number(arg1.toString().replace('.', ''))
    r2 = Number(arg2.toString().replace('.', ''))
    return parseFloat(((r1 / r2) * Math.pow(10, t2 - t1)).toFixed(2))
  },
  accMul(arg1, arg2) {
    let m = 0
    const s1 = arg1.toString()
    const s2 = arg2.toString()
    m += s1.split('.')[1].length
    m += s2.split('.')[1].length
    return parseFloat((Number(s1.replace('.', '')) * Number(s2.replace('.', '')) / Math.pow(10, m)).toFixed(2))
  },
  accAdd(arg1, arg2) {
    let r1
    let r2
    let m = 0
    try {
      r1 = arg1.toString().split('.')[1].length
    } catch (e) {
      r1 = 0
    }
    try {
      r2 = arg2.toString().split('.')[1].length
    } catch (e) {
      r2 = 0
    }
    m = Math.pow(10, Math.max(r1, r2))
    return parseFloat(((arg1 * m + arg2 * m) / m).toFixed(2))
  },
  accSub(arg1, arg2) {
    let r1
    let r2
    let m = 0
    try {
      r1 = arg1.toString().split('.')[1].length
    } catch (e) {
      r1 = 0
    }
    try {
      r2 = arg2.toString().split('.')[1].length
    } catch (e) {
      r2 = 0
    }
    m = Math.pow(10, Math.max(r1, r2))
    // last modify by deeka
    // 动态控制精度长度
    return parseFloat(((arg2 * m - arg1 * m) / m).toFixed(2))
  },
  // 去掉前后空格
  trim(str) { // 删除左右两端的空格
    if (str == null) {
      return ''
    }
    return str.replace(/(^\s*)|(\s*$)/g, '')
  },

  overlongTreatment: function(s) {
    let returnStr = ''
    for (let i = 0; i < s.length; i++) {
      if (i !== 0 && i % 5 === 0) {
        returnStr += ' '
      }
      returnStr += s.charAt(i)
    }
    return returnStr
  }
}
