// components/indexRankCard/indexRankCard.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        rankData: {
            type: Object,
            value: {},
            observer(o, n, c) {
                this.setData({
                    rating: o.rating.split('')
                })
            }
        }
    },

    /**
     * 组件的初始数据
     */
    data: {
        rating: []
    },

    /**
     * 组件的方法列表
     */
    methods: {
        linkToSecondRank(e) {
            wx.navigateTo({
                url: '/pages/secondRank/secondRank?secondId=' + e.currentTarget.dataset.id,
            })
        }
    }
})