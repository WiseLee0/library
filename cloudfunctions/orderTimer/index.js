const cloud = require('wx-server-sdk')
cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})
const db = cloud.database()
const _ = db.command

// 云函数入口函数
exports.main = async (event, context) => {
  const res = await db.collection("timer").get()
  for (let i = 0; i < res.data.length; i++) {
    const ele = res.data[i];
    const diff = new Date().getTime() - new Date(ele.time).getTime()
    if (diff < 15 * 60 * 1000) continue
    db.collection("history").where({
      openId: ele.openId,
      end: null
    }).remove()
    db.collection("timer").where({
      openId: ele.openId,
    }).remove()
    const seatRes = await db.collection("seat").where({
      room: ele.room
    }).get()
    const newSeatArr = seatRes.data[0].data.filter(d => d.openId != ele.openId)
    db.collection("seat").where({
      room: ele.room
    }).update({
      data: {
        data: newSeatArr
      }
    })
  }
}