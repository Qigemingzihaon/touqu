// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import 'vue-ydui/dist/ydui.base.css';
import 'swiper/dist/css/swiper.css';
import router from './router'
import store from './store/store.js'
import wx from 'weixin-js-sdk';
Vue.config.productionTip = false
Vue.prototype.wx= wx;

//弹出框禁止滑动
Vue.prototype.noScroll = function () {
  var mo = function (e) { e.preventDefault() }
  document.body.style.overflow = 'hidden'
  document.addEventListener('touchmove', mo,{ passive: false })// 禁止页面滑动
}
 
//弹出框可以滑动
Vue.prototype.canScroll = function () {
  var mo = function (e) {
//     e.preventDefault()
  }
  document.body.style.overflow = ''// 出现滚动条
  document.removeEventListener('touchmove', mo,{ passive: false })
}
Vue.prototype.overscroll = function(el) {
  el.addEventListener('touchstart', function() {
    var top = el.scrollTop
      , totalScroll = el.scrollHeight
      , currentScroll = top + el.offsetHeight;
    if(top === 0) {
      el.scrollTop = 1;
    } else if(currentScroll === totalScroll) {
      el.scrollTop = top - 1;
    }
  },{ passive: false });
  el.addEventListener('touchmove', function(evt) {
    if(el.offsetHeight < el.scrollHeight)
      evt._isScroller = true;
  },{ passive: false });
}
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
