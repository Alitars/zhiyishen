<template>
  <div>
    <div class="box">
        <img src="/static/images/little.png" alt="" class="login-img" @click="goto">
        <div class="box-wrap">
            <div class="box-wrap-top">
                <div class="login">登录</div>
                <div @click="toregister" class="register">注册</div>
            </div>
            <div class="errbox">
                <div v-show="err" class="input-box">
                    <img class="warn" src="/static/images/warning.png" alt="">
                    <p>手机号或者密码错误</p>
                </div>
            </div>
            <input v-model="loginData.phone" class="user-name" type="text" placeholder="手机号码" @blur="test" maxlength="11">
            <div class="login-msg">{{loginData.phoneTip}}</div>
            <div v-show="passwordshow">
                <input v-model="loginData.password" class="password-name" @keyup.enter="login"  type="password" placeholder="密码">
                <div class="login-msg">{{loginData.passwordTip}}</div>
            </div>
            <div class="login-code" v-show="!passwordshow">
                <div>
                    <input type="text" placeholder="验证码" v-model="loginData.code" maxlength="6">
                    <div class="login-div1" v-show="codeshow" @click="logincode">获取验证码</div>
                    <div class="login-div2" v-show="!codeshow">{{count}}s后</div>
                </div>
                <div class="login-msg">{{loginData.codeTip}}</div>
            </div>
            
            <div @click="login" class="land" :class="{'active':loginshow}">登录</div>
            <div class="land-box">
                <div class="auto" @click="passwordlogin" v-show="!passwordshow">账号密码登录</div>
                <div class="auto" @click="messagelogin" v-show="passwordshow">短信验证码登录</div>
                <div class="forget" @click="forgetPassword()">忘记密码</div>
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
  name: 'login',
  components: {
      
  },
  data(){
      return{
          loginData:{
              phone:'',
              phoneTip:'',
              password:'',
              passwordTip:'',
              code:'',
              codeTip:''
          },
          type:"1",
          err:false,
          loginshow:false,
          passwordshow:true,
          count:'',
          codeshow:true
      }
  },
  watch:{
      "loginData.phone"(newValue){
                if(newValue ==''){
                    return this.loginData.phoneTip='请填写手机号码';
                }
                return this.loginData.phoneTip='';
            },
            "loginData.password"(newValue){
                if(newValue.length >= 6){
                    this.loginshow = true
                }else{
                    this.loginshow = false
                }
                if(newValue ==''){
                    return this.loginData.passwordTip='请填写密码';
                }
                return this.loginData.passwordTip='';
            },
            "loginData.code"(newValue){
                if(newValue.length >= 6){
                    this.loginshow = true
                }else{
                    this.loginshow = false
                }
                if(newValue ==''){
                    return this.loginData.codeTip='请填写验证码';
                }
                return this.loginData.codeTip='';
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
            test(){
                let reg=/^[1][3,4,5,7,8][0-9]{9}$/;
                if(this.loginData.phone == ''){
                    return this.loginData.phoneTip='请填写手机号码';
                }else if(this.loginData.phone.length!=11||!reg.test(this.loginData.phone)){
                    return this.loginData.phoneTip='手机号格式不正确';
                }
            },
            goto(){
                this.$router.push("/")
            },
      toregister(){
          this.$router.push("/register")
      },
      forgetPassword(){
          this.$router.push("/forgetPassword")
      },
      passwordlogin(){
          this.passwordshow = true;
      },
      messagelogin(){
          this.passwordshow = false;
      },
      logincode(){
          if(this.loginData.phone == ''||this.loginData.phoneTip=='手机号格式不正确'){
              return false
          }else{
              this.$http.get(this.GLOBAL.base_url+'/app/register/sendcode',{params:{
              phone:this.loginData.phone,
              type:"5"
          }}).then(res=>{
              if(res.data.code == "1"){
                    var TIME_COUNT = 60;
                     if (!this.timer) {
                       this.count = TIME_COUNT;
                       this.codeshow = false;
                       this.timer = setInterval(() => {
                       if (this.count > 0 && this.count <= TIME_COUNT) {
                         this.count--;
                        } else {
                         this.codeshow = true;
                         clearInterval(this.timer);
                         this.timer = null;
                        }
                       }, 1000)
                      }
              }else if(res.data.code == "0"){
                this.loginData.phoneTip = res.data.msg;
            }
          })
          }
      },
      login(){
          if(this.passwordshow == true){
              if(this.loginData.phone == ''){
                    return this.loginData.phoneTip='请填写手机号码';
                    return false;
                }else if(this.loginData.password == ''){
                    return this.loginData.passwordTip='请填写密码';
                    return false;
                }else if(this.loginData.passwordTip=='手机号格式不正确'){
                    return false;
                }else{
                    this.$http.post(this.GLOBAL.base_url+'/api/login',{
                        phone:this.loginData.phone,
                        password:this.loginData.password,
                        type:this.type
                    },{
                                    emulateJSON:true
                                }).then(res=>{
                                    // console.log(res)
                        if(res.data.code == "1"){
                            this.$cookie.setCookie("username",this.loginData.phone,7);
                            this.$cookie.setCookie("u_id",res.data.data.user_id,7);
                            this.$cookie.setCookie("type",res.data.data.check_type,7);
                            this.$cookie.setCookie("user_type",res.data.data.user_type,7);
                            this.tip('success',"登录成功");
                            setTimeout(()=>{
                                if(this.$route.query.good == "0"){
                                    this.$router.go(-1)
                                }else{
                                    this.$router.push("/")
                                }
                            },1000)
                        }else if(res.data.code == "0"){
                            this.tip('error',res.data.msg);
                        }
                    })
                }
          }else{
            //   console.log(123)
              if(this.loginData.phone == ''){
                    return this.loginData.phoneTip='请填写手机号码';
                    return false; 
                }else if(this.loginData.code == ''){
                    return this.loginData.codeTip='请填写验证码';
                    return false;
                }else if(this.loginData.passwordTip=='手机号格式不正确'){
                    return false;
                }else{
                    this.$http.post(this.GLOBAL.base_url+'/api/login/quicklogin',{
                        phone:this.loginData.phone,
                        code:this.loginData.code,
                        channel:"1",
                        type:"5"
                    }).then(res=>{
                        if(res.data.code == "1"){
                            this.$cookie.setCookie("username",this.loginData.phone,7);
                            this.$cookie.setCookie("u_id",res.data.data.user_id,7);
                            this.$cookie.setCookie("type",res.data.data.check_type,7);
                            this.$cookie.setCookie("user_type",res.data.data.user_type,7);
                            this.tip('success',"登录成功");
                            setTimeout(()=>{
                                if(this.$route.query.good == "0"){
                                    this.$router.go(-1)
                                }else{
                                    this.$router.push("/")
                                }
                            },1000)
                        }else if(res.data.code == "0"){
                            this.tip('error',res.data.msg);
                        }
                    })
                }
          }
          
      }
  }
}

</script>

<style scoped>
  .box{
      width: 100%;
      height: 1080px;
      background: url("/static/images/background.png") no-repeat;
      background-size: cover;
      position: relative;
  }
  .login-img{
      position: absolute;
      top:40px;
      left:360px;
      cursor: pointer;
  }
   .box-wrap{
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
  .box-wrap-top{
      width: 460px;
      height: 54px;
      border-bottom:solid 1px #f6f6f6;
      margin: 50px 0 12px;
  }
  .box-wrap-top>div{
      width: 56px;
      height: 52px;
      float: left;
      font-family: "PingFangSC-Medium";
      font-size: 28px;
      font-weight: 500;
      color: #111111;
  }
  .login{
      border-bottom: 2px solid black;
      cursor: pointer;
  }
  .register{
      margin-left: 76px;
      cursor: pointer;
  }
  .errbox{
      height: 60px;
      margin-bottom: 12px;
  }
  .input-box{
      width: 460px;
      height: 60px;
      border-radius: 6px;
      border: solid 1px #ff4343;
      background-color: #ffe3e3;
  }
  .warn{
      float: left;
      margin:17px 12px 0 24px;
  }
  .input-box>p{
      font-family: "PingFangSC-Regular";
      font-size: 24px;
      color: #111111;
      margin-top: 13px;
  }
  .user-name,.password-name{
      width: 436px;
      height: 60px;
      font-size: 24px;
      color: #333333;
      outline: none;
      border-radius: 6px;
      border: solid 1px #d3d3d3;
      background-color: #f3f3f3;
      padding-left: 24px;
  }
  .user-name,.password-name::-webkit-input-placeholder { 
        color: #999999;
        font-size: 24px;
    }
    .login-msg{
        padding-left: 24px;
        line-height: 40px;
        height: 40px;
        font-size: 14px;
        color:red;
    }
    .land{
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
    .land-box>div{
        float: left;
    }
    .auto{
        width: 140px;
        font-family: "PingFangSC-Regular";
        font-size: 20px;
        color: #333333;
        margin-left: 12px;
        cursor: pointer;
    }
    .forget{
        font-family: "PingFangSC-Regular";
        font-size: 20px;
        margin-left: 220px;
        color: #999999;
        cursor: pointer;
    }
    .active{
        background-color:#f96006!important;
        color: #ffffff!important;
    }
    .login-code{
        height: 100px;
    }
    .login-code>div{
        height: 60px;
    }
    .login-code>div>input{
        width: 234px;
        height: 58px;
        border-radius: 6px;
        border: solid 1px #d3d3d3;
        background-color: #f3f3f3;
        float: left;
        margin-right: 20px;
        outline: none;
        font-size: 24px;
        color: #999999;
        padding-left: 24px;
    }
    .login-div1,.login-div2{
        float: left;
        width: 180px;
        height: 60px;
        border-radius: 6px;
        font-family: "PingFangSC-Regular";
        font-size: 24px;
        line-height: 60px;
        text-align: center;
    }
    .login-div1{
        cursor: pointer;
        color: #ffffff;
        background-color: #f96006;
    }
    .login-div2{
        color: #666666;
        background-color: #f3f3f3;
    }
    
</style>
