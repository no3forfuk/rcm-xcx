// components/tab/tab.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        headerData: {
            type: Array,
            value: [],
            observer(n, o, c) {

            }
        },
        flexType: {
            type: String,
            value: 'left',
            observer(n, o, c) {
                console.log(n)
            }
        }
    },

    /**
     * 组件的初始数据
     */
    data: {
        maskPosition: {}
    },
    ready() {
        const query = wx.createSelectorQuery().in(this);
        query.select('#header-item-0').boundingClientRect()
        query.exec(res => {
            let liWidth = res[0].width;
            let offsetX = 19
            let position = (liWidth - 12) / 2 + offsetX
            this.setData({
                maskPosition: 'transform: translateX(' + position + 'px)'
            })
        })
    },
    /**
     * 组件的方法列表
     */
    methods: {
        onchange(e) {
            const query = wx.createSelectorQuery().in(this);
            query.select('#' + e.target.id).boundingClientRect()
            query.exec(res => {
                let liWidth = res[0].width;
                let offsetX = e.currentTarget.offsetLeft
                let position = (liWidth - 12) / 2 + offsetX
                this.setData({
                    maskPosition: 'transform: translateX(' + position + 'px)',
                    selectedIndex: e.currentTarget.dataset.index
                })
            })
        }
    }
})