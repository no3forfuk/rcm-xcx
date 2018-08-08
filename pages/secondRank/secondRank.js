// pages/secondRank/secondRank.js
const api = require('../../api/api.js')
const app = getApp()
Page({
    /** 
     * 自定义事件
     */
    //点击更多
    ontapmore(options) {
        this.setData({
            canScroll: false,
            activePopup: true,
            popupSize: 'small',
            popupType: 'more'
        })
    },
    //切换tab页签
    tabchange(options) {
        this.setData({
            subType: options.detail.index
        })
    },
    //关闭popup
    closePopup() {
        const $popup = this.selectComponent('#popup')
        $popup.cancle()
        setTimeout(function() {
            this.setData({
                canScroll: true,
                popupSize: '',
                popupType: '',
                activePopup: false
            })
        }.bind(this), 220)

    },
    //添加元素--打开popup
    addelement() {
        this.setData({
            popupType: 'addElement',
            popupSize: 'large',
            canScroll: false,
            activePopup: true
        })
    },
    //添加评论
    addDiscuss() {
        this.setData({
            popupType: 'addDiscuss',
            popupSize: 'large',
            canScroll: false,
            activePopup: true
        })
    },
    submitadd() {
        console.log('添加元素')
    },
    submitDiscuss() {
        console.log('评论')
    },
    submitInvite() {
        console.log('邀请')
    },
    tapMoreItem(e) {
        let result = e.detail.result
        this[result]()
    },
    invite() {
        this.setData({
            canScroll: true,
            popupSize: '',
            popupType: '',
            activePopup: false
        })
        setTimeout(function() {
            this.setData({
                popupType: 'invite',
                popupSize: 'large',
                canScroll: false,
                activePopup: true
            })
        }.bind(this), 300)
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
        activePopup: false,
        subType: 0,
        subElement: {},
        lastElement: {},
        secondId: '',
        largePopupAnimation: {},
        popupType: '',
        popupSize: '',
        moreItems: [{
                label: '邀请添加排名',
                result: 'invite'
            },
            {
                label: '举报',
                result: 'report'
            }
        ]
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        this.setData({
            //榜单id
            secondId: options.secondId,
            //收藏榜单所需参数
            collectParams: {
                ranking_id: options.secondId,
            },
            //是否可以滚动
            canScroll: true
        })
        api.getSecondRankDetails({
            level: 2,
            id: options.secondId,
            page: 1,
            solt_name: 'created_at'
        }, res => {
            this.setData({
                //榜单基本信息
                headerData: {
                    flag: '#',
                    title: res.data.ranking_name,
                    desc: res.data.ranking_desc,
                    rating: res.data.rating,
                    vote: res.data.vote,
                    childrenNum: res.data.data.total
                },
                //榜单子元素集合
                subElement: res.data.data,
                //最后一条元素
                lastElement: res.data.last
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