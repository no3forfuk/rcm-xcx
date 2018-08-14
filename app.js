/*Created By Jsir on 2018/7/26*/
'use strict'
const api = require('./api/api.js')
const qiniuSDK = require('./static/vonder/qiniuUploader.js')

function init7niu() {
    api().get7niuToken(res => {
        let token = res.data.qiniu_token
        let url = `https://up-z2.qbox.me`
        let options = {
            uptoken: token,
            uploadURL: url,
            region: 'SCN'
        }
        qiniuSDK.init(options)
    })
}
init7niu()
App({
    _ajax(token) {
        if (this.token) {
            return api(this.token)
        } else {
            return api(token)
        }
    },
    onLaunch() {
        wx.getSetting({
            success: res => {
                if (res.authSetting['scope.userInfo']) {
                    // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
                    wx.getUserInfo({
                        success: res => {
                            this.authorize = res
                            let options = {
                                encryptedData: res.encryptedData,
                                iv: res.iv
                            }
                            wx.login({
                                success: res => {
                                    options.code = res.code
                                    api().login(options, success => {
                                        this.token = success.data.token.access_token
                                        this.globalData.userInfo = success.data.user
                                        this._ajax(success.data.token.access_token).getSelfInfo(res => {
                                            this.globalData.userInfo = res.data
                                        })
                                        if (this.initApi) {
                                            this.initApi()
                                        }
                                    })
                                }
                            })
                            this.globalData.userInfo = res.userInfo
                        }
                    })
                } else {
                    if (this.initApi) {
                        this.initApi()
                    }
                }
            }
        })
    },
    qiniuPrefix: 'http://p8rk87lub.bkt.clouddn.com/',
    qiniuSDK: qiniuSDK,
    globalData: {
        userInfo: {},
        scrollY: true
    },
    timeFormat(type, ms) {
        let time;
        if (ms) {
            time = new Date(ms);
        } else {
            time = new Date();
        }
        let mouth = time.getMonth() + 1;
        let day = time.getDate();
        if (mouth < 10) {
            mouth = '0' + mouth
        } else {
            mouth = mouth;
        }
        if (day < 10) {
            day = '0' + day
        } else {
            day = day
        }
        return time.getFullYear() + type + mouth + type + day;
    }
})