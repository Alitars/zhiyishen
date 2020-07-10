<template>
  <div id="finalpay">
    <Top></Top>
    <Fix></Fix>
    <div class="pay-box">
        <div class="pay-title">商标注册</div>
        <div class="pay-detail-file">
            <div class="pay-file">
                <div class="pay-file-img"></div>
                <div class="pay-file-div">
                    <div>{{name}}</div>
                    <div>
                        <a :href="GLOBAL.base_url+this.file" target="_blank">预览</a>
                        <a :href="GLOBAL.base_url+'/api/order/fileDownload?name='+this.files+'&type=1'">下载</a>
                    </div>
                </div>
            </div>
        </div>
        <div class="pay-cost">
            <div>费用明细：</div>
            <div>您注册的商标{{name}}已下发，请支付尾款：￥{{final_price}}.00</div>
        </div>
         <div class="paydetail-pay">
            <div class="paydetail-pay-type">支付方式：</div>
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
         <div class="pay-price">
            <div>总计金额:</div>
            <div>
                <span>RMB</span>
                <span id="money">{{final_price}}</span>
            </div>
       </div>
       <div class="pay-commit">
         <div @click="back">返回</div>
         <div @click="pay">支付</div>
       </div>
    </div>
    <div class="weixin" v-show="weishow">
        <img @click="weicha" src="/static/images/cha.png" alt="">
        <img :src="GLOBAL.base_url+'/'+this.codeimg" alt="">
      </div>
    <Foot></Foot>
  </div>
</template>

<script>
import Top from '../ui/top.vue';
import Foot from '../ui/foot.vue';
import Fix from '../ui/fix.vue';
export default {
  name: 'finalpay',
  data(){
    return{
      active:'bao',
      file:'',
      files:'',
      name:'',
      final_price:'',
      id:'',
      testshow:false,
      countcompany:'',
      codeimg:'',
      testid:'',
      weishow:false,
      timer: null,
    }
  },
  watch:{
     
    
  },
  methods:{
    tip(type,msg){
        return this.$message({
            type:type,
            message:msg,
            showClose:true,
            duration:1500
        })
    },
    getdata(){
        this.$http.post(this.GLOBAL.base_url+'/api/order/finalOrder',{
              order_id:this.$route.query.order_id,
            }).then(res=>{
                // console.log(res)
                if(res.data.code == "1"){
                    this.name = res.data.data.note_name;
                    this.final_price = res.data.data.final_price;
                    this.file = res.data.data.first_notice;
                    this.files = res.data.data.first_notices;
                    this.id = res.data.data.id;
                }
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
    back(){
        this.$router.go(-1)
    },
    weicha(){
        this.weishow = false;
        clearInterval(this.timer);        
        this.timer = null;
    },
    pay(){
        if(this.active == "bao"){
          this.$http.post(this.GLOBAL.base_url+'/api/order/finalPay',{
              user_id:this.$cookie.getCookie('u_id'),
              order_id:this.id,
              pay_type:1,
            }).then(res=>{
              // console.log(res)
              if(res.data.code == "0"){
                this.tip('error',res.data.msg)
              }else{
                let routeData = this.$router.resolve({ path: '/pay', query: { htmls: res.data }});
                this.$router.push(routeData.href);
              }
            })
      }
      if(this.active == "company"){
          if(this.countcompany == ''){
              this.tip('error','请输入转账公司名称');
              return false;
            }
        this.$http.post(this.GLOBAL.base_url+'/api/order/finalPay',{
              user_id:this.$cookie.getCookie('u_id'),
              order_id:this.id,
              pay_type:4,
              final_company:this.countcompany
            }).then(res=>{
              if(res.data.code == "1"){
                this.$router.push('/personal/order?status=all')
              }else{
                this.tip('error',res.data.msg)
              }
            })
      }
      if(this.active == "wei"){
          this.$http.post(this.GLOBAL.base_url+'/api/order/finalPay',{
              user_id:this.$cookie.getCookie('u_id'),
              order_id:this.id,
              pay_type:2,
            }).then(res=>{
            //   console.log(res)
               if(res.data.code == "1"){
                this.weishow = true
                this.codeimg = res.data.data.filename;
                this.testid = res.data.data.id;
              }else{
                this.tip('error',res.data.msg)
              }
            })
      }
    },
    // 判断微信是否支付成功
    sucess(){
      if(this.testid != ''){
        this.$http.get(this.GLOBAL.base_url+'/api/order/getorderstatusend',{params:{
              id:this.testid
            }}).then(res=>{
              // console.log(res)
              if(res.data.data == 1){
                this.weishow = false;
                this.$router.push('/personal/order?status=all')
              }
            })
      }
    },
  },
  components: {
    Top,
    Foot,
    Fix
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
    .pay-box{
        width: 1300px;
        margin: 0 auto;
    }
    .pay-title{
        font-size: 36px;
        font-weight: 500;
        color: #333333;
        border-bottom:1px solid #d8d8d8;
        padding: 64px 0 30px;
    }
    .pay-detail-file{
        height: 117px;
        padding: 48px 0 65px;
        border-bottom:1px solid #d8d8d8;
    }
    .pay-file{
        height: 117px;
    }
    .pay-file>div{
        float: left;
    }
     .pay-file-div>div:nth-of-type(1){
        font-family: "PingFangSC-Regular";
        font-size: 32px;
        color: #333333;
        margin: 10px 0 20px;
   }
   .pay-file-div>div:nth-of-type(2)>a{
       text-decoration: none;
        font-family: "PingFangSC-Regular";
        font-size: 24px;
        color: #f96006;
        cursor: pointer;
   }
   .pay-file-div>div:nth-of-type(2)>a:nth-of-type(1){
       margin-right: 30px;
   }
    .pay-file-img{
        width: 117px;
        height: 117px;
        background: url("/static/images/datawrite.png") no-repeat;
        background-size: cover;
        margin-right: 10px;
   }
   .pay-cost{
       width: 1200px;
       padding-top: 36px;
       border-bottom:1px solid #d8d8d8;
   }
   .pay-cost>div:nth-of-type(1){
       font-size: 22px;
       font-weight: 500;
       color: #333333;
       margin-bottom: 24px;
   }
   .pay-cost>div:nth-of-type(2){
       font-size: 18px;
       margin-bottom: 32px;
   }
    .paydetail-pay{
    width: 1200px;
    padding:36px 0;
    border-bottom: solid 1px #d8d8d8;
  }
  .paydetail-pay-type{
    font-family: "PingFangSC-Semibold";
    font-size: 22px;
    font-weight: 600;
    color: #333333;
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
   .pay-price{
    margin: 36px 0;
  }
  .pay-price>div:nth-of-type(1){
    font-size: 22px;
    font-weight: 600;
    color: #333333;
    margin-bottom: 16px;
  }
  .pay-price>div:nth-of-type(2){
    font-size: 26px;
    font-weight: 600;
    letter-spacing: -2px;
    color: #333333;
  }
  #money{
    color: #f96006;
  }
  .pay-commit{
    width: 1200px;
    height: 54px;
    line-height: 54px;
    margin-bottom: 80px;
  }
 .pay-commit>div:nth-of-type(1){
    margin-left: 745px;
    font-family: "PingFangSC-Regular";
    font-size: 14px;
    color: #f96006;
    cursor: pointer;
    float: left;
 }
 .pay-commit>div:nth-of-type(2){
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
