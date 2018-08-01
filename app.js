/*Created By Jsir on 2018/7/26*/
const api = require('./api/api.js')
'use strict'
App({
    onLaunch() {
        wx.login({
            success: res => {
                // 发送 res.code 到后台换取 openId, sessionKey, unionId
            }
        })
        wx.getSetting({
            success: res => {
                if (res.authSetting['scope.userInfo']) {
                    console.log('已经授权');
                    wx.getUserInfo({
                        success: res => {
                            this.data_g.userInfo = res.userInfo
                        }
                    })
                    if (this.userInfoReadyCallback) {
                        this.userInfoReadyCallback(res)
                    }
                } else {
                    console.log('未授权');
                }
            }
        })
        //获取一级榜单列表
        api.getFirstRanking()
    },
    data_g: {
        userInfo: null
    }

})