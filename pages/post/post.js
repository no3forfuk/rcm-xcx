// pages/post/post.js
const WxParse = require('../../wxParse/wxParse.js');
const app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        showTabbar: true,
        goAuthorize: false,
        createUser: {},
        postInfo: {},
        discussList: [],
        tabBarList: [{
            label: '首页',
            result: 'goHome',
            iconValue: 'icon-zhuye'
        }, {
            label: '评论',
            result: 'addDiscuss',
            iconValue: 'icon-edit'
        }],
        activePopup: false,
        postId: '',
        discussValue: ''
    },
    tabItemClick(e) {
        let func = e.detail.result
        this[func]()
    },
    closeAuthorize() {
        this.setData({
            goAuthorize: false
        })
    },
    postScroll(e) {
        let direction = e.detail.deltaY
        let top = e.detail.scrollTop
        if (top < 46) {
            this.setData({
                showTabbar: true
            })
        } else {
            if (direction > 0) {
                //向上
                this.setData({
                    showTabbar: true
                })
            } else {
                //向下
                this.setData({
                    showTabbar: false
                })
            }
        }
    },
    goauth() {
        this.setData({
            goAuthorize: true
        })
    },
    goHome() {
        wx.reLaunch({
            url: '/pages/index/index',
        })
    },
    addDiscuss() {
        if (app.token) {
            this.setData({
                activePopup: true
            })
        } else {
            this.setData({
                goAuthorize: true
            })
        }

    },
    closePopup() {
        const $popup = this.selectComponent('#popup')
        $popup.cancle()
        setTimeout(function() {
            this.setData({
                activePopup: false
            })
        }.bind(this), 220)
    },
    setDiscussValue(e) {
        this.setData({
            discussValue: e.detail
        })
    },
    submitDiscuss(e) {
        let params = {
            comment_type: 3,
            type: 1,
            post_id: this.data.postId
        }
        if (e.detail) {
            params.content = e.detail
        } else {
            params.content = this.data.discussValue
        }
        app._ajax().addDiscuss(params, res => {
            wx.showToast({
                title: res.message,
                mask: true
            })

            this.closePopup()
            this.getDiscuss()
        })
    },
    likeComplete() {

    },
    getDiscuss() {
        app._ajax().getPostDiscuss(this.data.postId, res => {
            this.setData({
                discussList: res.data.data
            })
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        this.setData({
            postId: options.postId
        })
        app._ajax().getPostDetails(options.postId, res => {
            wx.setNavigationBarTitle({
                title: res.data.element_name
            })
            let that = this;
            if (res.data.type == 5) {
                this.setData({
                    postInfo: res.data
                })
                wx.request({
                    url: 'http://www.962.net/wz/169885.html',
                    success: res => {
                        console.log(res)
                    }
                })
            } else {
                let content = res.data.post_content
                // content = content.replace("http://", "https://")
                WxParse.wxParse('content', 'html', content, that)
                this.setData({
                    createUser: res.data.user,
                    postContent: content,
                    postInfo: res.data
                })
            }
        })
        app._ajax().getPostDiscuss(options.postId, res => {
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