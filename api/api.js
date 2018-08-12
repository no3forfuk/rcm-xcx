const ApiFactory = function(token) {
    let baseUrl = 'https://www.rcm.ink/api'

    function ajax_get(data) {
        wx.request({
            url: baseUrl + data.uri,
            data: data.params,
            method: 'GET',
            header: {
                Authorization: 'Bearer ' + token
            },
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
        let baseUrl = 'https://www.rcm.ink/api'
        wx.request({
            url: baseUrl + data.uri,
            data: data.params,
            method: 'POST',
            header: {
                Authorization: 'Bearer ' + token
            },
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
    return {
        //登陆
        login(params, success) {
            ajax_post({
                uri: '/xcx/xcxLogin',
                params: params,
                s_cb(res) {
                    success(res)
                }
            })
        },
        //获取一级榜单列表
        getFirstRanking(success) {
            ajax_get({
                uri: '/home/index/firstList',
                params: null,
                s_cb(res) {
                    success(res)
                }
            })
        },
        //获取首页推送榜单列表
        getIndexRanking(date, success) {
            ajax_post({
                uri: '/home/index',
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
                uri: '/home/ranking/getRanking',
                params: params,
                s_cb(res) {
                    success(res)
                }
            })
        },
        //二级榜单收藏/取消收藏
        collectRankLv2(params, success, fail) {
            ajax_post({
                uri: '/home/ranking/secondCollect',
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
                uri: '/home/element/elementCollect',
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
                uri: '/home/element/getElementDetails',
                params: params,
                s_cb(res) {
                    success(res)
                }
            })
        },
        //获取榜单评论
        getSecondDiscuss(secondId, success) {
            ajax_get({
                uri: '/home/ranking/getComment',
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
                uri: '/home/post/getPostDetails',
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
                uri: '/home/ranking/getComment',
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
                uri: '/home/ranking/getRanking',
                params: params,
                s_cb(res) {
                    success(res.data)
                }
            })
        },
        //获取热门榜单
        getHotRank(page, success) {
            ajax_get({
                uri: '/home/index/hotRanking',
                params: {
                    page: page
                },
                s_cb(res) {
                    success(res.data)
                }
            })
        },
        //获取热门Post
        getHotPost(page, success) {
            ajax_get({
                uri: '/home/index/hotPost',
                params: {
                    page: page
                },
                s_cb(res) {
                    success(res.data)
                }
            })
        },
        //获取热门搜索词
        getHotKeyWords(success) {
            ajax_get({
                uri: '/home/search/hotSearchKey',
                s_cb(res) {
                    success(res.data)
                }
            })
        },
        //关键字搜索
        searchByKeyWords(params, success) {
            ajax_post({
                uri: '/home/search/search',
                params: params,
                s_cb(res) {
                    success(res)
                }
            })
        },
        //获取七牛上传token 
        get7niuToken(success) {
            ajax_post({
                uri: '/home/qiniu/getUploadToken',
                s_cb(res) {
                    success(res)
                }
            })
        }
    }
}

module.exports = ApiFactory