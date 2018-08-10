//获取应用实例
const app = getApp()
Page({

    /**
     * 自定义事件
     */
    //nav改变
    changeNav(e) {
        this.setData({
            crtIndex: e.currentTarget.dataset.index,
            crtFirstRank: e.currentTarget.dataset.item
        })
        let id = e.currentTarget.dataset.item.id
        if (id == '-1') {

        } else if (id == '-2') {
            this.setData({
                beforeDay: 0,
                rankData: []
            })
            this.getIndexHotRank(this.data.beforeDay)
        } else {
            this.setData({
                crtPage: 1,
                crtRankId: id
            })
            let params = {
                level: 1,
                id: id,
                page: 1
            }
            app._ajax().getFirstDetails(params, res => {
                this.setData({
                    rankData: res.data.data.data
                })
            })
        }
    },
    //点击tabBar项目
    tabItemClick(e) {
        if (e.detail.userInfo) {
            app.globalData.userInfo = e.detail.userInfo
            wx.navigateTo({
                url: '/pages/userCenter/userCenter',
            })
        }
    },
    //跳转搜索页面
    goSearch() {
        wx.navigateTo({
            url: '/pages/search/search',
        })
    },
    indexScroll(e) {
        //初始高度
        let baseHeight = this.data.scrollHeightNum;
        //总高度
        let totalHeight = e.detail.scrollHeight;
        //被卷去的高度
        let top = e.detail.scrollTop
        //距离底部的距离
        let Y = totalHeight - top - baseHeight
        if (this.data.crtIndex >= 2) {
            console.log('榜单')
        } else {
            if (Y < 200) {
                this.setData({
                    beforeDay: this.data.beforeDay + 1
                })
                this.getIndexHotRank(this.data.beforeDay)
            }
        }

    },
    //获取推送数据
    getIndexHotRank(day) {
        let params = new Date().getTime() - (day * 24 * 3600 * 1000)
        params = app.timeFormat('-', params)
        if (params == '2018-05-01') return;
        app._ajax().getIndexRanking(params, res => {
            if (res.data.length <= 0) {
                this.setData({
                    beforeDay: this.data.beforeDay + 1
                })
                this.getIndexHotRank(this.data.beforeDay)
            } else {
                let arr = this.data.rankData.concat(res.data)
                this.setData({
                    rankData: arr
                })
            }
        })
    },
    /**
     * 页面的初始数据
     */
    data: {
        tabBarList: [{
            label: '个人中心',
            openType: 'getUserInfo',
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
        crtRankId: null
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        if (app.token) {

        } else {
            app.initApi = res => {
                this.getIndexHotRank(this.data.beforeDay)
                // 获取一级榜单列表
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
            }
        }
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady() {
        let windowY = wx.getSystemInfoSync().windowHeight
        const query = wx.createSelectorQuery()
        query.select('.index-scroll-view').boundingClientRect()
        query.exec(res => {
            let num = windowY - res[0].top - 46
            this.setData({
                scrollHeight: 'height:' + num + 'px;',
                scrollHeightNum: num
            })
        })

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow() {

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