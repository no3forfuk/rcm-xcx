// pages/secondRank/secondRank.js
const app = getApp()


Page({
    /** 
     * 自定义事件
     */
    onsecondscroll(e) {
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
    sortElementByType(e) {
        let sortType = e.detail.type
        let a = '';
        if (sortType == 'hot') {
            a = 'exponent'
        } else {
            a = 'created_at'
        }
        this.setData({
            elementList: {
                currentPage: 1,
                totalPage: 1,
                sortType: a,
                items: []
            }
        })
        this._getSecondRankDetail(res => {
            //子元素
            this._setSubElement(res)
        })
    },
    /**
     * 更多操作
     */
    ontapmore(options) {
        if (app.token) {
            this.setData({
                popup: {
                    show: true,
                    type: 'more',
                    size: 'small'
                }
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
                        title: res.message,
                        mask:true
                    })
                    const $list = this.selectComponent('#second-list')
                    $list.selectSlotComplete('new')
                    this.onclosepopup()
                })
            } else {
                let path = this.data.imgFile.path
                app.qiniuSDK.upload(path, complete => {
                    params.img = app.qiniuPrefix + complete.imageURL
                    app._ajax().bindElement(params, res => {
                        wx.showToast({
                            title: res.message,
                            mask:true
                        })
                        const $list = this.selectComponent('#second-list')
                        $list.selectSlotComplete('new')
                        this.onclosepopup()
                    })
                })
            }

        } else {
            if (!this.data.newElementName || this.data.newElementName.length <= 0) {
                wx.showToast({
                    title: '请输入元素名称',
                    mask:true
                })
            } else {
                if (this.data.imgFile) {
                    let path = this.data.imgFile.path
                    app.qiniuSDK.upload(path, complete => {
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
                                    icon: 'success',
                                    mask:true
                                })
                                wx.navigateTo({
                                    url: `/pages/element/element?elementId=${res.data.id}`,
                                })
                            } else {
                                wx.showToast({
                                    title: res.message,
                                    mask:true
                                })
                            }
                            this.onclosepopup()
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
                                icon: 'success',
                                mask:true
                            })
                            wx.navigateTo({
                                url: `/pages/element/element?elementId=${res.data.id}`,
                            })
                        } else {
                            wx.showToast({
                                title: res.message,
                                mask:true
                            })
                        }
                        this.onclosepopup()
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
                popup: {
                    show: true,
                    type: 'addDiscuss',
                    size: 'large'
                }
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
                mask: true
            })
            const $discuss = this.selectComponent('#discuss')
            $discuss.getDiscuss()
            this.onclosepopup()
        })
    },
    submitInvite() {
        console.log('邀请')
    },

    invite() {
        this.setData({
            popup: {
                type: '',
                size: '',
                show: false
            }
        })
        setTimeout(function() {
            this.setData({
                popup: {
                    type: 'invite',
                    size: 'large',
                    show: true
                },
            })
        }.bind(this), 300)
    },
    report() {
        this.setData({
            popup: {
                type: '',
                size: '',
                show: false
            }
        })
        setTimeout(function() {
            this.setData({
                popup: {
                    type: 'report',
                    size: 'large',
                    show: true
                }
            })
        }.bind(this), 300)
    },
    listToInvite() {
        if (app.token) {
            this.setData({
                popup: {
                    type: 'invite',
                    size: 'large',
                    show: true
                }
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
            popup: {
                type: 'detail',
                size: 'large',
                show: true
            }
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
        subType: 0,
        secondId: '',
        goAuthorize: false,
        solt_name: 'created_at',
        discussValue: '',
        discussData: {},
        discussList: [],
        //footerText
        footerText: '每个榜单都有不同的玩法',
        showTabbar: true,
        //popup
        popup: {
            show: false,
            type: '',
            size: ''
        },
        //tab
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
        //排名
        elementList: {
            currentPage: 1,
            totalPage: 1,
            sortType: 'exponent',
            items: []
        },
        //更多
        moreItems: [{
                label: '邀请添加排名',
                result: 'invite'
            },
            {
                label: '举报',
                result: 'report'
            }
        ],
    },
    /**
     * 关闭弹窗
     */
    onclosepopup() {
        const $popup = this.selectComponent('#popup')
        $popup.cancle()
        setTimeout(function() {
            this.setData({
                popup: {
                    show: false,
                    type: '',
                    size: ''
                }
            })
        }.bind(this), 220)
    },
    /**
     * 加载下一页
     */
    onloadnextpage() {
        if (this.data.elementList.totalPage >= this.data.elementList.currentPage) {
            this._getSecondRankDetail(res => {
                this._setSubElement(res)
            })
        } else {
            return
        }
    },
    /**
     * 获取二级榜单详情
     */
    _getSecondRankDetail(success) {
        let params = {
            level: 2,
            id: this.data.secondId,
            page: this.data.elementList.currentPage,
            solt_name: this.data.elementList.sortType
        }
        app._ajax().getSecondRankDetails(params, res => {
            success(res.data)
        })
    },
    /**
     * 设置子元素
     */
    _setSubElement(res) {
        let arr = this.data.elementList.items
        arr = arr.concat(res.data.data)
        this.setData({
            elementList: {
                currentPage: res.data.current_page + 1,
                totalPage: res.data.last_page,
                items: arr,
                sortType: this.data.elementList.sortType
            }
        })
    },
    /**
     * 设置页面头部
     */
    _setPageHeader(res) {
        let collect = false;
        if (res.collect && res.collect == 1) {
            collect = true;
        } else {
            collect = false;
        }
        this.setData({
            headerInfo: {
                flag: '#',
                title: res.ranking_name,
                desc: res.ranking_desc,
                rating: res.rating,
                vote: res.vote,
                childrenNum: res.data.total,
                isCollect: collect,
                id: this.data.secondId
            }
        })
    },
    /**
     * 设置父榜单
     */
    _setParentData(res) {
        if (!res.ranking_p[0]) {
            this.setData({
                pageHeader: {
                    ranking: {
                        ranking_name: '其他',
                        id: 1
                    },
                    subNum: '99+'
                },
            })
        } else {
            this.setData({
                pageHeader: {
                    ranking: res.ranking_p[0],
                    subNum: res.data.total
                },
            })
        }
    },
    /**
     * 点击更多的单个项目
     */
    ontapmoreitem(e) {
        let result = e.detail.result
        this[result]()
    },
    /**
     * 添加榜单
     */
    onaddelement() {
        if (app.token) {
            this.setData({
                popup: {
                    show: true,
                    type: 'addElement',
                    size: 'large'
                }
            })
        } else {
            this.goAuthorize()
        }
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        //初始化基本数据
        this.setData({
            //二级榜单id
            secondId: options.secondId
        })
        this._getSecondRankDetail(res => {
            //页面title
            wx.setNavigationBarTitle({
                title: res.ranking_name
            });
            //详情页数据
            this.setData({
                detailInfo: {
                    title: res.ranking_name,
                    desc: res.ranking_desc,
                    img: res.img
                }
            });
            //页头
            this._setPageHeader(res)
            //父榜单---activeHeader
            this._setParentData(res)
            //子元素
            this._setSubElement(res)
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