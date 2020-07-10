<template>
  <div id="transfer">
    <Top></Top>
    <Fix></Fix>
    <img src="/static/images/personal-img.png" alt="">
    <div class="transfer-box">
        <div class="transfer-box-title">商标转让</div>
        <div class="fail" v-if="status == '盖章资料未通过'">审核不通过原因：{{remark}}</div>
        <div class="transfer-box-middle">
            <div class="transfer-box-middle-top">
                <div class="transfer-box-middle-top-img"></div>
                <div class="transfer-box-middle-top-div">
                    <div>商标转让申请书</div>
                    <div v-show="applyshow">
                        <a :href="GLOBAL.win_url+this.see1" target="_blank" rel="noopener noreferrer">预览</a>
                        <a :href="GLOBAL.win_url+'/api/order/fileDownload?name='+this.load1+'&type=3'">下载</a>
                    </div>
                    <div v-show="!applyshow">商标转让申请书文件未上传</div>
                </div>
            </div>
            <div class="transfer-box-middle-bottom">
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
        <div class="transfer-box-middle">
            <div class="transfer-box-middle-top">
                <div class="transfer-box-middle-top-img"></div>
                <div class="transfer-box-middle-top-div">
                    <div>商标转让委托书</div>
                    <div v-show="trust">
                        <a :href="GLOBAL.win_url+this.see2" target="_blank" rel="noopener noreferrer">预览</a>
                        <a :href="GLOBAL.win_url+'/api/order/fileDownload?name='+this.load2+'&type=3'">下载</a>
                    </div>
                    <div v-show="!trust">商标转让委托书文件未上传</div>
                </div>
            </div>
            <div class="transfer-box-middle-bottom">
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
        <div class="transfer-box-middle">
            <div class="transfer-box-middle-top">
                <div class="transfer-box-middle-top-img"></div>
                <div class="transfer-box-middle-top-div">
                    <div>商标受让委托书</div>
                    <div v-show="tranfer">
                        <a :href="GLOBAL.win_url+this.see3" target="_blank" rel="noopener noreferrer">预览</a>
                        <a :href="GLOBAL.win_url+'/api/order/fileDownload?name='+this.load3+'&type=3'">下载</a>
                    </div>
                    <div v-show="!tranfer">商标受让委托书文件未上传</div>
                </div>
            </div>
            <div class="transfer-box-middle-bottom">
                <div>盖公章拍照上传</div>
                <div>
                    <el-upload
                    accept="image/*"
                    :http-request="uploadData3"
                    :show-file-list="false"
                    action="">
                    <img class="dataimg" :src="dataimg3?dataimg3:'/static/images/uploadData.png'" alt="">
                    </el-upload>
              </div>
            </div>
        </div>
        <div class="transfer-box-bottom">
            <div class="transfer-box-middle-top">
                <div class="transfer-box-middle-top-img"></div>
                <div class="transfer-box-middle-top-div">
                    <div>转让证明</div>
                    <div v-show="prove">
                        <a :href="GLOBAL.win_url+this.see4" target="_blank" rel="noopener noreferrer">预览</a>
                        <a :href="GLOBAL.win_url+'/api/order/fileDownload?name='+this.load4+'&type=3'">下载</a>
                    </div>
                    <div v-show="!prove">商标转让证明文件未上传</div>
                </div>
            </div>
            <div class="transfer-box-middle-bottom">
                <div>盖公章拍照上传</div>
                <div>
                    <el-upload
                    accept="image/*"
                    :http-request="uploadData4"
                    :show-file-list="false"
                    action="">
                    <img class="dataimg" :src="dataimg4?dataimg4:'/static/images/uploadData.png'" alt="">
                    </el-upload>
              </div>
            </div>
        </div>
        <div class="transfer-box-handle">
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
  name: 'transfer',
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
            dataimg3:'',
            dataimg4:'',
            // 不加域名
            ser_img1:'',
            ser_img2:'',
            ser_img3:'',
            ser_img4:'',
            // 申请书
            see1:'',
            load1:'',
            // 委托书
            see2:'',
            load2:'',
            // 商标受让委托书
            see3:'',
            load3:'',
            // 转让证明
            see4:'',
            load4:'',
            // 判断文件是否存在显示隐藏
            applyshow:Boolean,
            trust:Boolean,
            tranfer:Boolean,
            prove:Boolean,
            // 盖章资料提交失败的原因
            status:'',
            remark:''
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
        uploadData3(img){
            let formData=new FormData();
            formData.append('url_img',img.file);
            this.$http.post(this.GLOBAL.base_url+'/api/BrandUpload/brandUploadFile',formData).then(res=>{
              if(res.data.code == "1"){
                this.ser_img3 = res.data.filepath;
                this.dataimg3 = this.GLOBAL.base_url+res.data.filepath;
              }
            });
        },
        uploadData4(img){
            let formData=new FormData();
            formData.append('url_img',img.file);
            this.$http.post(this.GLOBAL.base_url+'/api/BrandUpload/brandUploadFile',formData).then(res=>{
              if(res.data.code == "1"){
                this.ser_img4 = res.data.filepath;
                this.dataimg4 = this.GLOBAL.base_url+ res.data.filepath;
              }
            });
        },
        getData(){
            this.$http.post(this.GLOBAL.base_url+'/api/order/applyUploadFile',{
                order_id:this.$route.query.order_id
            }).then(res=>{
                // console.log(res)
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
                  if(res.data.data.portion_acceptance == ""){
                      this.tranfer = false;
                  }else{
                      this.tranfer = true;
                  }
                  if(res.data.data.first_notice == ""){
                      this.prove = false;
                  }else{
                      this.prove = true;
                  }
                this.see1 = res.data.data.apply_url;
                this.load1 = res.data.data.apply_urls;
                this.see2 = res.data.data.brand_bailment;
                this.load2 = res.data.data.brand_bailments;
                this.see3 = res.data.data.portion_acceptance;
                this.load3 = res.data.data.portion_acceptances;
                this.see4 = res.data.data.first_notice;
                this.load4 = res.data.data.first_notices;
                this.remark = res.data.data.remark;
                if(res.data.data.brand_register_img != ''){
                    this.ser_img1 = res.data.data.brand_register_img;
                    this.dataimg1 = this.GLOBAL.base_url+res.data.data.brand_register_img;
                }
                if(res.data.data.brand_bailment_img != ''){
                    this.ser_img2 = res.data.data.brand_bailment_img;
                    this.dataimg2 = this.GLOBAL.base_url+res.data.data.brand_bailment_img;
                }
                if(res.data.data.brand_certificate != ''){
                    this.ser_img3 = res.data.data.brand_certificate;
                    this.dataimg3 = this.GLOBAL.base_url+res.data.data.brand_certificate;
                }
                if(res.data.data.makeover_prove != ''){
                    this.ser_img4 = res.data.data.makeover_prove;
                    this.dataimg4 = this.GLOBAL.base_url+res.data.data.makeover_prove;
                }
                
                // console.log(res)
              }else{
                  this.applyshow = false;
                  this.trust = false;
                  this.tranfer = false;
                  this.prove = false;
              }
              
            });
        },
        give(){
            if(this.ser_img1 == ''||this.ser_img2 == ''||this.ser_img3 == ''||this.ser_img4 == ''){
                this.tip('error',"请上传商标转让申请书、转让委托书、受让申请书和转让证明盖章图片");
            }else{
                this.$http.post(this.GLOBAL.base_url+'/api/order/uploadFileSeal',{
                click_type:'商标转让',
                order_id:this.$route.query.order_id,
                brand_register_img:this.ser_img1,
                brand_bailment_img:this.ser_img2,
                brand_certificate:this.ser_img3,
                makeover_prove:this.ser_img4
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
 .transfer-box{
    width: 1150px;
    margin: 0 auto 200px;
 }
 .transfer-box-title{
     height: 50px;
     border-bottom: 1px solid #d8d8d8;
     font-family: "PingFangSC-Regular";
     font-size: 36px;
     font-weight: 600;
     color: #333333;
     padding: 52px 0 30px 5px;
 }
 .transfer-box-middle{
     height: 415px;
     border-bottom: 1px solid #d8d8d8;
     padding: 48px 0 72px;
 }
 .transfer-box-middle-top{
     height: 117px;
     margin-bottom: 52px;
 }
 .transfer-box-middle-top>div{
     float: left;
 }
 .transfer-box-middle-top-img{
     width: 117px;
     height: 117px;
     background: url("/static/images/datawrite.png") no-repeat;
     background-size: cover;
 }
 .transfer-box-middle-top-div{
     margin: 16px 0 0 11px;
 }
 .transfer-box-middle-top-div>div:nth-of-type(1){
     font-family: "PingFangSC-Regular";
     font-size: 32px;
     color: #333333;
     margin-bottom: 16px;
 }
 .transfer-box-middle-top-div>div:nth-of-type(3){
     font-family: "PingFangSC-Regular";
     font-size: 16px;
     color: #f96006;
 }
 .transfer-box-middle-top-div>div:nth-of-type(2)>a{
     text-decoration: none;
     font-family: "PingFangSC-Regular";
     font-size: 24px;
     color: #f96006;
     cursor: pointer;
 }
 .transfer-box-middle-top-div>div:nth-of-type(2)>a:nth-of-type(1){
     margin-right: 119px;
 }
 .transfer-box-middle-bottom{
     margin-left: 16px;
 }
 .transfer-box-middle-bottom>div:nth-of-type(1){
     font-family: "PingFangSC-Regular";
     font-size: 20px;
     color: #333333;
     margin-bottom: 20px;
 }
 .dataimg{
     width: 198px;
     height: 199px;
 }
 .transfer-box-bottom{
     height: 415px;
     padding-top: 48px;
 }
 .transfer-box-handle{
     margin-top: 130px;
     margin-left: 630px;
     height: 41px;
 }
 .transfer-box-handle>div{
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
 .transfer-box-handle>div:nth-of-type(1){
     border-image-source: linear-gradient(to top, #ba6100, #dc773b);
     border-image-slice: 1;
     background-image: linear-gradient(to bottom, #f79000, #f96006), linear-gradient(to top, #ba6100, #dc773b);
     background-origin: border-box;
     background-clip: content-box, border-box;
     color: #ffffff;
 }
 .transfer-box-handle>div:nth-of-type(2){
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
