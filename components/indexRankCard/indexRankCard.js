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
                    if (n.rating) {
                        this.setData({
                            rating: n.rating.split('')
                        })
                    } else {
                        this.setData({
                            rating: ['A']
                        })
                    }
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
        },
        firs: {
            type: String,
            value: '',
            observer(n, o, c) {
                if (n) {
                    console.log(n)
                }
            }
        },
        freeStyle: {
            type: String,
            value: '',
            observer(n, o, c) {
                if (n) {

                }
            }
        },
        nameType: {
            type: String,
            value: '',
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
        rating: []
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