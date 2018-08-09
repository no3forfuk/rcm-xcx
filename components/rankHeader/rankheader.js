// components/rankHeader/rankheader.js
const app = getApp()
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        headerInfo: {
            type: Object,
            value: {
                flag: '',
                title: '',
                desc: '',
                rating: '',
                vote: '',
                img: '',
                childrenNum: 0
            },
            observer(n, o, c) {

            }
        },
        collectParams: {
            type: Object,
            value: 0,
            observer(n, o, c) {

            }
        },
        headerType: {
            type: String,
            value: '',
            observer(n, o, c) {}
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
            if (this.data.headerType == 'second') {
                app._ajax().collectRankLv2(this.data.collectParams, res => {

                }, err => {

                })
            } else if (this.data.headerType == 'element') {
                app._ajax().collectElement(this.data.collectParams, res => {

                }, err => {

                })
            }

        },
        more() {
            var myEventDetail = {} // detail对象，提供给事件监听函数
            var myEventOption = {} // 触发事件的选项
            this.triggerEvent('tapmore', myEventDetail, myEventOption)
        },
        openDetails() {
            this.triggerEvent('tapdetail')
        }
    }
})