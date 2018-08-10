// pages/element/addPost/addPost.js
const WxParse = require('../../../wxParse/wxParse.js');
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
        insertType: '',
        startContent: '<div>',
        centerContet: '',
        endContent: '</div>',
        inputLinkAddress: false,
        confirmHold: true,
        linkTitle: ''
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
        insertLink() {
            this.setData({
                insertType: 'link'
            })
        },
        insertLinkTitleConfirm(e) {
            this.setData({
                linkTitle: e.detail.value,
                inputLinkAddress: true
            })
        },
        insertLinkConfirm(e) {
            let that = this;
            let src = e.detail.value
            let a = `<div><a src="${src}" class="post_a">${this.data.linkTitle}</a></div>`
            let newCenterContent = this.data.centerContet + a
            this.setData({
                centerContet: newCenterContent
            })
            let html = this.data.startContent + this.data.centerContet + this.data.endContent
            WxParse.wxParse('content', 'html', html, that)
            this.setData({
                insertType: ''
            })
        },
        insertVideo() {
            let that = this;
            wx.chooseVideo({
                maxDuration: 60,
                success: res => {
                    let src = res.tempFilePath
                    let video = `<div><video class="post_video" controls="controls" src="${src}"></video></div>`
                    let newCenterContent = this.data.centerContet + video
                    this.setData({
                        centerContet: newCenterContent
                    })
                    let html = this.data.startContent + this.data.centerContet + this.data.endContent
                    WxParse.wxParse('content', 'html', html, that)
                }
            })
        },
        insertImg() {
            let that = this;
            wx.chooseImage({
                success: res => {
                    for (let i = 0; i < res.tempFilePaths.length; i++) {
                        let src = res.tempFilePaths[i]
                        let img = `<div><img class="post_img" src="${src}"></div>`
                        let newCenterContent = this.data.centerContet + img
                        this.setData({
                            centerContet: newCenterContent
                        })
                    }
                    let html = this.data.startContent + this.data.centerContet + this.data.endContent
                    WxParse.wxParse('content', 'html', html, that)
                }
            })
        },
        insertTextConfirm(e) {
            let that = this;
            let textValue = `<p class="post_p">${e.detail.value}</p>`
            let newCenterContet = this.data.centerContet + textValue
            this.setData({
                insertType: '',
                centerContet: newCenterContet
            })
            let html = this.data.startContent + this.data.centerContet + this.data.endContent
            WxParse.wxParse('content', 'html', html, that)
        }
    }
})