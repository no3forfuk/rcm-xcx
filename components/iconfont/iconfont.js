// components/iconfont/iconfont.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        iconValue: {
            type: String,
            value: '',
            observer(n, o, c) {}
        },
        textClass: {
            type: String,
            value: '',
            observer(n, o, c) {

            }
        },
        textValue:{
            type: String,
            value: '',
            observer(n, o, c) {

            }
        }
    },
    attached() {

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
        onTap() {
            var myEventDetail = {} // detail对象，提供给事件监听函数
            var myEventOption = {} // 触发事件的选项
            this.triggerEvent('tapicon', myEventDetail, myEventOption)
        }
    }
})