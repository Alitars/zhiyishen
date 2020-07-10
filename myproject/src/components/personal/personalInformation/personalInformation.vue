<template>
  <div class="personalInformation-container">
    <div class="personalInformation-container-box">
      <!-- 修改后代码 -->
      <!-- 顶部 -->
      <div class="personalInformation-container-box-top">
        <!-- 顶部左边 -->
        <div class="personalInformation-container-box-top-left">
          <div class="personalInformation-container-box-top-left-img">
            <img :src="dataimg1?dataimg1:'/static/images/loading小果.gif'" alt="">
          </div>
          <div class="personalInformation-container-box-top-left-name">
            <span>{{name}}</span>
            <span v-show="membershow2">白银</span>
            <span v-show="membershow3">代理</span>
          </div>
          <div class="personalInformation-container-box-top-left-attestation" v-bind:class="{green: 2 == status,yellow:1==status,red: 3 == status}" v-if="status != 0">
            <i class="el-icon-star-off"></i>
            <span v-bind:class="{yellow:1==status }" v-if="status == 1">审核中</span>
            <span v-bind:class="{green: 2 == status }" v-if="status == 2">已认证</span>
            <span v-bind:class="{red: 3 == status }" v-if="status == 3">已驳回</span>
          </div>
          <div class="personalInformation-container-box-top-left-attestation1" v-if="status == 0">
            <!-- <i class="el-icon-star-off"></i> -->
            <span >未进行个人或企业认证</span>
          </div>
          <p class="personalInformation-container-box-top-left-firm" v-if="status != 0">{{company_name}}</p>
          <p class="personalInformation-container-box-top-left-news" @click="message">我的消息<span>({{MessageCount}})</span></p>
          <div class="member-image" @click="tomember" v-show="membershow"></div>
        </div>
        <!-- 顶部中间虚线 -->
        <div class="dotted"></div>
        <!-- 顶部右边 -->
        <div class="personalInformation-container-box-top-right">
              <div class="personalInformation-container-box-top-right-one">
                <span>账户设置</span>
                <span @click="personalData">个人资料</span>
                <span @click="jumpPassword">修改密码</span>
                <span @click="shippingAddress">收件地址</span>
              </div>
              <div class="personalInformation-container-box-top-right-two">
                <span>我的发票</span>
                <span @click="applyInvoice">开票申请</span>
                <span @click="recordList">开票记录</span>
                <span @click="manageList">开票信息管理</span>
              </div>
              <div class="personalInformation-container-box-top-right-three">
                <span>我的认证</span>
                <span @click="companyComfire">企业认证</span>
                <span @click="personalComfire">个人认证</span>
                <span >
                  批量导入
                  <input type="file" @change="uplaod2($event)">
                </span>
              </div>
              <div class="personalInformation-container-box-top-right-four">
                <span>我的邀请链接：https://www.zhishengai.com/register?name={{this.phone}}</span>
                <span class="tag-read" :data-clipboard-text="'https://www.zhishengai.com/register?name='+this.phone" @click="copy">复制</span>
              </div>
        </div>
      </div>
      <!-- 中间 -->
      <div class="personalInformation-container-box-center">
            <!-- 中间左边 -->
            <div class="personalInformation-container-box-center-left">
              <!-- 中左上 -->
              <div class="personalInformation-container-box-center-left-top">
                <span>我的商标</span>
                <span @click="tradeProperty">更多 ></span>
              </div>
              <!-- 中左下 -->
              <div class="personalInformation-container-box-center-left-bottom txc" v-if="order_brand.length == 0">暂无商标</div>
              <div class="personalInformation-container-box-center-left-bottom" v-if="order_brand.length != 0" >
                <div v-for="(item,k) in order_brand" :key="k">
                    <img :src="GLOBAL.base_url+item.brand_img" alt="" @click="imgData(item.id,item.good_name,item.click_type)">
                    <!-- <img src="/static/images/order.png" alt=""> -->
                    <!-- <img src="/static/images/order.png" alt=""> -->
                    <!-- <img src="/static/images/order.png" alt=""> -->
                </div>
              </div>
            </div>
            <!-- 中间右边 -->
            <!-- <div class="personalInformation-container-box-center-right">
              中右上
              <div class="personalInformation-container-box-center-right-top">
                <span>浏览记录</span>
                <span>更多 ></span>
              </div>
              中右下
                <div class="block">
                  <el-carousel trigger="click" height="150px" arrow="never" :autoplay="false">
                    <el-carousel-item v-for="item in 3" :key="item">
                      <img class="personalInformation-container-block-img" src="/static/images/order.png" alt="">
                      <img class="personalInformation-container-block-img" src="/static/images/order.png" alt="">
                      <img class="personalInformation-container-block-img" src="/static/images/order.png" alt="">
                      <img class="personalInformation-container-block-img" src="/static/images/order.png" alt="">
                      <img class="personalInformation-container-block-img" src="/static/images/order.png" alt="">
                      <img class="personalInformation-container-block-img" src="/static/images/order.png" alt="">
                    </el-carousel-item>
                  </el-carousel>
              </div>
            </div> -->
      </div>
      <div style="clear: both;"></div>
      <!-- 底部 -->
      <div class="personalInformation-container-box-bottom">
            <!-- 下上 -->
            <div class="personalInformation-container-box-bottom-top">
                <span>我的商标订单</span>
                <span @click="order">更多 ></span>
            </div>
            <!-- 下下 -->
            <div class="personalInformation-container-box-bottom-bottom">
              <ul>
                <li>
                  <img src="/static/images/invalid-name1.png" alt="" @click="order" >
                  <p @click="order">全部订单<span>({{order_sum}})</span></p>
                </li>
                <li>
                  <img src="/static/images/invalid-name2.png" alt="" @click="order1">
                  <p @click="order1">待付款<span>({{stay_order}})</span></p>
                </li>
                <li>
                  <img src="/static/images/invalid-name3.png" alt="" @click="order2">
                  <p @click="order2">待处理<span>({{pending_order}})</span></p>
                </li>
                <li>
                  <img src="/static/images/invalid-name4.png" alt="" @click="order3">
                  <p @click="order3">已完成<span>({{complete_order}})</span></p>
                </li>
              </ul>
            </div>
      </div>
    </div>
    <div style="clear:both;"></div>
  </div>
</template>

<script>
import Clipboard from 'clipboard';
export default {
  name: 'personalInformation',
  data(){
    return {
      dataimg1:'',
      // 姓名
      name:'',
      // 手机号
      mobile:'',
      // 头像
      head_img:'',
      // 公司名称
      company_name:'',
      // 消息条数
      MessageCount:'',
      // 全部订单
      order_sum:'',
      // 待付款
      stay_order:'',
      // 待处理
      pending_order:'',
      // 已完成
      complete_order:'',
      // 状态
      status:'0',
      order_brand:[],
      membershow:true,
      membershow2:false,
      membershow3:false,
      phone:this.$cookie.getCookie('username')
    }
  },
  methods:{
    copy() {
      var clipboard = new Clipboard('.tag-read')
      clipboard.on('success', e => {
      console.log('复制成功')
      // 释放内存
      clipboard.destroy()
      })
      clipboard.on('error', e => {
      // 不支持复制
      console.log('该浏览器不支持自动复制')
      // 释放内存
      clipboard.destroy()
      })
      },
    // 数据
    getData() {
      this.$http.post(this.GLOBAL.base_url+'/api/usercenter/userMessage',{
        user_id:this.$cookie.getCookie('u_id')
      }).then(res => {
        // console.log(res)
        if(res.data.code == 1) {
          this.mobile = res.data.data.mobile
          this.head_img = res.data.data.head_img
          this.company_name = res.data.data.company_name
          this.MessageCount = res.data.data.MessageCount
          this.stay_order = res.data.data.stay_order
          this.pending_order = res.data.data.pending_order
          this.complete_order = res.data.data.complete_order
          this.order_sum = res.data.data.order_sum
          this.status = res.data.data.status
          this.dataimg1 = res.data.data.head_img
          if(res.data.data.name == '') {
            this.name = res.data.data.mobile
          }else {
            this.name = res.data.data.name
          }
          this.order_brand = res.data.data.order_brand
        }
      })
    },
    // 修改图像
    update(e) {
      let file = e.target.files[0]
        // console.log(file)
        let formData = new FormData();
        formData.append('pic',file);
        formData.append('user_id',this.$cookie.getCookie('u_id'))
        // console.log(formData)
        this.$http.post(this.GLOBAL.base_url+'/api/usercenter/upload_head',formData
        ).then( res=> {
          // console.log(res)
          this.dataimg1 = this.GLOBAL.base_url+res.data.data.head_img
        })
    },
    // 跳转详情
    imgData(val,val1,val2){
      this.$router.push({
        path:'/personal/orderDetail',
        query:{
            id:val,
            good_name:val1,
            click_type:val2
        }
      })
    },
    // 去开通会员
    tomember(){
        let routeData = this.$router.resolve({ path: '/memberCenter'});
        window.open(routeData.href, 'blank');
      },
    //修改登录密码
    jumpPassword() {
      this.$router.push('/personal/safeCenter')
    },
    //我的收件地址
    jumpAddress() {
      this.$router.push('/personal/shippingAddress')
    },
    tradeProperty(){
      this.$router.push('/personal/order?status=all')
    },
    // 我的订单
    order(){
      this.$router.push('/personal/order?status=all')
    },
    order1(){
      this.$router.push('/personal/order?status=wait')
    },
    order2(){
      this.$router.push('/personal/order?status=service')
    },
    order3(){
      this.$router.push('/personal/order?status=finsh')
    },
    // 我的消息
    message(){
      this.$router.push('/personal/message')
    },
    personalData(){
      this.$router.push('/personal/personalData')
    },
    shippingAddress(){
      this.$router.push('/personal/shippingAddress')
    },
    //我的发票
    applyInvoice() {
      this.$router.push('/personal/applyInvoice')
    },
    recordList(){
      this.$router.push('/personal/recordList')
    },
    manageList(){
      this.$router.push('/personal/manageList')
    },
    // 企业认证
    companyComfire() {
      this.$router.push('/personal/companyComfire')
    },
    personalComfire(){
      this.$router.push('/personal/personalComfire')
    },
    // 企业认证导入
    uplaod2(e){
      this.file = e.target.files[0];
      let formData = new FormData();
      formData.append('url_xls',this.file);
      formData.append('user_id',this.$cookie.getCookie('u_id'));
      this.$http.post(this.GLOBAL.port_url+"/api/InvoiceApply/leadExcel",formData).then(res => {
          if(res.data.code == "1"){
              this.tip('success',res.data.msg);
              // this.getcompanyList();
              this.$router.go(0)
          }else{
            this.tip('error',res.data.msg)
          }
      })
    },
  },
  mounted(){
    if(this.$cookie.getCookie('user_type')== 2){
      if(this.$cookie.getCookie('type') == 2){
        this.membershow =false;
        this.membershow3 = true
      }
    }else if(this.$cookie.getCookie('user_type')== 3){
      this.membershow =false;
      this.membershow2 = true
    }
  },
  created(){
    this.getData()
  }
}

</script>

<style scoped>
/* 公共样式 */
ul,li {
  list-style: none;
}
.personalInformation-container-box{
        width:1015px;
        float: left;
        margin: 12px 0 0 16px;
        min-height: 1024px;
}
/* 顶部 */
.personalInformation-container-box-top {
  width: 100%;
  height: 300px;
  background-image: linear-gradient(to bottom, #fdf9f7, #fdefe8);
  margin-bottom: 17px;
}
/* 顶部左边 */
.personalInformation-container-box-top-left {
  width: 330px;
  float: left;
  /* border: 1px solid #fff; */
  box-sizing: border-box;
  height: 300px;
  position: relative;
}
.personalInformation-container-box-top-left-img {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  /* border: 1px solid #e9d6cb; */
  margin: 23px 0px 16px 128px;
}
.personalInformation-container-box-top-left-img > img {
  width: 80px;
  height: 80px;
  border-radius: 50%;
}
.personalInformation-container-box-top-left-name{
  margin-bottom: 10px;
  text-align: center;
}
.personalInformation-container-box-top-left-name>span:nth-of-type(2),.personalInformation-container-box-top-left-name>span:nth-of-type(3){
  display: inline-block;
  width: 38px;
  border-radius: 2px;
  background-color: #f96006;
  /* text-shadow: 0 1px 1px #572f17; */
  font-size: 10px;
  color: white;
}
.personalInformation-container-box-top-left > p {
  width: 330px;
  text-align: center;
  font-family: "PingFangSC";
  font-size: 14px;
  margin-bottom: 10px;
}
.personalInformation-container-box-top-left-attestation {
  width: 84px;
  height: 24px;
  border-radius: 12px;
  background-color: #fff;
  margin-left: 120px;
  line-height: 24px;
  margin-bottom: 16px;
}
.personalInformation-container-box-top-left-attestation > i {
  margin-left: 9px;
}
.personalInformation-container-box-top-left-attestation > span {
  font-family: "PingFangSC";
  font-size: 14px;
  color: #333333;
}
.personalInformation-container-box-top-left-firm {
  font-family: "PingFangSC";
  font-size: 14px;
  font-weight: 100;
  margin-top: 20px;
}
.personalInformation-container-box-top-left-news {
   font-family: "PingFangSC";
  font-size: 14px;
  font-weight: 100;
  cursor: pointer;
}
.personalInformation-container-box-top-left-news >span {
  color: #f96006;
}
.member-image{
  height: 48px;
  width: 100%;
  background: url('/static/images/membertype.png');
  cursor: pointer;
  position: absolute;
  bottom: 0;
}
/* 顶部中间虚线 */
.dotted {
  width: 1px;
  height: 232px;
  float: left;
  border-left: 1px dashed #e5d1c3;
  margin-top: 32px;
}
/* 顶部右边 */
.personalInformation-container-box-top-right {
  width: 683px;
  float: right;
  box-sizing: border-box;
  height: 300px;
}
.personalInformation-container-box-top-right-one {
  margin: 66px 0px 0px 95px;
}
.personalInformation-container-box-top-right-one >span {
  margin-right: 64px;
  font-family: "PingFangSC";
  font-size: 14px;
  font-weight: 100;
  cursor: pointer;
  color: #333;
}
.personalInformation-container-box-top-right-one >span:nth-child(1) {
  margin-right: 36px;
  font-family: "PingFangSC";
  font-size: 16px;
  cursor: inherit;
  font-weight: 600;
}
.personalInformation-container-box-top-right-two {
  margin: 48px 0px 0px 95px;
}
.personalInformation-container-box-top-right-two >span {
  margin-right: 64px;
  font-family: "PingFangSC";
  font-size: 14px;
  font-weight: 100;
  cursor: pointer;
}
.personalInformation-container-box-top-right-two > span:nth-child(1) {
  margin-right: 36px;
  font-family: "PingFangSC";
  font-size: 16px;
  cursor: inherit;
  color: #333;
  font-weight: 600;
}
.personalInformation-container-box-top-right-two > span:nth-child(3) {
  margin-right: 64px;
  font-family: "PingFangSC";
  font-size: 14px;
}
.personalInformation-container-box-top-right-three {
  margin: 48px 0px 0px 95px;
}
.personalInformation-container-box-top-right-three >span {
  margin-right: 64px;
  font-family: "PingFangSC";
  font-size: 14px;
  font-weight: 100;
  cursor: pointer;
  color: #333;
}
.personalInformation-container-box-top-right-three >span:nth-child(1) {
  margin-right: 36px;
  font-family: "PingFangSC";
  font-size: 16px;
  cursor: inherit;
  font-weight: 600;
}
.personalInformation-container-box-top-right-three >span:nth-child(2) {
  margin-right: 64px;
}
.personalInformation-container-box-top-right-three >span:nth-child(4) {
  cursor: pointer;
   position: relative;
}
.personalInformation-container-box-top-right-three >span:nth-child(4) >input {
  top:-14px;
  left: 0;
  width: 70px;
  height: 30px;
  border-radius: 4px;
  position: absolute;
  opacity: 0;
  cursor: pointer;
}
.personalInformation-container-box-top-right-four{
  margin: 30px 0px 0px 65px;
}
.personalInformation-container-box-top-right-four>span{
    font-size: 16px;
    font-family: "PingFangSC";
    color: #000000;
    font-weight: 100;
    margin-right: 10px;
}
.personalInformation-container-box-top-right-four>span:nth-of-type(2){
  display: inline-block;
  width: 40px;
  border-radius: 3px;
  height: 20px;
  font-size: 12px!important;
  background: #f96006;
  text-align: center;
  line-height: 20px;
  color: #ffffff!important;
  cursor: pointer;
  vertical-align: top;
}
/* 中间 */
.personalInformation-container-box-center {
  width: 1015px;
}
/* 中间左边 */
.personalInformation-container-box-center-left {
  width: 1015px;
  height: 300px;
  background-color: #fff;
  float: left;
}
/* 中左上 */
.personalInformation-container-box-center-left-top {
  width: 943px;
  height: 54px;
  margin: 0 auto;
  border-bottom: 2px solid #fafafa;
  line-height: 54px;
}
.personalInformation-container-box-center-left-top > span:nth-child(1) {
  margin-left: 12px;
  font-family: "PingFangSC";
  font-size: 16px;

}
.personalInformation-container-box-center-left-top > span:nth-child(2) {
  margin-left: 12px;
  float: right;
  font-family: "PingFangSC";
  font-size: 14px;
  color: #999999;
  cursor: pointer;
}
/* 中左下 */
.personalInformation-container-box-center-left-bottom {
  width: 612px;
  height: 120px;
  margin: 0 auto;
  margin-top: 46px;
  display: flex;
}
.personalInformation-container-box-center-left-bottom >div>img {
  width: 120px;
  height: 120px;
  margin-left: 39px;
  cursor: pointer;
  border:1px solid #eee;
}
.personalInformation-container-box-center-left-bottom >img:nth-child(1) {
  margin-left: 0px;
}
/* 中间右边 */
.personalInformation-container-box-center-right {
  width: 315px;
  height: 300px;
  background-color: #fff;
  float: right;
}
/* 中右上 */
.personalInformation-container-box-center-right-top {
  width: 243px;
  height: 54px;
  margin: 0 auto;
  border-bottom: 2px solid #fafafa;
  line-height: 54px;
}
.personalInformation-container-box-center-right-top > span:nth-child(1) {
  margin-left: 12px;
  font-family: "PingFangSC";
  font-size: 16px;

}
.personalInformation-container-box-center-right-top > span:nth-child(2) {
  margin-left: 12px;
  float: right;
  font-family: "PingFangSC";
  font-size: 14px;
  color: #999999;
  cursor: pointer;
}
/* 中右下 */
.block {
  margin-top: 24px;
  margin-bottom: 24px;
}
.el-carousel {
  width: 243px !important;
  margin: 0 auto;
  height: 200px;
}
.el-carousel__item img {
  width: 60px ;
  height: 60px ;
}
.personalInformation-container-block-img {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  float: left;
  margin: 16px 10px 0px;
}
/* 底部 */
.personalInformation-container-box-bottom {
  width: 1015px;
  height: 300px;
  background-color: #fff;
  margin-top: 17px;
}
.personalInformation-container-box-bottom-top {
  width: 943px;
  height: 54px;
  margin: 0 auto;
  border-bottom: 2px solid #fafafa;
  line-height: 54px;
}
.personalInformation-container-box-bottom-top > span:nth-child(1) {
  margin-left: 12px;
  font-family: "PingFangSC";
  font-size: 16px;

}
.personalInformation-container-box-bottom-top > span:nth-child(2) {
  margin-left: 12px;
  float: right;
  font-family: "PingFangSC";
  font-size: 14px;
  color: #999999;
  cursor: pointer;
}
.personalInformation-container-box-bottom-bottom {
  margin-left: 200px;
  margin-top: 40px;
}
.personalInformation-container-box-bottom-bottom > ul > li {
  float: left;
  width: 100px;
  margin-right: 100px;
  text-align: center;
  cursor: pointer;
}
.personalInformation-container-box-bottom-bottom > ul > li >img {
  width: 42px;
  height: 42px;
  margin-bottom: 28px;
}
.personalInformation-container-box-bottom-bottom > ul > li > p {
  font-family: "PingFangSC";
  font-size: 14px;
  font-weight: 100;
}
.personalInformation-container-box-bottom-bottom > ul > li > p  > span {
  color: #f96006;
}
.green {
  color:#19f319 !important;
}
.yellow {
  color: #f96006 !important;
}
.red {
  color: red !important;
}
.personalInformation-container-box-top-left-attestation1 {
    width: 146px;
    height: 24px;
    border-radius: 12px;
    background-color: #fff;
    margin-left: 94px;
    line-height: 24px;
    margin-bottom: 16px;
    text-align: center;
    font-size: 12px;
    font-weight: 200;
    font-family: "PingFangSC";
}
label {
  margin-right: 92px;
  font-family: "PingFangSC";
  font-size: 14px;
  font-weight: 100;
  cursor: pointer;
}
.txc {
  text-align: center;
  line-height: 120px;
}
</style>

<style>
  .el-carousel__button {
  width: 8px !important;
  height: 8px !important;
  background-color: #fcdecf !important;
  border-radius: 50% !important;
}
</style>
