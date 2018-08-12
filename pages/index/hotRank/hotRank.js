// pages/index/hotRank/hotRank.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        hotRankData: {
            type: Array,
            value: [],
            observer(n, o, c) {
                if (n && n.length > 0) {
                    for (let i = 0; i < n.length; i++) {
                        n[i].parent = {
                            id: n[i].ranking_p_id || 1,
                            ranking_name: n[i].ranking_p_name || '其他'
                        }
                    }
                    this.setData({
                        hotRankList: n
                    })
                }
            }
        }
    },

    /**
     * 组件的初始数据
     */
    data: {
        hotRankList: []
    },

    /**
     * 组件的方法列表
     */
    methods: {

    }
})