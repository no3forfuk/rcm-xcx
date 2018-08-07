function ajax_get(data) {
    let baseUrl = 'https://www.rcm.ink/api/home'
    wx.request({
        url: baseUrl + data.uri,
        data: data.params,
        method: 'GET',
        header: {},
        dataType: 'json',
        success(res) {
            if (data.s_cb && res.statusCode == 200) {
                data.s_cb(res.data)
            }
        },
        fail(err) {
            if (data.f_cb) {
                data.f_cb(err)
            }
        },
        complete(res) {
            if (data.c_cb && res.statusCode == 200) {
                data.c_cb(res.data)
            }
        }
    })
}

function ajax_post(data) {
    let baseUrl = 'https://www.rcm.ink/api/home'
    wx.request({
        url: baseUrl + data.uri,
        data: data.params,
        method: 'POST',
        header: {},
        dataType: 'json',
        success(res) {
            if (data.s_cb && res.statusCode == 200) {
                data.s_cb(res.data)
            }
        },
        fail(err) {
            if (data.f_cb) {
                data.f_cb(err)
            }
        },
        complete(res) {
            if (data.c_cb && res.statusCode == 200) {
                data.c_cb(res.data)
            }
        }
    })
}
const api = {
    //获取一级榜单列表
    getFirstRanking(success) {
        ajax_get({
            uri: '/index/firstList',
            params: null,
            s_cb(res) {
                success(res)
            }
        })
    },
    //获取首页推送榜单列表
    getIndexRanking(date, success) {
        ajax_post({
            uri: '/index',
            params: {
                time: date
            },
            s_cb(res) {
                success(res)
            }
        })
    },
    //获取二级榜单详情
    getSecondRankDetails(params, success) {
        ajax_get({
            uri: '/ranking/getRanking',
            params: params,
            s_cb(res) {
                success(res)
            }
        })
    },
    //二级榜单收藏/取消收藏
    collectRankLv2(params, success, fail) {
        ajax_post({
            uri: '/ranking/secondCollect',
            params: params,
            s_cb(res) {
                success(res)
            },
            f_cb(err) {
                fail(err)
            }
        })
    },
    //元素收藏/取消收藏
    collectElement(params, success, fail) {
        ajax_post({
            uri: '/element/elementCollect',
            params: params,
            s_cb(res) {
                success(res)
            },
            f_cb(err) {
                fail(err)
            }
        })
    },
    //获取元素详情 
    getElementDetails(params, success) {
        ajax_get({
            uri: '/element/getElementDetails',
            params: params,
            s_cb(res) {
                success(res)
            }
        })
    },
    //获取榜单评论
    getSecondDiscuss(secondId, success) {
        ajax_get({
            uri: '/ranking/getComment',
            params: {
                level: 2,
                id: secondId
            },
            s_cb(res) {
                success(res)
            }
        })
    },
    //获取POST详情
    getPostDetails(postId, success) {
        ajax_get({
            uri: '/post/getPostDetails',
            params: {
                id: postId
            },
            s_cb(res) {
                success(res)
            }
        })
    },
    //获取POST评论
    getPostDiscuss(postId, success) {
        ajax_get({
            uri: '/ranking/getComment',
            params: {
                level: 3,
                id: postId
            },
            s_cb(res) {
                success(res)
            }
        })
    },
    //获取一级榜单详情
    getFirstDetails(params, success) {
        ajax_get({
            uri: '/ranking/getRanking',
            params: params,
            s_cb(res) {
                success(res)
            }
        })
    }
}
module.exports = api