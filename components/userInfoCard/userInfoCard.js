// components/userInfoCard/userInfCard.js

const app = getApp()
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        userInfo: {
            type: Object,
            value: null,
            observer(n, o, c) {

            }
        },
        userType: {
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

    },
    attached() {

    },
    /**
     * 组件的方法列表
     */
    methods: {
        ontapedit() {
            this.triggerEvent('openEdit')
        }
    }
})