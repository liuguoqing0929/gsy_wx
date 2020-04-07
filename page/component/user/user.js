// page/component/new-pages/user/user.js
//获取应用实例
const app = getApp()

Page({
  data:{
    thumb:'',
    nickname:'',
    orders:[],
    hasAddress:false,
    address:{},
    hasNotPermission: false
  },
  onLoad(){
    var self = this;
    let that = this
    // console.log(app.globalData)
    // 获取用户的 不需要授权 openId
    // that.getUserOpenId()
    // 获取授权弹窗
    // that.getUserInfo()
  },
  onShow(){
    var self = this;
    let that = this;
    console.log('user show')
    that.getUserInfo()
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
    // 获取用户信息
    wx.getSetting({
      success(res) {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称
          wx.getUserInfo({
            success(res) {
              app.globalData.hasPermission = true
              that.setData({
                hasNotPermission: false
              })
              app.globalData.userInfo = res.userInfo,
              that.confirmUser(res.userInfo)
            },
            fail(res) {
              console.log("获取用户信息失败", res)
            }
          })
        } else {
          console.log("未授权=====")
          that.setData({
            hasNotPermission: true
          })
        }
      }
    })
  },
  getUserOpenId: function(){
    // 去获取openId
    wx.login({
      success: result => {
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
          }
        })
      }
    })
  },
  // 判断是否获取用户授权
  getUserPermission: function(){
    if (app.globalData.hasPermission)
      return true;
    return false;
  },
  // 判断当前用户是否已经存在
  confirmUser: function(userInfo){
    let that = this
    userInfo.openId = app.globalData.openId
    wx.request({
      url: app.globalData.requestUrl + 'user/addWechatUser',
      method: 'POST',
      data: userInfo,
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        console.log(res)
      }
    })
  },
  // 跳转到地址管理页面
  addressManager: function(){
    console.log('addressManager')
    
    if (getUserPermission){

    }
    wx.navigateTo({
      url: '/page/component/address/address',
    })
  }
})