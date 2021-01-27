// pages/search/search.js
Page({
  inputValue:'',
  list:[],
  data: {
      info:{
      page:1,
      total:0
    }
  },

 inputchar: function (e) {
   this.setData({
     inputValue:e.detail.value
   })
  },
  searchButton: function () {
      const APIurl='http://api.hunsh.net/s1/',
      that=this
      wx.request({
        url:APIurl,
        method: 'GET',
        data:{
          page:'1',
          q:this.data.inputValue,
        },
        header: {
          'Content-Type': 'json'
        },
    success: (res)=>{
      console.log(res)
      that.setData({
      list:res.data.data
      })
      },

        fail: function (e) {
          console.log("接口调用失败");
        }
      })
    },

  hideInput: function () {  // 返回主页面
    wx.navigateTo({
      url: '../index/index'   
    })
  }
});
