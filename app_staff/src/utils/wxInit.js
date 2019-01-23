import wx from 'weixin-js-sdk'
import {getshareconfig} from "@/server/index.js";
export function wx_share(options,callback){
    var httpUrl = location.href;
    let localUrl = '';
    localUrl=httpUrl.split('#')[0];//获取锚点之前的链接
    let params = {
      url:localUrl,
      jsApiList:['onMenuShareTimeline', 'onMenuShareAppMessage','onMenuShareWeibo']
    };
    getshareconfig(params).then(res=>{
        // console.log(res)
        var config_data = res.data;
        // console.log(config_data)
        wx.config({
            debug: false,
            appId: config_data.appId,
            timestamp: config_data.timestamp,
            nonceStr: config_data.nonceStr,
            signature: config_data.signature,
            jsApiList: ['onMenuShareTimeline', 'onMenuShareAppMessage','onMenuShareWeibo',]
        });
        wx.ready(function() {
            wx.onMenuShareTimeline({
              title: options.title, // 分享标题
              desc: options.desc, // 分享描述
              link: options.link, // 分享链接
              imgUrl: options.imgUrl, // 分享图标
              success: function() {
                // console.log(callback,'callback')
                callback()
              },
              cancel: function() {
                alert("分享失败,您取消了分享!")
              }
            });
            //微信分享菜单测试
            wx.onMenuShareAppMessage({
              title: options.title, // 分享标题
              desc: options.desc, // 分享描述
              link: options.link, // 分享链接
              imgUrl: options.imgUrl, // 分享图标
              success:()=> {
                // console.log(callback,'callback')
                callback()
              },
              cancel: function() {
                alert("分享失败,您取消了分享!")
              }
            });
            wx.onMenuShareWeibo({
              title: options.title, // 分享标题
              desc: options.desc, // 分享描述
              link: options.link, // 分享链接
              imgUrl: options.imgUrl, // 分享图标
              success:()=> {
                // console.log(callback,'callback')
                callback()
              },
              cancel: function() {
                alert("分享失败,您取消了分享!")
      //              Toast({
      //                message: "分享失败,您取消了分享!"
      //              });
              }
            });
        });
    })
}