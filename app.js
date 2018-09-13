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
        const updateManager = wx.getUpdateManager()
        updateManager.onCheckForUpdate(function(res) {
            // 请求完新版本信息的回调
            if (res.hasUpdate) {
                updateManager.onUpdateReady(function() {
                    wx.showModal({
                        title: '更新提示',
                        showCancel: false,
                        content: '新版本已经准备好，请重启应用？',
                        success: function(res) {
                            if (res.confirm) {
                                // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
                                updateManager.applyUpdate()
                            }
                        }
                    })
                })
            } else {
                return
            }
        })
        // 获取授权状态
        wx.getSetting({
            success: res => {
                if (res.authSetting['scope.userInfo']) {
                    // 已经授权
                    //获取token
                    const token = wx.getStorageSync('token')
                    if (token) {
                        //判断token是否过期
                        api(token).getSelfInfo(res => {
                            if (res.status_code == 1) {
                                this.token = token
                            } else {
                                this.userEntry()
                            }
                        })
                    } else {
                        this.userEntry()
                    }
                } else {
                    //未授权
                }
            }
        })
        //获取用户手机信息
        wx.getSystemInfo({
            success: res => {
                this.phone = res
            }
        })
        api().getswitch(res => {
            const _switch = res.data
            const obj = _switch.find(function(item) {
                return item.config_name == '小程序发布内容开关'
            })
            this.globalData.switch = obj
        })
    },
    userEntry() {
        wx.getUserInfo({
            success: infores => {
                const infoData = {
                    encryptedData: infores.encryptedData,
                    iv: infores.iv
                }
                wx.login({
                    success: loginres => {
                        const options = {
                            ...infoData,
                            code: loginres.code
                        }
                        api().login(options, rcmres => {
                            this.token = rcmres.data.token.access_token
                            wx.setStorageSync('token', rcmres.data.token.access_token)
                            this.globalData.userInfo = rcmres.data.user
                        })
                    }
                })
            }
        })
    },
    qiniuPrefix: 'http://p8rk87lub.bkt.clouddn.com/',
    qiniuSDK: qiniuSDK,
    globalData: {
        userInfo: {},
        scrollY: true,
        switch: null
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