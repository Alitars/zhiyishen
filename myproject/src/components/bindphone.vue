<template>
  <div>
    <div class="bind-box">
        <img src="/static/images/little.png" alt="" class="bind-img" @click="goto">
        <div class="bind-wrap">
            <div>首次登录认证</div>
            <input type="text" placeholder="手机号码">
            <div class="bind-msg"></div>
            <input type="text" placeholder="验证码">
            <div class="bind-msg"></div>
            <div>获取验证码</div>
            <div>确认</div>
        </div>
    </div>
  </div>
</template>

<script> 
export default {
  name: 'bindphone',
  components: {
      
  },
  data(){
     return{

     }
  },
  watch:{
      
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
  }
}

</script>

<style scoped>
  .bind-box{
      width: 100%;
      height: 1080px;
      background: url("/static/images/background.png") no-repeat;
      background-size: cover;
      position: relative;
  }
  .bind-img{
      position: absolute;
      top:40px;
      left:360px;
      cursor: pointer;
  }
  .bind-wrap{
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
</style>
