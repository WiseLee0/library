const cloud = require('wx-server-sdk')
cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})
const db = cloud.database()
const _ = db.command

// 云函数入口函数
exports.main = async (event, context) => {
  const res = await db.collection("seat").get()
  for (const item of res.data) {
    for (let i = 0; i < item.data.length; i++) {
      const ele = item.data[i];
      db.collection("history").where({
        openId: ele.openId,
        end: null
      }).update({
        data: {
          end: new Date()
        }
      })
    }
    db.collection("seat").where({
      room: item.room
    }).update({
      data: {
        data: []
      }
    })
  }
}