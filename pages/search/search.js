// pages/search/search.js
const app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        haveResult: false,
        hotKey: [],
        searchResult: {},
        resultRank: [],
        resultElement: [],
        resultPost: [],
        keyWords: '',
        rankTitleNodes: [],
        elementTitleNodes: []
    },
    searchByHotKeyWords(e) {
        this.setData({
            keyWords: e.currentTarget.dataset.value
        })
        this.searchServer()
    },
    goElement(e) {
        let id = e.currentTarget.dataset.id
        wx.navigateTo({
            url: '/pages/element/element?elementId=' + id,
        })
    },
    goPost(e) {
        let id = e.currentTarget.dataset.id
        console.log(id)
        wx.navigateTo({
            url: '/pages/post/post?postId=' + id,
        })
    },
    searchServer() {
        app._ajax().searchByKeyWords({
            type: 'all',
            search_key: this.data.keyWords
        }, res => {
            let keyWordStr = this.data.keyWords;
            let postArr = []
            if (res.data.post.data.length > 0) {
                let _arr = res.data.post.data
                let reg = /<[^>]+>|&[a-z]*;/g
                for (let i = 0; i < _arr.length; i++) {
                    let text = _arr[i].post_content.replace(reg, '')
                    _arr[i].post_content = text
                    // console.log(text)
                    let idx = text.indexOf(keyWordStr)
                    let prefixStr = '...'
                    let length = text.length;
                    let needText = ''
                    if (idx > 90 && length - idx > 150) {
                        needText = text.substr(idx - 20, 150)
                    } else if (idx > 90 && length - idx < 5) {
                        needText = text.substr(idx - 90, 150)
                        needText = text.substr(idx - 80, 150)
                    } else if (idx < 90) {
                        prefixStr = ''
                        needText = text
                    } else if (idx > 90 && length - idx < 150) {
                        needText = text.substr(idx - 80, 150)
                    }
                    let finalText = prefixStr + needText
                    let arr = finalText.split(keyWordStr)
                    let node = [];
                    let children = []
                    for (let j = 0; j < arr.length; j++) {
                        let child = {}
                        if (j > 0) {
                            child = {
                                name: 'span',
                                attrs: {
                                    style: 'color:#FF2C09;'
                                },
                                children: [{
                                    type: 'text',
                                    text: keyWordStr
                                }]
                            }
                            children.push(child)
                            child = {
                                type: 'text',
                                name: 'span',
                                text: arr[j]
                            }
                            children.push(child)
                        } else {
                            child = {
                                type: 'text',
                                name: 'span',
                                text: arr[j]
                            }
                            children.push(child)
                        }
                    }
                    let obj = {
                        name: 'p',
                        children: children
                    }
                    node.push(obj)
                    _arr[i].postNodes = node
                }
                postArr = _arr
            }

            let rankList = res.data.second.data;
            if (rankList.length > 0) {
                for (let i = 0; i < rankList.length; i++) {
                    let arr = rankList[i].ranking_name.split(keyWordStr)
                    let node = [];
                    let children = [{
                        type: 'text',
                        text: '#'
                    }]
                    for (let j = 0; j < arr.length; j++) {
                        let child = {}
                        if (j > 0) {
                            child = {
                                name: 'span',
                                attrs: {
                                    style: 'color:#FF2C09;'
                                },
                                children: [{
                                    type: 'text',
                                    text: keyWordStr
                                }]
                            }
                            children.push(child)
                            child = {
                                type: 'text',
                                name: 'span',
                                text: arr[j]
                            }
                            children.push(child)
                        } else {
                            child = {
                                type: 'text',
                                name: 'span',
                                text: arr[j]
                            }
                            children.push(child)
                        }
                    }

                    let obj = {
                        name: 'p',
                        children: children
                    }
                    node.push(obj)
                    rankList[i].titleNodes = node
                    let parent = {
                        ranking_name: rankList[i].ranking_p_name == null ? '其他' : rankList[i].ranking_p_name
                    }
                    rankList[i].parent = parent
                }
            }
            let elementList = res.data.element.data
            if (elementList.length > 0) {
                for (let i = 0; i < elementList.length; i++) {
                    let arr = elementList[i].element_name.split(keyWordStr)
                    let node = [];
                    let children = [{
                        type: 'text',
                        text: '@'
                    }]
                    for (let j = 0; j < arr.length; j++) {
                        let child = {}
                        if (j > 0) {
                            child = {
                                name: 'span',
                                attrs: {
                                    style: 'color:#FF2C09;'
                                },
                                children: [{
                                    type: 'text',
                                    text: keyWordStr
                                }]
                            }
                            children.push(child)
                            child = {
                                type: 'text',
                                name: 'span',
                                text: arr[j]
                            }
                            children.push(child)
                        } else {
                            child = {
                                type: 'text',
                                name: 'span',
                                text: arr[j]
                            }
                            children.push(child)
                        }
                    }

                    let obj = {
                        name: 'p',
                        attrs: {
                            class: 'element-p'
                        },
                        children: children
                    }
                    node.push(obj)
                    elementList[i].elementNodes = node
                }
            }
            this.setData({
                haveResult: true,
                resultRank: rankList,
                resultElement: elementList,
                resultPost: postArr,
            })
        })
    },
    submitSearch(e) {
        this.setData({
            keyWords: e.detail.value
        })
        this.searchServer()
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        app._ajax().getHotKeyWords(res => {
            this.setData({
                hotKey: res.hot
            })
        })
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