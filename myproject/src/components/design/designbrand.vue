<template>
  <div class="designbrand">
    <Top></Top>
    <Fix></Fix>
     <div class="brand-box">
        <span v-show="false" ref="span1">Hi！我是小果，请问您的品牌名称是？</span>
        <div class="brand-box-top">
            <img src="/static/images/xiaoguo.png" alt="">
            <span ref="span2"></span>
        </div>
        <div class="brand-box-wrap">
            <div v-show="boxshow">
                <input type="text" placeholder="例如：华为，光明，海尔，LV" v-model="word">
                <div>
                    <div class="history" @click="gohistory" v-show="moreshow">历史类别</div>
                    <div class="next" @click="next">下一步</div>
                </div>
            </div>
        </div>
     </div>
     <Foot></Foot>
     <div class="table" v-show="loadshow">
        <el-table
         v-loading="loading" class="table">
         </el-table>
     </div>
  </div>
</template>

<script>
import Top from '../ui/top.vue';
import Foot from '../ui/foot.vue';
import Fix from '../ui/fix.vue';
export default {
  name: 'designbrand',
  data(){
    return{
        timer:null,
        k:0,
        boxshow:false,
        word:'',
         loadshow:false,
        loading: true,
        moreshow:Boolean
    }
  },
  components: {
      Top,
      Foot,
      Fix
  },
  methods:{
      tip(type,msg){
          return this.$message({
              type:type,
              message:msg,
              showClose:true,
              duration:3000
          })
      },
      setTimer(){
            if(this.timer == null) {
                this.timer = setInterval( () => {
                    this.$refs.span2.innerText = this.$refs.span1.innerText.substring(0,this.k++);
                    if(this.$refs.span2.innerText == this.$refs.span1.innerText){
                      this.boxshow = true;
                      clearInterval(this.timer)
                    }
                }, 50)
            }
        },
        gohistory(){
            if(this.word == ''){
                this.tip('error','请输入您的品牌名称')
                return false
            }else{
                 this.loadshow = true;
                this.$http.get(this.GLOBAL.base_url+'/app/lawselect',{params:{
                     channelroad:1,
                    user_id:this.$cookie.getCookie('u_id'),
                        keywords:this.word
                    }}).then(res=>{
                        if(res.data.data == 1){
                            this.$router.push({
                                        path:'/designmore',
                                        query:{
                                            type:this.word,
                                        }
                                    })
                        }else{
                            this.tip('error',res.data.msg)
                             this.loadshow = false;
                        }
                    })
            }
        },
        next(){
            if(this.word == ''){
                this.tip('error','请输入您的品牌名称')
                return false
            }else{
                 this.loadshow = true;
                this.$http.get(this.GLOBAL.base_url+'/app/lawselect',{params:{
                        keywords:this.word
                    }}).then(res=>{
                        if(res.data.data == 1){
                             this.loadshow = false;
                            this.$router.push({
                                path:'/designguild',
                                query:{
                                    type:this.word
                                }
                            })
                        }else{
                            this.tip('error',res.data.msg)
                             this.loadshow = false;
                        }
                    })
            }
        },
        gethistory(){
           this.$http.post(this.GLOBAL.base_url+'/api/shopCar/historyOrder',{
                user_id:this.$cookie.getCookie('u_id')
            }).then(res=>{
                    // console.log(res)
                    if(res.data.code == "1"){
                        if(res.data.data.length == 0){
                          this.moreshow = false
                        }else{
                          this.moreshow = true
                        }
                }
            })
        },
  },
  mounted(){
      this.gethistory()
  },
  created(){
        clearInterval(this.timer)
        this.timer = null
        this.setTimer()
    },
    destroyed(){
        clearInterval(this.timer)
        this.timer = null
    }
}

</script>

<style scoped>
    .brand-box{
      background-color: #fcfcfc;
      padding-top: 157px;
    }
  .brand-box-top{
      width: 900px;
      height: 194px;
      margin: 0 auto 94px;
  }
  .brand-box-top>img{
      vertical-align: middle;
      margin-right: 80px;
  }
  .brand-box-top>span{
      vertical-align: middle;
      font-size: 32px;
      color: #333333;
  }
  .brand-box-wrap{
      width: 947px;
      height: 630px;
      margin: 0 auto;
  }
  .brand-box-wrap>div>input{
      border: none;
      width: 891px;
      height: 32px;
      box-shadow: 0 0 30px -1px rgba(217, 217, 217, 0.5);
      outline: none;
      padding: 44px 0 44px 56px;
      font-size: 24px;
      color: #666666;
      margin-bottom: 350px;
  }
  .brand-box-wrap>div>div{
      width: 480px;
      height: 54px;
      font-size: 18px;
      margin: 0 auto;
  }
  .brand-box-wrap>div>div>div{
      float: left;
      width: 214px;
      height: 54px;
      border-radius: 4px;
      text-align: center;
      line-height: 54px;
      /* color: #f87e03; */
      cursor: pointer;
      /* margin: 0 auto; */
  }
  .history{
      background-color: #efefef;
      color: #f87e03;
      margin-right: 50px;
  }
  .next{
      background-color:#f96006;
      color: #ffffff;
  }
   .table{
      width: 100%;
      height: 100%;
      position: fixed;
      top:0;
      left: 0;
      background: rgba(0,0,0,0.1);
  }
  /* .brand-box-wrap>div>div>div:nth-of-type(2){
      background-color:#f96006;
      color: #ffffff;
      margin-left: 52px;
  } */
</style>
