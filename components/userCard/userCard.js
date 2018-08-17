// components/userCard/userCard.js
const app = getApp()
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        userInfo: {
            type: Object,
            value: {},
            observer(n, o, c) {

            }
        },
        createdTime: {
            type: String,
            value: '',
            observer(n, o, c) {

            }
        },
        cardType: {
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
        goAuthorize: false
    },

    /**
     * 组件的方法列表
     */
    methods: {
        closeAuthorize() {
            this.setData({
                goAuthorize: false
            })
        },
        linkToOther(e) {
            if (app.token) {
                let uid = e.currentTarget.dataset.uid
                if (uid) {
                    wx.navigateTo({
                        url: `/pages/otherCenter/otherCenter?uid=${uid}`,
                    })
                } else {

                }
            } else {
                this.setData({
                    goAuthorize: true
                })
            }

        }
    }
})