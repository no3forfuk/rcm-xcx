/*Created By Jsir on 2018/7/26*/
const api = require('./api/api.js')
'use strict'
App({
    _ajax() {
        return api(this.token)
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
    authorize: {},
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