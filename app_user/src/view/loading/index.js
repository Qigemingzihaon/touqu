import { getSSession, setSSession } from '@/utils/session.js'
import { postlogin } from '@/server/index.js'
import { Alert, Toast } from 'vue-ydui/dist/lib.rem/dialog';
export default {
  components: {
    Alert, 
    Toast
  },
  data() {
    return {
      lodingshow: false,
    }
  },
  watch: {
    
  },
  methods: {
    //提示方法
    Toastcoll(msg = '错误操作', time = 1500) {
      Toast({
        mes: msg,
        timeout: time,
      })
    },
    loadcoll() {
      console.log('加载完成')
      let str = location.href //取得整个地址栏
      this.countloading = this.countloading + 1
      if (this.countloading == 3 &&(getSSession('access_token')||this.getQueryString('code', str))) {
      }
      this.preload()
    },
    preload() {
      let imgs = [
        
      ]
      this.setwidthcoll()
      imgs.forEach((elem) => {
        let image = new Image()
        image.src = elem
        image.onload = () => {
        }
      })
    },
    setwidthcoll() {
      var time = setInterval(() => {
        clearInterval(time)
      }, 100)
    },

    getQueryString(name, str) {
      if (str.indexOf('?') > 0) {
        let data = str.split('?')[1]
        if (data.indexOf(name + '=') >= 0) {
          let obj = data.split(name + '=')[1]
          if (obj.indexOf('&') > 0 || obj.indexOf('#/') > 0) {
            if (obj.indexOf('&') > 0) {
              return obj.split('&')[0]
            } else {
              return obj.split('#/')[0]
            }
          } else {
            return obj
          }
        } else {
          return null
        }
      } else {
        return null
      }
    },
    getcodecoll() {
      let str = location.href //取得整个地址栏
      if(this.getQueryString('peopid', str)){
        setSSession('peopid', this.getQueryString('peopid', str))
      }
      let appid = 'wx272bfdf846d9d6ea'
      let url = 'http://www.jollykeys.cn/newspring_user/'
      if (!this.getQueryString('code', str)||(!getSSession('access_token') && !this.getQueryString('code', str))) {
        window.location.href =
          'https://open.weixin.qq.com/connect/oauth2/authorize?appid=' +
          appid +
          '&redirect_uri=' +
          url +
          '&response_type=code&scope=snsapi_base&state=a#wechat_redirect'
      } else {
        if (this.getQueryString('code', str)&&getSSession('access_token')) {
          // this.$router.push({
          //   path:'/Home',
          // })
          return
        }
        let data = {
          code: this.getQueryString('code', str),
        }
        postlogin(data).then((res, err) => {
          if (res.status == 1) {
            setSSession('redpacket', res.data.iphone);
            setSSession('access_token', res.data.access_token);
            let date = {
              endtime:res.data.endtime,
              starttime:res.data.starttime,
              nowtype:res.data.nowtype,
              sumday:res.data.sumday,
            }
            date = JSON.stringify(date);
            setSSession('datestring',date);
            if(res.data.peopname){
              let goodsRI = {
                iphone: res.data.iphone,
                province: res.data.province,
                city: res.data.city,
                region: res.data.region,
                street: res.data.street,
                peopname: res.data.peopname,
              };
              goodsRI = JSON.stringify(goodsRI);
              setSSession('goodsRI', goodsRI);
            }
            this.$router.push({
              path:'/Home',
            })
          } else {
            console.log(res)
            this.Toastcoll('登录失败')
            // window.location.href =
            //   'https://open.weixin.qq.com/connect/oauth2/authorize?appid=' +
            //   appid +
            //   '&redirect_uri=' +
            //   url +
            //   '&response_type=code&scope=snsapi_userinfo&state=a#wechat_redirect'
          }
        })
      }
    },
  },
  created() {
    // this.getLocation()
    this.getcodecoll()
  },
  mounted() {},
}
