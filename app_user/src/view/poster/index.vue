<template>
  <div class="Home">
    <div class="product_big">
      <img :src="url" alt="">
    </div>
    <div class="btn">
      <div><div @click="toHome">返回</div></div>
      <div><div>长按保存图片<img :src="url" alt=""></div></div>
    </div>
  </div>
</template>

<script>
import index from './index.js'
export default index;

</script>
<style lang="less" scoped>
@import "./index.less";
</style>
<style>
#app{
    background-color: #ffffff;
}
</style>

