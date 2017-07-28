var bmap = require('../../libs/bmap-wx.min.js');
var wxMarkerData = [];
Page({
   data: {
      markers: [], // POI数组
      latitude: '',
      longitude: ''
   },
   // 点击地图
   makertap: function (e) {
      // var that = this;
      // var id = e.markerId;
      // that.showSearchInfo(wxMarkerData, id);   // 显示 兴趣点信息
      // that.changeMarkerColor(wxMarkerData, id);
   },
   // 页面加载
   onLoad: function () {
      var that = this;

      var BMap = new bmap.BMapWX({
         ak: 'Sen3NdHvcNdy1A4DQQzHbXfU9hrrGp6P' // 创建应用获得ak
      });
      var fail = function (data) {
         console.log(data)
      };
      var success = function (data) {

         wxMarkerData = data.wxMarkerData;

         // 打印POI
         for (var i = 0; i < wxMarkerData.length; i++) {
            console.log(wxMarkerData[i].title);
         }

         that.setData({
            markers: wxMarkerData
         });
         that.setData({
            latitude: wxMarkerData[0].latitude
         });
         that.setData({
            longitude: wxMarkerData[0].longitude
         });
      }
      // POI搜索
      BMap.search({
         "query": '', // 搜索条件可以为空（默认返回生活服务、美食、酒店三种类型的POI）
         fail: fail,        // 失败回调
         success: success,  // 成功回调
         iconPath: '../../img/marker_red.png', // 默认图标
         iconTapPath: '../../img/marker_red.png'  // 选中图标
      });
   },

   // 显示 选中点信息
   showSearchInfo: function (data, i) {
      var that = this;
      that.setData({
         placeData: {
            title: '名称：' + data[i].title + '\n',
            address: '地址：' + data[i].address + '\n',
            telephone: '电话：' + data[i].telephone
         }
      });
   },
   // 点击 列表操作
   clickListItem: function (e) {
      var target = e.currentTarget;
      var index = target.dataset.index; // 列表下标
      var title = wxMarkerData[index].title;
      var address = wxMarkerData[index].address;
      var telephone = wxMarkerData[index].telephone;

      wx.showModal({
         title: '我要考勤',
         content: title + '【' + address + '】',
         confirmText: '签到',
         success: function (res) {
            if (res.confirm) {
               wx.showToast({
                  title: '签到成功!',
               })
            }
         }
      })

   },
   // 改变 兴趣点 颜色
   changeMarkerColor: function (data, id) {
      var that = this;
      var markersTemp = [];
      for (var i = 0; i < data.length; i++) {
         if (i === id) {
            data[i].iconPath = "../../img/marker_yellow.png";
         } else {
            data[i].iconPath = "../../img/marker_red.png";
         }
         markersTemp[i] = data[i];
      }
      that.setData({
         markers: markersTemp
      });
   }
})