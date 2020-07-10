<template>
  <div class="brandBuy-container">
    <Top></Top>
    <Fix></Fix>
    <div class="brandBuy-box">
      <!-- 头部 -->
      <div class="brandBuy-header">
        <div class="brandBuy-header-mian">
          <span>商标市场</span>
          <input type="text" placeholder="请输入商标名称" v-model="brand_name">
          <span @click="search">搜索</span>
        </div>
      </div>
      <!-- 条件 -->
      <div class="brandBuy-proviso">
        <!-- 筛选条件 -->
        <div class="brandBuy-proviso-screen">
          <div class="brandBuy-proviso-screen-left">筛选条件</div>
          <div class="brandBuy-proviso-screen-right">
            <ul>
              <li v-show="seActive">
                <span>不限</span>
                <span @click="limit_show">×</span>
              </li>
              <li v-show="seActive1">
                <span>不限</span>
                <span @click="limit_show1">×</span>
              </li>
              <li v-for="(v,k) in choose1" :key="k">
                <span>{{v.name}}</span>
                <span @click="remove(k,v.id)">×</span>
              </li>
              <li v-for="(v,k) in choose2" :key="k">
                <span>{{v}}</span>
                <span @click="removelay(k,v)">×</span>
              </li>
            </ul>
          </div>
        <div style="clear:both"></div>
        </div>
        <!-- 商标分类 -->
        <div class="brandBuy-proviso-classify" :class="{h270:h270_show}">
          <div class="brandBuy-proviso-classify-one">商标分类</div>
          <div class="brandBuy-proviso-classify-three">
            <ul>
              <li @click="limit" :class="{seActive: seActive}">不限</li>
              <li v-for="(v,k) in list" :key="k" @click="addtype(v,k,v.id,v.name)" :class="{seActive: isTags(v.id)}">{{v.name}}</li>
            </ul>
          </div>
          <div class="brandBuy-proviso-classify-four" @click="more">更多
            <img src="/static/images/2227.png" alt="">
          </div>
          <div style="clear:both"></div>
        </div>
        <!-- 商标价格 -->
        <div class="brandBuy-proviso-price">
          <div class="brandBuy-proviso-price-upper">
            <div class="brandBuy-proviso-price-upper-left">商标价格</div>
            <div class="brandBuy-proviso-price-upper-right">
              <ul>
                <li @click="limit1()" :class="{seActive: seActive1}">不限</li>
                <li v-for="(v,k) in priceData" :key="k" v-show="k != 0" @click="addlayw(v,k)" :class="{seActive: isTags2(v)}">{{v}}</li>
              </ul>
            </div>
          </div>
          <div class="brandBuy-proviso-price-under">
            <input type="text" v-model="price1" maxlength="5" onkeyup="value=value.replace(/[^\d{1,}\.\d{1,}|\d{1,}]/g,'')">
            <span>至</span>
            <input type="text" v-model="price2" maxlength="5" onkeyup="value=value.replace(/[^\d{1,}\.\d{1,}|\d{1,}]/g,'')">
            <span>万元</span>
            <span @click="determine">确定</span>
          </div>
          <div style="clear:both"></div>
        </div>
        <!-- 商标元素 -->
        <!-- <div class="brandBuy-proviso-classical">
          <div class="brandBuy-proviso-classical-left">商标元素</div>
          <div class="brandBuy-proviso-classical-right">
            <ul>
              <li>不限</li>
            </ul>
          </div>
          <div style="clear:both"></div>
        </div> -->
      </div>
      <!-- 排序 -->
      <div class="brandBuy-collate">
        <div class="brandBuy-collate-left">
          <span>综合排序:</span>
          <span>上架时间
            <i class="regularTriangle" :class="{dordor:dordor_show}" @click="regular(time_sort)"></i>
            <i class="downTriangle" :class="{dordor:dordor_show1}" @click="down(time_sort)"></i>
          </span>
          <span>价格排序
            <i class="regularTriangle" :class="{dordor:dordor_show2}" @click="regular1(price_sort)"></i>
            <i class="downTriangle" :class="{dordor:dordor_show3}"  @click="down1(price_sort)"></i></span>
        </div>
        <div class="brandBuy-collate-right">
          <span>共有<span>{{total}}</span>个商标正在出售</span>
          <span @click="publish">发布商标</span>
          <span @click="inquiry1">求购商标</span>
        </div>
      </div>
      <!-- 图形 -->
      <div class="brandBuy-img">
        <div class="brandBuy-img-details" v-for="(v,k) in brandBuy" :key="k" >
          <div @click="brandDetail(v.id)">
            <img :src="GLOBAL.base_url + v.brand_img" alt="">
          </div>
          <div @mouseenter="enter(k)" @mouseleave="leave()" >
            <p>¥{{v.price}}</p>
            <p v-if="k!=current&&v.brand_name == null">图形</p>
            <p v-if="k!=current&&v.brand_name == ''">图形</p>
            <p v-if="k!=current&&v.brand_name != ''&&v.brand_name != null ">{{v.brand_name}}</p>
            <p v-show="k!=current" v-if="v.one_cate >= 10">{{v.one_cate+ '类'+ v.one_cate_name}}</p>
            <p v-show="k!=current" v-if="v.one_cate < 10">0{{v.one_cate+ '类'+ v.one_cate_name}}</p>
            <p v-show="!text_show&&k==current" class="p4" @click="inquiry(v.id,v.brand_name,v.one_cate,v.one_cate_name,v.price)">求购咨询</p>
          </div>
        </div>
        <div style="clear:both"></div>
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
    <!-- 求购咨询弹框 -->
    <div class="brandBuy-inquiry" v-if="inquiry_show">
      <div class="brandBuy-inquiry-box">
        <div @click="cha">
          <img src="/static/images/cha2.png" alt="">
        </div>
        <div>求购咨询</div>
        <div class="divSpan">
          <span>商标名称</span>
          <span>{{brand_name1}}</span>
        </div>
        <div class="divSpan">
          <span>商标类别</span>
          <span>{{one_cate_name}}</span>
        </div>
        <div class="divSpan">
          <span>商标报价</span>
          <span>{{price3}}</span>
        </div>
        <div class="divInput">
          <span>您的姓名</span>
          <input type="text" v-model="surname">
        </div>
        <div class="divInput">
          <span>联系方式</span>
          <input type="text" v-model="phone" maxlength="14" onkeyup="value=value.replace(/[^\d\-\d]/g,'')">
        </div>
        <div class="divInput" >
          <span>您的报价</span>
          <input type="text" v-model="quoted" onkeyup="value=value.replace(/[^\d{1,}\.\d{1,}|\d{1,}]/g,'')">
        </div>
        <p class="brandBuy-p">注：提交后，将有我们专业人员联系您</p>
        <P class="brandBuy-p1" @click="submit">提交</P>
      </div>
    </div>
    <!-- 求购需求弹框 -->
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
        <div class="divInput">
          <span>联系方式</span>
          <input type="text" class="mb24" v-model="phone1" maxlength="14" onkeyup="value=value.replace(/[^\d\-\d]/g,'')">
        </div>
        <!-- <div class="divInput">
          <span>商标元素</span>
          <select class="mb24">
            <option value="0">不限</option>
          </select>
        </div> -->
        <div class="divInput">
          <span>商标类别</span>
          <select class="mb24" v-model="chose1">
            <option  v-for="(v,index) in list" v-bind:value="v.id" :key="index">{{v.name}}</option>
          </select>
        </div>
        <div class="divInput">
          <span>您的报价</span>
          <select class="mb24" v-model="chose">
            <option value="0">不限</option>
            <option  v-for="(v,index) in priceData" v-show="index != 0" v-bind:value="v" :key="index">{{v}}</option>
          </select>
        </div>
        <p class="brandBuy-p">注：提交后，将有我们专业人员联系您</p>
        <P class="brandBuy-p2" @click="submit1">提交</P>
      </div>
    </div>
    <Foot></Foot>
  </div>
</template>

<script>
  import Top from '../ui/top.vue';
  import Foot from '../ui/foot.vue';
  import Fix from '../ui/fix.vue';
  export default {
    name: 'brandBuy',
    components: {
      Top,
      Foot,
      Fix
    },
    data(){
      return {
        h270_show:false,
        text_show:true,
        // 分页
        currentPage1:1,
        pageSize:16,
        total:0,
        list:[
          {id:"01",name:"01类 化学原料"},
          {id:"02",name:"02类 颜料油漆"},
          {id:"03",name:"03类 日化用品"},
          {id:"04",name:"04类 燃料油脂"},
          {id:"05",name:"05类 医药"},
          {id:"06",name:"06类 金属材料"},
          {id:"07",name:"07类 机械设备"},
          {id:"08",name:"08类 手工器械"},
          {id:"09",name:"09类 科学仪器"},
          {id:"10",name:"10类 医疗器械"},
          {id:"11",name:"11类 灯具空调"},
          {id:"12",name:"12类 运输工具"},
          {id:"13",name:"13类 军火烟火"},
          {id:"14",name:"14类 珠宝钟表"},
          {id:"15",name:"15类 乐器"},
          {id:"16",name:"16类 办公用品"},
          {id:"17",name:"17类 橡胶制品"},
          {id:"18",name:"18类 皮革皮具"},
          {id:"19",name:"19类 建筑材料"},
          {id:"20",name:"20类 家具"},
          {id:"21",name:"21类 厨房洁具"},
          {id:"22",name:"22类 绳网袋蓬"},
          {id:"23",name:"23类 纱线丝"},
          {id:"24",name:"24类 布料床单"},
          {id:"25",name:"25类 服装鞋帽"},
          {id:"26",name:"26类 钮扣拉链"},
          {id:"27",name:"27类 地毯席垫"},
          {id:"28",name:"28类 健身器材"},
          {id:"29",name:"29类 食品"},
          {id:"30",name:"30类 方便食品"},
          {id:"31",name:"31类 农林生鲜"},
          {id:"32",name:"32类 啤酒饮料"},
          {id:"33",name:"33类 酒"},
          {id:"34",name:"34类 烟草烟具"},
          {id:"35",name:"35类 广告销售"},
          {id:"36",name:"36类 金融物管"},
          {id:"37",name:"37类 建筑修理"},
          {id:"38",name:"38类 通讯服务"},
          {id:"39",name:"39类 运输贮藏"},
          {id:"40",name:"40类 材料加工"},
          {id:"41",name:"41类 教育娱乐"},
          {id:"42",name:"42类 科技服务"},
          {id:"43",name:"43类 餐饮住宿"},
          {id:"44",name:"44类 医疗园艺"},
          {id:"45",name:"45类 社会服务"}
        ],
          choose1:{},
          key:[],
          choose2:{},
          laykey:[],
          choose2:{},
          laykey:[],
          // 价格
          priceData:[],
          inquiry_show:false,
          cate_id:'',
          seActive:false,
          seActive1:false,
          price_type:'',
          // 价钱区间
          price1:'',
          price2:'',
          price_section:'',
          // 渲染数据
          brandBuy:[],
          // 升序降序
          time_sort:'',
          price_sort:'',
          brand_name:'',
          // 质询弹框数据
          brand_name1:'',
          price3:'',
          one_cate_name:'',
          c_id:'',
          surname:'',
          phone:'',
          quoted:'',
          // 求购需求
          inquiry1_show:false,
          chose1:'01',
          chose:0,
          surname1:'',
          phone1:'',
          current:null,
          dordor_show:false,
          dordor_show1:false,
          dordor_show2:false,
          dordor_show3:false
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
      // 查询
      search(){
        this.currentPage1 = 1
        this.getData()
      },
      more() {
        this.h270_show =  !this.h270_show
      },
      // 排序
      regular(val){
        if(this.time_sort == '1'&&val == '1') {
          this.time_sort = ''
          this.dordor_show = false
          this.getData()
        }
        if(this.time_sort == ''&&val == '') {
          this.time_sort = 1
          this.dordor_show = true
          this.getData()
        }
        if(val == 2) {
          this.time_sort = 1
          this.dordor_show1 = false
          this.dordor_show = true
          this.getData()
        }
      },
      down(val){
        if(this.time_sort == '2'&&val == '2') {
          this.time_sort = ''
          this.dordor_show1 = false
          this.getData()
        }
        if(this.time_sort == ''&&val == '') {
          this.time_sort = 2
          this.dordor_show1 = true
          this.getData()
        }
        if(val == 1) {
          this.time_sort = 2
          this.dordor_show = false
          this.dordor_show1 = true
          this.getData()
        }
      },
      regular1(val){
        if(this.price_sort == '1'&&val == '1') {
          this.price_sort = ''
          this.dordor_show2 = false
          this.getData()
        }
        if(this.price_sort == ''&&val == '') {
          this.price_sort = 1
          this.dordor_show2 = true
          this.getData()
        }
        if(val == 2) {
          this.price_sort = 1
          this.dordor_show3 = false
          this.dordor_show2 = true
          this.getData()
        }
      },
      down1(val){
        if(this.price_sort == '2'&&val == '2') {
          this.price_sort = ''
          this.dordor_show3 = false
          this.getData()
        }
        if(this.price_sort == ''&&val == '') {
          this.price_sort = 2
          this.dordor_show3 = true
          this.getData()
        }
        if(val == 1) {
          this.price_sort = 2
          this.dordor_show2 = false
          this.dordor_show3 = true
          this.getData()
        }
      },
      // 移入移出事件
      enter(index) {
        this.text_show=false
        this.current = index;
      },
      leave(){
        this.text_show=true
        this.current = null;
      },
      // 分页
      handleSizeChange(val) {
        this.pageSize = val;
        this.getData();

      },
      handleCurrentChange(val) {
        this.currentPage1 = val;
        this.getData();
      },
      // 不限
      limit() {
        this.choose1={}
        this.key = []
        this.seActive = true
        this.cate_id = ''
        this.getData();
      },
      limit1() {
        this.choose2={}
        this.laykey = []
        this.seActive1 = true
        this.price_type = ''
        this.getData();
      },
      limit_show(){
        this.seActive = false
      },
      limit_show1(){
        this.seActive1 = false
      },
      addtype(v,k,value){
           this.$set(this.choose1,k,v);
           if(!this.key.includes(value)){
               this.key.push(value);
               var pic = ''
               var piv = ''
               for(let i=0;i<this.key.length;i++) {
                if(this.key[i] < 10) {
                 pic += this.key[i].slice(1) + ','
                }else {
                  piv += this.key[i] + ','
                }
               }
              this.cate_id = pic + piv
              this.cate_id = this.cate_id.substring(0,this.cate_id.length-1)
           }

           this.seActive = false
           this.currentPage1 = 1;
           this.getData();
      },
      remove(k,value){
          this.$delete(this.choose1,k);
          for(var i = 0;i<this.key.length;i++){
              if(value == this.key[i]){
                this.key.splice(i,1);
                var pic = ''
                var piv = ''
                for(let i=0;i<this.key.length;i++) {
                 if(this.key[i] < 10) {
                  pic += this.key[i].slice(1) + ','
                 }else {
                   piv += this.key[i] + ','
                 }
                }
                this.cate_id = pic + piv
                this.cate_id = this.cate_id.substring(0,this.cate_id.length-1)
              }
          }
          this.currentPage1 = 1;
          this.getData();
      },
      isTags(tagId) {
        if (this.key.includes(tagId)) {
            return true;
        } else {
            return false;
        }
      },
      addlayw(v,k){
          // this.$set(this.choose2,k,v);
          if(!this.laykey.includes(v)){
               this.laykey.splice(0,1,v);
               var pic = []
               for(let i=0;i<this.laykey.length;i++) {
                 this.choose2[i] = this.laykey[i]
               }
               pic.push(k)
               pic.push()
               this.price_type= pic.join(',')
          }
            this.seActive1 = false
           this.currentPage1 = 1;
           this.getData();
      },
      removelay(k,v){
          this.$delete(this.choose2,k);
          for(var i = 0;i<this.laykey.length;i++){
              if(v == this.laykey[i]){
                this.laykey.splice(i,1);
                this.price_type= this.laykey.join(',')
           }
          }
          this.currentPage1 = 1;
          this.getData();
      },
      isTags2(tagId) {
        if (this.laykey.includes(tagId)) {
            return true;
        } else {
            return false;
        }
      },
      // 求购质询弹框
      inquiry(a,b,c,d,k){
        if(this.$cookie.getCookie('u_id')){
          this.inquiry_show = true
          this.c_id = a
          if(b == null || b == '') {
            this.brand_name1 = '图形'
          }else {
            this.brand_name1 = b
          }
          this.price3 = k
          if(c>=10) {
            this.one_cate_name = c + '类' + d
          }else {
            this.one_cate_name = '0' + c + '类' + d
          }
        }else {
          this.$router.push({
            path:'/login',
            query:{
                good:0
            }
          })
        }
      },
      inquiry1(){
        if(this.$cookie.getCookie('u_id')){
          this.inquiry1_show = true
        }else {
          this.$router.push({
            path:'/login',
            query:{
              good:0
            }
          })
        }
      },
      cha(){
        this.inquiry1_show = false
        this.inquiry_show = false
      },
      // 跳转发布商标
      publish(){
        if(this.$cookie.getCookie('u_id')){
            let routeData = this.$router.resolve(
            {
              path: '/publish'
            });
          window.open(routeData.href, '_blank');
        }else {
          this.$router.push({
                path:'/login',
                query:{
                good:0
              }
          })
        }
      },
      determine(){
        this.choose2={}
        this.laykey = []
        this.price_type = ''
        this.seActive1 = false
        if(this.price2/1 == 0) {
          this.tip('error','请输入金额大于0')
        }else if(Number(this.price2) < Number(this.price1)) {
          this.tip('error','请输入金额的大于前面金额')
        }else {
          this.price_section = this.price1*10000 + ',' + this.price2*10000
          this.currentPage1 = 1;
          this.getData()
        }
      },
      // 数据
      getData(){
        this.$http.post(this.GLOBAL.base_url+'/api/brandBazaarList',{
          one_cate:this.cate_id,
          price_type:this.price_type,
          price_sort:this.price_sort,
          time_sort:this.time_sort,
          price_section:this.price_section,
          brand_name:this.brand_name,
          page:this.currentPage1
        }).then( res =>{
          // console.log(res)
          this.priceData = res.data.brand_price
          this.brandBuy = res.data.data
          this.total = res.data.count
        })
      },
      submit() {
        if(this.$cookie.getCookie('u_id')){
          if(this.surname == '') {
            this.tip('error','请填写您的名字')
          }else if(this.phone == '') {
            this.tip('error','请填写您的联系方式')
          }else if(this.quoted == '') {
            this.tip('error','请填写您的报价')
          }else {
            this.$http.post(this.GLOBAL.base_url+'/api/addConsult',{
              user_id:this.$cookie.getCookie('u_id'),
              b_id:this.c_id,
              name:this.surname,
              contact_way:this.phone,
              price:this.quoted
            }).then(res => {
              // console.log(res)
              if(res.data.code == 1) {
                this.tip('success','您已提交成功！')
                this.inquiry_show = false
                this.surname = ''
                this.phone = ''
                this.quoted =''
              }
              if(res.data.code == 0) {
                this.tip('error',res.data.msg)
                this.inquiry_show = false
                this.surname = ''
                this.phone = ''
                this.quoted =''
              }
            })
          }
        }else {
          this.$router.push({
            path:'/login',
            query:{
              good:0
            }
          })
        }
      },
      submit1() {
        if(this.chose == 0) {
          this.chose = "不限"
        }
        if(this.surname1 == '') {
          this.tip('error','请填写您的名字')
        }else if (this.phone1 == '') {
          this.tip('error','请填写您的联系方式')
        }else {
        this.$http.post(this.GLOBAL.base_url+'/api/addBrandNeed',{
          user_id:this.$cookie.getCookie('u_id'),
          on_cate:this.chose1,
          name:this.surname1,
          contact_way:this.phone1,
          budget_price:this.chose
        }).then(res => {
          // console.log(res)
          if(res.data.code == 1) {
            this.tip('success','您已提交成功！')
            this.phone1 = ''
            this.chose = 0
            this.chose1 = '01'
            this.surname1 = ''
            this.inquiry1_show = false
          }
        })
        }
      },
      // 跳转详情
      brandDetail(val) {
        if(this.$cookie.getCookie('u_id')){
          this.$router.push({
              path:'/brandDetail',
              query:{
              id:val
            }
          })
        }else {
          this.$router.push({
                path:'/login',
                query:{
                good:0
              }
          })
        }
      }

    },
    mounted(){
      this.getData()
    },
    watch:{
      'price1'(newValue) {
        if(this.price1 == '') {
          this.price_section = ''
        }
      },
      'price2'(newValue) {
        if(this.price2 == '') {
          this.price_section = ''
        }
      }
    }
  }
</script>

<style scoped>
  .brandBuy-container {
    position: relative;
  }
  .brandBuy-box {
    font-family: 'PingFangSC';
    background-color: #fafafa;
  }
  /* 头部  */
  .brandBuy-header {
    height: 116px;
    background-color: #fff;
    line-height: 116px;
    font-family: 'PingFangSC';
    margin-bottom: 20px;
  }
  .brandBuy-header-mian {
    width: 1200px;
    margin: 0 auto;
  }
  .brandBuy-header-mian > span:nth-child(1) {
    font-size: 36px;
    font-weight: 600;
    color:#f96006;
    margin: 0 32px;
    vertical-align: middle;
  }
  .brandBuy-header-mian > input {
    width: 640px;
    height: 44px;
    vertical-align: middle;
    border: solid 1px #d7d8d9;
    padding: 11px 18px;
    box-sizing: border-box;
  }
  .brandBuy-header-mian > input::-webkit-input-placeholder {
    color: #999999;
  }
  .brandBuy-header-mian > span:nth-child(3) {
    font-size: 16px;
    color:#fff;
    margin-left: -5px;
    vertical-align: middle;
    cursor: pointer;
    display: inline-block;width: 144px;
    height: 44px;
    text-align: center;
    background-color: #f96006;
    line-height: 44px;
  }
  /* 条件 */
  .brandBuy-proviso {
    width: 1200px;
    margin: 0 auto;
    /* height: 292px; */
    background-color: #fff;
    padding-bottom: 16px;
    box-sizing: border-box;
  }
  .brandBuy-proviso-screen {
    width: 1104px;
    margin: 0 auto;
    box-sizing: border-box;
    border-bottom: 1px dotted #ddd;
  }
  .brandBuy-proviso-screen-left {
    height: 56px;
    line-height: 56px;
    color: #666;
    font-size: 14px;
    font-weight: 100;
    float: left;
    /* margin-right: 18px; */
  }
  .brandBuy-proviso-screen-right {
    /* float: left; */
    margin-left: 72px;
  }
  .brandBuy-proviso-screen-right > ul {
    padding-top: 16px;
  }
  .brandBuy-proviso-screen-right > ul > li {
    float: left;
    width: 122px;
    height: 24px;
    background-color: #fed18e;
    margin-right: 32px;
    color: #fff;
    font-size: 12px;
    padding:0 8px 0 16px;
    line-height: 24px;
    box-sizing: border-box;
    margin-bottom: 16px;
    text-align: center;
  }
  .brandBuy-proviso-screen-right > ul > li > span:nth-child(1) {
    width: 77px;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }
  .brandBuy-proviso-screen-right > ul > li > span:nth-child(2) {
    float: right;
    cursor: pointer;
  }
  /* 商标分类 */
  .brandBuy-proviso-classify {
    border-bottom: 1px dotted #ddd;
    width: 1104px;
    margin: 0 auto;
    height: 56px;
    overflow: hidden;
  }
  .brandBuy-proviso-classify > .brandBuy-proviso-classify-one {
    height: 56px;
    line-height: 56px;
    color: #666;
    font-size: 14px;
    font-weight: 100;
    float: left;
  }
  .brandBuy-proviso-classify > .brandBuy-proviso-classify-two {
    height: 56px;
    line-height: 56px;
    color: #333;
    font-size: 12px;
    font-weight: 500;
    float: left;
    margin-left: 18px;
    width: 110px;
    text-align: center;
  }
  .brandBuy-proviso-classify > .brandBuy-proviso-classify-four {
    height: 56px;
    line-height: 56px;
    color: #333;
    font-size: 12px;
    font-weight: 600;
    float: left;
    text-align: center;
    vertical-align: middle;
    cursor: pointer;
    /* width: 40px; */
  }
  .brandBuy-proviso-classify > .brandBuy-proviso-classify-four > img {
    width: 12px;
    vertical-align: middle;
    height: 6px;
    margin-top: -2px;
    margin-left: 3px;
  }
  .brandBuy-proviso-classify > .brandBuy-proviso-classify-three {
    float: left;
    width: 1000px;
  }
  .brandBuy-proviso-classify > .brandBuy-proviso-classify-three > ul > li {
    float: left;
    height: 56px;
    line-height: 56px;
    color: #333;
    font-size: 12px;
    font-weight: 500;
    margin-left: 18px;
    width: 110px;
    text-align: center;
    cursor: pointer;
  }
  .brandBuy-proviso-classify > .brandBuy-proviso-classify-three > ul > li:nth-child(1) {
    height: 56px;
    line-height: 56px;
    color: #333;
    font-size: 12px;
    font-weight: 500;
    margin-left: 18px;
    width: 110px;
    text-align: center;
  }
  .h270 {
    height: 386px;
  }
  /* 商标价格 */
  .brandBuy-proviso-price {
    border-bottom: 1px dotted #ddd;
    width: 1104px;
    margin: 0 auto;
  }
  .brandBuy-proviso-price-upper {
    height: 56px;
    line-height: 56px;
  }
  .brandBuy-proviso-price-upper > .brandBuy-proviso-price-upper-left {
    float: left;
    color: #666;
    font-size: 14px;
    font-weight: 100;
  }
  .brandBuy-proviso-price-upper > .brandBuy-proviso-price-upper-right > ul > li{
    font-size: 14px;
    float: left;
    color: #333;
    font-size: 12px;
    font-weight: 500;
    margin-left: 18px;
    width: 110px;
    text-align: center;
    cursor: pointer;
  }
  .brandBuy-proviso-price-under {
    float: right;
    margin-bottom: 16px;
  }
  .brandBuy-proviso-price-under > input{
    width: 77px;
    height: 28px;
    border-radius: 4px;
    padding: 3px 0 0 7px;
    border: solid 1px #d6d6d6;
    box-sizing: border-box;
  }
  .brandBuy-proviso-price-under > span {
    font-size: 14px;
    color: #333;
  }
  .brandBuy-proviso-price-under > span:last-child{
    width: 72px;
    height: 28px;
    border-radius: 4px;
    display: inline-block;
    background-color: #f96006;
    color: #fff;
    text-align: center;
    line-height: 28px;
    font-size: 14px;
    cursor: pointer;
  }
  .brandBuy-proviso-classical {
    width: 1104px;
    margin: 0 auto;
    box-sizing: border-box;
    border-bottom: 1px dotted #ddd;
  }
  .brandBuy-proviso-classical-left {
    float: left;
    height: 56px;
    line-height: 56px;
    color: #666;
    font-size: 14px;
    font-weight: 100;
  }
  .brandBuy-proviso-classical-right > ul {
    padding-top: 20px;
  }
  .brandBuy-proviso-classical-right > ul > li{
    font-size: 14px;
    float: left;
    color: #333;
    font-size: 12px;
    font-weight: 500;
    margin-left: 18px;
    width: 110px;
    text-align: center;
    cursor: pointer;
    margin-bottom: 16px;
  }
  /* 排序 */
  .brandBuy-collate {
    width: 1200px;
    height: 64px;
    background-color: #fff;
    margin: 0 auto;
    margin-top: 24px;
    line-height: 64px;
    padding: 0 48px;
    box-sizing: border-box;
  }
  .brandBuy-collate > .brandBuy-collate-left {
    float: left;
  }
  .brandBuy-collate > .brandBuy-collate-left > span {
    float: left;
    font-size: 16px;
    font-weight: 600;
    color: #333;
    margin-right: 50px;
    position: relative;
  }
  .regularTriangle {
    position: absolute;
    width: 0;
    height: 0;
    top: 26px;
    right: -17px;
    border-style: solid;
    border-width: 4px;
    border-color: transparent transparent #000 #000;
    transform: rotate(135deg);
    cursor: pointer;
    /* -webkit-box-shadow: -2px 2px 3px 0 rgba(0, 0, 0, 0.2);
    -moz-box-shadow: -2px 2px 3px 0 rgba(0, 0, 0, 0.2);
    box-shadow: -2px 2px 3px 0 rgba(0, 0, 0, 0.2); */
    z-index: 9977;
  }
  .downTriangle {
    position: absolute;
    width: 0;
    height: 0;
    top: 32px;
    right: -17px;
    border-style: solid;
    border-width: 4px;
    border-color: transparent transparent #000 #000;
    transform: rotate(-45deg);
    /* -webkit-box-shadow: -2px 2px 3px 0 rgba(0, 0, 0, 0.2);
    -moz-box-shadow: -2px 2px 3px 0 rgba(0, 0, 0, 0.2);
    box-shadow: -2px 2px 3px 0 rgba(0, 0, 0, 0.2); */
    cursor: pointer;
    z-index: 9988;
  }
  .brandBuy-collate > .brandBuy-collate-right {
    float: right;
  }
  .brandBuy-collate > .brandBuy-collate-right > span {
    float: left;
    margin-left: 32px;
    font-size: 14px;
    color: #333;
    font-weight: 100;
  }
  .brandBuy-collate > .brandBuy-collate-right > span:nth-child(1) > span {
    color: #f96006;
    cursor: pointer;
  }
  .brandBuy-collate > .brandBuy-collate-right > span:nth-child(2) {
    width: 108px;
    height: 36px;
    border-radius: 4px;
    background-color: #f96006;
    color: #fff;
    line-height: 36px;
    text-align: center;
    margin-top: 13px;
    font-size: 14px;
    cursor: pointer;
  }
  .brandBuy-collate > .brandBuy-collate-right > span:nth-child(3) {
    width: 108px;
    height: 36px;
    border-radius: 4px;
    background-color: #f96006;
    color: #fff;
    line-height: 36px;
    margin-top: 13px;
    font-size: 14px;
    cursor: pointer;
    text-align: center;
  }
  /* 图形 */
  .brandBuy-img {
    width: 1200px;
    height: 1800px;
    margin: 0 auto;
    background-color: #fff;
    margin-top: 24px;
    padding-left: 26px;
    padding-top: 12px;
    box-sizing: border-box;
    position: relative;
  }
  .brandBuy-img-details {
    float: left;
    margin-right: 20px;
    height: 390px;
    width: 270px;
    border: solid 1px #e6e6e6;
    margin-top: 24px;
    cursor: pointer;
  }
  .brandBuy-img-details > div:nth-child(1) {
    width: 270px;
    height: 270px;
    padding:30px;
    box-sizing: border-box;
  }
  .brandBuy-img-details > div:nth-child(1) > img {
    width: 210px;
    height: 210px;
  }
  .brandBuy-img-details > div:nth-child(2) {
    width: 270px;
    height: 120px;
    text-align: center;
    padding-top: 13px;
    box-sizing: border-box;
  }
  .brandBuy-img-details > div:nth-child(2) > p:nth-child(1) {
    font-size: 24px;
    font-weight: 600;
    color: #f96006;
    margin-bottom: 4px;
  }
  .brandBuy-img-details > div:nth-child(2) > p:nth-child(2) {
    font-size: 12px;
    font-weight: 600;
    color: #333;
    margin-bottom: 12px;
  }
  .brandBuy-img-details > div:nth-child(2) > p:nth-child(3) {
    font-size: 12px;
    font-weight: 100;
    color: #333;
    margin-bottom: 12px;
  }
  .brandBuy-img-details > div:nth-child(2) > .p4 {
    width: 80px;
    height: 36px;
    line-height: 36px;
    border-radius: 4px;
    border: solid 1px #f96006;
    background-color: #fbefe9;
    text-align: center;
    color: #f96006;
    font-size: 14px;
    margin: 0 auto;
    margin-top: 8px;
    cursor: pointer;
  }
  .block {
    width: 100%;
    text-align: center;
    margin-top: 30px;
  }
  .seActive{
      color: #f96006 !important;
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
  .mb24 {
    margin-bottom: 24px;
  }
  .divInput > select {
    width: 300px;
    height: 32px;
    border-radius: 4px;
    border: solid 1px #d6d6d6;
    padding: 0 10px;
    box-sizing: border-box;
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
    cursor: pointer;
  }
  .dordor {
    border-color: transparent transparent #f96006 #f96006;
  }
</style>
