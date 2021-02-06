const db = wx.cloud.database()
const _ = db.command

export async function apiReportCreate(event) {
    return await wx.cloud.callFunction({
        name: "report",
        data: {
            action: "create",
        }
    }).then(res => {
        console.log("调用apiReportCreate云函数成功:", res.result)
        return res.result
    })
}