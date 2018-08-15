// pages/index/hotPost/hotPost.js
const app = getApp()
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        hotPostData: {
            type: Object,
            value: {},
            observer(n, o, c) {
                if (n) {
                    let reg = /<[^>]+>|&[a-z]*;/g
                    let text = n.post_content.replace(reg, '')
                    this.setData({
                        createUser: {
                            avatar: n.avatar,
                            name: n.create_user
                        },
                        createTime: n.created_at,
                        postContent: text,
                        elementName: n.element_name
                    })
                    if (n.data) {
                        this.setData({
                            discussData: n.data,
                            discussUser: {
                                avatar: n.data.user.avatar,
                                name: n.data.user.create_user
                            }
                        })
                    }
                }
            }
        }
    },

    /**
     * 组件的初始数据
     */
    data: {
        createUser: {},
        createTime: ''
    },

    /**
     * 组件的方法列表
     */
    methods: {
        linkToPost(e) {
            wx.navigateTo({
                url: '/pages/post/post?postId=' + e.currentTarget.dataset.id,
            })
        },
        dolike(e) {
            if (!app.token) {
                this.triggerEvent('goAuth')
            } else {
                let id = e.currentTarget.dataset.id
                app._ajax().addLikeDiscuss(id, res => {
                    if (res.status_code == 1) {
                        wx.showToast({
                            title: res.message,
                            mask: true
                        })
                        let disData = this.data.discussData
                        disData.like += 1
                        this.setData({
                            discussData: disData
                        })

                    } else {
                        wx.showToast({
                            title: res.message,
                            mask: true
                        })
                    }
                })
            }

        }
    }
})