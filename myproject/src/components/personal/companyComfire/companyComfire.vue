<template>
  <div class="companyComfire-container">
      <div class="companyComfire-box">
        <div class="companyComfire-box-wrap">
          <!-- 列表头部 -->
            <div class="companyComfire-box-wrap-top">
                <span>公司名称</span>
                <!-- <span>姓名</span> -->
                <!-- <span>性别</span> -->
                <span>类型</span>
                <span>手机号码</span>
                <span>审核状态</span>
                <span>操作</span>
                <span>备注</span>
            </div>
            <!-- 列表详情 -->
            <div class="companyComfire-box-wrap-middle">
              <div v-for="(v,k) in dataList" :key="k">
                <div class="companyComfire-box-wrap-middle-div1" :title="v.company_name">{{v.company_name}}</div>
                <!-- <div class="companyComfire-box-wrap-middle-div2">{{v.referee}}</div>
                <div class="companyComfire-box-wrap-middle-div3">{{v.sex ==  1 ?"男":"女"}}</div> -->
                <div class="companyComfire-box-wrap-middle-div4">{{types[v.type]}}</div>
                <div class="companyComfire-box-wrap-middle-div5">{{v.mobile}}</div>
                <div class="companyComfire-box-wrap-middle-div6" v-if="v.status != '1' ">{{status[v.status]}}</div>
                <div class="companyComfire-box-wrap-middle-div7" v-if="v.status == '1' || v.status == '3'">
                    <span @click="companylook(v.id)">修改</span><span @click="delcompanyauther(v.id)">/删除</span>
                </div>
                <div class="companyComfire-box-wrap-middle-div7" v-if="v.status == '2'">
                    <span @click="companylook(v.id)">查看</span><span @click="importtrade(v.id)">/导入商标</span>
                </div>
                <div class="companyComfire-box-wrap-middle-div8" :title="v.remark" v-if="v.status == '3'" >{{v.remark}}</div>
              </div>
            </div>
            <!-- 分页 -->
            <div class="companyComfire-box-wrap-block">
                <el-pagination
                  @size-change="handleSizeChange"
                  @current-change="handleCurrentChange"
                  :current-page="currentPage1"
                  :page-size="pageSize"
                  layout="prev, pager, next"
                  :total="total">
                </el-pagination>
            </div>
            <!-- 申请 -->
            <div class="companyComfire-box-wrap-img">
              <!-- 修改后 -->
              <span  @click="companyapply">申请</span>
              <!-- 修改前 -->
              <!-- <img @click="companyapply" src="/static/images/apply.png" alt=""> -->
            </div>
        </div>
    </div>
    <el-dialog
            title="提示"
            :visible.sync="dialogVisible"
            :append-to-body="true"
            width="30%">
            <span>请确认删除该条认证吗？</span>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="confireQuit">确 定</el-button>
            </span>
            </el-dialog>
    <div style="clear:both;"></div>
  </div>
</template>

<script>
export default {
  name: 'companyComfire',
  data(){
    return{
      total:0,
      currentPage1: 1,
      pageSize: 5,
      id:'',
      dataList:[],
      types:{
        '1': '个体工商户',
        '2': '国内企业',
        '3': '港澳企业',
        '4': '台湾企业',
        '5': '国外企业'
      },
      status:{
        '1': '未审核',
        '2': '已审核',
        '3': '驳回'
      },
      dialogVisible: false,
    }
  },
  components: {
  },
  methods:{
    tip(type,msg){
          return this.$message({
              type:type,
              message:msg,
              showClose:true,
              duration:2000
          })
      },
    companyapply(){
      this.$router.push('/personal/companyForm')
    },
    getcompanyList(){
      this.$http.get(this.GLOBAL.base_url+"/api/authentication/business",{params:{
        user_id:this.$cookie.getCookie('u_id'),
        page:this.currentPage1
      }}).then(res=>{
        // console.log(res)
        if(res.data.code == "1"){
          this.total = res.data.others;
          this.dataList = res.data.data;
        }
      })
    },
    importtrade(val){
      const loading = this.$loading({
        lock: true,
        text: '正在导入中',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.3)'
      });
      this.$http.get(this.GLOBAL.base_url+"/app/businessBrand",{params:{
        user_id:this.$cookie.getCookie('u_id'),
        b_id:val
      }}).then(res=>{
        if(res.data.code == "1"){
          loading.close();
          this.tip('success',res.data.msg)
        }else{
          loading.close();
          this.tip('error',res.data.msg)
        }
      })
    },
    handleSizeChange(val) {
        this.pageSize = val;
        this.getcompanyList();
      },

    handleCurrentChange(val) {
        this.currentPage1 = val;
        this.getcompanyList();
    },
        delcompanyauther(e){
      this.id = e;
      this.dialogVisible = true;
    },
        confireQuit(){
          this.$http.get(this.GLOBAL.base_url+"/api/authentication/delbusiness",{params:{
            id:this.id
          }}).then(res=>{
            this.dialogVisible = false;
            if(res.data.code == "1"){
              if(this.dataList.length>1){
                this.pageNum = Number(localStorage.getItem('companypagination')) || 1;
              }else{
                this.pageNum = Number(localStorage.getItem('companypagination'))-1 || 1;
              }
              this.pageChange(this.pageNum);
              this.tip('success',res.data.msg)
              this.getcompanyList();
              // this.$router.go(0);
            }else{
                    this.dialogVisible = false;
                    this.tip('error',res.data.msg)
            }
          })
        },
        pageChange (pageNum) {
          this.currentPage1 = pageNum;
      },
      companylook(id){
        this.$router.push({
          path: '/personal/companyForm',
          query:{
            id:id
          }
        })
      }
  },
  created() {
      this.currentPage1 = Number(localStorage.getItem('companypagination')) || 1;
      this.pageChange(this.currentPage1);
      this.getcompanyList();
    },
    beforeUpdate () {
          localStorage.setItem('companypagination', this.currentPage1);
      },
      beforeDestroy () {
          localStorage.setItem('companypagination', '1');
      }
}

</script>

<style scoped>
  .companyComfire-box{
    width: 1015px;
    float: left;
    margin: 12px 0 0 16px;
    background-color: #fff;
    padding-top: 28px;
    min-height: 950px;
    box-sizing: border-box;
  }
  .companyComfire-box-wrap{
    width: 746px;
    margin: 0 auto;
  }
  .companyComfire-box-wrap-top{
    height: 36px;
    line-height: 36px;
    border: 1px solid #d8d8d8;
    background-color: #fafafa;
    box-sizing: border-box;
  }
  .companyComfire-box-wrap-top>span{
    font-family: "PingFangSC";
    font-size: 14px;
    font-weight: 600;
    color: #333333;
  }
  .companyComfire-box-wrap-top>span:nth-of-type(1){
      margin: 0 81.5px 0 32px;
  }
  .companyComfire-box-wrap-top>span:nth-of-type(2){
      margin: 0 81.5px 0 0px;
  }
  .companyComfire-box-wrap-top>span:nth-of-type(3){
      margin: 0 81.5px 0 0px;
  }
  .companyComfire-box-wrap-top>span:nth-of-type(4){
      margin: 0 81.5px 0 0px;
  }
  .companyComfire-box-wrap-top>span:nth-of-type(5){
      margin: 0 81.5px 0 0px;
  }
  .companyComfire-box-wrap-middle{
    height: 257px;
  }
  .companyComfire-box-wrap-middle>div{
    position: relative;
    height: 36px;
    line-height: 36px;
    border: 1px solid #d8d8d8;
    border-top: none;
  }
  .companyComfire-box-wrap-middle>div>div{
    font-family: "PingFangSC";
    font-size: 14px;
    font-weight: 100;
    color: #333333;
    position: absolute;
  }
  .companyComfire-box-wrap-middle-div1{
    width: 120px;
    text-align: center;
    left:0;
    overflow: hidden;
	  text-overflow:ellipsis;
	  white-space: nowrap;
    padding: 0px 8px 0 8px;
  }
  .companyComfire-box-wrap-middle-div3{
    left: 384px;
  }
  .companyComfire-box-wrap-middle-div4{
    left: 132px;
    width: 120px;
    text-align: center;
  }
  .companyComfire-box-wrap-middle-div5{
    left: 277px;
  }
  .companyComfire-box-wrap-middle-div6{
    width: 54px;
    text-align: center;
    left: 432px;
  }
  .companyComfire-box-wrap-middle-div7{
    width: 100px;
    text-align: center;
    left: 540px;
  }
  .companyComfire-box-wrap-middle-div8{
    width: 81px;
    text-align: center;
    left: 660px;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  }
  .companyComfire-box-wrap-middle-div7>span{
    cursor: pointer;
    color: #4a90e2;
  }
  /* .companyComfire-box-wrap-middle-div8>span{
    cursor: pointer;
    color: #4a90e2;

  } */
  .companyComfire-box-wrap-block{
    width: 500px;
    margin: 36px auto 37px;
    text-align: center;
  }
  .companyComfire-box-wrap-img{
    width: 80px;
    margin:0 auto 256px ;
    height: 36px;
    text-align: center;
    line-height: 36px;
    cursor: pointer;
    color: #fff;
    font-family: "PingFangSC";
    font-size: 14px;
  }
  .companyComfire-box-wrap-img > span {
    width: 80px;
    height: 36px;
    text-align: center;
    line-height: 36px;
    display: block;
    background: url(/static/images/invalid-name1f.png);
  }
</style>
