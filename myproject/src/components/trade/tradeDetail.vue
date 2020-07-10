<template>
  <div class="tradeDetailcontainer">
      <Top></Top>
      <Fix></Fix>
      <div class="bread-box">
        <div class="bread-card">
          <el-breadcrumb class="bread-card-crumb" separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item :to="{path:'/trade',query: {id: this.$route.query.tradeid}}">商标服务</el-breadcrumb-item>
            <el-breadcrumb-item>{{this.title}}</el-breadcrumb-item>
          </el-breadcrumb>
         </div>
      </div>
      <div class="tradeDetail-box">
          <div class="tradeDetail-box-div">
            <div class="tradeDetail-box-div-des" >
              <div class="tradeDetail-box-div-des-div1">
                <p>{{this.click_title}}</p>
                <p>{{this.desc}}</p>
              </div>

              <div class="tradeDetail-box-div-des-div2">
                <span>服务价格：</span>
                <span>￥{{price}}</span>
              </div>
              <div class="tradeDetail-box-div-des-div3">
                <div>服务类型：</div>
                <div class="tradeDetail-box-div-des-div3-type">
                  <div v-for="(v,k) in type" @click="changeType(v.id,v.service_price,v.price,v.desc,v.title)" v-bind:class="{colorChange:v.id==dynamic}">{{v.title}}</div>
                </div>
              </div>
              <div style="clear:both;"></div>
              <div class="tradeDetail-box-div-des-div4">
                <div>购买数量：</div>
                <div @click="miu1">-</div>
                <div>
                  <input v-model="value1" type="number">
                </div>
                <div @click="add1">+</div>
              </div>
              <div class="tradeDetail-box-div-des-div2">
                <span>结算金额：</span>
                <span>￥{{total}}</span>
              </div>
            </div>
            <img class="tradeDetail-box-img" :src="GLOBAL.base_url+this.pic" alt="">
            <div style="clear:both;"></div>
            <div class="tradeDetail-box-div-des-div5">
              <div @click="tobuy">立即购买</div>
              <div @click="addCart">加入购物车</div>
            </div>
          </div>
      </div>
      <div class="banner">
        <img :src="GLOBAL.base_url+this.bigimg" alt="">
      </div>
    <Foot></Foot>
  </div>
</template>

<script>
import Top from '../ui/top.vue';
import Foot from '../ui/foot.vue';
import Fix from '../ui/fix.vue';
export default {
  name: 'tradeDetail',
  data(){
      return{
          data:'',
          value1:1,
          price:'',
          total:'',
          title:'',
          desc:'',
          pic:'',
          type:[],
          dynamic:'',
          click_title:'',
          good_title:'',
          good_id:'',
          good_type:'',
          diff:1,
          bigimg:'',
          id:''
      }
  },
  components: {
      Top,
      Foot,
      Fix
  },
  watch:{
    '$route': 'getdata'
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
        if(this.$cookie.getCookie('u_id')){
          this.id = this.$cookie.getCookie('u_id')
        }else{
          this.id = 0
        }
          this.$http.get(this.GLOBAL.base_url+'/api/goods/detail',{params:{
            id:this.$route.query.id,
            user_id:this.id
          }}).then(res=>{
            // console.log(res)
            if(res.data.code == "1"){
              this.type = res.data.data.second;
              this.title = res.data.data.title;
              this.desc = res.data.data.desc;
              // 商标服务下商品的id
              this.good_id = res.data.data.id;
              // 商标服务的id
              this.good_type = res.data.data.cate_id;
              // 商标服务下商品（如商标注册的名字）
              this.good_title = res.data.data.title;

              if(this.$route.query.secondid != 0){
                this.dynamic = this.$route.query.secondid;
                for(var i =0;i<this.type.length;i++){
                  if(this.$route.query.secondid == this.type[i].id){
                     this.price = Number(res.data.data.second[i].service_price)+Number(res.data.data.second[i].price);
                      this.desc = res.data.data.second[i].desc;
                      this.click_title = res.data.data.second[i].title;
                      // 商标服务下服务类型的id
                      this.clickId = res.data.data.second[i].id;
                      this.total = this.price*this.value1;
                      this.pic = this.type[i].pic;
                      this.bigimg = this.type[i].service;
                  }
                }
              }else{
                this.dynamic = res.data.data.second[0].id;
                this.price = Number(res.data.data.second[0].service_price)+Number(res.data.data.second[0].price);
                this.desc = res.data.data.second[0].desc;
                this.click_title = res.data.data.second[0].title;
                // 商标服务下服务类型的id
                this.clickId = res.data.data.second[0].id;
                this.total = this.price*this.value1;
                this.pic = res.data.data.second[0].pic;
                this.bigimg = res.data.data.second[0].service;
              }
            }
          })
      },
      changeType(index,value1,value2,desc,title){
        this.dynamic = index;
        this.price = Number(value1)+Number(value2);
        this.desc = desc;
        this.total = this.price*this.value1;
        this.click_title = title;
        for(var i =0;i<this.type.length;i++){
          if(index == this.type[i].id){
              this.pic = this.type[i].pic;
              this.bigimg = this.type[i].service;
          }
        }
      },
      addCart(){
        if(this.$cookie.getCookie('u_id')){
            this.$http.post(this.GLOBAL.base_url+'/api/shopcar/shoppingcaradd',{
            user_id:this.$cookie.getCookie('u_id'),
            good_id:this.good_title,
            click_type:this.click_title,
            count:this.value1,
            price:this.total
          }).then(res=>{
              if(res.data.code == "1"){
                this.tip('success',"添加购物车成功");
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

      },
      add1(){
          this.value1++;
            this.total = this.price*this.value1;
      },
      miu1(){
        if(this.value1>1){
          this.value1--;
            this.total = this.price*this.value1;
        }
      },
      tobuy(){
        if(this.$cookie.getCookie('u_id')){
            this.$http.post(this.GLOBAL.base_url+'/api/shopcar/othersBuy',{
            user_id:this.$cookie.getCookie('u_id'),
            good_type:this.good_type,
            good_id:this.good_id,
            good_name:this.title,
            click_type:this.click_title,
            price:this.total,
            count:this.value1
          }).then(res=>{
              if(res.data.code == "1"){
                this.order = res.data.order;
                  this.$router.push({
                      path:'/checkOrder',
                      query:{
                      order:this.order
                      }
                  })
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

      },
      totype(){
        if(this.$cookie.getCookie('u_id')){
           this.$router.push('/pickguild')
        }else{
          this.$router.push({
            path:'/login',
            query:{
              good:0
            }
          })
        }

      }
  },
  mounted(){
      this.getdata()
  }
}

</script>

<style scoped>
  .bread-box{
    width: 100%;
    height: 40px;
    background-color: #f8f8f8;
  }
  .bread-card{
    width: 1200px;
    height: 28px;
    margin: 0 auto;
    padding-top:12px;
  }
  .tradeDetail-box-div{
    width: 1200px;
    margin: 0 auto;
  }
  .tradeDetail-box-div-des{
    float: left;
  }
  .tradeDetail-box-div-des-div1{
    height: 54px;
    margin: 21px 0 34px;
  }
  .tradeDetail-box-div-des-div1>p:nth-of-type(1){
    font-family: "PingFangSC-Medium";
    font-size: 22px;
    font-weight: 500;
    color: #333333;
    margin-bottom: 4px;
  }
  .tradeDetail-box-div-des-div1>p:nth-of-type(2){
    font-family: "PingFangSC-Regular";
    font-size: 14px;
    color: #5b5b5b;
  }
  .tradeDetail-box-div-des-div2{
    font-family: "PingFangSC-Regular";
    font-size: 18px;
    margin-bottom: 14px;
  }
  .tradeDetail-box-div-des-div2>span:nth-of-type(1){
    color: #434343;
  }
  .tradeDetail-box-div-des-div2>span:nth-of-type(2){
    color: #ff1d1d;;
  }
  .tradeDetail-box-div-des-div3{
    /* height: 120px; */
    margin-bottom: 14px;
  }
  .tradeDetail-box-div-des-div3>div{
    float: left;
  }
  .tradeDetail-box-div-des-div3>div:nth-of-type(1){
    font-family: "PingFangSC-Regular";
    font-size: 18px;
    margin-top: 4px;
    color: #434343;
  }
  .tradeDetail-box-div-des-div3-type{
    width: 480px;
    margin-left: 4px;
  }
  .tradeDetail-box-div-des-div3-type>div{
    float: left;
    height: 33px;
    line-height: 33px;
    text-align: center;
    font-size: 18px;
    color: #ffffff;
    padding:0 20px;
    margin-right: 12px;
    margin-bottom: 20px;
    border-radius: 4px;
    background-color: #cdcdcd;
    cursor: pointer;
  }
  .tradeDetail-box-div-des-div3-type .colorChange{
    background-color: #f96006;
  }
  .tradeDetail-box-div-des-div4{
    margin-bottom: 14px;
    height: 26px;
  }
  .tradeDetail-box-div-des-div4>div{
    float: left;
  }
  .tradeDetail-box-div-des-div4>div:nth-of-type(1){
    font-family: "PingFangSC-Regular";
    font-size: 18px;
    color: #434343;
  }
  .tradeDetail-box-div-des-div4>div:nth-of-type(2),.tradeDetail-box-div-des-div4>div:nth-of-type(4){
    font-family: "PingFangSC-Regular";
    font-size: 20px;
    font-weight: 300;
    text-align: center;
    cursor: pointer;
    line-height: 26px;
    width: 26px;
    height: 26px;
    border-radius: 2px;
    background-color: #f1f1f1;
    color: #434343;
  }
  .tradeDetail-box-div-des-div4>div:nth-of-type(2){
    margin-left: 4px;
  }
  .tradeDetail-box-div-des-div4>div>input{
    width: 44px;
    height: 22px;
    outline: none;
    border:none;
    text-align: center;
    padding: 0 5px;
    vertical-align: middle;
  }
  .tradeDetail-box-img{
    width: 560px;
    height: 360px;
    float: right;
    margin-top: 21px;
  }
  .tradeDetail-box-div-des-div5{
    /* margin-top: 54px; */
    height: 41px;
  }
  .tradeDetail-box-div-des-div5>div{
    width: 120px;
    height: 41px;
    border-radius: 4px;
    float: left;
    text-align: center;
    line-height: 41px;
    font-family: "PingFangSC-Regular";
    font-size: 18px;
    cursor: pointer;
  }
  .tradeDetail-box-div-des-div5>div:nth-of-type(1){
    background-color: #f79000;
    color: #ffffff;
    margin-right: 41px;
  }
  .tradeDetail-box-div-des-div5>div:nth-of-type(2){
    background-color: #e3e3e3;
    color: #f87604;
  }
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    appearance: none;
    margin: 0;
  }
  input{
    -moz-appearance:textfield;
  }
  .banner {
    width: 1200px;
    margin: 40px auto 0;
}
.banner img {
    width: 1920px;
    margin: 0 -420px;
    vertical-align: middle;
}
</style>
<style>
  .el-breadcrumb__inner a, .el-breadcrumb__inner.is-link{
      font-weight: normal;
  }
  .el-breadcrumb__inner a, .el-breadcrumb__inner.is-link:hover{
      color:#303133;
  }
</style>

