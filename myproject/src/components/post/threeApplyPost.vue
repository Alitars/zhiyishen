<template>
  <div id="threeApplyPost">
    <Top></Top>
    <Fix></Fix>
    <div class="threeApplyPost-box">
      <img src="/static/images/personal-img.png" alt="">
      <div class="threeApplyPost-box-wrap">
          <div class="threeApplyPost-box-wrap-top">
              <p>商标撤三申请</p>
              <p>*以下文件需邮寄到我们公司</p>
          </div>
          <div class="threeApplyPost-box-wrap-link">
              <div></div>
              <div>
                  <p>联系电话：400-630-2718</p>
                  <p>邮寄地址：上海市松江区松江新城文诚路果老（上海）互联网技术有限公司</p>
              </div>
          </div>
          <div class="threeApplyPost-box-wrap-print">用户自行打印</div>
          <div class="threeApplyPost-box-wrap-img">
              <div>
                  <img src="/static/images/licene.png" alt="">
                  <p>1.企业营业执照副本复印件（盖公章）</p>
              </div>
              <div>
                  <img src="/static/images/card.png" alt="">
                  <p>2. 身份证复印件(签名)</p>
              </div>
          </div>
          <div class="threeApplyPost-box-wrap-post">尚未拥有（需下载后打印邮寄）</div>
          <div class="threeApplyPost-box-wrap-load">
              <div>
                  <div>
                    <div class="threeApplyPost-box-wrap-load-img"></div>
                    <div class="threeApplyPost-box-wrap-load-watch">
                        <div>商标撤三申请书</div>
                        <div v-show="applyshow">
                            <a :href="GLOBAL.win_url+this.see1" target="_blank" rel="noopener noreferrer">预览</a>
                            <a :href="GLOBAL.win_url+'/api/order/fileDownload?name='+this.load1+'&type=3'">下载</a>
                        </div>
                        <div v-show="!applyshow">商标撤三申请书文件未上传</div>
                    </div>
                 </div>
                 <p>3.商标撤三申请书（盖公章）</p>
              </div>
              <div>
                  <div>
                    <div class="threeApplyPost-box-wrap-load-img"></div>
                    <div class="threeApplyPost-box-wrap-load-watch">
                        <div>商标代理委托书</div>
                        <div v-show="trust">
                            <a :href="GLOBAL.win_url+this.see2" target="_blank" rel="noopener noreferrer">预览</a>
                            <a :href="GLOBAL.win_url+'/api/order/fileDownload?name='+this.load2+'&type=3'">下载</a>
                        </div>
                        <div v-show="!trust">商标变更代理委托书文件未上传</div>
                    </div>
                 </div>
                 <p>4.商标代理委托书（盖公章）</p>
              </div>
          </div>
        <div @click="back" class="threeApplyPost-box-wrap-back">返回</div>
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
  name: 'threeApplyPost',
  data(){
    return{
        // 申请书
            see1:'',
            load1:'',
            // 委托书
            see2:'',
            load2:'',
            // 判断文件是否存在显示隐藏
            applyshow:Boolean,
            trust:Boolean,
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
      tip(type,msg){
                  return this.$message({
                      type:type,
                      message:msg,
                      showClose:true,
                      duration:1500
                  })
              },
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
                this.see1 = res.data.data.apply_url;
                this.load1 = res.data.data.apply_urls;
                this.see2 = res.data.data.brand_bailment;
                this.load2 = res.data.data.brand_bailments;
                // console.log(res)
              }else{
                  this.applyshow = false;
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
  .threeApplyPost-box>img{
    width: 100%;
    height: 188px;
  }
  .threeApplyPost-box-wrap{
    width: 1218px;
    margin: 0 auto 148px;
  }
  .threeApplyPost-box-wrap-top{
    border-bottom: 1px solid #d8d8d8;
    height: 132px;
  }
  .threeApplyPost-box-wrap-top>p:nth-of-type(1){
    font-family: "PingFangSC-Semibold";
    font-size: 36px;
    font-weight: 600;
    color: #333333;
    float: left;
    margin-top: 52px;
  }
  .threeApplyPost-box-wrap-top>p:nth-of-type(2){
    font-family: "PingFangSC-Regular";
    font-size: 22px;
    color: #f96006;
    float: right;
    margin-top: 67px;
    margin-right: 50px;
  }
  .threeApplyPost-box-wrap-link{
      height: 60px;
      margin: 33px 0 110px 17px;
  }
  .threeApplyPost-box-wrap-link>div{
      float: left;
  }
  .threeApplyPost-box-wrap-link>div:nth-of-type(1){
      width: 56px;
      height: 41px;
      background: url("/static/images/email.png") no-repeat;
      background-size: cover;
      margin: 10px 22px 0 0;
  }
  .threeApplyPost-box-wrap-link>div:nth-of-type(2)>p{
      font-family: "PingFangSC-Regular";
      font-size: 22px;
      color: #535353;
  }
  .threeApplyPost-box-wrap-print{
      margin-bottom: 52px;
      margin-left: 17px;
      font-family: "PingFangSC-Medium";
      font-size: 24px;
      font-weight: 500;
      color: #333333;
  }
  .threeApplyPost-box-wrap-img{
      margin-bottom: 106px;
      margin-left: 17px;
      height: 276px;
  }
  .threeApplyPost-box-wrap-img>div{
      float: left;
      text-align: center;
  }
  .threeApplyPost-box-wrap-img>div:nth-of-type(1){
      margin-right: 320px;
  }
  .threeApplyPost-box-wrap-img>div>img{
      width: 182px;
      height: 218px;
      margin-bottom: 28px;
  }
  .threeApplyPost-box-wrap-img>div>p{
      font-family: "PingFangSC-Regular";
      font-size: 22px;
      color: #666660;
  }
  .threeApplyPost-box-wrap-post{
      margin-bottom: 50px;
      margin-left: 17px;
      font-family: "PingFangSC-Medium";
      font-size: 24px;
      font-weight: 500;
      color: #333333;
  }
  .threeApplyPost-box-wrap-load{
      height: 166px;
      margin-bottom: 200px;
  }
  .threeApplyPost-box-wrap-load>div{
      float: left;
  }
  .threeApplyPost-box-wrap-load>div:nth-of-type(1){
      margin-right: 312px;
  }
  .threeApplyPost-box-wrap-load>div>div{
      height: 117px;
      margin-bottom: 20px;
  }
  .threeApplyPost-box-wrap-load>div>div>div{
      float: left;
  }
  .threeApplyPost-box-wrap-load-img{
      width: 117px;
      height: 117px;
      background: url("/static/images/datawrite.png") no-repeat;
      background-size: cover;
  }
  .threeApplyPost-box-wrap-load-watch{
      margin: 14px 0 0 11px;
  }
  .threeApplyPost-box-wrap-load-watch>div:nth-of-type(1){
      font-family: "PingFangSC-Regular";
      font-size: 32px;
      margin-bottom: 16px;
      color: #333333;
  }
  .threeApplyPost-box-wrap-load-watch>div:nth-of-type(3){
      font-family: "PingFangSC-Regular";
     font-size: 16px;
     color: #f96006;
  }
  .threeApplyPost-box-wrap-load-watch>div:nth-of-type(2)>a{
      text-decoration: none;
      font-family: "PingFangSC-Regular";
      font-size: 24px;
      color: #f96006;
      cursor: pointer;
  }
  .threeApplyPost-box-wrap-load-watch>div:nth-of-type(2)>a:nth-of-type(1){
      margin-right: 120px;
  }
  .threeApplyPost-box-wrap-load>div>p,.threeApplyPost-box-wrap-bottom>p{
      margin-left: 18px;
      font-family: "PingFangSC-Regular";
      font-size: 22px;
      color: #666660;
  }
  .threeApplyPost-box-wrap-back{
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
