// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})
const db = cloud.database()
const _ = db.command

// 云函数入口函数
exports.main = async (event, context) => {
  console.log(event);
  switch (event.action) {
    case "login":
      return await login(event)
    case "register":
      return await register(event)
  }
}

async function register(event) {
  const wxContext = cloud.getWXContext();
  const { username, password } = event
  try {
    const res = await db.collection("user").where({
      username
    }).get()
    if (res.data.length) {
      return {
        code: 403,
        message: "用户已经被注册"
      }
    }
    await db.collection("user").add({
      data: {
        openId: wxContext.OPENID,
        create_time: new Date(),
        username,
        password
      }
    })
    return {
      code: 200,
      message: "注册成功"
    }
  } catch (error) {
    return {
      code: 403,
      message: "注册失败",
      error
    }
  }
}

async function login(event) {
  const wxContext = cloud.getWXContext();
  const { username, password } = event
  try {
    await db.collection("user").where({
      username, password
    })
    return {
      code: 200,
      message: "登录成功"
    }
  } catch (error) {
    return {
      code: 403,
      message: "用户名密码错误",
      error
    }
  }
}