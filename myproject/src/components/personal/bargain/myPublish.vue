<template>
  <div class="myFavorite-container">
    <div class="myFavorite-box">
      <!-- 主体 -->
      <div class="myFavorite-min">
        <!-- 查询 -->
        <div class="myFavorite-min-search">
          <span>商标名称</span>
          <input type="text" v-model="company">
          <span @click="search">查询</span>
          <!-- <span @click="resetting">重置</span> -->
        </div>
        <!-- 展示 -->
          <!-- 标题 -->
          <div class="myFavorite-min-category">
            <ul>
              <li>
               商标图片
              </li>
              <li>类别</li>
              <li>我的报价</li>
              <li>发布时间</li>
              <li>操作</li>
            </ul>
          </div>
          <!-- 后台渲染数据 -->
          <div class="myFavorite-min-data" v-for="(v,k) in list" :key="k">
            <ul>
              <li @click="brandDetail(v.id)"><img :src="GLOBAL.base_url + v.brand_img" alt=""></li>
              <li v-if="v.one_cate < 10">0{{v.one_cate}}</li>
              <li v-if="v.one_cate >= 10">{{v.one_cate}}</li>
              <li v-if="showId != k">￥{{v.price}}</li>
              <li v-if="showId == k">
                <span>￥</span>
                <input type="text" v-model="after_price">
              </li>
              <li>{{v.create_time}}</li>
              <li>
                <span class="gray1" @click="del(v.id)">下架</span>
                <span class="gray1 fz12">|</span>
                <span class="gray" v-if="showId != k" @click="regulation(v.id,v.price,k)">调整报价</span>
                <span class="gray" v-if="showId == k" @click="regulation1(v.id,v.price,k)">确定报价</span>
              </li>
            </ul>
          </div>
        <!-- 分页 -->
        <div class="block">
          <el-pagination
             @size-change="handleSizeChange"
             @current-change="handleCurrentChange"
             :current-page="currentPage1"
             :page-size="pageSize"
             layout="total,prev, pager, next"
             :total="total">
          </el-pagination>
        </div>
      </div>
    </div>
    <div style="clear:both"></div>
  </div>
</template>

<script>
  export default {
    name:'myFavorite ',
    data(){
      return{
        company:'',
        currentPage1:1,
        pageSize:10,
        total:0,
        list:[],
        input_show:false,
        after_price:'',
        showId:-1
      }
    },
    methods:{
      //弹框
      tip(type,msg){
        return this.$message({
            type:type,
            message:msg,
            showClose:true,
            duration:3000
        })
      },
      search(){
        this.currentPage1 = 1
        this.getData()
      },
      // 分页
      handleSizeChange(val){
        this.pageSize = val;
        this.getData()
      },
      handleCurrentChange(val){
        this.currentPage1 = val
        this.getData()
      },
      getData() {
         this.$http.post(this.GLOBAL.base_url+'/api/myIssue',{
           brand_name:this.company,
           user_id:this.$cookie.getCookie('u_id'),
           page:this.currentPage1
         }).then(res => {
          //  console.log(res)
            if(res.data.data.length == 0) {
              this.list = []
            }else {
              this.list = res.data.data
              this.total = res.data.count
            }
         })
      },
      del(val) {
        this.$confirm('此操作下架此项商标, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$message(
            this.$http.post(this.GLOBAL.base_url+'/api/myBrandSoldout',{
              user_id:this.$cookie.getCookie('u_id'),
              b_id:val
            }).then(res => {
              this.tip('success','下架成功')
              this.getData()
            })
          );
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消下架'
          });
        });
      },
      // 跳转详情
      brandDetail(val) {
        this.$router.push({
                path:'/brandDetail',
                query:{
                id:val
              }
          })
      },
      regulation(val,val1,val2) {
        this.showId = val2
        this.after_price = val1
      },
      regulation1(val,val1,val2) {
         this.$http.post(this.GLOBAL.base_url+'/api/myIssueEditPrice',{
           user_id:this.$cookie.getCookie('u_id'),
           b_id:val,
           after_price:this.after_price
         }).then(res => {
          this.showId = -1
          this.getData()
         })
      }
    },
    mounted() {
      this.getData()
    }
  }
</script>

<style scoped>
  .myFavorite-box {
    min-height: 1108px;
    width: 1015px;
    float: left;
    margin: 12px 0 0 16px;
    box-sizing: border-box;
  }
  /* 主体 */
  .myFavorite-min {
    width: 1015px;
    height: 960px;
    background-color: #fff;
    padding-top: 30px;
    box-sizing: border-box;
    position: relative;
  }
  /* 查询 */
  .myFavorite-min  > .myFavorite-min-search {
    margin-left: 30px;
    margin-bottom: 30px;
  }
  .myFavorite-min  > .myFavorite-min-search > span{
     font-family: "PingFangSC";
     font-size: 14px;
     margin-right: 20px;
  }
  .myFavorite-min  > .myFavorite-min-search > input{
     width: 230px;
     height: 32px;
     border-radius: 4px;
     border: solid 1px #d6d6d6;
     background-color:#fff;
     padding: 6px 0 6px 12px;
     box-sizing: border-box;
     margin-right: 30px;
  }
  .myFavorite-min  > .myFavorite-min-search > span:nth-child(3){
     margin-right: 25px;
     width: 80px;
     height: 32px;
     border-radius: 4px;
     background-color:#f96006;
     display: inline-block;
     line-height: 32px;
     text-align: center;
     color: #fff;
     cursor: pointer;
  }
  .myFavorite-min  > .myFavorite-min-search > span:nth-child(4){
     width: 80px;
     height: 32px;
     border-radius: 4px;
     border: solid 1px #f96006;
     background-color:#fbefe9;
     display: inline-block;
     line-height: 32px;
     text-align: center;
     cursor: pointer;
     color: #f96006;
  }
  /* 展示 */
  /* 标题 */
  .myFavorite-min-category {
    width: 953px;
    height: 36px;
    background-color: #fafafa;
    margin: 0 auto;
    border: solid 1px #eeeeee;
    line-height: 36px;
  }
  .myFavorite-min-category > ul {
    margin-left: 66px;
  }
  .myFavorite-min-category > ul > li {
    float: left;
    font-family: "PingFangSC";
    font-size: 14px;
    font-weight: 600;
    color: #333;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }
  .myFavorite-min-category > ul > li:first-child {
    margin-right: 99px;
    width: 60px;
  }
  .myFavorite-min-category > ul > li:nth-child(2) {
    margin-right: 140px;
    width: 28px;
    text-align: center;
  }
  .myFavorite-min-category > ul > li:nth-child(3) {
    margin-right: 98px;
    width: 116px;
    text-align: center;
  }
  .myFavorite-min-category > ul > li:nth-child(4) {
    width: 125px;
    text-align: center;
    margin-right: 119px;
  }
  .myFavorite-min-category > ul > li:nth-child(5) {
    width: 98px;
    text-align: center;
  }
  /* 后台渲染数据 */
  .myFavorite-min-data {
    width: 953px;
    height: 68px;
    background-color: #fff;
    margin: 0 auto;
    border: solid 1px #eeeeee;
    line-height: 68px;
    border-top: none;
  }
  .myFavorite-min-data > ul {
    margin-left: 66px;
  }
  .myFavorite-min-data > ul > li {
    float: left;
    font-family: "PingFangSC";
    font-size: 14px;
    font-weight: 100;
    color: #333;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }
  .myFavorite-min-data > ul > li:first-child {
    margin-right: 99px;
    width: 60px;
    height: 60px;
    margin-top: 4px;
    border:solid 1px #eeeeee;
    box-sizing: border-box;
    cursor: pointer;
  }
  .myFavorite-min-data > ul > li:first-child > img{
    width: 60px;
    height: 60px;
  }
  .myFavorite-min-data > ul > li:nth-child(2) {
    margin-right: 140px;
    width: 28px;
    text-align: center;
  }
  .myFavorite-min-data > ul > li:nth-child(3) {
    margin-right: 98px;
    width: 116px;
    text-align: center;
  }
  .myFavorite-min-data > ul > li:nth-child(3) > input{
    width: 80px;
    height: 32px;
    border-radius: 4px;
    border: solid 1px #d6d6d6;
    background-color: #fff;
  }
  .myFavorite-min-data > ul > li:nth-child(4) {
    width: 125px;
    text-align: center;
    margin-right: 119px;
  }
  .myFavorite-min-data > ul > li:nth-child(5) {
    width: 98px;
    text-align: center;
    cursor: pointer;
    position: relative;
  }
  .gray {
    color: #f96006 !important;
  }
  .gray1 {
    color: #4a90e2 !important;
  }
  .fz12 {
    font-size: 16px;
  }
  /* 分页 */
  .block {
    position: absolute;
    bottom: 46px;
    right: 16px;
  }
</style>
