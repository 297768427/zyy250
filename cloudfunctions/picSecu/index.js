// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  // const {value} = event;
  const {fileID} = event;

  const res = await cloud.downloadFile({
    fileID:fileID
  })

  const buffer = res.fileContent;

  try{
     
    let result = await cloud.openapi.security.imgSecCheck({
      media: {
      header: {'Content-Type': 'application/octet-stream'},
      contentType: 'image/png',
      value:buffer
      }
      })
      return result;
  }catch(err){
    return err;
  }




  // try {
  // const res = await cloud.openapi.security.imgSecCheck({
  // media: {
  // header: {'Content-Type': 'application/octet-stream'},
  // contentType: 'image/png',
  // value:Buffer.from(value)
  // }
  // })
  // return res;
  // } catch (err) {
  // return err;
  // }
}