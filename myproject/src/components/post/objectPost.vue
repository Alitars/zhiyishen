<template>
  <div id="objectPost">
    <Top></Top>
     <Fix></Fix>
    <div class="objectPost-box">
      <img src="/static/images/personal-img.png" alt="">
      <div class="objectPost-box-wrap">
          <div class="objectPost-box-wrap-top">
              <p>商标异议</p>
              <p>*以下文件需邮寄到我们公司</p>
          </div>
          <div class="objectPost-box-wrap-link">
              <div></div>
              <div>
                  <p>联系电话：400-630-2718</p>
                  <p>邮寄地址：上海市松江区松江新城文诚路果老（上海）互联网技术有限公司</p>
              </div>
          </div>
          <div class="objectPost-box-wrap-print">用户自行打印</div>
          <div class="objectPost-box-wrap-img">
              <div>
                  <img src="/static/images/licene.png" alt="">
                  <p>1.企业营业执照副本复印件（盖公章）</p>
              </div>
          </div>
          <div class="objectPost-box-wrap-post">尚未拥有（需下载后打印邮寄）</div>
          <div class="objectPost-box-wrap-load">
              <div>
                  <div>
                    <div class="objectPost-box-wrap-load-img"></div>
                    <div class="objectPost-box-wrap-load-watch">
                        <div>商标异议申请书</div>
                        <div v-show="applyshow">
                            <a :href="GLOBAL.win_url+this.see1" target="_blank" rel="noopener noreferrer">预览</a>
                            <a :href="GLOBAL.win_url+'/api/order/fileDownload?name='+this.load1+'&type=3'">下载</a>
                        </div>
                        <div v-show="!applyshow">商标异议申请书文件未上传</div>
                    </div>
                 </div>
                 <p>2.商标异议申请书（盖公章）</p>
              </div>
              <div>
                  <div>
                    <div class="objectPost-box-wrap-load-img"></div>
                    <div class="objectPost-box-wrap-load-watch">
                        <div>商标异议代理委托书</div>
                        <div v-show="trust">
                            <a :href="GLOBAL.win_url+this.see2" target="_blank" rel="noopener noreferrer">预览</a>
                            <a :href="GLOBAL.win_url+'/api/order/fileDownload?name='+this.load2+'&type=3'">下载</a>
                        </div>
                        <div v-show="!trust">商标异议代理委托书文件未上传</div>
                    </div>
                 </div>
                 <p>3.商标代理委托书（盖公章）</p>
              </div>
          </div>
          <div class="objectPost-box-wrap-bottom">
            <div>
                <div class="objectPost-box-wrap-load-img"></div>
                <div class="objectPost-box-wrap-load-watch">
                    <div>商标异议正文</div>
                    <div v-show="brandshow">
                        <a :href="GLOBAL.base_url+this.brand_see" target="_blank" rel="noopener noreferrer">预览</a>
                        <a :href="GLOBAL.base_url+'/api/order/fileDownload?name='+this.brand_load+'&type=1'">下载</a>
                    </div>
                    <div v-show="!brandshow">商标异议正文文件未上传</div>
                </div>
            </div>
            <p>4.商标异议正文（盖公章）</p>
        </div>
        <div @click="back" class="objectPost-box-wrap-back">返回</div>
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
  name: 'objectPost',
  data(){
    return{
        // 申请书
        see1:'',
        load1:'',
        // 委托书
        see2:'',
        load2:'',
        // 正文
        brand_see:'',
        brand_load:'',
        // 判断文件是否存在显示隐藏
        applyshow:Boolean,
        trust:Boolean,
        brandshow:Boolean
    }
  },
  components: {
    Top,
    Foot,
    Fix
  },
  watch:{
      
  },
  methods:{
      getData(){
            this.$http.post(this.GLOBAL.base_url+'/api/order/applyUploadFile',{
                order_id:this.$route.query.order_id
            }).then(res=>{
              if(res.data.code == "1"){
                  if(res.data.data.apply_url == ""){
                      this.applyshow = false;
                  }else{
                      this.applyshow = true;
                  }
                  if(res.data.data.brand_bailment == ""){
                      this.trust = false;
                  }else{
                      this.trust = true;
                  }
                  if(res.data.data.brand_see == ""){
                      this.brandshow = false;
                  }else{
                      this.brandshow = true;
                  }
                this.see1 = res.data.data.apply_url;
                this.load1 = res.data.data.apply_urls;
                this.see2 = res.data.data.brand_bailment;
                this.load2 = res.data.data.brand_bailments;
                this.brand_see = res.data.data.brand_certificate;
                this.brand_load = res.data.data.brand_certificates;
                // console.log(res)
              }else{
                  this.applyshow = false;
                  this.trust = false;
                  this.brandshow = false;
                //   console.log(res)
              }
              
            });
        },
        back(){
            this.$router.push('/personal/order?status=all')
        }
  },
  mounted(){
      this.getData();
  }
}

</script>

<style scoped>
  .objectPost-box>img{
    width: 100%;
    height: 188px;
  }
  .objectPost-box-wrap{
    width: 1218px;
    margin: 0 auto 148px;
  }
  .objectPost-box-wrap-top{
    border-bottom: 1px solid #d8d8d8;
    height: 132px;
  }
  .objectPost-box-wrap-top>p:nth-of-type(1){
    font-family: "PingFangSC-Semibold";
    font-size: 36px;
    font-weight: 600;
    color: #333333;
    float: left;
    margin-top: 52px;
  }
  .objectPost-box-wrap-top>p:nth-of-type(2){
    font-family: "PingFangSC-Regular";
    font-size: 22px;
    color: #f96006;
    float: right;
    margin-top: 67px;
    margin-right: 50px;
  }
  .objectPost-box-wrap-link{
      height: 60px;
      margin: 33px 0 110px 17px;
  }
  .objectPost-box-wrap-link>div{
      float: left;
  }
  .objectPost-box-wrap-link>div:nth-of-type(1){
      width: 56px;
      height: 41px;
      background: url("/static/images/email.png") no-repeat;
      background-size: cover;
      margin: 10px 22px 0 0;
  }
  .objectPost-box-wrap-link>div:nth-of-type(2)>p{
      font-family: "PingFangSC-Regular";
      font-size: 22px;
      color: #535353;
  }
  .objectPost-box-wrap-print{
      margin-bottom: 52px;
      font-family: "PingFangSC-Medium";
      font-size: 24px;
      font-weight: 500;
      color: #333333;
      margin-left: 17px;
  }
  .objectPost-box-wrap-img{
      margin-bottom: 106px;
      margin-left: 17px;
      height: 276px;
  }
  .objectPost-box-wrap-img>div>img{
      width: 182px;
      height: 218px;
      margin-bottom: 28px;
      margin-left: 70px;
  }
  .objectPost-box-wrap-img>div>p{
      font-family: "PingFangSC-Regular";
      font-size: 22px;
      color: #666660;
  }
  .objectPost-box-wrap-post{
      margin-bottom: 50px;
      margin-left: 17px;
      font-family: "PingFangSC-Medium";
      font-size: 24px;
      font-weight: 500;
      color: #333333;
  }
  .objectPost-box-wrap-load{
      height: 166px;
      margin-bottom: 100px;
  }
  .objectPost-box-wrap-load>div{
      float: left;
  }
  .objectPost-box-wrap-load>div:nth-of-type(1){
      margin-right: 312px;
  }
  .objectPost-box-wrap-load>div>div{
      height: 117px;
      margin-bottom: 20px;
  }
  .objectPost-box-wrap-load>div>div>div{
      float: left;
  }
  .objectPost-box-wrap-load-img{
      width: 117px;
      height: 117px;
      background: url("/static/images/datawrite.png") no-repeat;
      background-size: cover;
  }
  .objectPost-box-wrap-load-watch{
      margin: 14px 0 0 11px;
  }
  .objectPost-box-wrap-load-watch>div:nth-of-type(1){
      font-family: "PingFangSC-Regular";
      font-size: 32px;
      margin-bottom: 16px;
      color: #333333;
  }
  .objectPost-box-wrap-load-watch>div:nth-of-type(3){
      font-family: "PingFangSC-Regular";
     font-size: 16px;
     color: #f96006;
  }
  .objectPost-box-wrap-load-watch>div:nth-of-type(2)>a{
      text-decoration: none;
      font-family: "PingFangSC-Regular";
      font-size: 24px;
      color: #f96006;
      cursor: pointer;
  }
  .objectPost-box-wrap-load-watch>div:nth-of-type(2)>a:nth-of-type(1){
      margin-right: 120px;
  }
  .objectPost-box-wrap-load>div>p,.objectPost-box-wrap-bottom>p{
      margin-left: 18px;
      font-family: "PingFangSC-Regular";
      font-size: 22px;
      color: #666660;
  }
  .objectPost-box-wrap-bottom{
      margin-bottom: 150px;
  }
  .objectPost-box-wrap-bottom>div{
      height: 117px;
      margin-bottom: 16px;
  }
  .objectPost-box-wrap-bottom>div>div{
      float: left;
  }
  .objectPost-box-wrap-back{
      cursor: pointer;
      width: 215px;
      height: 41px;
      border-radius: 4px;
      border-style: solid;
      border-width: 1px;
      border-image-source: linear-gradient(to top, #d6d6d6, #d6d6d6);
      border-image-slice: 1;
      background-image: linear-gradient(to bottom, #ffffff, #e3e3e3), linear-gradient(to top, #d6d6d6, #d6d6d6);
      background-origin: border-box;
      background-clip: content-box, border-box;
      text-align: center;
      line-height: 41px;
      font-family: "PingFangSC-Regular";
      font-size: 18px;
      color: #f87604;
      margin-left: 850px;
  }
</style>
