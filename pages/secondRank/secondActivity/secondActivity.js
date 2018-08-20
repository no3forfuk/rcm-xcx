// pages/secondRank/secondActivity/secondActivity.js
const app = getApp()
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        firstRank: {
            type: Object,
            value: {},
            observer(n, o, c) {
                if (app.activity.current && app.activity.current.rankingId == n.id){
                    this.setData({
                        activeImg: app.activity.current.url
                    })
                }else{
                    this.setData({
                        activeImg: app.activity._default.url
                    })
                }
            }
        }
    },

    /**
     * 组件的初始数据
     */
    data: {
        activeImg: ''
    },
    attached() {

    },
    /**
     * 组件的方法列表
     */
    methods: {
        viewImg() {
            wx.previewImage({
                current: this.data.activeImg, // 当前显示图片的http链接
                urls: [this.data.activeImg] // 需要预览的图片http链接列表
            })
        },
        longtapimg() {

        }
    }
})