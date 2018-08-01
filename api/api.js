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
    getFirstRanking() {
        ajax_get({
            uri: '/index/firstList',
            params: null,
            s_cb(res) {
                wx.setStorageSync('firstRank', res.data.data)
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
    }
}
module.exports = api