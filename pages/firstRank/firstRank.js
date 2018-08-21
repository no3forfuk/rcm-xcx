// pages/firstRank/firstRank.js
const app = getApp()
Page({
    onscrollbottom(e) {
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
    onscrollbottom() {
        this._loadNextPage()
    },
    _loadNextPage() {
        if (this.data.firstRank.totalPage >= this.data.firstRank.currentPage) {
            this._getFirstRank(res => {
                let arr = this.data.firstRank.subRank
                arr = arr.concat(res.data.data)
                let target = this.data.firstRank
                let obj = {
                    subRank: arr,
                    currentPage: res.data.current_page + 1,
                    totalPage: res.data.last_page
                };
                let n_obj = Object.assign(target, obj)
                this.setData({
                    firstRank: n_obj
                })
            })
        } else {
            return
        }
    },
    onclicktabbar() {
        wx.reLaunch({
            url: '/pages/index/index',
        })
    },
    /**
     * 页面的初始数据
     */
    data: {
        headerData: {},
        tabBar: {
            show: true,
            list: [{
                label: '首页',
                iconValue: 'icon-zhuye'
            }]
        },
        firstRank: {
            id: null,
            name: null,
            subRank: null,
            currentPage: 1,
            totalPage: 1
        }
    },
    _getFirstRank(success) {
        wx.showNavigationBarLoading()
        let params = {
            page: this.data.firstRank.currentPage,
            level: 1,
            id: this.data.firstRank.id
        }
        app._ajax().getFirstDetails(params, res => {
            success(res)
            wx.hideNavigationBarLoading()
        })
    },
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
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        this.setData({
            firstRank: {
                id: options.firstId,
                name: null,
                subRank: [],
                currentPage: 1,
                totalPage: 1
            }
        })
        this._getFirstRank(res => {
            let arr = this.data.firstRank.subRank
            arr = arr.concat(res.data.data)
            let target = this.data.firstRank
            let obj = {
                subRank: arr,
                currentPage: res.data.current_page + 1,
                totalPage: res.data.last_page
            };
            let n_obj = Object.assign(target, obj)
            this.setData({
                headerData: {
                    name: res.ranking_name,
                    son: res.data.total,
                },
                firstRank: n_obj
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