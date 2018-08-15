// pages/myCollect/myCollect.js
const app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        scrollHeight: '',
        tabHeaderData: [{
                label: '榜单',
                type: 1
            },
            {
                label: '元素',
                type: 2
            }
        ],
        collectList: [],
        renderType: 1
    },
    tabchange(options) {
        let _type = options.detail.item.type
        this.setData({
            renderType: _type
        })
        app._ajax().getuserCollect(_type, res => {
            if (res.data) {
                this.setData({
                    collectList: res.data
                })
            } else {
                this.setData({
                    collectList: []
                })
            }
        })
    },
    linkTo(e) {
        let id = e.currentTarget.dataset.id
        if (this.data.renderType == 1) {
            wx.navigateTo({
                url: '/pages/secondRank/secondRank?secondId=' + id
            })
        } else {
            wx.navigateTo({
                url: '/pages/element/element?elementId=' + id
            })
        }
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        app._ajax().getuserCollect(1, res => {
            if (res.data) {
                this.setData({
                    collectList: res.data
                })
            } else {
                this.setData({
                    collectList: []
                })
            }
        })
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function() {
        let windowY = wx.getSystemInfoSync().windowHeight
        const query = wx.createSelectorQuery()
        query.select('.tab-body-scroll').boundingClientRect()
        query.exec(res => {
            let num = windowY - res[0].top
            this.setData({
                scrollHeight: 'height:' + num + 'px;'
            })
        })
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