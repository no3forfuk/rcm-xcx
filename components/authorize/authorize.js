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

    /**
     * 组件的方法列表
     */
    methods: {
        getUserInfo() {
            this.triggerEvent('closeAuthorize')
            wx.getUserInfo({
                success: res => {
                    app.globalData.userInfo = res.userInfo
                    let options = {
                        encryptedData: res.encryptedData,
                        iv: res.iv
                    }
                    wx.login({
                        success: res => {
                            options.code = res.code
                            api().login(options, success => {
                                app.token = success.data.token.access_token
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