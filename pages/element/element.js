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
        if (app.token) {
            this.setData({
                activePopup: true,
                popupType: 'addPost',
                popupSize: 'large',
                canScroll: false
            })
        } else {
            this.goAuthorize()
        }
    },
    linkToSecond(e) {
        wx.navigateTo({
            url: '/pages/secondRank/secondRank?secondId=' + e.currentTarget.dataset.id + '&first={}'
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
    refreshSubPost() {
        app._ajax().getElementDetails({
            id: this.data.elementId,
            page: 1,
            solt_name: 'created_at'
        }, res => {
            this.setData({
                postList: res.data.data.data
            })
        })
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
    tabItemClick() {
        wx.reLaunch({
            url: '/pages/index/index',
        })
    },
    data: {
        tabBarList: [{
            label: '首页',
            iconValue: 'icon-zhuye'
        }],
        headerData: {},
        neckData: [],
        postList: [],
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
        canScroll: true,
        showActiveHeader: false,
        currentPage: 1,
        totalPage: 1,
        showTabbar: true
    },
    hideorshowActiveHeader(e) {
        let top = e.detail.scrollTop;
        let direction = e.detail.deltaY
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
        if (top < 127) {
            this.setData({
                showActiveHeader: false
            })
        } else {
            this.setData({
                showActiveHeader: true
            })
        }
    },
    loadNextPage() {
        if (this.data.totalPage >= this.data.currentPage) {
            app._ajax().getElementDetails({
                id: this.data.elementId,
                page: this.data.currentPage,
                solt_name: 'created_at'
            }, res => {
                let list0 = this.data.postList
                let list = res.data.data.data
                list0 = list0.concat(list)
                this.setData({
                    currentPage: res.data.data.current_page + 1,
                    postList: list0,
                    totalPage: res.data.data.last_page
                })
            })
        } else {
            return
        }
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
        if (app.token) {
            app._ajax().vote(this.data.elementId, res => {
                wx.showToast({
                    title: res.message,
                    mask:true
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
        } else {
            this.setData({
                goAuthorize: true
            })
        }

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
            wx.setNavigationBarTitle({
                title: res.data.element_name
            })
            let collect = false;
            if (res.data.collect && res.data.collect == 1) {
                collect = true;
            } else {
                collect = false;
            }
            this.setData({
                elementId: options.elementId,
                isCollected: collect,
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
                    vote_user: res.data.vote_user,
                    isCollect: collect,
                    id: options.elementId
                },
                neckData: res.data.ranking_p,
                collectParams: {
                    element_id: options.elementId
                },
                postList: res.data.data.data,
                currentPage: res.data.data.current_page + 1,
                totalPage: res.data.data.last_page
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
        app._ajax().getElementDetails({
            id: this.data.elementId,
            page: 1,
            solt_name: 'created_at'
        }, res => {
            this.setData({
                postList: res.data.data.data,
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