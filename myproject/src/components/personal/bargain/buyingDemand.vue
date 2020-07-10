<template>
  <div class="buyingDemand-container">
    <div class="buyingDemand-box">
      <!-- 主体 -->
      <div class="buyingDemand-min">
        <!-- 查询 -->
        <div class="buyingDemand-min-search">
          <span>商标类别</span>
          <select v-model="chose" @change="consult">
            <option value="0">不限</option>
            <option v-for="(v,k) in classData" :key="k" v-show="v.id < 10" :value="v.id">0{{v.id+'类'+v.name}}</option>
            <option v-for="(v,k) in classData" :key="k" v-show="v.id >= 10" :value="v.id">{{v.id+'类'+v.name}}</option>
          </select>
          <!-- <span>商标元素</span>
          <select >
            <option value="0">不限</option>
          </select> -->
          <span @click="inquiry1">求购商标</span>
        </div>
        <!-- 展示 -->
          <!-- 标题 -->
          <div class="buyingDemand-min-category">
            <ul>
              <li>
               商标类别
              </li>
              <!-- <li>商标元素</li> -->
              <li>我的预算</li>
              <li>发布日期</li>
              <li>操作</li>
            </ul>
          </div>
          <!-- 后台渲染数据 -->
          <div class="buyingDemand-min-data" v-for="(v,k) in list" :key="k">
            <ul>
              <li v-if="v.one_cate < 10">0{{v.one_cate}}</li>
              <li v-if="v.one_cate >= 10">{{v.one_cate}}</li>
              <!-- <li>35</li> -->
              <li>{{v.budget_price}}</li>
              <li>{{v.create_time}}</li>
              <li>
                <span class="gray1" @click="del1(v.id)">取消</span>
                <span class="gray1 fz12">|</span>
                <span class="gray" @click="inquiry(v.id,v.one_cate)">修改</span>
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
    <!-- 修改需求 -->
    <div class="brandBuy-inquiry" v-if="inquiry_show">
      <div class="brandBuy-inquiry-box">
        <div @click="cha">
          <img src="/static/images/cha2.png" alt="">
        </div>
        <div>修改需求</div>
        <div class="divInput">
          <span>商标类别</span>
          <select class="mb24" v-model="chose3">
            <option v-for="(v,k) in classData" :key="k" v-show="v.id  == one_cate" :value="v.id">{{one_cate+'类'+v.name}}</option>
            <option v-for="(v,k) in classData" :key="k" v-show="v.id < 10" :value="v.id">0{{v.id+'类'+v.name}}</option>
            <option v-for="(v,k) in classData" :key="k" v-show="v.id >= 10" :value="v.id">{{v.id+'类'+v.name}}</option>
          </select>
        </div>
        <!-- <div class="divSpan">
          <span>商标元素</span>
          <span>果老</span>
        </div> -->
        <div class="divInput">
          <span>我的预算</span>
          <select class="mb24" v-model="chose4">
            <option v-for="(v,k) in priceData" :key="k" :value="v">{{v}}</option>
          </select>
        </div>
        <div>
          <P class="brandBuy-p1" @click="keep">保存</P>
          <P class="p2 brandBuy-p1" @click="del">取消</P>
        </div>
      </div>
    </div>
    <!-- 求购咨询弹框 -->
    <div class="brandBuy-inquiry" v-if="inquiry1_show">
      <div class="brandBuy-inquiry-box">
        <div @click="cha">
          <img src="/static/images/cha2.png" alt="">
        </div>
        <div>求购商标</div>
        <div class="divInput">
          <span>您的姓名</span>
          <input type="text" class="mb24" v-model="surname1">
        </div>
        <div class="divInput" >
          <span>联系方式</span>
          <input type="text" class="mb24" v-model="phone1" maxlength="11" onkeyup="value=value.replace(/[^\d\-\d]/g,'')">
        </div>
        <!-- <div class="divInput">
          <span>商标元素</span>
          <select class="mb24">
            <option value="0">不限</option>
          </select>
        </div> -->
        <div class="divInput">
          <span>商标类别</span>
          <select class="mb24" v-model="chose2">
            <option v-for="(v,k) in classData" :key="k" v-show="v.id < 10" :value="v.id">0{{v.id+'类'+v.name}}</option>
            <option v-for="(v,k) in classData" :key="k" v-show="v.id >= 10" :value="v.id">{{v.id+'类'+v.name}}</option>
          </select>
        </div>
        <div class="divInput">
          <span>您的报价</span>
          <select class="mb24" v-model="chose1">
            <option v-for="(v,k) in priceData" :key="k" :value="v">{{v}}</option>
          </select>
        </div>
        <p class="brandBuy-p">注：提交后，将有我们专业人员联系您</p>
        <P class="brandBuy-p2" @click="submit1">提交</P>
      </div>
    </div>
    <div style="clear:both"></div>
  </div>
</template>

<script>
  export default {
    name:'buyingDemand ',
    data(){
      return{
        company:'',
        currentPage1:1,
        pageSize:10,
        total:10,
        inquiry_show:false,
        inquiry1_show:false,
        classData:[],
        priceData:[],
        list:[],
        chose:'0',
        surname1:'',
        phone1:'',
        chose1:'不限',
        chose2:'1',
        n_id:'',
        chose4:'不限',
        chose3:'',
        one_cate:''
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
      // 分页
      handleSizeChange(val){
        this.pageSize = val;
        this.getData()
      },
      handleCurrentChange(val){
        this.currentPage1 = val
        this.getData()
      },
      // 求购质询弹框
      inquiry(val,val1){
        this.inquiry_show = true
        this.n_id = val

        if(val1 >= 10) {
          this.one_cate = val1
          this.chose3 = this.one_cate
        }
        if(val1 < 10) {
          this.one_cate = '0' + val1
          this.chose3 = val1
        }
      },
      inquiry1(){
        this.inquiry1_show = true
      },
      cha(){
        this.inquiry_show = false
        this.inquiry1_show = false
        this.phone1 = ''
        this.chose1 = '不限'
        this.chose2 = '1'
        this.surname1 = ''
      },
      del() {
        this.inquiry_show = false
      },
      getData(){
        this.$http.post(this.GLOBAL.base_url+'/api/brandNeedlist',{
          user_id:this.$cookie.getCookie('u_id'),
          one_cate:this.chose,
          page:this.currentPage1
        }).then(res => {
          // console.log(res)
          this.classData = res.data.oneCate
          this.priceData = res.data.priceSection
          if(res.data.data.length == 0) {
            this.list = []
          }else {
            this.list = res.data.data
            this.total = res.data.count
          }
        })
      },
      submit1() {
        if(this.surname1 == '') {
          this.tip('error','请填写您的名字')
        }else if (this.phone1 == '') {
          this.tip('error','请填写您的联系方式')
        }else {
          this.$http.post(this.GLOBAL.base_url+'/api/addBrandNeed',{
            user_id:this.$cookie.getCookie('u_id'),
            one_cate:this.chose2,
            name:this.surname1,
            contact_way:this.phone1,
            budget_price:this.chose1
          }).then(res => {
            if(res.data.code == 1) {
              this.tip('success','您已提交成功！')
              this.phone1 = ''
              this.chose1 = '不限'
              this.chose2 = '1'
              this.surname1 = ''
              this.inquiry1_show = false
              this.getData()
            }
          })
        }
      },
      consult() {
        this.currentPage1 = 1
        this.getData()
      },
      keep(){
        this.$http.post(this.GLOBAL.base_url+'/api/editBrandNeed',{
          user_id:this.$cookie.getCookie('u_id'),
          n_id:this.n_id,
          one_cate:this.chose3,
          budget_price:this.chose4
        }).then(res => {
          this.tip('success','您已修改成功！')
          this.chose3 = 1
          this.chose4 = '不限'
          this.getData()
          this.inquiry_show = false

        })
      },
      del1(val) {
        this.$confirm('此操作将永久删除此项商标, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$message(
            this.$http.post(this.GLOBAL.base_url+'/api/delBrandNeed',{
              user_id:this.$cookie.getCookie('u_id'),
              n_id:val
            }).then(res => {
              this.tip('success','取消成功')
              this.getData()
            })
          );
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消'
          });
        });

      }
    },
    mounted(){
      this.getData()
    }
  }
</script>

<style scoped>
  .buyingDemand-box {
    min-height: 1108px;
    width: 1015px;
    float: left;
    margin: 12px 0 0 16px;
    box-sizing: border-box;
  }
  /* 主体 */
  .buyingDemand-min {
    width: 1015px;
    height: 960px;
    background-color: #fff;
    padding-top: 30px;
    box-sizing: border-box;
    position: relative;
  }
  /* 查询 */
  .buyingDemand-min  > .buyingDemand-min-search {
    margin-left: 30px;
    margin-bottom: 30px;
  }
  .buyingDemand-min  > .buyingDemand-min-search > span{
     font-family: "PingFangSC";
     font-size: 14px;
     margin-right: 20px;
  }
  .buyingDemand-min  > .buyingDemand-min-search > select{
     width: 230px;
     height: 32px;
     border-radius: 4px;
     border: solid 1px #d6d6d6;
     background-color:#fff;
     padding: 6px 0 6px 12px;
     box-sizing: border-box;
     margin-right: 30px;
  }
  .buyingDemand-min  > .buyingDemand-min-search > span:nth-child(3){
     margin-left: 525px;
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
  /* .buyingDemand-min  > .buyingDemand-min-search > span:nth-child(4){
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
  } */
  /* 展示 */
  /* 标题 */
  .buyingDemand-min-category {
    width: 953px;
    height: 36px;
    background-color: #fafafa;
    margin: 0 auto;
    border: solid 1px #eeeeee;
    line-height: 36px;
  }
  .buyingDemand-min-category > ul {
    margin-left: 66px;
  }
  .buyingDemand-min-category > ul > li {
    float: left;
    font-family: "PingFangSC";
    font-size: 14px;
    font-weight: 600;
    color: #333;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }
  .buyingDemand-min-category > ul > li:first-child {
    margin-right: 185px;
    width: 56px;
    text-align: center;
  }
  /* .buyingDemand-min-category > ul > li:nth-child(2) {
    margin-right: 121px;
    width: 56px;
    text-align: center;
  } */
  .buyingDemand-min-category > ul > li:nth-child(2) {
    margin-right: 185px;
    width: 86px;
    text-align: center;
  }
  .buyingDemand-min-category > ul > li:nth-child(3) {
    width: 76px;
    text-align: center;
    margin-right: 185px;
  }
  .buyingDemand-min-category > ul > li:nth-child(4) {
    width: 68px;
    text-align: center;
  }
  /* 后台渲染数据 */
  .buyingDemand-min-data {
    width: 953px;
    height: 68px;
    background-color: #fff;
    margin: 0 auto;
    border: solid 1px #eeeeee;
    line-height: 68px;
    border-top: none;
  }
  .buyingDemand-min-data > ul {
    margin-left: 66px;
  }
  .buyingDemand-min-data > ul > li {
    float: left;
    font-family: "PingFangSC";
    font-size: 14px;
    font-weight: 100;
    color: #333;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }
  .buyingDemand-min-data > ul > li:first-child {
    margin-right: 185px;
    width: 56px;
    text-align: center;
  }
  /* .buyingDemand-min-data > ul > li:nth-child(2) {
    margin-right: 121px;
    width: 56px;
    text-align: center;
  } */
  .buyingDemand-min-data > ul > li:nth-child(2) {
    margin-right: 185px;
    width: 86px;
    text-align: center;
  }
  .buyingDemand-min-data > ul > li:nth-child(3) {
    width: 76px;
    text-align: center;
    margin-right: 185px;
  }
  .buyingDemand-min-data > ul > li:nth-child(4) {
    width: 70px;
    text-align: center;
    cursor: pointer;
    font-weight: 100;
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
    height: 446px;
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
    height: 32px;
    line-height: 32px;
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
  .divInput > select {
    width: 300px;
    height: 32px;
    border-radius: 4px;
    border: solid 1px #d6d6d6;
    padding: 0 10px;
    box-sizing: border-box;
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
    float: left;
    margin-left: 131px;
    margin-top: 40px;
    cursor: pointer;
  }
  .p2 {
    margin-left: 137px;
    width: 108px;
    height: 36px;
    border-radius: 4px;
    background-color: #fbefe9;
    border: solid 1px #f96006;
    color: #f96006;
    line-height: 36px;
    text-align: center;
  }
  .brandBuy-p {
    font-size: 10px;
    text-align: center;
    color: #f96006;
    margin-bottom: 16px;
  }
  .brandBuy-p2 {
    font-size: 14px;
    text-align: center;
    width: 108px;
    height: 36px;
    line-height: 36px;
    border-radius: 4px;
    margin: 0 auto;
    background-color: #f96006;
    color: #fff;
  }
  .mb24 {
    margin-bottom: 24px;
  }
</style>
