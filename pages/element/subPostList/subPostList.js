// pages/element/subPostList/subPostList.js
const wxParse = require('../../../wxParse/wxParse.js')
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        postList: {
            type: Array,
            value: [],
            observer(n, o, c) {
                for (let k in n) {
                    for (let i = 0; i < n.length; i++) {
                        //POST创建者数据
                        let userInfoObj = {
                            avatar: n[i].avatar,
                            name: n[i].create_user
                        }
                        n[i].user = userInfoObj;
                        if (n[i].type == 1) {
                            let html = n[i].post_content;
                            let reg = /<[^>]+>|&[a-z]*;/g;
                            let htmlArr = html.split(reg)
                            n[i].post_content = htmlArr.join('')
                        } else if (n[i].type == 3) {
                            let html = n[i].post_content;
                            let reg = /<[^>]+>|&[a-z]*;/g
                            let htmlArr = html.split(reg);
                            if (n[i].img) {

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
                                        n[i].img = srcArr[1]
                                    }
                                }
                            }
                            n[i].post_content = htmlArr.join('')
                        } else if (n[i].type == 2) {
                            if (n[i].img) {

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
                                        n[i].img = srcArr[1]
                                    }
                                }
                            }
                        } else if (n[i].type == 5) {

                        }
                    }
                    this.setData({
                        subPost: n
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