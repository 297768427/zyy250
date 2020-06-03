// pages/chat/chat.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    message:[],
    input:"",
    inputHeight:"30px",
    btnVisibility:"collapse"
  },

  upload(){
    
    if(this.data.input.length > 0){

      wx.showLoading({
        title: '上传中.....',
        mask:"true",
  
      });

      wx.cloud.callFunction({
        name:"textSecu",
        data:{
          content:this.data.input
        }
      }).then(res=>{
        if(res.result.errCode ===0){
            wx.cloud.callFunction({
              name:"addChat",
              data:{
                content:this.data.input
              }
            }).then(res=>{
               this.setData({
                 input:""
               });
      
               let db = wx.cloud.database();
               let length = this.data.message.length;
               db.collection("chat").skip(length).limit(10).get().then(res=>{
               let newArray = this.data.message.concat(res.data);
              this.setData({message:newArray});
              }).catch(err=>console.log(err));
              
              wx.hideLoading();
              wx.showToast({
                title: '上传成功',
                duration: 1300,
                icon:"success"
              });
      
            }).catch(err=>{
              wx.hideLoading();
              wx.showToast({
                title: '上传失败',
                duration: 1900,
                icon:"none"
              });
            });
        }else{
          wx.hideLoading();
          wx.showToast({
            title: '上传失败,上传内容有违规信息',
            duration: 1800,
            icon:"none"
          });
        }
      });





    }else{
      wx.showToast({
        title: '输入内容不能为空',
        duration: 1800,
        icon:"none"
      })
    }
    
  },

  getSmall(){this.setData({
    inputHeight:"30px",
    btnVisibility:"collapse"
  })},

  getLarge(){
    this.setData({
      inputHeight:"100px",
      btnVisibility:"visible"
    })
  },

  chatInput(e){
     this.setData({
       input:e.detail.value
     })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
     let db = wx.cloud.database();
     db.collection("chat").limit(10).get().then(res=>{
       this.setData({message:res.data});
     }).catch(err=>console.log(err));
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
    let db = wx.cloud.database();
    let length = this.data.message.length;
    db.collection("chat").skip(length).limit(10).get().then(res=>{
      let newArray = this.data.message.concat(res.data);
      this.setData({message:newArray});
    }).catch(err=>console.log(err));
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})