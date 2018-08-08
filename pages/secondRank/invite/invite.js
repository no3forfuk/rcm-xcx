// pages/secondRank/invite/invite.js
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
        tabHeaderData: [{
                label: '热门邀请'
            },
            {
                label: '关注的'
            },
            {
                label: '粉丝'
            }
        ],
        inviteLists: [{
            name: '抠脚大汉',
            avatar: 'http://thirdwx.qlogo.cn/mmopen/vi_32/DYAIOgq83epdicJqib2nFicIFISbAuOlfyUiaALk2nWdzp8ClNLr0OyUd5ydicnngJH3rbxRGnaVqiaMticXiaia3nnsMOQ/132',
            ranking_name: '游戏',
            signature: '抠自己的脚让别人恶心去吧😄',
            ranking_id: 10,
            id: 56
        }]
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
        }
    }
})