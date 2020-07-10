<template>
  <div class="govermentList">
    <Top></Top>
    <Fix></Fix>
    <div class="govermentList-top">
      <div class="govermentList-mid">
        <p>政府项目资讯</p>
        <input type="text" placeholder="资讯搜索" v-model="govermentword"> 
        <i class="el-icon-search" @click="govermentsearch"/>
      </div>
    </div>
    <div class="govermentList-bread">
      <div class="govermentList-bread-con">
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item >政府项目资讯</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
    </div>
    <div class="govermentList-detail">
        <div class="govermentList-big">
            <div class="govermentList-search" v-show="searchshow">检索到“{{govermentword}}”相关的项目<span>{{total}}</span>个</div>
            <div class="govermentList-every">
                <div v-for="(v,k) in govermentlist">
                    <div class="govermentList-title">{{v.title}}</div>
                    <div class="govermentList-part">
                        <img src="/static/images/goverment1.png" alt="">
                        <span>主管单位:</span>
                        <span>{{v.unit}}</span>
                    </div>
                    <div class="govermentList-part">
                        <img src="/static/images/goverment2.png" alt="">
                        <span>扶持政策:</span>
                        <span>{{v.policy}}</span>
                    </div>
                    <div class="govermentList-cond">
                        <div>
                            <img src="/static/images/goverment3.png" alt="">
                            <span>主要条件:</span>
                        </div>
                        <div>
                            <div v-html="v.condition"></div>
                        </div>
                    </div>
                    <div class="govermentList-part2">
                        <img src="/static/images/goverment4.png" alt="">
                        <p>申报日期:</p>
                        <p v-html="v.cut_time"></p>
                    </div>
                    <div class="govermentList-watchdetail">
                        <span @click="togovermentDetail(v.id)">查看详情 ></span>
                    </div>
                </div>
            </div>
            <div style="clear:both;"></div>
            <div class="govermentList-block" v-show="pageshow">
                <el-pagination
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange"
                        :current-page="currentPage1"
                        :page-size="pageSize"
                        layout="prev, pager, next"
                        :total="total">
                    </el-pagination>
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
  name: 'govermentList',
  data(){
    return{
      govermentlist:[],
      total:0,
      currentPage1: 1,
      pageSize: 10,
      govermentword:'',
      searchshow:false,
      pageshow:true
    }
  },
  components: {
    Top,
    Foot,
    Fix
  },
  methods:{
    getdata(){
        if(this.govermentword == ''){
            this.searchshow  = false
        }else{
            this.searchshow  = true
        }
      this.$http.post(this.GLOBAL.base_url+'/api/new/governmentAll',{
          keyword:this.govermentword,
          page:this.currentPage1
      }).then(res=>{
        // console.log(res)
        if(res.data.data.length !=0){
          this.govermentlist = res.data.data;
          this.total = res.data.count;
        }else{
            this.pageshow = false;
            this.govermentlist = res.data.data;
            this.total = 0;
        }
      })
    },
    govermentsearch(){
        this.getdata();
    },
    togovermentDetail(val){
        this.$router.push({
              path:'/govermentDetail',
              query:{
                id:val
              }
          })
      },
    handleSizeChange(val) {
              this.pageSize = val;
              this.getdata();
            },
            
        handleCurrentChange(val) {
            this.currentPage1 = val;
            this.getdata();
        },
  },
  mounted(){
    this.getdata()
  }
}

</script>

<style scoped>
.govermentList-top{
    width: 100%;
  }
  .govermentList-top>div{
    width: 1200px;
    height: 52px;
    margin: 0 auto;
     /* border:1px solid red; */
  }
  .govermentList-mid{
    line-height: 52px;
    position: relative;
  }
  .govermentList-mid>p{
    float: left;
    margin: 0 666px  0 90px;
    font-size: 20px;
    font-weight: 500;
    color: #111111;
  }
  .govermentList-mid>input{
    width: 214px;
    height: 20px;
    border: none;
    outline: none;
    padding-right: 25px;
    border-bottom: 1px solid #888888;
  }
  .el-icon-search{
    width: 12px;
    height: 12px;
    position: absolute;
    top:18px;
    right: 95px;
    cursor: pointer;
  }
  .govermentList-bread{
    width: 100%;
    height: 28px;
    padding-top:12px;
    background-color: #f8f8f8;
  }
  .govermentList-bread-con{
    width: 980px;
    margin: 0 auto 115px;
  }
  .govermentList-detail{
      width: 100%;
      min-height: 800px;
      background-color: #f8f8f8;
      padding-bottom: 100px;
  }
  .govermentList-big{
      width: 1148px;
      padding: 26px 26px 40px;
      margin: 0 auto;
      /* border:1px solid red; */
      background: #ffffff;
  }
  .govermentList-search{
      font-size: 14px;
      color: #000000;
      margin: 0 0 0 22px;
  }
  .govermentList-search>span{
      color: #f96006;
  }
  .govermentList-every{
      margin-top: 24px;
  }
  .govermentList-every>div{
      width: 560px;
      height: 380px;
      border: solid 1px #e6e6e6;
      float: left;
      margin: 0 20px 20px 0;
  }
   .govermentList-every>div:nth-child(2n){
       margin-right: 0;
   }
   .govermentList-title{
       width: 210px;
       height: 33px;
       margin: 32px auto 16px;
       font-size: 24px;
       font-weight: 500;
       color: #111111;
       overflow: hidden;
       text-overflow:ellipsis;
       white-space: nowrap;
   }
   .govermentList-part{
    width: 470px;
    height: 25px;
    /* border:1px solid red; */
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
    margin: 0 0 16px 32px;
  }
  .govermentList-part>img,.govermentList-cond>div:nth-of-type(1)>img{
    width: 14px;
    height: 14px;
    vertical-align: middle;
  }
  .govermentList-part>span{
    vertical-align: middle;
    font-size: 14px;
    color: #333333;
  }
  .govermentList-part>span:nth-of-type(1){
    margin: 0 16px 0 8px;
  }
  .govermentList-part>span:nth-of-type(2){
    font-weight: 300;
  }
  .govermentList-cond{
    width: 470px;
    height: 148px;
    /* border:1px solid red; */
    margin: 0 0 16px 32px;
  }
  .govermentList-cond>div{
    float: left;
  }
  .govermentList-cond>div:nth-of-type(1){
    height: 25px;
    margin-right: 18px;
  }
  .govermentList-cond>div:nth-of-type(2){
    height: 148px;
    overflow: auto;
  }
  .govermentList-cond>div:nth-of-type(2)::-webkit-scrollbar {
            width: 8px;     
            height: 8px;
    }
    .govermentList-cond>div:nth-of-type(2)::-webkit-scrollbar-thumb {
        border-radius: 5px;
        box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
    }
    .govermentList-cond>div:nth-of-type(2)::-webkit-scrollbar-track {
            opacity: 0;
    }
  .govermentList-cond>div:nth-of-type(1)>span{
    vertical-align: middle;
    font-size: 14px;
    color: #333333;
    margin-left: 8px;
  }
  .govermentList-cond>div:nth-of-type(2)>div{
    width: 333px;
    height: 25px;
    margin-top: 6px;
    font-size: 14px;
    font-weight: 300;
    color: #333333;
  }
  .govermentList-part2{
    width: 470px;
    height: 25px;
    line-height: 25px;
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
    margin-left:32px;
  }
  .govermentList-part2>img{
    float: left;
    width: 14px;
    height: 14px;
    margin-top: 5px;
  }
  .govermentList-part2>p{
    float: left;
    font-size: 14px;
    color: #333333;
  }
  .govermentList-part2>p:nth-of-type(1){
    width: 52px;
    margin: 0 16px 0 8px;
  }
  .govermentList-part2>p:nth-of-type(2){
    font-weight: 300;
  }
  .govermentList-watchdetail>span{
      margin-left: 470px;
      text-decoration: none;
      font-size: 14px;
      color: #4a90e2;
      cursor: pointer;
  }
  .govermentList-block{
      width: 1000px;
      text-align: center;
      margin: 0 auto;
  }
</style>
