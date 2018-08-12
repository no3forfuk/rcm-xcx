// pages/secondRank/addElement/addElement.js
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
        inputDesc: false,
        hasImg: false,
        imgSrc: '',
        textareaPlaceholder: ''
    },
    ready() {
        this.setData({
            textareaPlaceholder: '介绍一下这个新成员吧'
        })
    },
    /**
     * 组件的方法列表
     */
    methods: {
        cancel() {
            this.setData({
                textareaPlaceholder: ''
            })
            this.triggerEvent('cancel')
        },
        confirm() {
            this.triggerEvent('confirm')
        },
        clickNext(e) {
            this.triggerEvent('setNewElementName',e.detail)
            this.setData({
                inputDesc: true
            })
        },
        selectImg() {
            wx.chooseImage({
                count: 1,
                success: res => {
                    this.setData({
                        hasImg: true,
                        imgSrc: res.tempFilePaths[0]
                    })
                }
            })
        },
        previewImage() {
            wx.previewImage({
                current: this.data.imgSrc,
                urls: [this.data.imgSrc]
            })
        }
    }
})