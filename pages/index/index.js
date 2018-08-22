//获取应用实例
const app = getApp()
Page({

    /**
     * 自定义事件
     */
    onauthorizesuccess() {
        let arr = getCurrentPages()
        let length = arr.length
        let router = arr[length - 1].route
        wx.redirectTo({
            url: `/${router}`,
        })
    },
    goauth() {
        this.setData({
            goAuthorize: true
        })
    },
    oncloseauth() {
        this.setData({
            goAuthorize: false
        })
    },
    /**
     * 页面的初始数据
     */
    data: {
        showTabbar: true,
        goAuthorize: false,
        tabBar: {
            show: true,
            list: [{
                label: '个人中心',
                iconValue: '个人资料.png'
            }]
        },
        footerText: '更多精彩内容，尽在RCM',
        scrollHeight: '',
        //顶部导航
        headerNav: [],
        indexType: 'hotRank',
        currentNavIndex: 0,
        //热榜
        hotRank: {
            currentPage: 1,
            items: []
        },
        //热帖
        hotPost: {
            currentPage: 1,
            items: []
        },
        //一级榜单
        firstRank: {
            currentPage: 1,
            id: 1,
            items: []
        },
    },
    /**
     * 设置首页列表滚动的固定高度
     */
    _setIndexScrollHeight() {
        let query = wx.createSelectorQuery()
        query.select('.index-scroll-view').boundingClientRect()
        let windowHeight = app.phone.windowHeight
        query.exec(res => {
            let detail = res[0]
            this.setData({
                scrollHeight: windowHeight - detail.top
            })
        })
    },
    /**
     * 获取顶部导航栏数据
     */
    _getFirstRankList(success) {
        app._ajax().getFirstRanking(res => {
            const result = res.data.data
            let arr = [{
                ranking_name: '热榜',
                id: 'hotRank'
            }, {
                ranking_name: '热帖',
                id: 'hotPost'
            }]
            arr = arr.concat(result)
            this.setData({
                headerNav: arr
            })
        })
    },
    /**
     * 获取热榜数据
     */
    _getHotRank() {
        wx.showNavigationBarLoading()
        let page = this.data.hotRank.currentPage
        app._ajax().getHotRank(page, res => {
            let arr = this.data.hotRank.items
            arr = arr.concat(res.data)
            this.setData({
                hotRank: {
                    currentPage: res.current_page + 1,
                    totalPage: res.last_page,
                    items: arr,
                }
            })
            wx.hideNavigationBarLoading()
        })
    },
    /**
     * 获取热帖数据
     */
    _getHotPost() {
        wx.showNavigationBarLoading()
        let page = this.data.hotPost.currentPage
        app._ajax().getHotPost(page, res => {
            let arr = this.data.hotPost.items
            arr = arr.concat(res.data)
            this.setData({
                hotPost: {
                    currentPage: res.current_page + 1,
                    totalPage: res.last_page,
                    items: arr,
                }
            })
            wx.hideNavigationBarLoading()
        })
    },
    /**
     * 获取一级榜单数据
     */
    _getFirstRank() {
        wx.showNavigationBarLoading()
        let params = {
            page: this.data.firstRank.currentPage,
            level: 1,
            id: this.data.firstRank.id
        }
        app._ajax().getFirstDetails(params, res => {
            let arr = this.data.firstRank.items
            const rank = res.data
            arr = arr.concat(rank.data)
            this.setData({
                firstRank: {
                    items: arr,
                    currentPage: rank.current_page + 1,
                    totalPage: rank.last_page,
                }
            })
            wx.hideNavigationBarLoading()
        })
    },
    //提前加载下一页
    _loadNextPage() {
        if (this.data.indexType == 'hotRank') {
            if (this.data.hotRank.totalPage >= this.data.hotRank.currentPage) {
                this._getHotRank()
            } else {
                return
            }
        } else if (this.data.indexType == 'firstRank') {
            if (this.data.firstRankTotalPage >= this.data.crtFirstPage) {
                this._getFirstRank()
            } else {
                return
            }
        } else if (this.data.indexType == 'hotPost') {
            if (this.data.hotPost.totalPage >= this.data.hotPost.currentPage) {
                this._getHotPost()
            } else {
                return
            }
        }
    },
    /**
     * 顶部导航栏切换
     */
    onchangenav(e) {
        let event = e.currentTarget.dataset
        this.setData({
            currentNavIndex: event.index
        })
        if (event.item.id == 'hotPost') {
            this.setData({
                indexType: 'hotPost',
                hotPost: {
                    currentPage: 1,
                    items: []
                }
            })
            this._getHotPost()
        } else if (event.item.id == 'hotRank') {
            this.setData({
                indexType: 'hotRank',
                hotRank: {
                    currentPage: 1,
                    items: []
                }
            })
            this._getHotRank()
        } else {
            this.setData({
                indexType: 'firstRank',
                firstRank: {
                    id: event.item.id,
                    currentPage: 1,
                    items: []
                }
            })
            this._getFirstRank()
        }
    },
    /**
     * 页面滚动到底部
     */
    onscrollbottom() {
        this._loadNextPage()
    },
    /**
     * 页面滚动
     */
    onlistscroll(e) {
        const direction = e.detail.deltaY
        const top = e.detail.scrollTop;
        //设置底部工具栏状态
        (() => {
            let obj = this.data.tabBar
            if (top < 46) {
                obj.show = true
            } else {
                if (direction > 0) {
                    //向上
                    obj.show = true
                } else {
                    //向下
                    obj.show = false
                }
            }
            this.setData({
                tabBar: obj
            })
        })()
    },
    /**
     * 点击底部tabbar
     */
    onclicktabbar(e) {
        if (app.token) {
            wx.navigateTo({
                url: '/pages/userCenter/userCenter',
            })
        } else {
            this.setData({
                goAuthorize: true
            })
        }
    },
    /**
     * 删除单条热门榜单
     */
    onremovehotrank(e) {
        let index = e.detail.index
        const obj = this.data.hotRank
        const arr = this.data.hotRank.items
        arr.splice(index, 1)
        obj.items = arr
        this.setData({
            hotRank: obj
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        this._getHotRank()
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady() {
        //初始化nav
        this._getFirstRankList()
        this._setIndexScrollHeight()
    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow() {

        // this.getIndexHotRank()

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide() {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload() {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh() {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom() {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage() {

    }
})