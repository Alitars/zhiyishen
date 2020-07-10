<template>
  <div class="twoQuestioncontainer">
    <Top></Top>
    <Fix></Fix>
    <!-- top -->
     <div class="check-box-top">
         <div class="check-box-top-div">
           <img src="/static/images/net.png" alt="">
           <span>确认订单</span>
         </div>
     </div>
    <!-- 支付信息 -->
     <div class="check-box-big">
      <!-- 订单信息 -->
       <div class="order-infor">订单信息:</div>
       <div class="check-box-big-order">
         <div class="check-box-big-order-top">
           <div>订单编号</div>
           <div>技术名称</div>
           <div>价格</div>
         </div>
         <div class="check-box-big-order-list">
           <div>{{order_id}}</div>
           <div>{{name}}</div>
           <div>￥{{price}}</div>
         </div>
       </div>
       <div class="check-box-big-pay" >
         <div class="check-box-big-pay-type">支付方式：</div>
         <div :class="active">
          <div class="div2"  @click="makeActive('bao')">
            <img src="/static/images/bao.png" alt="">
          </div>
          <div class="div3"  @click="makeActive('wei')">
            <img src="/static/images/wei.png" alt="">
          </div>
          <div class="div4"  @click="makeActive('yin')" v-show="false">
            <img src="/static/images/yin.png" alt="">
          </div>
          <div class="div1" @click="makeActive('company')">
            <img src="/static/images/lv.png" alt="">
          </div>
         </div>
       </div>
       <div class="test-div" v-show="testshow">
          <span>转账公司名称</span>
          <input type="text" v-model="countcompany">
       </div>
       <div class="check-box-big-price">
         <div>总计价格:</div>
         <div>
           <span>RMB</span>
           <span id="money">{{price}}</span>
         </div>
       </div>
       <div class="check-box-big-commit">
         <div @click="back">返回</div>
         <div @click="Tonext">确认支付</div>
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
import Top from '../ui/top.vue';
import Foot from '../ui/foot.vue';
import Fix from '../ui/fix.vue';
export default {
  name: 'twoQuestion',
  data(){
    return{
      active:'bao',
      weishow:false,
      testshow:false,
      countcompany:'',
      order_id:'',
      name:'',
      price:'',
      id:'',
      xingimg:'',
      pay_order_no:''
    }
  },
  components: {
      Top,
      Foot,
      Fix
  },
  watch:{

  },
  computed:{
  },
  methods:{
    // 提示弹框
    tip(type,msg){
          return this.$message({
              type:type,
              message:msg,
              showClose:true,
              duration:1500
          })
    },
    makeActive(item){
      this.active = item;
      if(this.active == "company"){
        this.testshow = true
      }else{
        this.testshow = false
      }
    },

    getList(){
      this.$http.post(this.GLOBAL.base_url+'/api/patent/answerDetail',{
        user_id:this.$cookie.getCookie('u_id'),
        id:this.$route.query.Bid
      }).then( res => {
        console.log(res)
        this.order_id = res.data.data.order_id
        this.name = res.data.data.name
        this.price = res.data.data.price
        this.id = res.data.data.id
      })
    },
    Tonext(){
      // 公司转账
      if (this.active == 'company') {
        if(this.countcompany == ''){
          this.tip('error','请输入转账公司名称');
          return false;
        }
        this.$http.post(this.GLOBAL.base_url+'/api/patent/answerPay',{
          user_id:this.$cookie.getCookie('u_id'),
          id:this.id,
          pay_type:4,
          company_name:this.countcompany,
        }).then( res => {
          this.tip('success','支付成功');
          this.$router.push('/issue/issueList?status=all')
        })
      }
      // 支付宝
      if (this.active == 'bao') {
        this.$http.post(this.GLOBAL.base_url+'/api/patent/answerPay',{
          user_id:this.$cookie.getCookie('u_id'),
          id:this.id,
          pay_type:1,
        }).then( res => {
          if(res.data.code == "0"){
            this.tip('error',res.data.msg)
          }else{
            const div = document.createElement('div');
            div.innerHTML = res.data;
            document.body.appendChild(div);
            document.forms[0].submit();
          }
        })
      }
      // 微信
      if (this.active == 'wei') {
        this.$http.post(this.GLOBAL.base_url+'/api/patent/answerPay',{
          user_id:this.$cookie.getCookie('u_id'),
          id:this.id,
          pay_type:2,
        }).then( res => {
          console.log(res)
          if(res.data.code == "0"){
            this.tip('error',res.data.msg)
          }else{
            this.weishow = true
            this.xingimg = res.data.data.filename;
            this.pay_order_no = res.data.data.id;
          }
        })
      }
    },
    weicha(){
      this.weishow = false;
      clearInterval(this.timer);
      this.timer = null;
    },
    // 判断微信是否支付成功
    sucess(){
      if(this.pay_order_no != ''){
        this.$http.get(this.GLOBAL.base_url+'/api/patent/ansCheckPay',{params:{
              user_id:this.$cookie.getCookie('u_id'),
              id:this.pay_order_no,
              status:0
        }}).then(res=>{
          // console.log(res)
          if(res.data.data == 1){
            this.weishow = false
            this.$router.push('/issue/issueList?status=all')
          }
        })
      }
    },
    back(){
      this.$router.go(-1);
    }
  },
  mounted(){
    this.getList()
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
  .check-box-top{
    width: 100%;
    height: 188px;
    background-color: #f8f8f8;
  }
  .check-box-top-div{
    width: 1040px;
    height: 188px;
    margin: 0 auto;
    line-height: 188px;
  }
  .check-box-top-div>img{
    vertical-align: middle;
    margin-right: 25px;
  }
  .check-box-top-div>span{
    font-family: "PingFangSC-Semibold";
    font-size: 36px;
    font-weight: 600;
    color: #111111;
    vertical-align: middle;
  }
  .check-box-big{
    width: 1040px;
    margin: 40px auto 100px;
  }
  .order-infor{
    font-size: 22px;
    font-weight: 600;
    color: #333333;
    margin:40px 0 16px;
  }
  .check-box-big-order{
    padding: 24px 0;
    border-top:1px solid #d8d8d8;
    border-bottom:1px solid #d8d8d8;
  }
  .check-box-big-order-top{
    height: 25px;
  }
  .check-box-big-order-top>div{
    font-family: "PingFangSC-Medium";
    font-size: 18px;
    font-weight: 500;
    color: #333333;
    float: left;
    width: 346px;
    text-align: center;
  }
  .check-box-big-order-list{
    height: 18px;
    margin-top: 30px;
  }
  .check-box-big-order-list>div{
    float: left;
    width: 346px;
    height: 18px;
    text-align: center;
    font-family: "PingFangSC-Regular";
    font-size: 13px;
    color: #343434;
  }
  .check-box-big-pay{
    padding-bottom: 24px;
    border-bottom: solid 1px #d8d8d8;
    /* margin-bottom: 24px; */
  }
  .check-box-big-pay-type{
    font-family: "PingFangSC-Semibold";
    font-size: 22px;
    font-weight: 600;
    color: #333333;
    margin-top: 20px;
  }
  .div1,.div2,.div3,.div4{
    width: 464px;
    height: 48px;
    border-radius: 4px;
    border: solid 1px #d6d6d6;
    margin-top: 16px;
    padding: 16px 0 16px 16px;
    cursor: pointer;
  }
  .company .div1,.bao .div2,.wei .div3,.yin .div4{
    border:1px solid red;
  }
  .test-div{
    height: 40px;
    margin: 24px 0;
  }
  .test-div>span{
    font-size: 18px;
    font-weight: 300;
    color: #333333;
    vertical-align: middle;
  }
  .test-div>input{
    width: 300px;
    height: 30px;
    border: solid 1px #d6d6d6;
    border-radius: 4px;
    outline: none;
    padding-left: 10px;
  }
  .check-box-big-price{
    height: 37px;
    margin-bottom: 16px;
    margin-top: 24px;
    line-height: 37px;
    font-family: "PingFangSC-Semibold";
  }
  .check-box-big-price>div:nth-of-type(1){
    float: left;
    font-size: 22px;
    font-weight: 600;
    color: #333333;
  }
  .check-box-big-price>div:nth-of-type(2){
    float: right;
    font-size: 26px;
    font-weight: 600;
    letter-spacing: -2px;
    color: #333333;
  }
  #money{
    color: #f96006;
  }
  .check-box-big-commit{
    height: 54px;
    line-height: 54px;
  }
 .check-box-big-commit>div:nth-of-type(1){
    margin-left: 580px;
    font-family: "PingFangSC-Regular";
    font-size: 14px;
    color: #f96006;
    cursor: pointer;
    float: left;
 }
 .check-box-big-commit>div:nth-of-type(2){
    cursor: pointer;
    float: right;
    width: 363px;
    height: 54px;
    border-radius: 4px;
    border-style: solid;
    border-width: 1px;
    border-image-source: linear-gradient(to top, #ba6100, #dc773b);
    border-image-slice: 1;
    background-image: linear-gradient(to bottom, #f79000, #f96006), linear-gradient(to top, #ba6100, #dc773b);
    background-origin: border-box;
    background-clip: content-box, border-box;
    font-family: "PingFangSC-Regular";
    font-size: 14px;
    line-height: 54px;
    text-align: center;
    color: #ffffff;
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
