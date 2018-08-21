// pages/secondRank/report/report.js
const app = getApp()
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        reportId: {
            type: String,
            value: '',
            observer(n, o, c) {

            }
        },
        reportType: {
            type: Number,
            value: 0,
            observer(n, o, c) {

            }
        },
        idType: {
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
        reason: ''
    },

    /**
     * 组件的方法列表
     */
    methods: {
        cancel() {
            this.triggerEvent('cancel')
        },
        confirm() {
            let params = {
                report_type: this.properties.reportType,
                report_cause: this.data.reason
            }
            params[this.properties.idType] = this.properties.reportId
            app._ajax().report(params, res => {
                wx.showToast({
                    title: res.message,
                    mask:true
                })
                this.cancel()
            })
        },
        submitReport(e) {
            let params = {
                report_type: this.properties.reportType,
                report_cause: e.detail.value
            }
            params[this.properties.idType] = this.properties.reportId
            app._ajax().report(params, res => {
                wx.showToast({
                    title: res.message,
                    mask:true
                })
                this.cancel()
            })
        },
        setReason(e) {
            this.setData({
                reason: e.detail.value
            })
        }
    }
})