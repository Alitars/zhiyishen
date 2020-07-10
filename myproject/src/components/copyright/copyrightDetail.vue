<template>
  <div class="copyrightDetail-container">
    <Top></Top>
    <Fix></Fix>
    <div class="copyrightDetail">
      <!-- 面包屑 -->
      <div class="copyrightDetail-crumbs">
        <el-breadcrumb class="bread-card-crumb" separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/' }">
            首页
          </el-breadcrumb-item>
          <el-breadcrumb-item :to="{path:'/copyright',query: {id: 50}}">版权服务</el-breadcrumb-item>
          <el-breadcrumb-item>{{this.title}}</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <!-- 价钱 -->
      <div class="copyrightDetail-price">
        <div class="price-left">
          <p>{{this.title}}</p>
          <div class="left-one">
            <span>服务价格：</span>
            <span>￥{{this.price}}</span>
          </div>
          <div class="left-two">
            <span>服务类型：</span>
            <div class="left-two-rigth">
              <div class="left-two-rigth-dev" v-for="(v,k) in type" :key="k" v-bind:class="{ colorChange: v.id == dynamic}" @click="changeType(v.id,v.service_price,v.price,v.title)">
                {{v.title}}
              </div>
            </div>
          </div>
          <div style="clear:both;"></div>
          <div class="left-three">
            <span>购买数量：</span>
            <span @click="miu1">-</span>
            <input v-model="value1" oninput="value=value.replace(/[^\d]/g,'')" type="text"  disabled @input="add2"/>
            <span @click="add1">+</span>
          </div>
          <div class="left-four">
            <span>结算金额：</span>
            <span>￥{{this.total}}</span>
          </div>
          <div class="left-five">
            <!-- <span @click="tobuy1">检测办理</span> -->
            <span @click="tobuy">立刻购买</span>
            <span @click="addCart">加入购物车</span>
            <span @click="message_show">咨询留言</span>
          </div>
        </div>
        <div class="price-right"><img :src="GLOBAL.base_url +this.pic" alt=""></div>
      </div>
      <!-- 后台渲染的图片 -->
      <div class="copyrightDetail-images">
        <img :src="GLOBAL.base_url+this.bigimg" alt="">
        <img :src="GLOBAL.base_url+this.bigimg2" alt="">
        <img :src="GLOBAL.base_url+this.bigimg1" alt="">
      </div>
      <!-- 留言弹框 -->
      <div class="add-message" v-show="messageShow">
        <div class="message-form">
          <span class="center">欢迎留言</span>
          <img src="/static/images/cha.png" alt="" @click="cha">
          <div class="form-div">
            <div class="recevie-people">
              <span>联&nbsp;&nbsp;系&nbsp;&nbsp;人</span>
              <input type="text" v-model="people">
            </div>
          <div class="div2">
            <span>联系电话</span>
            <input class="deal" type="text" v-model="moblie" maxlength="14">
            <div class="red">{{mobileTip}}</div>
          </div>
          <div class="div3">
            <span>留&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;言</span>
            <textarea name="" id="" class="ly" v-model="comment"></textarea>
          </div>
          <p>电话咨询：400-630-2718</p>
          <div class="edit" @click="edit()">提交</div>
          </div>
        </div>
      </div>
    </div>
    <Foot></Foot>
  </div>
</template>

<script>
import Top from "../ui/top.vue";
import Foot from "../ui/foot.vue";
import Fix from '../ui/fix.vue';
export default {
  name: "copyrightDetail",
  components: {
    Top,
    Foot,
    Fix
  },
  data() {
    return {
      value1: 1,
      title:'',
      type:[],
      // 专利id
      good_id:'',
      // 专利物品id
      cate_id:'',
      // 专利名称
      good_title:'',
      // 控制高亮
      dynamic:'',
      // 服务类型价格
      price:'',
      // 服务类型名称
      type_title:'',
      // 服务类型id
      typeId:'',
      // 结算总金额
      total:'',
      // 小图
      pic:'',
      onpresscTime:0,
      bigimg:'',
      bigimg1:'',
      bigimg2:'',
      // 留言
      people:'',
      moblie:'',
      comment:'',
      messageShow:false,
      mobileTip:''
    };
  },
  watch:{
    '$route': 'getData',
    'moblie'(newValue){
    let reg=/^[1][3,4,5,7,8][0-9]{9}$/;
    if(newValue ==''){
        return this.mobileTip='请输入手机号码';
      }
      if(newValue.length!=11||!reg.test(newValue)){
        return this.mobileTip='手机号格式不正确';
      }
      return this.mobileTip='';
    }
  },
  methods: {
    //弹框
    tip(type,msg){
      return this.$message({
        type:type,
        message:msg,
        showClose:true,
        duration:3000
      })
    },
    // 获取数据
    getData() {
      if(this.$cookie.getCookie('u_id')){
        this.id = this.$cookie.getCookie('u_id')
      }else{
        this.id = 0
      }
      this.$http.get(this.GLOBAL.base_url+ '/api/patent/getDetail/'+this.$route.query.id,
        {params:{
          user_id:this.$cookie.getCookie('u_id')
        }}
      ).then(res=>{
        // console.log(res)
       if ( res.data.code == '1') {
          this.title = res.data.data.title
          this.type = res.data.data.second
          this.good_id = res.data.data.id
          this.cate_id = res.data.data.cate_id
          this.good_title = res.data.data.title;
            this.dynamic = this.$route.query.secondid
            if(this.$route.query.secondid != 0) {
              for (let i= 0 ; i<this.type.length ; i++){
                if (this.$route.query.secondid == this.type[i].id) {
                  this.price = Number(res.data.data.second[i].service_price)+Number(res.data.data.second[i].price)
                  this.type_title = res.data.data.second[i].title
                   this.typeId = res.data.data.second[i].id
                   this.total = this.price * this.value1
                   this.pic = this.type[i].pic;
                   this.bigimg = this.type[i].service;
                   this.bigimg2 = this.type[i].work;
                   this.bigimg1 = this.type[i].datas;
                  //  console.log(this.type[i].service)
                }
              }
            }else {
              this.price = Number(res.data.data.second[0].service_price)+Number(res.data.data.second[0].price)
              this.type_title = res.data.data.second[0].title
              this.typeId = res.data.data.second[0].id
              this.total = this.price * this.value1
              this.pic = this.type[0].pic;
              this.bigimg = this.type[0].service;
              this.bigimg2 = this.type[0].work;
              this.dynamic = res.data.data.second[0].id;
              this.bigimg1 = this.type[0].datas;
            }
        }
      })
    },
    changeType(index,value1,value2,title) {
        this.dynamic = index
        this.price = Number(value1)+Number(value2)
        this.total = this.price*this.value1
        this.type_title = title
        this.typeId = index
        // console.log(index)
        for( let i =0 ; i < this.type.length ; i++) {
          if( index == this.type[i].id) {
            this.pic = this.type[i].pic;
            this.bigimg = this.type[i].service;
            this.bigimg1 = this.type[i].datas;
          }
        }
    },
    // 增加
    add1(){
          this.value1++;
            this.total = this.price*this.value1;
    },
    // 减少
    miu1(){
        if(this.value1>1){
          this.value1--;
            this.total = this.price*this.value1;
        }
    },
    // 输入
    add2() {
      this.total = this.price*this.value1;
    },
    // 添加购物车
    addCart(){
      if ((Date.now() - this.onpresscTime) > 2000) {
        this.onpresscTime = Date.now()
        if(this.$cookie.getCookie('u_id')){
          this.$http.post(this.GLOBAL.base_url+'/api/copyRight/addCart',{
            user_id:this.$cookie.getCookie('u_id'),
            good_id:this.typeId,
            click_type:this.type_title,
            count:this.value1,
            price:this.total
          }).then(res => {
            if(res.data.code == '1') {
               this.tip('success',"添加购物车成功")
            }
          })
        }else{
          this.$router.push({
            path:'/login',
            query:{
              good:0
            }
          })
        }
      }else {
        this.tip('error',"请勿快速点击")
      }
    },
    // 立即办理
    tobuy() {
     if(this.value1 != '1') {
        this.tip('error',"立即办理只能下一个订单,需要多个订单请先添加购物车")
      }else if(this.$cookie.getCookie('u_id')) {
        this.$http.post(this.GLOBAL.base_url +'/api/copyRight/addOrder',{
          user_id:this.$cookie.getCookie('u_id'),
          click_type:this.type_title,
          id:this.typeId
        }).then( res => {
          if ( res.data.code == '1') {
            this.id = res.data.data.id
            this.$router.push({
              path:'checkCopyright',
              query:{
                id:this.id,
                click_type:this.type_title
              }
            })
          }
        })
      }else {
        this.$router.push({
          path:'login',
          query: {
            good:0
          }
        })
      }
    },
    tobuy1(){
      alert('此业务正在开通中')
    },
    // 打开
    message_show(){
      if(this.$cookie.getCookie('u_id')){
        this.messageShow = true
        }else{
        this.$router.push({
            path:'/login',
            query:{
            good:0
            }
        })
      }

    },
    // 关闭
    cha(){
      this.messageShow = false
    },
    // 提交
    edit() {
      if(this.people == '') {
        this.tip('error','请填写联系人')
      }else if (this.people.split(" ").join("").length == 0){
        this.tip('error','请输入文字')
      }else if (this.moblie == ''){
        this.tip('error','请填写联系电话')
      }else if (this.moblie.split(" ").join("").length == 0){
        this.tip('error','请输入数字')
      }else if (this.comment == ''){
        this.tip('error','请留言')
      }else if (this.comment.split(" ").join("").length == 0){
        this.tip('error','请输入文字')
      }else {
        this.$http.post(this.GLOBAL.base_url+'/api/copyRight/addView',{
          user_id:this.$cookie.getCookie('u_id'),
          name:this.people,
          mobile:this.moblie,
          content:this.comment,
          type:"2"
          }).then( res => {
          // console.log(res)
          if(res.data.code == '1') {
            this.tip('success','提交成功,客服会联系您')
            this.messageShow = false
          }
        })
      }
    }
  },
  mounted(){
    this.getData()
  }
};
</script>

<style scoped>
/* 公共样式 */
ul,
li {
  list-style: none;
}
/* 面包屑 */
.copyrightDetail-crumbs {
  width: 100%;
  height: 40px;
  background-color: #f8f8f8;
}
.bread-card-crumb {
  width: 1200px;
  height: 40px;
  margin: 0 auto;
  text-align: center;
  padding-top: 12px;
  box-sizing: border-box;
}
.bread-card-crumb > img {
  width: 18px;
  height: 16px;
}
/* 价钱 */
.copyrightDetail-price {
  width: 1200px;
  height: 360px;
  background-color: #fff;
  margin: 0 auto;
  margin-bottom: 120px;
}
.copyrightDetail-price > .price-left {
  width: 600px;
  height: 360px;
  float: left;
  padding-top: 20px;
  box-sizing: border-box;
}
.copyrightDetail-price > .price-left > p {
  font-family: "PingFangSC";
  font-size: 22px;
  font-weight: 500;
}
.copyrightDetail-price > .price-left > .left-one {
  margin-top: 18px;
}
.copyrightDetail-price > .price-left > .left-one > span:nth-child(1) {
  font-family: "PingFangSC";
  font-size: 18px;
  color: #434343;
}
.copyrightDetail-price > .price-left > .left-one > span:nth-child(2) {
  font-family: "PingFangSC";
  font-size: 18px;
  color: #ff1d1d;
}
.copyrightDetail-price > .price-left > .left-two {
  margin-top: 28px;
}
.copyrightDetail-price > .price-left > .left-two > span {
  font-family: "PingFangSC";
  font-size: 18px;
  color: #434343;
}
.copyrightDetail-price > .price-left > .left-two > .left-two-rigth {
  width: 462px;
  float: right;
  margin-right: 44px;
  margin-top: -6px;
}
.copyrightDetail-price
  > .price-left
  > .left-two
  > .left-two-rigth
  > .left-two-rigth-dev {
  width: 210px;
  float: left;
  text-align: center;
  height: 33px;
  border-radius: 4px;
  line-height: 33px;
  background-color: #cdcdcd;
  margin-right: 9px;
  margin-bottom: 5px;
  font-family: "PingFangSC";
  font-size: 18px;
  color: #fff;
  cursor: pointer;
}
.left-three > span:nth-child(1) {
  font-family: "PingFangSC";
  font-size: 18px;
  color: #434343;

}
.left-three > span:nth-child(2) {
  width: 26px;
  height: 26px;
  border-radius: 2px;
  background-color: #f1f1f1;
  display: inline-block;
  text-align: center;
  font-family: "PingFangSC";
  font-size: 16px;
  cursor: pointer;
}
.left-three > input {
  width: 34px;
  height: 22px;
  outline: none;
  border: none;
  text-align: center;
  padding: 0 5px;
  vertical-align: middle;
}
.left-three > input[disabled] {
  background-color: #fff;
}
.left-three > span:nth-child(4) {
  width: 26px;
  height: 26px;
  border-radius: 2px;
  background-color: #f1f1f1;
  display: inline-block;
  text-align: center;
  font-family: "PingFangSC";
  font-size: 18px;
  cursor: pointer;
}
.copyrightDetail-price > .price-left > .left-four {
  margin-top: 22px;
}
.copyrightDetail-price > .price-left > .left-four > span:nth-child(1) {
  font-family: "PingFangSC";
  font-size: 18px;
  color: #434343;
}
.copyrightDetail-price > .price-left > .left-four > span:nth-child(2) {
  font-family: "PingFangSC";
  font-size: 18px;
  color: #ff1d1d;
}
.copyrightDetail-price > .price-left > .left-five {
  margin-top: 15px;
}
.copyrightDetail-price > .price-left > .left-five > span{
  width: 160px;
  height: 41px;
  line-height: 41px;
  border-radius: 4px;
  display: inline-block;
  text-align: center;
  border-width: 1px;
  background-color: #f79000;
  color: #fff;
  background-clip: content-box, border-box;
  font-family: "PingFangSC";
  font-size: 18px;
  color: #fff;
  margin-right: 26px;
  cursor: pointer;
}
.copyrightDetail-price > .price-left > .left-five > span:nth-child(2) {
  background-color: #e3e3e3;
  color: #f87604;
}
.copyrightDetail-price > .price-right {
  width: 560px;
  height: 360px;
  float: right;
}
.copyrightDetail-price > .price-right >img {
  width: 560px;
  height: 360px;
  margin-top: 20px;
}
.colorChange {
  background-color: #f96006 !important;
}
.copyrightDetail-images {
  width: 1200px;
  margin: 0 auto;
  margin-bottom: 48px;
}
/* 留言 */
   .add-message{
   background: rgba(0,0,0, 0.5);
    position: fixed;
    z-index: 20;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
 .message-form{
   width: 582px;
   height: 474px;
   background: #ffffff;
   position: absolute;
   top:50%;
   left: 50%;
   z-index: 30;
   transform: translate(-50%,-50%);
 }
 .message-form>img{
   width: 24px;
   height: 24px;
   position: absolute;
   right:20px;
   top:20px;
   cursor: pointer;
 }
 .form-div{
   position: absolute;
   top:81px;
   left: 96px;
 }
 .form-div>div{
   margin-bottom: 30px;
 }
 .form-div>div>span{
   font-size: 14px;
   margin-right: 16px;
   color: #333333;
 }
 .form-div>div>input{
    width: 290px;
    height: 32px;
    border-radius: 4px;
    border: solid 1px #d6d6d6;
    outline: none;
    padding-left: 10px
 }
 .select1{
   width: 96px;
  height: 32px;
  border-radius: 4px;
  margin-right: 2px;
 }
 .count{
  width: 80px;
  height: 36px;
  display: inline-block;
  border-radius: 4px;
  background-color:#f96006;
  margin: 0 auto;
  text-align: center;
  line-height: 36px;
  font-size: 14px;
  color: #ffffff;
  cursor: pointer;
 }
 .edit{
   width: 80px;
  height: 36px;
  display: inline-block;
  border-radius: 4px;
  background-color:#f96006;
  margin: 0 auto;
  text-align: center;
  line-height: 36px;
  font-size: 14px;
  color: #ffffff;
  cursor: pointer;
  margin-left: 165px;
 }
.div3 > span {
  display: block;
}
.div2 > span {
  margin-right: 18px !important;
}
 textarea {
    width: 300px;
    height: 96px;
    border-radius: 4px;
    border: solid 1px #d6d6d6;
    outline: none;
    padding: 10px;
    resize: none;
    box-sizing: border-box;
    margin-left: 77px;
 }
 .add-message > .message-form > .form-div > p {
   margin: 0 auto;
   color: #f96006;
   font-size: 12px;
   font-weight: normal;
   margin-bottom: 30px;
   margin-left: 146px;
 }
 .center {
   position: absolute;
   top: 30px;
   margin-left:276px;
 }
 .red {
  margin-left: 80px;
  color: red;
  height: 30px;
 }
 .div2 {
  margin-bottom: 0px !important;
 }
</style>
