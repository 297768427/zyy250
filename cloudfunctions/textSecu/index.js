// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  let {content:content} = event;
  
  let result;
  try{
    result = await cloud.openapi.security.msgSecCheck({
      content
   })
  }catch(err){result=err}
   
  return result;
}