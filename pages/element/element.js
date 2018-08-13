// pages/element/element.js
const app = getApp()
Page({
    opendetail() {
        this.setData({
            activePopup: true,
            popupType: 'detail',
            popupSize: 'large',
            canScroll: false
        })
    },
    addpost() {
        this.setData({
            activePopup: true,
            popupType: 'addPost',
            popupSize: 'large',
            canScroll: false
        })
    },
    submitadd(e) {
        console.log(e)
    },
    closePopup() {
        const $popup = this.selectComponent('#popup')
        $popup.cancle()
        setTimeout(function() {
            this.setData({
                popupSize: '',
                popupType: '',
                canScroll: true,
                activePopup: false
            })
        }.bind(this), 220)
    },
    tapMoreItem(e) {
        let result = e.detail.result
        this[result]()
    },
    ontapmore() {
        if (app.token) {
            this.setData({
                canScroll: false,
                activePopup: true,
                popupSize: 'small',
                popupType: 'more'
            })
        } else {
            this.goAuthorize()
        }
    },
    report() {
        this.setData({
            canScroll: true,
            popupSize: '',
            popupType: '',
            activePopup: false
        })
        setTimeout(function() {
            this.setData({
                canScroll: true,
                popupType: 'report',
                popupSize: 'large',
                activePopup: true
            })
        }.bind(this), 300)
    },
    /**
     * 页面的初始数据
     */
    data: {
        headerData: {},
        neckData: [],
        postList: {},
        activePopup: false,
        popupType: '',
        popupSize: '',
        moreItems: [{
            label: '举报',
            result: 'report'
        }],
        isCollected: false,
        goAuthorize: false,
        elementId: '',
        canScroll: true
    },
    goAuthorize() {
        this.setData({
            goAuthorize: true
        })
    },
    closeAuthorize() {
        this.setData({
            goAuthorize: false
        })
    },
    submitReport() {

    },
    vote() {
        app._ajax().vote(this.data.elementId, res => {
            wx.showToast({
                title: res.message,
            })
            app._ajax().getElementDetails({
                id: this.data.elementId,
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
                    }
                })
            })
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        app._ajax().getElementDetails({
            id: options.elementId,
            page: 1,
            solt_name: 'created_at'
        }, res => {
            let collect = false;
            if (res.data.collect == 0) {
                collect = false;
            } else {
                collect = true;
            }
            this.setData({
                elementId: options.elementId,
                detailInfo: {
                    title: res.data.element_name,
                    desc: res.data.element_desc,
                    img: res.data.img
                },
                headerData: {
                    flag: '@',
                    title: res.data.element_name,
                    desc: res.data.element_desc,
                    img: res.data.img,
                    vote: res.data.vote,
                    vote_user: res.data.vote_user
                },
                neckData: res.data.ranking_p,
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