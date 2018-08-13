// pages/secondRank/addElement/addElement.js
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
        inputDesc: false,
        hasImg: false,
        imgSrc: '',
        textareaPlaceholder: '',
        selectList: [],
        searchElementResult: [],
        iconList: [],
        tempArr: []

    },
    ready() {
        this.setData({
            textareaPlaceholder: '介绍一下这个新成员吧'
        })
    },
    /**
     * 组件的方法列表
     */
    methods: {
        cancel() {
            this.setData({
                textareaPlaceholder: ''
            })
            this.triggerEvent('cancel')
        },
        confirm() {
            this.triggerEvent('confirm', {
                bindItem: this.data.selectList
            })
        },
        deleteSelectElement(e) {
            let index = e.currentTarget.dataset.index
            let arr = this.data.selectList
            let list = this.data.iconList
            let tempArr = this.data.tempArr
            arr.splice(index, 1)
            delete list[tempArr[index]]
            tempArr.splice(index, 1)
            this.setData({
                selectList: arr,
                iconList: list,
                tempArr: tempArr
            })
        },
        selectElement(e) {
            let item = e.currentTarget.dataset.item
            let idx = e.currentTarget.dataset.idx
            let arr = this.data.selectList
            let iconArr = this.data.iconList
            let tmpArr = this.data.tempArr
            let flag = true
            for (let i = 0; i < arr.length; i++) {
                if (item.id == arr[i].id) {
                    flag = false
                    break;
                } else {
                    flag = true
                    continue
                }
            }
            if (flag) {
                arr.push(item)
            } else {
                return
            }
            iconArr[idx] = idx
            if (iconArr[idx] || iconArr[idx] == 0) {
                tmpArr.push(idx)
            }
            this.setData({
                selectList: arr,
                iconList: iconArr,
                tempArr: tmpArr
            })
        },
        clickNext(e) {
            app._ajax().searchElement(e.detail.value, res => {
                this.setData({
                    searchElementResult: res.data.data
                })
            })
            this.triggerEvent('setNewElementName', e.detail)
            this.setData({
                inputDesc: true
            })
        },
        setElementDesc(e) {
            this.triggerEvent('setNewElementDesc', e.detail)
        },
        selectImg() {
            wx.chooseImage({
                count: 1,
                success: res => {
                    this.setData({
                        hasImg: true,
                        imgSrc: res.tempFilePaths[0]
                    })
                    this.triggerEvent('setElementImg', res)
                }
            })
        },
        previewImage() {
            wx.previewImage({
                current: this.data.imgSrc,
                urls: [this.data.imgSrc]
            })
        }
    }
})