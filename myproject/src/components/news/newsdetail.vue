<template>
  <div class="newsdetail-container">
    <Top></Top>
    <Fix></Fix>
    <div class="newsdetail-container-top">
      <div class="newsdetail-mid">
        <p>新闻中心</p>
        <!-- <input type="text" placeholder="新闻搜索"> 
        <i class="el-icon-error"/> -->
      </div>
    </div>
    <div class="newsdetail-bread">
      <div class="newsdetail-bread-con">
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item :to="{ path: '/news' }">新闻中心</el-breadcrumb-item>
            <el-breadcrumb-item>{{title}}</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
    </div>
    <div class="newsdetail-read">
        <p class="newsdetail-read-p1">浏览{{read}}次</p>
        <p class="newsdetail-read-p2">{{time}}</p>
        <p class="newsdetail-read-p3">{{title}}</p>
    </div>
    <div class="newdetail-des-box">
      <img class="newdetail-des-box-img" :src="GLOBAL.base_url+this.imgdata" alt="">
      <div v-html="content">

      </div>
      <div class="newdetail-des-page">
        <div class="newdetail-des-page-last" @click="last">上一篇</div>
        <div @click="next">下一篇</div>
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
  name: 'newsdetail',
  data(){
    return{
      title:'',
      content:'',
      read:'',
      imgdata:'',
      time:'',
      lastid:'',
      nextid:'',
    }
  },
  components: {
    Top,
    Foot,
    Fix
  },
  methods:{
    getdata(){
      this.$http.post(this.GLOBAL.base_url+'/api/new/newDetail',{
          id:this.$route.query.id
      }).then(res=>{
        // console.log(res)
        if(res.data.code == "1"){
          this.title = res.data.detail.new_title;
          this.content = res.data.detail.content;
          this.read = res.data.detail.page_view;
          this.imgdata = res.data.detail.url_img;
          this.time = res.data.detail.created_at;
          this.lastid = res.data.frontid;
          // console.log(this.lastid)
          this.nextid = res.data.nextid;
        }
      })
    },
    last(){
      if(this.lastid == null){
        return false
      }else{
        var url = location.search;
            if (url.indexOf("?") != -1) {  
                var str = url.substr(1), 
                strs = str.split("=");  
                }
                strs[1] = this.lastid;
                var host = window.location.host;
               window.location.href='https://'+host+"/news/newsdetail?id="+strs[1]
      }
    },
    next(){
      if(this.nextid == null){
        return false
      }else{
        var url = location.search;
            if (url.indexOf("?") != -1) {  
                var str = url.substr(1), 
                strs = str.split("=");  
                }
                strs[1] = this.nextid;
              var host = window.location.host;
               window.location.href='http://'+host+"/news/newsdetail?id="+strs[1]
      }
    }
  },
  
  mounted(){
    this.getdata()
  }
}

</script>

<style scoped>
 .newsdetail-container-top{
    width: 100%;
  }
  .newsdetail-container-top>div{
    margin: 0 auto;
    width: 1180px;
  }
  .newsdetail-mid{
    height: 52px;
    line-height: 52px;
    position: relative;
  }
  .newsdetail-mid>p{
    float: left;
    margin: 0 666px  0 100px;
    font-size: 20px;
    font-weight: 500;
    color: #111111;
  }
  .newsdetail-bread{
    width: 100%;
    height: 28px;
    padding-top:12px;
    background-color: #f8f8f8;
  }
  .newsdetail-bread-con{
    width: 980px;
    margin: 0 auto;
  }
  .newsdetail-read{
    padding: 64px 0 64px 121px;
    width: 839px;
    margin: 0 auto 34px;
    border-bottom: 1px solid #d6d6d6;
  }
  .newsdetail-read-p1{
    font-size: 14px;
    font-weight: 600;
    color: #f96006;
  }
  .newsdetail-read-p2{
    font-size: 14px;
    font-weight: 600;
    color: #888888;
  }
  .newsdetail-read-p3{
    width: 718px;
    font-size: 36px;
    font-weight: 600;
    text-align: center;
    color: #111111;
  }
  .newdetail-des-box{
    width: 954px;
    margin: 0 auto;
  }
  .newdetail-des-box-img{
    margin-bottom: 40px;
    width: 500px;
    height: 375px;
    margin-left: 220px;
  }
  .newdetail-des-page{
    margin: 40px auto 64px;
    width: 184px;
    height: 40px;
  }
  .newdetail-des-page>div{
    width: 78px;
    height: 40px;
    border-radius: 2px;
    float: left;
    border:1px solid #979797;
    text-align: center;
    line-height: 40px;
    cursor: pointer;
  }
  .newdetail-des-page-last{
    margin-right: 24px;
  }
</style>
