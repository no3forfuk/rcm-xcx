// pages/element/addPost/addPost.js
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
        nodes: [],
        insertType: ''
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
        insertText() {
            this.setData({
                insertType: 'text'
            })
        },
        insertTextConfirm(e) {
            this.setData({
                insertType: '',
                nodes: [{
                    name: 'p',
                    attrs: {
                        class: 'post_p'
                    },
                    children: [{
                        type: 'text',
                        text: e.detail.value
                    }]
                }]
            })
        }
    }
})