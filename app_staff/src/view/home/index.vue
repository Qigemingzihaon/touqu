<template>
  <div class="Home">
    <div class="product_big">
      <img :src="checkedlist.brandurl" alt="">
    </div>
    <div class="product_little">
      <div class="swiper-container">  
          <div class="swiper-wrapper">  
            <div class="swiper-slide"
              @click="checkedcoll(index)"
              v-for="(item,index) in productlist" 
              :key="index">
              <div :class="[{'checked':checkedindex==index}]" class="img_swiper"><img :src="item.brandurl" alt=""></div>
            </div>  
          </div>  

      </div>  
      <div class="button">
        <div> <img class="left" src="../../assets/images/home/right_s.png" alt=""></div>
        <div class="center">侧滑可以查看更多产品 </div>
        <div><img src="../../assets/images/home/right_s.png" alt=""></div>
        <!-- <div class="swiper-button-prev"></div>
        <div class="swiper-button-next"></div> -->
      </div>
    </div>
    <div @click="createcoll" class="btn"><img src="../../assets/images/home/btn_bg.png" alt=""><div>生成我的海报</div></div>
    <!-- <div class="swiper-pagination"></div> -->
    <div class="shade" v-if="shadeshow">
      <div class="content">
        <div class='title'>信息填写</div>
        <div class="item name">
          <div class='imgdiv'><img class='name' src="../../assets/images/home/name.png" alt=""></div>
          <div class='inputdiv'>
            <input 
              @blur="inputblur"
              v-model="personalD.name" 
              type="text" placeholder="请填写您的姓名"></div>
        </div>
        <div class="item tel">
          <div class='imgdiv'><img class='tel' src="../../assets/images/home/tel.png" alt=""></div>
          <div class='inputdiv'>
            <input 
              @blur="inputblur"
              v-model="personalD.tel"
              type="tel" placeholder="请输入手机号"></div>
        </div>
        <div class="item verify">
          <div class='imgdiv'><img class='verify' src="../../assets/images/home/verify.png" alt=""></div>
          <div class='inputdiv'>
            <input 
              @blur="inputblur"
              maxlength="6"
              v-model="personalD.code"
              type="text" placeholder="请输入验证码">
            <div
                @click="getverify"
                class='btn_s'
              >获取验证码
              <div class='l'></div>
              <div
                  v-if="disabledtime"
                  class='btn_n'
                >{{verifytime}}S</div>
              </div>
          </div>
        </div>
        <div class="item address">
          <div class='imgdiv'><img class='address' src="../../assets/images/home/address.png" alt=""></div>
          <div class='inputdiv'>
            <input 
              @blur="inputblur"
              slot="right"
              type="text"
              @click.stop="addressselectcoll()"
              v-model="address_text"
              readonly
              placeholder="请填写您的地址"></div>
              <yd-cityselect
                v-model="addressselect"
                :callback="result1"
                :items="district"
              ></yd-cityselect>
        </div>
        <div @click="hideShadecoll" class="item bttn"><div>去制作<img src="../../assets/images/home/right.png" alt="" srcset=""></div></div>
      </div>
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
.Home .address .yd-cityselect {
  height: 50%;
}
.swiper-button-disabled{
  display:none;
}
.swiper-pagination-bullet{
    margin: 0 0.02rem;
}
.swiper-pagination-bullet-active{
    background: #ff4e3a;
}
</style>

