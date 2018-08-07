//获取应用实例
const app = getApp()
const api = require('../../api/api.js')
Page({

    /**
     * 自定义事件
     */
    getUserInfo(e) {
        app.data_g.userInfo = e.detail.userInfo
    },
    link2SecondRank() {
        wx.navigateTo({
            url: '/pages/secondRank/secondRank'
        })
    },
    changeNav(e) {
        this.setData({
            crtIndex: e.currentTarget.dataset.index
        })
        let id = e.currentTarget.dataset.item.id
        if (id == '-1') {

        } else if (id == '-2') {
            api.getIndexRanking('2018-07-31', res => {
                this.setData({
                    rankData: res.data
                })
            })
        } else {
            let params = {
                level: 1,
                id: id,
                page: 1
            }
            api.getFirstDetails(params, res => {
                this.setData({
                    rankData: res.data.data.data
                })
            })
        }

    },
    /**
     * 页面的初始数据
     */
    data: {
        tabBarList: [{
                label: '首页'
            },
            {
                label: '个人中心'
            }
        ],
        rankData: [],
        firstRank: [],
        crtIndex: 0
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        api.getIndexRanking('2018-07-31', res => {
            this.setData({
                rankData: res.data
            })
        })
        //获取一级榜单列表
        api.getFirstRanking(res => {
            let firstRankArr = [{
                ranking_name: '热榜',
                id: -2
            }, {
                ranking_name: '热贴',
                id: -1
            }]
            firstRankArr = firstRankArr.concat(res.data.data)
            this.setData({
                firstRank: firstRankArr
            })
        })
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady() {
        let windowY = wx.getSystemInfoSync().windowHeight
        const query = wx.createSelectorQuery()
        query.select('.index-scroll-view').boundingClientRect()
        query.exec(res => {
            this.setData({
                scrollHeight: 'height:' + (windowY - res[0].top) + 'px;'
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