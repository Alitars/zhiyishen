<template>
  <div class="verification-container">
    <Top></Top>
    <Fix></Fix>
    <div class="verification-box" @click="userClick=false">
      <div class="verification-box-banner">
        <h1>AI工商核名</h1>
        <div :class="changeClass">
          <span @click="changeCss" class="changeSpan1">单个核名</span>
          <span @click="changeCss1" class="changeSpan2">批量核名</span>
        </div>
        <!-- 渐变色线 -->
        <div class="verification-line"></div>
        <!-- 单个核名提交表单 -->
        <div v-if="!is_show">
          <!-- 省级 -->
          <div class="verification-province" v-show="province_show" @click.stop="userClick=!userClick">
            <div v-for="(item,index) in provinceData" :key="index" @click="choiceCity(item)">{{item}}
              <i class="el-icon-arrow-right"></i>
            </div>
          </div>
          <!-- 市级 -->
          <div class="verification-city" v-show="city_show" @click.stop="userClick=!userClick">
            <div v-for="(item,index) in cityData" :key="index" @click="obtainCity(item)">{{item}}
            </div>
          </div>
          <!-- 城市 -->
          <input @click.stop="userClick=!userClick" class="input1" @click="obtain" onfocus="this.blur();" v-model="provinceCity" type="text" placeholder="注册城市">
          <!-- 名称 -->
          <input class="input2" v-model="name" type="text" placeholder="请输入您要核名的公司名称">
          <!-- 行业类型 -->
          <select name="" id="" v-model="chose1">
            <option value="0">行业类型</option>
            <option  v-for="(v,k) in arr2" :key="k" :value="v">{{v}}</option>
          </select>
          <!-- <input class="input1" v-model="type" type="text" placeholder="行业类型"> -->
          <!-- 组织形式 -->
          <select name="" id="" v-model="chose">
            <option value="0">组织形式</option>
            <option  v-for="(v,k) in arr1" :key="k" :value="v.serial">{{v.difftype}}</option>
          </select>
        </div>
        <!-- 批量核名提交表单 -->
        <div v-if="is_show">
          <input class="input3" type="text" v-model="name1" disabled='disabled' placeholder="请先下载模板">
          <label for="fileNone"></label>
          <input type="file" @change="uplaod($event)"  id="fileNone" ref="file" style="display:none;">
        </div>
        <p class="p5" v-if="is_show">
          <a href="/static/images/批量核名模板.xls" target="_blank">批量核名模板下载</a></p>
        <p class="p6" @click="muchStone" v-if="is_show">核名</p>
        <p class="p6 mt48" v-if="!is_show" @click="stone">核名</p>
        <p class="p7" @click="watchPro">《企业名称禁限用规则》</p>
      </div>
      <!-- 后台数据 -->
      <!-- 单个核名后台数据 -->
      <div class="verification-singleData"  v-if="!is_show">
        <div v-if="dengJi" class="div1111">
          <span>综合风险等级</span>
          <span class="redAlert" v-if="warning == 3">高</span>
          <span class="orangeAlert" v-if="warning == 2">较高</span>
          <span class="yellowAlert" v-if="warning == 1">中</span>
          <span class="greenAlert" v-if="warning == -1">低</span>
        </div>
        <div v-for="(item,index) in arr3" :key="index" class="div22">
          <span>相似公司分析</span>
          <span>{{item.company_name}}</span>
          <span class="redAlert1" v-if="item.warning == '红色警告'">综合相似度：高</span>
          <span class="orangeAlert1" v-if="item.warning == '橙色警告'">综合相似度：较高</span>
          <span class="yellowAlert1" v-if="item.warning == '黄色警告'">综合相似度：中</span>
          <span class="greenAlert1" v-if="item.warning == '无警告'">综合相似度：低</span>
          <div> {{item.business_scope}}</div>
        </div>
      </div>
      <div style="clear:both"></div>
      <!-- 批量核名后台数据 -->
      <div class="verification-muchData" v-if="is_show&&!arr3_show">
        <div>
          <ul>
            <li>公司名称</li>
            <li>综合风险等级</li>
            <li>相似公司</li>
          </ul>
        </div>
        <div>
          <ul v-for="(v,k) in arr4" :key="k">
            <li :title="v.company">{{v.company}}</li>
            <li>
              <span class="redAlert" v-if="v.warning_level == 3" >高</span>
              <span class="orangeAlert" v-if="v.warning_level == 2">较高</span>
              <span class="yellowAlert" v-if="v.warning_level == 1">中</span>
              <span class="greenAlert" v-if="v.warning_level == -1">低</span>
            </li>
            <li @mouseenter="enter(k)" @mouseleave="leave()" >
              <div >
                <span v-for="(item,index) in v.detail" :key="index" >
                  {{item.company_name}}
                </span>
              </div>
                <!-- 正三角 -->
                <div class="trigonometry" v-show="imgShouw&&k==current"></div>
                <!-- 批量核名移入移出后台数据 -->
                <div class="verification-moveData" v-show="imgShouw&&k==current">
                  <div v-for="(y,u) in v.detail" :key="u" >
                    <div>
                      <span :title="y.company_name">{{y.company_name}}</span>
                      <span class="redAlert1" v-if="y.warning == '红色警告'" >综合相似度：高</span>
                      <span class="orangeAlert1 mr0" v-if="y.warning == '橙色警告'">综合相似度：较高</span>
                      <span class="yellowAlert1" v-if="y.warning == '黄色警告'">综合相似度：中</span>
                      <span class="greenAlert" v-if="y.warning == '无警告'">综合相似度：低</span>
                    </div>
                    <div>{{y.business_scope}}</div>
                  </div>
                </div>
            </li>
          </ul>
        </div>
      </div>
      <!-- 无数据显示 -->
      <h1 class="h11" v-show="arr3_show">百度数据库未匹配到重叠项，可以使用！</h1>
    </div>
    <Foot></Foot>
  </div>
</template>

<script>
  import Top from '../ui/top.vue';
  import Foot from '../ui/foot.vue';
  import Fix from '../ui/fix.vue';
  export default {
    name:'verification',
    components: {
      Top,
      Foot,
      Fix
    },
    data(){
      return {
        changeClass:'verification',
        provinceCity:'',
        name:'',
        type:'',
        arr1:[
          {
            serial: '1',
            difftype: '有限公司'
          },
          {
            serial: '2',
            difftype: '合伙企业'
          }
        ],
        chose:0,
        is_show:false,
        name1:'',
        chose1:0,
        arr2:[],
        provinceData:[],
        province:'',
        cityData:[],
        city:'',
        province_show:false,
        city_show:false,
        arr3:[],
        arr3_show:false,
        url_xls:'',
        arr4:[],
        arr5:[],
        current:0,
        imgShouw:false,
        warning:-1,
        dengJi:false
      }
    },
    methods:{
      // 弹框
      tip(type,msg){
        return this.$message({
          type:type,
          message:msg,
          showClose:true,
          duration:2000
        })
      },
      // 颜色切换
      changeCss(){
        this.changeClass = 'verification'
        this.is_show = false
        this.arr3_show = false
      },
      changeCss1(){
        this.is_show = true
        this.arr3_show = false
        this.changeClass = 'verification1'
      },
      // 批量核名提交表单
      uplaod(e){
        this.file = e.target.files[0];
        let formData = new FormData();
        formData.append('url_xls',this.file);
        this.name1 = formData.get('url_xls').name
        this.url_xls = formData
        // console.log(this.url_xls)
      },
      // 获取省
      getProvince(){
        this.$http.post('http://47.99.214.190:8888/get_province').then(res => {
          if(res.data.code == '200') {
            this.provinceData = res.data.provinces
          }
        })
      },
      // 获取市
      choiceCity(val) {
        this.city_show = true
        this.province = val
        this.provinceCity = val
        this.$http.post('http://47.99.214.190:8888/get_city',{
          province:val
        }).then(res => {
          if(res.data.code == '200') {
            this.cityData = res.data.cities
          }
        })
      },
      //
      obtain() {
        this.province_show = true
      },
      //
      obtainCity(val) {
        this.city = val
        this.provinceCity = this.province + this.city
        this.province_show = false
        this.city_show = false
      },
      // 行业类型数据
      getType(){
        this.$http.post('http://47.99.214.190:8888/get_business_scope').then( res => {
          if(res.data.code == '200') {
            this.arr2 = res.data.business_scope
          }
        })
      },
      // 单个核名
      stone(){
        if(this.province == this.city) {
          // this.provinceCity = this.province
          let cityProvince = this.province
          if(cityProvince == '') {
            this.tip('error',"请选择城市")
          }else if(this.name == '') {
            this.tip('error',"请填写名称")
          }else if(this.chose1 == '0') {
            this.tip('error',"请选择行业类型")
          }else if(this.chose == '0') {
            this.tip('error',"请选择组织形式")
          }else {
            this.$http.post('http://47.99.214.190:8888/company_check_name',{
              words:this.name,
              city:cityProvince,
              business_scope:[this.chose1]
            }).then( res =>{
              if(res.data.code == 300) {
                console.log(res)
                if(res.data.description == '数据库匹配到类似内容') {
                  this.arr3 = res.data.detail
                  this.warning = res.data.warning_level
                  this.dengJi = true
                  this.arr3_show = false
                }
                if(res.data.description == '百度数据库未匹配到重叠项，可以使用！') {
                  this.arr3_show = true
                  this.dengJi = false
                }
              }
              if(res.data.code == 200) {
                  this.arr3_show = true
              }
            })
          }
        }else{
          this.provinceCity = this.province + this.city
          if(this.provinceCity == '') {
            this.tip('error',"请选择城市")
          }else if(this.name == '') {
            this.tip('error',"请填写名称")
          }else if(this.chose1 == '0') {
            this.tip('error',"请选择行业类型")
          }else if(this.chose == '0') {
            this.tip('error',"请选择组织形式")
          }else {
            this.$http.post('http://47.99.214.190:8888/company_check_name',{
              words:this.name,
              city:this.provinceCity,
              business_scope:[this.chose1]
            }).then( res =>{
              if(res.data.code == 300) {
                console.log(res)
                if(res.data.description == '数据库匹配到类似内容') {
                  this.arr3 = res.data.detail
                  this.warning = res.data.warning_level
                  this.arr3_show = false
                  this.dengJi = true
                }
                if(res.data.description == '百度数据库未匹配到重叠项，可以使用！') {
                  this.arr3_show = true
                  this.dengJi = false
                  // console.log(12)
                }
              }
              if(res.data.code == 200) {
                  this.arr3_show = true
              }
            })
          }
        }
      },
      // 批量核名
      muchStone(){
        if(this.name1 == '') {
          this.tip('error',"请上传文件")
        }else {
          const loading = this.$loading({
              lock: true,
              text: '核名中',
              spinner: 'el-icon-loading',
              background: 'rgba(0, 0, 0, 0.3)'
           });
          this.$http.post(this.GLOBAL.base_url+'/api/companyName',this.url_xls).then( res => {
            if(res.data.code == 1) {
              // console.log(res)
              loading.close();
              this.arr4 = res.data.data
            }
            if(res.data.code == 0) {
              loading.close();
              this.arr3_show = true
            }
          })
        }
      },
      // 移入
      enter(index){
        this.imgShouw = true
        this.current = index;
        // console.log(index,this.imgShouw)
      },
      // 移出
      leave(){
        this.imgShouw = false
        this.current = null;
      },
      watchPro(){
        let routeData = this.$router.resolve({ path: 'verificationProtocol'});
        window.open(routeData.href, '_blank');
      }
    },
    mounted(){
      this.getProvince()
      this.getType()
      let that = this
      document.addEventListener('click',(e) => {
        let thisClassName = e.target.className;
        if(thisClassName != "verification-province" &&thisClassName != "input1"&&thisClassName != "verification-city"){
           that.province_show = false
           that.city_show = false
        }
      })
    }
  }
</script>

<style scoped>
  input {
    outline:none;
  }
  input::-webkit-input-placeholder {
    font-size: 16px;
    font-weight: normal;
    color: #dadadd;
  }
  select {
    outline:none;
  }
  ul {
    padding: 0;
    list-style: none;
  }
  .verification-box {
    width: 1200px;
    margin: 0 auto;
    background-color: #fafafa;
    min-height: 783px;
  }
  .verification-box-banner {
    width: 1200px;
    height: 512px;
    background: url(/static/images/verification.png);
    padding-top: 1px;
    box-sizing: border-box;
    /* margin-bottom: 20px; */
  }
  .verification-box-banner > h1 {
    color: #fff;
    font-family: "PingFangSC";
    font-size: 48px;
    font-weight: 600;
    margin: 63px auto;
    text-align: center;
    margin-bottom: 40px;
  }
  .verification-box-banner > div:nth-child(2) {
    height: 37px;
    line-height: 37px;
    text-align: center;
  }
  .verification-box-banner > div:nth-child(2) > span:nth-child(1) {
    color: #fff;
    margin-right: 59px;
    display: inline-block;
    cursor: pointer;
  }
  .verification-box-banner > div:nth-child(2) > span:nth-child(2) {
    color: #fff;
    display: inline-block;
    cursor: pointer;
  }
  .verification .changeSpan1,.verification1 .changeSpan2 {
    color: #f96006 !important;
    border-bottom: 1px solid #f96006;
    font-weight: 600;
  }
  /* 渐变色线 */
  .verification-line {
    width: 960px;
    height: 1px;
    margin: 0 auto;
    margin-bottom: 36px;
    background-image: linear-gradient(to right, rgba(255, 255, 255, 0) 0%, white 54%, rgba(255, 255, 255, 0) 100%);
  }
  /* 提交表单 */
  /* 单个核名 */
  .verification-box-banner > div:nth-child(4) {
    width: 960px;
    height: 71px;
    background-color: rgba(255, 255, 255, 0.5);
    margin: 0 auto;
    padding: 8px 10px;
    box-sizing: border-box;
    position: relative;
    margin-bottom: 12px;
    z-index: 3;
  }
  .verification-box-banner > div:nth-child(4) > .input1 {
    width: 155px;
    height: 54px;
    border: solid 1px #e1e2e2;
    background-color: #fff;
    box-sizing: border-box;
    padding: 16px 10px;
    font-family: "PingFangSC";
    font-size: 16px;
    position: relative;
    cursor: pointer;
    z-index: 4;
  }
  .verification-box-banner > div:nth-child(4) > .input2 {
    width: 460px;
    height: 54px;
    border: solid 1px #e1e2e2;
    background-color: #fff;
    box-sizing: border-box;
    padding: 16px 10px;
    font-family: "PingFangSC";
    font-size: 16px;
  }
  .verification-box-banner > div:nth-child(4) > select {
    width: 154px;
    height: 54px;
    border: solid 1px #e1e2e2;
    box-sizing: border-box;
    padding: 15px 35px;
    font-family: "PingFangSC";
    font-size: 16px;
    color: #292929;
    appearance:none;
    -moz-appearance:none;
    -webkit-appearance:none;
    background:url(/static/images/2227.png)  128px 25px no-repeat;
    background-color: #fff;
    background-size: 10px 6px;
  }
  select:focus {
    background: url(/static/images/2227.png) right no-repeat ;
  }
  /* 批量核名 */
  .verification-box-banner > div:nth-child(4) > label {
    width: 92px;
    height: 54px;
    display: block;
    background: url(/static/images/2022210.png);
    position: absolute;
    top: 8px;
    right: 10px;
    z-index: 8;
  }
  .verification-box-banner > div:nth-child(4) > .input3 {
    width: 940px;
    height: 54px;
    border: solid 1px #e1e2e2;
    background-color: #fff;
    box-sizing: border-box;
    font-size: 18px;
    padding:16px 10px ;
  }
  .verification-box-banner > .p5  {
    margin: 0 auto;
    color: #4a90e2;
    border-bottom: 1px solid #4a90e2;
    width: 112px;
    font-family: "PingFangSC";
    font-size: 14px;
    cursor: pointer;
    text-align: center;
  }
  a {
    color: #6d97ff;
    text-decoration: none;
  }
  .verification-box-banner > .p6 {
    margin: 0 auto;
    width: 144px;
    height: 38px;
    border-radius: 4px;
    background-color:#f96006;
    color: #fff;
    cursor: pointer;
    line-height: 38px;
    text-align: center;
    margin-top: 16px;
    margin-bottom: 32px;
  }

  .verification-box-banner > .p7 {
    margin: 0 auto;
    cursor: pointer;
    font-family: 'PingFangSC';
    color: #fff;
    font-size: 16px;
    width: 176px;
  }
  .mt48 {
    margin-top: 48px !important;
  }
  /* 单个核名后台数据 */
  .verification-singleData {
    width: 1200px;
    background-color: #fff;
    box-sizing: border-box;
    /* margin-bottom: 32px; */
    padding-top: 1px;
  }
  .verification-singleData > .div1111 {
    height:32px ;
    line-height: 32px;
    margin: 48px 0 36px 120px;
  }
  .verification-singleData > .div1111 > span:nth-child(1) {
    font-family: 'PingFangSC';
    color: #494949;
    margin-right: 38px;
  }
  .verification-singleData > .div22 {
    margin-left: 120px;
  }
  .verification-singleData > .div22 > span:nth-child(1) {
    font-family: 'PingFangSC';
    color: #494949;
    margin-right: 38px;
    height:28px ;
    line-height: 28px;
  }
  .verification-singleData > .div22  {
    margin-left: 120px;
    margin-bottom: 16px;
  }
  .verification-singleData > .div22 > span:nth-child(2) {
    font-family: 'PingFangSC';
    color: #333;
    font-weight: 600;
    height:28px ;
    line-height: 28px;
  }
  .verification-singleData > .div22 > div {
    margin-left: 137px;
    margin-top: 21px;
    height: 57px;
    font-family: 'PingFangSC';
    font-size: 14px;
    overflow: auto;
  }
  /* 批量核名后台数据 */
  .verification-muchData {
    height: 624px;
    width: 1200px;
    border: 1px solid #f0f0f0;
    box-sizing: border-box;
    margin-bottom: 80px;
    position: relative;
  }
  .verification-muchData > div:first-child {
    height: 54px;
    background-color: #f0f0f0;
    line-height: 54px;
  }
  .verification-muchData > div:first-child > ul {
    margin-left: 87px;
  }
  .verification-muchData > div:first-child > ul > li {
    float: left;
  }
  .verification-muchData > div:first-child > ul > li:nth-child(1) {
    width: 128px;
    text-align: center;
    margin-right: 212px;
  }
  .verification-muchData > div:first-child > ul > li:nth-child(2) {
    width: 96px;
    text-align: center;
    margin-right: 174px;
  }
  .verification-muchData > div:first-child > ul > li:nth-child(3) {
    width: 403px;
    text-align: center;
  }
  /* 后台数据 */
  .verification-muchData > div:nth-child(2) {
    height: 568px;
    overflow-y:auto;
    background-color: #fff;
    z-index: 1;
  }
  .verification-muchData > div:nth-child(2) > ul {
    height: 94px;
    line-height: 94px;
    border-bottom: 1px solid #f0f0f0;
    z-index: 5;
  }
  .verification-muchData > div:nth-child(2) > ul > li {
    float: left;
  }
  .verification-muchData > div:nth-child(2) > ul > li:nth-child(1) {
    width: 128px;
    text-align: center;
    margin-right: 212px;
    margin-left: 87px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .verification-muchData > div:nth-child(2) > ul > li:nth-child(2) {
    width: 96px;
    text-align: center;
    margin-right: 174px;
  }
  .verification-muchData > div:nth-child(2) > ul > li:nth-child(3) {
    width: 403px;
    text-align: center;
    position: relative;
  }
  .verification-muchData > div:nth-child(2) > ul > li:nth-child(3) > div:first-child {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  /* 省级 */
  .verification-province {
    width: 195px;
    border: 1px solid #d6d6d6;
    border-top: none;
    position: absolute;
    z-index: 10;
    top: 63px;
    background: #fff;
    height: 206px;
    overflow-y: auto;
    left: 10px;
    padding: 16px 0 0 0;
    box-sizing: border-box;
  }
  .verification-province > div {
    height: 34px;
    line-height: 34px;
    margin-bottom: 5px;
    cursor: pointer;
    padding-left: 16px;
    box-sizing: border-box;
  }
  .verification-province > div:hover {
    background-color: #f0f0f0;
  }
  .verification-province > div > i {
    float: right;
    margin-right: 10px;
    margin-top: 10px;
  }
  /* 市级 */

  .verification-city {
    width: 195px;
    border: 1px solid #d6d6d6;
    border-top: none;
    position: absolute;
    z-index: 10;
    top: 63px;
    background: #fff;
    height: 206px;
    overflow-y: auto;
    left: 206px;
    padding: 16px 0 0 0;
    box-sizing: border-box;
  }
  .verification-city > div {
    height: 34px;
    line-height: 34px;
    margin-bottom: 5px;
    cursor: pointer;
    padding-left: 16px;
    box-sizing: border-box;
  }
  .verification-city > div:hover {
    background-color: #f0f0f0;
  }
  .h11 {
    width: 1200px;
    margin: 64px auto;
    text-align: center;
  }
  /* 红色警告 */
  .redAlert {
    font-family: 'PingFangSC';
    color: #fff;
    width: 64px;
    height: 32px;
    border-radius: 4px;
    line-height: 32px;
    display: inline-block;
    background-color: #d0021b;
    text-align: center;
  }
  .redAlert1 {
    font-family: 'PingFangSC';
    color: #fff;
    font-weight: 600;
    float: right;
    margin-right: 120px;
    width: 130px;
    line-height: 28px;
    height: 28px;
    border-radius: 14px;
    background-color: #d0021b;
    font-size: 14px;
    text-align: center;
  }
  /* 橙色警告 */
  .orangeAlert {
    font-family: 'PingFangSC';
    color: #fff;
    width: 64px;
    height: 32px;
    line-height: 32px;
    border-radius: 4px;
    display: inline-block;
    background-color: #f9c306;
    text-align: center;
  }
  .orangeAlert1 {
    font-family: 'PingFangSC';
    color: #fff;
    font-weight: 600;
    float: right;
    margin-right: 120px;
    width: 130px;
    line-height: 28px;
    height: 28px;
    border-radius: 14px;
    background-color: #f9c306;
    font-size: 14px;
    text-align: center;
  }
  /* 黄色警告 */
  .yellowAlert {
    font-family: 'PingFangSC';
    color: #000;
    width: 64px;
    height: 32px;
    line-height: 32px;
    border-radius: 4px;
    display: inline-block;
    background-color: yellow;
    line-height: 28px;
    text-align: center;
  }
  .yellowAlert1 {
    font-family: 'PingFangSC';
    color: #000;
    font-weight: 600;
    float: right;
    margin-right: 120px;
    width: 130px;
    height: 28px;
    line-height: 28px;
    border-radius: 14px;
    background-color: yellow;
    font-size: 14px;
    text-align: center;
  }
  /* 绿色通过 */
  .greenAlert {
    font-family: 'PingFangSC';
    color: #fff;
    width: 64px;
    height: 32px;
    line-height: 32px;
    border-radius: 4px;
    display: inline-block;
    background-color: #7ed321;
    text-align: center;
  }
  .greenAlert1 {
    font-family: 'PingFangSC';
    color: #fff;
    font-weight: 600;
    float: right;
    margin-right: 120px;
    width: 130px;
    line-height: 28px;
    height: 28px;
    border-radius: 14px;
    background-color: #7ed321;
    font-size: 14px;
    text-align: center;
  }
  /* 批量核名移入移出后台数据 */
  .verification-muchData > div:nth-child(2) > ul > li:nth-child(3) > .verification-moveData {
    width: 600px;
    height: 443px;
    box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.2);
    background-color: #fff;
    position: absolute;
    right:-66px;
    top: 82px;
    overflow: auto;
    padding: 48px 36px 0 36px;
    box-sizing: border-box;
    z-index: 999;
  }
  .verification-moveData > div >div:first-child {
    height: 28px;
    line-height: 28px;
  }
  .verification-moveData > div >div:first-child > span:nth-child(1){
    float: left;
    font-weight: 600;
    color:#333;
    width: 224px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    text-align: left;
  }
  .mr0 {
    margin-right: 0px !important;
  }
  .verification-moveData > div >div:nth-child(2) {
    height: 40px;
    width: 528px;
    line-height: 18px;
    margin-bottom: 25px;
    margin-top: 10px;
    overflow: auto;
    white-space: pre-wrap;
    text-align:left;
    font-family: 'PingFangSC';
    font-size: 14px;
  }
  .trigonometry {
    position: absolute;
    width: 0;
    height: 0;
    top: 73px;
    right: 356px;
    border-style: solid;
    border-width: 10px;
    border-color: transparent transparent #fff #fff;
    transform: rotate(135deg);
    -webkit-box-shadow: -2px 2px 3px 0 rgba(0, 0, 0, 0.2);
    -moz-box-shadow: -2px 2px 3px 0 rgba(0, 0, 0, 0.2);
    box-shadow: -2px 2px 3px 0 rgba(0, 0, 0, 0.2);
    z-index: 9977;
  }
</style>
