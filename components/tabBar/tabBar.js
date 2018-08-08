// components/tabBar/tabBar.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        tabBarList: {
            type: Array,
            value: [],
            observer(n, o, c) {
                if (n) {
                    let num = n.length
                    this.setData({
                        itemFlex: 'flex:' + (100 / num) + '%'
                    })
                }
            }
        },
        isIndex: {
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
        itemFlex: ''
    },
    /**
     * 组件的方法列表
     */
    methods: {
        tapItem(e) {
            let target = e.currentTarget.dataset.item
            if (target.openType == 'getUserInfo') {
                this.triggerEvent('tapItem', {
                    target,
                    userInfo: e.detail.userInfo
                })
            } else {
                this.triggerEvent('tapItem', target)
            }


        }
    }
})