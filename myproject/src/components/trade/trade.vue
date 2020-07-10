<template>
  <div class="trade-container">
    <Top></Top>
    <Fix></Fix>
    <div class="trade-box">
        <div class="service">
          <div class="trade-pic">
              <p>AI商标注册</p>
              <div>
                <p>先检测后注册&nbsp;&nbsp;AI赋能为您检测商标推荐类别</p>  
                <p>四星商标注册&nbsp;&nbsp;成功指数达到4星以上</p>  
                <p>前期<span class="trade-zero">0元</span>申请</p>
                <p>注册不成功不收费</p>
              </div>
              <div @click="to()">立即办理</div>
          </div>
        </div>
        <div class="bread-box">
            <div class="bread-box-div1">
                <div class="reg-div1">
                  <div>
                    <img src="/static/images/regimg1.png" alt=""><span>商标注册</span>
                  </div>
                  <p>人工智能为您保驾护航，先检测后注册，为您推荐最合适的注册类别，确保注册成功率</p>
                </div>
                <div class="reg-div2" v-for="(v,k) in good" v-if="k == 0">
                  <div class="reg-div2-top">
                    <div class="reg-div2-top-title">
                      <div>产品名称</div>
                      <div>申请费用</div>
                    </div>
                    <div class="reg-div2-top-list">
                      <div v-for="(item,index) in v.other">
                        <div>{{item.title}}</div>
                        <div>{{Number(item.price)+Number(item.service_price)}}元</div>
                      </div>
                    </div>
                  </div>
                  <div class="reg-div2-des">
                    <div class="reg-div2-des-title">特色服务</div>
                    <div class="reg-div2-des-list" v-for="(item,index) in v.other">
                        <div>{{item.desc}}</div>
                    </div>
                  </div>
                </div>
                <div class="reg-last" @click="to()">立即办理</div>
            </div>
            <div class="bread-box-div2" v-for="(v,k) in good" v-if="k == 1">
                <div class="reg-div3">
                    <img src="/static/images/regimg2.png" alt="">
                    <span>{{v.title}}</span>
                </div>
                <div class="reg-div4">
                    <div v-for="(item,index) in v.other">
                      <div>
                        <img src="/static/images/traderisk1.png" alt="" v-if="index == 0">
                        <img src="/static/images/traderisk2.png" alt="" v-if="index == 1">
                        <img src="/static/images/traderisk5.png" alt="" v-if="index == 2">
                        <img src="/static/images/traderisk3.png" alt="" v-if="index == 3">
                        <img src="/static/images/traderisk4.png" alt="" v-if="index == 4">
                        <img src="/static/images/traderisk6.png" alt="" v-if="index == 5">
                        <p>{{item.title}}</p>
                        <p :title="item.desc">{{item.desc}}</p>
                        <div class="trade-bor"></div>
                        <p>￥<span>{{Number(item.price)+Number(item.service_price)}}</span><span>/件</span></p>
                        <div @click="totradedetail(v.id,item.id)">立即办理</div>
                      </div>
                    </div>
                </div>
            </div>
            <div class="bread-box-div3">
                <div v-for="(v,k) in good" v-if="k == 3">
                  <div class="reg-div5">
                    <img src="/static/images/regimg3.png" alt="">
                    <span>{{v.title}}</span>
                  </div>
                  <div class="reg-div6">
                      <div v-for="(item,index) in v.other">
                        <div>
                          <img src="/static/images/traderisk7.png" alt="" v-if="index == 0">
                          <img src="/static/images/traderisk8.png" alt="" v-if="index == 1">
                          <p>{{item.title}}</p>
                          <p :title="item.desc">{{item.desc}}</p>
                          <div class="trade-bor"></div>
                          <p>￥<span>{{Number(item.price)+Number(item.service_price)}}</span><span>/件</span></p>
                          <div @click="totradedetail(v.id,item.id)">立即办理</div>
                        </div>
                      </div>
                  </div>
                </div>
                <div v-for="(v,k) in good" v-if="k == 4">
                    <div class="reg-div5">
                        <img src="/static/images/regimg4.png" alt="">
                        <span>{{v.title}}</span>
                    </div>
                    <div class="reg-div6">
                      <div v-for="(item,index) in v.other">
                        <div>
                          <img src="/static/images/traderisk9.png" alt="" v-if="index == 0">
                          <img src="/static/images/traderisk8.png" alt="" v-if="index == 1">
                          <p>{{item.title}}</p>
                          <p :title="item.desc">{{item.desc}}</p>
                          <div class="trade-bor"></div>
                          <p>￥<span>{{Number(item.price)+Number(item.service_price)}}</span><span>/件</span></p>
                          <div @click="totradedetail(v.id,item.id)">立即办理</div>
                        </div>
                      </div>
                  </div>
                </div>
            </div>
            <div class="bread-box-div4" v-for="(v,k) in good" v-if="k == 2">
                <div class="reg-div5">
                    <img src="/static/images/regimg5.png" alt="">
                    <span>{{v.title}}</span>
                  </div>
                  <div class="reg-div4">
                    <div v-for="(item,index) in v.other">
                      <div>
                        <img src="/static/images/traderisk10.png" alt="" v-if="index == 0">
                        <p>{{item.title}}</p>
                        <p :title="item.desc">{{item.desc}}</p>
                        <div class="trade-bor"></div>
                        <p>￥<span>{{Number(item.price)+Number(item.service_price)}}</span><span>/件</span></p>
                        <div @click="totradedetail(v.id,item.id)">立即办理</div>
                      </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <Foot></Foot>
  </div>
</template>

<script>
import Top from '../ui/top.vue';
import Foot from '../ui/foot.vue';
import Fix from '../ui/fix.vue';
export default {
  name: 'trade',
  data(){
    return{
      good:[],
      id:''
    }
  },
  components: {
    Top,
    Foot,
    Fix
  },
  methods:{
    to(){
      if(this.$cookie.getCookie('u_id')){
          this.$router.push('recome')
        }else{
          this.$router.push({
            path:'/login',
            query:{
              good:0
            }
          })
        }
    },
    totradedetail(val1,val2){
      this.$router.push({
          path:'/tradeDetail',
          query:{
            id:val1,
            secondid:val2,
            tradeid:this.$route.query.id
            }
          });
    },
    getGood(){
      if(this.$cookie.getCookie('u_id')){
        this.id = this.$cookie.getCookie('u_id')
      }else{
        this.id = 0
      }
      this.$http.get(this.GLOBAL.base_url+'/api/goods/cate',{params:{
         id:this.$route.query.id,
         user_id:this.id
      }}).then(res=>{
                    // console.log(res)
          if(res.data.code == "1"){
              this.good = res.data.data;
          }
      })
    }
  },
  mounted(){
    this.getGood();
  }
}

</script>

<style scoped>
  .trade-box{
    background-color: #fafafa;
  }
  .service{
    width: 100%;
    margin-bottom: 20px;
  }
  .trade-pic{
    margin: 0 auto;
    width: 1200px;
    height: 410px;
    background: url("/static/images/bitmap.png") 100% no-repeat;
    text-align: center;
    padding-top: 70px;
  }
  .trade-pic>p{
    margin-bottom:32px;
    font-size: 48px;
    font-weight: 600;
  }
  .trade-pic>div:nth-of-type(1){
    width: 486px;
    margin: 0 auto 28px;
    font-size: 18px;
  }
  .trade-pic>div:nth-of-type(1)>p{
    margin-bottom: 25px;
  }
  .trade-pic>div:nth-of-type(1)>p:nth-of-type(2){
    margin-bottom: 10px;
  }
  .trade-zero{
   font-size: 40px;
    color: #ff8800;
    margin: 0 10px;
    font-weight: 800;
  }
  .trade-pic>div:nth-of-type(2){
    width: 144px;
    height: 38px;
    border-radius: 4px;
    background-color: #f96006;
    margin: 0 auto;
    line-height: 38px;
     font-size: 16px;
     color: #ffffff;
     cursor: pointer;
  }
  .bread-box{
    width: 1200px;
    margin: 0 auto;
  }
  .bread-box-div1{
    width: 1200px;
    padding-top: 60px;
    padding-bottom: 76px;
    background-color: #ffffff;
    margin-bottom: 20px;
  }
  .reg-div1{
    width: 608px;
    height: 96px;
    margin: 0 auto 28px;
    text-align: center;
  }
  .reg-div1>div{
    height: 50px;
    margin-bottom: 24px;
  }
  .reg-div1>div>img{
    width: 34px;
    height: 34px;
    vertical-align: middle;
    margin-right: 7px;
  }
  .reg-div1>div>span{
    font-size: 36px;
    font-weight: 500;
    color: #333333;
    vertical-align: middle;
  }
  .reg-div1>p{
    font-size: 16px;
    color: #666666;
  }
  .reg-div2{
    width: 1200px;
    height: 393px;
    position: relative;
    /* background: url('/static/images/trade_reg.png') no-repeat;
    background-size: cover; */
    margin-bottom: 60px;
  }
  .reg-div2-top{
    width: 1200px;
    height: 393px;
  }
  .reg-div2-top-title{
     height: 54px;
     background-color: #f0f0f0;
  }
  .reg-div2-top-title>div{
    height: 54px;
    line-height: 54px;
    float: left;
    font-size: 16px;
    letter-spacing: -0.5px;
    text-align: center;
    color: #494949;
    margin: 0 274px 0 103px;
  }
  .reg-div2-top-title>div:nth-of-type(2){
    margin-left: 0;
  }
  .reg-div2-top-list{
    height: 309px;
  }
  .reg-div2-top-list>div{
    height: 102px;
    background: white;
    border-bottom: solid 1px #f0f0f0;;
  }
  .reg-div2-top-list>div>div{
    float: left;
    width: 93px;
    height: 102px;
    line-height: 102px;
    margin:0 228px 0 103px;
    font-size: 16px;
    letter-spacing: -0.5px;
    text-align: center;
    color: #494949;
  }
  .reg-div2-top-list>div>div:nth-of-type(2){
    margin-left: 0;
  }
  .reg-div2-des{
    position: absolute;
    width: 454px;
   height: 363px;
   box-shadow: 2px 4px 12px 0 rgba(159, 159, 159, 0.18);
    top:14px;
    background: #ffffff;
    right:34px;
    z-index: 3;
  }
  .reg-div2-des>div:last-child{
    border:none;
  }
  .reg-div2-des-title{
    width: 454px;
    height: 54px;
    background-image: linear-gradient(to bottom, #fdf9f7, #fdefe8);
    font-size: 16px;
    line-height: 54px;
    letter-spacing: -0.5px;
    text-align: center;
    color: black;
  }
  .reg-div2-des-list{
    height: 88px;
    padding-top: 14px;
    border-bottom: solid 1px #f0f0f0;;
  }
  .reg-div2-des-list>div{
    width: 388px;
    height: 80px;
    margin: 0 auto;
    font-size: 14px;
    letter-spacing: -0.44px;
    text-align: center;
    color: #494949;
  }
  .reg-last{
    width: 144px;
    height: 38px;
    border-radius: 4px;
    background-color: #f96006;
    margin: 0 auto;
    line-height: 38px;
     font-size: 16px;
     color: #ffffff;
     cursor: pointer;
     text-align: center;
  }
  .bread-box-div2{
    width: 1200px;
    height:765px;
    padding-top: 60px;
    background-color: #ffffff;
    margin-bottom: 20px;
  }
  .reg-div3{
    width: 256px;
    height: 50px;
    margin: 0 auto 36px;
  }
  .reg-div3>img{
    width: 32px;
    height: 32px;
    vertical-align: middle;
  }
  .reg-div3>span{
    font-size: 36px;
    font-weight: 500;
    color: #333333;
    vertical-align: middle;
  }
  /* .reg-div4{
    height: 220px;
  } */
  .reg-div4>div{
    float: left;
    width: 280px;
    height: 297px;
    background: url('/static/images/tradebac.png') no-repeat;
    background-size: cover;
    margin:0 20px 20px 0;
    text-align: center;
  }
  .reg-div4>div:nth-of-type(1){
    margin-left: 10px;
  }
  .reg-div4>div:nth-of-type(4){
    margin-right: 0;
  }
  .reg-div4>div>div,.reg-div6>div>div{
    width: 216px;
    margin: 16px auto 0;
  }
  .reg-div4>div:nth-of-type(5){
    margin-left: 10px;
  }
  .reg-div4>div>div>p:nth-of-type(1),.reg-div6>div>div>p:nth-of-type(1){
    margin: 8px 0 9px;
    font-size: 16px;
    font-weight: 500;
    color: #333333;
  }
  .reg-div4>div>div>p:nth-of-type(2),.reg-div6>div>div>p:nth-of-type(2){
    font-size: 14px;
    font-weight: 100;
    width: 168px;
    height: 40px;
    margin:0 auto 16px;
    overflow : hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }
  .reg-div4>div>div>p:nth-of-type(3),.reg-div6>div>div>p:nth-of-type(3){
    color: #f96006;
    margin-bottom: 12px;
  }
  .reg-div4>div>div>p:nth-of-type(3)>span:nth-of-type(1),.reg-div6>div>div>p:nth-of-type(3)>span:nth-of-type(1){
    font-size: 24px;
  }
  .reg-div4>div>div>p:nth-of-type(3)>span:nth-of-type(2),.reg-div6>div>div>p:nth-of-type(3)>span:nth-of-type(2){
    color: #333333;
  }
  .reg-div4>div>div>div:nth-of-type(2),.reg-div6>div>div>div:nth-of-type(2){
    width: 96px;
    height: 32px;
    border-radius: 4px;
    background-color: #f96006;
    cursor: pointer;
    text-align: center;
    line-height: 32px;
    color: white;
    font-size: 14px;
    margin: 0 auto;
  }
  .trade-bor{
    width: 216px;
    border-top:1px solid #f7ede2;
    margin-bottom: 12px;
  }
  .bread-box-div3{
    height: 507px;
    width: 1200px;
    margin-bottom: 20px;
  }
  .bread-box-div3>div{
    float: left;
    width: 590px;
    height: 447px;
    padding-top:60px;
    background-color: #ffffff;
  }
  .bread-box-div3>div:nth-of-type(1){
    margin-right: 20px;
  }
  .reg-div5{
    width: 400px;
    height: 50px;
    text-align: center;
    margin: 0 auto 36px;
  }
  .reg-div5>img{
    width: 32px;
    height: 32px;
    vertical-align: middle;
  }
  .reg-div5>span{
    font-size: 36px;
    font-weight: 500;
    color: #333333;
    vertical-align: middle;
  }
   .reg-div6{
    height: 297px;
  }
  .reg-div6>div{
    float: left;
    width: 280px;
    height: 297px;
    background: url('/static/images/tradebac.png') no-repeat;
    background-size: cover;
    margin:0 10px;
    text-align: center;
  }
  .reg-div6>div:nth-of-type(1){
    margin-right: 0;
  }
  .reg-div6>div>p:nth-of-type(1){
    font-size: 16px;
    font-weight: 500;
    margin: 24px 0 14px;
    color: #333333;
  }
  .reg-div6>div>p:nth-of-type(2){
    font-size: 14px;
    color: #f96006;
  }
  .bread-box-div4{
    width: 1200px;
    height: 447px;
    padding-top: 60px;
    background-color: #ffffff;
  }
</style>
