// components/tabBar/tabBar.js
const app = getApp()
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        tabBarList: {
            type: Array,
            value: [],
            observer(n, o, c) {
                if (n) {
                    let num = n.length
                    this.setData({
                        itemFlex: 'flex:' + (100 / num) + '%'
                    })
                }
            }
        },
        isIndex: {
            type: Boolean,
            value: false,
            observer(n, o, c) {

            }
        },
        isShow: {
            type: Boolean,
            value: false,
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
                    animation.translateY('100%').step()
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
        itemFlex: '',
        animationData:''
    },
    /**
     * 组件的方法列表
     */
    methods: {
        tapItem(e) {
            let target = e.currentTarget.dataset.item
            if (target.openType == 'getUserInfo') {
                app.authorize = e.detail
                this.triggerEvent('tapItem', {
                    target,
                    userInfo: e.detail.userInfo
                })
            } else {
                this.triggerEvent('tapItem', target)
            }


        }
    }
})