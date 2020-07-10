<template>
  <div class="myPublish-container">
    <div class="myPublish-box">
      <!-- 主体 -->
      <div class="myPublish-min">
        <!-- 查询 -->
        <div class="myPublish-min-search">
          <span></span>
          <input type="text" v-model="company" placeholder="请输入商标名称或注册号">
          <span @click="search">查询</span>
          <!-- <span @click="resetting">重置</span> -->
        </div>
        <!-- 展示 -->
          <!-- 标题 -->
          <div class="myPublish-min-category">
            <ul>
              <li>
               商标图片
              </li>
              <li>类别</li>
              <li>注册号</li>
              <li>卖家报价</li>
              <li>操作</li>
            </ul>
          </div>
          <!-- 后台渲染数据 -->
          <div class="myPublish-min-data" v-for="(v,k) in list" :key="k">
            <ul>
              <li><img :src="GLOBAL.base_url + v.brand_img" alt=""></li>
              <li v-if="v.one_cate < 10">0{{v.one_cate}}</li>
              <li v-if="v.one_cate >= 10">{{v.one_cate}}</li>
              <li>{{v.reg_num}}</li>
              <li>￥{{v.price}}</li>
              <li>
                <span  class="gray2" @click="inquiry(v.id,v.one_cate,v.price,v.brand_name)">求购商标</span>
                <span class="gray1">|</span>
                <span class="gray1" @click="brandDetail(v.brand_id)">商标详情</span>
                <span class="gray1 fz12">|</span>
                <span class="gray" @click="del(v.id)">取消收藏</span>
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
    <!-- 求购咨询弹框 -->
    <div class="brandBuy-inquiry" v-if="inquiry_show">
      <div class="brandBuy-inquiry-box">
        <div @click="cha">
          <img src="/static/images/cha2.png" alt="">
        </div>
        <div>求购咨询</div>
        <div class="divSpan">
          <span>商标名称</span>
          <span>{{brand_name}}</span>
        </div>
        <div class="divSpan">
          <span>商标类别</span>
          <span>{{one_cate+'类'}}</span>
        </div>
        <div class="divSpan">
          <span>商标报价</span>
          <span>{{price}}</span>
        </div>
        <div class="divInput">
          <span>您的姓名</span>
          <input type="text" v-model="name">
        </div>
        <div class="divInput">
          <span>联系方式</span>
          <input type="text" v-model="telephone" onkeyup="value=this.value.replace(/\D+/g,'')" maxlength="11">
        </div>
        <div class="divInput">
          <span>您的报价</span>
          <input type="text" v-model="prices" onkeyup="value=value.replace(/[^\d{1,}\.\d{1,}|\d{1,}]/g,'')">
        </div>
        <p class="brandBuy-p">注：提交后，将有我们专业人员联系您</p>
        <P class="brandBuy-p1" @click="submit">提交</P>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name:'myPublish ',
    data(){
      return{
        company:'',
        currentPage1:1,
        pageSize:10,
        total:0,
        inquiry_show:false,
        list:[],
        c_id:'',
        name:'',
        prices:'',
        telephone:'',
        brand_name:'',
        one_cate:'',
        price:''
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
      },
      handleCurrentChange(val){
        this.currentPage1 = val
      },
      // 求购质询弹框
      inquiry(val,val1,val2,val3){
        this.inquiry_show = true
        this.brand_name = val3
        this.c_id = val
        this.one_cate = val1
        this.price = val2
      },
      cha(){
        this.inquiry_show = false
      },
      getData() {
         this.$http.post(this.GLOBAL.base_url+'/api/brandCollectList',{
           keyword:this.company,
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
      // 提交
      submit() {
        if(this.name == '') {
          this.tip('error','请填写您的名字')
        }else if(this.telephone == '') {
          this.tip('error','请填写您的联系方式')
        }else if(this.prices == '') {
          this.tip('error','请填写您的报价')
        }else {
          this.$http.post(this.GLOBAL.base_url+'/api/addConsult',{
            user_id:this.$cookie.getCookie('u_id'),
            b_id:this.c_id,
            name:this.name,
            contact_way:this.telephone,
            price:this.prices
          }).then(res => {
            // console.log(res)
            if(res.data.code == 1) {
              this.tip('success','您已提交成功！')
              this.inquiry_show = false
              this.name = ''
              this.telephone = ''
              this.prices = ''
            }
            if(res.data.code == 0) {
              this.tip('erroe',res.data.msg)
              this.inquiry_show = false
              this.name = ''
              this.telephone = ''
              this.prices = ''
            }
          })
        }
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
      // 取消
      del(val) {
        this.$confirm('此操作将取消此项商标的收藏, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$message(
            this.$http.post(this.GLOBAL.base_url+'/api/delBrandCollect',{
              user_id:this.$cookie.getCookie('u_id'),
              type:2,
              n_id:val,
            }).then(res => {
              this.tip('success','取消成功')
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
    },
    mounted() {
      this.getData()
    }
  }
</script>

<style scoped>
  .myPublish-box {
    min-height: 1108px;
    width: 1015px;
    float: left;
    margin: 12px 0 0 16px;
    position: relative;
    box-sizing: border-box;
  }
  /* 主体 */
  .myPublish-min {
    width: 1015px;
    height: 960px;
    background-color: #fff;
    padding-top: 30px;
    box-sizing: border-box;
    position: relative;
  }
  /* 查询 */
  .myPublish-min  > .myPublish-min-search {
    margin-left: 30px;
    margin-bottom: 30px;
  }
  .myPublish-min  > .myPublish-min-search > span{
     font-family: "PingFangSC";
     font-size: 14px;
     margin-right: 20px;
  }
  .myPublish-min  > .myPublish-min-search > input{
     width: 230px;
     height: 32px;
     border-radius: 4px;
     border: solid 1px #d6d6d6;
     background-color:#fff;
     padding: 6px 0 6px 12px;
     box-sizing: border-box;
     margin-right: 30px;
  }
  .myPublish-min  > .myPublish-min-search > span:nth-child(3){
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
  .myPublish-min  > .myPublish-min-search > span:nth-child(4){
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
  .myPublish-min-category {
    width: 953px;
    height: 36px;
    background-color: #fafafa;
    margin: 0 auto;
    border: solid 1px #eeeeee;
    line-height: 36px;
  }
  .myPublish-min-category > ul {
    margin-left: 66px;
  }
  .myPublish-min-category > ul > li {
    float: left;
    font-family: "PingFangSC";
    font-size: 14px;
    font-weight: 600;
    color: #333;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }
  .myPublish-min-category > ul > li:first-child {
    margin-right: 99px;
    width: 60px;
  }
  .myPublish-min-category > ul > li:nth-child(2) {
    margin-right: 130px;
    width: 28px;
    text-align: center;
  }
  .myPublish-min-category > ul > li:nth-child(3) {
    margin-right: 103px;
    width: 72px;
    text-align: center;
  }
  .myPublish-min-category > ul > li:nth-child(4) {
    width: 78px;
    text-align: center;
    margin-right: 96px;
  }
  .myPublish-min-category > ul > li:nth-child(5) {
    width: 192px;
    text-align: center;
  }
  /* 后台渲染数据 */
  .myPublish-min-data {
    width: 953px;
    height: 68px;
    background-color: #fff;
    margin: 0 auto;
    border: solid 1px #eeeeee;
    line-height: 68px;
    border-top: none;
  }
  .myPublish-min-data > ul {
    margin-left: 66px;
  }
  .myPublish-min-data > ul > li {
    float: left;
    font-family: "PingFangSC";
    font-size: 14px;
    font-weight: 100;
    color: #333;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }
  .myPublish-min-data > ul > li:first-child {
    margin-right: 99px;
    width: 60px;
    height: 60px;
    margin-top: 4px;
    border:solid 1px #eeeeee;
    box-sizing: border-box;
  }
  .myPublish-min-data > ul > li:first-child > img{
    width: 60px;
    height: 60px;
  }
  .myPublish-min-data > ul > li:nth-child(2) {
    margin-right: 130px;
    width: 28px;
    text-align: center;
  }
  .myPublish-min-data > ul > li:nth-child(3) {
    margin-right: 103px;
    width: 72px;
    text-align: center;
  }
  .myPublish-min-data > ul > li:nth-child(4) {
    width: 78px;
    text-align: center;
    margin-right:96px;
  }
  .myPublish-min-data > ul > li:nth-child(5) {
    width: 192px;
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
  .gray2 {
    color: #d0021b;
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
  /* 求购咨询弹框 */
  .brandBuy-inquiry {
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.8);
    position: absolute;
    top: 0;
  }
  .brandBuy-inquiry-box {
    width: 600px;
    height: 502px;
    background-color: #fff;
    margin: -190px 0 0 -300px ;
    position: fixed;
    top: 50%;
    left: 50%;
    z-index: 9999;
    padding: 17px 16px 0 0;
  }
  .brandBuy-inquiry-box > div:nth-child(1) {
    float: right;
    cursor: pointer;
    height: 14px;
  }
  .brandBuy-inquiry-box > div:nth-child(2) {
    text-align: center;
    margin-top: 14px;
    margin-bottom: 22px;
  }
  .divSpan {
    margin-left: 106px;
    margin-bottom: 36px;
  }
  .divSpan > span:nth-child(1) {
    margin-right: 16px;
    font-size: 14px;
    color: #333;
  }
  .divSpan > span:nth-child(2) {
    font-size: 14px;
    color: #333;
    font-weight: 300;
  }
  .divInput {
    margin-left: 106px;
    height: 24px;
    line-height: 24px;
    margin-bottom: 24px;
  }
  .divInput > span:nth-child(1) {
    margin-right: 16px;
    font-size: 14px;
    color: #333;
  }
  .divInput > input {
    width: 300px;
    height: 32px;
    border-radius: 4px;
    border: solid 1px #d6d6d6;
    padding: 0 10px;
    box-sizing: border-box;
  }
  .brandBuy-p {
    font-size: 10px;
    text-align: center;
    color: #f96006;
    margin-bottom: 16px;
  }
  .brandBuy-p1 {
    font-size: 14px;
    text-align: center;
    width: 108px;
    height: 36px;
    line-height: 36px;
    border-radius: 4px;
    margin: 0 auto;
    background-color: #f96006;
    color: #fff;
    cursor: pointer;
  }
</style>
