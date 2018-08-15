// components/discussCard/discussCard.js
const app = getApp()
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        discussData: {
            type: Object,
            value: {},
            observer(n, o, c) {

            }
        },
        discussId: {
            type: String,
            value: '',
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
        doLike() {
            if (!app.token) {
                this.triggerEvent('goauth')
            } else {
                app._ajax().addLikeDiscuss(this.properties.discussId, res => {
                    if (res.status_code == 1) {
                        wx.showToast({
                            title: res.message,
                            mask: true
                        })
                        this.triggerEvent('likeComplete')
                    } else {
                        wx.showToast({
                            title: res.message,
                            mask: true
                        })
                    }
                })
            }

        }
    }
})