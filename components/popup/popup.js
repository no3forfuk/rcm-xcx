// components/popup/popup.js
const app = getApp()
Component({
    options: {
        multipleSlots: true // 在组件定义时的选项中启用多slot支持
    },
    /**
     * 组件的属性列表
     */
    properties: {
        popupSize: {
            type: String,
            value: '',
            observer(n, o, c) {

            }
        },
        smallData: {
            type: Array,
            value: [],
            observer(n, o, c) {

            }
        }
    },
    ready() {
        this.slideUp()
    },
    moved() {

    },
    detached() {

    },
    /**
     * 组件的初始数据
     */
    data: {
        animationData: {},
        popupHeight: 0
    },
    /**
     * 组件的方法列表
     */
    methods: {
        cancle() {
            this.slideDown()
            setTimeout(function() {
                this.triggerEvent('close')
            }.bind(this), 300)
        },
        slideUp() {
            const animation = wx.createAnimation({
                duration: 300,
                timingFunction: 'ease'
            })
            animation.translateY(0).step()
            this.setData({
                animationData: animation.export()
            })
        },
        slideDown() {
            const animation = wx.createAnimation({
                duration: 280,
                timingFunction: 'ease-in'
            })
            animation.translateY('100%').step()
            this.setData({
                animationData: animation.export()
            })
        },
        tapSmallItem(e) {
            this.slideDown()
            let target = e.currentTarget.dataset.item
            setTimeout(function() {
                this.triggerEvent('close')
                this.triggerEvent('tapSmallItem', target)
            }.bind(this), 300)
        }
    }
})