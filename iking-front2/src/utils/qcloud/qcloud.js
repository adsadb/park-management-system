import { baseInfo } from '../../config'
import CryptoJS from 'crypto-js'

const QCloud = {
  GetSign() {
    const random = parseInt(Math.random() * Math.pow(2, 32))
    const now = parseInt(new Date().getTime() / 1000)
    const e = now + 60 * 60 * 24 * 30 // 签名过期时间为当前+60s
    const path = ''// 多次签名这里填空
    const str = 'a=' + baseInfo.qCloudAppid + '&b=' + baseInfo.qCloudBucket + '&k=' + baseInfo.qCloudSid + '&e=' + e + '&t=' + now + '&r=' + random + '&u=0&f=' + path
    const sha1Res = CryptoJS.HmacSHA1(str, baseInfo.qCloudSkey)// 这里使用CryptoJS计算sha1值，你也可以用其他开源库或自己实现
    const strWordArray = CryptoJS.enc.Utf8.parse(str)
    const resWordArray = sha1Res.concat(strWordArray)
    const sign = resWordArray.toString(CryptoJS.enc.Base64)
    return sign
  },
  Guid() {
    return 'xxxxxxxxxxxx4xxxyxxxxxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      const r = Math.random() * 16 | 0
      const v = c === 'x' ? r : (r & 0x3 | 0x8)
      return v.toString(16)
    })
  },
  UploadFile(imgUrl, fileName) {
    const formData = new FormData()
    const file = { uri: imgUrl, type: 'multipart/form-data' }
    formData.append('filecontent', file)
    formData.append('op', 'upload')
    const sign = this.GetSign()
    const url = baseInfo.qCloudHost + 'files/v2/' + baseInfo.qCloudAppid + '/' + baseInfo.qCloudBucket + '/' + fileName
    const options = {
      'method': 'POST',
      'headers': {
        'Accept': 'application/json',
        'Authorization': sign
      },
      body: formData
    }
    return fetch(url, options)
      .then((response) => response.json())
  },
  DeleteFile(fileName) {
    const formData = new FormData()
    formData.append('op', 'delete')
    const sign = this.GetSign()
    const url = baseInfo.qCloudHost + 'files/v2/' + baseInfo.qCloudAppid + '/' + baseInfo.qCloudBucket + fileName
    const options = {
      'method': 'POST',
      'headers': {
        'Accept': 'application/json',
        'Authorization': sign
      },
      body: formData
    }
    return fetch(url, options)
      .then((response) => response.json())
  }

}
export default QCloud
