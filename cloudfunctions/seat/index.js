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
    case "get":
      return await get(event)
    case "count":
      return await count(event)
    case "cancel":
      return await cancel(event)
    case "clear":
      return await clear(event)
    case "exist":
      return await exist(event)
  }
}

async function create(event) {
  const wxContext = cloud.getWXContext();
  const { index, room } = event
  try {
    const res = await db.collection("seat").get()
    let RoomData = []
    for (const item of res.data) {
      if (item.data.findIndex(d => d.openId == wxContext.OPENID) > -1) {
        return {
          code: 403,
          message: "你已经有预约了",
          data: res.data.find(i => i.room == room).data
        }
      }
      if (item.room == room) RoomData = item
    }
    if (RoomData.data.findIndex(d => d.index == index) > -1) {
      return {
        code: 403,
        message: "位置已经被人占取",
        data: RoomData.data
      }
    }
    db.collection("history").add({
      data: {
        openId: wxContext.OPENID,
        room,
        seat: index,
        start: new Date(),
        end: null
      }
    })
    db.collection('timer').add({
      data: {
        openId: wxContext.OPENID,
        room,
        seat: index,
        time: new Date()
      }
    })
    await db.collection("seat").where({
      room
    }).update({
      data: {
        data: [...RoomData.data, {
          index,
          openId: wxContext.OPENID,
          time: new Date()
        }]
      }
    })
    return {
      code: 200,
      message: "座位预定成功",
      data: [...RoomData.data, {
        index,
        openId: wxContext.OPENID
      }]
    }
  } catch (error) {
    return {
      code: 403,
      message: "座位预定失败",
      error,
      data: RoomData.data
    }
  }
}
async function get(event) {
  const wxContext = cloud.getWXContext();
  const { room } = event
  const res = await db.collection("seat").where({
    room
  }).get()
  return {
    data: res.data[0].data,
    openId: wxContext.OPENID
  }
}
async function count(event) {
  const res = await db.collection("seat").get()
  const ans = []
  for (const item of res.data) {
    ans.push({
      room: item.room,
      count: item.data.length
    })
  }
  return ans
}
async function cancel(event) {
  const wxContext = cloud.getWXContext();
  const { room } = event
  const res = await db.collection("seat").where({
    room
  }).get()
  const data = res.data[0].data.filter(r => r.openId != wxContext.OPENID)
  db.collection("seat").where({
    room
  }).update({
    data: {
      data
    }
  })
  await db.collection("history").where({
    openId: wxContext.OPENID,
    end: null
  }).update({
    data: {
      end: new Date()
    }
  })
  const ans = await db.collection("history").where({
    openId: wxContext.OPENID
  }).get()
  return {
    code: 200,
    message: "取消预定成功",
    data: ans.data
  }
}
async function clear(event) {
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
async function exist(event) {
  const { room, index } = event
  const res = await db.collection("seat").where({
    room
  }).get()
  if (res.data[0].data.findIndex(d => d.index == index) > -1) {
    return {
      code: 403,
      message: "此座位已被预约使用"
    }
  } else {
    return {
      code: 200,
      message: "此座位无人预约使用"
    }
  }
}