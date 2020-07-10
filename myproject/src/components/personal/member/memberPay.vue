<template>
  <div class="memberPay">
    <Top></Top>
     <div class="memberPay-box">
         <img src="/static/images/member-top.png" alt="">
         <div class="memberPay-div">
             <div class="memberPay-div-center">
                 <img src="/static/images/memberPay-top.png" alt="">
                 <div class="center-middle">
                     <div class="middle-div1"></div>
                     <div class="middle-div2">
                         <div class="middle1">
                            <span>当前用户：</span>
                            <span>{{name}}</span>
                         </div>
                         <div class="middle2">
                            <span>开通套餐：</span>
                            <span>{{level_name}}</span>
                         </div>
                         <div class="middle3">
                             <span>支付方式：</span>
                             <input class="radio1" value="1" v-model="paytype" name="type" type="radio"><img src="/static/images/memberPay-bao.png" alt="">
                             <input class="radio2" value="2" v-model="paytype" name="type" type="radio"><img src="/static/images/memberPay-wechat.png" alt="">
                         </div>
                         <div class="middle4">
                            <span>支付金额：</span>
                            <span>￥{{amount}}</span>
                         </div>
                         <div class="middle5" @click="memberPay">去付款</div>
                         <!-- <div class="middle6">购买即视为同意《知依昇会员用户协议》</div> -->
                     </div>
                 </div>
             </div>
         </div>
     </div>
     <div class="weixin" v-show="weishow">
        <img @click="weicha" src="/static/images/cha.png" alt="">
        <img :src="GLOBAL.base_url+'/'+this.xingimg" alt="">
      </div>
     <Foot></Foot>
  </div>
</template>

<script>
import Top from '../../ui/top.vue';
import Foot from '../../ui/foot.vue';
export default {
  name: 'memberPay',
  data(){
    return{
        paytype:'1',
        name:'',
        level_name:'',
        amount:'',
        weishow:false,
        xingimg:'',
        timer: null,
        pay_order_no:''
    }
  },
  components: {
      Top,
      Foot
  },
  methods:{
      getdata(){
          this.$http.post(this.GLOBAL.base_url+'/api/usercenter/levalDetail',{
              l_id:this.$route.query.id,
              user_id:this.$cookie.getCookie('u_id')
          }).then(res=>{
            // console.log(res)
            if(res.data.code == "1"){
                this.name = res.data.data.user_name;
                if(this.name == ''||this.name == null){
                    this.name = this.$cookie.getCookie('username')
                }
                this.level_name = res.data.data.level_name;
                this.amount = res.data.data.amount;
            }
            })
      },
      memberPay(){
          if(this.paytype == "1"){
              this.$http.post(this.GLOBAL.base_url+'/api/level/buyLevel',{
                user_id:this.$cookie.getCookie('u_id'),
                l_id:this.$route.query.id,
                pay_type:this.paytype
            }).then(res=>{
            //   console.log(res)
              if(res.data.code == "0"){
                this.tip('error',res.data.msg)
              }else{
                let routeData = this.$router.resolve({ path: '/pay', query: { htmls: res.data }});
                this.$router.push(routeData.href);
              }
            })
          }else{
              this.$http.post(this.GLOBAL.base_url+'/api/level/buyLevel',{
                user_id:this.$cookie.getCookie('u_id'),
                l_id:this.$route.query.id,
                pay_type:this.paytype
            }).then(res=>{
            //   console.log(res)
              if(res.data.code == "0"){
                this.tip('error',res.data.msg)
              }else{
                this.weishow = true;
                this.xingimg = res.data.data.filename;
                 this.pay_order_no = res.data.data.id;
              }
            })
          }
      },
      // 判断微信是否支付成功
    sucess(){
      if(this.pay_order_no != ''){
        this.$http.get(this.GLOBAL.base_url+'/api/level/paysucess',{params:{
              order_id:this.pay_order_no
            }}).then(res=>{
            //   console.log(res)
              if(res.data.code == 1){
                this.weishow = false;
                this.$router.push('/personal/personalInformation')
              }
            })
      }
    },
      weicha(){
        this.weishow = false;
        clearInterval(this.timer);        
        this.timer = null;
    },
  },
  mounted(){
      this.getdata();
      this.timer = setInterval(() =>{                    
            this.sucess()                
        }, 1000);
  },
  beforeDestroy() {
    clearInterval(this.timer);        
    this.timer = null;
  }
}

</script>

<style scoped>
    .memberPay-box>img{
        width: 178px;
        height: 34px;
        margin: 23px 0 23px 380px;
    }
    .memberPay-div{
        width: 100%;
        height: 632px;
        background-image: linear-gradient(to bottom, #fdf9f7, #fdefe8);
    }
    .memberPay-div-center{
        width: 1200px;
        height: 632px;
        margin: 0 auto;
        background-color: #fffefe;
    }
    .memberPay-div-center>img{
        width: 100%;
        height: 80px;
        margin-bottom: 33px;
    }
    .center-middle{
        width: 960px;
        height: 472px;
        border: solid 1px #f8e8e1;
        margin: 0 auto;
    }
    .center-middle>div{
        float: left;
    }
    .middle-div1{
        width: 373px;
        height: 472px;
        margin-right: 69px;
        background: url('/static/images/memberPay-right.png') no-repeat;
    }
    .middle-div2{
        width: 510px;
        height: 408px;
        padding-top: 64px;
    }
    .middle-div2>div{
        margin-bottom: 48px;
    }
    .middle-div2>div>span:nth-of-type(1){
        font-size: 16px;
        font-weight: normal;
        color: #666666;
        margin-right: 24px;
    }
    .middle1>span:nth-of-type(2),.middle2>span:nth-of-type(2){
        color: #333333;
    }
    .middle3{
        height: 28px;
    }
    .middle3>span{
        vertical-align: middle;
    }
    .middle3>input{
        width: 16px;
        height: 16px;
        vertical-align: middle;
        cursor: pointer;
    }
     .middle3>img{
        vertical-align: middle;
        margin-left: 8px;
     }
     .middle4>span:nth-of-type(2){
         color:#f96006;
     }
     .middle5{
        width: 363px;
        height: 54px;
        border-radius: 4px;
        background-color:#f96006;
        cursor: pointer;
        text-align: center;
        line-height: 54px;
        font-size: 14px;
        color:#ffffff;
     }
     .weixin{
     background: rgba(0,0,0, 0.8);
    position: fixed;
    z-index: 20;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
}
.weixin>img:nth-of-type(1){
    width: 25px;
    height: 25px;
    position: absolute;
    top:35.5%;
    left: 55.5%;
    z-index: 30;
    cursor: pointer;
}
.weixin>img:nth-of-type(2){
    width: 200px;
    height: 200px;
    background-color: #ffffff;
    position: absolute;
    top:50%;
    left: 50%;
    z-index: 30;
    transform: translate(-50%,-50%);
}
</style>
