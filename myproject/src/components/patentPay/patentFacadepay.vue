<template>
  <div class="patentFacadepay">
    <Top></Top>
    <Fix></Fix>
    <div class="patentFacadepay-box">
      <!-- top -->
      <div class="patentFacadepay-box-top">
       外观设计专利申请缴费
      </div>
      <!-- 受理通知书 -->
      <div class="patentFacadepay-box-one">
        <div class="one-left">
          <img src="/static/images/datawrite.png" alt="">
        </div>
        <div class="one-right">
          <p>专利申请受理通知书</p>
          <span><a :href="GLOBAL.base_url+this.see1" target="_blank" >预览</a></span>
          <span><a :href="GLOBAL.base_url+'/api/patent/downloadFile'+this.see1">下载</a></span>
        </div>
      </div>
      <!-- 通知书转函 -->
      <div class="patentFacadepay-box-one">
        <div class="one-left">
          <img src="/static/images/datawrite.png" alt="">
        </div>
        <div class="one-right">
          <p>缴费通知书转函</p>
          <span><a :href="GLOBAL.base_url+this.load1" target="_blank" rel="noopener noreferrer">预览</a></span>
          <span><a :href="GLOBAL.base_url+'/api/patent/downloadFile'+this.load1">下载</a></span>
        </div>
      </div>
      <!-- 费用明细 -->
      <div class="patentFacadepay-box-detail">
        <p>费用明细：</p>
        <span>申请费：￥{{apply_fee}}</span>
      </div>
      <!--  选择  -->
      <div class="patentFacadepay-box-select">
        <p>是否代缴官费：</p>
        <input type="radio" value="1" v-model="find" name="invoice">
        <span v-bind:class="{ bgcol : switch2 }" >是</span>
        <input type="radio" value="2" v-model="find" name="invoice">
        <span v-bind:class="{ bgcol : switch1 }" >否</span>
      </div>
      <!-- 支付方式 -->
      <div class="patentFacadepay-box-way" v-show="switch1">
        <p>支付方式：</p>
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
            <img src="/static/images/7m.png" alt="">
          </div>
        </div>
        <div class="test-div" v-show="testshow">
          <span>汇款公司名称</span>
          <input type="text" v-model="countcompany">
        </div>
      </div>
      <!-- 总金额 -->
      <div class="patentFacadepay-box-money" v-show="switch1">
        <p>总计金额:</p>
        <p>RMB <span>{{total_fee}}</span></p>
      </div>
      <!-- 提示 -->
      <div class="patentFacadepay-box-prompt" v-show="switch2">
        <p>申请费和实审费您可以自缴官费，也可以选择由平台代缴</p>
        <p>如果选择官费自缴，知依昇将不再提醒您缴纳官费，产生缴费延误平台概不负责</p>
        <div>
          <a href="/static/images/专利自缴注意事项_（新）.pdf" target="_blank" >点击查看支付步骤</a>
        </div>
      </div>
      <!-- 提交&&取消 -->
      <div class="patentFacadepay-box-submit" >
        <span v-show="switch1" @click='back'>返回</span>
        <span v-show="switch1" @click='chargeAgency'>支付</span>
        <span  v-show="switch2" @click='chargeAgency'>确认</span>
      </div>
      <div style="clear :both;"></div>
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
    name:'patentFacadepay',
    components:{
      Top,
      Foot,
      Fix
    },
    data() {
      return {
        find:'1',
        switch1:true,
        switch2:false,
        // 盖公章拍照上传 展示页面图片
        dataimg1:'',
        active:'bao',
        // 申请费
        apply_fee:'',
        // 实审费
        trial_fee:'',
        // 总价钱
        total_fee:'',
        // 预览&&下载
        see1:'',
        load1:'',
        xingimg:'',
        pay_order_no:'',
        weishow:false,
        timer: null,
        // 公司转账名称
        countcompany:'',
        testshow:false,
      }
    },
    watch: {
      // 单选框
      'find'(newValue) {
        if (newValue == '1') {
          this.switch2 = false
          this.switch1 = true
        }
        if (newValue == '2') {
          this.switch1 = false
          this.switch2 = true
        }
      }
    },
    methods:{
      // 弹框
    tip(type,msg){
      return this.$message({
        type:type,
        message:msg,
        showClose:true,
        duration:2500
      })
    },
    weicha(){
        this.weishow = false;
        clearInterval(this.timer);
        this.timer = null;
    },
      // 盖公章拍照上传
      uploadData1(img){
        let formData=new FormData();
        formData.append('url_img',img.file);
        this.$http.post(this.GLOBAL.base_url+'/api/BrandUpload/brandUploadFile',formData).then(res=>{
          // console.log(res)
          if(res.data.code == "1"){
            // this.name =  res.data.filepath
            this.ser_img1 = res.data.filepath;
            this.dataimg1 = this.GLOBAL.base_url+ res.data.filepath;
          }
        });
      },
      //
      makeActive(item){
        this.active = item;
        if(this.active == "company"){
          this.testshow = true
        }else{
          this.testshow = false
        }
      },
      // 获取数据
      getData(){
        this.$http.post(this.GLOBAL.base_url+'/api/patent/getNotices',{
          user_id:this.$cookie.getCookie('u_id'),
          id:this.$route.query.id
        }).then( res => {
          console.log(res)
          this.apply_fee = res.data.data.apply_fee
          this.trial_fee = res.data.data.trial_fee
          this.total_fee = Number(this.apply_fee)
          this.see1 = res.data.data.patent_advice
          this.load1 = res.data.data.patent_bill
        })
      },
      // 选择代理缴费
      chargeAgency() {
        // 公司转账
        if (this.find == '1' && this.active == 'company') {
          this.$http.post(this.GLOBAL.base_url+'/api/patent/agentPay',{
            user_id:this.$cookie.getCookie('u_id'),
            id:this.$route.query.id,
            type:4
          }).then( res => {
           this.$router.push('/personal/orderPatent?status=all')
          })
        }
        // 支付宝
        if(this.find == '1' &&this.active == "bao"){
            if(this.countcompany == ''){
              this.tip('error','请输入转账公司名称');
              return false;
            }
            this.$http.post(this.GLOBAL.base_url+'/api/patent/agentPay',{
            user_id:this.$cookie.getCookie('u_id'),
            id:this.$route.query.id,
            type:1,
            company_name:this.countcompany,
            }).then(res=>{
              // console.log(res)
              if(res.data.code == "0"){
                this.tip('error',res.data.msg)
              }else{
                // // this.select = '请选择'
                // let routeData = this.$router.resolve({ path: '/payOne', query: { htmls: res.data }});
                // window.open(routeData.href, '_blank');
                const div = document.createElement('div');
                div.innerHTML = res.data;
                document.body.appendChild(div);
                document.forms[0].submit();
              }
            })
        }
        // 微信
        if(this.find == '1' &&this.active == "wei"){
            this.$http.post(this.GLOBAL.base_url+'/api/patent/agentPay',{
              user_id:this.$cookie.getCookie('u_id'),
              id:this.$route.query.id,
              type:2,
            }).then(res=>{
              // console.log(res)
              if(res.data.code == "0"){
                this.tip('error',res.data.msg)
              }else{
                this.weishow = true
                this.xingimg = res.data.data.filename;
                this.pay_order_no = res.data.data.id;
              }
            })
        }
        // 自缴
        if (this.find == '2') {
          this.$http.post(this.GLOBAL.base_url+'/api/patent/agentPay',{
            user_id:this.$cookie.getCookie('u_id'),
            id:this.$route.query.id,
            type:0
          }).then( res => {
            // console.log(res)
           this.$router.push('/personal/orderPatent?status=all')
          })
        }
      },
      // 微信支付成功的定时器
      sucess(){
        if(this.pay_order_no != ''){
          this.$http.get(this.GLOBAL.base_url+'/api/patent/checkPay',{params:{
                id:this.pay_order_no,
                user_id:this.$cookie.getCookie('u_id'),
                status:10
          }}).then(res=>{
                if(res.data.data == 1){
                  this.weishow = false;
                  this.$router.push('/personal/orderPatent?status=all')
                }
              })
          }
      },
      // 返回
      back() {
        this.$router.back()
      }
    },

    mounted(){
      this.getData()
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
  .patentFacadepay-box {
    width: 1302px;
    background-color: #fff;
    margin: 0 auto;
    padding-top:34px;
    box-sizing: border-box;
    padding-bottom: 80px;
    box-sizing: border-box;
  }
  /* top */
  .patentFacadepay-box-top {
    height: 110px;
    line-height: 110px;
    font-family: "PingFangSC";
    font-size: 36px;
    font-weight: 600;
    /* border-bottom: 1px solid #d8d8d8; */
  }
  /* 说明书&&委托书 */
  .patentFacadepay-box-one {
    height: 230px;
    border-top: 1px solid #d8d8d8;
    /* line-height: 230px; */
  }
  .one-left {
    float: left;
    width: 85px;
    height: 94px;
    /* border: 1px solid #d8d8d8; */
    margin: 58px 26px 0 17px;
  }
  .one-left > img {
    width: 85px;
    height: 94px;
    cursor: pointer;
  }
  .one-right {
    float: left;
    font-family: "PingFangSC";
    margin-top: 64px;
  }
  .one-right > p {
    font-size: 32px;
    color: #333333;
    margin-bottom: 16px;
  }
  .one-right >span > a {
    font-size: 24px;
    color: #f96006;
    margin-right: 119px;
    cursor: pointer;
    text-decoration: none;
  }
  /* 费用明细 */
  .patentFacadepay-box-detail {
    border-top: 1px solid #d8d8d8;
    padding-bottom: 32px;
    border-bottom: 1px solid #d8d8d8;
  }
  .patentFacadepay-box-detail > p {
    margin: 36px 0 24px 0;
    font-family: "PingFangSC";
    font-size: 22px;
    font-weight: 600;
    color: #333333;
  }
  .patentFacadepay-box-detail > span {
    font-family: "PingFangSC";
    font-size: 18px;
    margin-right: 96px;
  }
  /* 选择 */
  .patentFacadepay-box-select {
    margin: 36px 0 36px 0px;
    border-bottom: 1px solid #d8d8d8;
    padding-bottom: 16px;
  }
  .patentFacadepay-box-select > p {
    font-family: "PingFangSC";
    font-size: 20px;
    margin-bottom: 16px;
    color: #333333;
    font-weight: 600;
  }
  .patentFacadepay-box-select > input {
    width: 18px;
    height: 18px;
    vertical-align: middle;
    margin-right: 12px;
    cursor: pointer;
  }
  .patentFacadepay-box-select > span {
    font-family: "PingFangSC";
    font-size: 20px;
    vertical-align: middle;
    margin-right: 65px;
  }
  /* 支付方式 */
  .patentFacadepay-box-way {
    margin: 0px 0 36px 0;
    border-bottom: 1px solid #d8d8d8;
    padding-bottom: 36px;
  }
  .patentFacadepay-box-way > p {
    font-family: "PingFangSC";
    font-size: 22px;
    font-weight: 600;
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
  /* 总金额 */
  .patentFacadepay-box-money > p:nth-child(1) {
    font-family: "PingFangSC";
    font-size: 22px;
    font-weight: 600;
    color: #333;
    margin-bottom: 16px;
  }
  .patentFacadepay-box-money > p:nth-child(2) {
    font-family: "PingFangSC";
    font-size: 26px;
    font-weight: 600;
    color: #333;
  }
  .patentFacadepay-box-money > p:nth-child(2) >span {
    color: #f96006;
  }
  /* 提示 */
  .patentFacadepay-box-prompt > p {
    font-family: "PingFangSC";
    font-size: 22px;
    font-weight: 600;
    color: #333;
    margin-bottom: 16px;
  }
  .patentFacadepay-box-prompt > div > a {
    font-family: "PingFangSC";
    font-size: 22px;
    font-weight: 600;
    color: #f96006;
    margin-bottom: 16px;
    text-decoration: none;
  }
  /* 提交&&取消 */
  .patentFacadepay-box-submit {
    float: right;
    margin:64px 0px 0 0 ;
  }
  .patentFacadepay-box-submit > span {
    width: 214px;
    height: 54px;
    display: inline-block;
    line-height: 54px;
    text-align: center;
    font-family: "PingFangSC";
    font-size: 18px;
    cursor: pointer;
    font-size: 14px;
  }
  .patentFacadepay-box-submit > span:nth-child(2) {
    border-image-source: linear-gradient(0deg,#ba6100,#dc773b);
    border-image-slice: 1;
    background-image: linear-gradient(180deg,#f79000,#f96006),linear-gradient(0deg,#ba6100,#dc773b);
    background-origin: border-box;
    background-clip: content-box,border-box;
    border-radius: 4px;
    color: #fff;
    margin-right: 191px;
    width: 363px;
  }
  .patentFacadepay-box-submit > span:nth-child(1) {

    border-radius: 4px;
    color: #f87604;
  }
    .patentFacadepay-box-submit > span:nth-child(3) {
    border-image-source: linear-gradient(0deg,#ba6100,#dc773b);
    border-image-slice: 1;
    background-image: linear-gradient(180deg,#f79000,#f96006),linear-gradient(0deg,#ba6100,#dc773b);
    background-origin: border-box;
    background-clip: content-box,border-box;
    border-radius: 4px;
    color: #fff;
    /* margin-right: 87px; */
    width: 363px;
  }
  .bgcol{
    color: #a6a6a6;
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
  .test-div{
    height: 40px;
    margin: 24px 0 0 0;
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
</style>
