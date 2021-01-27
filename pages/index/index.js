// index.js
Page({
  data: {
    list:[],
    info:{
      page:1,
      total:0
    }
  },

  search: function () {
    wx.navigateTo({
      url: '../search/search'
    })
  },

  onLoad:function(options){
    this.handleSearch()
  },
  handleSearch: function (page) {
    var that=this
    wx.request({
      url:'http://api.hunsh.net/s1/?page=1&q=',
      method: 'GET',
      data: {
        page:page||1,
        q:'', 
      },
      header: {
        'Content-Type': 'json'
      },
    
      success: (result)=> {
    const ap= Math.ceil(result.data.info.total/30);
    const start=Math.max(result.data.info.page-2,1);
    const end=Math.min(result.data.info.page+2,ap);
    
        this.setData(({
          list:result.data.data,
          pp: Array.from({
            length:end-start+1
          },(x,i)=>i + start)
        }))
        wx.setStorage({
          key: 'list',
          data: result.data,
        })
      },
    })
  },
  handlePageChange(e){
    console.log(e)
    this.handleSearch(e.target.dataset.page)
  }
})
