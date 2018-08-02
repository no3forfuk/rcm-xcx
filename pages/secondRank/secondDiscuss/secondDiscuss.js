// pages/secondRank/secondDiscuss/secondDiscuss.js
const api = require('../../../api/api.js')
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        secondId: {
            type: String,
            value: null,
            observer(n, o, c) {

            }
        }
    },

    /**
     * 组件的初始数据
     */
    data: {
        discussData: {},
        discussList: []
    },
    /**
     * 在组件布局完成后执行
     */
    ready() {

    },
    /**
     * 组件实例进入页面节点树时执行
     */
    attached() {
        api.getSecondDiscuss(this.data.secondId, res => {
            this.setData({
                discussData: res.data,
                discussList: res.data.data
            })
        })

    },
    /**
     * 组件的方法列表
     */
    methods: {

    }
})