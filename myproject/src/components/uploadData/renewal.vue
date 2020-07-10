<template>
  <div id="renewal">
    <Top></Top>
    <Fix></Fix>
    <img src="/static/images/personal-img.png" alt="">
    <div class="renewal-box">
        <div class="renewal-box-title">{{click_type}}</div>
        <div class="fail" v-if="status == '盖章资料未通过'">审核不通过原因：{{remark}}</div>
        <div class="renewal-box-middle">
            <div class="renewal-box-middle-top">
                <div class="renewal-box-middle-top-img"></div>
                <div class="renewal-box-middle-top-div">
                    <div>{{click_type}}申请书</div>
                    <div v-show="applyshow">
                        <a :href="GLOBAL.win_url+this.see1" target="_blank" rel="noopener noreferrer">预览</a>
                        <a :href="GLOBAL.win_url+'/api/order/fileDownload?name='+this.load1+'&type=3'">下载</a>
                    </div>
                    <div v-show="!applyshow">{{click_type}}申请书文件未上传</div>
                </div>
            </div>
            <div class="renewal-box-middle-bottom">
                <div>盖公章拍照上传</div>
                <div>
                    <el-upload
                    accept="image/*"
                    :http-request="uploadData1"
                    :show-file-list="false"
                    action="">
                    <img class="dataimg" :src="dataimg1?dataimg1:'/static/images/uploadData.png'" alt="">
                    </el-upload>
              </div>
            </div>
        </div>
        <div class="renewal-box-bottom">
            <div class="renewal-box-middle-top">
                <div class="renewal-box-middle-top-img"></div>
                <div class="renewal-box-middle-top-div">
                    <div>商标代理委托书</div>
                    <div v-show="trust">
                        <a :href="GLOBAL.win_url+this.see2" target="_blank" rel="noopener noreferrer">预览</a>
                        <a :href="GLOBAL.win_url+'/api/order/fileDownload?name='+this.load2+'&type=3'">下载</a>
                    </div>
                    <div v-show="!trust">商标代理委托书文件未上传</div>
                </div>
            </div>
            <div class="renewal-box-middle-bottom">
                <div>盖公章拍照上传</div>
                <div>
                    <el-upload
                    accept="image/*"
                    :http-request="uploadData2"
                    :show-file-list="false"
                    action="">
                    <img class="dataimg" :src="dataimg2?dataimg2:'/static/images/uploadData.png'" alt="">
                    </el-upload>
              </div>
            </div>
        </div>
        <div class="renewal-box-handle">
            <div @click="give">提交</div>
            <div @click="back">取消</div>
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
  name: 'renewal',
  components: {
      Top,
      Foot,
      Fix
    },
    data(){
        return{
            // 加域名在页面显示的图片
            dataimg1:'',
            dataimg2:'',
            // 不加域名
            ser_img1:'',
            ser_img2:'',
            // 申请书
            see1:'',
            load1:'',
            // 委托书
            see2:'',
            load2:'',
            // 判断文件是否存在显示隐藏
            applyshow:Boolean,
            trust:Boolean,
            // 盖章资料提交失败的原因
            status:'',
            remark:'',
            click_type:this.$route.query.click_type
        }
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
        uploadData1(img){
            let formData=new FormData();
            formData.append('url_img',img.file);
            this.$http.post(this.GLOBAL.base_url+'/api/BrandUpload/brandUploadFile',formData).then(res=>{
              if(res.data.code == "1"){
                this.ser_img1 = res.data.filepath;
                this.dataimg1 = this.GLOBAL.base_url+ res.data.filepath;
              }
            });
        },
        uploadData2(img){
            let formData=new FormData();
            formData.append('url_img',img.file);
            this.$http.post(this.GLOBAL.base_url+'/api/BrandUpload/brandUploadFile',formData).then(res=>{
              if(res.data.code == "1"){
                this.ser_img2 = res.data.filepath;
                this.dataimg2 = this.GLOBAL.base_url+ res.data.filepath;
              }
            });
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
                this.remark = res.data.data.remark;
                if(res.data.data.brand_register_img != ''){
                    this.ser_img1 = res.data.data.brand_register_img;
                    this.dataimg1 = this.GLOBAL.base_url+res.data.data.brand_register_img;
                }
                if(res.data.data.brand_bailment_img != ''){
                    this.ser_img2 = res.data.data.brand_bailment_img;
                    this.dataimg2 = this.GLOBAL.base_url+res.data.data.brand_bailment_img;
                }
              }else{
                  this.applyshow = false;
                  this.trust = false;
              }
              
            });
        },
        give(){
            if(this.ser_img1 == ''||this.ser_img2 == ''){
                this.tip('error',"请上传申请书或代理委托书盖章图片");
            }else{
                this.$http.post(this.GLOBAL.base_url+'/api/order/uploadFileSeal',{
                click_type:this.click_type,
                order_id:this.$route.query.order_id,
                brand_register_img:this.ser_img1,
                brand_bailment_img:this.ser_img2
            }).then(res=>{
              if(res.data.code == "1"){
                this.tip('success',res.data.msg);
                setTimeout(()=>{
                     this.$router.push('/personal/order?status=all')
                 },500)
              }else{
                  this.tip('error',res.data.msg);
              }
            });
            }
        },
        back(){
            this.$router.push('/personal/order?status=all')
        }

    },
    mounted(){
        this.status = this.$route.query.status;
        this.getData();
    }
}
</script>

<style scoped>
 .renewal-box{
    width: 1150px;
    margin: 0 auto 200px;
 }
 .renewal-box-title{
     height: 50px;
     border-bottom: 1px solid #d8d8d8;
     font-family: "PingFangSC-Regular";
     font-size: 36px;
     font-weight: 600;
     color: #333333;
     padding: 52px 0 30px 5px;
 }
 .renewal-box-middle{
     height: 415px;
     border-bottom: 1px solid #d8d8d8;
     padding: 48px 0 72px;
 }
 .renewal-box-middle-top{
     height: 117px;
     margin-bottom: 52px;
 }
 .renewal-box-middle-top>div{
     float: left;
 }
 .renewal-box-middle-top-img{
     width: 117px;
     height: 117px;
     background: url("/static/images/datawrite.png") no-repeat;
     background-size: cover;
 }
 .renewal-box-middle-top-div{
     margin: 16px 0 0 11px;
 }
 .renewal-box-middle-top-div>div:nth-of-type(1){
     font-family: "PingFangSC-Regular";
     font-size: 32px;
     color: #333333;
     margin-bottom: 16px;
 }
 .renewal-box-middle-top-div>div:nth-of-type(3){
     font-family: "PingFangSC-Regular";
     font-size: 16px;
     color: #f96006;
 }
 .renewal-box-middle-top-div>div:nth-of-type(2)>a{
     text-decoration: none;
     font-family: "PingFangSC-Regular";
     font-size: 24px;
     color: #f96006;
     cursor: pointer;
 }
 .renewal-box-middle-top-div>div:nth-of-type(2)>a:nth-of-type(1){
     margin-right: 119px;
 }
 .renewal-box-middle-bottom{
     margin-left: 16px;
 }
 .renewal-box-middle-bottom>div:nth-of-type(1){
     font-family: "PingFangSC-Regular";
     font-size: 20px;
     color: #333333;
     margin-bottom: 20px;
 }
 .dataimg{
     width: 198px;
     height: 199px;
 }
 .renewal-box-bottom{
     height: 415px;
     padding-top: 48px;
 }
 .renewal-box-handle{
     margin-top: 130px;
     margin-left: 630px;
     height: 41px;
 }
 .renewal-box-handle>div{
     float: left;
     cursor: pointer;
     width: 214px;
     height: 41px;
     border-radius: 4px;
     border-style: solid;
     border-width: 1px;
     text-align: center;
     line-height: 41px;
     font-family: "PingFangSC-Regular";
     font-size: 18px;
 }
 .renewal-box-handle>div:nth-of-type(1){
     border-image-source: linear-gradient(to top, #ba6100, #dc773b);
     border-image-slice: 1;
     background-image: linear-gradient(to bottom, #f79000, #f96006), linear-gradient(to top, #ba6100, #dc773b);
     background-origin: border-box;
     background-clip: content-box, border-box;
     color: #ffffff;
 }
 .renewal-box-handle>div:nth-of-type(2){
      border-image-source: linear-gradient(to top, #d6d6d6, #d6d6d6);
      border-image-slice: 1;
      background-image: linear-gradient(to bottom, #ffffff, #e3e3e3), linear-gradient(to top, #d6d6d6, #d6d6d6);
      background-origin: border-box;
      background-clip: content-box, border-box;
      color: #f87604;
      margin-left: 87px;
 }
 .fail{
     margin-top: 20px;
     font-size: 20px;
     color: red;
}
</style>
