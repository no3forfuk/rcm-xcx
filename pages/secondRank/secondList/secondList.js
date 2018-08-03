// pages/secondRank/secondList/secondList.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        subElement: {
            type: Object,
            value: {},
            observer(n, o, c) {}
        },
        lastElement: {
            type: Object,
            value: {},
            observer(n, o, c) {

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
        linkToElement(e) {
            wx.navigateTo({
                url: '/pages/element/element?elementId=' + e.currentTarget.dataset.id,
            })
        }
    }
})