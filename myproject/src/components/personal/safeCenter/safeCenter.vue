<template>
  <div class="safeCenrter-container">
    <!-- 数据 -->
    <div class="safeCenrter-container-box" v-show="showbox">
      <!-- <div class="safeCenrter-container-box-top">安全中心</div> -->
      <div class="safeCenrter-container-box-detail">
        <div class="safeCenrter-container-box-phone">
          <span>手机号码</span>
          <span>{{phone}}</span>
          <span @click="changePhone" id="safeCenrter-container-box-change">更改手机号</span>
        </div>
        <div class="safeCenrter-container-box-mail">
          <span>邮箱</span>
          <span>{{mail}}</span>
          <span @click="changeMail"  id="safeCenrter-container-box-test">{{mailif}}邮箱</span>
        </div>
        <div class="safeCenrter-container-box-password">
          <span>密码</span>
          <span>*********</span>
          <span @click="changePassword" id="safeCenrter-container-box-changePassword">修改密码</span>
        </div>
      </div>
    </div>
    <!-- 修改手机号码 -->
    <div class="safeCenrter-testphone-box" v-show="!showtestphone">
      <!-- <div class="safeCenrter-testphone-box-top">修改手机号</div> -->
      <div class="safeCenrter-testphone-box-detail">
        <div class="safeCenrter-testphone-box-phonenum">
          <span>手机号码</span>
          <input maxlength="11" v-model="mobile" type="text" placeholder="请输入手机号">
        </div>
        <div class="mobile-msg">{{mobileTip}}</div>
        <div class="safeCenrter-testphone-box-code">
          <span class="safeCenrter-testphone-box-code-span">验证码</span>
          <input maxlength="6" v-model="mobilecode" type="text" placeholder="请输入验证码">
          <span @click="getPhonecode" v-show="show" id="safeCenrter-testphone-box-getcode">获取验证码</span>
          <span v-show="!show" id="safeCenrter-testphone-box-getcode-time">{{count}}s后重新获取</span>
       </div>
       <div class="mobile-msg">{{mobilecodeTip}}</div>
      </div>
      <div class="safeCenrter-testphone-box-img">
        <img @click="updatemobile" src="/static/images/save.png" alt="">
        <img @click="logout" class="quit-img" src="/static/images/quit.png" alt="">
       </div>
    </div>
    <!-- 验证邮箱 -->
    <div class="safeCenrter-testmail-box" v-show="!showtestmail">
      <!-- <div class="safeCenrter-testmail-box-top">验证邮箱</div> -->
      <div class="safeCenrter-testmail-box-detail">
        <div class="safeCenrter-testmail-box-mailnum">
          <span>邮箱</span>
          <input v-model="mail" type="text" placeholder="请输入邮箱">
        </div>
        <div class="mail-msg">{{mailTip}}</div>
        <div class="safeCenrter-testmail-box-code">
          <span class="safeCenrter-testmail-box-code-span">验证码</span>
          <input maxlength="6" v-model="mailcode" type="text" placeholder="请输入验证码">
          <span @click="getMailcode" v-show="show"  id="safeCenrter-testmail-box-getcode">获取验证码</span>
          <span v-show="!show"  id="safeCenrter-testmail-box-getcode-time">{{count}}s后重新获取</span>
       </div>
        <div class="mail-msg">{{mailcodeTip}}</div>
      </div>
      <div class="safeCenrter-testmail-box-img">
        <img @click="mailsave" src="/static/images/save.png" alt="">
        <img @click="mailquit" class="safeCenrter-testmail-box-quit-img" src="/static/images/quit.png" alt="">
       </div>
    </div>
    <!-- 修改密码 -->
    <div class="safeCenter-changePassword-box" v-show="!showtestpassword">
      <!-- <div class="safeCenter-changePassword-box-top">修改密码</div> -->
      <div class="safeCenter-changePassword-box-detail">
        <div class="safeCenter-changePassword-box-detail-div1">
          <input maxlength="11" v-model="changepasswordmobile"  type="text" placeholder="请输入手机号">
        </div>
        <div id="changpassword-msg1">{{changepasswordmobileTip}}</div>
        <div class="safeCenter-changePassword-box-detail-div2">
          <input maxlength="6" v-model="changepasswordmobilecode" type="text" placeholder="请输入验证码">
          <span @click="getPasswordcode" v-show="show" class="safeCenter-changePassword-box-detail-div1-span1">获取验证码</span>
          <span v-show="!show" class="safeCenter-changePassword-box-detail-div1-span2">{{count}}s后重新获取</span>
        </div>

        <div class="safeCenter-changePassword-box-detail-div3">
          <div style="float:left" >
            <div class="changpassword-msg">{{changepasswordmobilecodeTip}}</div>
            <input maxlength="16" v-model="safeif" type="password" placeholder="6-16位密码、字母、数字、符号两种以上组合">
            <div class="changpassword-msg">{{safeifTip}}</div>
          </div>

          <img v-show="canshow1" src="/static/images/short.png" alt="">
          <img v-show="canshow2" src="/static/images/changpasswordlong.png" alt="">

        </div>
        <div>
          <input v-model="changecheckpassword" type="password" placeholder="确认密码">
        </div>
        <div id="changpassword-msg2">{{changecheckpasswordTip}}</div>
      </div>
      <img @click="changepasswordsubmit" class="safeCenter-changePassword-box-img" src="/static/images/save.png" alt="">
    </div>

    <div style="clear:both;"></div>
  </div>
</template>

<script>
export default {
  name: 'safeCenter',
  data(){
      return {
          showbox:true,
        // 控制验证手机号
          showtestphone:true,
        // 控制验证邮箱
          showtestmail:true,
        // 控制修改密码
          showtestpassword:true,
        // 控制验证码
          show:true,
          count:'',
          timer:null,
          // 显示号码和邮箱
          phone:'',
          mail:'',
          // 验证邮箱
          mailTip:'',
          mailif:'',

          mobile_type:'3',
          // 更改手机号
          mobile:'',
          mobileTip:'',
          mobilecode:'',
          mobilecodeTip:'',
          // 更改邮箱
          mailcode:'',
          mailcodeTip:'',
          // 更改密码
          changepasswordmobile:'',
          changepasswordmobileTip:'',
          changepasswordmobilecode:'',
          changepasswordmobilecodeTip:'',
          safeif:'',
          safeifTip:'',
          changecheckpassword:'',
          changecheckpasswordTip:'',
          canshow1:false,
          canshow2:false,
          changepasswordType:'4'
      }
  },
  components: {

  },
  watch:{
    "mobile"(newValue){
                let reg=/^[1][3,4,5,7,8][0-9]{9}$/;
                if(newValue ==''){
                    return this.mobileTip='请输入手机号码';
                }
                if(newValue.length!=11||!reg.test(newValue)){
                    return this.mobileTip='手机号格式不正确';
                }
                return this.mobileTip='';
            },
      "mobilecode"(newValue){
          if(newValue ==''){
              return this.mobilecodeTip='请输入验证码';
          }
          return this.mobilecodeTip='';
      },
      "mail"(newValue){
                let reg=/^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/;
                if(newValue ==''){
                    return this.mailTip='请填写邮箱号';
                }
                if(!reg.test(newValue)){
                    return this.mailTip='邮箱格式不正确';
                }
                return this.mailTip='';
            },
        "mailcode"(newValue){
          if(newValue ==''){
              return this.mailcodeTip='请输入验证码';
          }
          return this.mailcodeTip='';
      },
      "changepasswordmobile"(newValue){
                let reg=/^[1][3,4,5,7,8][0-9]{9}$/;
                if(newValue ==''){
                    return this.changepasswordmobileTip='请输入手机号码';
                }
                if(newValue.length!=11||!reg.test(newValue)){
                    return this.changepasswordmobileTip='手机号格式不正确';
                }
                return this.changepasswordmobileTip='';
            },
        "changepasswordmobilecode"(newValue){
          if(newValue ==''){
              return this.changepasswordmobilecodeTip='请输入验证码';
          }
          return this.changepasswordmobilecodeTip='';
      },
      "safeif"(newValue){
          if(newValue =='' & this.changecheckpassword== ""){
            this.canshow1 = false;
            this.canshow2 = false;
            return this.safeifTip='请输入密码';
            return false;
          }
          if(newValue.length<6 & this.changecheckpassword== ""){
            this.canshow1 = true;
            this.canshow2 = false;
            return this.safeifTip='';
            return false;
          }
          if(6<=newValue.length<=16& this.changecheckpassword== ""){
            this.canshow1 = false;
            this.canshow2 = true;
            return this.safeifTip='';
            return false;
          }
          if(this.changecheckpassword !== '' ){
                    if(this.changecheckpassword ==newValue  & 6<=newValue.length<=16){
                        this.changecheckpasswordTip="";
                        this.canshow1 = false;
                        this.canshow2 = true;
                        return this.safeifTip='';
                        return false;
                    }
                     if(newValue == ''){
                          this.changecheckpasswordTip="两次密码不一致";
                          this.canshow1 = false;
                          this.canshow2 = false;
                          return this.safeifTip='';
                          return false;
                    }
                    if(this.changecheckpassword !=newValue  && newValue.length<6){
                        this.canshow1 = true;
                        this.canshow2 = false;
                        this.changecheckpasswordTip="两次密码不一致";
                        return this.safeifTip='';
                        return false;
                    }
                        if(6<=newValue.length<=16 && this.changecheckpassword !=newValue ){
                        this.canshow1 = false;
                        this.canshow2 = true;
                        this.changecheckpasswordTip="两次密码不一致";
                        return this.safeifTip='';
                        return false;
                    }
                }
      },
      "changecheckpassword"(newValue){
          if(newValue ==''){
              return this.changecheckpasswordTip='请再次输入密码';
          }
          if(this.safeif !== newValue){
            return this.changecheckpasswordTip='两次密码不一致';
          }
          return this.changecheckpasswordTip='';
      }
  },
  mounted(){
    this.$http.get(this.GLOBAL.base_url+'/api/usercenter',{params:{
      user_id:this.$cookie.getCookie('u_id')
      }
    }).then(res=>{
      this.mail = res.data.data.email;
      this.phone = res.data.data.mobile;
      if(res.data.data.email != ""){
        this.mailif = "验证"
      }else{
        this.mailif = "绑定"
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
    changePhone(){
      this.showbox = !this.showbox;
      this.showtestphone = !this.showtestphone;
    },
    getPhonecode(){
      if(this.mobile == ''){
        this.mobileTip = "请输入手机号码"
      }else{
        this.$http.post(this.GLOBAL.base_url+'/api/register/sendcode',{
              phone:this.mobile,
              type:this.mobile_type
          }).then(res=>{
              if(res.data.code == "1"){
                    this.getcode1();
              }else if(res.data.code == "0"){
                this.mobileTip = res.data.msg;
            }
          })
      }
    },
    updatemobile(){
      if(this.mobile == ''){
        this.mobileTip = "请输入手机号码"
      }else if(this.mobilecode == ''){
        this.mobilecodeTip = "请输入验证码"
      }else{
        this.$http.post(this.GLOBAL.base_url+'/api/usercenter/changephone',{
          phone:this.mobile,
          type:this.mobile_type,
          user_id:this.$cookie.getCookie('u_id'),
          code:this.mobilecode
        }).then(res=>{
          if(res.data.code == "1"){
            this.tip('success',res.data.msg);
          }else if(res.data.code == "0"){
            this.tip('error',res.data.msg);
          }

        })
      }
    },
    logout(){
      this.showbox = !this.showbox;
      this.showtestphone = !this.showtestphone;
    },
    getMailcode(){
      if(this.mail == ''){
        this.mailTip = "请输入邮箱"
      }else{
        this.$http.get(this.GLOBAL.base_url+'/api/mail/send',{params:{
              email:this.mail
          }}).then(res=>{
              if(res.data.code == "1"){
                this.tip('success',res.data.msg);
                this.getcode2();
              }else if(res.data.code == "0"){
                this.mailTip = res.data.msg;
            }
          })
      }
    },
    mailsave(){
       if(this.mail == ''){
         this.mailTip = "请输入邮箱"
       }else if(this.mailcode == ''){
         this.mailcodeTip = "请输入邮箱验证码"
       }else{
         this.$http.post(this.GLOBAL.base_url+'/api/mail/upemail',{
           email:this.mail,
           code:this.mailcode,
           user_id:this.$cookie.getCookie('u_id')
         }).then(res=>{
           if(res.data.code == '1'){
             this.tip('success',res.data.msg);
           }else if(res.data.code == '0'){
             this.tip('error',res.data.msg);
           }
         })
       }
    },
    mailquit(){
      this.showbox = !this.showbox;
      this.showtestmail = !this.showtestmail;
    },
    changeMail(){
      if(this.mailif == "绑定"){
        this.$router.push('/personal/personalData');
      }else{
        this.showbox = !this.showbox;
        this.showtestmail = !this.showtestmail;
      }
    },
    changePassword(){
      this.showbox = !this.showbox;
      this.showtestpassword = !this.showtestpassword;
    },
    getPasswordcode(){
      if(this.changepasswordmobile == ''){
        this.changepasswordmobileTip ="请输入手机号码"
      }else{
        this.$http.post(this.GLOBAL.base_url+'/api/register/sendcode',{
              phone:this.changepasswordmobile,
              type:this.changepasswordType
          }).then(res=>{
              if(res.data.code == "1"){
                    this.getcode3();
              }else if(res.data.code == "0"){
                this.mobileTip = res.data.msg;
            }
          })
      }
    },
    changepasswordsubmit(){
      if(this.changepasswordmobile==''){
        this.changepasswordmobileTip = "请输入手机号码"
      }else if(this.changepasswordmobilecode == ''){
        this.changepasswordmobilecodeTip = "请输入验证码"
      }else if(this.safeif == ''){
        this.safeifTip = "请输入密码"
      }else if(this.changecheckpassword == ''){
        this.changecheckpasswordTip = "请再次输入密码"
      }else{
        this.$http.post(this.GLOBAL.base_url+'/api/usercenter/changepass',{
              phone:this.changepasswordmobile,
              user_id:this.$cookie.getCookie('u_id'),
              code:this.changepasswordmobilecode,
              password:this.safeif,
              re_pass:this.changecheckpassword
          }).then(res=>{
              if(res.data.code == "1"){
                  this.showbox = !this.showbox;
                  this.showtestpassword = !this.showtestpassword;
                  this.tip('success',res.data.msg);
              }else if(res.data.code == "0"){
                this.tip('error',res.data.msg);
            }
          })
      }
    },
    getcode1(){
      const TIME_COUNT = 60;
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
    },
    getcode2(){
      const TIME_COUNT = 60;
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
    },
    getcode3(){
      const TIME_COUNT = 60;
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
    }
  }
}

</script>

<style scoped>
  .safeCenrter-container-box{
    width: 1015px;
    float: left;
    margin: 12px 0 0px 16px;
    background-color: #fff;
    min-height: 950px;
  }
  /* .safeCenrter-container-box-top{
      font-family: "PingFangSC";
      font-size: 22px;
      font-weight: 100;
      color: #999999;
      margin: 0 0 14px 43px;
    } */
    .safeCenrter-container-box-detail{
      width: 800px;
      /* border-top:1px solid #d8d8d8; */
      margin-bottom: 141px;
      /* margin: 0 auto; */
      height: 432px;
      padding-top: 50px;
      box-sizing: border-box;
      margin-left: 64px;

    }
    .safeCenrter-container-box-phone{
      margin: 0px 0 47px 0px;
    }
    .safeCenrter-container-box-detail>div>span{
      font-family: "PingFangSC";
      font-size: 14px;
      margin-right: 28px;
      color: #333333;
    }
    #safeCenrter-container-box-change{
      font-weight: 100;
      /* float: right; */
      cursor: pointer;
      margin-right: 170px;
      color: #fa7d33;
      margin-left: 194px;
    }
    .safeCenrter-container-box-mail{
      margin: 0 0 46px 28px;
    }
    #safeCenrter-container-box-test{
      font-weight: 100;
      margin-right: 339px;
      float:right;
      cursor: pointer;
      color: #fa7d33;
    }
    .safeCenrter-container-box-password{
      margin-left: 28px;
    }
    #safeCenrter-container-box-changePassword{
      font-weight: 100;
      margin-left: 228px;
      cursor: pointer;
      color: #fa7d33;
    }
    .safeCenrter-testphone-box,.safeCenrter-testmail-box,.safeCenter-changePassword-box{
        width: 1015px;
        float: left;
        margin: 12px 0 0px 16px;
        background-color: #fff;
        min-height:876px;
        min-height: 876px;
    }
    .safeCenrter-testphone-box-top,.safeCenrter-testmail-box-top,.safeCenter-changePassword-box-top{
        font-family: "PingFangSC";
        font-size: 22px;
        font-weight: 100;
        color: #999999;
        margin: 0 0 14px 43px;
    }
    .safeCenrter-testphone-box-detail,.safeCenrter-testmail-box-detail,.safeCenter-changePassword-box-detail{
        width: 800px;
        /* border-top:1px solid #d8d8d8; */
        margin-bottom: 34px;
        padding-top: 42px;
        box-sizing: border-box;
    }
    .safeCenrter-testphone-box-detail>div>span{
      font-family: "PingFangSC";
      font-size: 14px;
      color: #333333;
    }
    .safeCenrter-testmail-box-detail>div>span{
      font-family: "PingFangSC";
      font-size: 14px;
      color: #333333;
    }
    .safeCenrter-testphone-box-detail>div>input{
      width: 288px;
      height: 32px;
      font-family: "PingFangSC";
      font-size: 14px;
      outline: none;
      color: #333333;
      margin-left: 16px;
      border-radius: 4px;
      border: solid 1px #d6d6d6;
      padding: 6px 0 6px 12px;
      box-sizing: border-box;
    }
    .safeCenrter-testmail-box-detail>div>input{
      width: 288px;
      height: 32px;
      font-family: "PingFangSC";
      font-size: 14px;
      outline: none;
      color: #333333;
      margin-left: 16px;
      border-radius: 4px;
      border: solid 1px #d6d6d6;
      padding: 6px 0 6px 12px;
      box-sizing: border-box;
    }
    .safeCenrter-testphone-box-phonenum{
      margin: 13px 0 0 82px;
    }
     .mobile-msg{
       height: 32px;
       line-height: 32px;
       color: red;
       font-size: 14px;
       margin-left: 185px;
     }
    .safeCenrter-testphone-box-code,.safeCenrter-testmail-box-code{
      margin-left: 100px;
    }
    #safeCenrter-testphone-box-getcode,#safeCenrter-testphone-box-getcode-time{
      margin-left: 34px;
      font-size: 14px;
      font-weight: 100;
      color: #fa7d33;
    }
    .safeCenrter-testphone-box-img,.safeCenrter-testmail-box-img{
      margin-left: 172px;
    }
     .safeCenrter-testphone-box-img>img,.safeCenrter-testmail-box-img > img{
       width: 80px;
       height: 36px;
    }
    .quit-img,.safeCenrter-testmail-box-quit-img{
      cursor: pointer;
      margin-left: 36px;
    }
    .safeCenrter-testmail-box-img>img{
      cursor: pointer;
    }
    .safeCenrter-testmail-box-mailnum{
      margin: 13px 0 0 114px;
    }
    .mail-msg{
      height: 32px;
      line-height: 32px;
      margin-left: 185px;
      font-size: 14px;
      color: red;
    }
    #safeCenrter-testmail-box-getcode,#safeCenrter-testmail-box-getcode-time{
      margin-left: 34px;
      font-size: 14px;
      font-weight: 100;
      cursor: pointer;
      color: #fa7d33;
    }
    .safeCenter-changePassword-box-detail>div>input{
      width: 388px;
      height: 25px;
      border-radius: 4px;
      border: solid 1px #d6d6d6;
      font-family: "PingFangSC";
      font-size: 14px;
      color: #999999;
      padding: 8px 0 7px 12px;
      outline: none;
    }
    .safeCenter-changePassword-box-detail>div{
      margin-left: 70px;
    }
    .safeCenter-changePassword-box-detail-div1{
      margin-top: 13px;
    }
    .safeCenter-changePassword-box-detail-div1-span1,.safeCenter-changePassword-box-detail-div1-span2{
       font-family: "PingFangSC";
        font-size: 18px;
        font-weight: 100;
        cursor: pointer;
        color: #fa7d33;
        margin-left: 34px;
    }
    .safeCenter-changePassword-box-detail-div3{
      height: 106px;
    }
    .safeCenter-changePassword-box-detail-div3>div>input{
      width: 388px;
      height: 25px;
      border-radius: 4px;
      border: solid 1px #d6d6d6;
      font-family: "PingFangSC";
      font-size: 14px;
      color: #999999;
      padding: 8px 0 7px 12px;
      outline: none;
    }
    .changpassword-msg{
      height: 32px;
      line-height: 32px;
      color: red;
      font-size: 14px;
      margin-left: 12px;
    }
    #changpassword-msg1,#changpassword-msg2{
      height: 32px;
      line-height: 32px;
      color: red;
      font-size: 14px;
      margin-left: 82px;
    }
    .safeCenter-changePassword-box-detail-div3>img{
      float:left;
      margin-left: 8px;
    }
    .safeCenter-changePassword-box-img{
      width: 80px;
      height: 36px;
      margin-left: 202px;
      cursor: pointer;
    }
</style>
