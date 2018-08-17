// components/authorize/authorize.js
const app = getApp();
const api = require('../../api/api.js')
Component({
    /**
     * 组件的属性列表
     */
    properties: {

    },

    /**
     * 组件的初始数据
     */
    data: {

    },
    attached() {
        var animation = wx.createAnimation({
            duration: 200,
            timingFunction: 'ease',
        })
        animation.scale(1.2, 1.2).step()
        this.setData({
            animationData: animation.export()
        })
        setTimeout(function() {
            animation.scale(1).step()
            this.setData({
                animationData: animation.export()
            })
        }.bind(this), 200)
    },
    detached() {

    },
    /**
     * 组件的方法列表
     */
    methods: {
        getUserInfo() {
            wx.getUserInfo({
                success: res => {
                    let options = {
                        encryptedData: res.encryptedData,
                        iv: res.iv
                    }
                    wx.login({
                        success: res => {
                            options.code = res.code
                            api().login(options, success => {
                                this.triggerEvent('successCallBack')
                                app.token = success.data.token.access_token
                                app._ajax(success.data.token.access_token).getSelfInfo(res => {
                                    app.globalData.userInfo = res.data
                                    this.cancelAuthorize()
                                })
                            })
                        }
                    })
                }
            })
        },
        cancelAuthorize() {
            this.triggerEvent('closeAuthorize')
        }
    }
})