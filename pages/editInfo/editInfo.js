// pages/editInfo/editInfo.js
const app = getApp()
// const qiniuSDK = require('../../static/vonder/qiniuUploader.js')

// function init7niu() {
//     app._ajax().get7niuToken(res => {
//         let token = res.data.qiniu_token
//         let url = `https://up-z2.qbox.me`
//         let options = {
//             uptoken: token,
//             uploadURL: url,
//             region: 'SCN'
//         }
//         qiniuSDK.init(options)
//     })
// }
// init7niu()
Page({
    closePopup() {
        const $popup = this.selectComponent('#popup')
        $popup.cancle()
        setTimeout(function() {
            this.setData({
                popupSize: '',
                popupType: '',
                activePopup: false
            })
        }.bind(this), 220)
    },
    editPhoto() {
        wx.chooseImage({
            count: 1,
            success: res => {
                let path = res.tempFiles[0].path
                app.qiniuSDK.upload(path, complete => {
                    let params = {}
                    params.avatar = app.qiniuPrefix + complete.imageURL
                    params.avatar_key = complete.key
                    app._ajax().editSelfInfo(params, res => {
                        wx.showToast({
                            title: res.message
                        })
                        app._ajax().getSelfInfo(res => {
                            this.setData({
                                user: res.data
                            })
                            app.globalData.userInfo = res.data
                        })
                    })
                })
            },
        })
    },
    checkId() {
        this.setData({
            activePopup: true,
            popupSize: 'large',
            popupType: 'checkId'
        })
    },
    editFav(e) {
        let index = e.detail.value
        let id = this.data.firstArray[index].id
        let params = {
            expert: id
        }
        app._ajax().editSelfInfo(params, res => {
            wx.showToast({
                title: res.message
            })
            app._ajax().getSelfInfo(res => {
                this.setData({
                    user: res.data
                })
                app.globalData.userInfo = res.data
            })
        })
    },
    editSign() {
        this.setData({
            activePopup: true,
            popupSize: 'large',
            popupType: 'editSign'
        })
    },
    setSignValue(e) {
        this.setData({
            signContent: e.detail.value
        })
    },
    submitEditSign() {
        let params = {
            signature: this.data.signContent
        }
        app._ajax().editSelfInfo(params, res => {
            wx.showToast({
                title: res.message
            })
            this.closePopup()
            app._ajax().getSelfInfo(res => {
                this.setData({
                    user: res.data
                })
                app.globalData.userInfo = res.data
            })
        })
    },
    inputDone(e) {
        let params = {
            signature: e.detail.value
        }
        app._ajax().editSelfInfo(params, res => {
            wx.showToast({
                title: res.message
            })
            this.closePopup()
            app._ajax().getSelfInfo(res => {
                this.setData({
                    user: res.data
                })
                app.globalData.userInfo = res.data
            })
        })
    },
    /**
     * 页面的初始数据
     */
    data: {
        activePopup: false,
        firstArray: [],
        signContent: ''
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {

    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function() {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function() {
        let user = app.globalData.userInfo
        this.setData({
            user: user
        })
        app._ajax().getFirstRanking(res => {
            this.setData({
                firstArray: res.data.data
            })
        })
    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function() {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function() {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function() {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function() {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function() {

    }
})