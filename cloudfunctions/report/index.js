// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})
const db = cloud.database()
const _ = db.command

// 云函数入口函数
exports.main = async (event, context) => {
  switch (event.action) {
    case "create":
      return await create(event)
  }
}

async function create(event) {
  const wxContext = cloud.getWXContext();
  const { seat, phone, message } = event
  try {
    await db.collection("report").add({
      data: {
        openId: wxContext.OPENID,
        seat,
        phone,
        message,
        time: new Date()
      }
    })
    return {
      code: 200,
      message: "举报成功"
    }
  } catch (error) {
    return {
      code: 403,
      message: "举报失败",
      error
    }
  }
}