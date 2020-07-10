<template>
  <div class="order-container">
      <div class="order-box">
        <!-- 修改前 -->
          <!-- <div class="order-box-top"></div> -->
          <div class="order-box-title">
            <!-- 头部 -->
              <div :class="changeStatus">
                  <div class="div1" @click="changeType('all')">全部订单</div>
                  <div class="div2" @click="changeType('wait')">待付款
                      <el-badge :value="nocount" class="item"></el-badge>
                  </div>
                  <div class="div3" @click="changeType('service')">待处理
                      <el-badge :value="servicecount" class="item"></el-badge>
                  </div>
                   <div class="div4" @click="changeType('finsh')">已完成
                     <el-badge :value="finish_num" class="item"></el-badge>
                   </div>
              </div>
          </div>
          <!-- 搜索 -->
          <div class="order-box-search">
            <div>
              <!-- 专利名称 -->
              <div class="order-box-patent1">
                <span>专利名称</span>
                <input v-model="patentNum" type="text" placeholder="请输入">
              </div>
            <!-- 服务类型-->
            <div>
              <span>服务类型</span>
              <el-select @change="choseType2" v-model="form2.zhi" class="order-type-select">
                  <el-option
                value="全部类型">
                </el-option>
                <el-option
                v-for="item in service"
                :key="item.id"
                :label="item.title"
                :value="item.id">
                </el-option>
              </el-select>
            </div>
            </div>
            <!-- 订单编号&&注册号 -->
            <div class="order-box-search-detail">
                <span>订单编号</span>
                <input v-model="orderNum" type="text" placeholder="请输入">
                <span>专利申请号</span>
                <input v-model="applyNum" type="text" placeholder="请输入">
            </div>
            <!-- 修改后查询 -->
            <div id="order-box-search-buttom" @click="search">查询</div>
            <!-- 修改前查询 -->
            <!-- <div id="order-box-search-buttom" @click="search"></div> -->
          </div>
          <!-- 全选&&生成合同&&合并付款-->
          <div class="order-pay" v-show="checkshow">
              <div class="pay-div1">
                  <input type="checkbox" @click="selectProduct(isSelectAll)" v-bind:checked="isSelectAll">
                  <span>全选</span>
              </div>

              <div class="pay-div2">
                  <!-- <div @click="addpact">生成合同</div> -->
                  <div v-show="allshow" @click="payall">合并付款</div>
              </div>
          </div>
          <!-- 列表 -->
          <div class="order-box-list" v-show="judge">
            <!-- 列表主体 -->
            <div class="order-box-list-detail">
              <div v-for="(v,k) in list" :key="k">
                <!-- 单选框 -->
                <div class="check-show">
                  <div v-show="checkshow&(v.status!=17&v.status!=18&v.status!=19&v.status!=20)">
                    <input type="checkbox" class="everycheck" :checked="v.isSelect" @change="v.isSelect=!v.isSelect">
                  </div>
                </div>
                <!-- img -->
                <div class="order-box-list-detail-img">
                  <img :src="v.brand_img?GLOBAL.base_url+v.brand_img:'/static/images/no.png'" alt="">
                </div>
                <!-- 中间简介信息左 -->
                <div class="order-box-list-detail-div1">
                  <div>
                    <span>订单编号:</span>
                    <span>{{v.order_id}}</span>
                  </div>
                  <div>
                    <span>专利名称:</span>
                    <span>{{v.patent_name}}</span>
                  </div>
                  <div>
                    <span>申请人:</span>
                    <span :title="v.apply_name">{{v.apply_name}}</span>
                  </div>
                </div>
                <!-- 中间简介信息右 -->
                <div class="order-box-list-detail-div2">
                  <div>
                    <span>服务类型:</span>
                    <span>{{v.click_type}}</span>
                  </div>
                  <div>
                    <span>专利申请号:</span>
                    <span v-if="v.one_cate">{{v.regist_num}}</span>
                  </div>
                   <div>
                    <span>订单金额:</span>
                    <span>RMB,{{v.total_price}}</span>
                   </div>
                </div>
                <!-- 状态 -->
                <div class="order-box-list-detail-div3">
                  <div v-if="v.status == '待支付'">
                             <p>待付款</p>
                             <p @click="toPay(v.id,v.click_type)">去付款 ></p>
                             <p @click="quit(v.id,v.click_type)">取消订单 ></p>
                             <p @click="toDetail(v.id,v.click_type)">订单详情 ></p>
                  </div>
                  <div v-if="v.status == '待财务确认'">
                             <p>待财务确认</p>
                             <p @click="toDetail(v.id,v.click_type)">订单详情 ></p>
                  </div>
                  <div v-if="v.status == '已取消'">
                             <p>已取消</p>
                             <p @click="toDetail(v.id,v.click_type)">订单详情 ></p>
                  </div>
                  <div v-if="v.status == '已支付'">
                             <p>已付款</p>
                             <!-- <p @click="submit(v.click_type,v.id)">提交资料 ></p> -->
                             <p @click="toDetail(v.id,v.click_type)">订单详情 ></p>
                  </div>
                  <div v-if="v.status == '资料已提交'">
                             <p>资料已提交</p>
                             <!-- <p @click="edit(v.click_type,v.id,v.status)">修改资料 ></p> -->
                             <p @click="toDetail(v.id,v.click_type)">订单详情 ></p>
                  </div>
                  <div v-if="v.status == '资料审核通过'">
                             <p>资料审核通过</p>
                             <p @click="toDetail(v.id,v.click_type)">订单详情 ></p>
                  </div>
                  <div v-if="v.status == '资料审核不通过'">
                             <p>资料审核不通过</p>
                             <!-- <p @click="edit(v.click_type,v.id,v.status)">修改资料 ></p> -->
                             <p @click="toDetail(v.id,v.click_type)">订单详情 ></p>
                  </div>
                  <div v-if="v.status == '专利说明书已撰写'">
                             <p>专利说明书已撰写</p>
                             <!-- <p @click="watch(v.click_type,v.id,v.status)" >确认材料 ></p> -->
                             <p @click="toDetail(v.id,v.click_type)">订单详情 ></p>
                  </div>
                  <div v-if="v.status == '专利说明书不同意'">
                             <p>专利说明书不同意</p>
                             <p @click="toDetail(v.id,v.click_type)">订单详情 ></p>
                  </div>
                  <div v-if="v.status == '专利说明书已同意'">
                             <p>专利说明书已同意</p>
                             <p @click="toDetail(v.id,v.click_type)">订单详情 ></p>
                  </div>
                  <div v-if="v.status == '已申报'">
                            <p>已申报</p>
                            <p @click="toDetail(v.id,v.click_type)">订单详情 ></p>
                  </div>
                  <div v-if="v.status == '专利受理和缴费通知书已下发'">
                             <p>专利受理和缴费通知书已下发</p>
                             <!-- <p @click="bill(v.click_type,v.id,v.status)">查看缴费 ></p> -->
                             <p @click="toDetail(v.id,v.click_type)">订单详情 ></p>
                  </div>
                  <div v-if="v.status == '等待初审合格通知书'">
                             <p>等待初审合格通知书</p>
                             <p @click="toDetail(v.id,v.click_type)">订单详情 ></p>
                  </div>
                  <div v-if="v.status == '代缴费已支付'">
                             <p>代缴费已支付</p>
                             <p @click="toDetail(v.id,v.click_type)">订单详情 ></p>
                  </div>
                  <div v-if="v.status == '专利合格通知书已下发'">
                             <p>专利合格通知书已下发</p>
                             <p @click="toDetail(v.id,v.click_type)" >订单详情 ></p>
                  </div>
                  <div v-if="v.status == '专利发明公布通知书已下发'">
                             <p>专利发明公布通知书已下发</p>
                             <p @click="toDetail(v.id,v.click_type)" >订单详情 ></p>
                  </div>
                  <div v-if="v.status == '发明进入实审阶段通知书已下发'">
                             <p>发明进入实审阶段通知书已下发</p>
                             <p @click="toDetail(v.id,v.click_type)" >订单详情 ></p>
                  </div>
                  <div v-if="v.status == '第一次审查意见通知书已下发'">
                             <p>第一次审查意见通知书已下发</p>
                             <p @click="toDetail(v.id,v.click_type)">订单详情 ></p>
                  </div>
                  <div v-if="v.status == '第一次审查意见陈述已撰写'">
                             <p>第一次审查意见陈述已撰写</p>
                             <!-- <p @click="watch(v.click_type,v.id,v.status)">确认材料 ></p> -->
                             <p @click="toDetail(v.id,v.click_type)">订单详情 ></p>
                  </div>
                  <div v-if="v.status == '第一次审查意见陈述不同意'">
                             <p>第一次审查意见陈述不同意</p>
                             <p @click="toDetail(v.id,v.click_type)">订单详情 ></p>
                  </div>
                  <div v-if="v.status == '第一次审查意见陈述已同意'">
                             <p>第一次审查意见陈述已同意</p>
                             <p @click="toDetail(v.id,v.click_type)">订单详情 ></p>
                  </div>
                  <div v-if="v.status == '第一次审查意见陈述已提交'">
                             <p>第一次审查意见陈述已提交</p>
                             <p @click="toDetail(v.id,v.click_type)">订单详情 ></p>
                  </div>
                  <div v-if="v.status == '第二次审查意见通知书已下发'">
                             <p>第二次审查意见通知书已下发</p>
                             <p @click="toDetail(v.id,v.click_type)">订单详情 ></p>
                  </div>
                  <div v-if="v.status == '第二次审查意见陈述已撰写'">
                             <p>第二次审查意见陈述已撰写</p>
                             <!-- <p @click="watch(v.click_type,v.id,v.status)">确认材料 ></p> -->
                             <p @click="toDetail(v.id,v.click_type)">订单详情 ></p>
                  </div>
                  <div v-if="v.status == '第二次审查意见陈述不同意'">
                             <p>第二次审查意见陈述不同意</p>
                             <p @click="toDetail(v.id,v.click_type)">订单详情 ></p>
                  </div>
                  <div v-if="v.status == '第二次审查意见陈述已同意'">
                             <p>第二次审查意见陈述已同意</p>
                             <p @click="toDetail(v.id,v.click_type)">订单详情 ></p>
                  </div>
                  <div v-if="v.status == '第二次审查意见陈述已提交'">
                             <p>第二次审查意见陈述已提交</p>
                             <p @click="toDetail(v.id,v.click_type)">订单详情 ></p>
                  </div>
                   <div v-if="v.status == '第三次审查意见通知书已下发'">
                             <p>第三次审查意见通知书已下发</p>
                             <p @click="toDetail(v.id,v.click_type)">订单详情 ></p>
                  </div>
                  <div v-if="v.status == '第三次审查意见陈述已撰写'">
                             <p>第三次审查意见陈述已撰写</p>
                             <!-- <p @click="watch(v.click_type,v.id,v.status)">确认材料 ></p> -->
                             <p @click="toDetail(v.id,v.click_type)">订单详情 ></p>
                  </div>
                  <div v-if="v.status == '第三次审查意见陈述不同意'">
                             <p>第三次审查意见陈述不同意</p>
                             <p @click="toDetail(v.id,v.click_type)">订单详情 ></p>
                  </div>
                  <div v-if="v.status == '第三次审查意见陈述已同意'">
                             <p>第三次审查意见陈述已同意</p>
                             <p @click="toDetail(v.id,v.click_type)">订单详情 ></p>
                  </div>
                  <div v-if="v.status == '第三次审查意见陈述已提交'">
                             <p>第三次审查意见陈述已提交</p>
                             <p @click="toDetail(v.id,v.click_type)">订单详情 ></p>
                  </div>
                  <div v-if="v.status == '驳回通知书已下发'">
                             <p>驳回通知书已下发</p>
                             <p @click="toDetail(v.id,v.click_type)">订单详情 ></p>
                  </div>
                  <div v-if="v.status == '办理登记和缴费通知书已下发'">
                             <p>办理登记和缴费通知书已下发</p>
                             <!-- <p @click="bill(v.click_type,v.id,v.status)">查看缴费 ></p> -->
                             <p @click="toDetail(v.id,v.click_type)">订单详情 ></p>
                  </div>
                  <div v-if="v.status == '等待专利证书'">
                             <p>等待专利证书</p>
                             <p @click="toDetail(v.id,v.click_type)">订单详情 ></p>
                  </div>
                  <div v-if="v.status == '办理登记费已支付'">
                             <p>办理登记费已支付</p>
                             <p @click="toDetail(v.id,v.click_type)">订单详情 ></p>
                  </div>
                  <div v-if="v.status == '著录项变更缴费通知书已下发'">
                             <p>著录项变更缴费通知书已下发</p>
                             <!-- <p @click="bill(v.click_type,v.id,v.status)">查看缴费 ></p> -->
                             <p @click="toDetail(v.id,v.click_type)">订单详情 ></p>
                  </div>
                  <div v-if="v.status == '手续合格通知书已下发'">
                             <p>手续合格通知书已下发</p>
                             <p @click="toDetail(v.id,v.click_type)">订单详情 ></p>
                  </div>
                  <div v-if="v.status == '费用减缓审批通知书已下发'">
                             <p>费用减缓审批通知书已下发</p>
                             <p @click="toDetail(v.id,v.click_type)">订单详情 ></p>
                  </div>
                  <div v-if="v.status == '专利证书已下发'">
                             <p>专利证书已下发</p>
                             <p @click="toDetail(v.id,v.click_type)">订单详情 ></p>
                  </div>
                  <div v-if="v.status == '等待手续合格通知书'">
                             <p>等待手续合格通知书</p>
                             <p @click="toDetail(v.id,v.click_type)">订单详情 ></p>
                  </div>
                  <div v-if="v.status == '已邮寄'">
                             <p>已邮寄</p>
                             <!-- <p @click="recive(v.id,v.click_type)">确认收货 ></p> -->
                             <p @click="toDetail(v.id,v.click_type)">订单详情 ></p>
                  </div>
                  <div v-if="v.status == '订单完成'">
                             <p>订单完成</p>
                             <p @click="toDetail(v.id,v.click_type)">订单详情 ></p>
                  </div>
                  <div v-if="v.status == '退款待审核'">
                             <p>退款待审核</p>
                             <p @click="toDetail(v.id,v.click_type)">订单详情 ></p>
                  </div>
                  <div v-if="v.status == '退款审核中'">
                             <p>退款审核中</p>
                             <p @click="toDetail(v.id,v.click_type)">订单详情 ></p>
                  </div>
                  <div v-if="v.status == '退款审核通过'">
                             <p>退款审核通过</p>
                             <p @click="toDetail(v.id,v.click_type)">订单详情 ></p>
                  </div>
                  <div v-if="v.status == '退款审核不通过'">
                             <p>退款审核不通过</p>
                             <p @click="toDetail(v.id,v.click_type)">订单详情 ></p>
                  </div>
                </div>
              </div>
            </div>
            <!-- 分页 -->
            <div class="order-box-fen">
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
          <div class="order-box-nodata" v-show="!judge">
              <img src="/static/images/noorder.png" alt="">
          </div>
          <!-- 提示弹框 -->
          <el-dialog
            title="提示"
            :visible.sync="dialogVisible"
            :append-to-body="true"
            width="30%">
            <span>请确认取消此订单吗？</span>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="confireQuit">确 定</el-button>
            </span>
          </el-dialog>
          <!-- 生成合同弹框 -->
          <div class="pact" v-show="pactshow">
              <div class="pact-div">
                <img src="/static/images/orderdetailcha.png" alt="" @click="closepact">
                <div class="pact-inf">
                  <P>确认合同信息</P>
                  <div class="pact-div1">
                    <span class="pact-div1-span1">委托人类型</span>
                    <input class="radio1" value="1" v-model="pact" name="type" type="radio"><span class="pact-div1-span2">企业</span>
                    <input class="radio2" value="2" v-model="pact" name="type" type="radio"><span>个人</span>
                  </div>
                  <div class="pact-div2">
                    <div>
                      <span>委托人</span>
                      <select class="form_select" v-model="constract">
                        <option value="0">请选择</option>
                        <option v-for="(v,k) in infor" v-bind:value="v.id" v-if="pact == '1'" >{{v.company_name}}</option>
                        <option v-for="(v,k) in infor" v-bind:value="v.id" v-if="pact == '2'" >{{v.chinese_name}}</option>
                      </select>
                    </div>
                    <div @click="addtest">新增</div>
                  </div>
                  <div class="pact-div3">
                    <span>联系人</span>
                    <input type="text" v-model="linkman">
                  </div>
                  <div class="pact-div4">
                    <span>联系电话</span>
                    <input type="text" v-model="mobile">
                  </div>
                  <!-- <div class="pact-div4">
                            <span>电邮地址</span>
                            <input type="text">
                  </div> -->
                  <div class="pact-div5" @click="addcontract">生成合同</div>
                  <div class="pact-div6">合同文件可去订单详情下载查看</div>
                </div>
              </div>
          </div>
      </div>
    <div style="clear:both;"></div>
  </div>
</template>

<script>
export default {
  name: 'orderPatent',
  data(){
    return{
      changeStatus:'all',
        // 专利名称
        patentNum:'',
        // 取消订单显示隐藏
        dialogVisible: false,
        // 服务类型
        form2:{
            zhi:'全部类型'
        },
        judge:Boolean,
        //接收下拉框下面的数据
        service:[],
        // 专利编号
        orderNum:'',
        // 注册号
        applyNum:'',
        // 数据列表数据
        list:[],
        // 分页
        total:0,
        currentPage1: 1,
        pageSize: 10,
        type:Number,
        // 订单id
        id:'',
        click_type:'',
        servicecount:0,
        nocount:0,
        // 合并支付按钮显示隐藏
        allshow:false,
        // 当在完成时隐藏按钮
        checkshow:true,
        // 合同里的信息
        pact:'1',
        // 合同显示隐藏
        pactshow:false,
        infor:[],
        // 选择合同人
        constract:'0',
        linkman:'',
        mobile:'',
        finish_num:'0'
    }
  },
  components: {
  },
  watch:{
      'changeStatus'(newValue){
          if(newValue == 'wait'){
              this.allshow = true
          }
          if(newValue == 'finsh'){
              this.checkshow = false
          }
      },
      'pact'(newValue){
          if(newValue == '1'){
              this.gettest()
          }
          if(newValue == "2"){
              this.constract ="0"
              this.gettest()
          }
      },
  },
  computed:{
    //    全选
    isSelectAll:function(){
      if(this.list.length != 0){
          return this.list.every(function (val) { return val.isSelect});
      }else{
          return false;
      }
    },
  },
  methods:{
    // 弹框
    tip(type,msg){
      return this.$message({
        type:type,
        message:msg,
        showClose:true,
        duration:1500
      })
    },
    //   改变勾选的状态
    selectProduct:function(_isSelect){
      for (var i = 0; i< this.list.length; i++) {
        this.list[i].isSelect = !_isSelect;
      }
    },
    //合并支付
    payall(){
      if(this.judge == false){
        return false
      }else{
        var arr=[];
        for(var i =0;i<this.list.length;i++){
          arr.push(this.list[i].isSelect);
        }
        if(arr.indexOf(true) == -1){
          this.tip('error','请选择您要合并支付的订单')
          return false;
        }else{
          var a = '';
          let c = '';
          for(var i =0;i<this.list.length;i++){
            if(this.list[i].isSelect == true){
              a+=this.list[i].id+','
            }
          }
          for(var i =0;i<this.list.length;i++){
            if(this.list[i].isSelect == true){
              c+=this.list[i].click_type+','
            }
          }
          a =  a.substring(0,a.length-1);
          c =  c.substring(0,c.length-1);
          this.$router.push({
            path:'/checkPatent',
            query:{
              id:a,
              click_type:c
            }
          })
        }
      }
    },
    // 合同框显示
    addpact(){
      if(this.judge == false){
        return false
      }else{
        var arr=[];
        for(var i =0;i<this.list.length;i++){
          arr.push(this.list[i].isSelect);
        }
        if(arr.indexOf(true) == -1){
          this.tip('error','请选择您要生成合同的订单')
          return false;
        }else{
          this.pactshow = true
        }
      }

    },
    // 获取认证信息
    gettest(){
      this.$http.post(this.GLOBAL.base_url+'/api/BrandUpload/applyList',{
        user_id:this.$cookie.getCookie('u_id')
      }).then(res=>{
          // console.log(res)
        if(res.data.code == "1"){
          if(this.pact == "1"){
            this.infor = res.data.business;
          }else{
            this.infor = res.data.Authentication;
          }
        }
      });
    },
    // 新增认证
    addtest(){
      if(this.pact == '2'){
        this.$router.push({
          path:'/personal/personalForm',
          query:{
            submitData:0
          }
        })
      }
      if(this.pact == '1'){
        this.$router.push({
          path:'/personal/companyForm',
          query:{
            submitData:0
          }
        })
      }
    },
    // 点叉号关闭合同弹框
    closepact(){
      this.pactshow = false;
    },
    // 生成合同
    addcontract(){
      let reg1 = /^0\d{2,3}-?\d{7,8}$/;
      let reg2=/^[1][3,4,5,7,8][0-9]{9}$/;
      var a = '';
      for(var i =0;i<this.list.length;i++){
        if(this.list[i].isSelect == true &&this.list[i].status !=17&&this.list[i].status !=18&&this.list[i].status !=19&&this.list[i].status !=20){
          a+=this.list[i].id+','
        }
      }
      a =  a.substring(0,a.length-1);
      if(this.constract == "0"){
        return false;
      }else if(this.linkman == ''){
        return false;
      }else if(this.mobile == ''){
        return false;
      }else if(!reg1.test(this.mobile)&&!reg2.test(this.mobile)){
        this.tip('error','请填写正确的号码')
        return false
      }else{
        this.$http.post(this.GLOBAL.win_url+'/api/order/orderContract',{
          user_id:this.$cookie.getCookie('u_id'),
          id:a,
          auth_type:this.pact,
          linkman:this.linkman,
          mobile:this.mobile,
          apply_id:this.constract
        }).then(res=>{
          // console.log(res)
          if(res.data.code == "1"){
              this.tip('success',res.data.msg);
              this.pactshow = false;
          }
          if(res.data.code == "0"){
              this.tip('error',res.data.msg);
              this.pactshow = false;
          }
        })
      }
    },
    // 取消订单 显示弹框
    quit(val,val1){
      this.id = val;
      this.click_type = val1
      this.dialogVisible=true;
      // console.log(this.click_type)
    },
    // 取消订单
    confireQuit(){
      this.dialogVisible=false;
      this.$http.post(this.GLOBAL.base_url+'/api/patent/orderEnd',{
        user_id:this.$cookie.getCookie('u_id'),
        id:this.id,
        type:this.click_type,
        status:-1
      }).then(res=>{
        // console.log(res)
        if(res.data.code == "1"){
          if(this.list.length>1){
            this.pageNum = Number(localStorage.getItem('pagination')) || 1;
          }else{
            this.pageNum = Number(localStorage.getItem('pagination'))-1 || 1;
          }
          this.pageChange(this.pageNum);
          this.getList();
        }
      })
    },
    // 切换状态
    changeType(value){
      if(this.changeStatus != value){
        this.currentPage1 = 1;
      }
      var url = location.search;
      if (url.indexOf("?") != -1) {
        var str = url.substr(1),
        strs = str.split("=");
      }
      strs[1] = value;
      var host = window.location.host;
      window.location.href='https://'+ host +"/personal/orderPatent?status="+strs[1]
      this.changeStatus = this.$route.query.status;
      if(this.changeStatus == value){
        this.getList();
      }
    },
    // 服务类型列表
    choseType2(vId){
      if(vId != "全部类型"){
        let obj = {};
        obj = this.service.find((item)=>{
          return item.id === vId;
        });
        this.form2.zhi = obj.title;
      }
    },
    // 修改后列表
    getList(){
          // all
          if(this.changeStatus == 'all') {
            if(this.form2.zhi == '全部类型') {
                this.$http.post(this.GLOBAL.base_url+'/api/patent/orderList',{
                user_id:this.$cookie.getCookie('u_id'),
                page:this.currentPage1,
                patent_name:this.patentNum,
                order_no:this.orderNum,
                patent_no:this.applyNum,
              }).then( res => {
                // console.log(res)
                if (res.data.code == '1') {
                  this.list = res.data.data.data
                  // console.log(this.list)
                  this.total = res.data.data.total
                  this.judge = true
                  let _this = this
                  this.list.map(function (item) {
                        _this.$set(item, 'isSelect', false);
                    })
                }
                if(res.data.code == "0"){
                  this.judge = false;
                }
                this.nocount = res.data.data.noPay_num
                this.servicecount = res.data.data.service_num
                this.finish_num = res.data.data.finish_num
              })
            }
            if(this.form2.zhi != '全部类型') {
              this.$http.post(this.GLOBAL.base_url+'/api/patent/orderList',{
              user_id:this.$cookie.getCookie('u_id'),
              page:this.currentPage1,
              patent_name:this.patentNum,
              order_no:this.orderNum,
              patent_no:this.applyNum,
              good_type:this.form2.zhi
              }).then( res => {
                this.list = res.data.data.data
                this.total = res.data.data.total
                this.judge = true
                 var _this=this;
                this.list.map(function (item) {
                  _this.$set(item, 'isSelect', false);
                })
                if(res.data.code == "0"){
                  this.judge = false;
                }
              })
            }
          }
          // wait
          if(this.changeStatus == 'wait') {
            if(this.form2.zhi == '全部类型') {
              this.$http.post(this.GLOBAL.base_url + '/api/patent/orderList', {
                user_id:this.$cookie.getCookie('u_id'),
                page:this.currentPage1,
                patent_name:this.patentNum,
                order_no:this.orderNum,
                patent_no:this.applyNum,
                status:1
              }).then( res => {
                console.log(res)
                this.list = res.data.data.data
                this.total = res.data.data.total
                this.judge = true
                var _this=this;
                this.list.map(function (item) {
                  _this.$set(item, 'isSelect', false);
                })
                if(res.data.code == "0"){
                  this.judge = false;
                }
                this.nocount = res.data.data.noPay_num
                this.servicecount = res.data.data.service_num
                this.finish_num = res.data.data.finish_num
              })
            }
            if(this.form2.zhi != '全部类型') {
              this.$http.post(this.GLOBAL.base_url+'/api/patent/orderList',{
              user_id:this.$cookie.getCookie('u_id'),
              page:this.currentPage1,
              patent_name:this.patentNum,
              order_no:this.orderNum,
              patent_no:this.applyNum,
              good_type:this.form2.zhi,
              status:1
              }).then( res => {
                this.list = res.data.data.data
                this.total = res.data.data.total
                this.judge = true
                 var _this=this;
                this.list.map(function (item) {
                  _this.$set(item, 'isSelect', false);
                })
                if(res.data.code == "0"){
                  this.judge = false;
                }
              })
            }
          }
          // service
          if(this.changeStatus == 'service') {
            if(this.form2.zhi == '全部类型') {
              this.$http.post(this.GLOBAL.base_url + '/api/patent/orderList', {
                user_id:this.$cookie.getCookie('u_id'),
                page:this.currentPage1,
                patent_name:this.patentNum,
                order_no:this.orderNum,
                patent_no:this.applyNum,
                status:2
              }).then( res => {
                // console.log(res)
                this.list = res.data.data.data
                this.total = res.data.data.total
                this.judge = true
                 var _this=this;
                this.list.map(function (item) {
                  _this.$set(item, 'isSelect', false);
                })
                if(res.data.code == "0"){
                  this.judge = false;
                }
                this.nocount = res.data.data.noPay_num
                this.servicecount = res.data.data.service_num
                this.finish_num = res.data.data.finish_num
              })
            }
            if(this.form2.zhi != '全部类型') {
              this.$http.post(this.GLOBAL.base_url+'/api/patent/orderList',{
              user_id:this.$cookie.getCookie('u_id'),
              page:this.currentPage1,
              patent_name:this.patentNum,
              order_no:this.orderNum,
              patent_no:this.applyNum,
              good_type:this.form2.zhi,
              status:2
              }).then( res => {
                this.list = res.data.data.data
                this.total = res.data.data.total
                this.judge = true
                 var _this=this;
                this.list.map(function (item) {
                  _this.$set(item, 'isSelect', false);
                })
                if(res.data.code == "0"){
                  this.judge = false;
                }
              })
            }
          }
          // finsh
           if(this.changeStatus == 'finsh') {
            if(this.form2.zhi == '全部类型') {
              this.$http.post(this.GLOBAL.base_url + '/api/patent/orderList', {
                user_id:this.$cookie.getCookie('u_id'),
                page:this.currentPage1,
                patent_name:this.patentNum,
                order_no:this.orderNum,
                patent_no:this.applyNum,
                status:3
              }).then( res => {
                // console.log(res)
                this.list = res.data.data.data
                this.total = res.data.data.total
                this.judge = true
                var _this=this;
                this.list.map(function (item) {
                  _this.$set(item, 'isSelect', false);
                })
                if(res.data.code == "0"){
                  this.judge = false;
                }
                this.nocount = res.data.data.noPay_num
                this.servicecount = res.data.data.service_num
                this.finish_num = res.data.data.finish_num
              })
            }
            if(this.form2.zhi != '全部类型') {
              this.$http.post(this.GLOBAL.base_url+'/api/patent/orderList',{
              user_id:this.$cookie.getCookie('u_id'),
              page:this.currentPage1,
              patent_name:this.patentNum,
              order_no:this.orderNum,
              patent_no:this.applyNum,
              good_type:this.form2.zhi,
              status:3
              }).then( res => {
                this.list = res.data.data.data
                this.total = res.data.data.total
                this.judge = true
                 var _this=this;
                this.list.map(function (item) {
                  _this.$set(item, 'isSelect', false);
                })
                if(res.data.code == "0"){
                  this.judge = false;
                }
              })
            }
          }
    },
    // 获取服务类型列表
    getList1(){
      this.$http.post(this.GLOBAL.base_url+'/api/patent/goodType',{
        type:'专利服务',
        grade:''
      }).then( res => {
        // console.log(res)
        this.service = res.data.data
      })
    },
    // 查询
    search(){
          this.currentPage1 = 1;
          this.getList();
    },
    // 分页处理
    handleSizeChange(val) {
                this.pageSize = val;
                this.getList();
    },
    // 分页处理
    handleCurrentChange(val) {
            this.currentPage1 = val;
            this.getList();
    },
    // 订单详情
    toDetail(id,value1){
          this.$router.push({
            path:'/personal/patentDetailed',
            query:{
              id:id,
              click_type:value1
            }
          })
    },
    // 支付
    toPay(val,val1){
            this.$router.push({
                path:'/checkPatent',
                query:{
                    id:val,
                    click_type:val1
                }
            })
    },
    // 确认收货
    recive(val,val1){
          this.$http.post(this.GLOBAL.base_url+'/api/patent/orderEnd',{
                    user_id:this.$cookie.getCookie('u_id'),
                    id:val,
                    type:val1
                }).then(res=>{
                    if(res.data.code=="1"){
                        this.tip('success','订单已完成')
                        this.$router.go(0)
                    }
                })
    },
    // 上传资料
    submit(m1,m2){
      if(m1 == "发明专利申请"){
        this.$router.push({
          path:'/patentInvention',
          query:{
              id:m2,
              edit:1
          }
        });
      }
      if(m1 == '实用新型专利申请'){
        this.$router.push({
          path:'/patentNew',
          query:{
            id:m2,
            edit:1
          }
        })
      }
      if(m1 == '外观设计专利申请'){
        this.$router.push({
          path:'/patentAppearance',
          query:{
            id:m2,
            edit:1
          }
        })
      }
      if(m1 == '发明专利加速申请'){
        this.$router.push({
          path:'/patentquicken',
          query:{
            id:m2,
            edit:1
          }
        })
      }
      if(m1 == '专利变更申请'){
        this.$router.push({
          path:'/patentAlteration',
          query:{
            id:m2,
            edit:1
          }
        })
      }
      if(m1 == '专利转让申请'){
        this.$router.push({
          path:'/patentTransfer',
          query:{
            id:m2,
            edit:1
          }
        })
      }
    },
    // 修改资料
    edit(m1,m2,val){
      if(m1 == "发明专利申请"){
        this.$router.push({
          path:'/patentInvention',
          query:{
              click_type:m1,
              id:m2,
              status:val,
              edit:2
          }
        });
      }
      if(m1 == "实用新型专利申请"){
        this.$router.push({
          path:'/patentNew',
          query:{
              click_type:m1,
              id:m2,
              status:val,
              edit:2
          }
        });
      }
      if(m1 == "外观设计专利申请"){
        this.$router.push({
          path:'/patentAppearance',
          query:{
              click_type:m1,
              id:m2,
              status:val,
              edit:2
          }
        });
      }
      if(m1 == "专利变更申请"){
        this.$router.push({
          path:'/patentAlteration',
          query:{
              click_type:m1,
              id:m2,
              status:val,
              edit:2
          }
        });
      }
      if(m1 == "专利转让申请"){
        this.$router.push({
          path:'/patentTransfer',
          query:{
              click_type:m1,
              id:m2,
              status:val,
              edit:2
          }
        });
      }
      if(m1 == "发明专利加速申请"){
        this.$router.push({
          path:'/patentquicken',
          query:{
              click_type:m1,
              id:m2,
              status:val,
              edit:2
          }
        });
      }
    },
    // 说明书撰写
    watch(val1,val2,val3){
      // 发明专利申请
      if (val1 == '发明专利申请'&&val3 == '专利说明书已撰写' ) {
        this.$router.push({
          path:'/patentExplain',
          query:{
              click_type:val1,
              id:val2,
              status:val3
          }
        })
      }
      if (val3 == '第一次审查意见陈述已撰写'&&val1 == '发明专利申请') {
        this.$router.push({
              path:'/patentApplication',
              query:{
                click_type:val1,
                id:val2,
                status:val3
              }
        })
      }
      if (val3 == '第二次审查意见陈述已撰写'&&val1 == '发明专利申请') {
        this.$router.push({
              path:'/patentApplication',
              query:{
                click_type:val1,
                id:val2,
                status:val3
              }
        })
      }
      if (val3 == '第三次审查意见陈述已撰写'&&val1 == '发明专利申请') {
        this.$router.push({
              path:'/patentApplication',
              query:{
                click_type:val1,
                id:val2,
                status:val3
              }
        })
      }
      // 发明专利加速申请
      if (val1 == '发明专利加速申请'&&val3 == '专利说明书已撰写' ) {
        this.$router.push({
          path:'/patentQuickenExplain',
          query:{
              click_type:val1,
              id:val2,
              status:val3
          }
        })
      }
       if (val3 == '第一次审查意见陈述已撰写'&&val1 == '发明专利加速申请') {
        this.$router.push({
              path:'/patentApplication',
              query:{
                click_type:val1,
                id:val2,
                status:val3
              }
        })
      }
      if (val3 == '第二次审查意见陈述已撰写'&&val1 == '发明专利加速申请') {
        this.$router.push({
              path:'/patentApplication',
              query:{
                click_type:val1,
                id:val2,
                status:val3
              }
        })
      }
      if (val3 == '第三次审查意见陈述已撰写'&&val1 == '发明专利加速申请') {
        this.$router.push({
              path:'/patentApplication',
              query:{
                click_type:val1,
                id:val2,
                status:val3
              }
        })
      }
      // 实用新型专利申请
      if (val1 == '实用新型专利申请'&& val3 == '专利说明书已撰写') {
        this.$router.push({
          path:'/patentNewExplain',
          query:{
            click_type:val1,
            id:val2,
            status:val3
          }
        })
      }
      // 外观设计专利申请
       if (val1 == '外观设计专利申请'&& val3 == '专利说明书已撰写') {
        this.$router.push({
          path:'/patentFacadeExplain',
          query:{
            click_type:val1,
            id:val2,
            status:val3
          }
        })
      }
    },
    // 查看缴费
    bill(z1,val,val1) {
      if (z1 == '发明专利申请'&&val1 == '专利受理和缴费通知书已下发') {
        this.$router.push({
              path:'/patentPayment',
              query:{
                click_type:z1,
                id:val,
                status:val1
              }
        })
      }
      if (z1 == '发明专利申请'&&val1 == '办理登记和缴费通知书已下发') {
        this.$router.push({
              path:'/patentAuthorizationPay',
              query:{
                click_type:z1,
                id:val,
                status:val1
              }
        })
      }
      // 发明专利加速申请
      if (z1 == '发明专利加速申请'&&val1 == '专利受理和缴费通知书已下发') {
        this.$router.push({
              path:'/patentPayment',
              query:{
                click_type:z1,
                id:val,
                status:val1
              }
        })
      }
      if (z1 == '发明专利加速申请'&&val1 == '办理登记和缴费通知书已下发') {
        this.$router.push({
              path:'/patentAuthorizationPay',
              query:{
                click_type:z1,
                id:val,
                status:val1
              }
        })
      }
      // 实用新型专利申请
      if (z1 == '实用新型专利申请'&&val1 == '专利受理和缴费通知书已下发') {
        this.$router.push({
              path:'/patentNewpay',
              query:{
                click_type:z1,
                id:val,
                status:val1
              }
        })
      }
      if (z1 == '实用新型专利申请'&&val1 == '办理登记和缴费通知书已下发') {
        this.$router.push({
              path:'/patentNewAuthorizationPay',
              query:{
                click_type:z1,
                id:val,
                status:val1
              }
        })
      }
      // 外观设计专利申请
      if (z1 == '外观设计专利申请'&&val1 == '专利受理和缴费通知书已下发') {
        this.$router.push({
              path:'/patentFacadepay',
              query:{
                click_type:z1,
                id:val,
                status:val1
              }
        })
      }
      if (z1 == '外观设计专利申请'&&val1 == '办理登记和缴费通知书已下发') {
        this.$router.push({
              path:'/patentFacadeAuthorizationPay',
              query:{
                click_type:z1,
                id:val,
                status:val1
              }
        })
      }
      // 专利转让申请
       if (z1 == '专利转让申请'&&val1 == '著录项变更缴费通知书已下发') {
        this.$router.push({
              path:'/patentTransferPay',
              query:{
                click_type:z1,
                id:val,
                status:val1
              }
        })
      }
      // 专利变更申请
      if (z1 == '专利变更申请'&&val1 == '著录项变更缴费通知书已下发') {
        this.$router.push({
              path:'/patentAlterationPay',
              query:{
                click_type:z1,
                id:val,
                status:val1
              }
        })
      }
    },
    // 分页
    pageChange (pageNum) {
       this.currentPage1 = pageNum;
    },

  },
  mounted(){
    this.changeStatus = this.$route.query.status;
    if(this.$route.query.status == "all"){
        this.getList();
    }else{
       this.getList();
    }
    this.gettest();
    this.getList1();
  },
  created() {
        this.currentPage1 = Number(localStorage.getItem('orderpagination')) || 1;
        this.pageChange(this.currentPage1);
        this.pageChange(this.currentPage1);
      },
      beforeUpdate () {
          localStorage.setItem('orderpagination', this.currentPage1);
      },
      beforeDestroy () {
          localStorage.setItem('orderpagination', '1');
      }

}

</script>

<style scoped>
    .order-box{
        width: 1015px;
        float: left;
        margin-left: 16px;
        min-height: 1108px;
        background-color: #fff;
        margin-top: 12px;
        padding-top: 32px;
        box-sizing: border-box;
    }
    /* 修改前 */
    /* .order-box-top{
        height: 108px;
        border-bottom: 1px solid #d8d8d8;
    } */
    .order-box-title {
      margin-left: 66px;
    }
    .order-box-title,.order-box-title>div{
        height: 32px;
    }
    .order-box-title>div>div{
        float: left;
        width: 64px;
        height: 32px;
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
    .order-box-search{
        width: 780px;
        border-top: 1px solid #d8d8d8;
        height: 270px;
        border-bottom: 1px solid #d8d8d8;
        margin-left: 66px;
    }
    .order-box-search>div{
        height: 32px;
        margin: 25px 0 20px ;
    }
    .order-box-search>div>div{
        float: left;
    }
    .order-box-search>div>div:nth-of-type(1){
        margin: 0 186px 0 0px;
    }
    .order-box-search>div>div>span{
        margin-right: 16px;
        font-family: "PingFangSC";
        font-size: 14px;
        color: #333333;
    }
    .order-type-select{
        width: 220px;
    }
    .order-box-search-detail{
        height: 32px;
        margin-bottom: 32px;
    }
    .order-box-search-detail>span{
        font-family: "PingFangSC";
        font-size: 14px;
        color: #333333;
    }
    .order-box-search-detail>span:nth-of-type(2){
        margin-left: 163px;
    }
    .order-box-search-detail>input{
        width: 220px;
        height: 32px;
        border-radius: 4px;
        border: solid 1px #d6d6d6;
        outline: none;
        padding-left: 12px;
        margin-left: 18px;
        box-sizing: border-box;
    }
    #order-box-search-buttom{
        width: 80px;
        height: 36px;
        line-height: 36px;
        background: url("/static/images/invalid-name1f.png") no-repeat;
        background-size: cover;
        cursor: pointer;
        margin-left: 700px;
        color: #fff;
        font-family: "PingFangSC";
        font-size: 14px;
        text-align: center;
    }
    .order-box-list{
        width: 780px;
        /* height: 904px; */
        /* border:1px solid red; */
        margin-left: 66px;
    }
    /* .order-box-list-detail{
        height: 804px;

    } */
    .order-box-list-detail>div{
        height: 180px;
        border-bottom:solid 1px #d6d6d6;
    }
    .order-box-list-detail>div>div{
        float: left;
    }
    .order-box-list-detail-img{
        /* display: table-cell; */
        width: 118px;
        height: 118px;
        border: solid 1px #d8d8d8;
        margin: 20px 25px 20px 20px;
        text-align: center;

    }
    .order-box-list-detail-img>img{
       margin-top: 30px;
       width: 80px;
       height: 60px;
    }
    .order-box-list-detail-div1{
        width: 230px;
        margin: 24px 30px 0 0;
    }
    .order-box-list-detail-div2{
        width: 177px;
        margin: 24px 20px 0 0;
    }
    .order-box-list-detail-div1>div,.order-box-list-detail-div2>div{
        margin-bottom: 24px;
    }
    .order-box-list-detail-div1>div>span:nth-of-type(1),.order-box-list-detail-div2>div>span:nth-of-type(1){
        font-family: "PingFangSC-Medium";
        font-size: 14px;
        font-weight: 500;
        color: #333333;
    }
    .order-box-list-detail-div1>div>span:nth-of-type(2),.order-box-list-detail-div2>div>span:nth-of-type(2){
        font-family: "PingFangSC";
        font-size: 14px;
        color: #999999;
    }
    .order-box-list-detail-div1>div:nth-of-type(3){
         text-overflow: ellipsis;
         overflow: hidden;
         word-break: break-all;
         white-space: nowrap;
    }
    .order-box-list-detail-div3{
        width: 135px;
        height: 120px;
        border-left:1px dotted #d8d8d8;
        margin-top: 20px;
        text-align: center;
    }
    .order-box-list-detail-div3>div>p{
        font-family: "PingFangSC";
        font-size: 14px;
        margin-bottom: 14px;
    }
    .order-box-list-detail-div3>div>p:nth-of-type(1){
        color: #f96006;
    }
    .order-box-list-detail-div3>div>p:nth-of-type(2),.order-box-list-detail-div3>div>p:nth-of-type(3),.order-box-list-detail-div3>div>p:nth-of-type(4){
        cursor: pointer;
        color: gray;
    }
    .order-box-list-detail-div3>div>p:nth-of-type(2):hover{
        color: #f96006;
    }
    .order-box-list-detail-div3>div>p:nth-of-type(3):hover{
        color: #f96006;
    }
    .order-box-list-detail-div3>div>p:nth-of-type(4):hover{
        color: #f96006;
    }
    .order-box-nodata{
        text-align: center;
        margin: 80px 0 300px;
    }
    .order-box-fen{
        width: 500px;
        margin: 50px auto;
        text-align: center;
    }
    .order-pay{
        width: 780px;
        height: 100px;
        border-bottom:1px solid #d8d8d8;
        margin-left: 66px;
    }
    .order-pay>div:nth-of-type(1){
        float: left;
    }
    .order-pay>div:nth-of-type(2){
        float: right;
    }
    .pay-div1{
        margin-top: 42px;
    }
    .pay-div1>input{
        width: 16px;
        height: 16px;
        cursor: pointer;
        vertical-align: middle;
    }
    .pay-div1>span{
        font-size: 14px;
        color: #333333;
        vertical-align: middle;
    }
    .pay-div2{
        height: 36px;
        margin-top: 32px;
    }
    .pay-div2{
        width: 180px;
    }
    .pay-div2>div{
        float: right;
        width: 80px;
        height: 36px;
        border:1px solid red;
        color: #f96006;
        border-radius: 4px;
        text-align: center;
        line-height: 36px;
        background: #fbefe9;
        cursor: pointer;
    }
    .pay-div2>div:nth-of-type(2){
        margin-right: 16px;
    }
    .everycheck{
        width: 16px;
        height: 16px;
        margin-top: 70px;
        cursor: pointer;
    }
    .pact{
        width: 100%;
        height: 100%;
        position: fixed;
        top:0;
        left: 0;
        z-index: 10;
        background-color: rgba(0, 0, 0, 0.8);
    }
    .pact-div{
        width: 600px;
        height: 512px;
        background-color: #ffffff;
        position: absolute;
        top:50%;
        left: 50%;
        transform: translate(-50%,-50%)
    }
    .pact-div>img{
        position: absolute;
        right: 17px;
        top: 17px;
        cursor: pointer;
    }
    .pact-inf{
        position: absolute;
        top:30px;
        left: 106px;
    }
    .pact-inf>p{
        font-size: 16px;
        color: #333333;
        margin-bottom: 38px;
        text-align: center;
    }
    .pact-div1{
        margin-bottom: 24px;
    }
    .pact-div1>span{
        font-size: 14px;
        color: #333333;
        vertical-align: middle;
    }
    .pact-div1-span1{
        margin-right: 16px;
    }
    .pact-div1-span2{
        margin-right: 60px;
    }
    .pact-div1>input{
        width: 16px;
        height: 16px;
        cursor: pointer;
        margin-right: 10px;
        vertical-align: middle;
    }
    .pact-div2{
        margin-bottom: 30px;
        margin-left: 14px;
        height: 32px;
    }
    .pact-div2>div{
        float: left;
    }
    .pact-div2>div:nth-of-type(1)>span{
        font-size: 14px;
        color: #333333;
        margin-right: 16px;
    }
    .form_select{
        width: 200px;
        height: 32px;
        border-radius: 4px;
        border: solid 1px #d6d6d6;
        outline: none;
        margin-right: 20px;
    }
    .pact-div2>div:nth-of-type(2){
        width: 78px;
        height: 30px;
        background: #fbefe9;
        border:1px solid red;
        border-radius: 3px;
        font-size: 14px;
        color: #f96006;
        text-align: center;
        line-height: 30px;
        cursor: pointer;
    }
    .pact-div3{
        margin: 0 0 30px 14px;
    }
    .pact-div4{
        margin-bottom: 30px;
    }
    .pact-div4>span,.pact-div3>span{
        font-size: 14px;
        color: #333333;
        margin-right: 16px;
    }
    .pact-div4>input,.pact-div3>input{
        width: 290px;
        height: 32px;
        border-radius: 4px;
        border: solid 1px #d6d6d6;
        outline: none;
        padding-left: 10px;
    }
    .pact-div5{
        margin: 0 auto 18px;
        width: 108px;
        height: 36px;
        border-radius: 4px;
        background-color:#f96006;
        color: #ffffff;
        font-size: 14px;
        text-align: center;
        line-height: 36px;
        cursor: pointer;
    }
    .pact-div6{
        width: 170px;
        margin: 0 auto;
        font-size: 10px;
        color: #f96006;
    }
    .check-show{
        width: 16px;
        height: 160px;
    }
    .order-box-patent1 > input {
      width: 220px;
      height: 32px;
      border-radius: 4px;
      border: solid 1px #d6d6d6;
      outline: none;
      padding-left: 12px;
      /* margin-left: 18px; */
      /* -webkit-box-sizing: border-box; */
      box-sizing: border-box;
    }
</style>
<style>
.el-select .el-input.is-focus .el-input__inner{
    border-color: #dcdfe6;
}
.el-select .el-input__inner:focus{
    border-color: #dcdfe6;
}
.el-select-dropdown__item.selected{
    color: #606266;
    font-weight: normal;
}
.el-badge{
    top: -34px;
    left: 36px;

}
.el-input__inner {
  height:  32px !important;
}
.el-input__suffix {
  position: absolute !important;
  top: 4px !important;
}
</style>




