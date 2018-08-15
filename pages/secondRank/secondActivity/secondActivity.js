// pages/secondRank/secondActivity/secondActivity.js
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

    },

    /**
     * 组件的方法列表
     */
    methods: {
        viewImg() {
            wx.previewImage({
                current: 'https://p8rk87lub.bkt.clouddn.com/active-0806.png', // 当前显示图片的http链接
                urls: ['https://p8rk87lub.bkt.clouddn.com/active-0806.png'] // 需要预览的图片http链接列表
            })
        },
        longtapimg(){
            
        }
    }
})