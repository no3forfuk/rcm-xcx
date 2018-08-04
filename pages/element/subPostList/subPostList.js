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
                        if (n.data[i].type == 1) {
                            let html = n.data[i].post_content;
                            let htmlArr = html.split(/<\/[a-z]*>|<[a-z]*>|&[a-z]*;/)
                            n.data[i].post_content = htmlArr.join('')
                        } else if (n.data[i].type == 3 || n.data[i].type == 2) {
                            let html = n.data[i].post_content;
                            let htmlArr = html.split(/<\/[a-z]*>|<[a-z]*>|&[a-z]*;|<[A-Za-z]*[\s]([A-Za-z]|[0-9]|[=]|["]|[:]|[\/]|[.]|[_]|[-]|[%]|[;])*>/);
                            if (n.data[i].img) {

                            } else {
                                let imgReg = /(([A-Za-z]*)\:\/\/(([A-Za-z0-9]*)\.)*com(\/[A-Za-z]*|[0-9]*|[_]*|[-]*|[\.]*|[\u4e00-\u9fa5])*\.([A-Za-z])*)|(([A-Za-z]*)\:\/\/(([A-Za-z0-9]*)\.)*com\/([A-Za-z]*|[0-9]*|[_]*|[-]*|[\.]*|[\u4e00-\u9fa5])*)/
                                if (imgReg.exec(imgReg.exec(html))) {
                                    n.data[i].img = imgReg.exec(html)[0]
                                }
                            }
                            n.data[i].post_content = htmlArr.join('')
                            console.log(n.data[i])
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

    }
})