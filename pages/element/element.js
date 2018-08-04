// pages/element/element.js
const api = require('../../api/api.js')
Page({

    /**
     * 页面的初始数据
     */
    data: {
        headerData: {},
        postList: {}
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        api.getElementDetails({
            id: options.elementId,
            page: 1,
            solt_name: 'exponent'
        }, res => {
            this.setData({
                headerData: {
                    flag: '@',
                    title: res.data.element_name,
                    desc: res.data.element_desc,
                    img: res.data.img,
                    vote: res.data.vote,
                    vote_user: res.data.vote_user
                },
                collectParams: {
                    element_id: options.elementId
                },
                postList: res.data.data
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