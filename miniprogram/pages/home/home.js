// pages/home/home.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
     password:""
  },

  passwordInput(e){
    this.setData({
      password:e.detail.value
    });
  },

  homeGo(){
    if(this.data.password === "250250"){
      wx.switchTab({
        url: '/pages/pics/pics',
      })
    }else{
      wx.showToast({
        title: '名字你都输不对，我服了',
        duration: 1900,
        icon:"none"
      })
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})