//获取应用实例
const app = getApp()
const api = require('../../api/api.js')
Page({

    /**
     * 自定义事件
     */
    getUserInfo(e) {
        app.data_g.userInfo = e.detail.userInfo
    },
    link2SecondRank() {
        wx.navigateTo({
            url: '/pages/secondRank/secondRank'
        })
    },
    /**
     * 页面的初始数据
     */
    data: {
        tabBarList: [{
                label: '首页'
            },
            {
                label: '个人中心'
            }
        ],
        rankData: []
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        api.getIndexRanking('2018-07-31', res => {
            this.setData({
                rankData: res.data
            })
        })
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady() {
        let windowY = wx.getSystemInfoSync().windowHeight
        const query = wx.createSelectorQuery()
        query.select('.index-scroll-view').boundingClientRect()
        query.exec(res => {
            this.setData({
                scrollHeight: 'height:' + (windowY - res[0].top) + 'px;'
            })
        })

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow() {

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