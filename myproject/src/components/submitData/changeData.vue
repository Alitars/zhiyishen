<template>
  <div id="changeData">
    <Top></Top>
    <Fix></Fix>
    <div class="changeData-box">
      <img src="/static/images/personal-img.png" alt="">
      <div class="changeData-box-wrap">
          <div class="changeData-box-wrap-top">商标变更</div>
           <div class="fail" v-if="status == '资料审核不通过'">审核不通过原因：{{remark}}</div>
          <div class="changeData-box-wrap-middle">
            <div class="changeData-box-wrap-middle-type">申请人类型：</div>
            <div class="changeData-box-middle-radio">
                <input class="radio1" value="1" v-model="picked" name="type" type="radio"><span>企业</span>
                <input class="radio2" value="2" v-model="picked" name="type" type="radio"><span>个人</span>
              </div>
              <div class="changeData-box-middle-box-company" v-show="divshow">
                <p>变更后企业名称：</p>
                <select class="form_select" v-model="select1" @change='getValue1'>
                    <option value="0">请选择</option>
                    <option v-for="(v,k) in arr2" v-bind:value="v.id">{{v.company_name}}</option>
                </select>
                <span @click="toconfire1">添加申请人</span>
              </div>
              <div class="changeData-box-middle-box-company" v-show="!divshow">
                <p>申请人（中文）：</p>
                <select class="form_select" v-model="select2" @change='getValue2'>
                    <option value="0">请选择</option>
                    <option v-for="(v,k) in arr1" v-bind:value="v.id">{{v.chinese_name}}</option>
                </select>
                <span @click="toconfire2">添加申请人</span>
              </div>
              <div class="changData-box-middle-regNum">
                  <div>注册号</div>
                  <input type="text" v-model="num" maxlength="10">
              </div>
              <div class="changData-box-middle-changetype">
                <span>变更类型</span>
                <input class="radio1" value="1" v-model="changetype" name="type2" type="radio"><span>企业名义变更</span>
                <input class="radio2" value="2" v-model="changetype" name="type2" type="radio"><span>企业地址变更</span>
                <input class="radio2" value="3" v-model="changetype" name="type2" type="radio"><span>企业名义地址变更</span>
              </div>
              <div class="changData-box-middle-notice" v-show="noticeshow">
                  <div>准予变更（备案）登记通知书：</div>
                  <div class="changData-box-middle-notice-upload">
                      <div>
                        <el-upload
                            accept="image/*"
                            :http-request="uploadpic1"
                            :show-file-list="false"
                            action="">
                            <img class="uploadicon" :src="icon1?icon1:'/static/images/icon.png'" alt="">
                        </el-upload>
                      </div>
                      <div>
                          <p class="p1" @click="imgshow">（示例）</p>
                          <p>（名义变更需上传）</p>
                      </div>
                  </div>
              </div>
              <!-- <div class="changData-box-middle-license">
                  <div>变更后营业执照：</div>
                  <div>
                    <el-upload
                        accept="image/*"
                        :http-request="uploadpic2"
                        :show-file-list="false"
                        action="">
                        <img class="uploadicon" :src="icon2?icon2:'/static/images/icon.png'" alt="">
                    </el-upload>
                </div>
              </div> -->
              <!-- <div class="changData-box-middle-translate">
                  <div>变更后营业执照中文翻译件：</div>
                  <div class="changData-box-middle-translate-upload">
                    <div>
                        <el-upload
                            accept="image/*"
                            :http-request="uploadpic3"
                            :show-file-list="false"
                            action="">
                            <img class="uploadicon" :src="icon3?icon3:'/static/images/icon.png'" alt="">
                        </el-upload>
                    </div>
                    <div>（国外申请人需上传）</div>
                  </div>
              </div> -->
              <div class="changeData-box-middle-two">
                <div @click="back">取消</div>
                <div @click="send">提交</div>
              </div>
          </div>
      </div>
      <div class="tan" v-show="tanshow">
        <img src="/static/images/example.png" alt="" class="example">
        <img  src="/static/images/cha.png" alt="" class="cha" @click="cha">
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
  name: 'changeData',
  data(){
    return{
      picked:'1',
      divshow:true,
      // 个人认证
      arr1:[],
      // 企业认证
      arr2:[],
      select1:"0",
      select2:"0",
      apply_id:'',
      apply_id1:'',
      apply_id2:'',
      num:'',
      id:'',
      icon1:'',
      ser_icon1:'',
      icon2:'',
      ser_icon2:'',
      icon3:'',
      ser_icon3:'',
      // 资料提交失败的原因
      status:'',
      remark:'',
      tanshow:false,
      changetype:'1',
      noticeshow:true
    }
  },
  watch:{
      "picked"(newValue){
          if(newValue =='1'){
              this.divshow=true;
          }else if(newValue=='2'){
            this.divshow=false;
          }
      },
      "changetype"(newValue){
          if(newValue =='1'){
              this.noticeshow=true;
          }else if(newValue=='2'){
             this.ser_icon1 = "";
            this.icon1 = "";
            this.noticeshow=false;
          }else{
            this.noticeshow=true;
          }
      },
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
    uploadpic1(img){
        let formData=new FormData();
        formData.append('url_img',img.file);
        this.$http.post(this.GLOBAL.base_url+'/api/BrandUpload/brandUploadFile',formData).then(res=>{
          if(res.data.code == "1"){
            this.ser_icon1 = res.data.filepath;
            this.icon1 = this.GLOBAL.base_url+ res.data.filepath;
          }
        });
    },
    uploadpic2(img){
        let formData=new FormData();
        formData.append('url_img',img.file);
        this.$http.post(this.GLOBAL.base_url+'/api/BrandUpload/brandUploadFile',formData).then(res=>{
          if(res.data.code == "1"){
            this.ser_icon2 = res.data.filepath;
            this.icon2 = this.GLOBAL.base_url+ res.data.filepath;
          }
        });
    },
    uploadpic3(img){
        let formData=new FormData();
        formData.append('url_img',img.file);
        this.$http.post(this.GLOBAL.base_url+'/api/BrandUpload/brandUploadFile',formData).then(res=>{
          if(res.data.code == "1"){
            this.ser_icon3 = res.data.filepath;
            this.icon3 = this.GLOBAL.base_url+ res.data.filepath;
          }
        });
    },
    imgshow(){
      this.tanshow = true;
    },
    cha(){
      this.tanshow = false;
    },
    getData1(){
      this.$http.post(this.GLOBAL.base_url+'/api/BrandUpload/applyList',{
                user_id:this.$cookie.getCookie('u_id')
            }).then(res=>{
              if(res.data.code == "1"){
                this.arr1 = res.data.Authentication;
                this.arr2 = res.data.business;
              }
            });
    },
    getData2(){
      this.$http.post(this.GLOBAL.base_url+'/api/BrandUpload/uploadDetail',{
                order_id:this.$route.query.order_id,
                good_name:this.$route.query.good_name
            }).then(res=>{
              // console.log(res)
              if(res.data.code == "1"){
                if(res.data.brand_update.auth_type == "1"){
                  this.picked = res.data.brand_update.auth_type;
                  this.select1 = res.data.brand_update.apply_id;
                  this.apply_id1 = res.data.brand_update.apply_id;
                }
                if(res.data.brand_update.auth_type == "2"){
                  this.picked = res.data.brand_update.auth_type;
                  this.select2 = res.data.brand_update.apply_id;
                  this.apply_id2 = res.data.brand_update.apply_id;
                }
                this.changetype = res.data.brand_update.change_type;
                this.num =  res.data.brand_update.brand_num;
                this.icon1 = this.GLOBAL.base_url+res.data.brand_update.upload_file;
                this.ser_icon1 = res.data.brand_update.upload_file;
                this.icon2 = this.GLOBAL.base_url+res.data.brand_update.change_img;
                this.ser_icon2 = res.data.brand_update.change_img;
                if(this.icon3 != null){
                  this.icon3 = this.GLOBAL.base_url+res.data.brand_update.translated_img;
                  this.ser_icon3 = res.data.brand_update.translated_img;
                }
                this.id = res.data.brand_update.id;
                this.remark = res.data.order.remark;
              }
            });
    },
    getValue1(){
        this.apply_id1 = this.select1;
    },
    getValue2(){
      this.apply_id2 = this.select2;
    },
    send(){
      if(this.picked == "1"){
         if(this.apply_id1=="0"||this.apply_id1 == ""){
          this.tip("error","请添加申请企业");
          return false;
        }
        this.apply_id = this.apply_id1;
       }else if(this.picked == "2"){
         if(this.apply_id2=="0"||this.apply_id2 == ""){
          this.tip("error","请添加申请人");
          return false;
        }
        this.apply_id = this.apply_id2;
       }
       if(this.num == ''){
        this.tip("error","请填写商标注册号");
        return false;
      }
      if(this.changetype == "1"||this.changetype == "3"){
        if(this.icon1 == ''){
           this.tip("error","请上传准予变更（备案）登记通知书");
          return false;
        }
      }
      // if(this.icon2 == ''){
      //   this.tip("error","请上传变更后营业执照图片");
      //   return false;
      // }
        this.$http.post(this.GLOBAL.base_url+'/api/BrandUpload/submitData',{
                click_type:this.$route.query.click_type,
                order_id:this.$route.query.order_id,
                auth_type:this.picked,
                apply_id:this.apply_id,
                id:this.id,
                type:this.$route.query.edit,
                brand_num:this.num,
                upload_file:this.ser_icon1,
                brand_img:this.ser_icon2,
                translated_img:this.ser_icon3,
                change_type:this.changetype
            }).then(res=>{
              if(res.data.code == "1"){
                this.tip('success','提交成功')
                setTimeout(()=>{
                     this.$router.push('/personal/order?status=all')
                 },500)
              }else{
                this.tip('error',res.data.msg)
              }
            });
      },
      back(){
        this.$router.push('/personal/order?status=all')
      },
      toconfire1(){
        this.$router.push({
          path:'/personal/companyForm',
          query:{
            submitData:0
          }
        })
      },
      toconfire2(){
        this.$router.push({
          path:'/personal/personalForm',
          query:{
            submitData:0
          }
        })
      },
  },
  components: {
    Top,
    Foot,
    Fix
  },
  mounted(){
    this.status = this.$route.query.status;
    this.getData1();
    if(this.$route.query.edit == "2"){
      this.getData2();
    }
  }
}

</script>

<style scoped>
  .changeData-box>img{
    width: 100%;
    height: 188px;
  }
  .changeData-box-wrap{
    width: 980px;
    margin: 0 auto 148px;
  }
  .changeData-box-wrap-top{
    border-bottom: 1px solid #d8d8d8;
    padding: 28px 0 10px;
    font-family: "PingFangSC-Regular";
    font-size: 24px;
    color: #adadad;
  }
  .changeData-box-wrap-middle-type{
    margin: 28px 0 17px;
    font-family: "PingFangSC-Regular";
    font-size: 24px;
    color: #333333;
  }
  .changeData-box-middle-radio>input{
    width: 24px;
    height: 24px;
    vertical-align: middle;
    margin-right: 12px;
    cursor: pointer;
  }
  .changeData-box-middle-radio>span{
    font-family: "PingFangSC-Regular";
    font-size: 20px;
    vertical-align: middle;
    font-weight: 300;
    color: #333333;
  }
  .changeData-box-middle-radio>span:nth-of-type(1){
    margin-right: 45px;
  }
  .form_select {
    margin: 15px 40px 0 0;
    width: 793px;
    height: 40px;
    border-radius: 4px;
    border: solid 1px #d6d6d6;
    outline: none;
    appearance: none;
    -moz-appearance: none;
    -webkit-appearance: none;
    font-size: 16px;
    padding-left: 16px;
}
 .changeData-box-middle-box-company{
    margin: 28px 0;
 }
 .changeData-box-middle-box-company>p,.changeData-box-middle-box-ming>p{
    font-family: "PingFangSC-Regular";
    font-size: 24px;
    color: #333333;
  }
  .uploadicon{
    width: 132px;
    height: 120px;
  }
 .changeData-box-middle-box-company>span{
     font-family: "PingFangSC-Regular";
     font-size: 24px;
     color: #f96006;
     cursor: pointer;
  }
    .changData-box-middle-regNum{
        margin-bottom: 28px;
    }
    .changData-box-middle-regNum>div,.changData-box-middle-notice>div:nth-of-type(1),
    .changData-box-middle-license>div:nth-of-type(1),.changData-box-middle-translate>div:nth-of-type(1){
        font-family: "PingFangSC-Regular";
        font-size: 24px;
        color: #333333;
        margin-bottom: 15px;
    }
    .changData-box-middle-regNum>input{
        width: 776px;
        height: 40px;
        border-radius: 4px;
        border: solid 1px #d6d6d6;
        outline: none;
        padding-left: 15px;
        cursor: pointer;
    }
    .changData-box-middle-changetype{
      margin-bottom: 30px;
      font-size: 24px;
    }
    .changData-box-middle-changetype>input{
      width: 24px;
      height: 24px;
      vertical-align: middle;
      margin-right: 12px;
      cursor: pointer;
    }
    .changData-box-middle-changetype>span{
      vertical-align: middle;
      margin-right: 25px;
    }
    .changData-box-middle-notice{
        margin-bottom: 28px;
    }
    .changData-box-middle-notice-upload{
        height: 120px;
    }
    .changData-box-middle-notice-upload>div{
        float: left;
    }
    .changData-box-middle-notice-upload>div:nth-of-type(2){
        margin: 62px 0 0 7px;
    }
    .changData-box-middle-notice-upload>div:nth-of-type(2)>p{
        font-family: "PingFangSC-Light";
        font-size: 20px;
        font-weight: 300;
        color: #a6a6a6;
    }
    .changData-box-middle-notice-upload>div:nth-of-type(2)>p:nth-of-type(1){
        margin: 0 0 9px 100px;
        color: #f96006;
    }
    .changData-box-middle-license{
        margin-bottom: 28px;
    }
    .changData-box-middle-translate{
        margin-bottom: 118px;
    }
    .changData-box-middle-translate-upload{
        height: 120px;
    }
    .changData-box-middle-translate-upload>div{
        float: left;
    }
    .changData-box-middle-translate-upload>div:nth-of-type(2){
        margin: 92px 0 0 12px;
        font-family: "PingFangSC-Light";
        font-size: 20px;
        font-weight: 300;
        color: #a6a6a6;
    }
    .changeData-box-middle-two{
      height: 53px;
      margin-left: 540px;
      margin-top: 120px;
    }
    .changeData-box-middle-two>div{
      float: left;
      width: 182px;
      height: 53px;
      border-radius: 8px;
      border-style: solid;
      border-width: 2px;
      font-family: "PingFangSC-Regular";
      font-size: 24px;
      line-height: 53px;
      text-align: center;
      cursor: pointer;
    }
    .changeData-box-middle-two>div:nth-of-type(1){
      border-image-source: linear-gradient(to top, #d6d6d6, #d6d6d6);
      border-image-slice: 1;
      background-image: linear-gradient(to bottom, #ffffff, #e3e3e3), linear-gradient(to top, #d6d6d6, #d6d6d6);
      background-origin: border-box;
      background-clip: content-box, border-box;
      color: #f87e03;
      margin-right: 60px;
    }
    .changeData-box-middle-two>div:nth-of-type(2){
      border-image-source: linear-gradient(to top, #ba6100, #dc773b);
      border-image-slice: 1;
      background-image: linear-gradient(to bottom, #f79000, #f96006), linear-gradient(to top, #ba6100, #dc773b);
      background-origin: border-box;
      background-clip: content-box, border-box;
      color: #ffffff;
    }
  .fail{
     margin-top: 20px;
     font-size: 20px;
     color: red;
}
.tan{
    background: rgba(0,0,0, 0.8);
    position: fixed;
    z-index: 20;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
}
.example{
  position: absolute;
  top:50%;
  left: 50%;
  transform: translate(-50%,-50%)
}
.cha{
  position: absolute;
  left: 66%;
  top:20px;
  cursor: pointer;
}
.p1{
  cursor: pointer;
}
</style>
