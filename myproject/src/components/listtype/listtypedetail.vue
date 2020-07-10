<template>
  <div class="listtypedetail">
    <Top></Top>
    <Fix></Fix>
    <div class="listtypedetail-box">
        <div class="listtypedetail-bread">
            <div class="listtypedetail-bread-con">
                <el-breadcrumb separator-class="el-icon-arrow-right">
                    <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                    <el-breadcrumb-item :to="{ path: '/listtype' }">商标分类</el-breadcrumb-item>
                    <el-breadcrumb-item >商品</el-breadcrumb-item>
                </el-breadcrumb>
            </div>
        </div>
        <div class="listtypedetail-search">
            <div>
                <input type="text" placeholder="请输入要查询的商品/服务编码或名称" v-model="word">
                <div @click="search">搜索</div>
            </div>
        </div>
        <div class="listtypedetail-container">
            <div class="container-left">
                <div v-for="(v,k) in arr" :class="{colorChange:v.num==dynamic}" @click="checkone(v.num)">
                    第{{v.num}}类-{{v.name}}
                </div>
            </div>
            <div class="container-right">
                <div class="container-right-top">
                    <div class="right-top1">第{{capital}}类-{{name}}</div>
                    <div class="right-top2">{{describe}}</div>
                    <div class="right-top3">注释</div>
                    <div class="right-top4" v-html="annotation">
                
                    </div>
                </div>
                <div class="container-right-detail">
                    <div class="right-detail1">
                        <div v-for="(v,k) in twocate" :class="{colorChange2:v.num==dynamic2}" @click="checktwo(v.num)">{{v.num}} {{v.name}}</div>
                    </div>
                    <div class="right-detail2">
                        <div class="right-detail2-top">{{dynamic2}} {{twoname}}</div>
                        <div class="right-detail2-detail">
                            <span v-for="(v,k) in threecate">{{v.num}} {{v.name}}</span>
                        </div>
                    </div>
                     <div style="clear:both;"></div>
                </div>
                
            </div>
            <div style="clear:both;"></div>
        </div>
    </div>
    <Foot></Foot>
  </div>
</template>

<script>
import Top from '../ui/top.vue';
import Foot from '../ui/foot.vue';
import Fix from '../ui/fix.vue';
export default {
  name: 'listtypedetail',
  data(){
    return{
      arr:[],
      dynamic:'',
      dynamic2:'',
      capital:'',
      annotation:'',
      describe:'',
      name:'',
      twocate:[],
      threecate:[],
      twoname:'',
      word:''
    }
  },
  components: {
    Top,
    Foot,
    Fix
  },
  methods:{
      search(){
      this.$router.push({
              path:'/listtypesearch',
              query:{
                word:this.word
              }
            })
    },
    getdata(){
        const loading = this.$loading({
              lock: true,
              text: '请求中',
              spinner: 'el-icon-loading',
              background: 'rgba(0, 0, 0, 0.3)'
            });
      this.$http.post(this.GLOBAL.base_url+'/api/brandCategory').then(res=>{
            // console.log(res)
                if(res.data.code == "1"){
                  loading.close();
                  this.arr = res.data.data;
                  this.dynamic = this.$route.query.num;
                  for(var i=0;i<this.arr.length;i++){
                      for(var j =0;j<this.arr[i].twoCate.length;j++){
                                if(Number(this.arr[i].twoCate[j].num<1000)){
                                    this.arr[i].twoCate[j].num = '0'+this.arr[i].twoCate[j].num;
                                }
                            }
                      if(this.dynamic == this.arr[i].num){
                          this.capital = this.arr[i].capital;
                          this.describe = this.arr[i].describe;
                          this.annotation = this.arr[i].annotation;
                          this.name = this.arr[i].name;
                          this.twocate = this.arr[i].twoCate;
                      }
                  }
                  this.dynamic2 = this.twocate[0].num;
                  this.threecate = this.twocate[0].three_cate;
                  this.twoname = this.twocate[0].name;
                }
                
                })
    },
    checkone(val){
        this.dynamic = val;
        for(var i=0;i<this.arr.length;i++){
            if(this.dynamic == this.arr[i].num){
                this.capital = this.arr[i].capital;
                this.describe = this.arr[i].describe;
                this.annotation = this.arr[i].annotation;
                this.name = this.arr[i].name;
                this.twocate = this.arr[i].twoCate;
            }
        }
        this.dynamic2 = this.twocate[0].num;
        this.threecate = this.twocate[0].three_cate;
        this.twoname = this.twocate[0].name;
    },
    checktwo(val){
        this.dynamic2 = val;
        for(var i = 0;i<this.twocate.length;i++){
            if(this.dynamic2 == this.twocate[i].num){
                this.threecate = this.twocate[i].three_cate;
                this.twoname = this.twocate[i].name;
            }
        }
    }
  },
  mounted(){
    this.getdata()
  }
}

</script>

<style scoped>
    .listtypedetail-box{
        width: 100%;
        height: 100%;
        background-color: #fcfcfc;
        /* border: 1px solid red; */
    }
    .listtypedetail-bread{
      width: 100%;
      height: 28px;
      padding-top:12px;
      background-color: #f8f8f8;
    }
    .listtypedetail-bread-con{
      width: 980px;
      margin: 0 auto;
    }
    .listtypedetail-search{
        width: 100%;
        height: 107px;
        background-color: white;
        padding-top: 36px;
    }
    .listtypedetail-search>div{
      width: 960px;
      height: 71px;
      background-color: #f9f8f8;
      margin: 0 auto;
    }
    .listtypedetail-search>div>input{
      float: left;
      width: 776px;
      height: 54px;
      border: solid 1px #e1e2e2;
      outline: none;
      padding-left: 10px;
      margin: 8px 0 0 10px;
    }
    .listtypedetail-search>div>div{
       float: left;
       width: 154px;
       height: 54px;
       background-color: #ff6b00;
       margin-top: 8px;
       text-align: center;
       line-height: 54px;
       cursor: pointer;
       font-size: 16px;
       color: white;
    }
    .listtypedetail-container{
        width: 1200px;
        margin: 0 auto;
        padding-top: 15px;
    }
    .container-left{
        float: left;
        width: 169px;
        padding-top: 18px;
        height: 2190px;
        background-color: white;
    }
    .container-left>div{
        height: 31.5px;
        width: 110px;
        font-size: 14px;
        margin: 15.5px auto 0;
        color: black;
        border-bottom:solid 1px #eeeeee;
        cursor: pointer;
    }
    .colorChange{
        color: red!important;
    }
     .colorChange2{
        color: red!important;
    }
    .container-right{
        float: left;
        width: 1015px;
        margin-left:15px;
    }
    .container-right-top{
        width: 943px;
        background-color:white;
        padding:36px;
        margin-bottom: 16px;
    }
    .right-top1{
        height: 38px;
        font-size: 16px;
        color: black;
        border-bottom:solid 1px #eeeeee;
        margin-bottom: 15px;
    }
    .right-top2{
        font-size: 14px;
        font-weight: 100;
        color: black;
        margin-bottom: 26px;
    }
    .right-top3{
        font-size: 14px;
        margin-bottom: 11px;
        color:orange;
    }
    .container-right-detail{
        width: 1015px;
    }
    .container-right-detail>div{
        float: left;
    }
    .right-detail1{
        width: 256px;
        padding: 10px 0 50px;
        background-color: white;
        cursor: pointer;
    }
    .right-detail1>div{
        width: 184px;
        height: 34px;
        font-size: 16px;
        color: #666666;
        border-bottom: solid 1px #eeeeee;
        margin: 15px auto 0;
        white-space:nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }
    .right-detail2{
        width: 671px;
        padding:36px;
        margin-left: 16px;
        background-color: white;
    }
    .right-detail2-top{
        height: 38px;
        border-bottom: solid 1px #eeeeee;
        font-size: 16px;
        color: black;
        margin-bottom: 15px;
    }
    .right-detail2-detail>span{
        font-size: 14px;
        color: #999999;
        margin-right: 10px;
    }
</style>
