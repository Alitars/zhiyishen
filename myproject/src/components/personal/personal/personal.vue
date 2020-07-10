<template>
  <div class="personal-container">
    <Top></Top>
    <Fix></Fix>
    <div class="personal-container-top">
      <div>
        <div class="person-div1">
          <img src="/static/images/person-top.png" alt="">
        </div>
        <div class="person-div2"></div>
        <div class="person-div3" @click="tocenter">个人中心</div>
      </div>
    </div>
    <!-- <div class="personal-container-top">
      <div class="personal-container-top-box">
        <p class="personal-container-top-box-p">Hi Allen</p>
        <div class="personal-container-top-box-div">退出</div>
      </div>
    </div>
    <div class="personal-container-middle">
      <div class="personal-container-middle-box">
        <div class="personal-container-middle-box-center">用户中心</div>
        <div class="personal-container-middle-box-upload">
          <div>
              <el-upload
                  class="upload-demo"
                  accept="image/*"
                  :http-request="uploadImg"
                  :show-file-list="false"
                  action="">
                  <img class="headimg" :src="headImage" alt="">
              </el-upload>
            <p class="upload-name">Allen</p>
            <div style="clear:both;"></div>
          </div>
        </div>
      </div>
    </div> -->
    <div class="personal-center">
      <div class="personal-container-middle-box-collapse">
        <el-collapse v-model="activeNames">
            <el-collapse-item name="1">
              <template slot="title">
                <img class="personal-container-middle-box-collapse-img" src="/static/images/system.png" alt="">
                <span class="personal-container-middle-box-collapse-span">账户设置</span>
              </template>
              <router-link class="personal-container-middle-box-collapse-personal" tag="div" to="/personal/personalData">个人资料</router-link>
              <router-link class="personal-container-middle-box-collapse-personal" tag="div" to="/personal/agency">代理申请</router-link>
              <div class="personal-container-middle-box-collapse-personal" @click="tomember" v-show="membershow">会员中心</div>
              <router-link class="personal-container-middle-box-collapse-safe" tag="div" to="/personal/safeCenter">安全中心</router-link>
              <router-link id="personal-container-middle-box-collapse-manage" tag="div" to="/personal/shippingAddress">收件地址</router-link>
            </el-collapse-item>
            <el-collapse-item name="2">
              <template slot="title">
                <img class="personal-container-middle-box-collapse-img" src="/static/images/tes.png" alt="">
                <span class="personal-container-middle-box-collapse-span">认证中心</span>
              </template>
              <router-link class="personal-container-middle-box-collapse-personal" tag="div" to="/personal/personalComfire">个人认证</router-link>
              <router-link id="personal-container-middle-box-collapse-safe2" tag="div" to="/personal/companyComfire">企业认证</router-link>
            </el-collapse-item>
            <!-- 订单修改 -->
            <el-collapse-item name="3">
              <template slot="title">
                <img class="personal-container-middle-box-collapse-img" src="/static/images/order.png" alt="">
                <span class="personal-container-middle-box-collapse-span">订单管理</span>
              </template>
              <router-link class="personal-container-middle-box-collapse-personal" tag="span" :to="{path:'/personal/order',query: {status: 'all'}}">商标订单</router-link>
              <router-link class="personal-container-middle-box-collapse-safe" tag="div" :to="{path:'/personal/orderPatent',query: {status: 'all'}}">专利订单</router-link>
              <router-link class="personal-container-middle-box-collapse-safe" tag="div" :to="{path:'/personal/orderCopyright',query: {status: 'all'}}">版权订单</router-link>
            </el-collapse-item>
            <!-- 购物车修改 -->
            <el-collapse-item name="4">
              <template slot="title">
                <img class="personal-container-middle-box-collapse-img" src="/static/images/cart.png" alt="">
                <span class="personal-container-middle-box-collapse-span">购物车</span>
              </template>
              <router-link class="personal-container-middle-box-collapse-personal ml37" tag="div" to="/personal/buyCart">商标购物车</router-link>
              <router-link class="personal-container-middle-box-collapse-safe ml37" tag="div" to="/personal/buyPatent">专利购物车</router-link>
              <router-link class="personal-container-middle-box-collapse-personal ml37" tag="div" to="/personal/buyCopyright">版权购物车</router-link>
            </el-collapse-item>
            <!-- 优惠券 -->
            <div class="personal-container-middle-box-collapse-juan">
              <img class="personal-container-middle-box-collapse-img right-px6" src="/static/images/juan.png" alt="">
              <router-link tag="span" to="/personal/coupon">优惠券</router-link>
            </div>
            <el-collapse-item name="5">
              <template slot="title">
                <img class="personal-container-middle-box-collapse-img" src="/static/images/invoice.png" alt="">
                <span class="personal-container-middle-box-collapse-span">我的发票</span>
              </template>
              <router-link class="personal-container-middle-box-collapse-personal" tag="div" to="/personal/applyInvoice">开票申请</router-link>
              <router-link class="personal-container-middle-box-collapse-personal" tag="div" to="/personal/recordList">开票记录</router-link>
              <router-link id="personal-container-middle-box-collapse-manage" tag="div" to="/personal/manageList">开票信息管理</router-link>
            </el-collapse-item>
            <!-- <el-collapse-item name="6">
              <template slot="title">
                <img class="personal-container-middle-box-collapse-img" src="/static/images/property.png" alt="">
                <span class="personal-container-middle-box-collapse-span">知产管理</span>
              </template>
              <router-link class="personal-container-middle-box-collapse-personal" tag="div" to="/personal/assetsManagement">商标管理</router-link>
              <router-link class="personal-container-middle-box-collapse-personal" tag="div" to="/personal/patentProperty">专利管理</router-link>
            </el-collapse-item> -->
            <!-- <div class="personal-container-middle-box-collapse-news">
                <img class="personal-container-middle-box-collapse-img right-px6" src="/static/images/message.png" alt="">
                <router-link tag="span" :to="{path:'/issue/issueList',query: {status: 'all'}}">技术交底书</router-link>
            </div> -->
            <div class="personal-container-middle-box-collapse-news">
                <img class="personal-container-middle-box-collapse-img right-px6" src="/static/images/message.png" alt="">
                <router-link tag="span" to="/personal/assetsManagement">知产管理</router-link>
            </div>
            <el-collapse-item name="7">
              <template slot="title">
                <img class="personal-container-middle-box-collapse-img" src="/static/images/report.png" alt="">
                <span class="personal-container-middle-box-collapse-span">我的报告</span>
              </template>
              <router-link class="personal-container-middle-box-collapse-personal" tag="div" to="/personal/analysisList">专利申请评估</router-link>
              <!-- <router-link class="personal-container-middle-box-collapse-personal" tag="div" :to="{path:'/personal/tradereportList',query: {status: 'all'}}">商标评估报告</router-link> -->
            </el-collapse-item>
            <el-collapse-item name="8">
              <template slot="title">
                <img class="personal-container-middle-box-collapse-img" src="/static/images/report.png" alt="">
                <span class="personal-container-middle-box-collapse-span">知产交易</span>
              </template>
              <router-link class="personal-container-middle-box-collapse-personal" tag="div" to="/personal/buyingMarks">我的求购商标</router-link>
              <router-link class="personal-container-middle-box-collapse-personal" tag="div" to="/personal/buyingDemand">我的求购需求</router-link>
              <router-link class="personal-container-middle-box-collapse-personal" tag="div" to="/personal/myPublish">我的发布</router-link>
              <router-link class="personal-container-middle-box-collapse-personal" tag="div" to="/personal/myFavorite">我的收藏</router-link>
            </el-collapse-item>
            <!-- <div class="personal-container-middle-box-collapse-news">
                <img class="personal-container-middle-box-collapse-img" src="/static/images/tradeWatch.png" alt="">
                <router-link tag="span" to="/personal/tradeWatch">商标监控</router-link>
            </div> -->
            <div class="personal-container-middle-box-collapse-news">
                <img class="personal-container-middle-box-collapse-img right-px6" src="/static/images/message.png" alt="">
                <router-link tag="span" to="/personal/message">我的消息</router-link>
            </div>
          </el-collapse>
      </div>
    </div>
    <router-view></router-view>
    <Foot></Foot>
  </div>
</template>

<script>
import Top from '../../ui/top.vue';
import Fix from '../../ui/fix.vue';
import Foot from '../../ui/foot.vue';
export default {
  name: 'persoanl',
  components: {
    Top,
    Foot,
    Fix
  },
  data() {
      return {
        headImage: '',
        activeNames: ['1','2','3','4','5','6','7','8'],
        membershow:true
      };
    },
    methods: {
       uploadImg(img){
                let formData=new FormData();
                formData.append('pic',img.file);
                formData.append('user_id',this.$cookie.getCookie('u_id'));
                this.$http.post(this.GLOBAL.base_url+'/api/usercenter/upload_head',formData).then(res=>{
                  if(res.data.code == "1"){
                    this.headImage = this.GLOBAL.base_url+res.data.data.head_img;
                  }
                });
            },
      handleOpen(key, keyPath) {
        // console.log(key, keyPath);
      },
      tocenter(){
        this.$router.push('/personal/personalInformation')
      },
      tomember(){
        let routeData = this.$router.resolve({ path: '/memberCenter'});
        window.open(routeData.href, 'blank');
      }
  },
  mounted(){
    this.$http.get(this.GLOBAL.base_url+'/api/usercenter',{params:{
      user_id:this.$cookie.getCookie('u_id')
    }
    }).then(res=>{
     if(res.data.data.head_img == null){
       this.headImage = '/static/images/head.png';
     }else{
       this.headImage = this.GLOBAL.base_url+res.data.data.head_img;
     }
    })
    if(this.$cookie.getCookie('user_type')== 3 || this.$cookie.getCookie('type') == 2){
      this.membershow =false;
    }
  }
}

</script>

<style scoped>
.personal-container {
  background-color: #fafafa;
  z-index: 2;
  position: relative;
}
.router-link-active{
  color: #f96006!important;
}
.personal-container > div:nth-child(5){
  min-height: 1180px;
}
.personal-container-top{
  width: 100%;
  box-shadow: 0 4px 4px 0 rgba(231, 231, 231, 0.5);
  height: 96px;
  background: #ffffff;
  margin-bottom: 4px;
}
  .personal-container-top>div{
    width: 1000px;
    margin: 0 auto;
    height: 96px;
  }
  .person-div1{
    width: 120px;
    height: 45px;
    margin-top: 33px;
    margin-right: 20px;
  }
  .person-div1>img{
    margin-top: 3px;
  }
  .person-div2{
    width: 2px;
    height: 36px;
    background-color: #f96006;
    margin: 30px 18px 0 0;
  }
  .person-div3{
    font-size: 24px;
    margin-top: 31px;
    color: #f96006;
    cursor: pointer;
  }
  .personal-container-top>div>div{
    float: left;
  }
  .personal-center{
    width: 1160px;
    margin: 0 auto;
  }
.personal-container-middle-box-collapse{
  width: 169px;
  height: 468px;
  margin: 12px 0 64px;
  float: left;

}
.personal-container-middle-box-collapse-center{
  font-size: 22px;
  font-weight: 100;
  font-family: "PingFangSC-Thin";
  margin: 0 0 14px 65px;
  color: #999999;
}
.personal-container-middle-box-collapse-img{
  margin-right: 11px;
  margin-left: 27px;
  width: 14px;
  height: 14px;
}
.personal-container-middle-box-collapse-span{
  font-family: "PingFangSC";
  font-size: 14px;
  color: #333333;
  font-weight:700;
}
.personal-container-middle-box-collapse-personal{
  font-family: "PingFangSC-Thin";
  font-size: 14px;
  font-weight: 100;
  margin: 0px 0px 4px 54px;
  color: #666666;
  cursor: pointer;
}
.personal-container-middle-box-collapse-safe{
  font-family: "PingFangSC-Thin";
  font-size: 14px;
  font-weight: 100;
  margin: 0px 0px 0px 54px;
  color: #666666;
  cursor: pointer;
}
.personal-container-middle-box-collapse-address{
  font-family: "PingFangSC-Thin";
  font-size: 18px;
  font-weight: 100;
  margin: 0 0 5px 80px;
  color: #666666;
  cursor: pointer;
}
#personal-container-middle-box-collapse-safe2{
  font-family: "PingFangSC-Thin";
  font-size: 14px;
  font-weight: 100;
  margin: 4px 59px 0px 54px;
  width: 210px;
  color: #666666;
  cursor: pointer;
}
.personal-container-middle-box-collapse-juan,.personal-container-middle-box-collapse-order,.personal-container-middle-box-collapse-buyCart{
  height: 48px;
  line-height: 48px;
  border-bottom: none;
  cursor: pointer;
}
.personal-container-middle-box-collapse-juan>span{
  font-family: "PingFangSC";
  font-size: 14px;
  color: #333333;
  vertical-align: middle;
  font-weight: 700;
}
.personal-container-middle-box-collapse-buyCart>img{
  width: 14px;
  height: 14px;
  vertical-align: middle;
}
.personal-container-middle-box-collapse-buyCart>span{
  font-family: "PingFangSC";
  font-size: 14px;
  color: #333333;
  font-weight: 700;
}
.personal-container-middle-box-collapse-juan>img,.personal-container-middle-box-collapse-news>img,.personal-container-middle-box-collapse-order>img{
  vertical-align: middle;
}
.personal-container-middle-box-collapse-news,.personal-container-middle-box-collapse-order{
  height: 48px;
  line-height: 48px;
  cursor: pointer;
}
.personal-container-middle-box-collapse-news>span,.personal-container-middle-box-collapse-order>span{
  font-family: "PingFangSC";
  font-size: 14px;
  color: #333333;
  vertical-align: middle;
  font-weight: 700;
}
#personal-container-middle-box-collapse-manage{
  font-family: "PingFangSC-Thin";
  font-size: 14px;
  font-weight: 100;
  margin: 4px 59px 0px 54px;
  width: 144px;
  color: #666666;
  cursor: pointer;
}
.coupon-container {
  background-color: #fafafa;
}
.el-collapse {
  background-color: #fff;
  border: none;
  padding-top: 20px;
  /* height: 468px; */
}

/* 6px修改 */
.right-px6 {
  margin-right: 7px;
}
.ml37 {
  margin-left: 51px !important;
  /* margin-: 62px !important; */
}
</style>
<style >
  .el-collapse-item__header {
    border-bottom: none;
  }
  .el-collapse-item__content {
    padding-bottom: 0px;
  }
  .el-collapse-item__wrap {
     border-bottom: none;
  }
  .element.style {
    display: block;
  }
</style>
