const db = wx.cloud.database()
const _ = db.command

export async function apiSeatCreate(event) {
    const { room, index } = event
    return await wx.cloud.callFunction({
        name: "seat",
        data: {
            action: "create",
            index,
            room
        }
    }).then(res => {
        console.log("调用apiSeatCreate云函数成功:", res.result)
        return res.result
    })
}
export async function apiSeatGet(event) {
    const { room, index } = event
    return await wx.cloud.callFunction({
        name: "seat",
        data: {
            action: "get",
            index,
            room
        }
    }).then(res => {
        console.log("调用apiSeatGet云函数成功:", res.result)
        return res.result
    })
}

export async function apiSeatCount(event) {
    return await wx.cloud.callFunction({
        name: "seat",
        data: {
            action: "count"
        }
    }).then(res => {
        console.log("调用apiSeatCount云函数成功:", res.result)
        return res.result
    })
}

export async function apiSeatCancel(event) {
    const { room } = event
    return await wx.cloud.callFunction({
        name: "seat",
        data: {
            action: "cancel",
            room
        }
    }).then(res => {
        console.log("调用apiSeatCancel云函数成功:", res.result)
        return res.result
    })
}

export async function apiSeatExist(event) {
    const { room, index } = event
    return await wx.cloud.callFunction({
        name: "seat",
        data: {
            action: "exist",
            room,
            index
        }
    }).then(res => {
        console.log("调用apiSeatExist云函数成功:", res.result)
        return res.result
    })
}