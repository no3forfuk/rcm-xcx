// pages/element/element.js
const app = getApp()
Page({
    opendetail() {
        this.setData({
            activePopup: true,
            popupType: 'detail',
            popupSize: 'large'
        })
    },
    addpost() {
        this.setData({
            activePopup: true,
            popupType: 'addPost',
            popupSize: 'large'
        })
    },
    submitadd() {

    },
    closePopup() {
        const $popup = this.selectComponent('#popup')
        $popup.cancle()
        setTimeout(function() {
            this.setData({
                popupSize: '',
                popupType: '',
                activePopup: false
            })
        }.bind(this), 220)
    },
    tapMoreItem(e) {
        let result = e.detail.result
        this[result]()
    },
    ontapmore() {
        this.setData({
            activePopup: true,
            popupSize: 'small',
            popupType: 'more'
        })
    },
    report() {

    },
    /**
     * 页面的初始数据
     */
    data: {
        headerData: {},
        postList: {},
        activePopup: false,
        popupType: '',
        popupSize: '',
        moreItems: [{
            label: '举报',
            result: 'report'
        }]
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        app._ajax().getElementDetails({
            id: options.elementId,
            page: 1,
            solt_name: 'exponent'
        }, res => {
            this.setData({
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