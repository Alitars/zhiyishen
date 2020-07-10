<template>
  <div class="listtypesearch">
    <Top></Top>
    <Fix></Fix>
    <div class="listtypesearch-box">
        <div class="listtypesearch-bread">
            <div class="listtypesearch-bread-con">
                <el-breadcrumb separator-class="el-icon-arrow-right">
                    <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                    <el-breadcrumb-item :to="{ path: '/listtype' }">商标分类</el-breadcrumb-item>
                    <el-breadcrumb-item >搜索</el-breadcrumb-item>
                </el-breadcrumb>
            </div>
        </div>
        <div class="listtypesearch-search">
            <div>
                <input type="text" placeholder="请输入要查询的商品/服务编码或名称" v-model="word">
                <div @click="regsearch">搜索</div>
            </div>
        </div>
        <div class="listtypesearch-detail">
            <div class="three-link" v-for="(v,k) in searcharr">
                <div class="link-div1" @click="stretch1(v.num)">
                    <i :class="secondshow==isTags(v.num)? 'el-icon-caret-bottom':'el-icon-caret-right'"></i> 第{{v.num}}类  {{v.name}}
                </div>
                <div class="link-div2" v-for="(item,index) in v.twoCate" v-show="isTags(v.num)">
                    <div @click="stretch2(item.num)"><i :class="thirdshow==isTags2(item.num)? 'el-icon-caret-bottom':'el-icon-caret-right'"></i> {{item.num}} <span v-html="item.name"></span> </div>
                        <div class="link-div3" v-show="isTags2(item.num)" v-for="(m,n) in item.three_cate"><span>{{m.num}}</span><span v-html="m.name"></span></div>
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
import Fix from '../ui/fix.vue';
export default {
  name: 'listtypesearch',
  data(){
    return{
        word:'',
        searcharr:[],
      firstid:[],
      secondid:[],
      secondshow:true,
       thirdshow:true,
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
      regsearch(){
              this.$http.get(this.GLOBAL.base_url+'/api/brandCategory',{params:{
                    keywords:this.word
                }}).then(res=>{
                    // console.log(res)
                    if(res.data.code == "1"){
                        this.searcharr = res.data.data;
                        for(var i =0;i<this.searcharr.length;i++){
                            this.firstid.push(this.searcharr[i].num);
                        }
                        for(var i =0;i<this.searcharr.length;i++){
                            for(var j =0;j<this.searcharr[i].twoCate.length;j++){
                                this.secondid.push(this.searcharr[i].twoCate[j].num);
                                if(Number(this.searcharr[i].twoCate[j].num<1000)){
                                    this.searcharr[i].twoCate[j].num = '0'+this.searcharr[i].twoCate[j].num;
                                }
                            }
                        }
                    }else{
                        this.tip('error',res.data.msg)
                    }
                })
          
      },
    stretch1(val){
            if (this.firstid.includes(val)) {
              for(var i =0;i<this.firstid.length;i++){
                  if(val == this.firstid[i]){
                      this.firstid.splice(i,1);
                  }
              }
          }else{
              this.firstid.push(val);
          }
      },
       stretch2(val){
            if (this.secondid.includes(val)) {
              for(var i =0;i<this.secondid.length;i++){
                  if(val == this.secondid[i]){
                      this.secondid.splice(i,1)
                  }
              }
          }else{
              this.secondid.push(val);
          }
      },
      isTags(val){
          if (this.firstid.includes(val)) {
            return true;
        } else {
            return false;
        }
      },
      isTags2(val){
            if (this.secondid.includes(val)) {
            return true;
        } else {
            return false;
        }
      },
  },
  mounted(){
      if(this.$route.query.word){
          this.word = this.$route.query.word;
          this.regsearch();
      }
    this.regsearch();
  }
}

</script>

<style scoped>
    .listtypesearch-box{
        width: 100%;
        height: 100%;
        background-color: #fcfcfc;
        /* border: 1px solid red; */
    }
    .listtypesearch-bread{
      width: 100%;
      height: 28px;
      padding-top:12px;
      background-color: #f8f8f8;
    }
    .listtypesearch-bread-con{
      width: 980px;
      margin: 0 auto;
    }
    .listtypesearch-search{
        width: 100%;
        height: 107px;
        background-color: white;
        padding-top: 36px;
    }
    .listtypesearch-search>div{
      width: 960px;
      height: 71px;
      background-color: #f9f8f8;
      margin: 0 auto;
    }
    .listtypesearch-search>div>input{
      float: left;
      width: 776px;
      height: 54px;
      border: solid 1px #e1e2e2;
      outline: none;
      padding-left: 10px;
      margin: 8px 0 0 10px;
    }
    .listtypesearch-search>div>div{
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
    .listtypesearch-detail{
        width: 1000px;
        min-height: 400px;
        padding: 50px 0 50px;
        margin: 0 auto;
    }
    .link-div1{
      margin-bottom: 10px;
      font-size: 16px;
      height: 23px;
      cursor: pointer;
      color: #333333;
  }
  .link-div2{
      margin-left: 25px;
      margin-bottom: 10px;
      font-size: 14px;
      cursor: pointer;
      color: #333333;
  }
  .link-div3{
      margin-left: 60px;
      margin-top: 10px;
      font-size: 12px;
      cursor: pointer;
      color: #333333;
  }
  .el-icon-caret-right,.el-icon-caret-bottom{
      color: #f96006;
      font-size: 20px;
      vertical-align: middle;
      margin-right: 14px;
  }
</style>
