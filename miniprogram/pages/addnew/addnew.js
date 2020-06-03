// pages/addnew/addnew.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
     text:"",
     fileID:"../../assets/addpic_icon.jpg",
     imgW:0,
     imgH:0,
     smallPic:"",
     smallPicFileID:""
  },


  getImage(){
    wx.chooseImage({
      count:1,
      sizeType:['compressed'],
      complete: (res) => {
        this.setData({
          fileID:res.tempFilePaths[0]
        });

       wx.getImageInfo({
         src: res.tempFilePaths[0],
         success:res=>{
           this.setData({
             imgH:res.height,
             imgW:res.width
           })
           
           
           
            let ratioH ;
           let ratioW = 3;

           if(res.width + res.height > 6200){
            ratioW=10;
           }else if(res.width + res.height > 5200){
            ratioW=8.8;
           }else if(res.width + res.height > 4200){
            ratioW=7.5;
           }else if( res.width + res.height > 3000){ 
             ratioW=6;
            }else if( res.width + res.height > 2000) {
            ratioW=5;
            }

            ratioH = ratioW;
            if(res.width/res.height>2 ){
              ratioW = 1.6*ratioW;
            }else if(res.height/res.width>2){
              ratioH = 1.6*ratioH;
            }
             
           let pen = wx.createCanvasContext("myCanvas");
           pen.drawImage(this.data.fileID,0,0,res.width/ratioW,res.height/ratioW);
          
           pen.draw(false,setTimeout(()=>{
             wx.canvasToTempFilePath({
              width: res.width/ratioW,
              height: res.height/ratioH,
              destWidth: res.width/ratioW,
              destHeight: res.height/ratioH,
              canvasId: 'myCanvas',
               success:res=>{
                 this.setData({smallPic:res.tempFilePath});
               }
             })
           },400));


         }
       })
        
       
        
      },
    })
  },

  textInput(e){
    this.setData({
      text:e.detail.value
    })
  },
  
  
   goUpload(){

    if(this.data.text.length>0 && this.data.fileID != "../../assets/addpic_icon.jpg"){
      let time = new Date();
      let ms = time.getMilliseconds().toString();
      let s = time.getSeconds().toString();
      let m = time.getMinutes().toString();
      let h = time.getHours().toString();
      let d = time.getDate().toString();
      let theOne = d+h+m+s+ms;

      wx.showLoading({
        title: '上传中.....',
        mask:"true",
  
      })


      wx.cloud.callFunction({
        name:"textSecu",
        data:{content:this.data.text},
        success:res=>{
          if(res.result.errCode ===0){
           wx.cloud.uploadFile({
            cloudPath:"pics_SMALL" + theOne ,
            filePath:this.data.smallPic,
            success:res=>{
              this.setData({
                smallPicFileID:res.fileID
              });
              wx.cloud.callFunction({
                name:"picSecu",
                data:{
                  fileID:res.fileID
                }
              }).then(res=>{
                if(res.result.errCode == 0){
                  wx.cloud.uploadFile({
                    cloudPath:"pics" + theOne ,
                    filePath:this.data.fileID,
                    success: res =>{
                      let db = wx.cloud.database();
                      db.collection("pics").add({
                        data:{
                          fileID: res.fileID,
                          story: this.data.text
                        },
                        success:res=>{
                          wx.hideLoading();
                          wx.showToast({
                            title: '上传成功',
                            duration: 1400,
                            icon:"success"
                          })
                        },
                        fail:err=>{
                          wx.hideLoading();
                          wx.showToast({
                            title: '上传数据库失败',
                            duration: 1400,
                            icon:"none"
                          })
                        }
                      })
                    },
                    fail: err => {
                      wx.hideLoading();
                      wx.showToast({
                        title: '上传失败',
                        duration: 1400,
                        icon:"none"
                      })
                    },
                    complete:()=>{
                      wx.cloud.deleteFile({
                        fileList:[this.data.smallPicFileID]
                      })
                    }
                  })





                }else{
                  wx.hideLoading();
                  wx.showToast({
                    title: '图片涉嫌违规',
                    duration: 1800,
                    icon:"none"
                  })
                }
              })
            },
            fail:err=>{
              wx.hideLoading();
                  wx.showToast({
                    title: '上传过程出现错误',
                    duration: 1800,
                    icon:"none"
                  })
            }
           })
                 
          }else{
            wx.hideLoading();
            wx.showToast({
              title: '上传文字有违规内容',
              duration: 1600,
              icon:"none"
            })
          }
        }
      })
    }else{
      wx.showToast({
        title: '照片或文字未输入',
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