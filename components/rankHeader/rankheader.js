// components/rankHeader/rankheader.js
const api = require('../../api/api.js')
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        headerInfo: {
            type: Object,
            value: {},
            observer(n, o, c) {

            }
        },
        collectParams: {
            type: Object,
            value: 0,
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
        collect() {
            api.collectRankLv2(this.data.collectParams, res => {

            }, err => {

            })
        },
        more() {
            var myEventDetail = {} // detail对象，提供给事件监听函数
            var myEventOption = {} // 触发事件的选项
            this.triggerEvent('tapmore', myEventDetail, myEventOption)
        }
    }
})