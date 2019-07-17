import Vue from 'vue'
import router from '@/router'
import store from '@/store'

/**
 * 获取uuid
 */
export function getUUID () {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
    return (c === 'x' ? (Math.random() * 16 | 0) : ('r&0x3' | '0x8')).toString(16)
  })
}

/**
 * 是否有权限
 * @param {*} key
 */
export function isAuth (key) {
  return JSON.parse(sessionStorage.getItem('permissions') || '[]').indexOf(key) !== -1 || false
}

/**
 * 树形数据转换
 * @param {*} data
 * @param {*} id
 * @param {*} pid
 */
export function treeDataTranslate (data, id = 'id', pid = 'parentId') {
  var res = []
  var temp = {}
  for (var i = 0; i < data.length; i++) {
    temp[data[i][id]] = data[i]
  }
  for (var k = 0; k < data.length; k++) {
    if (temp[data[k][pid]] && data[k][id] !== data[k][pid]) {
      if (!temp[data[k][pid]]['children']) {
        temp[data[k][pid]]['children'] = []
      }
      if (!temp[data[k][pid]]['_level']) {
        temp[data[k][pid]]['_level'] = 1
      }
      data[k]['_level'] = temp[data[k][pid]]._level + 1
      temp[data[k][pid]]['children'].push(data[k])
    } else {
      res.push(data[k])
    }
  }
  return res
}

/**
 * 清除登录信息
 */
export function clearLoginInfo () {
  Vue.cookie.delete('token')
  store.commit('resetStore')
  router.options.isAddDynamicMenuRoutes = false
}

/////////////////////公共方法s/////////////////////
///全局注入在main.js中注入
///若没有全局注入，需要单独引入////
/**
 * 日期格式化
 * date-时间
 * type-1：年月日 2：年月日时分
 * 返回值形式为yy-MM-dd 或yy-MM-dd HH:mm:ss*/
export function timeFormat (date, type) {
  var dateStr = ''
  if (!date || typeof (date) === 'string') {
    this.error('参数异常，请检查...')
  }
  var y = date.getFullYear() // 年
  var m = (date.getMonth() + 1) < 10 ? '0' + (date.getMonth() + 1) : (date.getMonth() + 1)
  var d = date.getDate() < 10 ? '0' + date.getDate() : date.getDate() // 日
  dateStr = y + '-' + m + '-' + d
  if (type == 2) {
    var h = date.getHours() < 10 ? '0' + (date.getHours()) : date.getHours()
    var M = date.getMinutes() < 10 ? '0' + (date.getMinutes()) : date.getMinutes()
    var s = date.getSeconds() < 10 ? '0' + (date.getSeconds()) : date.getSeconds()
    dateStr = `${dateStr} ${h}:${M}:${s}`
  }
  return dateStr
}


/**
 * 导出Excel
 */
export function downLoadExcel (url, params) {
  let urls = this.$http.adornUrl(url)
  params['token'] = this.$cookie.get('token')
  let paramsData = '?'
  for (let key in params) {
    paramsData += key + '=' + params[key] + '&'
  }
  window.location.href = urls + paramsData.slice(0, paramsData.length - 1)
}

/**
 * 数字转中文大写金额
 */
export function convertCurrency (money) {
  // 汉字的数字
  var cnNums = new Array('零', '壹', '贰', '叁', '肆', '伍', '陆', '柒', '捌', '玖')
  // 基本单位
  var cnIntRadice = new Array('', '拾', '佰', '仟')
  // 对应整数部分扩展单位
  var cnIntUnits = new Array('', '万', '亿', '兆')
  // 对应小数部分单位
  var cnDecUnits = new Array('角', '分', '毫', '厘')
  // 整数金额时后面跟的字符
  var cnInteger = '整'
  // 整型完以后的单位
  var cnIntLast = '元'
  // 最大处理的数字
  var maxNum = 999999999999999.9999
  // 金额整数部分
  var integerNum
  // 金额小数部分
  var decimalNum
  // 输出的中文金额字符串
  var chineseStr = ''
  // 分离金额后用的数组，预定义
  var parts
  if (money == '') { return '' }
  money = parseFloat(money)
  if (money >= maxNum) {
    // 超出最大处理数字
    return ''
  }
  if (money == 0) {
    chineseStr = cnNums[0] + cnIntLast + cnInteger
    return chineseStr
  }
  // 转换为字符串
  money = money.toString()
  if (money.indexOf('.') == -1) {
    integerNum = money
    decimalNum = ''
  } else {
    parts = money.split('.')
    integerNum = parts[0]
    decimalNum = parts[1].substr(0, 4)
  }
  // 获取整型部分转换
  if (parseInt(integerNum, 10) > 0) {
    var zeroCount = 0
    var IntLen = integerNum.length
    for (var i = 0; i < IntLen; i++) {
      var n = integerNum.substr(i, 1)
      var p = IntLen - i - 1
      var q = p / 4
      var m = p % 4
      if (n == '0') {
        zeroCount++
      } else {
        if (zeroCount > 0) {
          chineseStr += cnNums[0]
        }
        // 归零
        zeroCount = 0
        chineseStr += cnNums[parseInt(n)] + cnIntRadice[m]
      }
      if (m == 0 && zeroCount < 4) {
        chineseStr += cnIntUnits[q]
      }
    }
    chineseStr += cnIntLast
  }
  // 小数部分
  if (decimalNum != '') {
    var decLen = decimalNum.length
    for (var i = 0; i < decLen; i++) {
      var n = decimalNum.substr(i, 1)
      if (n != '0') {
        chineseStr += cnNums[Number(n)] + cnDecUnits[i]
      }
    }
  }
  if (chineseStr == '') {
    chineseStr += cnNums[0] + cnIntLast + cnInteger
  } else if (decimalNum == '') {
    chineseStr += cnInteger
  }
  return chineseStr
}
/////////////////////公共方法e/////////////////////

