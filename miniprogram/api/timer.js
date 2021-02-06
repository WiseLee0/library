const db = wx.cloud.database()
const _ = db.command
export async function apiTimerRemove(event) {
    return await wx.cloud.callFunction({
        name: "timer",
        data: {
            action: "remove"
        }
    }).then(res => {
        console.log("调用apiTimerRemove云函数成功:", res.result)
        return res.result
    })
}