/*
 * @Author: lh
 * @Date: 2020-08-26 13:29:22
 * @LastEditors: lh
 * @LastEditTime: 2020-08-26 13:30:25
 * @Description: 
 * @email: 3300536651@qq.com
 */
function takeScreenshot() {
    if (window.callPhantom) {
        var date = new Date()
        var filename = "screenshots/" + date.getTime()
        console.log("Taking screenshot " + filename)
        callPhantom({
            'screenshot': filename
        })
    }
}


takeScreenshot();