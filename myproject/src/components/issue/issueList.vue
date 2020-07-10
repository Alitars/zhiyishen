 <template>
   <div class="issueList-container">
      <div class="issyeList-box">
        <!-- 头部 -->
        <div class="issyeList-box-title">
          <div :class="changeStatus">
            <div class="div1" @click="changeType('all')">全部订单</div>
            <div class="div2" @click="changeType('wait')">待付款
                <!-- <el-badge :value="nocount" class="item"></el-badge> -->
            </div>
            <div class="div3" @click="changeType('service')">待处理
                <!-- <el-badge :value="servicecount" class="item"></el-badge> -->
            </div>
            <div class="div4" @click="changeType('finsh')">已完成</div>
          </div>
        </div>
        <!-- 搜索 -->
        <div class="issyeList-box-search">
          <div class="issyeList-box-patent1">
            <span>技术名称</span>
            <input v-model="patentNum" type="text" placeholder="请输入">
            <span class="fr" @click="search">查询</span>
          </div>
        </div>
        <!-- 列表 -->
        <div class="issyeList-box-list" >
          <div class="issyeList-box-list-title">
            <div>订单编号</div>
            <div>技术名称</div>
            <div>价格</div>
            <div>当前状态</div>
            <div>操作</div>
          </div>
          <div style="clear:both"></div>
          <div class="issyeList-box-list-detail" >
            <div v-for="(item,index) in list" :key="index">
              <div>{{item.order_id}}</div>
              <div>{{item.name}}</div>
              <div>RMB,{{item.price}}</div>
              <div>{{item.status_name}}</div>
              <div v-if="item.status_name == '待付款'" class="lihe24">
                <p v-if="item.status == 0" @click="pay(item.id)">去付款</p>
                <p v-if="item.status == 0" @click="edit(item.id)">去编辑</p>
                <p v-if="item.status == 0" @click="del(item.id)">取消订单</p>
              </div>
              <div v-if="item.status_name == '待财务确认'" class="lihe24">
                <p v-if="item.status == 0" @click="pay(item.id)">去付款</p>
                <p v-if="item.status == 0" @click="edit(item.id)">去编辑</p>
                <p v-if="item.status == 0" @click="del(item.id)">取消订单</p>
              </div>
              <div v-if="item.status_name == '已支付'" >
                <p>撰写中</p>
                <p @click="detail(item.id)">订单详情</p>
              </div>
              <div v-if="item.status_name == '撰写中'" class="he72">
                <!-- <p></p> -->
                <p @click="detail(item.id)">订单详情</p>
              </div>
              <div v-if="item.status_name == '取消订单'" >
                <p>已取消</p>
                <p @click="detail(item.id)">订单详情</p>
              </div>
              <div v-if="item.status_name == '修改中'" class="he72">
                <!-- <p></p> -->
                <p @click="detail(item.id)">订单详情</p>
              </div>
            </div>
          </div>
          <div class="issyeList-box-page">
            <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="page"
              :page-size="len"
              layout="prev, pager, next"
              :total="total">
            </el-pagination>
          </div>
        </div>
        <!-- 提示弹框 -->
        <el-dialog
          title="提示"
          :visible.sync="dialogVisible"
          width="30%">
          <span>请确认取消此订单吗？</span>
          <span slot="footer" class="dialog-footer">
              <el-button @click="dialogVisible = false">取 消</el-button>
              <el-button type="primary" @click="confireQuit">确 定</el-button>
          </span>
        </el-dialog>
      </div>
      <div style="clear:both;"></div>
   </div>
</template>

 <script>
  export default {
    name:'issueList',
    data(){
      return {
        changeStatus:'all',
        patentNum:'',
        list:[],
        page:1,
        len:6,
        total:0,
        id:'',
        dialogVisible:false
      }
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
      // 改变状态
      changeType(value){
        if(this.changeStatus != value) {
          this.page = 1;
        }
        var url = location.search;
        if(url.indexOf('?') != -1) {
          var str = url.substr(1),
          strs = str.split('=');
        }
        strs[1] = value;
        var host = window.location.host
        window.location.href = 'http://'+ host +"/issue/issueList?status="+strs[1]
        this.changeStatus = this.$route.query.status;
        if(this.changeStatus == value){
          console.log(1)
          this.getList();
        }
      },
      // 获取数据
      getList(){
        // 全部订单
        if(this.changeStatus == 'all') {
          this.$http.post(this.GLOBAL.base_url+'/api/patent/answerList',{
            user_id:this.$cookie.getCookie('u_id'),
            page:this.page,
            len:this.len
          }).then(res => {
            // console.log(res)
            this.list = res.data.data.data
            this.total = res.data.data.total
          })
        }
        // 代付款
        if(this.changeStatus == 'wait') {
          // console.log(2)
          this.$http.post(this.GLOBAL.base_url+'/api/patent/answerList',{
            user_id:this.$cookie.getCookie('u_id'),
            page:this.page,
            len:this.len,
            status:1
          }).then(res => {
            // console.log(res)
            this.list = res.data.data.data
            this.total = res.data.data.total
          })
        }
        // 待处理
        if(this.changeStatus == 'service') {
          this.$http.post(this.GLOBAL.base_url+'/api/patent/answerList',{
            user_id:this.$cookie.getCookie('u_id'),
            page:this.page,
            len:this.len,
            status:2
          }).then(res => {
            this.list = res.data.data.data
            this.total = res.data.data.total
          })
        }
        // 已完成
        if(this.changeStatus == 'finsh') {
          this.$http.post(this.GLOBAL.base_url+'/api/patent/answerList',{
            user_id:this.$cookie.getCookie('u_id'),
            page:this.page,
            len:this.len,
            status:4
          }).then(res => {
            this.list = res.data.data.data
            this.total = res.data.data.total
          })
        }
      },
      // 分页
      handleSizeChange(val) {
        this.len = val
        this.getList()
      },
      handleCurrentChange(val) {
        this.page = val
        this.getList()
      },
      // 查询
      search(){
        this.len = 1;
        this.getList();
      },
      // 支付
      pay(val){
        this.$router.push({
          path:'/twoQuestion',
          query:{
            Bid:val
          }
        });
      },
      // 详情
      detail(val) {
        this.$router.push({
          path:'/issue/issueDetails',
          query:{
            Bid:val
          }
        });
      },
      // 取消订单
      del(val) {
        this.id = val
        this.dialogVisible=true
      },
      confireQuit(){
        this.dialogVisible=false
        this.$http.post(this.GLOBAL.base_url+'/api/patent/ansEditStaus',{
          user_id:this.$cookie.getCookie('u_id'),
          id:this.id,
          status:-1
        }).then(res => {
          console.log(res)
          this.getList()
        })
      },
      edit(val) {
        this.$router.push({
          path:'/editQuestion',
          query:{
            Bid:val
          }
        });
      }
    },
    watch:{
    },
    mounted(){
      this.changeStatus = this.$route.query.status
      if(this.$route.query.status == 'all') {
        this.getList()
      }else{
        this.getList()
      }
    }
  }
 </script>
 <style scoped>
  .issyeList-box{
    width: 1015px;
    float: left;
    margin-left: 16px;
    min-height: 1108px;
    background-color: #fff;
    margin-top: 12px;
    padding-top: 32px;
    box-sizing: border-box;
  }
  /* 头部 */
  .issyeList-box-title {
    margin-left: 66px;
  }
  .issyeList-box-title,.issyeList-box-title>div{
    height: 32px;
  }
  .issyeList-box-title>div>div{
    float: left;
    width: 64px;
    text-align: center;
    line-height: 32px;
    font-family: "PingFangSC";
    font-size: 14px;
    color: #999999;
    cursor: pointer;
    margin-right: 64px;
  }
  .all .div1,.wait .div2,.service .div3,.finsh .div4{
    border-bottom:1px solid  #353535;
    font-weight: 500;
    color: #000000;
  }
  /* 搜索 */
  .issyeList-box-search{
    width: 780px;
    border-top: 1px solid #d8d8d8;
    margin-left: 66px;
    padding-top: 20px;
  }
  .issyeList-box-patent1 > input {
    width: 220px;
    height: 32px;
    border-radius: 4px;
    border: solid 1px #d6d6d6;
    outline: none;
    padding-left: 12px;
    box-sizing: border-box;
  }
  .issyeList-box-patent1 > span{
    margin-right: 16px;
    font-family: "PingFangSC";
    font-size: 14px;
    color: #333333;
  }
  .issyeList-box-patent1 > span:nth-child(3){
        width: 80px;
        height: 36px;
        line-height: 36px;
        background: url("/static/images/invalid-name1f.png") no-repeat;
        background-size: cover;
        cursor: pointer;
        color: #fff;
        font-family: "PingFangSC";
        font-size: 14px;
        text-align: center;
  }
  /* 列表 */
  .issyeList-box-list-title{
    height: 36px;
    width: 853px;
    line-height: 36px;
    border:1px solid #eee;
    margin-left: 66px;
    background-color: #fafafa;
    box-sizing: border-box;
    margin-top: 20px;
  }
  .issyeList-box-list-title>div{
    width: 170px;
    text-align: center;
    float: left;
    font-family: "PingFangSC";
    font-size: 14px;
    font-weight: 600;
    color: #333333;
  }
  .issyeList-box-list-detail{
    height: 490px;
    width: 853px;
    margin-left: 66px;
  }
  .issyeList-box-list-detail>div{
    height: 72px;
    line-height: 72px;
    border: 1px solid #eee;
    border-top: none;
    box-sizing: border-box;
  }
  .issyeList-box-list-detail>div>div{
    float: left;
    width: 170px;
    text-align: center;
    font-family: "PingFangSC";
    font-size: 14px;
    font-weight: 100;
    color: #333333;
    height: 72px;
  }
  .issyeList-box-list-detail>div>div:nth-of-type(5){
    color: #f96006;
    cursor: pointer;
    line-height: 0px;
  }
  .issyeList-box-list-detail>div>div:nth-of-type(5) > p {
    height: 36px;
    line-height: 36px;
  }
  .issyeList-box-page {
    margin-left: 388px;
  }
  .fr {
    float: right;
  }
  .he72 {
    height: 72px;
    line-height: 72px;
  }
  .he72 > p {
    height: 72px !important;
    line-height: 72px !important;
  }
  .lihe24 > p{
    height: 24px !important;
    line-height: 24px !important;
  }
 </style>
