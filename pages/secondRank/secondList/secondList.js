// pages/secondRank/secondList/secondList.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        subElement: {
            type: Array,
            value: [],
            observer(n, o, c) {}
        },
        lastElement: {
            type: Object,
            value: {},
            observer(n, o, c) {

            }
        },
        haveSubElement: {
            type: Boolean,
            value: false,
            observer(n, o, c) {

            }
        }
    },

    /**
     * 组件的初始数据
     */
    data: {
        selectSlot: false,
        crtSortType: '最新'
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
            let slotType = e.currentTarget.dataset.type
            if (slotType == 'hot') {
                this.setData({
                    crtSortType: '最热'
                })
            } else {
                this.setData({
                    crtSortType: '最新'
                })
            }
            this.triggerEvent('sortElementByType', {
                type: slotType
            })
            this.setData({
                selectSlot: false
            })
        }
    }
})