<template>
  <div class="applyInvoice-container">
    <div class="apply-box">
      <div class="apply-box-top" :class="changeClass">
        <span @click="changeType('trade')" class="tradeInvoice">商标发票</span>
        <span @click="changeType1" class="patentInvoice">专利发票</span>
        <span @click="changeType2" class="copyrightInvoice">版权发票</span>
        <span @click="changeType('other')" class="otherInvoice">其他发票</span>
        <!-- <div class="apply-box-top1">
          <input type="text" placeholder="请输入订单编号或商品名称" v-model="word">
          <img src="/static/images/orderSearch.png" alt="" @click="find">
        </div> -->
      </div>
      <!-- 商标发票 -->
      <div style="clear:both"></div>
      <div class="apply-box-list" v-show="is_show">
        <div class="apply-box-list-top">
          <input type="checkbox" @click="selectProduct(isSelectAll)" v-bind:checked="isSelectAll">
          <div>订单编号</div>
          <div>商品名称</div>
          <div>服务类型</div>
          <div>订单金额</div>
          <div>支付方式</div>
          <div>下单时间</div>
        </div>
        <div>
          <div class="apply-box-list-detail" v-for="(v,k) in arr" :key="k">
            <input type="checkbox" v-bind:checked="v.isSelect" @change="v.isSelect=!v.isSelect">
            <div>{{v.order_id}}</div>
            <div>{{v.good_name}}</div>
            <div>{{v.click_type}}</div>
            <div>￥{{v.total_price}}</div>
            <div>{{v.payType}}</div>
            <div>{{v.create_time}}</div>
          </div>
        </div>
      </div>
      <!-- <div class="apply-box-page" v-show="is_show">
        <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage1"
            :page-size="pageSize"
            layout="prev, pager, next"
            :total="total">
        </el-pagination>
      </div> -->
      <div class="apply-box-buttom" @click="invoiceApply" v-show="is_show"></div>
      <!-- 专利发票 -->
      <div style="clear:both"></div>
      <div class="apply-box-list" v-show="patentShow">
        <div class="apply-box-list-top">
          <div class="w218">订单编号</div>
          <div>商品名称</div>
          <div>服务类型</div>
          <div>订单金额</div>
          <div>支付方式</div>
          <div>下单时间</div>
        </div>
        <div>
          <div class="apply-box-list-detail" v-for="(v,k) in list" :key="k">
            <input type="checkbox" v-bind:checked="v.isSelect" @change="v.isSelect=!v.isSelect">
            <div>{{v.order_id}}</div>
            <div>{{v.good_name}}</div>
            <div>{{v.click_type}}</div>
            <div>￥{{v.total_price}}</div>
            <div>{{v.pay_name}}</div>
            <div>{{v.created_at}}</div>
          </div>
        </div>
      </div>
      <div class="apply-box-page" v-show="patentShow">
        <el-pagination
            @size-change="handleSizeChange1"
            @current-change="handleCurrentChange1"
            :current-page="page"
            :page-size="len"
            layout="prev, pager, next"
            :total="total1">
        </el-pagination>
      </div>
      <div class="apply-box-buttom" @click="invoiceApply1" v-show="patentShow"></div>
      <!-- 版权发票 -->
      <div class="apply-box-list" v-show="copyrighShow">
        <div class="apply-box-list-top">
          <div class="w218">订单编号</div>
          <div>商品名称</div>
          <div>服务类型</div>
          <div>订单金额</div>
          <div>支付方式</div>
          <div>下单时间</div>
        </div>
        <div>
          <div class="apply-box-list-detail" v-for="(v,k) in copyrightData" :key="k">
            <input type="checkbox" v-bind:checked="v.isSelect" @change="v.isSelect=!v.isSelect">
            <div>{{v.order_id}}</div>
            <div>{{v.good_name}}</div>
            <div>{{v.click_type}}</div>
            <div>￥{{v.total_price}}</div>
            <div>{{v.pay_name}}</div>
            <div>{{v.created_at}}</div>
          </div>
        </div>
      </div>
      <div class="apply-box-page" v-show="copyrighShow">
        <el-pagination
            @size-change="handleSizeChange2"
            @current-change="handleCurrentChange2"
            :current-page="page1"
            :page-size="len1"
            layout="prev, pager, next"
            :total="total2">
        </el-pagination>
      </div>
      <div class="apply-box-buttom" @click="invoiceApply2" v-show="copyrighShow"></div>
    </div>
    <!-- 商标申请发票 -->
    <div class="apply-box-tan" v-show="tan">
      <div class="apply-box-tan-div">
        <span>申请发票</span>
        <img @click="cha" src="/static/images/cha.png" alt="">
        <div class="apply-box-tan-type">
          <span class="apply-box-tan-type-span1">选择开票类型：</span>
          <input v-model="kai" value="one" name="piao"  type="radio"><span class="apply-box-tan-type-span2">普通发票</span>
          <input v-model="kai" value="two" name="piao" type="radio"><span>增值税发票</span>
        </div>
        <div class="apply-box-tan-add">
          <span>已有开票信息：</span>
          <select v-model="pick">
            <option value="0">请选择</option>
            <option v-for="(v,k) in arr2" v-bind:value="v.id" :key="k">{{v.company_name}}</option>
          </select>
          <div @click="addInvoice">新增</div>
        </div>
        <div @click="comfire" class="apply-box-tan-comfire">确定</div>
      </div>
    </div>
    <!-- 专利申请发票 -->
    <div class="apply-box-tan" v-show="tan1">
      <div class="apply-box-tan-div">
        <span>申请发票1</span>
        <img @click="cha" src="/static/images/cha.png" alt="">
        <div class="apply-box-tan-type">
          <span class="apply-box-tan-type-span1">选择开票类型：</span>
          <input v-model="kai" value= 'one' name="piao1"  type="radio"><span class="apply-box-tan-type-span2">增值税普通发票</span>
          <input v-model="kai" value= 'two' name="piao1" type="radio"><span>增值税专用发票</span>
        </div>
        <div class="apply-box-tan-add">
          <span>已有开票信息：</span>
          <select v-model="pick">
            <option value="0">请选择</option>
            <option v-for="(v,k) in arr2" v-bind:value="v.id" :key="k">{{v.company_name}}</option>
          </select>
          <div @click="addInvoice">新增</div>
        </div>
        <div @click="comfire1" class="apply-box-tan-comfire">确定</div>
      </div>
    </div>
    <!-- 版权申请发票 -->
    <div class="apply-box-tan" v-show="tan2">
      <div class="apply-box-tan-div">
        <span>申请发票1</span>
        <img @click="cha" src="/static/images/cha.png" alt="">
        <div class="apply-box-tan-type">
          <span class="apply-box-tan-type-span1">选择开票类型：</span>
          <input v-model="kai" value= 'one' name="piao2"  type="radio"><span class="apply-box-tan-type-span2">增值税普通发票</span>
          <input v-model="kai" value= 'two' name="piao2" type="radio"><span>增值税专用发票</span>
        </div>
        <div class="apply-box-tan-add">
          <span>已有开票信息：</span>
          <select v-model="pick">
            <option value="0">请选择</option>
            <option v-for="(v,k) in arr2" v-bind:value="v.id" :key="k">{{v.company_name}}</option>
          </select>
          <div @click="addInvoice">新增</div>
        </div>
        <div @click="comfire2" class="apply-box-tan-comfire">确定</div>
      </div>
    </div>
    <div style="clear:both;"></div>
  </div>
</template>

<script>
export default {
  name: 'applyInvoice',
  data(){
      return{
        // 分页
          total:0,
          currentPage1: 1,
          pageSize: 10,
          kai:'one',
          tan:false,
          pick:'0',
          arr:[],
          arr2:[],
          word:'',
          // 切换样式
          changeClass:'trade',
          // 商标专利显示或者隐藏
          is_show:true,
          // 专利发票
          list:[],
          len:10,
          page:1,
          total1:0,
          tan1:false,
          fa:1,
          patentShow:false,
          word:'',
          copyrighShow:false,
          copyrightData:[],
          total2:0,
          len1:10,
          page1:1,
          tan2:false
      }
  },
  components: {

  },
  watch:{
      "kai"(newValue){
          if(newValue =='one'){
              this.getlist();
          }else if(newValue=='two'){
            this.getlist();
          }
      },
  },
  computed:{
    //    全选
      isSelectAll:function(){
            if(this.arr !=0){
                return this.arr.every(function (val) { return val.isSelect});
            }else{
                return false;
            }
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
    selectProduct:function(_isSelect){
                for (var i = 0; i< this.arr.length; i++) {
                    this.arr[i].isSelect = !_isSelect;
                }
            },
    invoiceApply(){
        var prolist = this.arr.filter(function (val) { return val.isSelect});
        if(prolist.length == 0){
          this.$alert('请选择开票的订单','温馨提醒',{
            confirmButtonText: '确定'
        })
            return false
        }
       this.tan = true;
    },
    cha(){
       this.tan = false;
       this.tan1 = false;
       this.tan2 = false;
    },
    comfire(){
        var prolist = this.arr.filter(function (val) { return val.isSelect});
        var a = '';
        for (var i = 0;i< prolist.length; i++) {
          a+=prolist[i].order_id+',';
        }
        a =  a.substring(0,a.length-1);
        var type = '';
        if(this.changeClass =='trade'){
          type = 1
        }else{
          type = 2
        }
       if(this.pick == "0"){
          return false;
       }else{
          this.$http.post(this.GLOBAL.base_url+'/api/InvoiceApply/applyInvoice',{
            user_id:this.$cookie.getCookie('u_id'),
            order_id:a,
            invoice_id:this.pick,
            type:type
          }).then(res=>{
            if(res.data.code == "1"){
              this.tip('success',res.data.msg);
              this.tan = false;
              this.arr=this.arr.filter(function (item) {return !item.isSelect});
              this.$router.go(0);
            }
          })
       }
    },
    addInvoice(){
       this.$router.push('/personal/manageForm')
       this.tan = false;
    },
    getdata(){
      if(this.changeClass =='trade'){
        this.$http.post(this.GLOBAL.base_url+'/api/InvoiceApply/InvoiceList',{
                    user_id:this.$cookie.getCookie('u_id'),
                    // keyWords:this.word,
                    // page:this.currentPage1
                }).then(res=>{
                  // console.log(res)
                  if(res.data.code == "1"){
                    this.arr = res.data.data;
                    // this.total= res.data.count;
                    var _this=this;
                    this.arr.map(function (item) {
                        _this.$set(item, 'isSelect', false);
                    })
                  }else{
                    this.arr = [];
                    // this.tip('error',res.data.msg)
                  }
                })
      }else if(this.changeClass =='other'){
        this.$http.post(this.GLOBAL.base_url+'/api/InvoiceApply/levelInvoiceList',{
                    user_id:this.$cookie.getCookie('u_id'),
                    // keyWords:this.word,
                    // page:this.currentPage1
                }).then(res=>{
                  // console.log(res)
                  if(res.data.code == "1"){
                    this.arr = res.data.data;
                    // this.total= res.data.count;
                    var _this=this;
                    this.arr.map(function (item) {
                        _this.$set(item, 'isSelect', false);
                    })
                  }else{
                    this.arr = [];
                    // this.tip('error',res.data.msg)
                  }
                })
      }

    },
    getlist(){
       if(this.kai == 'one'){
          this.$http.get(this.GLOBAL.base_url+'/api/usercenter/checkinvoices',{params:{
                      user_id:this.$cookie.getCookie('u_id'),
                      type:1
                  }}).then(res=>{
                    this.arr2 = res.data.data;
                  })
       }else{
         this.$http.get(this.GLOBAL.base_url+'/api/usercenter/checkinvoices',{params:{
                    user_id:this.$cookie.getCookie('u_id'),
                    type:2
                }}).then(res=>{
                  this.arr2 = res.data.data;
                })
       }
    },
    // handleSizeChange(val) {
    //           this.pageSize = val;
    //           this.getdata();
    // },
    // handleCurrentChange(val) {
    //       this.currentPage1 = val;
    //       this.getdata();
    // },
    changeType(val) {
      this.changeClass = val
      this.copyrighShow = false
      this.is_show = true
      this.patentShow = false
      this.getdata()
    },
    changeType1() {
       this.changeClass = 'patent'
       this.is_show = false
       this.copyrighShow = false
       this.patentShow = true
       this.getPatent()
    },
    changeType2() {
       this.changeClass = 'copyright'
       this.patentShow = false
       this.is_show = false
       this.copyrighShow = true
       this.getcopyright()
    },
    find(){
       if(this.word == ''){
         this.getdata();
       }else{
         this.currentPage1 =1
         this.getdata()
       }
     },
    // 专利发票
    // 未开发票信息
    getPatent(){
        this.$http.post(this.GLOBAL.base_url+'/api/patent/unInOList',{
          user_id:this.$cookie.getCookie('u_id'),
          page:this.page,
          len:this.len
        }).then( res => {
          // console.log(res)
          if(res.data.code == '1') {
            this.list = res.data.data.data
            this.total1 = res.data.data.total
            var _this=this;
            this.list.map(function (item) {
              _this.$set(item, 'isSelect', false);
            })
          }
        })
    },
    // 专利分页
    handleSizeChange1(val) {
              this.len = val;
              this.getPatent();
    },
    handleCurrentChange1(val) {
          this.page =val;
          this.getPatent();
    },
    // 弹出专利开发票弹框
    invoiceApply1(){
        var prolist = this.list.filter(function (val) { return val.isSelect});
        if(prolist.length == 0){
          this.$alert('请选择开票的订单','温馨提醒',{
            confirmButtonText: '确定'
        })
            return false
        }
       this.tan1 = true;
    },
    comfire1(){
        var prolist1 = this.list.filter(function (val) { return val.isSelect});
        var b = '';
        for (var i = 0;i< prolist1.length; i++) {
          b+=prolist1[i].order_id+',';
        }
        b =  b.substring(0,b.length-1);
        if(this.pick == "0"){
          return false;
        }else{
          this.$http.post(this.GLOBAL.base_url+'/api/patent/applyIn',{
            user_id:this.$cookie.getCookie('u_id'),
            id:b,
            invoice_id:this.pick
          }).then(res=>{
            // console.log(res)
              this.tip('success','申请发票成功');
              this.tan1 = false;
              this.getPatent()
              // this.list=this.list.filter(function (item) {return !item.isSelect});
              // this.$router.go(0);
          })
       }
    },
    // 版权订单
    // 未开发票信息
    getcopyright(){
        this.$http.post(this.GLOBAL.base_url+'/api/copyRight/unInOList',{
          user_id:this.$cookie.getCookie('u_id'),
          page:this.page1,
          len:this.len1
        }).then( res => {
          // console.log(res)
          if(res.data.code == '1') {
            this.copyrightData = res.data.data.data
            this.total2 = res.data.data.total
            var _this=this;
            this.list.map(function (item) {
              _this.$set(item, 'isSelect', false);
            })
          }
        })
    },
    // 版权分页
    handleSizeChange2(val) {
              this.len1 = val;
              this.getcopyright();
    },
    handleCurrentChange2(val) {
          this.page1 = val;
          this.getcopyright();
    },
    invoiceApply2(){
        var copyrightlist = this.copyrightData.filter(function (val) { return val.isSelect});
        if(copyrightlist.length == 0){
          this.$alert('请选择开票的订单','温馨提醒',{
            confirmButtonText: '确定'
        })
            return false
        }
       this.tan2 = true;
    },
    comfire2(){
        var copyrightlist = this.copyrightData.filter(function (val) { return val.isSelect});
        var b = '';
        for (var i = 0;i< copyrightlist.length; i++) {
          b+=copyrightlist[i].order_id+',';
        }
        b =  b.substring(0,b.length-1);
        if(this.pick == "0"){
          return false;
        }else{
          this.$http.post(this.GLOBAL.base_url+'/api/copyRight/applyIn',{
            user_id:this.$cookie.getCookie('u_id'),
            id:b,
            invoice_id:this.pick
          }).then(res=>{
            // console.log(res)
              this.tip('success','申请发票成功');
              this.tan2 = false;
              this.getcopyright()
              // this.list=this.list.filter(function (item) {return !item.isSelect});
              // this.$router.go(0);
          })
       }
    },
  },
  mounted(){
    this.getdata();
    this.getlist();
    this.getcopyright();
  }
}
</script>

<style scoped>
  .apply-box{
    width: 1015px;
    margin-left: 16px;
    float: left;
    /* margin-bottom: 100px; */
    margin-top: 12px;
    background-color: #fff;
    padding-top: 28px;
    box-sizing: border-box;
    min-height: 1024px;
  }
  .apply-box-top{
    width: 887px;
    margin: 0px 0px 12px 64px;
    border-bottom: 1px solid #eee;
    height: 28px;
    font-family: "PingFangSC";
    font-size: 14px;
    cursor: pointer;
    color: #666;
    position: relative;
  }
  .apply-box-top > span:nth-child(1) {
    margin-right: 55px;
    display: inline-block;
    height: 28px;
    line-height: 28px;
  }
  .apply-box-top > span:nth-child(2) {
    margin-right: 55px;
    display: inline-block;
    height: 28px;
    line-height: 28px;
  }
  .apply-box-top > span:nth-child(3) {
    margin-right: 55px;
    display: inline-block;
    height: 28px;
    line-height: 28px;
  }
  .trade .tradeInvoice,.other .otherInvoice,.patent .patentInvoice,.copyright .copyrightInvoice{
    color: #333;
    border-bottom: 1px solid #999;
    font-weight: 600;
  }
  .apply-box-list{
    /* height: 550px; */
  }
  .apply-box-list-top{
    height: 36px;
    width: 885px;
    line-height: 36px;
    border: 1px solid #eee;
    margin: 0 auto;
    background-color: #fafafa;
  }
  .apply-box-list-top>input{
    float: left;
    width: 16px;
    height: 16px;
    margin-top: 10px;
    margin-left: 20px;
    cursor: pointer;
  }
  .apply-box-list-top>div{
    float: left;
    width: 110px;
    text-align: center;
    font-family: "PingFangSC";
    font-size: 14px;
    font-weight: 600;
    color: #333333;
  }
  .apply-box-list-top>div:nth-of-type(1){
    width:177px;
  }
  .apply-box-list-top>div:nth-of-type(6){
    width:170px;
  }
  .apply-box-list-detail{
    height: 22px;
    /* margin: 14px 0 27px; */
    width: 885px;
    margin: 0 auto;
    height: 36px;
    line-height: 36px;
    border: 1px solid #eee;
    border-top: none;
    box-sizing: border-box;
  }
  .apply-box-list-detail>input{
    float: left;
    width: 16px;
    height: 16px;
    margin-top: 10px;
    margin-left: 20px;
    cursor: pointer;
  }
 .apply-box-list-detail>div{
    float: left;
    width: 110px;
    height: 36px;
    line-height: 36px;
    text-align: center;
    font-family: "PingFangSC-Light";
    font-size: 14px;
    font-weight: 100;
    color: #333333;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .apply-box-list-detail>div:nth-of-type(1){
    width:180px;
    /* white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis; */
  }
  .apply-box-list-detail>div:nth-of-type(6){
    width:170px;
  }
  .apply-box-page{
    width: 400px;
    text-align: center;
    margin: 0 auto 37px;
    margin-top: 37px;
  }
  .apply-box-buttom{
    width: 108px;
    height: 36px;
    border-radius: 4px;
    border-style: solid;
    border-width: 2px;
    background: url(/static/images/invalid-name1j.png) no-repeat;
    /* border-image-source: linear-gradient(to top, #ba6100, #dc773b); */
    border-image-slice: 1;
    /* background-image: linear-gradient(to bottom, #f79000, #f96006), linear-gradient(to top, #ba6100, #dc773b); */
    background-origin: border-box;
    background-clip: content-box, border-box;
    text-align: center;
    line-height: 60px;
    margin: 40px auto 50px;
    font-family: "PingFangSC";
    font-size: 28px;
    color: #ffffff;
    cursor: pointer;
  }
  .apply-box-tan{
    background: rgba(0,0,0, 0.8);
    position: fixed;
    z-index: 20;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
  .apply-box-tan-div{
    width: 687px;
    height: 361px;
    background-color: #ffffff;
    position: absolute;
    top:50%;
    left: 50%;
    z-index: 30;
    transform: translate(-50%,-50%);
  }
  .apply-box-tan-div>span{
    font-family: "PingFangSC";
    font-size: 14px;
    color: #333333;
    position: absolute;
    top: 30px;
    left: 316px;
  }
  .apply-box-tan-div>img{
    position: absolute;
    top: 16px;
    right: 16px;
    cursor: pointer;
    height: 16px;
    width: 16px;
  }
  .apply-box-tan-type{
    position: absolute;
    height: 28px;
    top: 103px;
    left: 62px;
  }
  .apply-box-tan-type>span,.apply-box-tan-add>span{
    font-family: "PingFangSC";
    font-size: 14px;
    font-weight: 300;
    vertical-align: middle;
    color: #333333;
  }
  .apply-box-tan-type-span1{
    margin-right: 122px;
  }
  .apply-box-tan-type>input{
    width: 16px;
    height: 16px;
    margin-right: 12px;
    vertical-align: middle;
    cursor: pointer;
  }
  .apply-box-tan-type-span2{
    margin-right: 80px;
  }
  .apply-box-tan-add{
     position: absolute;
     width: 563px;
     height: 40px;
     line-height: 40px;
     top: 153px;
     left: 62px;
  }
  .apply-box-tan-add>span{
    margin-right: 95px;
  }
  .apply-box-tan-add>div{
    float: right;
    width: 80px;
    height: 36px;
    /* border-radius: 8px; */
    /* border-style: solid; */
    /* border-width: 2px; */
    background: url(/static/images/invalid-name1k.png);
    /* border-image-source: linear-gradient(to top, #d6d6d6, #d6d6d6); */
    /* border-image-slice: 1; */
    /* background-image: linear-gradient(to bottom, #ffffff, #e3e3e3), linear-gradient(to top, #d6d6d6, #d6d6d6); */
    /* background-origin: border-box; */
    /* background-clip: content-box, border-box; */
    text-align: center;
    line-height: 36px;
    font-family: "PingFangSC";
    font-size: 14px;
    color: #f96006;
    cursor: pointer;
    margin-top: 3px;
  }
  .apply-box-tan-add>select{
    width: 229px;
    height: 36px;
    border-radius: 4px;
    padding-left:15px;
    outline: none;
    border: solid 1px #d6d6d6;
    box-sizing: border-box;
  }
  .apply-box-tan-comfire{
    position: absolute;
    width: 563px;
    height:36px;
    line-height: 36px;
    bottom: 64px;
    left: 300px;
    width: 80px;
    height: 36px;
    background: url(/static/images/invalid-name1l.png);
    /* border-radius: 8px; */
    /* border-style: solid; */
    border-width: 2px;
    /* border-image-source: linear-gradient(to top, #ba6100, #dc773b); */
    border-image-slice: 1;
    /* background-image: linear-gradient(to bottom, #f79000, #f96006), linear-gradient(to top, #ba6100, #dc773b); */
    /* background-origin: border-box; */
    /* background-clip: content-box, border-box; */
    font-family: "PingFangSC";
    font-size: 14px;
    line-height: 36px;
    text-align: center;
    color: #ffffff;
    cursor: pointer;
  }
  .apply-box-top1 {
    position: absolute;
    right: 0;
    top: -2px;

  }
  .apply-box-top1>input {
    width: 270px;
    height: 28px;
    border-radius: 4px;
    border: 1px solid #d6d6d6;
    font-family: PingFangSC-Light;
    font-size: 16px;
    font-weight: 300;
    color: #a6a6a6;
    padding: 0 50px 0 10px;
    outline: none;
  }
  .apply-box-top1>img {
    width: 20px;
    height: 20px;
    position: absolute;
    top: 4px;
    right: 15px;
    cursor: pointer;
  }
  .w218 {
    width: 218px !important;
  }
</style>


