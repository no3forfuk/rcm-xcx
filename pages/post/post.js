// pages/post/post.js
const api = require('../../api/api.js')
const WxParse = require('../../wxParse/wxParse.js');
Page({

    /**
     * 页面的初始数据
     */
    data: {
        createUser: {},
        postInfo: {},
        discussList: []
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        api.getPostDetails(options.postId, res => {
            let that = this;
            WxParse.wxParse('content', 'html', res.data.post_content, that)
            this.setData({
                createUser: res.data.user,
                postContent: res.data.post_content,
                postInfo: res.data
            })
        })
        api.getPostDiscuss(options.postId, res => {
            let discussArr = res.data.data
            if (discussArr.length > 0) {
                for (let i = 0; i < discussArr.length; i++) {
                    let user = {}
                    if (discussArr[i].user_type == 2) {
                        user = {
                            name: discussArr[i].visitor.area + '猎人',
                            avatar: 'http://p8rk87lub.bkt.clouddn.com/visitor.jpg'
                        }
                        delete discussArr[i].visitor
                    } else if (discussArr[i].user_type == 1) {
                        user = discussArr[i].user
                        delete discussArr[i].visitor
                    }
                    discussArr[i].user = user
                }
            }
            this.setData({
                discussList: discussArr
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