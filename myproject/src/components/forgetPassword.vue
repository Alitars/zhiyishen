<template>
  <div class="forgetpassword-box">
    <div class="forgetpassword-box-con">
        <img src="/static/images/little.png" alt="" class="forget-img" @click="goto">
        <div class="forgetpassword-box-con-wrap">
            <p class="forgetpassword-box-p">忘记密码</p>
            <input maxlength="11" v-model="forgetData.phone" class="forgetpassword-box-username" type="text" placeholder="请输入手机号码">
            <div class="forget-msg">{{this.forgetData.phoneTip}}</div>
            <div class="test">
                <input class="forgetpassword-box-print" v-model="forgetData.code" type="text" placeholder="输入验证码">
                <div class="forgetpassword-box-count1" v-show="show" @click="getCode">获取验证码</div>
                <div v-show="!show" class="forgetpassword-box-count2">{{count}}s后</div>
                <div style="clear:both;"></div>
            </div>
            <div class="forget-msg">{{this.forgetData.codeTip}}</div>
            <input maxlength="16" v-model="forgetData.password" class="forgetpassword-box-password2" type="password" placeholder="6-16位密码、字母、数字和符号两种以上组合">
            <div class="forgetpassword-box-tip">
                <div class="forgetpassword-box-tip-box1" v-show="short">
                    <div class="forgetpassword-box-progrem1"><div class="forgetpassword-box-progrem-back1"></div></div>
                    <div class="forgetpassword-box-short1">太短</div>
                    <div class="forgetpassword-box-simple">请至少输入6个字符，不要使用容易被猜到的密码</div>
                </div>
                <div class="forgetpassword-box-tip-box2" v-show="long">
                    <div class="forgetpassword-box-progrem2"><div class="forgetpassword-box-progrem-back2"></div></div>
                    <div class="forgetpassword-box-short2">安全</div>
                    <div class="forgetpassword-box-simple">请至少输入6个字符，不要使用容易被猜到的密码</div>
                </div>
                <div class="forget-msg" v-show="passwordTipshow">{{this.forgetData.passwordTip}}</div>
            </div>
            <input class="forgetpassword-box-password3" v-model="forgetData.checkpassword" type="password" placeholder="确认密码">
            <div class="diffbox">
                <div  v-show="forgetdiffshow" class="forgetpassword-box-diff">
                    <img class="forgetpassword-box-img-alert" src="/static/images/alert.png" alt="">
                    <p>两次密码不一致</p>
                </div>
                <div  class="forget-msg" v-show="checkpasswordTipshow">{{this.forgetData.checkpasswordTip}}</div>
            </div>
            <div @click="forgetpassword" class="forgetpassword-box-comit">提交</div>
            <p @click="backlogin()" class="forgetpassword-box-jump">返回登录</p>
        </div>
        <div class="bottom">
            <div>
                <span>友情链接:创新创业中关村</span>
                <span>|</span>
                <span>网络文化经营许可证</span>
                <span>|</span>
                <span>沪ICP</span>
            </div>
            <div>
                <span>copyright©Zhisheng Shanghai Artificial Intelligence Technology Co., Ltd.　 沪ICP备19029150号-1</span>
                <span> 知昇（上海）人工智能科技有限公司  版权所有 </span>
            </div>
        </div>
    </div>
    
  </div>
</template>

<script>

export default {
  name: 'App',
  components: {
      
  },
  data(){
      return {
          show:true,
          count:'',
          timer:null,
          forgetData:{
              phone:'',
              phoneTip:'',
              code:'',
              codeTip:'',
              password:'',
              passwordTip:'',
              checkpassword:'',
              checkpasswordTip:''
          },
          short:false,
          long:false,
          passwordTipshow:false,
          checkpasswordTipshow:false,
          forgetdiffshow:false,
          type:'2'
      }
  },
  watch:{
      "forgetData.phone"(newValue){
                let reg=/^[1][3,4,5,7,8][0-9]{9}$/;
                if(newValue ==''){
                    return this.forgetData.phoneTip='请填写手机号码';
                }
                if(newValue.length!=11||!reg.test(newValue)){
                    return this.forgetData.phoneTip='手机号格式不正确';
                }
                return this.forgetData.phoneTip='';
            },
        "forgetData.code"(newValue){
                if(newValue == ""){
                   return this.forgetData.codeTip='请填写验证码';
                }
                this.forgetData.codeTip= ""
            },
            'forgetData.checkpassword'(newValue){
                if(this.forgetData.password !== newValue){
                    this.forgetdiffshow = true;
                    this.checkpasswordTipshow = false;
                    return false;
                }
                if(this.forgetData.password == newValue){
                    this.forgetdiffshow = false;
                    return false;
                }
            },
            'forgetData.password'(newValue){
                if(newValue == "" & this.forgetData.checkpassword==''){
                    this.short= false;
                    this.passshow2= false;
                    this.passwordTipshow= true;
                    return false;
                }
                if(newValue.length<6 & this.forgetData.checkpassword==''){
                    this.short= true;
                    this.long= false; 
                    this.passwordTipshow = false;
                    return false;
                }
                if(6<=newValue.length<=16 & this.forgetData.checkpassword==''){
                    this.short= false;
                    this.long= true;
                    this.passwordTipshow = false;
                    return false;
                }
                if(this.forgetData.checkpassword !== '' ){
                    if(this.forgetData.checkpassword ==newValue  & 6<=newValue.length<=16){
                        this.forgetdiffshow = false;
                        this.short = false;
                        this.long = true;
                        return false;
                    }
                    if(this.forgetData.checkpassword !=newValue  && newValue.length<6){
                        this.short = true;
                        this.long = false;
                        this.forgetdiffshow = true;
                        this.passwordTipshow=false;
                        return false;
                    }
                        if(6<=newValue.length<=16 && this.forgetData.checkpassword !=newValue ){
                        this.forgetdiffshow = true;
                        this.short = false;
                        this.long = true;
                        return false;
                    }
                  
                }
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
            goto(){
                this.$router.push("/")
            },
      getCode(){
          if(this.forgetData.phone == ''){
              this.forgetData.phoneTip = "请输入手机号码"
          }else{
              this.$http.post(this.GLOBAL.base_url+'/api/register/sendcode',{
              phone:this.forgetData.phone,
              type:this.type
          }).then(res=>{
              if(res.data.code == "1"){
                    var TIME_COUNT = 60;
                     if (!this.timer) {
                       this.count = TIME_COUNT;
                       this.show = false;
                       this.timer = setInterval(() => {
                       if (this.count > 0 && this.count <= TIME_COUNT) {
                         this.count--;
                        } else {
                         this.show = true;
                         clearInterval(this.timer);
                         this.timer = null;
                        }
                       }, 1000)
                      }
              }else if(res.data.code == "0"){
                this.forgetData.phoneTip = res.data.msg;
            }
          })
          }
        },
        forgetpassword(){
         if(this.forgetData.phone == ""){
             this.forgetData.phoneTip = "请输入手机号码"
         }else if(this.forgetData.code == ""){
             this.forgetData.codeTip = "请输入验证码"
         }else if(this.forgetData.password == ""){
             this.passwordTipshow = true;
             this.short = false;
              this.long = false;
             this.forgetData.passwordTip = "请输入密码"
         }else if(this.forgetData.checkpassword == ""){
             this.checkpasswordTipshow = true;
             this.forgetdiffshow = false;
             this.forgetData.checkpasswordTip = "请再次输入密码"
         }else{
             this.$http.post(this.GLOBAL.base_url+'/api/login/changepass',{
                phone:this.forgetData.phone,
                code:this.forgetData.code,
                password:this.forgetData.password,
                re_pass:this.forgetData.checkpassword
         }).then(res=>{
             if(res.data.code == "1"){
                 this.tip('success',res.data.msg);
                 this.$router.push('/login');
             }else if(res.data.code == "0"){
                 this.tip('error',res.data.msg);
             }
         })
         } 
     },
     tologin(){
         this.$router.push("/login")
     },
     backlogin(){
         this.$router.push("/login")
     }
    }
}

</script>

<style scoped>
  .forgetpassword-box-con{
      width: 100%;
      height: 1080px;
      background: url("/static/images/background.png") no-repeat;
      background-size: cover;
      position: relative;
  }
  .forget-img{
      position: absolute;
      top:40px;
      left:360px;
      cursor: pointer;
  }
   .forgetpassword-box-con-wrap{
       position: absolute;
       width: 510px;
       height: 700px;
       left: 50%;
       top:50%;
       transform: translate(-50%,-50%);
       border-radius: 6px;
       background-color: #ffffff;
       padding-left: 50px;
   }
   .forgetpassword-box-p{
       font-family: "PingFangSC-Regular";
        font-size: 28px;
        font-weight: 500;
        color: #111111;
        margin: 50px 0 40px 0;
   }
  .bottom{
      position: absolute;
      width:830px;
      height: 41px;
      left: 50%;
      bottom:59px;
      transform: translate(-50%,0);
  }
  .bottom>div{
      text-align: center;
  }
   .bottom>div>span{
       font-size: 12px;
       color: #ffffff;
   }
   .bottom>div:nth-of-type(1)>span:nth-of-type(2){
       margin: 0 8px 0 54px;
   }
   .bottom>div:nth-of-type(1)>span:nth-of-type(4){
       margin: 0 8px 0 45px;
   }
   .bottom>div:nth-of-type(2)>span:nth-of-type(1){
       margin-right: 15px;
   }
  .forgetpassword-box-username{
      width: 436px;
      height: 60px;
      color: #999999;
      font-size: 24px;
      outline: none;
      border-radius: 6px;
      border: solid 1px #d3d3d3;
      background-color: #f3f3f3;
      padding-left: 24px;
  }
  .forget-msg{ 
      color:red;
      line-height: 40px;
      padding-left: 24px;
      height: 40px;
    }
    .forgetpassword-box-print{
        float: left;
        width: 230px;
        height: 60px;
        outline: none;
        font-size: 24px;
        color: #333333;
        border-radius: 6px;
        border: solid 1px #d3d3d3;
        background-color: #f3f3f3;
        padding-left: 24px;
    }
    .forgetpassword-box-count1,.forgetpassword-box-count2{
        float: left;
        width: 165px;
        height: 60px;
        cursor: pointer;
        border-radius: 6px;
        margin-left: 40px;
        font-family: "PingFangSC-Regular";
        font-size: 24px;
        line-height: 60px;
        text-align: center;
    }
    .forgetpassword-box-count1{
        color: #ffffff;
        background-color: #54c3f9;
    }
    .forgetpassword-box-count2{
        color: #666666;
        background-color: #f3f3f3;
    }
    .forgetpassword-box-password2,.forgetpassword-box-password3{
      width: 436px;
      height: 60px;
      font-size: 21px;
      color: #333333;
      outline: none;
      border-radius: 6px;
      border: solid 1px #d3d3d3;
      background-color: #f3f3f3;
      padding-left: 24px;
  }
  .forgetpassword-box-password2,.forgetpassword-box-password3::-webkit-input-placeholder { 
        color: #999999;
        font-size: 21px;
    }
    .forgetpassword-box-tip{
        height:40px;
    }
    .forgetpassword-box-tip-box1>div{
        float: left;
    }
    .forgetpassword-box-tip-box2>div{
        float: left;
    }
    .forgetpassword-box-tip-box1,.forgetpassword-box-tip-box2{
        margin-left: 10px;
        height: 40px;
        line-height: 40px;
    }
    .forgetpassword-box-progrem1,.forgetpassword-box-progrem2{
        width: 80px;
        height: 6px;
        border-radius: 3px;
        margin-top: 17px;
        background-color: #f3f3f3;
    }
    .forgetpassword-box-progrem-back1,.forgetpassword-box-progrem-back2{
        height: 6px;
        border-radius: 3px;
    }
    .forgetpassword-box-progrem-back1{
        width: 40px;
        background-color: #ff4343;
    }
    .forgetpassword-box-progrem-back2{
        width: 80px;
        background-color: #ace028;
    }
    .forgetpassword-box-short1,.forgetpassword-box-short2,.forgetpassword-box-simple{
        font-family: "PingFangSC-Regular";
        font-size: 16px;
        margin-left: 8px;
    }
    .forgetpassword-box-short1{
        color: #ff4343;
    }
    .forgetpassword-box-short2{
        color: #ace028;
    }
    .forgetpassword-box-simple{
        color: #999999;
    }
    .forgetpassword-box-img-alert{
        float: left;
        margin: 9px 0 0 10px;
    }
    .forgetpassword-box-diff{
        width: 460px;
        height: 40px;
    }
    .diffbox{
        height: 40px;
    }
    .forgetpassword-box-diff>p{
        float: left;
        margin: 9px 0 0 12px; 
        font-family: "PingFangSC-Regular";
        font-size: 16px;
        color: #ff4343;
    }
    .forgetpassword-box-comit{
        width: 460px;
        height: 60px;
        border-radius: 6px;
        background-color: #f3f3f3;
        text-align: center;
        line-height: 60px;
        cursor: pointer;
        font-family: "PingFangSC-Regular";
        font-size: 24px;
        color: #999999;
        margin-bottom: 30px;
    }
    .forgetpassword-box-jump{
        font-family: "PingFangSC-Regular";
        font-size: 20px;
        color: #333333;
        cursor: pointer;
    }
</style>
