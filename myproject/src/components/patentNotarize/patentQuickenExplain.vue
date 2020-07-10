<template>
  <div class="patentQuickenExplain">
    <Top></Top>
    <Fix></Fix>
    <div class="patentQuickenExplain-box">
      <!-- top -->
      <div class="patentQuickenExplain-box-top">
        发明专利加速申请--专利说明书已撰写
      </div>
      <!-- 说明书 -->
      <div class="patentQuickenExplain-box-one">
        <div class="one-left">
          <img src="/static/images/datawrite.png" alt="">
        </div>
        <div class="one-right">
          <p>专利说明书</p>
         <div v-show="brandshow" >
            <span><a :href="GLOBAL.base_url+this.see1" target="_blank" rel="noopener noreferrer">预览</a></span>
            <span><a :href="GLOBAL.base_url+'/api/patent/downloadFile'+this.see1">下载</a></span>
          </div>
          <div v-show="!brandshow" class="color">专利说明书文件未上传</div>
        </div>
      </div>
        <!--  选择  -->
      <div class="patentQuickenExplain-box-select">
        <p>是否同意</p>
        <input type="radio" value="1" v-model="find" name="invoice">
        <span v-bind:class="{ bgcol : switch2 }" >是</span>
        <input type="radio" value="2" v-model="find" name="invoice">
        <span v-bind:class="{ bgcol : switch1 }" >否</span>
      </div>
      <!-- 委托书 -->
      <div class="patentQuickenExplain-box-one" v-show="!switch2">
        <div class="one-left">
          <img src="/static/images/datawrite.png" alt="">
        </div>
        <div class="one-right">
          <p>专利委托书</p>
          <div v-show="trust" >
            <!-- <span><a :href="GLOBAL.win_url+this.load1" target="_blank" rel="noopener noreferrer">预览</a></span> -->
            <span><a :href="'http://wp.iguolao.com'+this.load1">下载</a></span>
          </div>
           <div v-show="!trust" class="color">专利委托书文件未上传</div>
        </div>
      </div>
       <div class="patentQuickenExplain-box-upload" v-show="!switch2">
        <div class="patentQuickenExplain-box-upload-left">
          <p>盖公章拍照上传</p>
          <el-upload
            accept="image/*"
            :http-request="uploadData1"
            :show-file-list="false"
            action="">
            <img class="dataimg" :src="dataimg1?dataimg1:'/static/images/uploadData.png'" alt="">
          </el-upload>
          <div class="form-msg">{{dataimg1Ip}}</div>
        </div>
        <div class="patentQuickenExplain-box-upload-right">
          <p>* 1.下载的委托书会自动填充信息；</p>
          <p>2.下载打印盖公章后拍照上传即可</p>
        </div>
      </div>
      <div style=" clear: both;"></div>
      <!-- 意见 -->
      <div class="patentQuickenExplain-box-idea" v-show="switch2">
        <p>修改意见：</p>
        <textarea name="" id=""  v-model="text" placeholder="非必填"></textarea>
      </div>
      <!-- 提交&&取消 -->
      <div class="patentQuickenExplain-box-submit">
        <span @click="sub">提交</span>
        <span @click='back'>取消</span>
      </div>
      <div style="clear :both;"></div>
    </div>
    <Foot></Foot>
  </div>
</template>

<script>
  import Top from '../ui/top.vue';
  import Foot from '../ui/foot.vue';
  import Fix from '../ui/fix.vue';
  export default {
  name:'patentQuickenExplain',
  components:{
    Top,
    Foot,
    Fix
  },
  data() {
    return {
      find:'1',
      switch1:true,
      switch2:false,
      // 文本域内容
      text:'',
      // 盖公章拍照上传 展示页面图片
      dataimg1:'',
      dataimg1Ip:'',
      // 预览 下载
      see1:'',
      load1:'',
      // 不存在时显示
      trust:true,
      brandshow:true
    }
  },
  watch: {
    'find'(newValue) {
      if (newValue == '1') {
        this.switch2 = false
        this.switch1 = true
      }
      if (newValue == '2') {
        this.switch1 = false
        this.switch2 = true
      }
    },
    "dataimg1"(newValue) {
      if (newValue == '') {
        return this.dataimg1Ip = '请上传'
      }
      this.dataimg1Ip = ''
    }
  },
  methods:{
    // 弹框
    tip(type,msg){
      return this.$message({
          type:type,
          message:msg,
          showClose:true,
          duration:1500
      })
    },
    // 盖公章拍照上传
    uploadData1(img){
        let formData=new FormData();
        formData.append('url_img',img.file);
        this.$http.post(this.GLOBAL.base_url+'/api/BrandUpload/brandUploadFile',formData).then(res=>{
          // console.log(res)
          if(res.data.code == "1"){
            // this.name =  res.data.filepath
            this.ser_img1 = res.data.filepath;
            this.dataimg1 = this.GLOBAL.base_url+ res.data.filepath;
          }
        });
    },
    // 获取数据
    getData(){
      this.$http.post(this.GLOBAL.base_url+'/api/patent/getSynopsis',{
        user_id:this.$cookie.getCookie('u_id'),
        id:this.$route.query.id
      }).then( res => {
        // console.log(res)
        if (res.data.code == '1') {
          if(res.data.data.invent_patent_book == ""){
              this.trust = false;
            }else{
              this.trust = true;
            }
            if(res.data.data.patent_write == ""){
                      this.brandshow = false;
            }else{
                      this.brandshow = true;
            }
            this.see1 = res.data.data.patent_write
            this.load1 = res.data.data.invent_patent_book
        }else {
          this.trust = false;
          this.brandshow = false;
        }
      })
    },
    // 提交
    sub(){
      if (this.find == '1') {
        if (this.dataimg1 == '') {
            this.dataimg1Ip = '请上传专利委托书'
        }else{
          this.$http.post(this.GLOBAL.base_url+'/api/patent/editInfo',{
          user_id:this.$cookie.getCookie('u_id'),
          id:this.$route.query.id,
          is_agree:this.find,
          book:this.ser_img1
        }).then( res => {
            if(res.data.code == "1"){
                  this.tip('success','提交成功')
                  setTimeout(()=>{
                     this.$router.push('/personal/orderPatent?status=all')
                  },500)
                }else{
                 this.tip('error',res.data.msg)
                }
          })
        }
      }
      if (this.find == '2') {
         this.$http.post(this.GLOBAL.base_url+'/api/patent/editInfo',{
          user_id:this.$cookie.getCookie('u_id'),
          id:this.$route.query.id,
          is_agree:this.find,
          remark:this.text
        }).then( res => {
            if(res.data.code == "1"){
                  this.tip('success','提交成功')
                  setTimeout(()=>{
                     this.$router.push('/personal/orderPatent?status=all')
                  },500)
                }else{
                 this.tip('error',res.data.msg)
                }
          })
      }
    },
    // 返回
    back() {
      this.$router.back()
    }
  },
  mounted(){
    this.getData
    ()
  }
  }
</script>

<style scoped>
  .patentQuickenExplain-box {
    width: 1302px;
    background-color: #fff;
    margin: 0 auto;
    padding-top:34px;
    box-sizing: border-box;
    padding-bottom: 80px;
    box-sizing: border-box;
  }
  /* top */
  .patentQuickenExplain-box-top {
    height: 110px;
    line-height: 110px;
    font-family: "PingFangSC";
    font-size: 36px;
    font-weight: 600;
    /* border-bottom: 1px solid #d8d8d8; */
  }
  /* 说明书&&委托书 */
  .patentQuickenExplain-box-one {
    height: 230px;
    border-top: 1px solid #d8d8d8;
    /* line-height: 230px; */
  }
  .one-left {
    float: left;
    width: 85px;
    height: 94px;
    /* border: 1px solid #d8d8d8; */
    margin: 58px 26px 0 17px;
  }
  .one-left > img {
    width: 85px;
    height: 94px;
    cursor: pointer;
  }
  .one-right {
    float: left;
    font-family: "PingFangSC";
    margin-top: 64px;
  }
  .one-right > p {
    font-size: 32px;
    color: #333333;
    margin-bottom: 16px;
  }
  .one-right>div >span>a {
    font-size: 24px;
    color: #f96006;
    margin-right: 119px;
    cursor: pointer;
    text-decoration: none;
  }
  /*  */
  .patentQuickenExplain-box-upload-left {
    float: left;
    margin-left:30px;
  }
  .patentQuickenExplain-box-upload-left > p {
    margin-bottom: 20px;
    font-family: "PingFangSC";
    font-size: 20px;
    color: #333;
  }
  .dataimg {
    width: 198px;
    height: 198px;
  }
  .patentQuickenExplain-box-upload-right {
    float: left;
    margin-left: 16px;
    font-family: "PingFangSC";
    font-size: 22px;
    color: #f96006;
    padding-top: 40px;
    box-sizing: border-box;
  }
  .patentQuickenExplain-box-upload-right >p:nth-child(2) {
    margin:2px 0 0 14px;
  }
  /* 选择 */
  .patentQuickenExplain-box-select {
    margin: 0px 0 72px 30px;
  }
  .patentQuickenExplain-box-select > p {
    font-family: "PingFangSC";
    font-size: 20px;
    margin-bottom: 16px;
    color: #333333;
  }
  .patentQuickenExplain-box-select > input {
    width: 18px;
    height: 18px;
    vertical-align: middle;
    margin-right: 12px;
    cursor: pointer;
  }
  .patentQuickenExplain-box-select > span {
    font-family: "PingFangSC";
    font-size: 20px;
    vertical-align: middle;
    margin-right: 65px;

  }
  /* 意见 */
  .patentQuickenExplain-box-idea {
    border-top: 1px solid #d8d8d8;
    margin-top: 72px;
    padding-top: 36px;

  }
  .patentQuickenExplain-box-idea > p {
    box-sizing: border-box;
    font-family: "PingFangSC";
    font-size: 18px;
    color: #333333;
    margin-bottom: 16px;
  }
  .patentQuickenExplain-box-idea > textarea {
    width: 1128px;
    height: 128px;
    margin-left: 36px;
    padding: 4px 0 0 10px;
    box-sizing: border-box;
    font-family: "PingFangSC";
    font-size: 16px;
    /* color: #ccc; */
  }
  /* 提交&&取消 */
  .patentQuickenExplain-box-submit {
    float: right;
    margin:64px 104px 0 0 ;
  }
  .patentQuickenExplain-box-submit > span {
    width: 214px;
    height: 40px;
    display: inline-block;
    line-height: 40px;
    text-align: center;
    font-family: "PingFangSC";
    font-size: 18px;
    cursor: pointer;
  }
  .patentQuickenExplain-box-submit > span:nth-child(1) {
    border-image-source: linear-gradient(0deg,#ba6100,#dc773b);
    border-image-slice: 1;
    background-image: linear-gradient(180deg,#f79000,#f96006),linear-gradient(0deg,#ba6100,#dc773b);
    background-origin: border-box;
    background-clip: content-box,border-box;
    border-radius: 4px;
    color: #fff;
    margin-right: 87px;
  }
  .patentQuickenExplain-box-submit > span:nth-child(2) {
    border-image-source: linear-gradient(to top, #d6d6d6 94%, #d6d6d6 7%);
    border-image-slice: 1;
    background-image: linear-gradient(to bottom,white, #e3e3e3 98%), linear-gradient(to top, #d6d6d6 94%, #d6d6d6 7%);
    background-origin: border-box;
    border-radius: 4px;
    color: #f87604;
  }
  .bgcol{
    color: #a6a6a6;
  }
  /* 提示 */
   .form-msg {
    height: 26px;
    line-height: 26px;
    font-size: 14px;
    color: red;
  }
  .color {
    color: #f87604;
    font-size: 32px;
  }
</style>
