const cloud = require('wx-server-sdk')
cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})
const db = cloud.database()
const _ = db.command

// 云函数入口函数
exports.main = async (event, context) => {
  switch (event.action) {
    case "remove":
      return await remove(event)
  }
}
async function remove(event) {
  const wxContext = cloud.getWXContext();
  try {
    await db.collection("timer").where({
      openId: wxContext.OPENID
    }).remove()
    return {
      code: 200,
      message: "扫码签到成功"
    }
  } catch (error) {
    return {
      code: 403,
      message: "扫码签到失败",
      error
    }
  }
}