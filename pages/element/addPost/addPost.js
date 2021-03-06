// pages/element/addPost/addPost.js
const WxParse = require('../../../wxParse/wxParse.js');
const app = getApp()

Component({
    /**
     * 组件的属性列表
     */
    properties: {
        elementId: {
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
        nodes: [],
        insertType: '',
        startContent: '<div>',
        centerContet: '',
        endContent: '</div>',
        inputLinkAddress: false,
        confirmHold: true,
        linkTitle: '',
        startInsetText: false,
        imgArr: [],
        submitContent: '',
        videoArr: []
    },

    /**
     * 组件的方法列表
     */
    methods: {
        cancel() {
            this.triggerEvent('cancel')
        },
        confirm() {
            wx.showLoading({
                title: '发布中',
                mask: true
            })
            let html = this.data.startContent + this.data.submitContent + this.data.endContent
            let params = {
                element_id: this.data.elementId,
                post_content: html,
                type: 3
            }
            for (let i = 0; i < this.data.imgArr.length; i++) {
                let path = this.data.imgArr[i].path
                app.qiniuSDK.upload(path, complete => {})
                params.type = 3
            }
            for (let i = 0; i < this.data.videoArr.length; i++) {
                let path = this.data.videoArr[i]
                app.qiniuSDK.upload(path, complete => {})
                params.type = 4
            }
            app._ajax().addpost(params, res => {
                wx.hideLoading()
                this.cancel()
                this.triggerEvent('refreshSubPost')
            })
        },
        insertText() {
            this.setData({
                insertType: 'text',
                startInsetText: true
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
                    console.log(res)
                    let arr = this.data.videoArr;
                    arr.push(res.tempFilePath)
                    let src = res.tempFilePath
                    let video = `<div><video class="post_video" controls="controls" src="${src}"></video></div>`
                    let newCenterContent = this.data.centerContet + video
                    let videoname = res.tempFilePath.split('//')[1]
                    let submitSrc = app.qiniuPrefix + videoname
                    let submitVideo = `<div><video class="post_video" controls="controls" src="${submitSrc}"></video></div>`
                    let submitContent = this.data.submitContent + submitVideo
                    this.setData({
                        centerContet: newCenterContent,
                        submitContent: submitContent,
                        videoArr: arr
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
                    let arr = this.data.imgArr;
                    arr = this.data.imgArr.concat(res.tempFiles)
                    for (let i = 0; i < res.tempFilePaths.length; i++) {
                        let src = res.tempFilePaths[i]
                        let img = `<div><img class="post_img" src="${src}"></div>`
                        let newCenterContent = this.data.centerContet + img
                        let imgname = res.tempFilePaths[i].split('//')[1]
                        let submitSrc = app.qiniuPrefix + imgname
                        let submitImg = `<div><img class="post_img" src="${submitSrc}"></div>`
                        let submitContent = this.data.submitContent + submitImg
                        this.setData({
                            centerContet: newCenterContent,
                            submitContent: submitContent
                        })
                    }
                    this.setData({
                        imgArr: arr
                    })
                    let html = this.data.startContent + this.data.centerContet + this.data.endContent
                    WxParse.wxParse('content', 'html', html, that)
                }
            })
        },
        setText() {

        },
        insertTextConfirm(e) {
            let that = this;
            let textValue = `<p class="post_p">${e.detail.value}</p>`
            let newCenterContet = this.data.centerContet + textValue
            this.setData({
                insertType: '',
                centerContet: newCenterContet,
                submitContent: newCenterContet
            })
            let html = this.data.startContent + this.data.centerContet + this.data.endContent
            WxParse.wxParse('content', 'html', html, that)
        }
    }
})