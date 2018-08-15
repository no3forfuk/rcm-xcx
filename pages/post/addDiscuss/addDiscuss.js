// pages/secondRank/addDiscuss/addDiscuss.js
const app = getApp()
Component({
    /**
     * 组件的属性列表
     */
    properties: {

    },
    attached() {
        let user = app.globalData.userInfo
        this.setData({
            userInfo: {
                avatar: user.avatar,
                name: user.name
            }
        })
    },
    /**
     * 组件的初始数据
     */
    data: {
        userInfo: {}
    },

    /**
     * 组件的方法列表
     */
    methods: {
        cancel() {
            this.triggerEvent('cancel')
        },
        confirm() {
            this.triggerEvent('confirm')
        },
        setValue(e) {
            this.triggerEvent('setValue', e.detail.value)
        },
        editconfirm(e) {
            this.triggerEvent('confirm', e.detail.value)
        }
    }
})