<template>
  <div class="manageList-container">
      <div class="manage-box">
        <!-- <div class="manage-box-top">
          <div>开票信息管理</div>
        </div> -->
        <div class="manage-box-list">
          <div class="manage-box-title">
            <div>发票抬头</div>
            <div>开票类型</div>
            <div>税号</div>
            <div>操作</div>
          </div>
          <div class="manage-box-detail">
            <div v-for="(v,k) in list">
              <div :title="v.company_name">{{v.company_name}}</div>
              <div>{{status[v.invoice_type]}}</div>
              <div>{{v.credit_code}}</div>
              <div>
                <span @click="edit(v.id)">修改 |</span>
                <span @click="del(v.id)">删除</span>
              </div>
            </div>
          </div>
        </div>
        <div class="manage-box-page">
          <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="currentPage1"
              :page-size="pageSize"
              layout="prev, pager, next"
              :total="total">
          </el-pagination>
        </div>
        <div @click="manageAdd" class="manage-box-add">新增</div>
      </div>
      <el-dialog
        title="提示"
        :visible.sync="dialogVisible"
        :append-to-body="true"
        width="30%">
        <span>确认要删除该条开票信息吗？</span>
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
  name: 'manageList',
  data(){
    return{
        dialogVisible: false,
        total:0,
        currentPage1: 1,
        pageSize: 10,
        list:[],
        status:{
        '1': '普通发票',
        '2': '增值税发票'
      },
      id:''
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
              duration:1500
          })
      },
    manageAdd(){
      this.$router.push('/personal/manageForm')
    },
    getdata(){
       this.$http.get(this.GLOBAL.base_url+'/api/usercenter/myinvoices',{params:{
                    user_id:this.$cookie.getCookie('u_id'),
                    page:this.currentPage1
              }}).then(res=>{
                if(res.data.code == "1"){
                  this.list = res.data.data;
                  this.total= res.data.others;
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
      edit(val){
        this.$router.push(
          {
            path:'/personal/manageForm',
            query:{
              id:val
            }
          }
        )
      },
      del(val){
        this.dialogVisible = true;
        this.id = val;
      },
      confireQuit(){
        this.dialogVisible=false;
          this.$http.get(this.GLOBAL.base_url+'/api/usercenter/delinvoices',{params:{
                id:this.id
            }}).then(res=>{
                if(res.data.code == "1"){
                setTimeout(()=>{
                     this.$router.go(0);
                 },500)
                }else{
                  this.tip('error',res.data.msg)
                }
            })
      }
  },
  mounted(){
    this.getdata();
  }
}

</script>

<style scoped>
  .manage-box{
      width: 1015px;
      float: left;
      margin: 12px 0 0px 16px;
      background-color: #fff;
      padding-top: 28px;
      min-height: 950px;
      box-sizing: border-box;
  }
  .manage-box-top>div{
    font-family: "PingFangSC-Thin";
    font-size: 22px;
    font-weight: 100;
    color: #999999;
    margin: 58px 0 14px 29px;
  }
  .manage-box-list{
    height: 550px;
    width: 853px;
    margin: 0 auto;
  }
  .manage-box-title{
    height: 36px;
    background-color: #fafafa;
    border: 1px solid #eee;
    line-height: 36px;
    box-sizing: border-box;
  }
  .manage-box-title>div{
    width: 212px;
    text-align: center;
    float: left;
    font-family: "PingFangSC";
    font-size: 14px;
    font-weight: 500;
    color: #000;
  }
  .manage-box-detail{
    height: 490px;
  }
  .manage-box-detail>div{
    height: 36px;
    line-height: 36px;
    margin: 0px 0 0px;
    border: 1px solid #eee;
    border-top: none;
    box-sizing: border-box;
  }
  .manage-box-detail>div>div{
    float: left;
    width: 212px;
    text-align: center;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    font-family: "PingFangSC-Thin";
    font-size: 14px;
    font-weight: 100;
    color: #333333;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }
  .manage-box-detail>div>div:nth-of-type(4)>span{
    color: #f96006;
    cursor: pointer;
  }
  .manage-box-page{
     width: 400px;
     text-align: center;
     margin: 0 auto 42px;
  }
  .manage-box-add{
    width: 80px;
    height: 36px;
    border-radius: 8px;
    background: url(/static/images/invalid-name1l.png);
    text-align: center;
    line-height: 36px;
    margin: 0 auto;
    font-family: "PingFangSC";
    font-size: 14px;
    color: #ffffff;
    cursor: pointer;
  }

</style>
<style>
.el-dialog__wrapper>div{
        margin-top:30vh !important;
  }
</style>

