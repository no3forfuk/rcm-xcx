//获取应用实例
const app = getApp()
Page({

    /**
     * 自定义事件
     */
    indexScroll(e) {
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
    },
    removeRank(e) {
        let index = e.detail.index
        let list = this.data.hotRankList
        list.splice(index, 1)
        this.setData({
            hotRankList: list
        })
    },
    likeComplete() {
        console.log('a')
        this.setData({
            indexType: 'hotRank',
            crtHotPage: 1,
            hotRankList: [],
            hotRankTotalPage: 1
        })
        this.getIndexHotRank()
    },
    //nav改变
    changeNav(e) {

        this.setData({
            crtIndex: e.currentTarget.dataset.index,
            crtFirstRank: e.currentTarget.dataset.item
        })
        let id = e.currentTarget.dataset.item.id
        if (id == '-1') {
            this.setData({
                indexType: 'hotPost',
                crtHotPostPage: 1,
                hotPostList: [],
                hotPostTotalPage: 1
            })
            this.getIndexHotPost()
        } else if (id == '-2') {
            this.setData({
                indexType: 'hotRank',
                crtHotPage: 1,
                hotRankList: [],
                hotRankTotalPage: 1
            })
            this.getIndexHotRank()
        } else {
            this.setData({
                indexType: 'firstRank',
                firstId: id,
                crtFirstPage: 1,
                firstRankList: [],
                firstRankTotalPage: 1,
            })
            this.getIndexFirstRank()
        }
    },
    goauth() {
        this.setData({
            goAuthorize: true
        })
    },
    //点击tabBar项目
    tabItemClick(e) {
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
    //跳转搜索页面
    goSearch() {
        wx.navigateTo({
            url: '/pages/search/search',
        })
    },
    //获取热门Post
    getIndexHotPost() {
        app._ajax().getHotPost(this.data.crtHotPostPage, res => {
            let list = this.data.hotPostList.concat(res.data)
            this.setData({
                crtHotPostPage: res.current_page + 1,
                hotPostList: list,
                hotPostTotalPage: res.last_page
            })
        })
    },
    //获取热门榜单
    getIndexHotRank() {
        app._ajax().getHotRank(this.data.crtHotPage, res => {
            let list = this.data.hotRankList.concat(res.data)
            this.setData({
                crtHotPage: res.current_page + 1,
                hotRankList: list,
                hotRankTotalPage: res.last_page
            })
        })
    },
    //获取一级榜单
    getIndexFirstRank() {
        app._ajax().getFirstDetails({
            page: this.data.crtFirstPage,
            level: 1,
            id: this.data.firstId
        }, res => {
            let list = this.data.firstRankList.concat(res.data.data)
            this.setData({
                crtFirstPage: res.data.current_page + 1,
                firstRankList: list,
                firstRankTotalPage: res.data.last_page
            })
        })
    },
    loadNextPage() {
        if (this.data.indexType == 'hotRank') {
            if (this.data.hotRankTotalPage >= this.data.crtHotPage) {
                this.getIndexHotRank()
            } else {
                return
            }
        } else if (this.data.indexType == 'firstRank') {
            if (this.data.firstRankTotalPage >= this.data.crtFirstPage) {
                this.getIndexFirstRank()
            } else {
                return
            }
        } else if (this.data.indexType == 'hotPost') {
            if (this.data.hotPostTotalPage >= this.data.crtHotPostPage) {
                this.getIndexHotPost()
            } else {
                return
            }
        }
    },
    closeAuthorize() {
        this.setData({
            goAuthorize: false
        })
    },

    /**
     * 页面的初始数据
     */
    data: {
        animationData: '',
        showTabbar: true,
        goAuthorize: false,
        tabBarList: [{
            label: '个人中心',
            iconValue: 'icon-shenfenzheng'
        }],
        rankData: [],
        firstRank: [],
        crtIndex: 0,
        activeSearch: false,
        time: new Date().getTime(),
        beforeDay: 0,
        scrollHeight: '',
        scrollHeightNum: 0,
        crtPage: 1,
        crtRankId: null,
        //hot
        indexType: 'hotRank',
        crtHotPage: 1,
        hotRankList: [],
        hotRankTotalPage: 1,
        //first
        firstId: 0,
        crtFirstPage: 1,
        firstRankList: [],
        firstRankTotalPage: 1,
        //Post
        crtHotPostPage: 1,
        hotPostList: [],
        hotPostTotalPage: 1

    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {

    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady() {


    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow() {
        app._ajax().getFirstRanking(res => {
            let firstRankArr = [{
                ranking_name: '热榜',
                id: -2
            }, {
                ranking_name: '热帖',
                id: -1
            }]
            firstRankArr = firstRankArr.concat(res.data.data)
            this.setData({
                firstRank: firstRankArr
            })
        })
        this.getIndexHotRank()

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