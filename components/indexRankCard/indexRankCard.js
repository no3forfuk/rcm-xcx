// components/indexRankCard/indexRankCard.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        rankData: {
            type: Object,
            value: {},
            observer(n, o, c) {
                if (n) {

                }
            }
        },
        firstData: {
            type: Object,
            value: {},
            observer(n, o, c) {
                if (n) {

                }
            }
        }
    },

    /**
     * 组件的初始数据
     */
    data: {

    },

    /**
     * 组件的方法列表
     */
    methods: {
        linkToSecondRank(e) {
            let firstRank = JSON.stringify(e.currentTarget.dataset.firstrank)
            wx.navigateTo({
                url: '/pages/secondRank/secondRank?secondId=' + e.currentTarget.dataset.id + '&first=' + firstRank,
            })
        },
        linkToELement(e) {
            wx.navigateTo({
                url: '/pages/element/element?elementId=' + e.currentTarget.dataset.id,
            })
        }
    }
})