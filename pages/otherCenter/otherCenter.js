// pages/otherCenter/otherCenter.js
const app = getApp()
Page({
    focus() {
        app._ajax().takeFocus(this.data.user.id, res => {
            wx.showToast({
                title: res.message,
                mask:true
            })
            app._ajax().getOtherUserInfo(this.data.user.id, res => {
                this.setData({
                    user: res.data
                })
            })
        })
    },
    /**
     * 页面的初始数据
     */
    data: {
        user: {},
        tabHeaderData: [{
                label: '榜单',
                type: 1
            },
            {
                label: '动态',
                type: 2
            },
            {
                label: '收藏夹',
                type: 3
            }
        ],
        userDt: [],
        rankData: [],
        renderType: 1,
        collectSecond: [],
        collectElement: []
    },
    tabchange(e) {
        let type = e.detail.item.type
        this.setData({
            renderType: type
        })
    },
    linkToSecond(e) {
        let sid = e.currentTarget.dataset.sid
        wx.navigateTo({
            url: `/pages/secondRank/secondRank?secondId=${sid}`,
        })
    },
    linkToElement(e) {
        let eid = e.currentTarget.dataset.eid
        wx.navigateTo({
            url: `/pages/element/element?elementId=${eid}`,
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        let uid = options.uid
        app._ajax().getOtherUserInfo(uid, res => {
            this.setData({
                user: res.data,
                rankData: res.data.ranking,
                collectSecond: res.data.second_collect,
                collectElement: res.data.element_collect
            })
        })
        app._ajax().getuserDynamic(uid, res => {
            this.setData({
                userDt: res.data
            })
        })

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