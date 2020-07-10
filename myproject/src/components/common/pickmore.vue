<template>
  <div class="pickmore">
    <Top></Top>
    <div class="more-box-wrap">
            <div class="more-chose">
                <div class="more-divbox">
                    <div class="more-title">请选择要注册同类别的商标</div>
                    <div class="more-del" @click="delhistory">删除</div>
                </div>
                <div class="more-type" :class="changeClass">
                    <span @click="changeType('history')" class="historytrade">历史商标</span>
                    <span @click="changeType('import')" class="importtrade">导入的商标</span>
                </div>
                <div class="more-container">
                    <div class="more-list" v-for="(v,k) in history">
                        <input type="checkbox" :checked="v.isSelect" @change="v.isSelect=!v.isSelect">
                        <div class="more-list-img">
                            <img v-if="changeClass == 'history'" :src="GLOBAL.base_url+v.brand_img" alt="">
                            <img v-if="changeClass == 'import'" :src="'data:image/png;base64,'+v.brand_img" alt="">
                        </div>
                        <div class="more-list-type">{{v.one_cate}}类</div>
                        <div class="more-list-little">
                            <div v-for="(item,index) in v.three_brand">{{item.num}} {{item.name}}</div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="more-box-wrap-do">
                <div @click="goback">上一步</div>
                <div @click="next">下一步</div>
            </div>
        </div>
     <Foot></Foot>
  </div>
</template>

<script>
import Top from '../ui/top.vue';
import Foot from '../ui/foot.vue';
export default {
  name: 'pickmore',
  data(){
    return{
        history:[],
        changeClass:'history',
    }
  },
  components: {
      Top,
      Foot
  },
  watch:{
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
        goback(){
            this.$router.go(-1)
        },
        changeType(val){
            this.changeClass = val;
            this.gethistory();
        },
        delhistory(){
            var arr = [];
            var a = '';
            var type;
            if(this.changeClass == 'history'){
                type = 1;
            }else{
                type = 2;
            }
            for(var i = 0;i<this.history.length;i++){
                arr.push(this.history[i].isSelect);
                if(this.history[i].isSelect == true){
                    a+=this.history[i].id+','
                }
            }
            a =  a.substring(0,a.length-1);
            if(arr.indexOf(true) == -1){
                this.tip('error',"请选择需要删除的商标")
                return false
            }else{
                this.$http.post(this.GLOBAL.base_url+'/api/shopCar/delHistoryOrder',{
                    up_id:a,
                    type:type
                }).then(res=>{
                    if(res.data.code == "1"){
                        this.tip('success',res.data.msg);
                        this.history=this.history.filter(function (item) {return !item.isSelect});
                    }else{
                        this.tip('error',res.data.msg);
                    }
                })
            }
            
        },
        next(){
              var arr = [];
              var arr2=[];
              var a = '';
              var from;
              if(this.changeClass == 'history'){
                from = 1;
            }else{
                from = 2;
            }
            for(var i = 0;i<this.history.length;i++){
                arr2.push(this.history[i].isSelect);
                if(this.history[i].isSelect == true){
                    arr.push(this.history[i].one_cate);
                }
            }
            if((new Set(arr)).size != arr.length){
                this.tip('error',"请不要选择同大类的小商品")
                    return false
            }else{
                for(var i = 0;i<this.history.length;i++){
                if(this.history[i].isSelect == true){
                        a+=this.history[i].id+','
                    }
                }
            }
            a =  a.substring(0,a.length-1);
                if(arr2.indexOf(true) == -1){
                    this.tip('error',"请选择要注册同类别的商标")
                    return false
                }else{
                    this.$router.push({
                        path:'/picktype',
                        query:{
                            type:this.$route.query.type,
                            id:a,
                            pic_url:this.$route.query.pic_url,
                            from:from
                        }
                    })
                }
            
        },
        gethistory(){
            this.history = [];
            var type;
            if(this.changeClass == 'history'){
                type = 1;
            }else{
                type = 2;
            }
            const loading = this.$loading({
                lock: true,
                text: '请求中',
                spinner: 'el-icon-loading',
                background: 'rgba(0, 0, 0, 0.3)'
            });
            this.$http.post(this.GLOBAL.base_url+'/api/shopCar/historyOrder',{
                user_id:this.$cookie.getCookie('u_id'),
                type:type
            }).then(res=>{
                // console.log(res)
                    if(res.data.code == "1"){
                        loading.close();
                        this.history = res.data.data;
                        var _this = this;
                        this.history.map(function (item) {
                        _this.$set(item, 'isSelect', false);
                    })
                    // console.log(this.history)
                }
            })
        },
  },
  mounted(){
      this.gethistory();
  }
}

</script>

<style scoped>
  .more-box-wrap{
      width: 947px;
      margin:0 auto;
  }
  .more-box-radio{
      margin-bottom: 35px;
      margin-left: 100px;
      height: 31px;
  }
  .more-box-radio>span{
      margin-left: 20px;
      font-size: 24px;
      color: #333333;
      vertical-align: middle;
  }
  .more-box-radio>span:nth-of-type(1){
      margin-right: 360px;
  }
  .more-box-radio>input{
      width: 31px;
      height: 31px;
      vertical-align: middle;
      cursor: pointer;
  }
  .more-box-wrap-do{
      margin: 100px auto 65px;
      width: 480px;
      height: 54px;
      font-size: 18px;
  }
  .more-box-wrap-do>div{
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
  .more-box-wrap-do>div:nth-of-type(2){
      background-color:#f96006;
      color: #ffffff;
      margin-left: 52px;
  }
  .more-chose{
      margin-top: 40px;
  }
  .more-divbox{
    margin-bottom: 20px;
    height: 40px;
    line-height: 40px;
  }
  .more-title{
    font-size: 20px;
    color: #333333;
    float: left;
  }
  .more-del{
      float: right;
      width: 146px;
      height: 40px;
      border-radius: 4px;
      background-color: #efefef;
      font-size: 16px;
      color: #f87e03;
      text-align: center;
      line-height: 40px;
      cursor: pointer;
  }
  .more-type{
      margin-bottom: 10px;
  }
  .history .historytrade,.import .importtrade{
      border-bottom:1px solid #f96006;
      color: #f96006;
  }
  .more-type>span{
      margin-right: 15px;
      color: #333333;
      display: inline-block;
      width: 80px;
      height: 25px;
      cursor: pointer;
      text-align: center;
  }
  .more-container{
      height: 700px;
      border:1px solid #dbdbdb;
      overflow-y: auto;
  }
   .more-container::-webkit-scrollbar {
            width: 8px;     
            height: 8px;
    }
    .more-container::-webkit-scrollbar-thumb {
        border-radius: 5px;
        box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
    }
    .more-container::-webkit-scrollbar-track {
            opacity: 0;
    }
  .more-list{
      height: 122px;
      margin-top: 20px;
  }
  .more-list>input{
      width: 16px;
      height: 16px;
      float: left;
      margin: 55px 30px 0 10px;
      cursor: pointer;
  }
  .more-list>div{
      float: left;
      height: 120px;
      color:#333333;
  }
  .more-list-img{
      width: 118px;
      height: 118px;
      border:1px solid #dbdbdb;
      margin-right: 40px;
  }
  .more-list-img>img{
      width: 118px;
      height: 118px;
  }
  .more-list-type{
      width: 35px;
      text-align: center;
      line-height: 120px;
      margin-right: 50px;
  }
  .more-list-little{
      width: 625px;
      height: 120px;
      overflow-y: auto;
  }
   .more-list-little::-webkit-scrollbar {
            width: 8px;     
            height: 8px;
    }
    .more-list-little::-webkit-scrollbar-thumb {
        border-radius: 5px;
        box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
    }
    .more-list-little::-webkit-scrollbar-track {
            opacity: 0;
    }
  .more-list-little>div{
      float: left;
      margin: 5px 10px 5px 0;
  }
</style>
