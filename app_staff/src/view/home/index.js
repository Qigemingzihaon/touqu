import {
  baseURL,
  getposter,
  setmessage,
  getcode,
} from '@/server/index.js'
import { getSSession, setSSession } from '@/utils/session.js'
import { wx_share } from '@/utils/wxinit.js'
import { CitySelect } from 'vue-ydui/dist/lib.rem/cityselect'
import { Alert, Toast } from 'vue-ydui/dist/lib.rem/dialog'
import District from 'ydui-district/dist/jd_province_city_area_id'
import Vue from 'vue'
import Swiper from 'swiper'
import wx from 'weixin-js-sdk'
import { share_m } from '@/utils/share.js'

Vue.component(CitySelect.name, CitySelect)
export default {
  components: {
    Alert, 
    Toast
  },
  props: {},
  data() {
    return {
      district: District,
      //收货信息
      personalD: {
        name: '',
        tel: '',
        code: '',
        site: '',
      },
      address_text: '', //省市区
      verifytime: 60,
      disabledtime: false,
      addressselect:false,
      shadeshow:true,//是否输入信息
      productlist:[
        {brandurl:'https://gatewayfile.oss-cn-shenzhen.aliyuncs.com/newspring/6n11.png'},
        {brandurl:'https://gatewayfile.oss-cn-shenzhen.aliyuncs.com/newspring/6n11.png'},
        {brandurl:'https://gatewayfile.oss-cn-shenzhen.aliyuncs.com/newspring/6n11.png'},
        {brandurl:'https://gatewayfile.oss-cn-shenzhen.aliyuncs.com/newspring/6n11.png'},
        {brandurl:'https://gatewayfile.oss-cn-shenzhen.aliyuncs.com/newspring/6n11.png'},
        {brandurl:'https://gatewayfile.oss-cn-shenzhen.aliyuncs.com/newspring/6n11.png'},
        {brandurl:'https://gatewayfile.oss-cn-shenzhen.aliyuncs.com/newspring/6n11.png'},
        {brandurl:'https://gatewayfile.oss-cn-shenzhen.aliyuncs.com/newspring/6n11.png'},
        {brandurl:'https://gatewayfile.oss-cn-shenzhen.aliyuncs.com/newspring/6n11.png'},
        {brandurl:'https://gatewayfile.oss-cn-shenzhen.aliyuncs.com/newspring/6n11.png'},
        {brandurl:'https://gatewayfile.oss-cn-shenzhen.aliyuncs.com/newspring/6n11.png'},
        {brandurl:'https://gatewayfile.oss-cn-shenzhen.aliyuncs.com/newspring/6n11.png'},
        {brandurl:'https://gatewayfile.oss-cn-shenzhen.aliyuncs.com/newspring/6n11.png'},
      ],
      checkedindex:null,
      checkedlist:{},
      request:true,//请求是否完成
    }
  },
  watch: {
    play: function(ele) {
      
    },
  },
  computed: {
    getcartoon() {
      return this.$store.state.cartoon
    },
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
    //获取验证码
    getverify() {
      if(this.disabledtime){
        return
      }
      if (!/^[1][3,4,5,7,8,9][0-9]{9}$/.test(this.personalD.tel)) {
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
      getcode({ iphone: this.personalD.tel }).then((res, err) => {
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
              this.verifytime = 60
            }
            this.verifytime = this.verifytime - 1
          }, 1000)
        } else if(res.status == 2) {
          Toast({
            mes: res.message,
            timeout: 1500,
          })
        }else{
          Toast({
            mes: '请稍后重试',
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
      this.address_text = ret.itemName2 + ' ' + ret.itemName3
      // this.address_text = ret.itemName1 + ' ' + ret.itemName2 + ' ' + ret.itemName3
    },
    //验证输入是否完成
    verifycoll() {
      // console.log(this.personalD)
      if (this.personalD.name == '') {
        this.Toastcoll('姓名没填写')
        return
      }
      if (!/^[1][3,4,5,6,7,8,9][0-9]{9}$/.test(this.personalD.tel)) {
        this.Toastcoll('电话没填写')
        return
      }
      if (this.personalD.code == '') {
        this.Toastcoll('验证码没填')
        return
      }
      if (this.address_text.split(' ') < 2) {
        this.Toastcoll('省市区不完整')
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
    //销售人员提交信息
    hideShadecoll(){
      if(!this.verifycoll()){
        return
      }
      let data = {
        code:this.personalD.code,
        peopname:this.personalD.name,
        address:this.address_text,
      }
      let that = this;
      if(!this.request){
        return
      }
      this.request=false;
      setmessage(data).then((res, err) => {
          // console.log(res,err)
          that.request=true;
          if (res.status == 1) {
            that.shadeshow=false;
            setSSession('peopid', res.data.peopid)
            that.productlist = res.data.list;
            that.checkedlist = res.data.list[0];
            that.checkedindex = 0;
          } else {
            this.Toastcoll(res.message)
          }
        })
    },
    checkedcoll(index){
      this.checkedindex = index;
      this.checkedlist = this.productlist[index];
    },
    //生成海报
    createcoll(){
      if(!getSSession('peopid')){
        this.shadeshow=true;
        return
      }
      let data = {
        peopid : getSSession('peopid'),
        brandid: this.checkedlist.brandid
      }
      let that = this;
      if(!this.request){
        return
      }
      that.request=false;
      getposter(data).then((res, err) => {
        // console.log(res)
        that.request=true;
        if (res.status == 1) {
          setSSession('productlist', JSON.stringify(this.productlist))
          this.$router.push({
            path:'/poster',
            query:{
              url:res.data
            }
          })
          // console.log(res.data,'海报地址')
        } else {
          this.Toastcoll(res.message)
        }
      })
    },
    mySwiperinit(){
      var mySwiper = new Swiper('.swiper-container',
        {
          slidesPerView: 'auto',//开启slide宽度自定义功能  
          // roundLengths:true,
          visiblilityFullfit:true,
          freeMode: true,
          observer:true,//修改swiper自己或子元素时，自动初始化swiper 
          hideOnClick :true,
          onSlideChangeEnd: function(swiper){ 
      　　　swiper.update();  
      　　　mySwiper.startAutoplay();
    　　    mySwiper.reLoop();  
          },
          pagination: {
            el: '.swiper-pagination',
            bulletElement : 'li',
          },
          navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
          },
          //滑到最后一个隐藏前进按钮
          on: {
            slideChangeTransitionEnd: function(){
              if(this.isEnd){
                this.navigation.$nextEl.css('display','none');
              }else{
                this.navigation.$nextEl.css('display','block');  
              }
            },
          },
        }
      );  
    }
  },
  created() {
    this.toShareCenter()
    if(getSSession('productlist')){
      this.productlist=JSON.parse(getSSession('productlist'));
      this.shadeshow=false;
    }else{
      setSSession('peopid', '')
    }
    this.checkedlist = this.productlist[0];
    this.checkedindex = 0;
    // setSSession('access_token', '17_nAfh2VwGZ7GVEXVR_WRgKM2VN4gIJ1-OU_spgUZfFM1CIJ3LElFq365Pwcwp-KopAi-wM5INqAepJG5Bg0s_jA')
  },
  mounted() {
    setTimeout(() => {
      this.mySwiperinit()
    }, 200);
  },
}
