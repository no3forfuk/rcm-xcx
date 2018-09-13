// pages/secondRank/secondList/secondList.js
const app = getApp()
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        subElement: {
            type: Array,
            value: [],
            observer(n, o, c) {
                if (n) {
                    if (n.length > 0) {
                        this.setData({
                            haveSubElement: false
                        })
                    } else {
                        this.setData({
                            haveSubElement: true
                        })
                    }
                } else {
                    this.setData({
                        haveSubElement: false
                    })
                }
            }
        },
        lastElement: {
            type: Object,
            value: {},
            observer(n, o, c) {

            }
        }
    },

    /**
     * 组件的初始数据
     */
    data: {
        selectSlot: false,
        haveSubElement: false,
        crtSortIcon: 'icon-huoyan',
        otherSortIcon: 'icon-zuixin',
        globalSwitch: {}
    },
    ready() {
        this.setData({
            globalSwitch: app.globalData.switch
        })
    },

    /**
     * 组件的方法列表
     */
    methods: {

        addelement(e) {
            this.triggerEvent('addelement')
        },
        goInvite() {
            this.triggerEvent('goinvite')
        },
        startSelectSlot() {
            let flag = this.data.selectSlot
            this.setData({
                selectSlot: !flag
            })
        },
        selectSlotComplete(e) {
            if (e == 'new') {
                this.setData({
                    crtSortIcon: 'icon-zuixin',
                    otherSortIcon: 'icon-huoyan'
                })
                this.triggerEvent('sortElementByType', {
                    type: 'new'
                })
            } else {
                let [a, b] = [this.data.crtSortIcon, this.data.otherSortIcon]
                this.setData({
                    crtSortIcon: b,
                    otherSortIcon: a
                })
                if (this.data.crtSortIcon == 'icon-huoyan') {
                    let sortType = 'hot'

                    this.triggerEvent('sortElementByType', {
                        type: sortType
                    })
                } else {
                    let sortType = 'new'
                    this.triggerEvent('sortElementByType', {
                        type: sortType
                    })
                }
                this.setData({
                    selectSlot: false
                })
            }
        }
    }
})