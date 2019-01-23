<template>
  <div id="app">
    <keep-alive>
      <!--使用keep-alive会将页面缓存-->
      <router-view v-if="$route.meta.keepAlive"></router-view>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive"></router-view>
    <!-- <v-loding></v-loding> -->
  </div>
</template>

<script>
let htmlWidth = document.documentElement.clientWidth || document.body.clientWidth;
// document.getElementById('app').style.minHeight = window.screen.availHeight;
//得到html的Dom元素
let htmlDom = document.getElementsByTagName('html')[0];
//设置根元素字体大小
htmlDom.style.fontSize = htmlWidth / 7.5 + 'px';
export default {
  name: 'App'
}
</script>

<style>
* {
  margin: 0;
  padding: 0;
  -webkit-appearance:none;
  -webkit-tap-highlight-color: rgba(0,0,0,0);
  -webkit-tap-highlight-color:transparent;
}

/* @font-face {
    font-family: 'happyzcoolregular';
    src: url('./assets/css/happyzcool-webfont.woff2') format('woff2'),
         url('./assets/css/happyzcool-webfont.woff') format('woff'),
         url('./assets/css/happyzcool-webfont.svg') format('svg');
    font-weight: normal;
    font-style: normal;
} */
body{
  width: 100%;
  height: 100%;
}
#app {
  font-family: "Avenir", 'Happy_my',Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  width: 100%;
  height: 100%;
}
</style>
