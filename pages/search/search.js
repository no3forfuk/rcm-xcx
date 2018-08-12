// pages/search/search.js
const app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        haveResult: false,
        hotKey: [],
        searchResult: {},
        resultRank: [],
        resultElement: [],
        resultPost: []
    },
    submitSearch(e) {
        app._ajax().searchByKeyWords({
            type: 'all',
            search_key: e.detail.value
        }, res => {
            let postArr = []
            if (res.data.post.data.length > 0) {
                let arr = res.data.post.data
                let reg = /<[^>]+>|&[a-z]*;/g
                for (let i = 0; i < arr.length; i++) {
                    let text = arr[i].post_content.replace(reg, '')
                    arr[i].post_content = text
                }
                postArr = arr
            }
            this.setData({
                haveResult: true,
                resultRank: res.data.second.data,
                resultElement: res.data.element.data,
                resultPost: postArr,
            })
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        app._ajax().getHotKeyWords(res => {
            this.setData({
                hotKey: res.hot
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