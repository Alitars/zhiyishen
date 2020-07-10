<template>
  <div class="personalInformation-container">
    <div class="personalInformation-container-box">
        <div class="personalInformation-container-box-top">代理申请</div>
        <div class="personalInformation-container-box-detail">
          <div class="personalInformation-container-box-name">
            <!-- <img src="/static/images/star.png" alt=""> -->
            <span>联系人姓名</span>
            <input v-model="nickname" type="text">
            <div class="personal-msg">{{nameTip}}</div>
          </div>
          <!-- <div class="personalInformation-container-box-phone">
            <span>手&nbsp;机&nbsp;号&nbsp;码</span>
            <span class="num">{{phone}}</span>
          </div> -->
          <div>
              <div id="personalInformation-container-box-type">
            <!-- <img src="/static/images/star.png" alt=""> -->
            <span>类&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;型&nbsp;&nbsp;</span>
            <input class="radio1" value="1" v-model="pick" name="types" type="radio"><span>企业</span>
            <input class="radio2" value="2" v-model="pick" name="types" type="radio"><span>个人</span>
          </div>
          <div class="personalInformation-container-box-idimg" v-show="typeshow1">
            <!-- <img src="/static/images/star.png" alt=""> -->
            <span>上传营业执照</span><span style="color:red;margin-left:20px;">(盖章上传)</span>
            <!-- <span id="span1">(护照复印件签字后拍照上传,只能上传png或jpg格式)</span> -->
            <div class="personalInformation-container-box-idimg-div">
              <div>
                  <el-upload
                    accept="image/*"
                    :http-request="upload1"
                    :show-file-list="false"
                    action="">
                    <img class="idimg" :src="idimg1?idimg1:'/static/images/please.png'" alt="">
                  </el-upload>
                </div>
                <div>
                  <el-image
                    style="width: 130px; height: 140px"
                    :src="url2"
                    :preview-src-list="srcList2">
                  </el-image>
                  <div style="color:red;margin-left:40px;">示例</div>
              </div>
            </div>
            <div class="form-msg">{{idimgTip1}}</div>
        </div>
        <div class="personalInformation-container-box-idimg" v-show="typeshow2">
            <!-- <img src="/static/images/star.png" alt=""> -->
            <span>上传身份证照</span><span style="color:red;margin-left:20px;">(签字上传)</span>
            <!-- <span id="span1">(护照复印件签字后拍照上传,只能上传png或jpg格式)</span> -->
            <div class="personalInformation-container-box-idimg-div">
              <div>
                  <el-upload
                    accept="image/*"
                    :http-request="upload2"
                    :show-file-list="false"
                    action="">
                    <img class="idimg" :src="idimg2?idimg2:'/static/images/please.png'" alt="">
                  </el-upload>
                </div>
                <div>
                  <el-image
                    style="width: 130px; height: 140px"
                    :src="url"
                    :preview-src-list="srcList">
                  </el-image>
                  <div style="color:red;margin-left:40px;">示例</div>
              </div>
            </div>
            <div class="form-msg">{{idimgTip2}}</div>
        </div>
          </div>
          <div class="personalInformation-container-box-idnum">
            <span>身份证号码</span>
            <input maxlength="18" v-model="idNum" type="text">
          </div>
          <div class="personal-msg">{{idNumTip}}</div>
          <div id="personalInformation-container-box-remark">备&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;注<span>{{remark}}</span></div>
          <div class="infor-agree">
            <input type="checkbox" :checked='check' @change="check=!check">
            <span>请阅读并同意</span>
            <a :href="GLOBAL.win_url+'/public/materials/licenserecord/知依昇平台代理人入驻协议.pdf'" target="blank">《知依昇 平台代理人入驻协议》</a>
            <a v-show="loadshow" :href="GLOBAL.win_url+this.path" target="blank">下载</a>
          </div>
        </div>
        <div @click="save" class="personalInformation-container-box-save">申请</div>
    </div>
    <div style="clear:both;"></div>
  </div>
</template>

<script>
export default {
  name: 'personalInformation',
  data(){
    return{
      nickname:'',
      nameTip:'',
      idNum:'',
      idNumTip:'',
      phone:'',
      mail:'',
      qq:'',
      fixphone:'',
      fax:'',
      companyname:'',

      // 企业个人
      pick:'1',
      typeshow1:true,
      typeshow2:true,
      // 上传营业执照
      idimg1:'',
      idimgTip1:'',
      idimg_ming1:'',
      idimg2:'',
      idimgTip2:'',
      idimg_ming2:'',

      checktype:'',
      remark:'',
      check:false,
      loadshow:false,
      path:'',
      membershow:true,
      url: 'http://admin.iguolao.com/public/uploads/20200401101351443.jpg',
      srcList: [
        'http://admin.iguolao.com/public/uploads/20200401101351443.jpg'
      ],
      url2: 'http://admin.iguolao.com/public/uploads/20191217174955394.jpg',
      srcList2: [
        'http://admin.iguolao.com/public/uploads/20191217174955394.jpg'
      ],
    }
  },
  watch:{
            "pick"(newValue){
                if(newValue =='1'){
                    this.typeshow1 = true
                    this.typeshow2 = true
                }else{
                  this.typeshow1 = false
                  this.typeshow2 = true
                }
            },
            'nickname'(newValue){
            if(newValue == ""){
                return this.nameTip='请填写姓名';
            }
            this.nameTip= ""
        },
          'idimg1'(newValue){
            if(newValue == ""){
                return this.idimgTip1='请上传营业执照照片';
            }
            this.idimgTip1= ""
        },
        'idimg2'(newValue){
            if(newValue == ""){
                return this.idimgTip2='请上传身份证照片';
            }
            this.idimgTip2= ""
        },
            "idNum"(newValue){
            let reg=/(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
            if(newValue ==''){
                return this.idNumTip='请输入身份证号码';
            }
            if(!reg.test(newValue)){
                return this.idNumTip='身份证号码格式不正确';
            }
            return this.idNumTip='';
        }

  },
  components: {

  },
  mounted(){
    this.$http.get(this.GLOBAL.base_url+'/api/usercenter',{params:{
        user_id:this.$cookie.getCookie('u_id')
      }
    }).then(res=>{
      // console.log(res)
      if(res.data.code== "1"){
        this.nickname = res.data.data.name;
        this.idNum = res.data.data.identity_num

        this.checktype = res.data.data.check_type;
        if(this.checktype == 3){
          this.remark = res.data.data.remark;
        }
        if(this.checktype == 2){
          if(res.data.data.agree_cart!=''||res.data.data.agree_cart!=null){
            this.loadshow = true;
            this.path = res.data.data.agree_cart;
          }
        }
        this.ident = res.data.data.user_type;


          this.pick = res.data.data.business_type;
          if(res.data.data.business_license != ''&res.data.data.business_license != null){
            this.idimg_ming1 = res.data.data.business_license;
            this.idimg1 = this.GLOBAL.base_url+res.data.data.business_license;
          }
          if(res.data.data.identity_card != ''&res.data.data.identity_card != null){
            this.idimg_ming2 = res.data.data.identity_card;
            this.idimg2 = this.GLOBAL.base_url+res.data.data.identity_card;
          }
          if(this.checktype!=0){
            this.check = true
          }else{
            this.check = false
          }

      }

    })
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
     upload1(img){
            let formData=new FormData();
            formData.append('pic',img.file);
            this.$http.post(this.GLOBAL.base_url+'/app/checklicense',formData).then(res=>{
              // console.log(res)
              if(res.data.others == "1"){
                this.idimg_ming1 = res.data.data.business_license;
                this.idimg1 = this.GLOBAL.base_url+ res.data.data.business_license;
                this.companyname = res.data.data.company_name;
              }else{
                this.tip('error',res.data.msg)
              }
            });
          },
      upload2(img){
        let formData=new FormData();
            formData.append('pic',img.file);
            this.$http.post(this.GLOBAL.base_url+'/api/authentication/upload_card',formData).then(res=>{
              if(res.data.code == "1"){
                this.idimg_ming2 = res.data.data;
                this.idimg2 =this.GLOBAL.base_url+ res.data.data;
              }
            });
      },
    save(){
      if(this.checktype == 2){
        this.tip('error','您的代理申请已通过，资料不可更改')
        return false
      }else{

          if(this.pick == "1"){
            if(this.nickname == ''||this.nickname ==null){
             return this.nameTip='请填写姓名';
              return false;
          }else if(this.idimg1 == ''){
               return this.idimgTip1='请上传营业执照';
              return false;
            }else if(this.idimg2 == ''){
              return this.idimgTip2='请上传身份证照片';
              return false;
            }else if(this.idNum==''){
              this.idNumTip = "请输入身份证号码"
              return false
            }else if(this.idNumTip=='身份证号码格式不正确'){
              return false
            }else if(this.check == false){
              this.tip('error','请阅读并同意《知依昇 平台合伙人入驻协议》')
                return false;
            }
          }else{
            if(this.nickname == ''||this.nickname ==null){
             return this.nameTip='请填写姓名';
              return false;
          }else if(this.idimg2 == ''){
              return this.idimgTip2='请上传身份证照片';
              return false;
            }else if(this.idNum==''){
              this.idNumTip = "请输入身份证号码"
              return false
            }else if(this.idNumTip=='身份证号码格式不正确'){
              return false
            }else if(this.check == false){
            this.tip('error','请阅读并同意《知依昇 平台合伙人入驻协议》')
            return false;
          }
          }


       this.$http.post(this.GLOBAL.base_url+'/api/usercenter/applyAgency',{
            user_id:this.$cookie.getCookie('u_id'),
            user_type:2,
            business_type:this.pick,
            business_license:this.idimg_ming1,
            identity_card:this.idimg_ming2,
            name:this.nickname,
            identity_num:this.idNum,
            company_name:this.companyname,
          }).then(res=>{
            if(res.data.code == "1"){
              this.tip('success',"申请成功");
            }else{
              this.tip('error',res.data.msg);
            }
          })
      }

    }
  }
}

</script>

<style scoped>
    .personalInformation-container-box{
        width:1015px;
        float: left;
        margin: 12px 0 0 16px;
        background-color: #fff;
        padding-top: 26px;
        min-height: 950px;
        box-sizing: border-box;
    }
    .personalInformation-container-box-top {
      margin-left: 66px;
      height: 28px;
      line-height: 28px;
      border-bottom:1px solid #d8d8d8;
      width: 600px;
    }
    .personalInformation-container-box-detail{
      width: 800px;
      margin-bottom: 60px;
      margin-left: 66px;
      font-size: 14px;
    }
    #personalInformation-container-box-type{
      margin-bottom: 30px;
    }
    #personalInformation-container-box-type>img{
      vertical-align: middle;
      margin: 0 68px 0 28px;
    }
    .personalInformation-container-box-idimg{
      margin-bottom:30px;
    }
    .personalInformation-container-box-idimg>img{
      margin: 0 64px 0 29px;
    }
    .personalInformation-container-box-idimg-div{
      margin: 20px 0 0 96px;
      height: 160px;
    }
    .personalInformation-container-box-idimg-div>div{
      float: left;
      margin-right: 40px;
    }
    .personalInformation-container-box-detail>div:nth-of-type(1)>span,#personalInformation-container-box-type>span{
      vertical-align: middle;
      margin-right: 4px;
      font-size: 16px;
    }
    #personalInformation-container-box-type>input{
        width: 20px;
        height: 20px;
        margin-right: 8px;
        vertical-align: middle;
        cursor: pointer;
    }
    .personalInformation-container-box-detail>div>span{
      font-family: "PingFangSC-Regular";
      font-size: 16px;
      color: #333333;
    }
    .personalInformation-container-box-detail>div>input{
      width: 288px;
      height: 34px;
      font-family: "PingFangSC-Thin";
      font-size: 16px;
      outline: none;
      color: #333333;
      margin-left: 12px;
      border-radius: 4px;
      border: solid 1px #d6d6d6;
      padding: 7px 0 8px 12px;
      box-sizing: border-box;
    }
    .personalInformation-container-box-name{
      margin-top: 30px;
    }
    .personalInformation-container-box-name>img{
       margin: 0 12px 0 29px;
    }
    /* .personalInformation-container-box-phone{
      margin: 0 0 29px 0px;
    } */
    .num{
      margin-left: 14px;
    }
    .personal-msg{
      height: 32px;
      line-height: 32px;
      color: red;
      font-size: 14px;
      margin-left: 113px;
    }
    .personalInformation-container-box-idnum{
      margin-left: 0px;
    }
    .personalInformation-container-box-idnum>img{
      margin: 10px 12px 0 0;
    }
    .personalInformation-container-box-save{
      margin-left: 202px;
      width: 80px;
      height: 36px;
      text-align: center;
      line-height: 36px;
      color: #fff;
      cursor: pointer;
      margin-bottom: 118px;
      background: url(/static/images/invalid-name1f.png) 100% no-repeat;
    }
    .form-msg{
      margin-left: 95px;
      width: 200px;
      color: red;
      font-size: 14px;
    }
    .idimg{
    width: 160px;
    height: 160px;
  }
    #personalInformation-container-box-remark{
      font-size: 16px;
      /* margin-left: 125px; */
    }
    #personalInformation-container-box-remark>span{
      color:red;
      margin-left: 10px;
    }
    .infor-agree{
      margin-top: 20px;
    }
    .infor-agree>input[type = checkbox]{
      width: 18px;
      height: 18px;
      vertical-align: middle;
      margin: 0 8px 0 0px;
      cursor: pointer;
    }
    .infor-agree>span{
      vertical-align: middle;
      font-size: 18px;
    }
    .infor-agree>a{
      color: red;
      vertical-align: middle;
      font-size: 18px;
      text-decoration: none;
    }
    .m1 {
      margin-right: 1px;
    }
</style>
