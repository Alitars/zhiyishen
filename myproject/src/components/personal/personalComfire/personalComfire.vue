<template>
  <div class="personalComfire-container">
    <div class="personalComfire-box">
      <div class="personalComfire-box-wrap">
        <div class="personalComfire-box-wrap-top">
          <span>姓名</span>
          <span>类型</span>
          <span>手机号码</span>
          <!-- <span>联系地址</span> -->
          <span>审核状态</span>
          <span>操作</span>
        </div>

        <div class="personalComfire-box-wrap-middle">
          <div v-for="(v,k) in dataList">
            <div class="personalComfire-box-wrap-middle-div1" :title="v.chinese_name">{{v.chinese_name}}</div>
            <div class="personalComfire-box-wrap-middle-div2">{{types[v.type]}}</div>
            <!-- <div class="personalComfire-box-wrap-middle-div3">{{v.sex ==  1 ?"男":"女"}}</div> -->
            <div class="personalComfire-box-wrap-middle-div4">{{v.mobile}}</div>
            <!-- <div class="personalComfire-box-wrap-middle-div5">{{v.contact_address_pro+v.contact_address_city+v.contact_address_area+v.contact_address}}</div> -->
            <div class="personalComfire-box-wrap-middle-div6" v-if="v.status != '1' ">{{status[v.status]}}</div>
            <div class="personalComfire-box-wrap-middle-div7"  v-if="v.status == '1' || v.status == '3'">
              <span @click="look(v.id)">修改</span><span @click="delauther(v.id)" >/删除</span>
            </div>
             <div class="personalComfire-box-wrap-middle-div7"  v-if="v.status == '2'">
              <span @click="look(v.id)">查看</span>
            </div>
          </div>
        </div>
        <div class="personalComfire-box-wrap-block">
          <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage1"
          :page-size="pageSize"
          layout="prev, pager, next"
          :total="total">
          </el-pagination>
        </div>
        <div class="personalComfire-box-wrap-img" @click="identapply">
          <!-- 修改后 -->
          申请
          <!-- 修改前 -->
          <!-- <img @click="identapply" src="/static/images/apply.png" alt=""> -->
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
  name: 'personalComfire',
   data() {
      return {
        total:0,
        currentPage1: 1,
        pageSize: 5,
        id:'',
        dataList:[],
        types:{
          '0': '国内个人',
          '1': '港澳个人',
          '2': '台湾个人',
          '3': '国外个人'
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
              duration:1500
          })
      },
    identapply(){
     this.$router.push('/personal/personalForm')
    },
    getList(){
      this.$http.get(this.GLOBAL.base_url+"/api/authentication",{params:{
        user_id:this.$cookie.getCookie('u_id'),
        page:this.currentPage1
      }}).then(res=>{
        if(res.data.code == "1"){
          this.total = res.data.others;
          this.dataList = res.data.data;
        }
      })
    },
    handleSizeChange(val) {
              this.pageSize = val;
              this.getList();
            },

        handleCurrentChange(val) {
            this.currentPage1 = val;
            this.getList();
        },
        delauther(e){
          this.id = e;
          this.dialogVisible = true;
        },
        confireQuit(){
          this.$http.get(this.GLOBAL.base_url+"/api/authentication/delauth",{params:{
            id:this.id
          }}).then(res=>{
            if(res.data.code == "1"){
              this.dialogVisible = false;
              if(this.dataList.length>1){
                this.pageNum = Number(localStorage.getItem('pagination')) || 1;
              }else{
                this.pageNum = Number(localStorage.getItem('pagination'))-1 || 1;
              }
              this.pageChange(this.pageNum);
              this.tip('success',res.data.msg)
              this.getList();
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
      look(id){
        this.$router.push({
          path: '/personal/personalForm',
          query:{
            id:id
          }
        })
      },
  },

    created() {
        this.currentPage1 = Number(localStorage.getItem('pagination')) || 1;
        this.pageChange(this.currentPage1);
        this.getList();
      },
      beforeUpdate () {
          localStorage.setItem('pagination', this.currentPage1);
      },
      beforeDestroy () {
          localStorage.setItem('pagination', '1');
      }
}

</script>

<style scoped>
  .personalComfire-box{
    width: 1015px;
    float: left;
    margin: 12px 0 0 16px;
    background-color: #fff;
    min-height:950px;
  }
  .personalComfire-box-wrap{
    margin-left: 100px;
    padding-top: 28px;
    box-sizing: border-box;
  }
  .personalComfire-box-wrap-top{
    width: 772px;
    height: 36px;
    line-height: 36px;
    border: 1px solid #eeeeee;
    background-color: #fafafa;
    box-sizing: border-box;
  }
  .personalComfire-box-wrap-top>span{
    font-family: "PingFangSC";
    font-size: 14px;
    font-weight: 500;
    color: #333333;
    width: 148px;
    display: inline-block;
    text-align: center;
  }
  .personalComfire-box-wrap-top>span:nth-of-type(5){
    margin-right: 0;
    margin-left: 5px;
  }
  .personalComfire-box-wrap-middle{
    margin: 0px 0 24px 0;
    height: 257px;
    width: 772px;
  }
  .personalComfire-box-wrap-middle>div{
    position: relative;
    height: 32px;
    line-height: 32px;
    border: 1px solid #eeeeee;
    border-top: none;
    box-sizing: border-box;
  }
  .personalComfire-box-wrap-middle>div>div{
    font-family: " PingFangSC";
    font-size: 14px;
    font-weight: 100;
    color: #333333;
    position: absolute;

  }
  .personalComfire-box-wrap-middle-div1{
    width: 100px;
    left:23px;
    overflow: hidden;
	  text-overflow:ellipsis;
	  white-space: nowrap;
    text-align: center;
  }
  .personalComfire-box-wrap-middle-div2{
   left: 198px;
  }
  /* .personalComfire-box-wrap-middle-div3{
    left: 205px;
  } */
  .personalComfire-box-wrap-middle-div4{
    left: 341px;
  }
  /* .personalComfire-box-wrap-middle-div5{
    width: 80px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    left: 419px;
  } */
  .personalComfire-box-wrap-middle-div6{
    left: 507px;
    width: 54px;
    text-align: center;
  }
  .personalComfire-box-wrap-middle-div7{
    width: 100px;
    text-align: center;
    left: 641px;
  }
  .personalComfire-box-wrap-middle-div7>span{
    cursor: pointer;
  }
  .personalComfire-box-wrap-block{
    width: 772px;
    text-align: center;
    margin: 0 auto 40px;
    margin-left: 20px;
  }
  .personalComfire-box-wrap-img{
    width: 80px;
    height: 36px;
    line-height: 36px;
    background: url(/static/images/invalid-name1f.png);
    margin: 0 auto;
    cursor: pointer;
    text-align: center;
    font-family: "PingFangSC";
    font-size: 14px;
    color: #fff;
    margin-bottom: 72px;
    margin-left: 366px;
  }
</style>



