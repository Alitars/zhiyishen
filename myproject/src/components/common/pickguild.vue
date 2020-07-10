<template>
  <div class="pickguild">
    <Top></Top>
     <div class="guild-box">
       <div v-show="false" ref="div1">HI! 我是小果
请输入您的产品名称或者服务行业</div>
       <div class="guild-box-top">
         <img src="/static/images/xiaoguo.png" alt="">
         <div ref="div2"></div>
       </div>
       <div class="input-div">
         <div><input type="text" placeholder="例如：T恤，酒店" v-model="key"></div>
         <div @click="getdata">确定</div>
         <div v-show="!boxshow">
           <p>例如产品名称：T恤，面包，油漆，机械设备</p>
           <p>服务行业：保险，酒店，培训，软件开发</p>
         </div>
       </div>
       <div class="guild-box-container">
         <div v-show="boxshow">
            <div class="guild-box-get">
              <div v-for="(m,n) in 7">
                <div v-for="(v,k) in [...trade].splice((m-1)*3,3)" @click="find(v.id,m)" class="guild-box-get-big" :class='{active:v.id==id}'>
                  <span >{{v.title}}</span>   
                </div>
                <div class="guild-box-get-little">
                    <div v-show="num1 == m"  v-for="(item,index) in little">
                      <input type="checkbox" v-model="box1" :value="item.groups" checked="pick(item.groups)">
                      <span> {{item.title}}</span>
                    </div>
                </div>
                <div style="clear:both"></div>
              </div>
            </div>
            <div class="guild-box-wrap-do">
                    <div class="guild-box-back" @click="goback">上一步</div>
                    <div class="guild-box-next" @click="togood">下一步</div>
                </div>
         </div>
       </div>
       
     </div>
     <Foot></Foot>
  </div>
</template>

<script>
import Top from '../ui/top.vue';
import Foot from '../ui/foot.vue';
export default {
  name: 'pickguild',
  data(){
    return{
      timer:null,
      index:0,
      boxshow:false,
      trade:[],
      id:'',
      little:[],
      num1:'',
      box1:[],
      key:'',
      
    }
  },
  components: {
      Top,
      Foot
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
                      clearInterval(this.timer)
                    }
                }, 50)
            }
        },
        togood(){
          if(this.box1.length == 0 || this.key == ''){
            this.tip('error','请选择小行业')
            return false;
          }else{
            this.$router.push({
              path:'/picktype',
              query:{
                guild:this.box1.join(","),
                good:this.key,
                type:this.$route.query.type,
                pic_url:this.$route.query.pic_url,
                id:this.$route.query.id
              }
            })
          }
        },
        getdata(){
          if(this.key != ''){
            this.$http.get(this.GLOBAL.base_url+'/app/registercateall',{params:{
              channelroad:1,
              user_id:this.$cookie.getCookie('u_id'),
              text:this.key
            }}).then(res=>{
              // console.log(res)
              if(res.data.code == "1"){
                if(res.data.data.is_empty == 1){
                  this.boxshow = true;
                  this.trade = res.data.data.data;
                  this.find(this.trade[0].id,1)
                }else{
                  this.$router.push({
                            path:'/picktype',
                            query:{
                                type:this.$route.query.type,
                                good:this.key,
                                guild:res.data.data.group,
                                pic_url:this.$route.query.pic_url,
                                id:this.$route.query.id
                            }
                        })
                }
              }
            })
          }
        },
        find(val,m){
          // console.log(val,m)
          this.id = val;
          this.num1 = m;
          for(var i = 0;i<this.trade.length;i++){
            if(val == this.trade[i].id){
              this.little = this.trade[i].sec;
            }
          }
        },
        pick(val){
          if(this.box1.length == 0){
            return false;
          }else{
            for(var i = 0;i<this.box1.length;i++){
            if(val == this.box1[i]){
              return true;
            }else{
              return false
            }
          }
          }
        },
        goback(){
          this.$router.go(-1);
        }
  },
  mounted(){
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
  .guild-box{
    background-color: #fcfcfc;
    padding-top: 157px;
  }
  .guild-box-top{
    width: 950px;
    height: 194px;
    margin: 0 auto 94px;
  }
  .guild-box-top>img{
    float: left;
  }
  .guild-box-top>div{
    float: left;
    width: 680px;
    margin:50px 0 0 80px;
    font-size: 32px;
    color: #333333;
  }
  .guild-box-get{
    width: 947px;
    margin: 0 auto 100px;
  }
  .guild-box-container{
    height: 985px;
  }
  .guild-box-get-big{
    float: left;
    border-radius: 4px;
    border:1px solid #f96006;
    width: 250px;
    height: 45px;
    text-align: center;
    line-height: 45px;
    margin-right: 90px;
    margin-bottom: 20px;
    cursor: pointer;
    overflow: hidden;
  }
  .guild-box-get-big:nth-child(3n){
    margin-right: 0;
  }
  .active{
    background-color:#f96006;
    color: #ffffff;
  }
  .guild-box-get-little{
    width: 947px;
    margin-bottom: 20px;
    box-shadow: 0 0 30px -1px rgba(217, 217, 217, 0.5);
  }
  .guild-box-get-little>div{
    float: left;
    margin: 10px 0 10px 20px;
  }
  .guild-box-get-little>div>input{
    vertical-align: middle;
    cursor: pointer;
  }
  .guild-box-get-little>div>span{
    vertical-align: middle;
    font-size: 16px;
  }
  .input-div{
    width: 947px;
    height: 120px;
    box-shadow: 3px 5px 19px -1px rgba(217, 217, 217, 0.5);
    margin: 0 auto 80px;
  }
  .input-div>div{
    float: left;
  }
  .input-div>div:nth-of-type(1)>input{
    width: 710px;
    height: 32px;
    outline: none;
    padding: 44px 0 44px 56px;
    font-size: 24px;
    color: #666666;
    border: none;
  }
  .input-div>div:nth-of-type(2){
    width: 180px;
    height: 120px;
    background: #f96006;
    font-size: 24px;
    text-align: center;
    line-height: 120px;
    cursor: pointer;
    color: #ffffff;
  }
  .input-div>div>p{
    color: red;
    margin: 10px 0 10px 44px;
  }
  .guild-box-wrap-do{
    width: 947px;
    height: 54px;
    margin: 0 auto;
  }
  .guild-box-back{
    float: left;
      width: 214px;
      height: 54px;
      border-radius: 4px;
      background-color: #efefef;
      text-align: center;
      line-height: 54px;
      color: #f87e03;
      cursor: pointer;
      margin: 0 70px 0 200px;
  }
  .guild-box-next{
    float: left;
    width: 214px;
    height: 54px;
    border-radius: 4px;
    background-color:#f96006;
    text-align: center;
    line-height: 54px;
    font-size: 18px;
    color: #ffffff;
    cursor: pointer;
  }
</style>
