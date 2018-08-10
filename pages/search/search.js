// pages/search/search.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        haveResult: false,
        hotKey: [{
                "search_key": "面膜"
            },
            {
                "search_key": "哈哈哈"
            },
            {
                "search_key": "哈哈哈"
            },
            {
                "search_key": "哈哈哈1"
            },
            {
                "search_key": "设置列大卡司进口量达"
            },
            {
                "search_key": "阿斯达斯"
            }
        ],
        searchResult: {},
        resultRank: [{
            "ranking_p_name": "日本COSME大赏2017年度榜单",
            "ranking_name": "2018年度热门排行榜",
            "rating": "B",
            "id": 40,
            "data": [{
                    "element_name": "SK-II 护肤面膜",
                    "id": 520,
                    "created_at": "2018-05-14 10:12:15",
                    "updated_at": "2018-05-14 10:12:15",
                    "img": null
                },
                {
                    "element_name": "雅诗兰黛 全新微精华面膜",
                    "id": 521,
                    "created_at": "2018-05-14 10:12:15",
                    "updated_at": "2018-05-14 10:12:15",
                    "img": null
                },
                {
                    "element_name": "悦木之源 粉滑嫩面膜",
                    "id": 522,
                    "created_at": "2018-05-14 10:12:15",
                    "updated_at": "2018-05-14 10:12:15",
                    "img": null
                },
                {
                    "element_name": "科颜氏 姜黄蔓越莓籽活力亮采面膜",
                    "id": 523,
                    "created_at": "2018-05-14 10:12:15",
                    "updated_at": "2018-05-14 10:12:15",
                    "img": null
                },
                {
                    "element_name": "芳珂 盈润细致精华面膜",
                    "id": 524,
                    "created_at": "2018-05-14 10:12:15",
                    "updated_at": "2018-05-14 10:12:15",
                    "img": null
                }
            ]
        }, {
            "ranking_p_name": "日本COSME大赏2017年度榜单",
            "ranking_name": "2018年度热门面膜排行榜",
            "rating": "B",
            "id": 40,
            "data": [{
                    "element_name": "SK-II 护肤面膜",
                    "id": 520,
                    "created_at": "2018-05-14 10:12:15",
                    "updated_at": "2018-05-14 10:12:15",
                    "img": null
                },
                {
                    "element_name": "雅诗兰黛 全新微精华面膜",
                    "id": 521,
                    "created_at": "2018-05-14 10:12:15",
                    "updated_at": "2018-05-14 10:12:15",
                    "img": null
                },
                {
                    "element_name": "悦木之源 粉滑嫩面膜",
                    "id": 522,
                    "created_at": "2018-05-14 10:12:15",
                    "updated_at": "2018-05-14 10:12:15",
                    "img": null
                },
                {
                    "element_name": "科颜氏 姜黄蔓越莓籽活力亮采面膜",
                    "id": 523,
                    "created_at": "2018-05-14 10:12:15",
                    "updated_at": "2018-05-14 10:12:15",
                    "img": null
                },
                {
                    "element_name": "芳珂 盈润细致精华面膜",
                    "id": 524,
                    "created_at": "2018-05-14 10:12:15",
                    "updated_at": "2018-05-14 10:12:15",
                    "img": null
                }
            ]
        }],
        resultElement: [],
        resultPost: []
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {

    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function() {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function() {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function() {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function() {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function() {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function() {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function() {

    }
})