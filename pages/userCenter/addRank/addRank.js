// pages/userCenter/addRank/addRank.js
const app = getApp()
Component({
    /**
     * 组件的属性列表
     */
    properties: {

    },

    /**
     * 组件的初始数据
     */
    data: {
        rankName: '',
        rankDesc: '',
        textareaFocus: false,
        firstArray: [],
        firstIndex: 0,
        bloneRank: {}
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
        setRankName(e) {
            this.setData({
                rankName: e.detail.value
            })
        },
        setRankDesc(e) {
            this.setData({
                rankDesc: e.detail.value
            })
        },
        tapNext() {
            this.setData({
                textareaFocus: true
            })
        },
        selectRank(e) {
            let index = e.detail.value
            this.setData({
                firstIndex: index,
                bloneRank: this.data.firstArray[index]
            })
        }
    },
    attached() {
        app._ajax().getFirstRanking(res => {
            this.setData({
                firstArray: res.data.data
            })
        })
    }
})