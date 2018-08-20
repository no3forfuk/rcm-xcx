// components/rankHeader/rankheader.js
const app = getApp()
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        headerInfo: {
            type: Object,
            value: {
                flag: '',
                title: '',
                desc: '',
                rating: '',
                vote: '',
                img: '',
                childrenNum: 0,
                isCollect: false,
                id: ''
            },
            observer(n, o, c) {
                if (n && n.id) {
                    console.log(n)
                    this.setData({
                        collectId: n.id
                    })
                }
            }
        },
        headerType: {
            type: String,
            value: '',
            observer(n, o, c) {}
        }
    },

    /**
     * 组件的初始数据
     */
    data: {
        collectId: ''
    },

    /**
     * 组件的方法列表
     */
    methods: {
        collect() {
            if (app.token) {
                if (this.data.headerType == 'second') {
                    app._ajax().collectRankLv2({
                        ranking_id: this.properties.headerInfo.id
                    }, res => {
                        wx.showToast({
                            title: res.message,
                            mask: true
                        })
                        let obj = this.properties.headerInfo;
                        obj.isCollect = !obj.isCollect
                        this.setData({
                            headerInfo: obj
                        })
                    }, err => {

                    })
                } else if (this.data.headerType == 'element') {
                    app._ajax().collectElement(this.data.collectParams, res => {
                        wx.showToast({
                            title: res.message,
                            mask: true
                        })
                        this.setData({
                            isCollected: !this.properties.isCollected
                        })
                    }, err => {

                    })
                }
            } else {
                this.triggerEvent('goAuthorize')
            }
        },
        more() {
            var myEventDetail = {} // detail对象，提供给事件监听函数
            var myEventOption = {} // 触发事件的选项
            this.triggerEvent('tapmore', myEventDetail, myEventOption)
        },
        openDetails() {
            this.triggerEvent('tapdetail')
        },
        emitVote() {
            this.triggerEvent('voteForElemenet')
        }
    }
})