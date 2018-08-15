// pages/element/activeHeader/activeHeader.js
const app = getApp()
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        isCollected: {
            type: Boolean,
            value: false,
            observer(n, o, c) {

            }
        },
        headerInfo: {
            type: Object,
            value: null,
            observer(n, o, c) {

            },
        },
        collectParams: {
            type: Object,
            value: 0,
            observer(n, o, c) {

            }
        },
        isShow: {
            type: Boolean,
            value: 0,
            observer(n, o, c) {
                if (n) {
                    const animation = wx.createAnimation({
                        duration: 300,
                        timingFunction: 'ease'
                    })
                    animation.translateY(0).step()
                    this.setData({
                        animationData: animation.export()
                    })
                } else {
                    const animation = wx.createAnimation({
                        duration: 300,
                        timingFunction: 'ease'
                    })
                    animation.translateY('-100%').step()
                    this.setData({
                        animationData: animation.export()
                    })
                }
            }
        }
    },

    /**
     * 组件的初始数据
     */
    data: {
        elementName: '',
        vote: 0,
        voter: 0,
        animationData: ''
    },

    /**
     * 组件的方法列表
     */
    methods: {
        collect() {
            if (app.token) {
                app._ajax().collectElement(this.data.collectParams, res => {
                    wx.showToast({
                        title: res.message
                    })
                    this.setData({
                        isCollected: !this.properties.isCollected
                    })
                }, err => {

                })
            } else {
                this.triggerEvent('goAuthorize')
            }
        },
        more() {
            this.triggerEvent('tapmore')
        },
        emitVote() {
            this.triggerEvent('voteForElemenet')
        }
    }
})