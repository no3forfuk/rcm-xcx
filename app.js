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
        // 获取授权状态
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
                            delete this.token
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
        //获取用户手机信息
        wx.getSystemInfo({
            success: res => {
                this.phone = res
            }
        })
    },
    qiniuPrefix: 'http://p8rk87lub.bkt.clouddn.com/',
    qiniuSDK: qiniuSDK,
    globalData: {
        userInfo: {},
        scrollY: true
    },
    phone: null,
    activity: {
        current: {
            url: 'http://p8rk87lub.bkt.clouddn.com/active-0806.png',
            text: '租房季',
            ranking: '公寓',
            rankingId: 15
        },
        _default: {
            url: 'http://p8rk87lub.bkt.clouddn.com/active-08-20.jpg',
            text: '招募体验官'
        }

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