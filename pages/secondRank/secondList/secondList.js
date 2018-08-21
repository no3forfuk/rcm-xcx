// pages/secondRank/secondList/secondList.js
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
        otherSortIcon: 'icon-zuixin'
    },

    /**
     * 组件的方法列表
     */
    methods: {
        linkToElement(e) {
            wx.navigateTo({
                url: '/pages/element/element?elementId=' + e.currentTarget.dataset.id,
            })
        },
        addelement(e) {
            this.triggerEvent('addelement')
        },
        goInvite() {
            this.triggerEvent('goinvite')
        },
        startSelectSlot() {
            this.setData({
                selectSlot: true
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