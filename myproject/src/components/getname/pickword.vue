<template>
  <div class="pickword">
    <Top></Top>
    <Fix></Fix>
     <div class="word-box">
        <span v-show="false" ref="span1">您想要名称中含有哪些字或者词呢？</span>
        <div class="word-box-top">
            <img src="/static/images/xiaoguo.png" alt="">
            <span ref="span2"></span>
        </div>
        <div class="word-box-wrap">
            <div v-show="boxshow">
                <input type="text" placeholder="例如：腾，严，锦，东方" v-model="word">
                <div>
                    <div @click="goback">上一步</div>
                    <div @click="next">下一步</div>
                    <div v-show="moreshow" @click="gohistory">历史类别</div>
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
  name: 'pickgood',
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
            duration:1500
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
        goback(){
            this.$router.push('/picksize')
        },
        next(){
            var reg=/^[\u0391-\uFFE5]+$/;  
            if(this.word == ''){
                this.tip('error','请输入你想要商标名称中所含的字词');
                return false;
            }else if(!reg.test(this.word)){
                this.tip('error','请输入汉字');
                return false;
            }else{
                this.loadshow = true;
                this.$http.get(this.GLOBAL.base_url+'/app/lawselect',{params:{
                        keywords:this.word
                    }}).then(res=>{
                        if(res.data.data == 1){
                            this.loadshow = false;
                            this.$router.push({
                                path:'/nameguild',
                                query:{
                                    num:this.$route.query.num,
                                    word:this.word
                                }
                            })
                        }else{
                            this.loadshow = false;
                            this.tip('error',res.data.msg)
                        }
                    })
            }   
        },
        gohistory(){
            var reg=/^[\u0391-\uFFE5]+$/;  
            if(this.word == ''){
                this.tip('error','请输入你想要商标名称中所含的字词');
                return false;
            }else if(!reg.test(this.word)){
                this.tip('error','请输入汉字');
                return false;
            }else{
                 this.loadshow = true;
                this.$http.get(this.GLOBAL.base_url+'/app/lawselect',{params:{
                        keywords:this.word
                    }}).then(res=>{
                        if(res.data.data == 1){
                             this.$router.push({
                                        path:'/namemore',
                                        query:{
                                            word:this.word,
                                            num:this.$route.query.num
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
    .word-box{
      background-color: #fcfcfc;
      padding-top: 157px;
    }
  .word-box-top{
      width: 758px;
      height: 194px;
      margin: 0 auto 94px;
  }
  .word-box-top>img{
      vertical-align: middle;
      margin-right: 80px;
  }
  .word-box-top>span{
      vertical-align: middle;
      font-size: 32px;
      color: #333333;
  }
  .word-box-wrap{
      width: 947px;
      height: 630px;
      margin: 0 auto;
  }
  .word-box-wrap>div>input{
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
  .word-box-wrap>div>div{
      width: 750px;
      height: 54px;
      font-size: 18px;
      margin: 0 auto;
  }
  .word-box-wrap>div>div>div{
      float: left;
      width: 214px;
      height: 54px;
      border-radius: 4px;
      background-color: #efefef;
      text-align: center;
      line-height: 54px;
      color: #f87e03;
      cursor: pointer;
  }
  .word-box-wrap>div>div>div:nth-of-type(2){
      background-color:#f96006;
      color: #ffffff;
      margin-left: 52px;
  }
  .word-box-wrap>div>div>div:nth-of-type(3){
      margin-left: 52px;
  }
   .table{
      width: 100%;
      height: 100%;
      position: fixed;
      top:0;
      left: 0;
      background: rgba(0,0,0,0.1);
  }
</style>
