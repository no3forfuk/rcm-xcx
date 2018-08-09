// components/userInfoCard/userInfCard.js

const app = getApp()
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
        userInfo: {}
    },
    attached() {
        wx.getSetting({
            success: res => {
                if (res.authSetting['scope.userInfo']) {
                    wx.getUserInfo({
                        success: res => {
                            console.log(res.userInfo)
                            this.setData({
                                userInfo: res.userInfo
                            })
                        }
                    })
                } else {
                    console.log('未授权登陆')
                }
            }
        })

    },
    /**
     * 组件的方法列表
     */
    methods: {
        ontapedit(e) {
            app._ajax().getFirstRanking({id:1,level:1,page:1})
        }
    }
})