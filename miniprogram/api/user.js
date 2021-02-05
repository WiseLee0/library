const db = wx.cloud.database()
const _ = db.command

export async function apiUserRegister(event) {
    const { username, password } = event
    return await wx.cloud.callFunction({
        name: "user",
        data: {
            action: "register",
            username,
            password
        }
    }).then(res => {
        console.log("调用apiUserRegister云函数成功:", res.result)
        return res.result
    })
}

export async function apiUserLogin(event) {
    const { username, password } = event
    return await wx.cloud.callFunction({
        name: "user",
        data: {
            action: "login",
            username,
            password
        }
    }).then(res => {
        console.log("调用apiUserLogin云函数成功:", res.result)
        return res.result
    })
}