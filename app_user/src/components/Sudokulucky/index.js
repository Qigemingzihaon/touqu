import { getSSession, setSSession } from '@/utils/session.js'
import { postlogin,lottery } from '@/server/index.js'

export default {
  computed: {},
  props: {
    drawNumber: {
      type: Number,
      default: 0
    },
    prize:{
      type:Array,
      default: []
    },
    drawB:{
      type:Boolean,
      default:false
    }
  },
  data () {
    return {
      //当前选中奖品下标
      current: 0,
      //奖品下标
      currentindex: 0,
      //当前奖品旋转下标
      currentarr:[
        0,1,2,5,8,7,6,3
      ],
      // 奖品数组
      awards: [
        {id: 1, name: '',text:false},
        {id: 2, name: '',text:false},
        {id: 3, name: '',text:true},
        {id: 4, name: '',text:true},
        {id: 0, name: '开始4',text:false},
        {id: 5, name: '',text:false},
        {id: 6, name: '',text:false},
        {id: 7, name: '',text:true},
        {id: 8, name: '',text:true},
      ],
      speed: 200, // 速度
      on_off:true,
      on_off_bg:false,
      diff: 15, // 速度增加的值
      award: {}, // 抽中的奖品
      award_s: {}, // 抽中的奖品
      time: 0, // 记录开始抽奖时的时间
      request:true,//请求是否完成
    };
  },
  watch: {
    prize:function(e) {
      console.log(e)
      this.setcoll(e)
    }
  },
  methods: {
    setcoll(e){
      let that = this;
      let money = [];
      let entity = [];
      e.forEach((element,index) => {
        if(element.peoptype===1){
          money.push(element);
        }
        if(element.peoptype===2){
          entity.push(element);
        }
      });
      entity.forEach((ele,index)=>{
        if(ele.peopname.indexOf("巧克力")>0){
          that.awards[2].name=ele.peopname.slice(4);
          that.awards[2].url=ele.img;
        }else{
          switch (index) {
            case 1:
              that.awards[3].name=ele.peopname.slice(4);
              that.awards[3].peopno=ele.peopno;
              that.awards[3].url=ele.img;
              break;
            case 2:
              that.awards[7].name=ele.peopname.slice(4);
              that.awards[7].peopno=ele.peopno;
              that.awards[7].url=ele.img;
              break;
            case 3:
              that.awards[8].name=ele.peopname.slice(4);
              that.awards[8].peopno=ele.peopno;
              that.awards[8].url=ele.img;
              break;
            default:
              break;
          }
        }
      })
      console.log(money,entity)
    },
    start (index) {
      // 开始抽奖
      if(index!==4||!this.drawB||this.on_off_bg){
        return
      }
      console.log(this.drawNumber,this.drawNumber<1)
      if(this.drawNumber<1){
        this.$emit('returncoll', '')
        return
      }
      this.on_off_bg = true;
      this.drawAward ();
      this.time = Date.now ();
      this.speed = 200;
      this.diff = 15;
    },
    // 请求接口, 这里我就模拟请求后的数据(请求时间为2s)
    drawAward () {
      let that = this;
      this.award_s={};
      this.award = {};
      if(!that.request){
        return
      }
      that.request = false;
      lottery({}).then((res)=>{
        console.log(res)
        if (res.status == 1) {
          that.award_s = res.data;
          if(res.data.protype==3){
            setTimeout (() => {
              that.request = true;
              let num=Math.round(Math.random()*2);
              // console.log(num)
              switch (num) {
                case 0:
                  that.award = {
                    id: '1',
                    name: '谢谢参与',
                  };                  
                  break;
                case 1:
                  that.award = {
                    id: '5',
                    name: '谢谢参与',
                  };                  
                  break;
                case 2:
                  that.award = {
                    id: '6',
                    name: '谢谢参与',
                  };                  
                  break;
                default:
                  break;
              }
              // that.award = {
              //   id: '5',
              //   name: '谢谢参与',
              // };
            }, 6000);
          }else if(res.data.protype==1){
            setTimeout (() => {
              that.request = true;
              that.award = {
                id: '2',
                name: res.data.proname,
              };
            }, 6000);
          }else if(res.data.protype==2){
            setTimeout (() => {
              that.request = true;
              // console.log(res.data,res.data.proname.indexOf("巧克力"))
              if(res.data.proname.indexOf("巧克力")>0){
                that.awards[2].name=res.data.proname;
                that.award = {
                  id: 3,
                  name: res.data.proname,
                };
              }else{
                that.awards.forEach(ele=>{
                  console.log(ele.peopno,res.data.peopno,ele.id)
                  if(ele.peopno&&ele.peopno==res.data.prono){
                    that.award = {
                      id: ele.id,
                      name: ele.name,
                    };
                  }
                })
              }
            }, 6000);
          }
          // that.bankshow_lucky = false; //收货地址填写
          // clearSSession('address')
        } else{
          // that.Toastcoll('请先获取验证码')
          clearTimeout (window.timeout);
          that.request = true;
          that.on_off_bg = false;
          that.$emit('returncoll', '')
        }
      })
      this.move ();
    },
    move () {
      window.timeout = setTimeout (() => {
        this.on_off = !this.on_off;
        this.currentindex=this.currentindex+1;
        if (this.currentindex > 7) {
          this.currentindex = 0;
        }
        this.current=this.currentarr[this.currentindex]
        // 若抽中的奖品id存在，则开始减速转动
        if (this.award.id && (Date.now () - this.time) / 1000 > 2) {
          this.speed += this.diff; // 转动减速
          // 若转动时间超过4秒，并且奖品id等于小格子的奖品id，则停下来！
          if (
            (Date.now () - this.time) / 1000 > 10 &&
            this.award.id == this.awards[this.current].id
          ) {
            console.log(this.currentindex,this.awards[this.current],this.current,this.award.id)
            clearTimeout (window.timeout);
            setTimeout (() => {
              //返回奖品
              this.on_off_bg = false;
              this.$emit('returncoll', this.award_s)
              // alert (this.award.name);
            }, 0);
            return;
          }
          // 若抽中的奖品不存在，则加速转动
        } else {
          if(this.speed<90){
            // return
          }else{
            this.speed -= this.diff; // 转动加速
          }
          // console.log(this.speed)
        }

        this.move ();
      }, this.speed);
    },
  },

  beforeMount () {},

  created () {
    if(this.prize.length){
      this.setcoll(this.prize)
    }
    console.log(this.drawNumber,this.prize[0])
  },

  beforeDestroy () {},
};
