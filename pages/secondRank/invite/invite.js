// pages/secondRank/invite/invite.js
const app = getApp()
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        secondId: {
            type: String,
            value: '',
            observer(n, o, c) {

            }
        }
    },

    /**
     * 组件的初始数据
     */
    data: {
        tabHeaderData: [{
                label: '热门邀请',
                type: 1
            },
            {
                label: '关注的',
                type: 2
            },
            {
                label: '粉丝',
                type: 3
            }
        ],
        inviteLists: []
    },
    attached() {
        app._ajax().getInviter(1, res => {
            this.setData({
                inviteLists: res.data
            })
        })
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
        tabchange(options) {
            let index = options.detail.index
            let type = this.data.tabHeaderData[index].type
            app._ajax().getInviter(type, res => {
                this.setData({
                    inviteLists: res.data
                })
            })
        },
        searchOther(e) {
            let name = e.detail.value
            app._ajax().searchPeople(name, res => {
                this.setData({
                    inviteLists: res.data
                })
            })
        },
        submitInvite(e) {
            let params = {
                user_id: e.currentTarget.dataset.uid,
                second_id: this.properties.secondId
            }
            app._ajax().invitePeople(params, res => {
                wx.showToast({
                    title: res.message,
                })
                // this.triggerEvent('completeInvite')
            })
        }
    }
})