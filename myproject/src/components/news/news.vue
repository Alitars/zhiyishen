<template>
  <div class="news-container">
    <Top></Top>
    <Fix></Fix>
    <div class="news-container-top">
      <div class="news-mid">
        <p>新闻中心</p>
        <!-- <input type="text" placeholder="新闻搜索"> 
        <i class="el-icon-error"/> -->
      </div>
    </div>
    <img class="news-img" src="/static/images/news.png" alt="">
    <div class="news-bread">
      <div class="news-bread-con">
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item >新闻中心</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
    </div>
    <div class="news-wrap"> 
      <div v-for="(v,k) in newlist">
          <div class="news-detail" @click="next(v.first.id)">
            <p class="news-p1">{{v.date}}</p>
            <p class="news-p2">{{v.first.created_at}}</p>
            <p class="news-p3">{{v.first.new_title}}</p>
            <p class="news-p4">{{v.first.abstract}}</p>
          </div>
          <div class="news-list" v-for="(item,index) in v.list" @click="next(item.id)">
            <img class="news-list-img" :src="GLOBAL.base_url+item.url_img" alt="">
            <div class="news-list-des">
              <p class="news-list-des-p1">{{item.created_at}}</p>
              <p class="news-list-des-p2">{{item.new_title}}</p>
              <p class="news-list-des-p3">{{item.abstract}}</p>
            </div>
            <div style="clear:both;"></div>
          </div>
      </div>
    </div>
    <div class="block">
      <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage1"
            :page-size="pageSize"
            layout="prev, pager, next"
            :total="total">
        </el-pagination>
    </div>
    <Foot></Foot>
  </div>
</template>

<script>
import Top from '../ui/top.vue';
import Foot from '../ui/foot.vue';
import Fix from '../ui/fix.vue';
export default {
  name: 'news',
  data(){
    return{
      newlist:[],
      total:0,
      currentPage1: 1,
      pageSize: 5,
    }
  },
  components: {
    Top,
    Foot,
    Fix
  },
  methods:{
    getdata(){
      this.$http.post(this.GLOBAL.base_url+'/api/new/newList',{
          page:this.currentPage1
      }).then(res=>{
        // console.log(res)
        if(res.data.code == "1"){
          this.newlist = res.data.data;
          this.total = res.data.count;
        }
      })
    },
    next(val){
      this.$router.push({
        path:'/news/newsdetail',
        query:{
          id:val
        }})
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
  .news-container-top{
    width: 100%;
  }
  .news-container-top>div{
    width: 1180px;
    margin: 0 auto;
  }
  .news-mid{
    height: 52px;
    line-height: 52px;
    position: relative;
  }
  .news-mid>p{
    float: left;
    margin: 0 666px  0 100px;
    font-family: PingFangSC;
    font-size: 20px;
    font-weight: 500;
    color: #111111;
  }
  /* .news-mid>input{
    width: 234px;
    height: 20px;
    border: none;
    outline: none;
    border-bottom: 1px solid #888888;
  }
  .el-icon-error{
    width: 12px;
    height: 12px;
    position: absolute;
    top:18px;
    right: 105px;
  } */
  .news-img{
    width: 100%;
    height: 100%;
  }
  .news-bread{
    width: 100%;
    height: 28px;
    padding-top:12px;
    background-color: #f8f8f8;
  }
  .news-bread-con{
    width: 980px;
    margin: 0 auto 100px;
  }
  .news-wrap>div{
    margin-left:23.2%;
    width: 50.3%;
  }
  .news-detail{
    padding: 30px 0 14px 28px;
    margin-top: 7px;
    cursor: pointer;
  }
  .news-p1{
    font-family: PingFangSC;
    font-size: 24px;
    font-weight: 600;
    color: #000000;
    margin-bottom: 15px;
  }
  .news-p2{
    font-family: PingFangSC;
    font-size: 12px;
    color: #888888;
    margin-bottom: 1px;
  }
  .news-p3{
    font-family: PingFangSC;
    font-size: 18px;
    font-weight: 500;
    color: #111111;
    margin-bottom: 3px;
  }
  .news-p4{
    font-family: PingFangSC;
    font-size: 18px;
    margin-left: 3px;
    color: #434343;
  }
  .news-list{
    width: 850px;
    padding:38px 0 18px 28px;
    cursor: pointer;
  }
  .news-list-des{
    float: left;
    width: 576px;
  }

  .news-list-img{
    float: left;
    margin-right: 30px;
    width: 200px;
    height: 104px;
  }
  .news-list-des-p1{
    font-family: PingFangSC;
    font-size: 12px;
    color: #888888;
  }
  .news-list-des-p2{
    font-family: PingFangSC;
    font-size: 16px;
    font-weight: 600;
    color: #111111;
    margin-top: 1px;
  }
  .news-list-des-p3{
    font-family: PingFangSC;
    font-size: 16px;
    color: #333333;
    margin-top: 6px;
  }
  .block{
    margin: 50px auto 100px;
    text-align: center;
  }
</style>
