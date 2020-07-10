<template>
  <div class="picksize">
    <Top></Top>
    <Fix></Fix>
     <div class="size-box">
         <div v-show="false" ref="div1">HI! 我是小果，请问您理想中的商标是几个字？</div>
      <div class="size-box-top">
         <img src="/static/images/xiaoguo.png" alt="">
         <div ref="div2"></div>
       </div>
       <div class="size-box-middle">
           <div v-show="boxshow">
               <div>
                  <!-- <div class="div1" @click="get('two')">2个字</div>
                  <div class="div2" @click="get('three')">3个字</div>
                  <div class="div3" @click="get('four')">4个字</div>
                  <div class="div4" @click="get('five')">5个字及以上</div> -->
                  <div  v-for="(v,k) in type" :class="{change: isTags(v.id)}" @click="get(v.id)">{{v.title}}</div>
              </div>
              
              <div @click="nextstop">下一步</div>
           </div>
       </div>
     </div>
     <Foot></Foot>
     <div class="size-tan" v-show="tanshow">
       <div class="size-tan-box">
         <img src="/static/images/cha.png" alt="" @click="sizecha">
         <div class="size-tan-box-div">
           <p>企业认证</p>
           <p>认证可查看更多诗词商标名称，是否立即认证?</p>
           <div>
              <div @click="notest">否</div>
              <div @click="cantest">是</div>
           </div>
         </div>
       </div>
     </div>
  </div>
</template>

<script> 
import Top from '../ui/top.vue';
import Foot from '../ui/foot.vue';
import Fix from '../ui/fix.vue';
export default {
  name: 'picksize',
  data(){
    return{
      timer:null,
      index:0,
      change:'two',
      boxshow:false,
      type:[{
        id:"2",
        title:'2个字'
      },{
        id:"3",
        title:'3个字'
      },{
        id:"4",
        title:'4个字'
      },{
        id:"5",
        title:'5个字及以上'
      }],
      arr:[],
      tanshow:false
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
                    this.$refs.div2.innerText = this.$refs.div1.innerText.substring(0,this.index++);
                    if(this.$refs.div2.innerText == this.$refs.div1.innerText){
                      this.boxshow = true;
                      clearInterval(this.timer)
                    }
                }, 50)
            }
        },
        get(val){
          if(this.arr.length == 0){
            this.arr.push(val)
          }else{
            if(this.arr.includes(val)){
              for(var i = 0; i<this.arr.length;i++){
                if(val == this.arr[i]){
                  this.$delete(this.arr,i);
                }
              }
            }else{
              this.arr.push(val)
            }
          }
        },
        isTags(tagId) {
        if (this.arr.includes(tagId)) {
            return true;
        } else {
            return false;
        }
      },
      sizecha(){
        this.tanshow = false;
      },
      notest(){
            var a = '';
            for(var i =0;i<this.arr.length;i++){
              a+= this.arr[i]+',';
            }
            a =  a.substring(0,a.length-1);
            this.$router.push({
              path:'/pickword',
              query:{
                num:a
              }
            })
      },
      cantest(){
        this.$router.push({
          path:'/personal/companyForm',
          query:{
            checkorder:0
          }
        })
      },
        nextstop(){
            if(this.arr.length == 0){
              this.tip('error','请选择您商标名称的字数')
              return false;
            }else{
              this.$http.get(this.GLOBAL.base_url+'/api/usercenter',{params:{
                  user_id:this.$cookie.getCookie('u_id')
                }}).then(res=>{
                  // console.log(res)
                  if(res.data.code == '1'){
                    if(res.data.data.auth == 3 ||res.data.data.auth == 2){
                        var a = '';
                        for(var i =0;i<this.arr.length;i++){
                          a+= this.arr[i]+',';
                        }
                        a =  a.substring(0,a.length-1);
                        this.$router.push({
                          path:'/pickword',
                          query:{
                            num:a
                          }
                        })
                    }else{
                      this.tanshow = true;
                    }
                  }
                })
            }
            
        }
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
  .size-box{
    background-color: #fcfcfc;
    padding-top: 157px;
    padding-bottom: 200px;
  }
  .size-box-top{
    width: 910px;
    height: 194px;
    margin: 0 auto 120px;
  }
  .size-box-top>img{
    float: left;
    width: 160px;
    height: 195px;
  }
  .size-box-top>div{
    float: left;
    width: 670px;
    height: 180px;
    margin:15px 0 0 80px;
    font-size: 32px;
    line-height: 180px;
    color: #333333;
  }
  .size-box-middle{
      height: 312px;
      width: 750px;
      margin:0 auto;
  }
  .size-box-middle>div>div:nth-of-type(1){
      height: 43px;
      margin-bottom: 213px;
  }
  .size-box-middle>div>div:nth-of-type(1)>div{
      float: left;
      width: 157px;
      height: 43px;
      border-radius: 4px;
      border:1px solid #f96006;
      margin-right: 38px;
      text-align: center;
      line-height: 43px;
      font-size: 18px;
      color: #333333;
      cursor: pointer;
  }
  .size-box-middle>div>div:nth-of-type(1)>div:last-child{
      margin-right: 0;
  }
  .size-box-middle>div>div:nth-of-type(2){
      margin-left: 265px;
      width: 214px;
      height: 54px;
      border-radius: 4px;
      background-color: #f96006;
      color: #ffffff;
      font-size: 18px;
      text-align: center;
      line-height: 54px;
      cursor: pointer;
  }
  .change{
      background-color: #f96006!important;
      color: #ffffff!important;
  }
  .size-tan{
    background: rgba(0,0,0, 0.8);
    position: fixed;
    z-index: 20;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
  .size-tan-box{
    width: 480px;
    height: 252px;
    background-color: #ffffff;
    position: absolute;
    top:50%;
    left: 50%;
    z-index: 30;
    transform: translate(-50%,-50%);
  }
  .size-tan-box>img{
    width: 18px;
    height: 18px;
    position: absolute;
    top:16px;
    right: 16px;
    cursor: pointer;
  }
  .size-tan-box-div{
    width: 296px;
    position: absolute;
    top:36px;
    left: 92px;
    text-align: center;
  }
  .size-tan-box-div>p:nth-of-type(1){
    font-size: 16px;
    font-weight: 600;
    color: #333333;
    margin-bottom: 30px;
  }
  .size-tan-box-div>p:nth-of-type(2){
    font-size: 14px;
    color: #333333;
    margin-bottom: 48px;
  }
  .size-tan-box-div>div{
    height: 36px;
  }
  .size-tan-box-div>div>div{
    float: left;
    width: 108px;
    height: 36px;
    text-align: center;
    line-height: 36px;
    font-size: 14px;
    cursor: pointer;
    border-radius: 4px;
  }
  .size-tan-box-div>div>div:nth-of-type(1){
    color: #f96006;
    border: solid 1px #f96006;
    background-color: #fbefe9;
    margin: 0 60px 0 10px;
  }
  .size-tan-box-div>div>div:nth-of-type(2){
    background-color:#f96006;
    color: #ffffff;
  }
</style>

