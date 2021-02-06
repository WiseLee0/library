const db = wx.cloud.database()
const _ = db.command

export async function apiHistoryGet(event) {
    return await wx.cloud.callFunction({
        name: "history",
        data: {
            action: "get",
        }
    }).then(res => {
        console.log("调用apiHistoryGet云函数成功:", res.result)
        return res.result
    })
}

export async function apiHistoryCount(event) {
    return await wx.cloud.callFunction({
        name: "history",
        data: {
            action: "count",
        }
    }).then(res => {
        console.log("调用apiHistoryCount云函数成功:", res.result)
        return res.result
    })
}