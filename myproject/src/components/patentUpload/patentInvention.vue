<template>
  <div class="patentInvention">
    <Top></Top>
    <Fix></Fix>
    <div class="patentInvention-box">
      <!-- 头部 -->
      <div class="patentInvention-box-top">
        发明专利申请
      </div>
       <div class="fail" v-if="this.$route.query.status == '资料审核不通过'">审核不通过原因：{{remark}}</div>
      <!-- 类型 -->
      <!-- <div class="patentInvention-box-type">
        <span>申请人类型</span>
        <input type="radio" value="1" v-model="find" name="invoice" @change="showCount">
        <span>企业</span>
        <input type="radio" value="2" v-model="find" name="invoice" @change="showCount1">
        <span>个人</span>
      </div> -->
      <!-- 企业申请人 -->
      <div class="patentInvention-box-applicant" v-show="divshow">
        <span>第1专利申请人：</span>
        <select v-model="chose" @change='getValue1'>
          <option value="0">请选择</option>
          <option  v-for="(v,k) in arr2" v-bind:value="v.id" :key="k">{{v.name}}</option>
        </select>
        <span  @click="toconfire1()">添加申请人</span>
        <span @click="toconfire2()">添加共同申请人</span>
        <div class="form-msg">{{choseName}}</div>
      </div>
      <!-- 共同申请人  -->
      <div v-for="(item,index) in count" class="patentInvention-box-applicant" v-show="divshow">
        <span>第{{index+2}}专利申请人：</span>
        <select v-model="item.name">
          <option value="0">请选择</option>
          <option  v-for="(v,index) in arr2" v-bind:value="v.id" :key="index">{{v.  name}}</option>
        </select>
        <span @click="del(index)">删除</span>
        <div class="form-msg">{{choseName}}</div>
      </div>
      <!-- 个人申请人 -->
      <!-- <div class="patentInvention-box-applicant" v-show="!divshow">
        <span>第1专利申请人：</span>
        <select v-model="chose1" @click='getValue2'>
          <option value="0">请选择</option>
          <option v-for="(v,k) in arr1" v-bind:value="v.id" :key="k">{{v.chinese_name}}</option>
        </select>
        <span @click="toconfire3()">添加申请人</span>
        <span @click="toconfire4()">添加共同申请人</span>
        <div class="form-msg">{{choseName}}</div>
      </div> -->
      <!-- 个人共同申请人 -->
      <!-- <div v-for="(item,index) in count" class="patentInvention-box-applicant" v-show="!divshow">
        <span>第{{index+2}}专利申请人：</span>
        <select v-model="item.name">
          <option value="0">请选择</option>
          <option v-for="(v,k) in arr1" v-bind:value="v.id" :key="k">{{v.chinese_name}}</option>
        </select>
        <span @click="del(index)">删除</span>
        <div class="form-msg">{{choseName}}</div>
      </div> -->
      <!-- 第一发明人姓名 -->
      <div class="patentInvention-box-one">
        <span>第一发明人姓名：</span>
        <input v-model="chineseName" type="text">
        <div class="form-msg">{{chineseNameTip}}</div>
      </div>
      <!--  第一发明人身份证号 -->
      <div class="patentInvention-box-one">
        <span>第一发明人身份证号：</span>
        <input v-model="identity"  maxlength="18" type="text">
        <div class="form-msg">{{identityId}}</div>
      </div>
      <!-- 其他发明人 -->
      <div class="patentInvention-box-one">
        <span>其他发明人：</span>
        <input v-model="inventionsOther"  type="text">
        <span>（多个发明人用逗号分开）</span>
        <div class="form-msg"></div>
      </div>
      <!-- 技术联系人 -->
      <div class="patentInvention-box-one">
        <span>技术联系人：</span>
        <input v-model="jsmobile" type="text">
        <div class="form-msg">{{jsmobileId}}</div>
      </div>
      <!-- 技术联系人电话 -->
      <div class="patentInvention-box-one">
        <span>技术联系人电话：</span>
        <input v-model="mobile"  maxlength="11" type="text">
         <div class="form-msg">{{mobileId}}</div>
      </div>
      <!-- 电子邮箱 -->
      <div class="patentInvention-box-one">
        <span>电子邮箱：</span>
        <input v-model="email"  type="text">
        <div class="form-msg">{{emailId}}</div>
      </div>
      <!-- 技术交底书 -->
      <div class="patentInvention-box-two">
        <span>技术交底书：</span>
        <!-- <div>{{name1}}</div> -->
        <!-- <div>{{name1}}</div> -->
        <input type="text" v-model="name1" disabled="disabled">
        <label for="fileNone"></label>
        <input type="file" id="fileNone" @change="update" ref="file" style="display:none;" >
        <span>（上传文件格式为pdf、word或压缩包文件）</span>
        <div class="form-msg">{{name1Ip}}</div>
      </div>
      <!-- CAD图纸 -->
      <div class="patentInvention-box-two">
        <span>CAD图纸：</span>
        <!-- <div>{{name2}}</div> -->
        <input type="text" v-model="name2" disabled="disabled">
        <label for="fileNone1"></label>
        <input type="file" id="fileNone1" name="file" @change="updateCAD" style="display:none;" >
        <span>（上传文件格式为pdf、word或压缩包文件）</span>
        <div class="form-msg">{{name2Ip}}</div>
      </div>
      <!-- 已同报 -->
       <div class="patentInvention-box-orderNumber" v-if="withShow">
        <span>同报专利订单：</span>
        <span>{{orderNumber}}</span>
      </div>
      <!-- 未同报专利 -->
      <div class="patentInvention-box-type" v-if="!withShow">
        <span>同报专利</span>
        <input type="radio" value="1" v-model="find3" name="invoice2">
        <span>是</span>
        <input type="radio" value="2" v-model="find3" name="invoice2">
        <span>否</span>
        <div>
           <span class="xiano">提示：同一技术的专利需要同时申请发明专利和实用新型专利时，请选择是</span>
        </div>
      </div>
      <!-- 未同报专利订单 -->
      <div class="patentInvention-box-applicant" v-show="div1show">
        <span>同报专利订单：</span>
        <select v-model="chose5" @change=" getValue5">
          <option value="请选择同报订单">{{chose5Name}}</option>
          <option  v-for="(v,k) in arr3" v-bind:value="v" :key="k">{{v}}</option>
        </select>
        <div class="form-msg">{{chose5NameId}}</div>
      </div>
      <!-- 申请专利费用减缓： -->
      <div class="patentInvention-box-type">
        <span>申请专利费用减缓：</span>
        <input type="radio" value="1" v-model="find2" name="invoice1">
        <span>是</span>
        <input type="radio" value="2" v-model="find2" name="invoice1">
        <span>否</span>
        <div>
          <img src="/static/images/alert1.png" alt="">
          <span @mouseenter="enter()" @mouseleave="leave()">专利费用减缓条件</span>
        </div>
        <div class="posab" v-show="posab">
          <p>1.申请人是公司：</p>
          <p>上年度应纳税所得额高于100万不用提供材料，低于100万需提供</p>
          <p>以下材料,判断标准请看上年度企业所得税年度纳税申报表A</p>
          <p>类中的23栏是否高于100万或低于100万。</p>
          <p>2.申请人是个人：</p>
          <p>年收入低于6万元</p>
        </div>
      </div>
      <!--申报表A类 -->
      <div class="patentInvention-box-declareA" v-show="apper1&&showTf">
        <span>上年度企业所得税年度纳税申报表A类盖公章：</span>
        <div>
          <el-upload
            accept="image/*"
            :http-request="uploadData1"
            :show-file-list="false"
            action="">
            <img class="dataimg" :src="dataimg1?dataimg1:'/static/images/uploadData.png'" alt="">
          </el-upload>
        </div>
        <span>（除上海市以外，其他地区材料请自行面交或邮寄）</span>
        <div class="form-msg">{{inventionsOtherTip}}</div>
      </div>
      <!-- 申报表A类封面： -->
      <div class="patentInvention-box-declareA" v-show="apper1&&showTf">
        <span>上年度企业所得税年度纳税申报表A类封面盖公章：</span>
        <div>
          <el-upload
            accept="image/*"
            :http-request="uploadData2"
            :show-file-list="false"
            action="">
            <img class="dataimg" :src="dataimg2?dataimg2:'/static/images/uploadData.png'" alt="">
          </el-upload>
        </div>
        <div class="form-msg">{{inventionsOtherTip1}}</div>
      </div>
      <!-- 个人收入 -->
       <div class="patentInvention-box-declareA" v-show="apper&&showTf">
        <span>个人收入证明盖单位公章：</span>
        <div>
          <el-upload
            accept="image/*"
            :http-request="uploadData3"
            :show-file-list="false"
            action="">
            <img class="dataimg" :src="dataimg3?dataimg3:'/static/images/uploadData.png'" alt="">
          </el-upload>
        </div>
         <span>（除上海市以外，其他地区材料请自行面交或邮寄）</span>
        <div  class="form-msg">{{inventionsOtherTip2}}</div>
      </div>
      <!-- 提交取消 -->
      <div class="patentInvention-box-delSub">
        <span  @click="back()">取消</span>
        <span  @click="addinvoice">保存</span>
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
  name:'patentInvention',
  components: {
      Top,
      Foot,
      Fix
    },
    data () {
      return {
        // 表单数据
        // find:'1',
        find2:'1',
        find3:'2',
        // 企业申请人
        arr2:[],
        // 个人申请人
        // arr1:[],
        // 申请人
        chose:'0',
        chose2:'0',
        // chose1:'0',
        chose3:'0',
        chose5:'请选择同报订单',
        chose5Name:'请选择同报订单',
        choseName:'',
        chose5NameId:'',
        // 第一发明人姓名 数据
        chineseName:'',
        chineseNameTip:'',
        // 第一发明人身份证 数据
        identity:'',
        identityId:'',
        // 技术联系人
        jsmobile:'',
        jsmobileId:'',
        // 联系电话 数据
        mobile:'',
        mobileId:'',
        // 电子邮箱 数据
        email:'',
        emailId:'',
        // 其他发明人 数据
        inventionsOther:'',
        inventionsOtherTip:'',
        // 技术交底书 传给后台数据
        book1:'',
        // 技术交底书 展示在页面的数据
        name1:'',
        name1Ip:'',
        // CAD图纸 传给后台数据
        book2:'',
        // CAD图纸 展示在页面的数据
        name2:'',
        name2Ip:'',
        // 申报表A 展示在页面的图片
        dataimg2:'',
        dataimg1:'',
        inventionsOtherTip1:'',
        inventionsOtherTip:'',
        book3:'',
        // 个人 展示在页面的图片
        dataimg3:'',
        inventionsOtherTip2:'',
        // 控制显示隐藏
        apper:false,
        apper1:true,
        divshow:true,
        showTf:true,
        posab:false,
        div1show:false,
        // 个人和企业id
        buss_id:'',
        // 共同申请人
        co_buss:'',
        count:[],
        a:{ name : '0'},
        // 同报
        orderNumber:'',
        withShow:false,
        // 未同报
        arr3:[],
        common_id:'',
        is_common:'',
        // 审核不通过原因
        remark:''
      }
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
      // 技术交底书
      update(e) {
        let file = e.target.files[0]
        // console.log(file)
        let formData = new FormData();
        formData.append('url_img',file);
        // console.log(formData.get('url_img'))
        if(formData.get('url_img') !=  "undefined" ) {
          this.name1 = formData.get('url_img').name
          localStorage.setItem("name1",this.name1)
          let config = {
            headers:{'Content-Type':'multipart/form-data'}
          };
          this.$http.post(this.GLOBAL.base_url+'/api/BrandUpload/brandUploadFile',formData).then( res => {
            // console.log(res)
            if(res.data.code == '1') {
              this.book1 = res.data.filepath
            }
          })
        }
      },
      // updateCAD
      updateCAD(e) {
        let file = e.target.files[0]
        // console.log(file)
        let formData = new FormData();
        formData.append('url_img',file);
        // console.log(formData.get('url_img'))
        if(formData.get('url_img') !=  "undefined" ) {
          this.name2 = formData.get('url_img').name
          localStorage.setItem("name2",this.name2)
          let config = {
            headers:{'Content-Type':'multipart/form-data'}
          };
          this.$http.post(this.GLOBAL.base_url+'/api/BrandUpload/brandUploadFile',formData).then( res => {
            // console.log(res)
            if(res.data.code == '1') {
              this.book2 = res.data.filepath
            }
          })
        }
      },
      // 申报表A类
      uploadData1(img){
        let formData=new FormData();
        formData.append('url_img',img.file);
        // console.log(formData)
        this.$http.post(this.GLOBAL.base_url+'/api/BrandUpload/brandUploadFile',formData).then(res=>{
          if(res.data.code == "1"){
            this.ser_img1 = res.data.filepath;
            this.dataimg1 = this.GLOBAL.base_url+ res.data.filepath;
          }
        });
      },
      // 申报表A类封面
       uploadData2(img){
        let formData=new FormData();
        formData.append('url_img',img.file);
        this.$http.post(this.GLOBAL.base_url+'/api/BrandUpload/brandUploadFile',formData).then(res=>{
          if(res.data.code == "1"){
            this.ser_img2 = res.data.filepath;
            this.dataimg2 = this.GLOBAL.base_url+ res.data.filepath;
          }
        });
      },
      // 个人
       uploadData3(img){
        let formData=new FormData();
        formData.append('url_img',img.file);
        this.$http.post(this.GLOBAL.base_url+'/api/BrandUpload/brandUploadFile',formData).then(res=>{
          if(res.data.code == "1"){
            this.ser_img3 = res.data.filepath;
            this.dataimg3 = this.GLOBAL.base_url+ res.data.filepath;
          }
        });
      },
      // 提交
      addinvoice() {
        //申请企业提交
        if(this.find2 == '1') {
            let c= '';
            for( let i=0 ;i<this.count.length; i++ ) {
              c+= this.count[i].name+','
            }
            c = c.substring(0,c.length-1);
            this.co_buss = c;
            this.book3 = this.ser_img2 + ',' + this.ser_img1;
            if(this.chose == '0') {
              this.choseName = '请选择申请人'
            }else if (this.chineseName == '') {
              this.chineseNameTip='请输入姓名'
            }else if (this. identity == '') {
              this.identityId = '请输入身份证号'
            }else if (this.jsmobile == '') {
              this.jsmobileId='请输入技术联系人'
            }else if (this.mobile == '') {
              this.mobileId='请输入手机号码'
            }else if (this.email == '') {
              this.emailId='请填写邮箱号'
            }else if (this.name1 == '') {
              this.name1Ip = '请上传技术交底书'
            }else if (this.name2 == '') {
              this.name2Ip = '请上传CAD图纸'
            }else {
                this.$http.post(this.GLOBAL.base_url+'/api/patent/subInfo',{
                  user_id:this.$cookie.getCookie('u_id'),
                  id:this.$route.query.id,
                  type:1,
                  buss_id:this.buss_id,
                  // co_buss:this.co_buss,
                  invent_name:this.chineseName,
                  invent_card:this.identity,
                  tel:this.mobile,
                  email:this.email,
                  book1:this.book1,
                  book2:this.book2,
                  is_reduce:this.find2,
                  invent_names:this.inventionsOther,
                  book3:this.book3,
                  t_name:this.jsmobile,
                  common_id:this.common_id,
                }).then( res => {
                  if(res.data.code == "1"){
                  this.tip('success','提交成功')
                  setTimeout(()=>{
                     this.$router.push('/personal/orderPatent?status=all')
                  },1000)
                }else{
                 this.tip('error',res.data.msg)
                }
              })
            }
        }
        if( this.find2 == '2') {
            var c= ''
            for( let i=0 ;i<this.count.length; i++ ) {
              c+= this.count[i].name+','
            }
            c = c.substring(0,c.length-1)
            this.co_buss = c
            if(this.chose == '0') {
              this.choseName = '请选择申请人'
              }else if (this.chineseName == '') {
                this.chineseNameTip='请输入姓名'
              }else if (this. identity == '') {
                this.identityId = '请输入身份证号'
              }else if (this.jsmobile == '') {
                this.jsmobileId='请输入技术联系人'
              }else if (this.mobile == '') {
                this.mobileId='请输入手机号码'
              }else if (this.email == '') {
                this.emailId='请填写邮箱号'
              }else if (this.name1 == '') {
                this.name1Ip = '请上传技术交底书'
              }else if (this.name2 == '') {
                this.name2Ip = '请上传CAD图纸'
              }else {
                  this.$http.post(this.GLOBAL.base_url+'/api/patent/subInfo',{
                    user_id:this.$cookie.getCookie('u_id'),
                    id:this.$route.query.id,
                    type:1,
                    buss_id:this.buss_id,
                    // co_buss:this.co_buss,
                    invent_name:this.chineseName,
                    invent_card:this.identity,
                    tel:this.mobile,
                    email:this.email,
                    book1:this.book1,
                    book2:this.book2,
                    is_reduce:this.find2,
                    invent_names:this.inventionsOther,
                    book3:this.book3,
                    t_name:this.jsmobile,
                    common_id:this.common_id
                  }).then( res => {
                    if(res.data.code == "1"){
                      console.log(res)
                    this.tip('success','提交成功')
                    setTimeout(()=>{
                       this.$router.push('/personal/orderPatent?status=all')
                    },1000)
                  }else{
                    console.log(res)
                   this.tip('error',res.data.msg)
                  }
                })
              }
        }
      // 申请人提交
        // if( this.find2 == '1') {
        //     var c= ''
        //     for( let i=0 ;i<this.count.length; i++ ) {
        //       c+= this.count[i].name+','
        //     }
        //     c = c.substring(0,c.length-1)
        //     this.co_buss = c
        //     // console.log(this.co_buss)
        //     this.book3 = this.ser_img3
        //     // console.log(this.book3)
        //     if(this.chose1 == '0') {
        //       this.choseName = '请选择申请人'
        //     }else if (this.chineseName == '') {
        //       this.chineseNameTip='请输入姓名'
        //     }else if (this. identity == '') {
        //       this.identityId = '请输入身份证号'
        //     }else if (this.jsmobile == '') {
        //       this.jsmobileId='请输入技术联系人'
        //     }else if (this.mobile == '') {
        //       this.mobileId='请输入手机号码'
        //     }else if (this.email == '') {
        //       this.emailId='请填写邮箱号'
        //     }else if (this.name1 == '') {
        //       this.name1Ip = '请上传技术交底书'
        //     }else if (this.name2 == '') {
        //       this.name2Ip = '请上传CAD图纸'
        //     }else if(this.dataimg3 == '') {
        //         this.inventionsOtherTip2 = '请上传个人收入证明盖单位公章'
        //     }else {
        //         this.$http.post(this.GLOBAL.base_url+'/api/patent/subInfo',{
        //           user_id:this.$cookie.getCookie('u_id'),
        //           id:this.$route.query.id,
        //           type:this.find,
        //           buss_id:this.buss_id,
        //           co_buss:this.co_buss,
        //           invent_name:this.chineseName,
        //           invent_card:this.identity,
        //           tel:this.mobile,
        //           email:this.email,
        //           book1:this.book1,
        //           book2:this.book2,
        //           is_reduce:this.find2,
        //           invent_names:this.inventionsOther,
        //           book3:this.ser_img3,
        //           t_name:this.jsmobile,
        //           common_id:this.common_id
        //         }).then( res => {
        //          if(res.data.code == "1"){
        //           this.tip('success','提交成功')
        //           setTimeout(()=>{
        //              this.$router.push('/personal/orderPatent?status=all')
        //           },1000)
        //         }else{
        //          this.tip('error',res.data.msg)
        //         }
        //         })

        //     }
        // }
        // if( this.find2 == '2') {
        //     var c = ''
        //     for( let i=0 ;i<this.count.length; i++ ) {
        //       c += this.count[i].name+','
        //     }
        //     c = c.substring(0,c.length-1)
        //     this.co_buss = c
        //     // console.log(this.co_buss)
        //     if(this.chose1 == '0') {
        //       this.choseName = '请选择申请人'
        //     }else if (this.chineseName == '') {
        //       this.chineseNameTip='请输入姓名'
        //     }else if (this. identity == '') {
        //       this.identityId = '请输入身份证号'
        //     }else if (this.jsmobile == '') {
        //       this.jsmobileId='请输入技术联系人'
        //     }else if (this.mobile == '') {
        //       this.mobileId='请输入手机号码'
        //     }else if (this.email == '') {
        //       this.emailId='请填写邮箱号'
        //     }else if (this.name1 == '') {
        //       this.name1Ip = '请上传技术交底书'
        //     }else if (this.name2 == '') {
        //       this.name2Ip = '请上传CAD图纸'
        //     }else {
        //         this.$http.post(this.GLOBAL.base_url+'/api/patent/subInfo',{
        //           user_id:this.$cookie.getCookie('u_id'),
        //           id:this.$route.query.id,
        //           type:this.find,
        //           buss_id:this.buss_id,
        //           co_buss:this.co_buss,
        //           invent_name:this.chineseName,
        //           invent_card:this.identity,
        //           tel:this.mobile,
        //           email:this.email,
        //           book1:this.book1,
        //           book2:this.book2,
        //           is_reduce:this.find2,
        //           invent_names:this.inventionsOther,
        //           t_name:this.jsmobile,
        //           common_id:this.common_id
        //         }).then( res => {
        //           if(res.data.code == "1"){
        //           this.tip('success','提交成功')
        //           setTimeout(()=>{
        //              this.$router.push('/personal/orderPatent?status=all')
        //           },1000)
        //         }else{
        //          this.tip('error',res.data.msg)
        //         }
        //         })

        //     }
        // }
      },
      // 添加申请企业
      toconfire1() {
        let routeData = this.$router.resolve({ path: '/personal/companyForm'});
        window.open(routeData.href, '_blank');
      },
      // 添加共同申请企业
      toconfire2(){
        this.a.name = '0'
        for ( let key in this.a ) {
          var b = {};
          b.name = this.a.name
          this.count.push(b)
        }
      },
      // 添加申请人
      toconfire3(){
        let routeData = this.$router.resolve({ path: '/personal/personalForm'});
        window.open(routeData.href, '_blank');
      },
      // 添加共同申请人
      toconfire4(){
        this.a.name = '0'
        for ( let key in this.a ) {
          var b = {};
          b.name = this.a.name
          this.count.push(b)
        }
      },
      // 删除
      del(val) {
        // console.log(val)
         this.count.splice(val,1)
      },
      // 获取认证信息
      getData1(){
        this.$http.post(this.GLOBAL.base_url+'/api/patent/getAuthInfo',{
          user_id:this.$cookie.getCookie('u_id')
        }).then(res=>{
            if(res.data.code == "1"){
              // console.log(res)
              this.arr2 = res.data.data;
              // this.type = res.data.one_cate;
              // console.log(this.type)
            }
          })
      },
      // 获取修改资料的信息
      getData2(){
        this.$http.post(this.GLOBAL.base_url+'/api/patent/subInfoShow',{
          user_id:this.$cookie.getCookie('u_id'),
          id:this.$route.query.id,
          type:this.$route.query.click_type
        }).then( res => {
          // console.log(res)
          if(res.data.code == '1') {
            this.remark = res.data.data.remark
            if (res.data.data.type == '1' && res.data.data.is_reduce == '1') {
              this.find = res.data.data.type
              this.chose = res.data.data.buss_id
              this.buss_id = res.data.data.buss_id
              this.chineseName = res.data.data.invent_name
              this.identity = res.data.data.invent_card
              this.jsmobile = res.data.data.t_name
              this.mobile = res.data.data.tel
              this.email = res.data.data.email
              // this.name1 = res.data.data.book1
              this.book1 = res.data.data.book1
              // this.name2 = res.data.data.book2
              this.book2 = res.data.data.book2
              this.inventionsOther = res.data.data.invent_names
              this.find2 = res.data.data.is_reduce
              this.dataimg1 =this.GLOBAL.base_url+ res.data.data.book3.split(',')[0]
              this.dataimg2 =this.GLOBAL.base_url+ res.data.data.book3.split(',')[1]
              this.ser_img1 = res.data.data.book3.split(',')[0]
              this.ser_img2 = res.data.data.book3.split(',')[0]
              for(let i =0; i< res.data.data.co_bussS.length; i++){
                this.a.name = res.data.data.co_bussS[i]
                 for ( let key in this.a ) {
                  var b = {};
                  b.name = this.a.name
                  this.count.push(b)
                }
              }
              this.is_common = res.data.data.is_common
            }
            if (res.data.data.type == '1' && res.data.data.is_reduce == '2') {
              this.find = res.data.data.type
              this.chose = res.data.data.buss_id
              this.buss_id = res.data.data.buss_id
              this.chineseName = res.data.data.invent_name
              this.identity = res.data.data.invent_card
              this.jsmobile = res.data.data.t_name
              this.mobile = res.data.data.tel
              this.email = res.data.data.email
              // this.name1 = res.data.data.book1
              this.book1 = res.data.data.book1
              // this.name2 = res.data.data.book2
              this.book2 = res.data.data.book2
              this.inventionsOther = res.data.data.invent_names
              this.find2 = res.data.data.is_reduce
              this.is_common = res.data.data.is_common
              for(let i =0; i< res.data.data.co_bussS.length; i++){
                this.a.name = res.data.data.co_bussS[i]
                 for ( let key in this.a ) {
                  var b = {};
                  b.name = this.a.name
                  this.count.push(b)
                }
              }
            }
            if (res.data.data.type == '2' && res.data.data.is_reduce == '1') {
              this.find = res.data.data.type
              this.chose1 = res.data.data.buss_id
              this.buss_id = res.data.data.buss_id
              this.chineseName = res.data.data.invent_name
              this.identity = res.data.data.invent_card
              this.jsmobile = res.data.data.t_name
              this.mobile = res.data.data.tel
              this.email = res.data.data.email
              // this.name1 = res.data.data.book1
              this.book1 = res.data.data.book1
              // this.name2 = res.data.data.book2
              this.book2 = res.data.data.book2
              this.inventionsOther = res.data.data.invent_names
              this.find2 = res.data.data.is_reduce
              this.dataimg3 = this.GLOBAL.base_url+res.data.data.book3
              this.ser_img3 = res.data.data.book3
              for(let i =0; i< res.data.data.co_bussS.length; i++){
                this.a.name = res.data.data.co_bussS[i]
                 for ( let key in this.a ) {
                  var b = {};
                  b.name = this.a.name
                  this.count.push(b)
                }
              }
              this.is_common = res.data.data.is_common
            }
            if (res.data.data.type == '2' && res.data.data.is_reduce == '2') {
              this.find = res.data.data.type
              this.chose1 = res.data.data.buss_id
              this.buss_id = res.data.data.buss_id
              this.chineseName = res.data.data.invent_name
              this.identity = res.data.data.invent_card
              this.jsmobile = res.data.data.t_name
              this.mobile = res.data.data.tel
              this.email = res.data.data.email
              // this.name1 = res.data.data.book1
              this.book1 = res.data.data.book1
              // this.name2 = res.data.data.book2
              this.book2 = res.data.data.book2
              this.inventionsOther = res.data.data.invent_names
              this.find2 = res.data.data.is_reduce
               for(let i =0; i< res.data.data.co_bussS.length; i++){
                this.a.name = res.data.data.co_bussS[i]
                 for ( let key in this.a ) {
                  var b = {};
                  b.name = this.a.name
                  this.count.push(b)
                }
              }
              this.is_common = res.data.data.is_common
            }
          }
        })
      },
      // 获取 个人和企业id
      getValue1() {
          this.buss_id = this.chose;

      },
      getValue2() {
        if (this.find == '2') {
          this.buss_id = this.chose1;
          this.getData1()
        }
      },
      getValue5(){
        if(this.find3 == '1') {
          this.common_id = this.chose5
        }
      },
      // 切换企业和个人 添加共同申请人的显示和隐藏
      showCount(){
        this.count = []
      },
      showCount1(){
        this.count = []
      },
      // 取消
      back(){
        this.$router.back()
      },
      // 减缓说明
      enter(){
        this.posab = true;
      },
      leave(){
        this.posab = false
      },
      // 同报专利订单数据
      getData3(){
        this.$http.post(this.GLOBAL.base_url+'/api/patent/getCommonOrder',{
          user_id:this.$cookie.getCookie('u_id'),
          id:this.$route.query.id,
          type:'实用新型专利申请',
        }).then(res => {
          if(res.data.code == '1') {
            if(this.edit == "1") {
              if(res.data.data.is_com == '0') {
                this.withShow = false
                this.arr3 = res.data.data.order_ids
              }
              if(res.data.data.is_com == '1') {
                this.orderNumber = res.data.data.common_id
                this.withShow = true
                this.common_id = this.orderNumber
              }
            };
            if( this.edit == "2") {
              if(this.is_common == "1") {
                this.withShow = true
                this.orderNumber = res.data.data.common_id
                this.common_id = this.orderNumber
              }
              if( this.is_common == '2') {
                this.withShow = false
                if(res.data.data.is_com == '0') {
                  this.find3 = 2
                  this.arr3 = res.data.data.order_ids
                }
                if(res.data.data.is_com == '1') {
                    this.find3 = 1
                    this.arr3 = res.data.data.order_ids
                    this.chose5Name = res.data.data.common_id
                    this.common_id = this.chose5Name
                }
              }
            };
          }
        })
      }
    },
    mounted(){
      this.getData1()
      this.edit = this.$route.query.edit
      if(this.$route.query.edit == "2") {
        this.getData2();
        this.name1 = localStorage.getItem("name1")
        this.name2 = localStorage.getItem("name2")
      }
      this.getData3()
    },
    watch:{
      // 申请企业
      'chose'(newValue) {
        if(newValue == '0') {
          return this.choseName = '请选择申请人'
        }
        this.choseName = ''
      },
      // 申请人
      'chose1'(newValue) {
        if(newValue == '0') {
          return this.choseName = '请选择申请人'
        }
        this.choseName = ''
      },
       // 第一发明人姓名
      'chineseName'(newValue){
        if(newValue == ""){
          return this.chineseNameTip='请输入姓名';
        }
        this.chineseNameTip= ""
      },
       // 第一发明人身份证
      'identity'(newValue) {
        let reg =/^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/
        if (newValue == '') {
          return this.identityId = '请输入身份证号'
        }
        if (newValue.length !=18 || !reg.test(newValue)) {
          return this.identityId = '身份证号格式不正确'
        }
        return this.identityId = ''
      },
      //技术联系人
      'jsmobile'(newValue){
        if(newValue == ""){
          return this.jsmobileId='请输入技术联系人';
        }
        this.jsmobileId= ""
      },
      // 联系电话
      "mobile"(newValue){
        let mobileReg=/^[1][3,4,5,7,8][0-9]{9}$/;
        if(newValue ==''){
         return this.mobileId='请输入手机号码';
        }
        if(newValue.length!=11||!mobileReg.test(newValue)){
          return this.mobileId='手机号格式不正确';
        }
        return this.mobileId='';
      },
      // 电子邮箱
      "email"(newValue){
        let emailReg=/^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/;
        if(newValue ==''){
          return this.emailId='请填写邮箱号';
        }
        if(!emailReg.test(newValue)){
          return this.emailId='邮箱格式不正确';
        }
        return this.emailId='';
      },
      // 控制个人的显示隐藏
      'find'(newValue){
        if(newValue == "1"){
                this.apper = false
                this.apper1 = true
                this.divshow = true
            }
            if(newValue == "2"){
                this.apper = true
                this.apper1 = false
                this.divshow = false
            }
      },
      // 技术交底书
      'name1'(newValue) {
        if(newValue == '') {
          return this.name1Ip = '请上传技术交底书';
        }
        this.name1Ip = ''
      },
      // CAD图纸
      'name2'(newValue) {
        if(newValue == '') {
          return this.name2Ip = '请上传CAD图纸';
        }
        this.name2Ip = ''
      },
      // A类
      'dataimg1'(newValue){
          if(newValue == ""){
              return this.inventionsOtherTip='请上传上年度企业所得税年度纳税申报表A类盖公章';
          }
          this.inventionsOtherTip= ""
      },
      // A类封面
      'dataimg2'(newValue){
          if(newValue == ""){
              return this.inventionsOtherTip1='请上传上年度企业所得税年度纳税申报表A类封面盖公章';
          }
          this.inventionsOtherTip1= ""
      },
      'dataimg3'(newValue){
          if(newValue == ""){
              return this.inventionsOtherTip2='请上传个人收入证明盖单位公章';
          }
          this.inventionsOtherTip1= ""
      },
      // 控制减缓材料显示隐藏
      'find2'(newValue) {
        if(newValue == '1') {
          this.showTf = true
        }
        if (newValue == '2') {
          this.showTf = false
        }
      },
      // 同报
      'find3'(newValue) {
        if(newValue == '1') {
          this.div1show = true
          if(this.edit == '2') {
            this.common_id = this.chose5Name
          }
        }
        if (newValue == '2') {
          this.div1show = false
          this.common_id = ''
        }
      },
      // 未同报
      'chose5'(newValue) {
        if(newValue == '0') {
          return this.chose5NameId = '请选择同报专利订单号'
        }
        this.chose5NameId = ''
      }
    }
}
</script>

<style scoped>
/* 公共样式 */
 input {
    width: 744px;
    height: 40px;
    line-height: 40px;
    padding-left: 8px;
    box-sizing: border-box;
    border: solid 1px #d6d6d6;
    font-family: "PingFangSC";
    font-size: 16px;
    color: #999999;
    border-radius: 4px;
  }

  .patentInvention-box {
    width: 980px;
    margin: 0 auto;
    padding-top: 48px;
    box-sizing: border-box;
  }
  /* 头部 */
  .patentInvention-box-top {
    width: 980px;
    height: 60px;
    line-height: 60px;
    font-family: "PingFangSC";
    font-size: 20px;
    color: #cdcdcd;
    border-bottom: 1px solid #d8d8d8;
    margin-bottom: 26px;
  }
  /* 类型&&申请专利费用减缓 */
  .patentInvention-box-type {
    margin-bottom:26px;
    position: relative;
  }
  .patentInvention-box-type > span:nth-child(1) {
    display: block;
    margin-bottom: 17px;
    font-family: "PingFangSC";
    font-size: 18px;
    color: #333;
  }
  .patentInvention-box-type > input {
    width: 16px;
    height: 16px;
    cursor: pointer;
    vertical-align: middle;
    margin-right: 10px;
  }
  .patentInvention-box-type > span:nth-child(3) {
    font-family: "PingFangSC";
    font-size: 14px;
    color: #333;
    margin-right: 66px;
    font-weight: 300;
  }
   .patentInvention-box-type > span:nth-child(5) {
    font-family: "PingFangSC";
    font-size: 14px;
    color: #333;
    font-weight: 300;
  }
  .patentInvention-box-type > div {
    font-family: "PingFangSC";
    font-size: 14px;
    color: #f96006;
    font-weight: 300;
    float: right;
  }
  .patentInvention-box-type > div > img {
    vertical-align: middle;
    position: relative;
  }
  .patentInvention-box-type > div > span {
    vertical-align: middle;
    border-bottom: 1px solid #f96006;
  }
  /* 专利申请人 */
  .patentInvention-box-applicant>span:nth-child(1) {
    font-family: "PingFangSC";
    font-size: 18px;
    color: #333;
    display: block;
    margin-bottom: 16px;
  }
  .patentInvention-box-applicant > select {
    width: 744px;
    height: 40px;
    line-height: 40px;
    padding-left: 8px;
    box-sizing: border-box;
    border: solid 1px #d6d6d6;
    font-family: "PingFangSC";
    font-size: 16px;
    color: #999999;
  }
  .patentInvention-box-applicant>span:nth-child(3) {
    font-family: "PingFangSC";
    font-size: 16px;
    color: #f96006;
    margin: 0px 24px 0 10px;
    cursor: pointer;
  }
  .patentInvention-box-applicant>span:nth-child(4) {
    font-family: "PingFangSC";
    font-size: 16px;
    color: #4a90e2;
    cursor: pointer;
  }
  /* 第一发明人姓名&&第一发明人身份证号&&联系电话&&电子邮箱&&其他发明人*/
  .patentInvention-box-one>span:nth-child(1) {
    font-family: "PingFangSC";
    font-size: 18px;
    color: #333;
    display: block;
    margin-bottom: 16px;
  }
  .patentInvention-box-one>span:nth-child(3) {
    font-family:" PingFangSC";
    font-size: 16px;
    font-weight: 300;
    color: #f96006;
  }
  /* 技术交底书&&CAD图纸 */
  .patentInvention-box-two {
    width: 744px;
    position: relative;
  }
  .patentInvention-box-two >span:nth-child(1) {
    font-family: "PingFangSC";
    font-size: 18px;
    color: #333;
    display: block;
    margin-bottom: 16px;
  }
  .patentInvention-box-two > div:nth-child(2) {
    width: 744px;
    height: 40px;
    border: 1px solid #d8d8d8;
    border-radius: 4px;
    border-right: none;
    line-height: 40px;
    padding-left: 8px;
    box-sizing: border-box;
  }
  .patentInvention-box-two > label {
    width: 88px;
    height: 40px;
    display: block;
    background: url(/static/images/202228.png);
    position: absolute;
    top: 40px;
    right: 0px;
  }
  .patentInvention-box-two >span:nth-child(5) {
    position: absolute;
    top: 50px;
    right: -330px;
    font-family: "PingFangSC";
    font-size: 16px;
    font-weight: 300;
     color:#f96006;
  }
  /* 减缓材料 */
  .posab {
    position: absolute;
    top:72px;
    right: -286px;
    color: #000 !important;
    font-family: "PingFangSC";
  }
  .posab > p:nth-child(2) {
    margin-left: 18px;
  }
  .posab > p:nth-child(5) {
    margin-top: 10px;
  }
  .posab > p:nth-child(6) {
    margin-left: 18px;
  }
  /* 申报表A类&&申报表A类封面 */
  .patentInvention-box-declareA > span:nth-child(1) {
    display: block;
    font-family: "PingFangSC";
    font-size: 18px;
    color: #333;
    margin-bottom: 16px;
  }
  .patentInvention-box-declareA > div:nth-child(2) {
    display: inline-block;
  }
  .dataimg{
     width: 132px;
     height: 120px;
 }
  .patentInvention-box-declareA > span:nth-child(3) {
    font-family: "PingFangSC";
    font-size: 16px;
    font-weight: 300;
    color: #f96006;
  }
  /* 取消保存 */
  .patentInvention-box-delSub {
    text-align: center;
    margin-top: 68px;
    margin-bottom: 80px;
  }
  .patentInvention-box-delSub > span {
    width: 80px;
    height: 36px;
    line-height: 36px;
    display: inline-block;
    text-align: center;
    font-family: "PingFangSC";
    font-size: 14px;
    cursor: pointer;
  }
  .patentInvention-box-delSub > span:nth-child(1) {
    background-color: #efefef;
    border-radius: 4px;
    color: #f87e03;
    margin-right: 16px;
  }
  .patentInvention-box-delSub > span:nth-child(2) {
    background-color: #f96006;
    border-radius: 4px;
    color: #fff;
  }

  /* 提示 */
  .form-msg {
    height: 26px;
    line-height: 26px;
    font-size: 14px;
    color: red;
  }
  .xiano {
    border-bottom:none !important;
  }
  /* 已同报 */
  .patentInvention-box-orderNumber {
    font-family: "PingFangSC";
    font-size: 18px;
    color: #333;
    margin-bottom: 16px;
  }
  .patentInvention-box-orderNumber > span:nth-child(2) {
    font-family: "PingFangSC";
    font-size: 16px;
    color: #999999;
  }
  input[disabled] {
    background: #fff;
  }
  .mb26 {
    margin-bottom: 26px;
  }
  .fail{
     margin-top: 20px;
     font-size: 20px;
     color: red;
    margin-bottom: 26px;
  }
</style>
