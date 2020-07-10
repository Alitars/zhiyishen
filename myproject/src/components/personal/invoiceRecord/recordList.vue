<template>
  <div class="recordList-container">
      <div class="record-box">
        <div class="record-box-top" :class="changeClass">
          <span @click="changeType" class="span1111">商标发票记录</span>
          <span @click="changeType1" class="span2222">专利发票记录</span>
          <span @click="changeType2" class="span3333">版权发票记录</span>
        </div>
        <div class="record-box-list" v-show="is_show">
          <div class="record-box-list-title">
            <div>开票抬头</div>
            <div>开票金额</div>
            <div>开票状态</div>
            <div>申请开票时间</div>
            <div>操作</div>
          </div>
          <div class="record-box-list-detail">
            <div v-for="(v,k) in list" :key="k">
              <div :title="v.look_up">{{v.look_up}}</div>
              <div>￥{{v.invoice_money}}</div>
              <div>{{v.invoice_status}}</div>
              <div>{{v.create_time}}</div>
              <div @click="watchDetail(v.id,v.type)">查看详情</div>
            </div>
          </div>
          <div class="record-box-page">
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
        <!-- 专利 -->
        <div class="record-box-list" v-show="patent_show">
          <div class="record-box-list-title">
            <div>开票抬头</div>
            <div>开票金额</div>
            <div>开票状态</div>
            <div>申请开票时间</div>
            <div>操作</div>
          </div>
          <div class="record-box-list-detail">
            <div v-for="(v,k) in arr" :key="k">
              <div :title="v.name">{{v.name}}</div>
              <div>￥{{v.money}}</div>
              <div>{{v.status_name}}</div>
              <div>{{v.create_time}}</div>
              <div @click="watchDetail1(v.id)">查看详情</div>
            </div>
          </div>
          <div class="record-box-page">
            <el-pagination
              @size-change="handleSizeChange1"
              @current-change="handleCurrentChange1"
              :current-page="page"
              :page-size="len"
              layout="prev, pager, next"
              :total="total1">
          </el-pagination>
          </div>
        </div>
        <!-- 版权 -->
        <div class="record-box-list" v-show="copyright_show">
          <div class="record-box-list-title">
            <div>开票抬头</div>
            <div>开票金额</div>
            <div>开票状态</div>
            <div>申请开票时间</div>
            <div>操作</div>
          </div>
          <div class="record-box-list-detail">
            <div v-for="(v,k) in arr1" :key="k">
              <div :title="v.name">{{v.name}}</div>
              <div>￥{{v.money}}</div>
              <div>{{v.status_name}}</div>
              <div>{{v.create_time}}</div>
              <div @click="watchDetail2(v.id)">查看详情</div>
            </div>
          </div>
          <div class="record-box-page">
            <el-pagination
              @size-change="handleSizeChange2"
              @current-change="handleCurrentChange2"
              :current-page="page1"
              :page-size="len1"
              layout="prev, pager, next"
              :total="total2">
          </el-pagination>
          </div>
        </div>
      </div>
    <div style="clear:both;"></div>
  </div>
</template>

<script>
export default {
  name: 'recordList',
  data(){
    return{
      total:0,
      currentPage1: 1,
      pageSize: 10,
      list:[],
      changeClass:'order',
      is_show:true,
      // 专利
      len:10,
      page:1,
      arr:[],
      total1:0,
      patent_show:false,
      // 版权
      copyright_show:false,
      len1:10,
      page1:1,
      arr1:[],
      total2:0,
    }
  },
  components: {

  },
  methods:{
    watchDetail(val,val2){
      this.$router.push({
        path:'/personal/recordDetail',
        query:{
          id:val,
          edit:1,
          type:val2
        }
      })
    },
    watchDetail1(val){
      this.$router.push({
        path:'/personal/recordDetail',
        query:{
          id:val,
          edit:2
        }
      })
    },
    watchDetail2(val){
      this.$router.push({
        path:'/personal/recordDetail',
        query:{
          id:val,
          edit:3
        }
      })
    },
    getdata(){
      this.$http.post(this.GLOBAL.base_url+'/api/InvoiceApply/invoiceRecordList',{
                    user_id:this.$cookie.getCookie('u_id'),
                    page:this.currentPage1
              }).then(res=>{
                // console.log(res)
                if(res.data.code == "1"){
                  this.list = res.data.data;
                  this.total= res.data.count;
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
    changeType() {
      this.changeClass = 'order'
      this.is_show = true
      this.patent_show = false
      this.copyright_show = false
    },
    changeType1() {
      this.changeClass = 'patent'
      this.copyright_show = false
      this.patent_show = true
      this.is_show = false
      this.getPatent()
    },
    changeType2() {
      this.changeClass = 'copyright'
      this.copyright_show = true
      this.patent_show = false
      this.is_show = false
      this.getCopyright();
    },
    // 专利开票记录
    getPatent(){
      this.$http.post(this.GLOBAL.base_url+'/api/patent/invoicelist',{
        user_id:this.$cookie.getCookie('u_id'),
        page:this.page,
        len:this.len
      }).then(res => {
        // console.log(res)
        if(res.data.code == '1') {
          this.arr = res.data.data.data
          this.total1 = res.data.data.total
        }
      })
    },
    handleSizeChange1(val) {
              this.len = val;
              this.getPatent();
            },
    handleCurrentChange1(val) {
          this.page = val;
          this.getPatent();
    },
    // 版权开票记录
    getCopyright(){
      this.$http.post(this.GLOBAL.base_url+'/api/copyRight/invoicelist',{
        user_id:this.$cookie.getCookie('u_id'),
        page:this.page1,
        len:this.len1
      }).then(res => {
        // console.log(res)
        if(res.data.code == '1') {
          this.arr1 = res.data.data.data
          this.total2 = res.data.data.total
        }
      })
    },
    handleSizeChange2(val) {
              this.len1 = val;
              this.getCopyright();
            },
    handleCurrentChange2(val) {
          this.page1 = val;
          this.getCopyright();
    },
  },
  mounted(){
    this.getdata();
    this.getCopyright();
  }
}

</script>

<style scoped>
  .record-box{
    width: 1015px;
    float: left;
    margin: 12px 0 100px 16px;
    background-color: #fff;
    padding-top: 28px;
    min-height: 950px;
    box-sizing: border-box;
  }
  .record-box-top{
    width: 650px;
    margin: 0px 0px 12px 182px;
    border-bottom: 1px solid #eee;
    height: 28px;
    font-family: "PingFangSC";
    font-size: 14px;
    cursor: pointer;
    color: #666;
  }
  .record-box-top > span:nth-child(1) {
    margin-right: 55px;
    display: inline-block;
    height: 28px;
    line-height: 28px;
  }
  .record-box-top > span:nth-child(2) {
    margin-right: 55px;
    display: inline-block;
    height: 28px;
    line-height: 28px;
  }
  .record-box-top > span:nth-child(3) {
    margin-right: 55px;
    display: inline-block;
    height: 28px;
    line-height: 28px;
  }
  .order .span1111,.patent .span2222,.copyright .span3333 {
    color: #333;
    border-bottom: 1px solid #999;
    font-weight: 600;
  }
  .record-box-list-title{
    height: 36px;
    width: 655px;
    line-height: 36px;
    border:1px solid #eee;
    margin: 0 auto;
    background-color: #fafafa;
    box-sizing: border-box;
  }
  .record-box-list-title>div{
    width: 129px;
    text-align: center;
    float: left;
    font-family: "PingFangSC";
    font-size: 14px;
    font-weight: 600;
    color: #333333;
  }
  .record-box-list-detail{
    height: 490px;
    width: 655px;
    margin:0 auto;
  }
  .record-box-list-detail>div{
    height: 36px;
    line-height: 36px;
    border: 1px solid #eee;
    border-top: none;
    box-sizing: border-box;
  }
  .record-box-list-detail>div>div{
    float: left;
    width: 130px;
    text-align: center;
    font-family: "PingFangSC";
    font-size: 14px;
    font-weight: 100;
    color: #333333;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .record-box-list-detail>div>div:nth-of-type(5){
    color: #f96006;
    cursor: pointer;
  }
  .record-box-page{
    width: 400px;
    text-align: center;
    margin: 0 auto 50px;
  }
</style>
