// pages/pics/pics.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
     theArray:[],
     mark:0
  },

  // checkStory(){
  //   wx.navigateTo({
  //     url: '../../pages/story/story',
  //   })
  // },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
       
       wx.cloud.callFunction({
         name:"getPics",
         data:{
           length:0
         }
       }).then(res=>{
         this.setData({theArray:res.result.data});
       }).catch(err=>{console.log(err)});
      
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
       if(this.data.mark == 0){
        this.setData({
          mark:1
        });
       }else{
        let theLength = this.data.theArray.length;
        wx.cloud.callFunction({
          name:"getPics",
          data:{
            length:theLength
          }
        }).then(res=>{
          let newArray = this.data.theArray.concat(res.result.data);
          this.setData({theArray:newArray});
        }).catch(err=>{console.log(err)});
       }
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
    let theLength = this.data.theArray.length;
    wx.cloud.callFunction({
      name:"getPics",
      data:{
        length:theLength
      }
    }).then(res=>{
      let newArray = this.data.theArray.concat(res.result.data);
      this.setData({theArray:newArray});
    }).catch(err=>{console.log(err)});
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})