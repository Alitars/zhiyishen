<template>
    <div class="header">
        <div class="header-wrap">
            <div class="header-wrap-container">
                <img class="logo" src="/static/images/guolao.png" alt="" @click="headback">
                <span>企业知识产权智能管家</span>
                <div class="header-wrap-box">
                    <div style="color:#f96006;margin-left:20px;">服务热线：400-630-2718</div>
                    <router-link id="firstpage" tag="div" to="/">首页</router-link>
                    <div id="image_box">
                        <img class="buy" src="/static/images/mybuy.png" alt="" @click="tobuy">
                    </div>

                    <div v-show="myshow" id="header-wrap-box-login">
                        <router-link to="/login">登录/</router-link><router-link to="/register">注册</router-link>
                    </div>
                    <div id="quit-div" v-show="!myshow">
                        <router-link style="float:left;" tag="div" to="/personal">个人中心/</router-link>
                        <div style="float:left;" @click="quit">退出</div>
                    </div>

                </div>

            </div>


        </div>
    </div>
</template>

<script>
    export default {
        name: "top",
        components:{

        },
        data(){
          return {
            myshow:true,
          }

        },
        mounted(){
            var timer;
          if(this.$cookie.getCookie('u_id')){
            this.myshow= false;
            // 判断用户是代理
            if(this.$cookie.getCookie('type') != 2){
                this.times()
            }else{
                clearInterval(timer)
            }
          }
        },
        methods:{
          quit(){
            this.$cookie.delCookie('username');
            this.$cookie.delCookie('u_id');
            this.$cookie.delCookie('type');
             this.$cookie.delCookie('user_type');
            this.$router.push({path:"/"});
            this.myshow= true;
          },
          headback(){
              this.$router.push('/')
          },
          tobuy(){
              this.$router.push('/personal/buyCart')
          },
         gettype(){
                this.$http.post(this.GLOBAL.base_url+'/api/usercenter/agentyCheck',{
                   user_id:this.$cookie.getCookie('u_id')
                }).then(res=>{
                    // console.log(res)
                    if(res.data.code == "1"){
                        this.$cookie.setCookie("type",res.data.data.check_type,7);
                        this.$cookie.setCookie("user_type",res.data.data.user_type,7);
                    }
                })
            },
            times(){
                this.timer = setInterval( () => {
                    this.gettype()
                        }, 10000)
            },
        }
    }
</script>

<style scoped>
    .header-wrap{
        width:100%;
        height: 54px;
        background-color: #2e2e34;
    }
    .header-wrap-container{
        width: 1200px;
        height: 54px;
        margin: 0 auto;
        line-height: 54px;
        /* border:1px solid red; */
    }
    .logo{
        width: 79px;
        height: 26px;
        float: left;
        vertical-align: middle;
        margin: 14px 24px 0 0;
        cursor: pointer;
    }
    .header-wrap-box{
        width: 456px;
        height: 54px;
        float: left;
        margin-left: 500px;
    }
    .header-wrap-container>span{
        float: left;
        color: white;
        font-size: 14px;
    }
    .header-wrap-box>a{
        text-decoration: none;
    }
    #header-wrap-box-login{
        width: 112px;
        height: 34px;
        border-radius: 4px;
        background-color: #ffffff;
        margin-right: 0;
        margin-top: 10px;
        line-height: 34px;
        text-align: center;
    }
    #header-wrap-box-login>a{
        text-decoration: none;
        color: #f96006;
        font-size: 14px;
    }
    .header-wrap-box>div{
        float: left;
        color: #ffffff;
        font-size: 14px;
        cursor: pointer;
        margin-right: 32px;
    }
    #image_box{
        line-height: 54px;
        margin-right: 40px;
    }
    #quit-div{
        margin-right: 0;
    }
    .buy{
        width: 20px;
        height: 20px;
        vertical-align: middle;
    }
</style>
