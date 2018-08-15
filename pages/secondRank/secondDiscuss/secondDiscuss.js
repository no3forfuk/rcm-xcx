// pages/secondRank/secondDiscuss/secondDiscuss.js
const app = getApp()
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        secondId: {
            type: String,
            value: null,
            observer(n, o, c) {

            }
        },
        discussInfo: {
            type: Object,
            value: null,
            observer(n, o, c) {
                if (n) {
                    // this.setData({
                    //     discussData: n,
                    //     discussList: n.data
                    // })
                }
            }
        }
    },

    /**
     * 组件的初始数据
     */
    data: {
        discussData: {},
        discussList: [],
        haveDiscuss: false
    },
    /**
     * 在组件布局完成后执行
     */
    ready() {

    },
    /**
     * 组件实例进入页面节点树时执行
     */
    attached() {

        this.getDiscuss()
    },
    /**
     * 组件的方法列表
     */
    methods: {
        goauth(){
            this.triggerEvent('goauth')
        },
        getDiscuss() {
            app._ajax().getSecondDiscuss(this.data.secondId, res => {
                if (res.data.data && res.data.data.length > 0) {
                    this.setData({
                        discussData: res.data,
                        discussList: res.data.data,
                        haveDiscuss: false
                    })
                } else {
                    this.setData({
                        discussData: res.data,
                        discussList: [],
                        haveDiscuss: true
                    })
                }

            })
        },
        addDiscuss() {
            this.triggerEvent('addDiscuss')
        },
        likeComplete() {
            app._ajax().getSecondDiscuss(this.data.secondId, res => {
                this.setData({
                    discussData: res.data,
                    discussList: res.data.data
                })
            })
        }
    }
})