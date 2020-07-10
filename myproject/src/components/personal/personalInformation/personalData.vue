<template>
  <div class="personalInformation-container">
    <div class="personalInformation-container-box">
        <div class="personalInformation-container-box-top">个人资料</div>
        <div class="personalInformation-container-box-detail">
          <div class="personalInformation-container-box-name">
            <!-- <img src="/static/images/star.png" alt=""> -->
            <span>联系人姓名</span>
            <input v-model="nickname" type="text">
            <div class="personal-msg">{{nameTip}}</div>
          </div>
          <div class="personalInformation-container-box-phone">
            <span>手&nbsp;机&nbsp;号&nbsp;码</span>
            <span class="num">{{phone}}</span>
          </div>

          <div class="personalInformation-container-box-mail">
            <!-- <img src="/static/images/star.png" alt=""> -->
            <span>邮&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;箱</span>
            <input v-model="mail" type="text">
          </div>
          <div class="personal-msg">{{mailTip}}</div>
          <div class="personalInformation-container-box-qq">
            <span class="m1">Q&nbsp;Q&nbsp;号&nbsp;码&nbsp;</span>
            <input v-model="qq" type="text">
          </div>
          <div class="personalInformation-container-box-fix">
            <!-- <img src="/static/images/star.png" alt=""> -->
            <span>固&nbsp;定&nbsp;电&nbsp;话</span>
            <input v-model="fixphone" type="text" placeholder="例：021-60900470">
          </div>
          <div class="personal-msg">{{fixphoneTip}}</div>
          <div class="personalInformation-container-box-fax">
            <span>传&nbsp;真&nbsp;号&nbsp;码</span>
            <input v-model="fax" type="text">
          </div>
        </div>
        <div @click="save" class="personalInformation-container-box-save">保存</div>
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

      phone:'',
      mail:'',
      qq:'',
      fixphone:'',
      fax:'',
      mailTip:'',
      fixphoneTip:''

    }
  },
  watch:{
        'nickname'(newValue){
            if(newValue == ""){
                return this.nameTip='请填写姓名';
            }
            this.nameTip= ""
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
    "fixphone"(newValue){
                let reg=/0\d{2,3}-\d{7,8}/;
                if(newValue ==''){
                    return this.fixphoneTip='请填写固定电话';
                }
                if(!reg.test(newValue)){
                    return this.fixphoneTip='固定电话格式不正确';
                }
                return this.fixphoneTip='';
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
        this.phone = res.data.data.mobile;
        this.mail = res.data.data.email;

          this.qq = res.data.data.qq;


          this.fixphone = res.data.data.tel;

        this.fax = res.data.data.fax;
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
    save(){
        if(this.nickname == ''){
            return this.nameTip='请填写姓名';
            return false;
        }else if(this.mail == ''){
            return this.mailTip='请填写邮箱号';
            return false;
        }else if(this.fixphone == ''){
            return this.fixphoneTip='请填写固定电话';
            return false;
        }else if(this.mailTip=='邮箱格式不正确'){
          return false;
        }else if(this.fixphoneTip=='固定电话格式不正确'){
          return false;
        }else{
            this.$http.post(this.GLOBAL.base_url+'/api/usercenter/changinfo',{
            user_id:this.$cookie.getCookie('u_id'),
            name:this.nickname,
            email:this.mail,
            qq:this.qq,
            tel:this.fixphone,
            fax:this.fax
        }).then(res=>{
          if(res.data.code == "1"){
            this.tip('success',"保存成功");
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
    .personalInformation-container-box-detail>div:nth-of-type(1)>span{
      vertical-align: middle;
      margin-right: 4px;
      font-size: 16px;
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
    .personalInformation-container-box-phone{
      margin: 0 0 29px 0px;
    }
    .num{
      margin-left: 14px;
    }
    .personal-msg{
      height: 32px;
      line-height: 32px;
      color: red;
      font-size: 14px;
      margin-left: 97px;
    }
    .personalInformation-container-box-mail,.personalInformation-container-box-fix{
      margin-left: 0px;
    }
    .personalInformation-container-box-mail>img{
      margin: 10px 68px 0 0;
    }
    .personalInformation-container-box-fix>img{
      margin: 10px 34px 0 0;
    }
    .personalInformation-container-box-qq{
      margin: 0 0 32px  0px;
    }
    .personalInformation-container-box-fax{
      /* margin-left: 88px; */
      margin-bottom: 20px;
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
      margin-left: 115px;
      color: red;
      font-size: 14px;
    }
    .idimg{
    width: 160px;
    height: 160px;
  }
    .m1 {
      margin-right: 1px;
    }
</style>
