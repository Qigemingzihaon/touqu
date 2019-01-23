<template>
  <div class="Sudokulucky" :class="on_off?'Sudokulucky_1':'Sudokulucky_2'">
    <div
      class="award"
      v-for="(award,index) in awards"
      :key="index"
      :class="[{'marginR': index%3==0||index%3==1},{'marginB': index<7}]"
      @click="start(index)"
    >
      <div class="bg" :class="[{'bg_active': index==current},{'bg_active_s': on_off_bg},{'bg_active':index===4}]"></div>
      <img class="x_btn" v-if="index===0||index===5||index===6" src="../../assets/images/home/笑脸@2x.png" alt="">
      <img class="money" v-if="index===1" src="../../assets/images/home/$.png" alt="">
      <img class="entity" v-if="index===2" :src="award.url" alt="">
      <!-- <img class="entity_j" v-if="index===3||index===7||index===8" :src="award.url" alt=""> -->
      <img class="entity" v-if="index===3||index===7||index===8" :src="award.url" alt="">
      <img class="btn" v-if="index===4" src="../../assets/images/home/btn.png" alt="">
      <div v-if="award.text">{{award.name}}</div>
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