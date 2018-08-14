// pages/myMessage/myMessage.js
const app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        tabHeaderData: [{
                label: '全部',
                type: 'all'
            },
            {
                label: '评论',
                type: 2
            },
            {
                label: '建榜',
                type: 1
            },
            {
                label: '调查',
                type: 3
            },
            {
                label: '帖子',
                type: 4
            }
        ],
        scrollHeight: '',
        scrollHeightNum: 0,
        noticeList: []
    },
    tabchange(options) {
        let noticeType = options.detail.item.type
        app._ajax().getnotice(noticeType, res => {
            if (res.data) {
                this.setData({
                    noticeList: res.data
                })
            } else {
                this.setData({
                    noticeList: []
                })
            }
        })
    },
    readNotice(e) {
        let id = e.currentTarget.dataset.id
        app._ajax().readnotice(id, res => {
            app._ajax().getnotice('all', res => {
                this.setData({
                    noticeList: res.data
                })
            })
        })
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
        let windowY = wx.getSystemInfoSync().windowHeight
        const query = wx.createSelectorQuery()
        query.select('.tab-body-scroll').boundingClientRect()
        query.exec(res => {
            let num = windowY - res[0].top
            this.setData({
                scrollHeight: 'height:' + num + 'px;',
                scrollHeightNum: num
            })
        })
    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function() {
        app._ajax().getnotice('all', res => {
            this.setData({
                noticeList: res.data
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