// components/iconImg/iconImg.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        imgSrc: {
            type: String,
            value: '',
            observer(n, o, c) {
                if (n) {
                    console.log(n)
                    this.setData({
                        src: `../../static/icon/${n}`
                    })
                }
            }
        },
        width: {
            type: String,
            value: '',
            observer(n, o, c) {
                
            }
        },
        height: {
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
        src: ''
    },

    /**
     * 组件的方法列表
     */
    methods: {

    }
})