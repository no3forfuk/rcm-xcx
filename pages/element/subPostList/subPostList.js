// pages/element/subPostList/subPostList.js
const wxParse = require('../../../wxParse/wxParse.js')
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        postList: {
            type: Object,
            value: {},
            observer(n, o, c) {
                for (let k in n) {
                    for (let i = 0; i < n.data.length; i++) {
                        //POST创建者数据
                        let userInfoObj = {
                            avatar: n.data[i].avatar,
                            name: n.data[i].create_user
                        }
                        n.data[i].user = userInfoObj;
                        if (n.data[i].type == 1) {
                            let html = n.data[i].post_content;
                            let reg = /<[^>]+>|&[a-z]*;/g;
                            let htmlArr = html.split(reg)
                            n.data[i].post_content = htmlArr.join('')
                        } else if (n.data[i].type == 3) {
                            let html = n.data[i].post_content;
                            let reg = /<[^>]+>|&[a-z]*;/g
                            let htmlArr = html.split(reg);
                            if (n.data[i].img) {

                            } else {
                                let imgReg = /<img.*?(?:>|\/>)/g
                                let imgArr = html.match(imgReg)
                                if (imgReg.test(html)) {
                                    let img = html.match(imgReg)[0]
                                    let srcReg = /src=[\'\"]?([^\'\"]*)[\'\"]?/i;
                                    if (srcReg.test(img)) {
                                        let srcArr = img.match(srcReg)[0].split('"')
                                        //临时处理
                                        let d_reg = /&[a-z]*;/g
                                        srcArr[1] = srcArr[1].replace(d_reg, '&')
                                        srcArr[1] = srcArr[1].replace("http://", "https://")
                                        n.data[i].img = srcArr[1]
                                    }
                                }
                            }
                            n.data[i].post_content = htmlArr.join('')
                        } else if (n.data[i].type == 2) {
                            if (n.data[i].img) {

                            } else {
                                let imgReg = /<img.*?(?:>|\/>)/g
                                let imgArr = html.match(imgReg)
                                if (imgReg.test(html)) {
                                    let img = html.match(imgReg)[0]
                                    let srcReg = /src=[\'\"]?([^\'\"]*)[\'\"]?/i;
                                    if (srcReg.test(img)) {
                                        let srcArr = img.match(srcReg)[0].split('"')
                                        //临时处理
                                        let d_reg = /&[a-z]*;/g
                                        srcArr[1] = srcArr[1].replace(d_reg, '&')
                                        srcArr[1] = srcArr[1].replace("http://", "https://")
                                        n.data[i].img = srcArr[1]
                                    }
                                }
                            }
                        } else if (n.data[i].type == 5) {

                        }
                    }
                    this.setData({
                        subPost: n.data
                    })
                    break;
                }

            }
        }
    },

    /**
     * 组件的初始数据
     */
    data: {
        subPost: []
    },
    ready() {


    },
    /**
     * 组件的方法列表
     */
    methods: {
        linkToPost(e) {
            wx.navigateTo({
                url: '/pages/post/post?postId=' + e.currentTarget.dataset.id,
            })
        }
    }
})