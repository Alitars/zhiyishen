<template>
  <div class="listtype">
    <Top></Top>
    <Fix></Fix>
    <div class="listtype-box">
        <div class="listtype-bread">
            <div class="listtype-bread-con">
                <el-breadcrumb separator-class="el-icon-arrow-right">
                    <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                    <el-breadcrumb-item >商标分类</el-breadcrumb-item>
                </el-breadcrumb>
            </div>
        </div>
        <div class="listtype-search">
            <input type="text" placeholder="请输入要查询的商品/服务编码或名称" v-model="word">
            <div @click="search">搜索</div>
        </div>
        <div class="listtype-title">区分表介绍</div>
        <div class="listtype-intr">
          <div class="intr1"></div>
          <div class="intr2">
            《区分表》采用层次代码结构。<br>
            第一层是商品和服务类别，用中文第一类,第二类…表示，共45个类别。<br>
            第二层是商品和服务类似群，代码采用四位数字，前两位数字表示商品和服务类别，后面两位数字
            表示类似群号，如“0304”即表示表示第三类商品的第4类似群；<br>
            第三层是商品和服务项目，代码采用六位数字，前两位表示商品和服务类别，后面四位数字为商品
            或服务项目编码，如“120092”为第十二类第92号商品，六位数字前面加“C”的代码表示未列入
            《国际分类》的我国常用商品和服务项目，如“C120008”为国内第十二类第8号商品。<br>
            第四层的代码用中文（一）（二）……表示各类似群中的某一部分；<br>
            一个类似群内的商品和服务项目原则上是类似商品和服务。若该类似群内的商品和服务项目并不全
            部判为类似，则按类似关系将商品和服务项目分为若干部分，用中文（一）（二）…表示， 同一
            部分的商品和服务项目原则上判为类似，不同部分间的商品和服务项目原则上不判为类似。 对于
            某些特殊情况，该类似群后面用加注的形式详细说明。<br>
            类似的商品和服务项目之间应交叉检索.
          </div>
        </div>
        <div class="listtype-guild">各行业类别参考</div>
        <div class="list-detail">
          <div v-for="(v,k) in onecate" @click="todetail(v.num)">
            <div>第{{v.capital}}类-{{v.name}}</div>
            <div :title="v.describe">{{v.describe}}</div>
          </div>
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
  name: 'listtype',
  data(){
    return{
      onecate:[],
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
      this.$http.post(this.GLOBAL.base_url+'/api/brandOneCate').then(res=>{
            // console.log(res)
                if(res.data.code == "1"){
                  this.onecate = res.data.data;
                }
                
                })
    },
    todetail(val){
      this.$router.push({
              path:'/listtypedetail',
              query:{
                num:val
              }
            })
    }
  },
  mounted(){
    this.getdata()
  }
}

</script>

<style scoped>
    .listtype-box{
        width: 100%;
        height: 100%;
        background-color: #fcfcfc;
        /* border: 1px solid red; */
    }
    .listtype-bread{
      width: 100%;
      height: 28px;
      padding-top:12px;
      background-color: #f8f8f8;
    }
    .listtype-bread-con{
      width: 980px;
      margin: 0 auto;
    }
    .listtype-search{
      width: 960px;
      height: 71px;
      background-color: #f9f8f8;
      margin: 36px auto 50px;
    }
    .listtype-search>input{
      float: left;
      width: 776px;
      height: 54px;
      border: solid 1px #e1e2e2;
      outline: none;
      padding-left: 10px;
      margin: 8px 0 0 10px;
    }
    .listtype-search>div{
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
    .listtype-title{
      width: 140px;
      height: 40px;
      font-size: 28px;
      color: black;
      margin: 0 auto 32px;
    }
    .listtype-intr{
       width: 1200px;
      height: 506px;
      box-shadow: 3px 5px 19px -1px rgba(217, 217, 217, 0.5);
      background-color: white;
      margin: 0 auto 48px;
    }
    .intr1{
      width: 320px;
      height: 386px;
      background: url('/static/images/listtypeimg.png') no-repeat;
      float: left;
      margin: 36px 27px 0 80px;
    }
    .intr2{
      float: left;
      font-size: 16px;
      color: black;
      width: 693px;
      height: 406px;
      line-height: 2;
      margin-top: 30px;
    }
    .listtype-guild{
      width: 196px;
      height: 60px;
      font-size: 28px;
      margin: 0 auto 32px;
      text-align: center;
      color: black;
    }
    .list-detail{
      width: 1040px;
      height: 4841px;
      box-shadow: 3px 5px 19px -1px rgba(217, 217, 217, 0.5);
      background-color: white;
      margin: 0 auto;
      padding: 36px 80px 0;
      cursor: pointer;
    }
    .list-detail>div{
      float: left;
      width: 318px;
      height: 295px;
      border: solid 1px #d8d8d8;
      margin: 0 40px 24px 0;
    }
    .list-detail>div:nth-of-type(3n){
      margin-right: 0;
    }
    .list-detail>div>div:nth-of-type(1){
      width: 190px;
      margin: 36px auto 19px;
      font-size: 20px;
      text-align: center;
      color: orange;
    }
    .list-detail>div>div:nth-of-type(2){
      width: 248px;
      height: 170px;
      font-size: 16px;
      font-weight: 100;
      color: #4a4a4a;
      margin: 0 auto;
      overflow : hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 8;
      -webkit-box-orient: vertical;
    }
</style>
