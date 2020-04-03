// page/component/new-pages/user/user.js
//获取应用实例
const app = getApp()

Page({
  data:{
    thumb:'',
    nickname:'',
    orders:[],
    hasAddress:false,
    address:{}
  },
  onLoad(){
    var self = this;
    let that = this
    console.log(app.globalData)
    // 获取用户的 不需要授权 openId
    that.getUserOpenId()
    // 获取授权弹窗
    that.getUserInfo()
  },
  onShow(){
    console.log('user show')
    var self = this;
    /**
     * 获取本地缓存 地址信息
     */
    wx.getStorage({
      key: 'address',
      success: function(res){
        self.setData({
          hasAddress: true,
          address: res.data
        })
      }
    })
  },
  /**
   * 发起支付请求
   */
  payOrders(){
    wx.requestPayment({
      timeStamp: 'String1',
      nonceStr: 'String2',
      package: 'String3',
      signType: 'MD5',
      paySign: 'String4',
      success: function(res){
        console.log(res)
      },
      fail: function(res) {
        wx.showModal({
          title:'支付提示',
          content:'<text>',
          showCancel: false
        })
      }
    })
  },
  getUserInfo: function (e) {
    let that = this;
    // console.log(e)
    // 获取用户信息
    wx.getSetting({
      success(res) {
        // console.log("res", res)
        if (res.authSetting['scope.userInfo']) {
          console.log("已授权=====")
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称
          wx.getUserInfo({
            success(res) {
              console.log("获取用户信息成功", res)
              that.setData({
                name: res.userInfo.nickName
              })
              app.globalData.hasPermission = true
              app.globalData.userInfo = res.userInfo
            },
            fail(res) {
              console.log("获取用户信息失败", res)
            }
          })
        } else {
          console.log("未授权=====")
          // that.showSettingToast("请授权")
        }
      }
    })
  },
  getUserOpenId: function(){
    // 去获取openId
    wx.login({
      success: result => {
        console.log('去获取openId')
        console.log(result)
        wx.request({
          url: 'http://127.0.0.1:8080/user/addWechatUser',
          method: 'POST',
          data: {
            'code': result.code,
            'name': result.code,
            'openId': '123132',
          },
          header: {
            'content-type': 'application/json' // 默认值
          },
          success(dataResult) {
            console.log(dataResult)
            // app.globalData.openId = dataResult
          }
        })
      }
    })
  }
})