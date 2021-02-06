// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})
const db = cloud.database()
const _ = db.command

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  switch (event.action) {
    case "get":
      return await get(event)
  }
}
async function get(event) {
  const wxContext = cloud.getWXContext();
  const res = await db.collection("history").where({
    openId: wxContext.OPENID
  }).get()
  return res.data
}