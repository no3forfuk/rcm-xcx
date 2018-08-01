// pages/secondRank/secondRank.js
const api = require('../../api/api.js')
Page({


    /** 
     * 自定义事件
     */
    ontapmore(options) {
        this.setData({
            activePopup: true
        })
    },
    /**
     * 页面的初始数据
     */
    data: {
        secondRankData: {},
        headerData: {},
        collectParams: {},
        tabHeaderData: [{
                label: '排名'
            },
            {
                label: '讨论'
            },
            {
                label: '活动'
            }
        ],
        activePopup: false
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        api.getSecondRankDetails({
            level: 2,
            id: options.secondId,
            page: 1,
            solt_name: 'created_at'
        }, res => {
            this.setData({
                headerData: {
                    flag: '#',
                    title: res.data.ranking_name,
                    desc: res.data.ranking_desc,
                    rating: res.data.rating,
                    vote: res.data.vote,
                    childrenNum: res.data.data.total
                },
                collectParams: {
                    ranking_id: options.secondId,
                }
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