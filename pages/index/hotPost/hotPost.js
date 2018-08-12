// pages/index/hotPost/hotPost.js
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

    }
})