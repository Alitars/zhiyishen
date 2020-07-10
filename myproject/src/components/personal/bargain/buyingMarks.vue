<template>
  <div class="buyingMarks-container">
    <div class="buyingMarks-box">
      <!-- 主体 -->
      <div class="buyingMarks-min">
        <!-- 查询 -->
        <div class="buyingMarks-min-search">
          <span>商标名称</span>
          <input type="text" v-model="company">
          <span @click="search">查询</span>
          <!-- <span @click="resetting">重置</span> -->
        </div>
        <!-- 展示 -->
          <!-- 标题 -->
          <div class="buyingMarks-min-category">
            <ul>
              <li>
               商标图片
              </li>
              <li>类别</li>
              <li>卖家报价</li>
              <li>我的报价</li>
              <li>操作</li>
            </ul>
          </div>
          <!-- 后台渲染数据 -->
          <div class="buyingMarks-min-data" v-for="(v,k) in list" :key="k">
            <ul >
              <li><img :src="GLOBAL.base_url + v.brand_img" alt=""></li>
              <li>{{v.one_cate}}</li>
              <li>{{v.ask_price}}</li>
              <li>{{v.ask_price}}</li>
              <li>
                <span class="gray1" @click="del(v.id)">取消</span>
                <span class="gray1 fz12">|</span>
                <span class="gray" @click="see(v.brand_id)">查看详情</span>
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
    name:'buyingMarks ',
    data(){
      return{
        company:'',
        currentPage1:1,
        pageSize:10,
        total:0,
        list:[]
      }
    },
    methods:{
      //弹框
      tip(type,msg){
        return this.$message({
            type:type,
            message:msg,
            showClose:true,
            duration:2000
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
        this.$http.post(this.GLOBAL.base_url+'/api/brandConsultList',{
          user_id:this.$cookie.getCookie('u_id'),
          page:this.currentPage1,
          brand_name:this.company
        }).then(res => {
          // console.log(res)
          if(res.data.data.length == 0) {
            this.list = []
          }else {
            this.list = res.data.data
            this.total = res.data.count
          }
        })
      },
      del(val) {
        this.$confirm('此操作将永久删除此项商标, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$message(
            this.$http.post(this.GLOBAL.base_url+'/api/cancelAskbuy',{
              user_id:this.$cookie.getCookie('u_id'),
              b_id:val
            }).then(res => {
              this.tip('success','删除成功')
              this.getData()
            })
          );
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消'
          });
        });
      },
      // 跳转详情
      see(val) {
        this.$router.push({
                path:'/brandDetail',
                query:{
                id:val
              }
          })
      }
    },
    mounted(){
      this.getData()
    }
  }
</script>

<style scoped>
  .buyingMarks-box {
    min-height: 1108px;
    width: 1015px;
    float: left;
    margin: 12px 0 0 16px;
    box-sizing: border-box;
  }
  /* 主体 */
  .buyingMarks-min {
    width: 1015px;
    height: 960px;
    background-color: #fff;
    padding-top: 30px;
    box-sizing: border-box;
    position: relative;
  }
  /* 查询 */
  .buyingMarks-min  > .buyingMarks-min-search {
    margin-left: 30px;
    margin-bottom: 30px;
  }
  .buyingMarks-min  > .buyingMarks-min-search > span{
     font-family: "PingFangSC";
     font-size: 14px;
     margin-right: 20px;
  }
  .buyingMarks-min  > .buyingMarks-min-search > input{
     width: 230px;
     height: 32px;
     border-radius: 4px;
     border: solid 1px #d6d6d6;
     background-color:#fff;
     padding: 6px 0 6px 12px;
     box-sizing: border-box;
     margin-right: 30px;
  }
  .buyingMarks-min  > .buyingMarks-min-search > span:nth-child(3){
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
  .buyingMarks-min  > .buyingMarks-min-search > span:nth-child(4){
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
  .buyingMarks-min-category {
    width: 953px;
    height: 36px;
    background-color: #fafafa;
    margin: 0 auto;
    border: solid 1px #eeeeee;
    line-height: 36px;
  }
  .buyingMarks-min-category > ul {
    margin-left: 66px;
  }
  .buyingMarks-min-category > ul > li {
    float: left;
    font-family: "PingFangSC";
    font-size: 14px;
    font-weight: 600;
    color: #333;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }
  .buyingMarks-min-category > ul > li:first-child {
    margin-right: 99px;
    width: 60px;
  }
  .buyingMarks-min-category > ul > li:nth-child(2) {
    margin-right: 140px;
    width: 28px;
    text-align: center;
  }
  .buyingMarks-min-category > ul > li:nth-child(3) {
    margin-right: 127px;
    width: 78px;
    text-align: center;
  }
  .buyingMarks-min-category > ul > li:nth-child(4) {
    width: 78px;
    text-align: center;
    margin-right: 119px;
  }
  .buyingMarks-min-category > ul > li:nth-child(5) {
    width: 98px;
    text-align: center;
  }
  /* 后台渲染数据 */
  .buyingMarks-min-data {
    width: 953px;
    height: 68px;
    background-color: #fff;
    margin: 0 auto;
    border: solid 1px #eeeeee;
    line-height: 68px;
    border-top: none;
  }
  .buyingMarks-min-data > ul {
    margin-left: 66px;
  }
  .buyingMarks-min-data > ul > li {
    float: left;
    font-family: "PingFangSC";
    font-size: 14px;
    font-weight: 100;
    color: #333;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }
  .buyingMarks-min-data > ul > li:first-child {
    margin-right: 99px;
    width: 60px;
    height: 60px;
    margin-top: 4px;
    border:solid 1px #eeeeee;
    box-sizing: border-box;
  }
  .buyingMarks-min-data > ul > li:first-child > img{
    width: 60px;
    height: 60px;
  }
  .buyingMarks-min-data > ul > li:nth-child(2) {
    margin-right: 140px;
    width: 28px;
    text-align: center;
  }
  .buyingMarks-min-data > ul > li:nth-child(3) {
    margin-right: 127px;
    width: 78px;
    text-align: center;
  }
  .buyingMarks-min-data > ul > li:nth-child(4) {
    width: 78px;
    text-align: center;
    margin-right: 119px;
  }
  .buyingMarks-min-data > ul > li:nth-child(5) {
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
