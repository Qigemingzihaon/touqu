import {
  baseURL,
  getposter,
} from '@/server/index.js'
import { getSSession, setSSession } from '@/utils/session.js'
import { wx_share } from '@/utils/wxinit.js'
import { share_m } from '@/utils/share.js'
import wx from 'weixin-js-sdk'
import { Toast } from 'vue-ydui/dist/lib.rem/dialog'

export default {
  components: {
    Toast
  },
  props: {},
  data() {
    return {
      url:''
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
    //提示方法
    Toastcoll(msg = '错误操作', time = 1500) {
      Toast({
        mes: msg,
        timeout: time,
      })
    },
    //生成海报
    toHome(){
      this.$router.push({
        path:'/Home',
      })
    },
  },
  created() {
    this.toShareCenter()
    this.url=this.$route.query.url;
  },
  mounted() {

  },
}
