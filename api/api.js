const ApiFactory = function (token) {
    // let baseUrl = 'http://test.bantangtv.com/api' 
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
        //添加元素
        addElement(data, success, fail) {
            ajax_post({
                uri: '/home/element/addElement',
                params: data,
                s_cb(res) {
                    success(res)
                },
                f_cb(res) {
                    fail(res)
                }
            })
        },
        //绑定元素 
        bindElement(data, success, fail) {
            ajax_post({
                uri: '/home/ranking/secondBindElement',
                params: data,
                s_cb(res) {
                    success(res)
                },
                f_cb(res) {
                    fail(res)
                }
            })
        },
        //搜索元素 
        searchElement(key, success) {
            ajax_post({
                uri: '/home/element/getElementName',
                params: {
                    like: key
                },
                s_cb(res) {
                    success(res)
                }
            })
        },
        //评论
        addDiscuss(params, success) {
            ajax_post({
                uri: '/home/comment/addComment',
                params: params,
                s_cb(res) {
                    success(res)
                }
            })
        },
        //获取邀请信息 
        getInviter(type, success) {
            ajax_post({
                uri: '/home/ranking/inviteView',
                params: {
                    type: type
                },
                s_cb(res) {
                    success(res)
                }
            })
        },
        //搜索其他人
        searchPeople(name, success) {
            ajax_post({
                uri: '/home/ranking/searchInvite',
                params: {
                    name: name
                },
                s_cb(res) {
                    success(res)
                }
            })
        },
        //邀请其他人 
        invitePeople(params, success) {
            ajax_post({
                uri: '/home/ranking/invite',
                params: params,
                s_cb(res) {
                    success(res)
                }
            })
        },
        //举报 
        report(params, success) {
            ajax_post({
                uri: '/home/report/report',
                params: params,
                s_cb(res) {
                    success(res)
                }
            })
        },
        //投票
        vote(id, success) {
            ajax_post({
                uri: '/home/vote/addVote',
                params: {
                    element_id: id
                },
                s_cb(res) {
                    success(res)
                }
            })
        },
        //添加post
        addpost(params, success) {
            ajax_post({
                uri: '/home/post/addPost',
                params: params,
                s_cb(res) {
                    success(res)
                }
            })
        },
        //获取个人信息 
        getSelfInfo(success) {
            ajax_post({
                uri: '/home/user/userInfo',
                s_cb(res) {
                    success(res)
                }
            })
        },
        //编辑个人信息
        editSelfInfo(params, success) {
            ajax_post({
                uri: '/home/user/editUser',
                params: params,
                s_cb(res) {
                    success(res)
                }
            })
        },
        //获取通知 home/user/userNotice
        getnotice(type, success) {
            ajax_post({
                uri: '/home/user/userNotice',
                params: {
                    notice_type: type
                },
                s_cb(res) {
                    success(res)
                }
            })
        },
        //读取通知 
        readnotice(id, success) {
            ajax_post({
                uri: '/home/user/userNoticeEdit',
                params: {
                    id: id
                },
                s_cb(res) {
                    success(res)
                }
            })
        },
        //发布榜单
        addRank(params, success) {
            ajax_post({
                uri: '/home/ranking/addSecond',
                params: params,
                s_cb(res) {
                    success(res)
                }
            })
        },
        //收藏列表
        getuserCollect(type, success) {
            ajax_post({
                uri: '/home/user/userCollect',
                params: {
                    type: type
                },
                s_cb(res) {
                    success(res)
                }
            })
        },
        //其他用户信息
        getOtherUserInfo(id, success) {
            ajax_get({
                uri: '/home/user/orderUserInfo',
                params: {
                    id: id
                },
                s_cb(res) {
                    success(res)
                }
            })
        },
        //用户动态
        getuserDynamic(id, success) {
            ajax_post({
                uri: '/home/user/userDynamic',
                params: {
                    to_uid: id
                },
                s_cb(res) {
                    success(res)
                }
            })
        },
        //用户发布榜单列表
        getuserRank(success) {
            ajax_get({
                uri: '/home/user/userRank',
                s_cb(res) {
                    success(res)
                }
            })
        },
        //获取广告home/advert/getAdvert

        //关注  
        takeFocus(id, success) {
            ajax_post({
                uri: '/home/user/userAttention',
                params: {
                    to_uid: id
                },
                s_cb(res) {
                    success(res)
                }
            })
        },
        //点赞 home/praise/add  comment_id  user_type
        addLikeDiscuss(id, success) {
            ajax_post({
                uri: '/home/praise/add',
                params: {
                    comment_id: id,
                    user_type: 1
                },
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
        },
        //获取开关
        getswitch(success) {
            ajax_post({
                uri: '/home/config/getConfig',
                params: {
                    config_name: 'all'
                },
                s_cb(res) {
                    success(res)
                }
            })
        }
    }
}

module.exports = ApiFactory