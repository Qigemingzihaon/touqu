import { CitySelect } from 'vue-ydui/dist/lib.rem/cityselect';
import { Alert, Toast } from 'vue-ydui/dist/lib.rem/dialog';
import District from 'ydui-district/dist/jd_province_city_area_id';
import { getSSession, setSSession } from '@/utils/session.js';
import { wx_share } from '@/utils/wxinit.js';
import { share_m } from '@/utils/share.js';
import { postlogin,getcode,receive,getmydata,getposterbyid } from '@/server/index.js';
import Sudokulucky from '@/components/Sudokulucky/index.vue';
import Vue from 'vue';
Vue.component(CitySelect.name, CitySelect)
export default {
  components: {
    Sudokulucky,
    Alert, 
    Toast
  },
  props: {},
  data() {
    return {
      district: District,
      //收货信息
      goodsRI: {
        peoplename: '',
        tel: '',
        code: '',
        site: '',
        street: '',
      },
      address_text: '', //省市区
      verifytime: 60,
      disabledtime: false,
      addressselect:false,
      //
      drawNumber: 0,//抽奖次数
      scrollTop: 0,
      topeopid:false,
      start:'',
      end:'',
      datenumber:0,
      drawB:false,
      shade:false,//遮罩层显示
      rule:false,//规则显示
      Lottery:false,//开奖弹框
      Winning:false,//是否中奖
      icon:false,//是否显示图标
      address:false,//填写地址
      redpacket:false,
      redpacketB:false,
      activity:false,
      activitystart:false,
      activitybe_end:false,
      activityend:false,
      play: true,
      award:{},
      draw:[],//中奖信息
      drawindex:0,
      prize:[],//奖品列表
      countday:0,
      request:true,//请求是否完成
    }
  },
  watch: {
    play: function(ele) {

    },
    activity:function(ele){
      if(ele){
        this.noScroll()
      }else{
        this.canScroll()
      }
    },
    shade:function(ele){
      if(ele){
        this.noScroll()
      }else{
        this.canScroll()
      }
    },
  },
  computed: {
    
  },
  methods: {
    toShareCenter() {
      let options_t = share_m();
      let options = {
        title: options_t.title,
        desc: options_t.desc,
        link: options_t.link, // 分享链接
        imgUrl: options_t.imgUrl,
      }
      function callback() {
        // this.share = false
      }
      wx_share(options, callback)
    },
    moveimgcoll(e){
      e.preventDefault() 

      // console.log(e)
    },
    //领取奖品
    getawardcoll(index){
      console.log(index)
      this.drawindex = index;
      this.award=this.draw[index];
      console.log( this.award)
      if(this.award.protype===2){
        this.showcoll('address')
      }else if(this.award.protype===1){
        if(this.redpacketB){
          this.redpacketcoll(false)
        }else{
          this.showcoll('redpacket');
        }
      }
    },
    //获取验证码
    getverify() {
      if(this.disabledtime){
        return
      }
      if (!/^[1][3,4,5,7,8,9][0-9]{9}$/.test(this.goodsRI.tel)) {
        Toast({
          mes: '手机号输入错误！',
          timeout: 1500,
        })
        return
      }
      if(!this.request){
        return
      }
      this.request=false;
      getcode({ iphone: this.goodsRI.tel }).then((res, err) => {
        this.request=true;
        if (res.status == 1) {
          Toast({
            mes: '短信已发送,请耐心等待',
            timeout: 1500,
          })
          this.disabledtime = true
          var time = setInterval(() => {
            if (this.verifytime == 0) {
              clearInterval(time)
              this.disabledtime = false
              this.verifytime = 120
            }
            this.verifytime = this.verifytime - 1
          }, 1000)
        } else {
          Toast({
            mes: '请重试！',
            timeout: 1500,
          })
        }
      })
    },
    //显示省市区选择
    addressselectcoll() {
      this.addressselect = true
    },
    //得到省市区
    result1(ret) {
      this.address_text = ret.itemName1 + ' ' + ret.itemName2 + ' ' + ret.itemName3
    },
    //验证输入是否完成
    verifycoll() {
      console.log(this.goodsRI)
      if (this.goodsRI.peoplename == '') {
        this.Toastcoll('收货人没填写')
        return
      }
      if (!/^[1][3,4,5,6,7,8,9][0-9]{9}$/.test(this.goodsRI.tel)) {
        this.Toastcoll('收货人电话没填写')
        return
      }
      if (this.goodsRI.code == '') {
        this.Toastcoll('验证码没填')
        return
      }
      if (this.address_text.split(' ') < 3) {
        this.Toastcoll('省市区不完整')
        return
      }
      if (this.goodsRI.street == '') {
        this.Toastcoll('详细地址没填')
        return
      }
      return true
    },
    //提示方法
    Toastcoll(msg = '错误操作', time = 1500) {
      Toast({
        mes: msg,
        timeout: time,
      })
    },
    //兼容ios——input问题页面
    inputblur(){
      setTimeout(() => {
        if (
          document.activeElement.tagName == 'INPUT' ||
          document.activeElement.tagName == 'TEXTAREA'
        ) {
          return
        }
        let result = 'pc'
        if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {
          //判断iPhone|iPad|iPod|iOS
          result = 'ios'
        } else if (/(Android)/i.test(navigator.userAgent)) {
          //判断Android
          result = 'android'
        }
        if ((result = 'ios')) {
          document.activeElement.scrollIntoViewIfNeeded(true)
        }
      }, 400)
    },
    //提交收货信息
    submitcoll(){
      let that = this;
      if (!this.verifycoll()) {
        return
      }
      let address_text = this.address_text.split(' ')
      let data = {
        street: this.goodsRI.street,
        province: address_text[0],
        city: address_text[1],
        region: address_text[2],
        peopname: this.goodsRI.peoplename,
        code: this.goodsRI.code,
        drawid:this.award.drawid
      }
      if(!this.request){
        return
      }
      this.request=false;
      // console.log (data);
      receive(data).then((res) => {
        // console.log(res)
        this.request=true;
        if (res.status == 1) {
          that.Toastcoll('奖品发货中……')
          that.Winning=true;
          that.icon=true;
          that.Lottery=true;
          that.address=false;
          that.draw[that.drawindex].prostate=2;
        } else if (res.status == 15) {
          that.Toastcoll('请先获取验证码')
        }else{
          let msg = res.message;
          that.Toastcoll(msg);
        }
      })      
    },
    //获取红包信息
    redpacketcoll(B=true){
      let that = this;
      let data = {
        code: this.goodsRI.code,
        drawid:this.award.drawid
      }
      if(this.goodsRI.tel===''&&B){
        that.Toastcoll('请输入手机号')
        return
      }
      if(this.goodsRI.code===''&&B){
        that.Toastcoll('请输入验证码')
        return
      }
      if(!this.request){
        return
      }
      this.request=false;
      // console.log (data);
      receive(data).then((res) => {
        console.log(res,res.status)
        this.request=true;
        if (res.status == 1) {
          that.Toastcoll('已发送……')
          if(!that.shade){
            that.shade=true;
          };
          that.Winning=true;
          that.icon=true;
          that.Lottery=true;
          that.redpacket=false;
          that.redpacketB = true;
          setSSession('redpacket', that.goodsRI.tel);
          that.draw[that.drawindex].prostate=2;
        } else if (res.status == 15) {
          that.Toastcoll('请先获取验证码');
        } else {
          let msg = res.message;
          that.Toastcoll(msg);
        };

      })      
    },
    //跳转海报页面
    toinvitecoll(){
      getposterbyid({peopid:getSSession('peopid')}).then(res=>{
        if(res.status==1){
          this.$router.push({
            path:'/poster',
            query:{
              url:res.data.posterurl
            }
          })
        }
      })
    },
    activitycoll(){
      this.activity = false;
    },
    //点击弹框按钮
    btncoll(){
      if(this.Winning){
        if(this.icon){
          this.Lottery=false;
          this.shade=false;//遮罩层关闭
          return
        }
        this.Lottery=false;
        if(this.award.protype===2){
          this.address=true;
        }else{
          if(this.redpacketB){
            this.redpacketcoll(false)
          }else{
            this.redpacket=true;
          }
        }
      }else{
        this.escrulecoll()
      }
    },
    //显示弹框
    showcoll(key){
      this.shade=true;//遮罩层显示
      this.rule=false;//规则关闭
      this.Lottery=false;//开奖弹框
      this.Winning=false;//是否中奖
      this.icon=false;//是否显示图标
      this.address=false;//填写地址
      this.redpacket=false;
      this[key]=true;
    },
    //取消弹框
    escrulecoll(){
      this.shade=false;//遮罩层关闭
      this.rule=false;//规则关闭
      this.Lottery=false;//开奖弹框
      this.Winning=false;//是否中奖
      this.icon=false;//是否显示图标
      this.address=false;//填写地址
      this.redpacket=false;
    },
    //获取奖品信息
    getmydatacoll(){
      getmydata({}).then((res) => {
        console.log(res)
        if (res.status == 1) {
          this.drawNumber=res.data.number;
          this.countday = res.data.countday;
          this.draw=res.data.draw;
          this.prize=res.data.prize;
        } else{
          this.Toastcoll('请刷新')
        }
      })  
    },
    //得到抽奖信息
    returncoll(award){
      if(award==''){
        if(this.drawNumber==0){
          this.Toastcoll('沒有抽奖次数了~')
        }else{
          this.Toastcoll('稍后再试~')
        }
      }else{
        this.award = award;
        this.drawNumber>0?this.drawNumber=this.drawNumber-1:0;
        if(award.protype==2||award.protype==1){
          let awardlist = [];
          awardlist.push(award)
          let newdraw = awardlist.concat(this.draw);
          this.draw=newdraw;
          this.Winning=true;//是否中奖
          this.icon=false;//是否显示图标
        }else{
          this.Winning=false;//是否中奖
          this.icon=true;//是否显示图标
        }
        this.Lottery=true;//开奖弹框
        this.showcoll('Lottery')
      }
      // console.log(award)
    },
    datecoll(){
      let datestring = JSON.parse(getSSession('datestring'));
      // let date = new Date();
      // let datestart = new Date(datestring.starttime);
      // let dateend = new Date(datestring.endtime);
      // this.start =datestart.getFullYear()+'年'+ (datestart.getMonth()+1)+'月'+datestart.getDate()+'日';
      // this.end =dateend.getFullYear()+'年'+ (dateend.getMonth()+1)+'月'+dateend.getDate()+'日';
      this.start =datestring.starttime||'';
      this.end =datestring.endtime||'';
      this.datenumber = datestring.sumday||'';
      // let activitybe_end = Math.round((dateend-date)/(24*60*60*1000))
      if(datestring.nowtype===1){
        this.activity = true;
        this.activitystart = true;
      }
      if(datestring.nowtype===3){
        this.activity = true;
        this.activityend = true;
      }
      if(datestring.nowtype===2){
        this.activity = true;
        this.activitybe_end = true;
      }
      if(datestring.nowtype===0||datestring.nowtype===2){
        this.drawB=true;
      }
      console.log(datestring,this.start,this.end,this.datenumber)
    },
  },
  created() {
    let date = {
      endtime:1549814399000,
      starttime:1548777601000,
    }
    // setSSession('datestring',JSON.stringify(date));
    // setSSession('access_token', '17_iGtdhxqmxRzl95uCpyJjrl1XQMVBi72sS2osC7XGeexuIopxxxluLnS9rt4l3JPItXsq9Wn-Ifmmmu_WdFKwsg')
    console.log(getSSession('peopid'));
    if(getSSession('peopid')){
      this.topeopid=true
    };
    if(getSSession('redpacket')){
      this.redpacketB =true; 
    }
    this.datecoll();
    this.toShareCenter();
    this.getmydatacoll();
    if(getSSession('goodsRI')){
      let goodsRI = JSON.parse(getSSession('goodsRI'))
      this.goodsRI.peoplename=goodsRI.peopname;
      this.goodsRI.tel=goodsRI.iphone;
      this.address_text=goodsRI.province + ' ' + goodsRI.city + ' ' + goodsRI.region;
      this.goodsRI.street=goodsRI.street;
    }
  },
  mounted() {
    // document.getElementsByClassName('yd-mask')[0].addEventListener('touchmove',function(e){
    //   e.preventDefault()
    // });
    // console.log(yd)
    // this.noScroll()
    // this.overscroll(document.querySelector('#app'))
    // document.body.addEventListener(
    //   'touchmove',
    //   function(evt) {
    //     console.log(evt,evt.view.pageYOffset,evt.view.scrollY)
    //     if ((evt.view.pageYOffset==0||evt.view.scrollY==0)) {
    //       evt.preventDefault()
    //     }
    //   },
    //   { passive: false }
    // )
  },
}
