//获取应用实例
const app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        user: {},
        tabBarList: [{
            label: '首页',
            iconValue: 'icon-zhuye'
        }],
        activePopup: false,
        popupSize: ''
    },
    tabItemClick() {
        wx.reLaunch({
            url: '/pages/index/index',
        })
    },
    editUserInfo() {
        wx.navigateTo({
            url: '/pages/editInfo/editInfo',
        })
    },
    addRank() {
        this.setData({
            popupSize: 'large',
            popupType: 'addRank',
            activePopup: true
        })
    },
    submitadd() {

    },
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
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {

    },
    goMyMessage() {
        wx.navigateTo({
            url: '/pages/myMessage/myMessage',
        })
    },
    goMyRank() {
        wx.navigateTo({
            url: '/pages/myRank/myRank',
        })
    },
    goMyCollect() {
        wx.navigateTo({
            url: '/pages/myCollect/myCollect',
        })
    },
    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady() {
        app._ajax().getSelfInfo(res => {
            app.globalData.userInfo = res.data
            this.setData({
                user: res.data
            })
        })
    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow() {
        this.setData({
            user: app.globalData.userInfo
        })
    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide() {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload() {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh() {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom() {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage() {

    }
})