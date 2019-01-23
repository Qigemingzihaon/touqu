<template>
  <div class="Home">
    <yd-cityselect
      v-show="addressselect"
      v-model="addressselect"
      :callback="result1"
      :items="district"
    ></yd-cityselect>
    <div class="title_img">
      <img src="../../assets/images/home/title_bg.png" alt="">
    </div>
    <div class="drawNumber">
      <div class="drawNum">剩余抽奖机会：{{drawNumber}}次</div>
    </div>
    <Sudokulucky :prize="prize" :drawB="drawB" :drawNumber="drawNumber" v-on:returncoll="returncoll"></Sudokulucky>
    <div @click="showcoll('rule')" class="explain">活动规则说明
      <div class="invite" v-if="topeopid">
        <div class="invitebg" @click.stop="toinvitecoll">去邀请好友</div>
      </div>
    </div>
    <div class="draw_d">
      <img src="@/assets/images/home/draw_d.png" alt="">
    </div>
    <div class="my_draw_d">
      <div class="item head">
        <div class = "name">奖品名称</div>
        <!-- <div class = "number">奖品数量</div> -->
        <div class = "status">状态</div>
      </div>
      <div class="item" v-for="(award,index) in draw" :key="index">
        <div class = "name">{{award.proname}}</div>
        <!-- <div class = "number">1</div> -->
        <div class = "status">
          <div v-if="award.prostate==2" class='status_Y'>已领取</div>
          <div v-if="award.prostate==3" class='status_Y'>已失效</div>
          <div @click="getawardcoll(index)" v-if="award.prostate==1" class='status_N'>领取</div>
        </div>
      </div>
      <div class="remark">注：奖品须在中奖后24小时内领取，超时失效。</div>
    </div>
    <div class="shade" v-if="shade" @touchmove='moveimgcoll'>
      <div class="rule" v-if="rule">
        <div class="title">活动规则说明</div>
        <div class="item">
          <div class="num">1</div>
          <div class="text">本次活动时间从{{start}}持续开展到{{end}}，共计{{datenumber}}天。</div>
        </div>
        <div class="item">
          <div class="num">2</div>
          <div class="text">活动期间每位用户每天进入抽奖页面可获取{{countday}}次抽奖机会。</div>
        </div>
        <div class="item">
          <div class="num">3</div>
          <div class="text">参与抽奖即有机会获得现金红包、泸州老窖酒心巧克力和1元购泸州老窖头曲系列酒的资格。</div>
        </div>
        <div class="item">
          <div class="num">4</div>
          <div class="text">中现金红包时，请于24小时以内领奖，到账到微信零钱，过期将不再发放；中实物奖时，请于24小时以内领奖并正确填写收货信息。如因收货信息有误导致活动奖品无法发放，由此产生的后果自行承担。</div>
        </div>
        <div class="item">
          <div class="num">5</div>
          <div class="text">所有实物礼品将在活动结束后的1个月内免费寄出。</div>
        </div>
        <div class="item">
          <div class="num">6</div>
          <div class="text">使用任何舞弊行为的用户一经发现，即刻取消参与活动资格。</div>
        </div>
        <div class="hint">
          本次活动由九趣互动提供技术支持
        </div>
        <div class="esc">
          <img @click="escrulecoll" src="@/assets/images/home/esc.png" alt="" srcset="">
        </div>
      </div>
      <div class="Lottery" v-if="Lottery">
        <div class="title">
          <img v-if="Winning" src="@/assets/images/home/title_y.png" alt="">
          <img v-else src="@/assets/images/home/title_n.png" alt="">
        </div>
        <div class="content" v-if="icon">
          <div class="img_J img_icon">
            <img v-if="Winning" src="@/assets/images/home/icon_ok.png" alt="">
            <img v-if="!Winning" src="@/assets/images/home/zjzl.png" alt="">
          </div>
          <div class="text_J text_icon">
            <div v-if="Winning">领取成功</div>
            <div v-if="!Winning">很遗憾，您未中奖</div>
          </div>
        </div>
        <div v-if="icon" class="btn" @click="btncoll">
          {{Winning?'完成':'再抽一次'}}
        </div>
        <div class="content" v-if="!icon">
          <div class="img_J" :class="[{'img_s':!icon}]">
            <img v-if="award.protype===1" src="@/assets/images/home/$.png" alt="">
            <img v-if="award.protype===2" :src="award.img" alt="">
          </div>
          <div class="text_J" :class="[{'text_s':!icon}]">
            <div v-if="award.protype===2">数量：1 盒</div>
            <div>恭喜您获得{{award.proname}}</div>
          </div>
        </div>
        <div v-if="!icon" class="btn" @click="btncoll">
          {{Winning?'立即领取':'再抽一次'}}
        </div>
        <div class="esc">
          <img @click="escrulecoll" src="@/assets/images/home/esc.png" alt="" srcset="">
        </div>
      </div>
      <div class="address" v-if="address">
        <div class="title">
          <img src="@/assets/images/home/title_add.png" alt="">
        </div>
        <div class="content">
          <div class='state'>
            <input
              type="text"
              @blur="inputblur"
              v-model="goodsRI.peoplename"
              placeholder='请输入姓名'
            >
          </div>
          <div class='state'>
            <input
              type="text"
              @blur="inputblur"
              v-model="goodsRI.tel"
              placeholder='请输入本人手机号码'
            >
          </div>
          <div class='state'>
            <div class='btn_text'>
              <input
                type="text"
                maxlength="6"
                @blur="inputblur"
                v-model="goodsRI.code"
                placeholder='请输入验证码'
              >
              <div
                @click="getverify"
                class='btn_s'
              >获取验证码<div
                  v-if="disabledtime"
                  class='btn_n'
                >{{verifytime}}</div>
              </div>
            </div>

          </div>
          <div class='state site'>
            <input
              slot="right"
              type="text"
              @click.stop="addressselectcoll()"
              v-model="address_text"
              readonly
              placeholder="点击选择省市区"
            >

            <!-- <v-distpicker></v-distpicker> -->
          </div>
          <div class='statearea'>
            <textarea
              type="text"
              @blur="inputblur"
              v-model="goodsRI.street"
              placeholder='请填写详细收货地址，如门牌等等'
            ></textarea>
          </div>
        </div>
        <div class="btn" @click="submitcoll">
          立即提交
        </div>
        <div class="esc">
          <img @click="escrulecoll" src="@/assets/images/home/esc.png" alt="" srcset="">
        </div>
      </div>
      <div class="address redpacket" v-if="redpacket">
        <div class="title">
          <img src="@/assets/images/home/title_add.png" alt="">
        </div>
        <div class="content">
          <div class='state'>
            <input
              type="text"
              @blur="inputblur"
              v-model="goodsRI.tel"
              placeholder='请输入本人手机号码'
            >
          </div>
          <div class='state'>
            <div class='btn_text'>
              <input
                type="text"
                maxlength="6"
                @blur="inputblur"
                v-model="goodsRI.code"
                placeholder='请输入验证码'
              >
              <div
                @click="getverify"
                class='btn_s'
              >获取验证码<div
                  v-if="disabledtime"
                  class='btn_n'
                >{{verifytime}}</div>
              </div>
            </div>
          </div>
        </div>
        <div class="btn" @click="redpacketcoll">
          立即提交
        </div>
        <div class="esc">
          <img @click="escrulecoll" src="@/assets/images/home/esc.png" alt="" srcset="">
        </div>
      </div>
    </div>
    <div class="shades" v-if="activity" @touchmove='moveimgcoll'>
      <div class="start">
        <div class="text" v-if="activityend">
          <div>活动于{{end}}结束，感谢您的关注。</div>
          <!-- <div>敬请期待下次活动</div> -->
        </div>
        <div class="text" v-if="activitybe_end">
          <div>活动将于{{end}}结束，请尽快领取奖品</div>
        </div>
        <div class="text" v-if="activitystart">
          <div>活动将于{{start}}开始,敬请期待</div>
        </div>
        <div class="btn" v-if="activitybe_end" @click="activitycoll">
          确定
        </div>
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
.Home .yd-cityselect {
  height: 50%;
}
</style>