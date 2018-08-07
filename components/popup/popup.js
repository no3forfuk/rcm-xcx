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
        popupType: {
            type: String,
            value: '',
            obverser(n, o, c) {

            }
        }
    },
    ready() {
        console.log(this)
        this.getPopupHeight()
        this.slideUp()
    },
    detached() {
        console.log('a')
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
            setTimeout(function() {
                this.triggerEvent('close')
            }.bind(this), 500)
        },
        getPopupHeight() {
            let className = '.' + this.data.popupType + '-popup'
            let query = wx.createSelectorQuery().in(this);
            query.select(className).boundingClientRect(res => {
                this.setData({
                    popupHeight: res.height
                })
            }).exec()
        },
        slideUp() {
            const animation = wx.createAnimation({
                duration: 500,
                timingFunction: 'ease'
            })
            console.log(-this.data.popupHeight)
            animation.translateY(-this.data.popupHeight).step()
            this.setData({
                animationData: animation.export()
            })
        }
    }
})