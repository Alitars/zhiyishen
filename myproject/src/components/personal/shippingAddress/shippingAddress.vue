<template>
  <div class="shippingAddress">
    <div class="shippingAddress-box">
      <div class="shippingAddress-box-top">
        <p @click="addaddress1" >新增地址</p>
      </div>
      <!-- 默认地址 -->
      <div class="shippingAddress-box-default" v-for="(item , index) in dataArr" :key="index">
        <div class="default-one">
          <span>收件人</span>
          <span>{{item.consignee}}</span>
          <span v-show=" item.is_default == '2'">默认地址</span>
        </div>
        <div class="default-two">
          <span>联系电话</span>
          <span>{{item.mobile}}</span>
        </div>
        <div class="default-three">
          <span>收件地址</span>
          <span>{{item.province}}{{item.city}}{{item.area}}{{item.address}}</span>
          <span @click="del(item.id)">删除</span>
          <span @click="addaddress(item.id)">编辑</span>
          <span v-show=" item.is_default != '2'" @click="defaultShipp(item.id)">设置默认地址</span>
        </div>
      </div>
       <!-- 编辑地址弹框 -->
      <div class="add-address" v-show="addressshow1">
        <div class="address-form">
          <img src="/static/images/cha.png" alt="" @click="cha">
          <div class="form-div">
            <div class="recevie-people">
              <span>收件人</span>
              <input type="text" v-model="people">
            </div>
          <div>
            <span>联系电话</span>
            <input class="deal" type="text" v-model="moblie" maxlength="14">
          </div>
          <div class="address-div">
             <span>所在区</span>
              <el-select v-model="sheng" @change="choseProvince" placeholder="选择省" class="select1">
                <el-option
                v-for="item in province"
                :key="item.id"
                :label="item.value"
                :value="item.id">
                </el-option>
              </el-select>
              <el-select v-model="shi" @change="choseCity" placeholder="选择市" class="select1">
                <el-option
                v-for="item in shi1"
                :key="item.id"
                :label="item.value"
                :value="item.id">
                </el-option>
              </el-select>
              <el-select v-model="qu" @change="choseBlock" placeholder="选择区" class="select1">
                <el-option
                v-for="item in qu1"
                :key="item.id"
                :label="item.value"
                :value="item.id">
                </el-option>
              </el-select>
          </div>
          <div>
            <span>详细地址</span>
            <input type="text" v-model="detailaddress">
          </div>
          <div class="count1" @click="cha">返回</div>
          <div class="count" @click="count">修改</div>
          </div>
        </div>
      </div>
      <!-- 新增地址 -->
      <div class="add-address" v-show="addressshow">
        <div class="address-form">
          <img src="/static/images/cha.png" alt="" @click="cha">
          <div class="form-div">
            <div class="recevie-people">
              <span>收件人</span>
              <input type="text" v-model="people">
            </div>
          <div>
            <span>联系电话</span>
            <input class="deal" type="text" v-model="moblie" maxlength="14">
          </div>
          <div class="address-div">
             <span>所在区</span>
              <el-select v-model="sheng" @change="choseProvince" placeholder="选择省" class="select1">
                <el-option
                v-for="item in province"
                :key="item.id"
                :label="item.value"
                :value="item.id">
                </el-option>
              </el-select>
              <el-select v-model="shi" @change="choseCity" placeholder="选择市" class="select1">
                <el-option
                v-for="item in shi1"
                :key="item.id"
                :label="item.value"
                :value="item.id">
                </el-option>
              </el-select>
              <el-select v-model="qu" @change="choseBlock" placeholder="选择区" class="select1">
                <el-option
                v-for="item in qu1"
                :key="item.id"
                :label="item.value"
                :value="item.id">
                </el-option>
              </el-select>
          </div>
          <div>
            <span>详细地址</span>
            <input type="text" v-model="detailaddress">
          </div>
          <div class="edit" @click="count1">保存</div>
          </div>
        </div>
      </div>
    </div>
    <div style="clear:both;"></div>
  </div>
</template>

<script>
  export default {
    name:'shippingAddress',
    data(){
      return {
        dataArr:[],
        // 三级联动
        mapJson:'../../static/json/map.json',
        sheng: '',
        shi: '',
        shi1: [],
        qu: '',
        qu1: [],
        province:'',
        city:'',
        block:'',
        a:'',
        b:'',
        c:'',
        addressshow:false,
        // 数据
        people:'',
        moblie:'',
        detailaddress:'',
        // 删除弹框
        centerDialogVisible: false,
        addressshow1:false,
        bid:'',
        is_default:''
      }
    },
    methods:{
       // 提示弹框
      tip(type,msg){
          return this.$message({
              type:type,
              message:msg,
              showClose:true,
              duration:1500
          })
      },
      // 获取数据
      getaddressdata(){
        this.$http.post(this.GLOBAL.base_url+'/api/shippingAddress/shippAddressList',{
          user_id:this.$cookie.getCookie('u_id')
        }).then(res=>{
          // console.log(res)
          if(res.data.code == "1"){
            this.dataArr = res.data.data;
          }
        })
      },
      defaultShipp(val){
        this.$http.post(this.GLOBAL.base_url+'/api/shippingAddress/defaultShippAddress',{
          user_id:this.$cookie.getCookie('u_id'),
          id:val
        }).then( res => {
          // console.log(res)
          this.getaddressdata()
        })
      },
      getCityData:function(){
        var that = this
        that.$http.get(this.mapJson).then(function(response){
          if (response.status==200) {
            var data = response.data
            that.province = []
            that.city = []
            that.block = []
            // 省市区数据分类
            for (var item in data) {
              if (item.match(/0000$/)) {//省
                that.province.push({id: item, value: data[item], children: []})
              } else if (item.match(/00$/)) {//市
                that.city.push({id: item, value: data[item], children: []})
              } else {//区
                that.block.push({id: item, value: data[item]})
              }
            }
            // 分类市级
            for (var index in that.province) {
              for (var index1 in that.city) {
                if (that.province[index].id.slice(0, 2) === that.city[index1].id.slice(0, 2)) {
                  that.province[index].children.push(that.city[index1])
                }
              }
            }
            // 分类区级
            for(var item1 in that.city) {
              for(var item2 in that.block) {
                if (that.block[item2].id.slice(0, 4) === that.city[item1].id.slice(0, 4)) {
                  that.city[item1].children.push(that.block[item2])
                }
              }
            }
          }
          else{
            // console.log(response.status)
          }
        }).catch(function(error){console.log(typeof+ error)})
      },
      // 选省
      choseProvince:function(e) {
        for (var index2 in this.province) {
          if (e === this.province[index2].id) {
            this.shi1 = this.province[index2].children
            this.shi = this.province[index2].children[0].value
            this.qu1 =this.province[index2].children[0].children
            this.qu = this.province[index2].children[0].children[0].value
            this.E = this.qu1[0].id
            // console.log(this.province[index2].value);
           this.a =  this.province[index2].value
          }
        }
      },
      // 选市
      choseCity:function(e) {
        for (var index3 in this.city) {
          if (e === this.city[index3].id) {
            this.qu1 = this.city[index3].children
            this.qu = this.city[index3].children[0].value
            this.E = this.qu1[0].id
            // console.log(this.city[index3].value);
            this.b = this.city[index3].value
          }
        }
      },
      // 选区
      choseBlock:function(e) {
        this.E=e;
        for(var index4 in this.qu1){
          if(e === this.qu1[index4].id){
            // console.log(this.qu1[index4].value)
            this.c =this.qu1[index4].value
          }
        }
      },
      // 控制显示隐藏
      addaddress(val){
          this.addressshow1 = true;
          this.$http.post(this.GLOBAL.base_url+'/api/shippingAddress/shippAddressDetail',{
            id:val
          }).then( res => {
            // console.log(res)
            if(res.data.code == '1') {
              this.people = res.data.data.consignee
              this.moblie = res.data.data.mobile
              this.sheng=res.data.data.province;
              this.a = res.data.data.province;
              this.shi=res.data.data.city;
              this.qu=res.data.data.area;
              this.detailaddress = res.data.data.address
              this.bid = res.data.data.id
              this.is_default = res.data.data.is_default
            }
          })

      },
      addaddress1(){
        this.addressshow = true;
      },
      // 修改
      count(){
        let reg1 = /^0\d{2,3}-?\d{7,8}$/;
        let reg2=/^[1][3,4,5,7,8][0-9]{9}$/;
        if(this.people == ""){
          this.tip('error','请填写收件人姓名')
          return false;
        }else if(this.moblie== ""){
           this.tip('error','请填写联系号码')
          return false;
        }else if(!reg1.test(this.moblie)&&!reg2.test(this.moblie)){
          this.tip('error','请填写正确的号码')
          return false;
        }else if(this.a==""){
          this.tip('error','请填写联系地址')
          return false;
        }else if(this.detailaddress ==""){
          this.tip('error','请填写详细联系地址')
          return false;
        }else{
          if(this.b == ''){
            var shi = this.shi;
          }else{
            var shi = this.b;
          }
          if(this.c == ''){
            var qu = this.qu;
          }else{
            var qu = this.c;
          }
          if(shi == '北京市'||shi == '上海市'||shi == '天津市'||shi == '重庆市'||shi == '香港'||shi == '澳门'||shi == '台湾'){
              shi = '';
            }
          this.$http.post(this.GLOBAL.base_url+'/api/shippingAddress/addShippAddress',{
              user_id:this.$cookie.getCookie('u_id'),
              consignee:this.people,
              mobile:this.moblie,
              province:this.a,
              city:shi,
              area:qu,
              address:this.detailaddress,
              id:this.bid,
              is_default:this.is_default
            }).then(res=>{
              if(res.data.code == "1"){
                this.people = '';
                this.moblie = '';
                this.detailaddress = '';
                this.addressshow1 = false;
                this.getaddressdata();
              }
            })
        }
      },
      // 隐藏
      cha(){
          this.addressshow = false;
          this.addressshow1 = false;
          this.sheng = '';
          this.a = '';
          this.shi = '';
          this.qu = '';
          this.people = '';
          this.moblie = '';
          this.detailaddress = '';
      },
      // 删除
      del(val){
        this.$confirm('此操作将永久删除该地址, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$http.post(this.GLOBAL.base_url+'/api/shippingAddress/delShippAddress',{
          id:val
        }).then( res => {
          // console.log(res)
          this.getaddressdata();
        })
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },
      // 新增
      count1(){
        let reg1 = /^0\d{2,3}-?\d{7,8}$/;
        let reg2=/^[1][3,4,5,7,8][0-9]{9}$/;
        if(this.people == ""){
          this.tip('error','请填写收件人姓名')
          return false;
        }else if(this.moblie== ""){
           this.tip('error','请填写联系号码')
          return false;
        }else if(!reg1.test(this.moblie)&&!reg2.test(this.moblie)){
          this.tip('error','请填写正确的号码')
          return false;
        }else if(this.a==""){
          this.tip('error','请填写联系地址')
          return false;
        }else if(this.detailaddress ==""){
          this.tip('error','请填写详细联系地址')
          return false;
        }else{
          if(this.b == ''){
            var shi = this.shi;
          }else{
            var shi = this.b;
          }
          if(this.c == ''){
            var qu = this.qu;
          }else{
            var qu = this.c;
          }
          if(shi == '北京市'||shi == '上海市'||shi == '天津市'||shi == '重庆市'||shi == '香港'||shi == '澳门'||shi == '台湾'){
          shi = '';
        }
          this.$http.post(this.GLOBAL.base_url+'/api/shippingAddress/addShippAddress',{
              user_id:this.$cookie.getCookie('u_id'),
              consignee:this.people,
              mobile:this.moblie,
              province:this.a,
              city:shi,
              area:qu,
              address:this.detailaddress,
            }).then(res=>{
              if(res.data.code == "1"){
                this.people = '';
                this.moblie = '';
                this.detailaddress = '';
                this.addressshow = false;
                this.getaddressdata();
              }
            })
        }
      },
    },
    created(){
      this.getCityData();
      this.getaddressdata();

    }
  }
</script>

<style scoped>
  .shippingAddress-box {
    width: 1015px;
    min-height: 950px;
    background-color: #fff;
    margin:12px 0 0 16px;
    float: left;
    padding-top: 32px;
    box-sizing: border-box;
  }
  /* top */
  .shippingAddress-box-top {
    width: 943px;
    margin: 0 auto;
    border-bottom: 2px solid #fafafa;
  }
  .shippingAddress-box-top > p {
    width: 108px;
    height: 36px;
    line-height: 36px;
    border-radius: 4px;
    background-color: #f96006;
    text-align: center;
    font-family: "PingFangSC";
    font-size: 14px;
    color: #fff;
    font-weight: normal;
    margin-bottom: 16px;
    margin-left: 30px;
    cursor: pointer;
  }
  /* 默认地址 */
  .shippingAddress-box-default {
    width: 943px;
    border-bottom: 2px solid #fafafa;
    padding-bottom: 36px;
    margin: 0 auto;
    margin-bottom: 36px;
  }
  .shippingAddress-box-default > .default-one {
    margin:32px 0 0 42px;
    height: 24px;
    line-height: 24px;
  }
  .shippingAddress-box-default > .default-one > span {
    font-family: "PingFangSC";
    font-size: 14px;
    color: #333333;
    font-weight: normal;
    margin-right: 32px;
  }
  .shippingAddress-box-default > .default-one > span:nth-child(2) {
    width: 99px;
    display: inline-block;
    margin-right: 0px;
  }
  .shippingAddress-box-default > .default-one > span:nth-child(3) {
    background-color: #f5a623;
    width: 64px;
    height: 24px;
    text-align: center;
    line-height: 24px;
    color: #fff;
    font-weight: normal;
    display: inline-block;
    font-size: 12px;
  }
  .shippingAddress-box-default > .default-two {
    margin: 32px 0 0 42px;
  }
  .shippingAddress-box-default > .default-two > span {
    font-family: "PingFangSC";
    font-size: 14px;
    color: #333333;
    font-weight: normal;
    margin-right: 32px;
  }
  .shippingAddress-box-default > .default-two > span:nth-child(1) {
    margin-left: -14px
  }
  .shippingAddress-box-default > .default-three {
    margin: 32px 0 0 42px;
  }
  .shippingAddress-box-default > .default-three > span {
    font-family: "PingFangSC";
    font-size: 14px;
    color: #333333;
    font-weight: normal;
    margin-right: 32px;
  }
  .shippingAddress-box-default > .default-three > span:nth-child(1) {
    margin-left: -14px
  }
  .shippingAddress-box-default > .default-three > span:nth-child(3) {
    color: #fa7d33;
    cursor: pointer;
    float: right;
  }
  .shippingAddress-box-default > .default-three > span:nth-child(4) {
    color: #fa7d33;
    cursor: pointer;
    float: right;
  }
  .shippingAddress-box-default > .default-three > span:nth-child(5) {
    color: #fa7d33;
    cursor: pointer;
    float: right;
  }
  /* 编辑地址弹框 */
   .add-address{
   background: rgba(0,0,0, 0.5);
    position: fixed;
    z-index: 20;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
 }
 .address-form{
   width: 582px;
   height: 434px;
   background: #ffffff;
   position: absolute;
   top:50%;
   left: 50%;
   z-index: 30;
   transform: translate(-50%,-50%);
 }
 .address-form>img{
   width: 24px;
   height: 24px;
   position: absolute;
   right:20px;
   top:20px;
   cursor: pointer;
 }
 .form-div{
   position: absolute;
   top:81px;
   left: 96px;
 }
 .form-div>div{
   margin-bottom: 30px;
 }
 .form-div>div>span{
   font-size: 14px;
   margin-right: 16px;
   color: #333333;
 }
 .form-div>div>input{
    width: 290px;
    height: 32px;
    border-radius: 4px;
    border: solid 1px #d6d6d6;
    outline: none;
    padding-left: 10px
 }
 .recevie-people>span,.address-div>span{
   margin-left: 14px;
 }
 .select1{
   width: 96px;
  height: 32px;
  border-radius: 4px;
  margin-right: 2px;
 }
 .count{
   width: 80px;
  height: 36px;
  display: inline-block;
  border-radius: 4px;
  background-color:#f96006;
  margin: 0 auto;
  text-align: center;
  line-height: 36px;
  font-size: 14px;
  color: #ffffff;
  cursor: pointer;
  /* margin-left: 165px; */
 }
 .edit{
   width: 80px;
  height: 36px;
  display: inline-block;
  border-radius: 4px;
  background-color:#f96006;
  margin: 0 auto;
  text-align: center;
  line-height: 36px;
  font-size: 14px;
  color: #ffffff;
  cursor: pointer;
  margin-left: 165px;
 }
 .count1{
  margin-left: 118px;
  width: 80px;
  height: 36px;
  display: inline-block;
  border-radius: 4px;
  text-align: center;
  line-height: 36px;
  font-size: 14px;
  cursor: pointer;
  margin-right: 79px;
  background: url(/static/images/invalid-name1h.png);
  color: #f96006;
  margin-right: 32px
 }
</style>
