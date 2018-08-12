// pages/secondRank/activeHeader/activeHeader.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        info: {
            type: Object,
            value: {},
            observer(n, o, c) {
                if ('parent' in n && 'son' in n) {
                    this.setData({
                        parent: n.parent,
                        son: n.son
                    })
                }
            }
        }
    },

    /**
     * 组件的初始数据
     */
    data: {
        parent: {},
        son: {}
    },

    /**
     * 组件的方法列表
     */
    methods: {

    }
})