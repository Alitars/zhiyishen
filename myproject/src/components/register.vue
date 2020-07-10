<template>
  <div>
    <div class="box2">
        <img src="/static/images/little.png" alt="" class="reg-img" @click="goto">
        <div class="box-wrap2">
            <div class="box-wrap-top2">
                <div @click="tologin" class="login2">登录</div>
                <div class="register2">注册</div>
            </div>
            <input maxlength="11" v-model="registerData.telephone" class="user-name2" type="text" placeholder="请输入手机号码" @blur="test">
            <div class="msg-tip">{{registerData.telephoneTip}}</div>
            <div class="test">
                <input maxlength="6" v-model="registerData.code" class="print" type="text" placeholder="输入验证码">
                <div class="count1" v-show="show" @click="getCode">获取验证码</div>
                <div v-show="!show" class="count2">{{count}}s后</div>
                <div style="clear:both;"></div>
            </div>
            <div class="msg-tip">{{registerData.codeTip}}</div>
            <input maxlength="16"  v-model="registerData.password" class="password2" type="password" placeholder="6-16位密码、字母、数字和符号两种以上组合">
            <div class="tip">
                <div class="tip-box1" v-show="passshow1">
                    <div class="progrem1"><div class="progrem-back1"></div></div>
                    <div class="short1">太短</div>
                    <div class="simple">请至少输入6个字符，不要使用容易被猜到的密码</div>
                </div>
                <div class="tip-box2" v-show="passshow2">
                    <div class="progrem2"><div class="progrem-back2"></div></div>
                    <div class="short2">安全</div>
                    <div class="simple">请至少输入6个字符，不要使用容易被猜到的密码</div>
                </div>
                <div v-show="tipshow1" class="msg-tip">{{registerData.passwordTip}}</div>
            </div>
            <input maxlength="16" v-model="registerData.checkpassword" class="password3" type="password" placeholder="确认密码">
            <div class="diff-box">
                <div v-show="diffshow" class="diff">
                    <img class="img-alert" src="/static/images/alert.png" alt="">
                    <p>两次密码不一致</p>
                </div>
                <div v-show="tipshow2" class="msg-tip">{{registerData.checkpasswordTip}}</div>
            </div>
            
            <div @click="register" class="comit" :class="{'active':registershow}">注册</div>
            <div class="agree-box">
                <span class="span1">点击注册按钮，即代表你同意</span>
                <span class="span2" @click="watchPro">《知依昇会员注册协议》</span>
            </div>
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
                <span>copyright©Zhisheng Shanghai Artificial Intelligence Technology Co., Ltd.　 <a href="http://www.beian.miit.gov.cn" target="_blank">沪ICP备19029150号-1</a></span>
                <span> 知昇（上海）人工智能科技有限公司  版权所有 </span>
            </div>
        </div>
    </div>
    
  </div>
</template>

<script>
export default {
  name: 'register',
  components: {
      
  },
  data(){
      return {
          show:true,
          count:'',
          timer:null,
          registerData:{
              telephone:'',
              password:'',
              code:'',
              checkpassword:'',
              telephoneTip:'',
              codeTip:'',
              passwordTip:'',
              checkpasswordTip:''
          },
        //   控制密码太短
          passshow1:false,
        //   控制密码安全
          passshow2:false,
        // 控制两次密码不一致
          diffshow:false,
          type:"1",
        //   控制密码为空时显示
          tipshow1:false,
        //   控制确认密码为空时显示
          tipshow2:false,
          registershow:false,
          invitation_code:''
      }
  },
  watch:{
      "registerData.telephone"(newValue){
                if(newValue ==''){
                    return this.registerData.telephoneTip='请填写手机号码';
                }
                return this.registerData.telephoneTip='';
            },
            'registerData.code'(newValue){
                if(newValue == ""){
                   return this.registerData.codeTip='请填写验证码';
                }
                this.registerData.codeTip= ""
            },
            'registerData.checkpassword'(newValue){
                if(newValue.length >= 6){
                    this.registershow = true
                }else{
                    this.registershow = false
                }
                if(this.registerData.password !== newValue){
                    this.diffshow = true;
                    this.tipshow2 = false;
                    return false;
                }
                if(this.registerData.password == newValue){
                    this.diffshow = false;
                    return false;
                }
            },
            'registerData.password'(newValue){
                if(newValue == "" & this.registerData.checkpassword==''){
                    this.passshow1= false;
                    this.passshow2= false;
                    this.tipshow1= true;
                    return false;
                }
                if(newValue.length<6 & this.registerData.checkpassword==''){
                    this.passshow1= true;
                    this.passshow2= false; 
                    this.tipshow1 = false;
                    return false;
                }
                if(6<=newValue.length<=16 & this.registerData.checkpassword==''){
                    this.passshow1= false;
                    this.passshow2= true;
                    this.tipshow1 = false;
                    return false;
                }
                if(this.registerData.checkpassword !== '' ){
                    if(this.registerData.checkpassword ==newValue  & 6<=newValue.length<=16){
                        this.diffshow = false;
                        this.passshow1 = false;
                        this.passshow2 = true;
                        return false;
                    }
                    if(this.registerData.checkpassword !=newValue  && newValue.length<6){
                        this.passshow1 = true;
                        this.passshow2 = false;
                        this.diffshow = true;
                        this.tipshow1=false;
                        return false;
                    }
                        if(6<=newValue.length<=16 && this.registerData.checkpassword !=newValue ){
                        this.diffshow = true;
                        this.passshow1 = false;
                        this.passshow2 = true;
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
            test(){
                let reg=/^[1][3,4,5,7,8][0-9]{9}$/;
                if(this.registerData.telephone == ''){
                    return this.registerData.telephoneTip='请填写手机号码';
                }else if(this.registerData.telephone.length!=11||!reg.test(this.registerData.telephone)){
                    return this.registerData.telephoneTip='手机号格式不正确';
                }
            },
      getCode(){
          if(this.registerData.telephone == ''){
              this.registerData.telephoneTip = "请输入手机号码"
          }else{
              this.$http.post(this.GLOBAL.base_url+'/api/register/sendcode',{
              phone:this.registerData.telephone,
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
                this.registerData.telephoneTip = res.data.msg;
            }
          })
          }
        },
     tologin(){
         this.$router.push("/login")
     },
     register(){
         if(this.registerData.telephone == ""){
             this.registerData.telephoneTip = "请输入手机号码"
         }else if(this.registerData.code == ""){
             this.registerData.codeTip = "请输入验证码"
         }else if(this.registerData.password == ""){
             this.tipshow1 = true;
             this.passshow1 = false;
              this.passshow2 = false;
             this.registerData.passwordTip = "请输入密码"
         }else if(this.registerData.checkpassword == ""){
             this.tipshow2 = true;
             this.diffshow = false;
             this.registerData.checkpasswordTip = "请再次输入密码"
         }else{
             this.$http.post(this.GLOBAL.base_url+'/api/register',{
                phone:this.registerData.telephone,
                code:this.registerData.code,
                password:this.registerData.password,
                re_pass:this.registerData.checkpassword,
                invitation_code:this.invitation_code
         }).then(res=>{
             if(res.data.code == "1"){
                 this.$cookie.setCookie("username",this.registerData.telephone,7);
                 this.$cookie.setCookie("u_id",res.data.data.user_id,7);
                 this.$cookie.setCookie("type",res.data.data.check_type,7);
                 this.$cookie.setCookie("user_type",res.data.data.user_type,7);
                 this.tip('success',res.data.msg);
                 setTimeout(()=>{
                     this.$router.push("/")
                 },1000)
             }else if(res.data.code == "0"){
                 this.tip('error',res.data.msg);
             }
         })
         }
     },
     watchPro(){
         let routeData = this.$router.resolve({ path: 'protocol'});
              window.open(routeData.href, '_blank');
     }
    },
    mounted(){
        var url = location.search;
        if (url.indexOf("?") != -1) {  
            var str = url.substr(1), 
            strs = str.split("=");  
            }
            this.invitation_code= strs[1];
            // console.log(this.invitation_code)
    }
}

</script>

<style scoped>
  .box2{
      width: 100%;
      height: 1080px;
      background: url("/static/images/background.png") no-repeat;
      background-size: cover;
      position: relative;
  }
  .reg-img{
      position: absolute;
      top:40px;
      left:360px;
      cursor: pointer;
  }
   .box-wrap2{
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
   .bottom>div>span>a{
        text-decoration: none;
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
  .box-wrap-top2{
      width: 460px;
      height: 54px;
      border-bottom:solid 1px #f6f6f6;
      margin: 50px 0 40px;
  }
  .box-wrap-top2>div{
      width: 56px;
      height: 52px;
      float: left;
      font-family: "PingFangSC-Regular";
      font-size: 28px;
      font-weight: 500;
      color: #111111;
  }
  .login2{
      cursor: pointer;
  }
  .register2{
      border-bottom: 2px solid black;
      margin-left: 76px;
      cursor: pointer;
  }
  .user-name2{
      width: 436px;
      height: 60px;
      color: #999999;
      outline: none;
      font-size: 24px;
      border-radius: 6px;
      border: solid 1px #d3d3d3;
      background-color: #f3f3f3;
      padding-left: 24px;
  }
  .msg-tip{
      color:red;
      line-height: 40px;
      font-size: 14px;
      padding-left: 24px;
      height: 40px;
  }
    .print{
        float: left;
        width: 230px;
        height: 60px;
        font-size: 24px;
        outline: none;
        color: #333333;
        border-radius: 6px;
        border: solid 1px #d3d3d3;
        background-color: #f3f3f3;
        padding-left: 24px;
    }
    .count1,.count2{
        float: left;
        width: 165px;
        height: 60px;
        border-radius: 6px;
        margin-left: 40px;
        font-family: "PingFangSC-Regular";
        font-size: 24px;
        line-height: 60px;
        text-align: center;
    }
    .count1{
        cursor: pointer;
        color: #ffffff;
        background-color: #f96006;
    }
    .count2{
        color: #666666;
        background-color: #f3f3f3;
    }
    .password2,.password3{
      width: 436px;
      height: 60px;
      font-size: 21px;
      outline: none;
      color: #333333;
      border-radius: 6px;
      border: solid 1px #d3d3d3;
      background-color: #f3f3f3;
      padding-left: 24px;
  }
   
  .password2,.password3::-webkit-input-placeholder { 
        color: #999999;
        font-size: 21px;
    }
    .tip{
        height: 40px;
        line-height: 40px;
    }
    .tip>div{
        float: left;
    }
    .tip-box1>div{
        float: left;
    }
    .tip-box2>div{
        float: left;
    }
    .tip-box1,.tip-box2{
        margin-left: 10px;
    }
    .progrem1,.progrem2{
        width: 80px;
        height: 6px;
        margin-top: 17px;
        border-radius: 3px;
        background-color: #f3f3f3;
    }
    .progrem-back1,.progrem-back2{
        height: 6px;
        border-radius: 3px;
    }
    .progrem-back1{
        width: 40px;
        background-color: #ff4343;
    }
    .password-msg{
        margin-left: 24px;
    }
    .progrem-back2{
        width: 80px;
        background-color: #ace028;
    }
    .short1,.short2,.simple{
        font-family: "PingFangSC-Regular";
        font-size: 16px;
        margin-left: 8px;
    }
    .short1{
        color: #ff4343;
    }
    .short2{
        color: #ace028;
    }
    .simple{
        color: #999999;
    }
    .img-alert{
        float: left;
        margin: 9px 0 0 10px;
    }
    .diff-box{
        height: 40px;
    }
    .diff-box>div{
        float: left;
    }
    .diff{
        height: 40px;
    }
    .diff>p{
        float: left;
        margin: 9px 0 0 12px; 
        font-family: "PingFangSC-Regular";
        font-size: 16px;
        color: #ff4343;
    }
    .comit{
        width: 460px;
        height: 60px;
        border-radius: 6px;
        background-color: #f3f3f3;
        text-align: center;
        line-height: 60px;
        font-family: "PingFangSC-Regular";
        font-size: 24px;
        color: #999999;
        cursor: pointer;
        margin-bottom: 30px;
    }
    .agree-box{
        font-family: "PingFangSC-Regular";
        font-size: 16px;
    }
    .span1{
        color: #999999;
        margin-left: 10px;
    }
    .span2{
        color: #54c3f9;
        cursor: pointer;
    }
    .active{
        background-color:#f96006!important;
        color: #ffffff!important;
    }
</style>
