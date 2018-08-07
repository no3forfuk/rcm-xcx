// components/timeAgo/timeAgo.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        time: {
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
        timeAgo: ''
    },
    attached() {
        let timeAgo = this.getTimeAgo(this.data.time)
        this.setData({
            timeAgo: timeAgo
        })
    },
    /**
     * 组件的方法列表
     */
    methods: {
        getTimeAgo(param) {
            // if (res.system)
            var ms = new Date(param)
            var time = new Date();
            var gap = Math.abs(time - ms);
            var second = parseInt(gap / 1000);
            if (second < 60) {
                return second + '秒前';
            }
            var minuit = parseInt(gap / 1000 / 60);
            if (minuit < 60) {
                return minuit + '分钟前';
            }
            var hour = parseInt(gap / 1000 / 60 / 60);
            if (hour < 24) {
                return hour + '小时前';
            }
            var day = parseInt(gap / 1000 / 60 / 60 / 24);
            if (day > 1) {
                return day + '天前';
            }
        }
    }
})