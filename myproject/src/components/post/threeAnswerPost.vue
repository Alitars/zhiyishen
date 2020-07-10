<template>
  <div id="threeAnswerPost">
    <Top></Top>
    <Fix></Fix>
    <div class="threeAnswerPost-box">
      <img src="/static/images/personal-img.png" alt="">
      <div class="threeAnswerPost-box-wrap">
          <div class="threeAnswerPost-box-wrap-top">
              <p>商标撤三答辩</p>
              <p>*以下文件需邮寄到我们公司</p>
          </div>
          <div class="threeAnswerPost-box-wrap-link">
              <div></div>
              <div>
                  <p>联系电话：400-630-2718</p>
                  <p>邮寄地址：上海市松江区松江新城文诚路果老（上海）互联网技术有限公司</p>
              </div>
          </div>
          <div class="threeAnswerPost-box-wrap-print">用户自行打印</div>
          <div class="threeAnswerPost-box-wrap-img">
              <div>
                  <img src="/static/images/licene.png" alt="">
                  <p>1.企业营业执照副本复印件（盖公章）</p>
              </div>
              <div>
                  <img src="/static/images/three.png" alt="">
                  <p>2. 商标撤销三年不使用通知书原件及邮寄信封原件</p>
              </div>
          </div>
          <div class="threeAnswerPost-box-wrap-post">尚未拥有（需下载后打印邮寄）</div>
          <div class="threeAnswerPost-box-wrap-load">
              <div>
                  <div>
                    <div class="threeAnswerPost-box-wrap-load-img"></div>
                    <div class="threeAnswerPost-box-wrap-load-watch">
                        <div>商标撤三答辩正文</div>
                        <div v-show="brandshow">
                            <a :href="GLOBAL.base_url+this.brand_see" target="_blank" rel="noopener noreferrer">预览</a>
                            <a :href="GLOBAL.base_url+'/api/order/fileDownload?name='+this.brand_load+'&type=1'">下载</a>
                        </div>
                        <div v-show="!brandshow">商标撤三答辩正文文件未上传</div>
                    </div>
                 </div>
                 <p>3.商标撤三答辩正文（盖公章）</p>
              </div>
              <div>
                  <div>
                    <div class="threeAnswerPost-box-wrap-load-img"></div>
                    <div class="threeAnswerPost-box-wrap-load-watch">
                        <div>商标代理委托书</div>
                        <div v-show="trust">
                            <a :href="GLOBAL.win_url+this.see2" target="_blank" rel="noopener noreferrer">预览</a>
                            <a :href="GLOBAL.win_url+'/api/order/fileDownload?name='+this.load2+'&type=3'">下载</a>
                        </div>
                        <div v-show="!trust">商标代理委托书文件未上传</div>
                    </div>
                 </div>
                 <p>4.商标代理委托书（盖公章）</p>
              </div>
          </div>
        <div @click="back" class="threeAnswerPost-box-wrap-back">返回</div>
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
  name: 'threeAnswerPost',
  data(){
    return{
        // 委托书
        see2:'',
        load2:'',
        // 正文
        brand_see:'',
        brand_load:'',
        // 判断文件是否存在显示隐藏
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
                this.see2 = res.data.data.brand_bailment;
                this.load2 = res.data.data.brand_bailments;
                this.brand_see = res.data.data.brand_certificate;
                this.brand_load = res.data.data.brand_certificates;
                // console.log(res)
              }else{
                  this.brandshow = false;
                  this.trust = false;
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
  .threeAnswerPost-box>img{
    width: 100%;
    height: 188px;
  }
  .threeAnswerPost-box-wrap{
    width: 1218px;
    margin: 0 auto 148px;
  }
  .threeAnswerPost-box-wrap-top{
    border-bottom: 1px solid #d8d8d8;
    height: 132px;
  }
  .threeAnswerPost-box-wrap-top>p:nth-of-type(1){
    font-family: "PingFangSC-Semibold";
    font-size: 36px;
    font-weight: 600;
    color: #333333;
    float: left;
    margin-top: 52px;
  }
  .threeAnswerPost-box-wrap-top>p:nth-of-type(2){
    font-family: "PingFangSC-Regular";
    font-size: 22px;
    color: #f96006;
    float: right;
    margin-top: 67px;
    margin-right: 50px;
  }
  .threeAnswerPost-box-wrap-link{
      height: 60px;
      margin: 33px 0 110px 17px;
  }
  .threeAnswerPost-box-wrap-link>div{
      float: left;
  }
  .threeAnswerPost-box-wrap-link>div:nth-of-type(1){
      width: 56px;
      height: 41px;
      background: url("/static/images/email.png") no-repeat;
      background-size: cover;
      margin: 10px 22px 0 0;
  }
  .threeAnswerPost-box-wrap-link>div:nth-of-type(2)>p{
      font-family: "PingFangSC-Regular";
      font-size: 22px;
      color: #535353;
  }
  .threeAnswerPost-box-wrap-print{
      margin-bottom: 52px;
      margin-left: 17px;
      font-family: "PingFangSC-Medium";
      font-size: 24px;
      font-weight: 500;
      color: #333333;
  }
  .threeAnswerPost-box-wrap-img{
      margin-bottom: 106px;
      margin-left: 17px;
      height: 276px;
  }
  .threeAnswerPost-box-wrap-img>div{
      float: left;
      text-align: center;
  }
  .threeAnswerPost-box-wrap-img>div:nth-of-type(1){
      margin-right: 320px;
  }
  .threeAnswerPost-box-wrap-img>div>img{
      width: 182px;
      height: 218px;
      margin-bottom: 28px;
  }
  .threeAnswerPost-box-wrap-img>div>p{
      font-family: "PingFangSC-Regular";
      font-size: 22px;
      color: #666660;
  }
  .threeAnswerPost-box-wrap-post{
      margin-bottom: 50px;
      margin-left: 17px;
      font-family: "PingFangSC-Medium";
      font-size: 24px;
      font-weight: 500;
      color: #333333;
  }
  .threeAnswerPost-box-wrap-load{
      height: 166px;
      margin-bottom: 200px;
  }
  .threeAnswerPost-box-wrap-load>div{
      float: left;
  }
  .threeAnswerPost-box-wrap-load>div:nth-of-type(1){
      margin-right: 312px;
  }
  .threeAnswerPost-box-wrap-load>div>div{
      height: 117px;
      margin-bottom: 20px;
  }
  .threeAnswerPost-box-wrap-load>div>div>div{
      float: left;
  }
  .threeAnswerPost-box-wrap-load-img{
      width: 117px;
      height: 117px;
      background: url("/static/images/datawrite.png") no-repeat;
      background-size: cover;
  }
  .threeAnswerPost-box-wrap-load-watch{
      margin: 14px 0 0 11px;
  }
  .threeAnswerPost-box-wrap-load-watch>div:nth-of-type(1){
      font-family: "PingFangSC-Regular";
      font-size: 32px;
      margin-bottom: 16px;
      color: #333333;
  }
  .threeAnswerPost-box-wrap-load-watch>div:nth-of-type(3){
      font-family: "PingFangSC-Regular";
     font-size: 16px;
     color: #f96006;
  }
  .threeAnswerPost-box-wrap-load-watch>div:nth-of-type(2)>a{
      text-decoration: none;
      font-family: "PingFangSC-Regular";
      font-size: 24px;
      color: #f96006;
      cursor: pointer;
  }
  .threeAnswerPost-box-wrap-load-watch>div:nth-of-type(2)>a:nth-of-type(1){
      margin-right: 120px;
  }
  .threeAnswerPost-box-wrap-load>div>p,.threeAnswerPost-box-wrap-bottom>p{
      margin-left: 18px;
      font-family: "PingFangSC-Regular";
      font-size: 22px;
      color: #666660;
  }
  .threeAnswerPost-box-wrap-back{
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
