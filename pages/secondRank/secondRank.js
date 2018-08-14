// pages/secondRank/secondRank.js
const app = getApp()


Page({
    /** 
     * 自定义事件
     */
    //点击更多
    ontapmore(options) {
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
    closeAuthorize() {
        this.setData({
            goAuthorize: false
        })
    },
    //去授权
    goAuthorize() {
        this.setData({
            goAuthorize: true
        })
    },
    //添加元素--打开popup
    addelement() {
        if (app.token) {
            this.setData({
                popupType: 'addElement',
                popupSize: 'large',
                canScroll: false,
                activePopup: true
            })
        } else {
            this.goAuthorize()
        }
    },
    setNewElementName(e) {
        this.setData({
            newElementName: e.detail.value
        })
    },
    setElementImg(e) {
        this.setData({
            imgFile: e.detail.tempFiles[0]
        })
    },
    setElementDesc(e) {
        this.setData({
            newElementDesc: e.detail.value
        })
    },
    submitadd(e) {
        if (e.detail.bindItem.length > 0) {
            let list = e.detail.bindItem
            let arr = [],
                str = '';
            for (let i = 0; i < list.length; i++) {
                arr.push(list[i].id)
            }
            str = arr.join(',')
            let params = {
                ranking_id: this.data.secondId,
                list: str
            }
            if (!this.data.imgFile) {
                app._ajax().bindElement(params, res => {
                    wx.showToast({
                        title: res.message
                    })
                    this.refreshArea(res => {
                        this.setData({
                            subElement: res.data.data.data
                        })
                    })
                    this.closePopup()
                })
            } else {
                let path = this.data.imgFile.path
                app.qiniuSDK.upload(path, complete => {
                    params.img = app.qiniuPrefix + complete.imageURL
                    app._ajax().bindElement(params, res => {
                        wx.showToast({
                            title: res.message
                        })
                        this.refreshArea(res => {
                            this.setData({
                                subElement: res.data.data.data
                            })
                        })
                        this.closePopup()
                    })
                })
            }

        } else {
            if (!this.data.newElementName || this.data.newElementName.length <= 0) {
                wx.showToast({
                    title: '请输入元素名称'
                })
            } else {
                if (this.data.imgFile) {
                    let path = this.data.imgFile.path
                    qiniuSDK.upload(path, complete => {
                        let params = {
                            ranking_id: this.data.secondId,
                            element_name: this.data.newElementName,
                            element_desc: this.data.newElementDesc || '',
                            img: app.qiniuPrefix + complete.imageURL
                        }
                        app._ajax().addElement(params, res => {
                            if (res.status_code == 1) {
                                wx.showToast({
                                    title: res.message,
                                    icon: 'success'
                                })
                            } else {
                                wx.showToast({
                                    title: res.message
                                })
                            }
                            this.refreshArea(res => {
                                this.setData({
                                    subElement: res.data.data.data
                                })
                            })
                            this.closePopup()
                        })
                    })
                } else {
                    let params = {
                        ranking_id: this.data.secondId,
                        element_name: this.data.newElementName,
                        element_desc: this.data.newElementDesc || ''
                    }
                    app._ajax().addElement(params, res => {
                        if (res.status_code == 1) {
                            wx.showToast({
                                title: res.message,
                                icon: 'success'
                            })
                        } else {
                            wx.showToast({
                                title: res.message
                            })
                        }
                        this.closePopup()
                    })
                }
            }
        }



    },
    //获取评论
    getDiscuss() {
        app._ajax().getSecondDiscuss(this.data.secondId, res => {
            this.setData({
                discussData: res.data,
                discussList: res.data.data
            })
        })
    },
    //添加评论
    addDiscuss() {
        if (app.token) {
            this.setData({
                popupType: 'addDiscuss',
                popupSize: 'large',
                canScroll: false,
                activePopup: true
            })
        } else {
            this.goAuthorize()
        }
    },
    setDiscussValue(e) {
        this.setData({
            discussValue: e.detail
        })
    },
    submitDiscuss(e) {
        let params = {
            comment_type: 2,
            type: 1,
            ranking_id: this.data.secondId
        }
        if (e.detail) {
            params.content = e.detail
        } else {
            params.content = this.data.discussValue
        }
        app._ajax().addDiscuss(params, res => {
            wx.showToast({
                title: res.message,
            })

            this.closePopup()
            this.getDiscuss()
        })
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
    report() {
        this.setData({
            canScroll: true,
            popupSize: '',
            popupType: '',
            activePopup: false
        })
        setTimeout(function() {
            this.setData({
                popupType: 'report',
                popupSize: 'large',
                canScroll: false,
                activePopup: true
            })
        }.bind(this), 300)
    },
    listToInvite() {
        if (app.token) {
            this.setData({
                popupType: 'invite',
                popupSize: 'large',
                canScroll: false,
                activePopup: true
            })
        } else {
            this.goAuthorize()
        }
    },
    tabItemClick() {
        wx.reLaunch({
            url: '/pages/index/index',
        })
    },
    opendetail() {
        this.setData({
            popupType: 'detail',
            popupSize: 'large',
            canScroll: false,
            activePopup: true
        })
    },
    refreshArea(success) {
        this.setData({
            crtPage: 1
        })
        app._ajax().getSecondRankDetails({
            level: 2,
            id: this.data.secondId,
            page: 1,
            solt_name: this.data.solt_name
        }, res => {
            success(res)
        })
    },
    /**
     * 页面的初始数据
     */
    data: {
        tabBarList: [{
            label: '首页',
            iconValue: 'icon-zhuye'
        }],
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
        subElement: [],
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
        ],
        activeHeaderInfo: {},
        goAuthorize: false,
        crtPage: 1,
        solt_name: 'created_at',
        totalPage: 1,
        fatherRank: {},
        discussValue: '',
        discussData: {},
        discussList: [],
        isCollected: false

    },
    loadNextPage() {
        if (this.data.totalPage >= this.data.crtPage) {
            this.getSecondInfo()
        } else {
            return
        }
    },
    getSecondInfo() {
        app._ajax().getSecondRankDetails({
            level: 2,
            id: this.data.secondId,
            page: this.data.crtPage,
            solt_name: this.data.solt_name
        }, res => {
            let collect = false;
            if (res.data.collect == 0) {
                collect = false;
            } else {
                collect = true;
            }
            this.setData({
                isCollected: collect,
                //详情页数据
                detailInfo: {
                    title: res.data.ranking_name,
                    desc: res.data.ranking_desc,
                    img: res.data.img
                },
                //榜单基本信息
                headerData: {
                    flag: '#',
                    title: res.data.ranking_name,
                    desc: res.data.ranking_desc,
                    rating: res.data.rating,
                    vote: res.data.vote,
                    childrenNum: res.data.data.total
                },
                //榜单子元素集合--数组
                subElement: this.data.subElement.concat(res.data.data.data),
                //最后一条元素
                lastElement: res.data.last,
                activeHeaderInfo: {
                    parent: this.data.fatherRank,
                    son: {
                        num: res.data.data.total
                    }
                },
                //加载当前页码
                crtPage: res.data.data.current_page + 1,
                totalPage: res.data.data.last_page
            })
        })
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
            canScroll: true,
            fatherRank: JSON.parse(options.first)
        })
        this.getSecondInfo()
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