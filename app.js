App({
  onLaunch: function () {
    console.log('App Launch')
    let that = this 
    that.getOpenId()
    that.getPermission()
  },
  onShow: function () {
    console.log('App Show')
  },
  onHide: function () {
    console.log('App Hide')
  },
  globalData: {
    hasLogin: false,
    hasPermission: false,
    openId: '',
    requestUrl: 'http://127.0.0.1:8080/'
  },
  getOpenId: function(){
    let that = this
    // 去获取openId
    wx.login({
      success: result => {
        wx.request({
          url: that.globalData.requestUrl+'user/getUserOpenId',
          method: 'POST',
          data: {
            'code': result.code
          },
          header: {
            'content-type': 'application/json' // 默认值
          },
          success(res) {
            if(res.data.code == 1){
              that.globalData.openId = res.data.data
            }
          }
        })
      }
    })
  },
  getPermission: function(){
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        } else {
          // 未授权，跳转到授权页面
          // wx.reLaunch({
          //   url: '/pages/auth/auth',
          // })
        }
      }
    })
  }
})
