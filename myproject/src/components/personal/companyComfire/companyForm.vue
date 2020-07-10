<template>
  <div class="companyForm-container">
    <div class="companyComfire-box-form">

      <div id="companyComfire-box-form-type">
          <!-- <img src="/static/images/star.png" alt=""> -->
          <span>企业类型</span>
          <el-select @change="choseCompany" v-model="serial" class="companyComfire-box-form-type-select">
            <el-option
              v-for="item in companytype"
              :key="item.serial"
              :label="item.difftype"
              :value="item.serial">
            </el-option>
          </el-select>
        </div>

        <div class="companyComfire-box-form-wrap">
          <!-- <div class="companyComfire-box-form-wrap-representative" v-show="companyType1">
            <img src="/static/images/star.png" alt="">
            <span>法定代表人</span>
            <input v-model="representative" type="text">
            <div class="company-msg">{{representativeTip}}</div>
          </div> -->

          <!-- <div class="companyComfire-box-form-wrap-linkname" v-show="companyType3">
            <img src="/static/images/star.png" alt="">
            <span>联系人姓名</span>
            <input v-model="name" type="text">
            <div class="company-msg">{{nameTip}}</div>
          </div> -->

          <div class="companyComfire-box-form-wrap-chineseCompanyname">
            <!-- <img src="/static/images/star.png" alt=""> -->
            <span>企业名称</span>
            <input v-model.trim="companychineseName" type="text" @blur="lose">
            <span v-if="ifshow">已认证</span>
            <div class="company-msg">{{companychineseNameTip}}</div>
            <div class="catch" v-show="companyshow">
              <div v-for="(v,k) in companyarr" @click="addname(v)" :key="k">{{v}}</div>
            </div>
          </div>

          <!-- <div class="companyComfire-box-form-wrap-englishCompanyname" v-show="companyType4">
            <img src="/static/images/star.png" alt="">
            <span>公司全称(英文)</span>
            <input v-model="companyenglishName" type="text">
            <div class="company-msg">{{companyenglishNameTip}}</div>
          </div> -->

          <!-- <div id="companyComfire-box-form-wrap-companyCode" v-show="companyType3">
            <img src="/static/images/star.png" alt="">
            <span>统一社会信用码</span>
            <input v-model="companyCode" type="text">
            <div class="company-msg2">{{companyCodeTip}}</div>
          </div> -->
          <div class="companyComfire-box-form-wrap-job">
            <span>职位</span>
             <input  v-model="job" type="text">
          </div>
          <div class="companyComfire-box-form-wrap-mobile">
            <!-- <img src="/static/images/star.png" alt=""> -->
            <span>手机号码</span>
            <input maxlength="11" v-model="mobile" type="text">
            <div class="company-msg">{{mobileTip}}</div>
          </div>

          <!-- <div class="companyComfire-box-form-wrap-linkaddress" >
            <img src="/static/images/star.png" alt="">
            <span>注册地址</span>
            <el-select v-model="sheng" @change="choseProvince" placeholder="省级地区" class="companyComfire-box-form-type-select">
            <el-option
              v-for="item in province"
              :key="item.id"
              :label="item.value"
              :value="item.id">
            </el-option>
          </el-select>
          </div>

          <div class="companyComfire-box-form-wrap-linkaddress" >
            <el-select v-model="shi" @change="choseCity" placeholder="市级地区" class="companyComfire-box-form-type-selectaddress">
            <el-option
              v-for="item in shi1"
              :key="item.id"
              :label="item.value"
              :value="item.id">
            </el-option>
          </el-select>
          </div>

          <div class="companyComfire-box-form-wrap-linkaddress" >
            <el-select v-model="qu" @change="choseBlock" placeholder="区级地区" class="companyComfire-box-form-type-selectaddress">
              <el-option
                v-for="item in qu1"
                :key="item.id"
                :label="item.value"
                :value="item.id">
              </el-option>
            </el-select>
          </div>

          <div class="companyComfire-box-form-wrap-detailaddress">
            <input v-model="linkDetail" type="text" placeholder="请输入详细注册地址">
            <div class="company-msg">{{linkDetailTip}}</div>
          </div> -->
          <!-- <div class="companyComfire-box-form-wrap-fixPhone" v-show="companyType3">
            <span>公司座机</span>
            <input maxlength="15" v-model="fixPhone" type="text">
          </div> -->

          <!-- <div class="companyComfire-box-form-wrap-registerchineseAddress" v-show="companyType3">
            <img src="/static/images/star.png" alt="">
            <span>注册地址(中文)</span>
            <input v-model="registerchineseAddress" type="text">
            <div class="company-msg">{{registerchineseAddressTip}}</div>
          </div> -->

          <!-- <div class="companyComfire-box-form-wrap-registerenglishAddress" v-show="companyType4">
            <img src="/static/images/star.png" alt="">
            <span>注册地址(英文)</span>
            <input v-model="registerenglishAddress" type="text">
            <div class="company-msg">{{registerenglishAddressTip}}</div>
          </div> -->

          <!-- <div class="companyComfire-box-form-wrap-postcode" v-show="companyType2">
            <img src="/static/images/star.png" alt="">
            <span>注册地址邮编</span>
            <input v-model="registerpostCode" type="text">
            <div class="company-msg">{{registerpostCodeTip}}</div>
          </div> -->

          <div class="companyComfire-box-form-wrap-idnumber" v-show="companyType1">
            <span>身份证号码</span>
            <input maxlength="18" v-model="idnum" type="text">
            <div class="company-msg">{{idnumTip}}</div>
          </div>

          <!-- <div class="companyComfire-box-form-wrap-idaddress" v-show="companyType1">
            <img src="/static/images/star.png" alt="">
            <span>身份证地址</span>
            <input v-model="idAddress" type="text">
            <div class="company-msg">{{idAddressTip}}</div>
          </div> -->

          <div class="companyComfire-box-form-wrap-uploadimg" v-show="companyType1">
            <span>法人身份证</span>
            <div class="companyComfire-box-form-wrap-uploadimg-div">
              <div>
                <el-upload
                  accept="image/*"
                  :http-request="uploadid1"
                  :show-file-list="false"
                  action="">
                  <img class="idimg" :src="idimg1?idimg1:'/static/images/please.png'" alt="">
                </el-upload>
              </div>
              <div>
                <el-image 
                  style="width: 100px; height: 120px"
                  :src="url" 
                  :preview-src-list="srcList">
                </el-image>
                 <span style="color:red;margin-left:30px;">示例</span>
              </div>
            </div>
            <div style = "clear : both"></div>
            <div class="company-msg">{{idimgTip}}</div>
            <div class="increased">（签字后拍照上传）</div>
          </div>


          
          <div class="companyComfire-box-form-wrap-uploadimg" v-show="companyType1">
            <!-- <img src="/static/images/star.png" alt=""> -->
            <span>营业执照</span>
            <!-- <span id="span1">(营业执照复印件盖公章后拍照上传，只能上传png或jpg格式)</span> -->
            <div class="companyComfire-box-form-wrap-uploadimg-div">
              <div>
                  <el-upload
                  accept="image/*"
                  :http-request="uploadid5"
                  :show-file-list="false"
                  action="">
                  <img class="idimg" :src="idimg5?idimg5:'/static/images/please.png'" alt="">
                </el-upload>
              </div>
               <div>
                <el-image 
                  style="width: 150px; height: 120px"
                  :src="url2" 
                  :preview-src-list="srcList2">
                </el-image>
                 <span style="color:red;margin-left:50px;">示例</span>
              </div> 
            </div>
            <div style="clear : both"></div>
            <div class="company-msg">{{licenseimgTip2}}</div>
            <div class="increased" >（签字上传）</div>
          </div>

          <div class="companyComfire-box-form-wrap-uploadsellimg" v-show="!companyType1">
            <!-- <img src="/static/images/star.png" alt=""> -->
            <span class="ml0">营业执照</span>
            <!-- <span id="span1">(营业执照复印件盖公章后拍照上传，只能上传png或jpg格式)</span> -->
            <div class="companyComfire-box-form-wrap-uploadsellimgdiv">
                <el-upload
                  accept="image/*"
                  :http-request="uploadid3"
                  :show-file-list="false"
                  action="">
                  <img class="idimg" :src="idimg3?idimg3:'/static/images/please.png'" alt="">
                </el-upload>
            </div>
            <div style="clear : both"></div>
            <div class="company-msg">{{licenseimgTip}}</div>
            <div class="increased" >（盖章上传）</div>
          </div>

          <div class="companyComfire-box-form-wrap-uploadsellimg" v-show="companyType5">
            <!-- <img src="/static/images/star.png" alt=""> -->
            <span class="db">营业执照</span>
            <span class="db ml14">翻译件</span>
            <!-- <span id="span1">(只能上传png或jpg格式)</span> -->
            <div class="companyComfire-box-form-wrap-uploadsellimgdiv mt-38">
              <el-upload
                  accept="image/*"
                  :http-request="uploadid4"
                  :show-file-list="false"
                  action="">
                  <img class="idimg" :src="idimg4?idimg4:'/static/images/please.png'" alt="">
                </el-upload>
            </div>
            <div style="clear : both"></div>
            <div class="company-msg">{{licenseenglishimgTip}}</div>
             <div class="increased" >（盖公章后拍照上传）</div>
          </div>
          <div style="clear : both"></div>
          <div class="example" @click="showexample" v-show="!companyType1">营业执照示例</div>
          <div class="companyComfire-box-form-wrap-submit" v-show="status1">
            <!-- 修改后 -->
            <div class="opeartor-ft" @click="companyquit1">取消</div>
            <div class="opeartor-ft1"  @click="companysend">提交</div>
            <!-- 修改前 -->
            <!-- <img @click="companysend" src="/static/images/submit.png" alt="">
            <img @click="companyquit1" src="/static/images/quit.png" alt=""> -->
          </div>
          <div class="companyComfire-box-form-wrap-submit" v-show="status2">
          <!-- 修改后 -->
          <div class="opeartor-ft" @click="companyquit2">取消</div>
            <div class="opeartor-ft1"  @click="companyedit">修改</div>
          <!-- 修改前 -->
          <!-- <img @click="companyedit" class="personalComfire-box-form-type-submit-img" src="/static/images/edit.png" alt="">
          <img @click="companyquit2" src="/static/images/quit.png" alt=""> -->
        </div>
        </div>
    </div>
    <div class="tan" v-show="imgshow">
        <img src="/static/images/licese.png" alt="" class="example-img">
        <img  src="/static/images/cha.png" alt="" class="cha" @click="cha">
      </div>
    <div style="clear:both;"></div>
  </div>

</template>

<script>
const delay = (function() {
		let timer = 0;
		return function(callback, ms) {
			clearTimeout(timer);
			timer = setTimeout(callback, ms);
		};
	})();
export default {
  name: 'companyForm',
  data(){
      return{
          companytype:[{
          serial: '1',
          difftype: '个体工商户'
        }, {
          serial: '2',
          difftype: '国内企业'
        }, {
          serial: '3',
          difftype: '港澳企业'
        }, {
          serial: '4',
          difftype: '台湾企业'
        }, {
          serial: '5',
          difftype: '国外企业'
        }],
        serial:'1',
        // 根据下拉显示不同的表格
        companyType1:true,
        companyType2:true,
        companyType3:false,
        companyType4:false,
        companyType5:false,
        url: 'http://admin.iguolao.com/public/uploads/20200401101351443.jpg',
        srcList: [
          'http://admin.iguolao.com/public/uploads/20200401101351443.jpg'
        ],
        url2: 'https://admin.iguolao.com/public/uploads/20200426143602310.png',
        srcList2: [
          'https://admin.iguolao.com/public/uploads/20200426143602310.png'
        ],
        // 三级联动联系地址
        // mapJson:'../../../static/json/map.json',
        // province:'',
        // sheng: '',
        // shi: '',
        // shi1: [],
        // qu: '',
        // qu1: [],
        // city:'',
        // block:'',
        // a:'',
        // b:'',
        // c:'',
        // 上传图片加域名
        idimg1:'',
        idimg2:'',
        idimg3:'',
        idimg4:'',
        idimg5:'',
        // 上传图片不加域名
        idimg_ming1:'',
        idimg_ming2:'',
        idimg_ming3:'',
        idimg_ming5:'',
        // 表单
        representative:'',
        representativeTip:'',
        name:'',
        nameTip:'',
        companychineseName:'',
        companychineseNameTip:'',
        companyenglishName:'',
        companyenglishNameTip:'',
        companyCode:'',
        companyCodeTip:'',
        mobile:'',
        mobileTip:'',
        fixPhone:'',
        // linkDetail:'',
        // linkDetailTip:'',
        registerchineseAddress:'',
        registerchineseAddressTip:'',
        registerenglishAddress:'',
        registerenglishAddressTip:'',
        registerpostCode:'',
        registerpostCodeTip:'',
        idnum:'',
        idnumTip:'',
        idAddress:'',
        idAddressTip:'',
        idimgTip:'',
        licenseimgTip:'',
        licenseimgTip2:'',
        licenseenglishimgTip:'',
        job:'',
        // 根据状态显示不同的操作
        status1:true,
        status2:false,

        // 抓取公司名字
        companyarr:[],
        companyshow:false,
        imgshow:false,

        // 营业执照信息
        person:'',
        reg_num:'',
        address:'',
        // 输入公司名称判断是否认证
        ifshow:false
      }
  },
  watch:{
    // 'representative'(newValue){
    //       if(newValue == ""){
    //           return this.representativeTip='请输入法定代表人姓名';
    //       }
    //       this.representativeTip= ""
    //   },
    //   'name'(newValue){
    //       if(newValue == ""){
    //           return this.nameTip='请输入联系人姓名';
    //       }
    //       this.nameTip= ""
    //   },
      'companychineseName'(newValue){
          if(newValue == ""){
              this.companyshow = false;
              return this.companychineseNameTip='请输入企业名称';
          }else{
            this.companyshow = true;
            for(var i =0;i<this.companyarr.length;i++){
              if(this.companyarr[i] == newValue){
                this.companyshow = false;
              }
            }
            // if(this.$route.query.id){
            //   this.companyshow = false;
            // }
            delay(() => {
                this.fetchData();
            }, 200);
          }
          this.companychineseNameTip= ""
      },
      // 'companyenglishName'(newValue){
      //     if(newValue == ""){
      //         return this.companyenglishNameTip='请输入公司(英文)全称';
      //     }
      //     this.companyenglishNameTip= ""
      // },
      // 'companyCode'(newValue){
      //     if(newValue == ""){
      //         return this.companyCodeTip='请输入公司统一社会信用码';
      //     }
      //     this.companyCodeTip= ""
      // },
      "mobile"(newValue){
          let reg=/^[1][3,4,5,7,8][0-9]{9}$/;
          if(newValue ==''){
              return this.mobileTip='请输入手机号码';
          }
          if(newValue.length!=11||!reg.test(newValue)){
              return this.mobileTip='手机号格式不正确';
          }
          return this.mobileTip='';
      },
      // 'registerchineseAddress'(newValue){
      //     if(newValue == ""){
      //         return this.registerchineseAddressTip='请输入公司注册地址(中文)';
      //     }
      //     this.registerchineseAddressTip= ""
      // },
      // 'registerenglishAddress'(newValue){
      //     if(newValue == ""){
      //         return this.registerenglishAddressTip='请输入公司注册地址(英文)';
      //     }
      //     this.registerenglishAddressTip= ""
      // },
      // 'registerpostCode'(newValue){
      //     if(newValue == ""){
      //         return this.registerpostCodeTip='请输入注册地址邮编';
      //     }
      //     this.registerpostCodeTip= ""
      // },
      // 'idAddress'(newValue){
      //     if(newValue == ""){
      //         return this.idAddressTip='请输入身份证地址';
      //     }
      //     this.idAddressTip= ""
      // },
      "idnum"(newValue){
            let reg=/(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
            if(newValue ==''){
                return this.idnumTip='请输入身份证号码';
            }
            if(!reg.test(newValue)){
                return this.idnumTip='身份证号码格式不正确';
            }
            return this.idnumTip='';
        },
      // 'a'(newValue){
      //     if(newValue == ""){
      //         return this.linkDetailTip='请输入注册地址城市';
      //     }
      //     this.linkDetailTip= ""
      // },
      // 'linkDetail'(newValue){
      //     if(newValue == ""){
      //         return this.linkDetailTip='请输入详细注册地址';
      //     }
      //     this.linkDetailTip= ""
      // },
        'idimg1'(newValue){
            if(newValue == ""){
                return this.idimgTip='请上传身份证照片';
            }
            this.idimgTip= ""
        },
        // 'idimg2'(newValue){
        //     if(newValue == ""){
        //         return this.idimgTip='请上传身份证反面照片';
        //     }
        //     this.idimgTip= ""
        // },
        'idimg3'(newValue){
            if(newValue == ""){
                return this.licenseimgTip='请上传营业执照照片';
            }
            this.licenseimgTip= ""
        },
        'idimg4'(newValue){
            if(newValue == ""){
                return this.licenseenglishimgTip='请上传营业执照中英文翻译件照片';
            }
            this.licenseenglishimgTip= ""
        },
        'idimg5'(newValue){
            if(newValue == ""){
                return this.licenseimgTip2='请上传营业执照照片';
            }
            this.licenseimgTip2= ""
        },
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
      showexample(){
        this.imgshow = true;
      },
      cha(){
        this.imgshow = false;
      },
      // 抓取企业名称
      async fetchData(val) {
				this.$http.get(this.GLOBAL.base_url+'/api/authentication/findcom?company_name='+this.companychineseName).then(res=>{
          // console.log(res);
          if(res.data.code == "1"){
            this.companyarr = res.data.data;
          }
        })
      },
      lose(){
        setTimeout(() => {
               this.companyshow = false;
          }, 1000);
          if(this.companychineseName != ''&&this.$route.query.id == undefined){
            this.$http.post(this.GLOBAL.base_url+'/api/authentication/businessRegist',{
              user_id:this.$cookie.getCookie('u_id'),
              company_name:this.companychineseName
            }).then(res=>{
                // console.log(res)
                if(res.data.code == "0"){
                  this.ifshow = true
                }else{
                  this.ifshow = false
                }
              });
          }

      },
      addname(val){
        this.companychineseName = val;
        this.lose()
      },
      companyquit1(){
        if(this.$route.query.submitData == "0"){
              this.$router.go(-1);
          }else if(this.$route.query.checkorder == "0"){
            this.$router.go(-1);
          }else{
            this.$router.push('/personal/companyComfire');
          }
      },
      companyquit2(){
          this.$router.push('/personal/companyComfire')
      },
      choseCompany(){
        if(this.serial == "1"){
          this.companyType1=true;
          this.companyType2=true;
          this.companyType3=false;
          this.companyType4=false;
          this.companyType5=false;
        }if(this.serial == "2"){
          this.companyType1=false;
          this.companyType2=true;
          this.companyType3=true;
          this.companyType4=false;
          this.companyType5=false;
        }if(this.serial == "3"){
          this.companyType1=false;
          this.companyType2=false;
          this.companyType3=true;
          this.companyType4=true;
          this.companyType5=false;
        }if(this.serial == "4"){
          this.companyType1=false;
          this.companyType2=false;
          this.companyType3=true;
          this.companyType4=false;
          this.companyType5=false;
        }if(this.serial == "5"){
          this.companyType1=false;
          this.companyType2=false;
          this.companyType3=true;
          this.companyType4=true;
          this.companyType5=true;
        }
      },
      uploadid1(img){
        let formData=new FormData();
            formData.append('pic',img.file);
            this.$http.post(this.GLOBAL.base_url+'/api/authentication/upload_card',formData).then(res=>{
              if(res.data.code == "1"){
                this.idimg_ming1 = res.data.data;
                this.idimg1 = this.GLOBAL.base_url+ res.data.data;
              }
            });
      },
      uploadid2(img){
        let formData=new FormData();
            formData.append('pic',img.file);
            this.$http.post(this.GLOBAL.base_url+'/api/authentication/upload_card',formData).then(res=>{
              if(res.data.code == "1"){
                this.idimg_ming2 = res.data.data;
                this.idimg2 =this.GLOBAL.base_url+ res.data.data;
              }
            });
      },
      uploadid3(img){
        let formData=new FormData();
            formData.append('pic',img.file);
            this.$http.post(this.GLOBAL.base_url+'/app/checklicense',formData).then(res=>{
              // console.log(res)
              if(res.data.others == "1"){
                this.idimg_ming3 = res.data.data.business_license;
                this.idimg3 = this.GLOBAL.base_url+ res.data.data.business_license;
                this.person = res.data.data.person;
                this.reg_num = res.data.data.reg_num;
                this.address = res.data.data.address;
              }else{
                this.tip('error',res.data.msg)
              }
            });
      },
      uploadid4(img){
        let formData=new FormData();
            formData.append('pic',img.file);
            this.$http.post(this.GLOBAL.base_url+'/api/authentication/upload_card',formData).then(res=>{
              if(res.data.code == "1"){
                this.idimg_ming4 = res.data.data;
                this.idimg4 = this.GLOBAL.base_url+ res.data.data;
              }
            });
      },
      uploadid5(img){
        let formData=new FormData();
            formData.append('pic',img.file);
            this.$http.post(this.GLOBAL.base_url+'/api/authentication/upload_card',formData).then(res=>{
              if(res.data.code == "1"){
                this.idimg_ming5 = res.data.data;
                this.idimg5 = this.GLOBAL.base_url+ res.data.data;
              }
            });
      },
      companysend(){
        // console.log(shi)
        if(this.serial == "1"){
          if(this.companychineseName == ''){
            this.companychineseNameTip = "请输入企业名称"
            return false
          }else if(this.mobile==''){
              this.mobileTip = "请输入手机号码"
              return false
          }else if(this.mobileTip=='手机号格式不正确'){
              return false
            }else if(this.idnum==''){
              this.idnumTip = "请输入身份证号码"
              return false
          }else if(this.idnumTip=='身份证号码格式不正确'){
              return false
            }else if(this.idimg1 == ''){
              this.idimgTip = '请上传身份证照片'
              return false
            }else if(this.idimg5 == ''){
            this.licenseimgTip2 = "请上传营业执照照片"
            return false
          }else{
            const loading = this.$loading({
              lock: true,
              text: '提交中',
              spinner: 'el-icon-loading',
              background: 'rgba(0, 0, 0, 0.3)'
            });
            this.$http.post(this.GLOBAL.base_url+'/api/authentication/addbusiness',{
                type:this.serial,
                user_id:this.$cookie.getCookie('u_id'),
                referee:this.representative,
                idcard_num:this.idnum,
                mobile:this.mobile,
                company_name:this.companychineseName,
                zip_code:this.registerpostCode,
                card_address:this.idAddress,
                pic:this.idimg_ming1,
                // contact_address_pro:this.a,
                // contact_address_city:shi,
                // contact_address_area:qu,
                // add_detail_address:this.linkDetail,
                pic_reverse:this.idimg_ming2,
                business_license:this.idimg_ming5,
                person:this.person,
                reg_num:this.reg_num,
                address:this.address,
                position:this.job
              }).then(res=>{
                if(res.data.code=="1"){
                  loading.close();
                  this.tip('success',res.data.msg);
                  if(this.$route.query.submitData == "0"){
                     this.$router.go(-1);
                  }else if(this.$route.query.checkorder == "0"){
                    this.$router.go(-1);
                  }else{
                    this.$router.push('/personal/companyComfire');
                  }
                }else{
                  loading.close();
                  this.tip('error',res.data.msg);
                }
              })
          }
        }
        if(this.serial=="2"){
         if(this.companychineseName == ''){
            this.companychineseNameTip = "请输入企业名称"
            return false
          }else if(this.mobile == ''){
            this.mobileTip = "请输入手机号码"
            return false
          }else if(this.mobileTip=='手机号格式不正确'){
              return false
            }else if(this.idimg3 == ''){
            this.licenseimgTip = "上传营业执照照片"
            return false
          }else{
            const loading = this.$loading({
              lock: true,
              text: '提交中',
              spinner: 'el-icon-loading',
              background: 'rgba(0, 0, 0, 0.3)'
            });
            this.$http.post(this.GLOBAL.base_url+'/api/authentication/addbusiness',{
                type:this.serial,
                user_id:this.$cookie.getCookie('u_id'),
                referee:this.name,
                company_name:this.companychineseName,
                mobile:this.mobile,
                license_num:this.companyCode,
                landline:this.fixPhone,
                zip_code:this.registerpostCode,
                card_address:this.registerchineseAddress,
                business_license:this.idimg_ming3,
                // contact_address_pro:this.a,
                // contact_address_city:shi,
                // contact_address_area:qu,
                // add_detail_address:this.linkDetail,
                person:this.person,
                reg_num:this.reg_num,
                address:this.address,
                position:this.job
              }).then(res=>{
                if(res.data.code=="1"){
                  loading.close();
                  this.tip('success',res.data.msg);
                  if(this.$route.query.submitData == "0"){
                      this.$router.go(-1);
                  }else if(this.$route.query.checkorder == "0"){
                    this.$router.go(-1);
                  }else{
                    this.$router.push('/personal/companyComfire');
                  }
                }else{
                  loading.close();
                  this.tip('error',res.data.msg);
                }
              })
          }
        }
        if(this.serial == "3"){
          if(this.companychineseName == ''){
            this.companychineseNameTip = "请输入企业名称"
            return false
          }else if(this.mobile == ''){
            this.mobileTip = "请输入手机号码"
            return false
          }else if(this.mobileTip=='手机号格式不正确'){
              return false
            }else if(this.idimg3 == ''){
            this.licenseimgTip = "上传营业执照照片"
            return false
          }else{
            const loading = this.$loading({
              lock: true,
              text: '提交中',
              spinner: 'el-icon-loading',
              background: 'rgba(0, 0, 0, 0.3)'
            });
            this.$http.post(this.GLOBAL.base_url+'/api/authentication/addbusiness',{
                type:this.serial,
                user_id:this.$cookie.getCookie('u_id'),
                referee:this.name,
                company_name:this.companychineseName,
                company_english:this.companyenglishName,
                mobile:this.mobile,
                license_num:this.companyCode,
                landline:this.fixPhone,
                card_address:this.registerchineseAddress,
                english_address:this.registerenglishAddress,
                business_license:this.idimg_ming3,
                // contact_address_pro:this.a,
                // contact_address_city:shi,
                // contact_address_area:qu,
                // add_detail_address:this.linkDetail,
                person:this.person,
                reg_num:this.reg_num,
                address:this.address,
                position:this.job
              }).then(res=>{
                if(res.data.code=="1"){
                  loading.close();
                  this.tip('success',res.data.msg);
                  if(this.$route.query.submitData == "0"){
                      this.$router.go(-1);
                  }else if(this.$route.query.checkorder == "0"){
                    this.$router.go(-1);
                  }else{
                    this.$router.push('/personal/companyComfire');
                  }
                }else{
                  loading.close();
                  this.tip('error',res.data.msg);
                }
              })
          }
        }
        if(this.serial == "4"){
         if(this.companychineseName == ''){
            this.companychineseNameTip = "请输入企业名称"
            return false
          }else if(this.mobile == ''){
            this.mobileTip = "请输入手机号码"
            return false
          }else if(this.mobileTip=='手机号格式不正确'){
              return false
            }else if(this.idimg3 == ''){
            this.licenseimgTip = "上传营业执照照片"
            return false
          }else{
            const loading = this.$loading({
              lock: true,
              text: '提交中',
              spinner: 'el-icon-loading',
              background: 'rgba(0, 0, 0, 0.3)'
            });
            this.$http.post(this.GLOBAL.base_url+'/api/authentication/addbusiness',{
                type:this.serial,
                user_id:this.$cookie.getCookie('u_id'),
                referee:this.name,
                company_name:this.companychineseName,
                mobile:this.mobile,
                license_num:this.companyCode,
                landline:this.fixPhone,
                card_address:this.registerchineseAddress,
                business_license:this.idimg_ming3,
                person:this.person,
                // contact_address_pro:this.a,
                // contact_address_city:shi,
                // contact_address_area:qu,
                // add_detail_address:this.linkDetail,
                reg_num:this.reg_num,
                address:this.address,
                position:this.job
              }).then(res=>{
                if(res.data.code=="1"){
                  loading.close();
                  this.tip('success',res.data.msg);
                 if(this.$route.query.submitData == "0"){
                      this.$router.go(-1);
                  }else if(this.$route.query.checkorder == "0"){
                    this.$router.go(-1);
                  }else{
                    this.$router.push('/personal/companyComfire');
                  }
                }else{
                  loading.close();
                  this.tip('error',res.data.msg);
                }
              })
          }
        }
        if(this.serial == "5"){
          if(this.companychineseName == ''){
            this.companychineseNameTip = "请输入企业名称"
            return false
          }else if(this.mobile == ''){
            this.mobileTip = "请输入手机号码"
            return false
          }else if(this.mobileTip=='手机号格式不正确'){
              return false
            }else if(this.idimg3 == ''){
            this.licenseimgTip = "上传营业执照照片"
            return false
          }else if(this.idimg4 == ''){
            this.licenseenglishimgTip = "请上传营业执照中英文翻译件照片"
            return false
          }else{
            const loading = this.$loading({
              lock: true,
              text: '提交中',
              spinner: 'el-icon-loading',
              background: 'rgba(0, 0, 0, 0.3)'
            });
            this.$http.post(this.GLOBAL.base_url+'/api/authentication/addbusiness',{
                type:this.serial,
                user_id:this.$cookie.getCookie('u_id'),
                referee:this.name,
                company_name:this.companychineseName,
                company_english:this.companyenglishName,
                mobile:this.mobile,
                license_num:this.companyCode,
                landline:this.fixPhone,
                card_address:this.registerchineseAddress,
                english_address:this.registerenglishAddress,
                business_license:this.idimg_ming3,
                english_license:this.idimg_ming4,
                person:this.person,
                // contact_address_pro:this.a,
                // contact_address_city:shi,
                // contact_address_area:qu,
                // add_detail_address:this.linkDetail,
                reg_num:this.reg_num,
                address:this.address,
                position:this.job
              }).then(res=>{
                if(res.data.code=="1"){
                  loading.close();
                  this.tip('success',res.data.msg);
                  if(this.$route.query.submitData == "0"){
                      this.$router.go(-1);
                  }else if(this.$route.query.checkorder == "0"){
                    this.$router.go(-1);
                  }else{
                    this.$router.push('/personal/companyComfire');
                  }
                }else{
                  loading.close();
                  this.tip('error',res.data.msg);
                }
              })
          }
        }
      },
      getData(){
        this.$http.get(this.GLOBAL.base_url+'/api/authentication/editbusiness',{params:{
          id:this.$route.query.id
        }}).then(res=>{
          // console.log(res)
          if(res.data.code=="1"){
            this.serial = String(res.data.data.type);
            this.mobile=res.data.data.mobile;
            this.job=res.data.data.position;
            // this.sheng=res.data.data.contact_address_pro;
            // this.a = res.data.data.contact_address_pro;
            // this.shi=res.data.data.contact_address_city;
            // this.qu=res.data.data.contact_address_area;
            // this.linkDetail = res.data.data.add_detail_address;
            if(this.serial == "1"){
              this.companyType1=true;
              this.companyType2=true;
              this.companyType3=false;
              this.companyType4=false;
              this.companyType5=false;
              this.representative = res.data.data.referee;
              this.registerpostCode = res.data.data.zip_code;
              this.companychineseName = res.data.data.company_name;
              this.idnum=res.data.data.idcard_num;
              this.idAddress = res.data.data.card_address;
              if(res.data.data.pic != ''&&res.data.data.pic!=null){
                this.idimg_ming1 = res.data.data.pic;
                this.idimg1 = this.GLOBAL.base_url+res.data.data.pic;
              }
              if(res.data.data.pic_reverse!=''&&res.data.data.pic_reverse!=null){
                this.idimg_ming2 = res.data.data.pic_reverse;
                this.idimg2 = this.GLOBAL.base_url+res.data.data.pic_reverse;
              }
              if(res.data.data.business_license!=''&&res.data.data.business_license!=null){
                this.idimg_ming5 = res.data.data.business_license;
                this.idimg5 = this.GLOBAL.base_url+res.data.data.business_license;
              }

            }else if(this.serial == "2"){
              this.companyType1=false;
              this.companyType2=true;
              this.companyType3=true;
              this.companyType4=false;
              this.companyType5=false;
              this.name=res.data.data.referee;
              this.companychineseName=res.data.data.company_name;
              this.companyCode=res.data.data.license_num;
              this.fixPhone=res.data.data.landline;
              this.registerpostCode=res.data.data.zip_code;
              this.registerchineseAddress=res.data.data.card_address;
              if(res.data.data.business_license!=''&&res.data.data.business_license!=null){
                this.idimg_ming3 = res.data.data.business_license;
                this.idimg3 = this.GLOBAL.base_url+res.data.data.business_license;
              }
            }else if(this.serial == "3"){
              this.companyType1=false;
              this.companyType2=false;
              this.companyType3=true;
              this.companyType4=true;
              this.companyType5=false;
              this.name=res.data.data.referee;
              this.companychineseName=res.data.data.company_name;
              this.companyenglishName=res.data.data.company_english;
              this.companyCode=res.data.data.license_num;
              this.fixPhone=res.data.data.landline;
              this.registerchineseAddress=res.data.data.card_address;
              this.registerenglishAddress=res.data.data.english_address;
              if(res.data.data.business_license!=''&&res.data.data.business_license!=null){
                this.idimg_ming3 = res.data.data.business_license;
                this.idimg3 = this.GLOBAL.base_url+res.data.data.business_license;
              }
            }else if(this.serial == "4"){
              this.companyType1=false;
              this.companyType2=false;
              this.companyType3=true;
              this.companyType4=false;
              this.companyType5=false;
              this.name=res.data.data.referee;
              this.companychineseName=res.data.data.company_name;
              this.companyCode=res.data.data.license_num;
              this.fixPhone=res.data.data.landline;
              this.registerchineseAddress=res.data.data.card_address;
              if(res.data.data.business_license!=''&&res.data.data.business_license!=null){
                this.idimg_ming3 = res.data.data.business_license;
                this.idimg3 = this.GLOBAL.base_url+res.data.data.business_license;
              }
            }else if(this.serial == "5"){
              this.companyType1=false;
              this.companyType2=false;
              this.companyType3=true;
              this.companyType4=true;
              this.companyType5=true;
              this.name=res.data.data.referee;
              this.companychineseName=res.data.data.company_name;
              this.companyenglishName=res.data.data.company_english;
              this.companyCode=res.data.data.license_num;
              this.fixPhone=res.data.data.landline;
              this.registerchineseAddress=res.data.data.card_address;
              this.registerenglishAddress=res.data.data.english_address;
              if(res.data.data.business_license!=''&&res.data.data.business_license!=null){
                this.idimg_ming3 = res.data.data.business_license;
                this.idimg3 = this.GLOBAL.base_url+res.data.data.business_license;
              }
              if(res.data.data.english_license!=''&&res.data.data.english_license!=null){
                this.idimg_ming4=res.data.data.english_license;
                this.idimg4=this.GLOBAL.base_url+res.data.data.english_license;
              }
            }
            if(res.data.data.status == 1 || res.data.data.status == 3){
              this.status1 = false;
              this.status2 = true;
            }else{
              this.status1 = false;
              this.status2 = false;
            }
          }
        })
      },
      companyedit(){
        if(this.serial == "1"){
         if(this.companychineseName == ''){
            this.companychineseNameTip = "请输入企业名称"
            return false
          }else if(this.mobile==''){
              this.mobileTip = "请输入手机号码"
              return false
          }else if(this.mobileTip=='手机号格式不正确'){
              return false
            }else if(this.idnum==''){
              this.idnumTip = "请输入身份证号码"
              return false
          }else if(this.idnumTip=='身份证号码格式不正确'){
              return false
            }else if(this.idimg1 == ''){
            this.idimgTip = "请上传身份证照片"
            return false
          }else if(this.idimg5 == ''){
            this.licenseimgTip2 = "请上传营业执照照片"
            return false
          }else{
            this.$http.post(this.GLOBAL.base_url+'/api/authentication/updatebusiness',{
                id:this.$route.query.id,
                user_id:this.$cookie.getCookie('u_id'),
                type:this.serial,
                referee:this.representative,
                idcard_num:this.idnum,
                //  contact_address_pro:this.a,
                // contact_address_city:shi,
                // contact_address_area:qu,
                // add_detail_address:this.linkDetail,
                mobile:this.mobile,
                company_name:this.companychineseName,
                zip_code:this.registerpostCode,
                card_address:this.idAddress,
                pic:this.idimg_ming1,
                pic_reverse:this.idimg_ming2,
                business_license:this.idimg_ming5,
                person:this.person,
                reg_num:this.reg_num,
                address:this.address,
                position:this.job
              }).then(res=>{
                if(res.data.code=="1"){
                  this.tip('success',res.data.msg);
                  this.$router.push('/personal/companyComfire');
                }else{
                  this.tip('error',res.data.msg);
                }
              })
          }
        }
        if(this.serial=="2"){
          if(this.companychineseName == ''){
            this.companychineseNameTip = "请输入企业名称"
            return false
          }else if(this.mobile == ''){
            this.mobileTip = "请输入手机号码"
            return false
          }else if(this.mobileTip=='手机号格式不正确'){
              return false
            }else if(this.idimg3 == ''){
            this.licenseimgTip = "上传营业执照照片"
            return false
          }else{
            this.$http.post(this.GLOBAL.base_url+'/api/authentication/updatebusiness',{
                type:this.serial,
                id:this.$route.query.id,
                user_id:this.$cookie.getCookie('u_id'),
                referee:this.name,
                company_name:this.companychineseName,
                mobile:this.mobile,
                license_num:this.companyCode,
                landline:this.fixPhone,
                // contact_address_pro:this.a,
                // contact_address_city:shi,
                // contact_address_area:qu,
                // add_detail_address:this.linkDetail,
                zip_code:this.registerpostCode,
                card_address:this.registerchineseAddress,
                business_license:this.idimg_ming3,
                person:this.person,
                reg_num:this.reg_num,
                address:this.address,
                position:this.job
              }).then(res=>{
                if(res.data.code=="1"){
                  this.tip('success',res.data.msg);
                  this.$router.push('/personal/companyComfire');
                }else{
                  this.tip('error',res.data.msg);
                }
              })
          }
        }
        if(this.serial == "3"){
          if(this.companychineseName == ''){
            this.companychineseNameTip = "请输入企业名称"
            return false
          }else if(this.mobile == ''){
            this.mobileTip = "请输入手机号码"
            return false
          }else if(this.mobileTip=='手机号格式不正确'){
              return false
            }else if(this.idimg3 == ''){
            this.licenseimgTip = "上传营业执照照片"
            return false
          }else{
            this.$http.post(this.GLOBAL.base_url+'/api/authentication/updatebusiness',{
                id:this.$route.query.id,
                user_id:this.$cookie.getCookie('u_id'),
                type:this.serial,
                referee:this.name,
                company_name:this.companychineseName,
                company_english:this.companyenglishName,
                mobile:this.mobile,
                license_num:this.companyCode,
                landline:this.fixPhone,
                // contact_address_pro:this.a,
                // contact_address_city:shi,
                // contact_address_area:qu,
                // add_detail_address:this.linkDetail,
                card_address:this.registerchineseAddress,
                english_address:this.registerenglishAddress,
                business_license:this.idimg_ming3,
                person:this.person,
                reg_num:this.reg_num,
                address:this.address,
                position:this.job
              }).then(res=>{
                if(res.data.code=="1"){
                  this.tip('success',res.data.msg);
                  this.$router.push('/personal/companyComfire');
                }else{
                  this.tip('error',res.data.msg);
                }
              })
          }
        }
        if(this.serial == "4"){
          if(this.companychineseName == ''){
            this.companychineseNameTip = "请输入企业名称"
            return false
          }else if(this.mobile == ''){
            this.mobileTip = "请输入手机号码"
            return false
          }else if(this.mobileTip=='手机号格式不正确'){
              return false
            }else if(this.idimg3 == ''){
            this.licenseimgTip = "上传营业执照照片"
            return false
          }else{
            this.$http.post(this.GLOBAL.base_url+'/api/authentication/updatebusiness',{
                type:this.serial,
                id:this.$route.query.id,
                user_id:this.$cookie.getCookie('u_id'),
                referee:this.name,
                company_name:this.companychineseName,
                mobile:this.mobile,
                license_num:this.companyCode,
                landline:this.fixPhone,
                card_address:this.registerchineseAddress,
                business_license:this.idimg_ming3,
                person:this.person,
                // contact_address_pro:this.a,
                // contact_address_city:shi,
                // contact_address_area:qu,
                // add_detail_address:this.linkDetail,
                reg_num:this.reg_num,
                address:this.address,
                position:this.job
              }).then(res=>{
                if(res.data.code=="1"){
                  this.tip('success',res.data.msg);
                  this.$router.push('/personal/companyComfire');
                }else{
                  this.tip('error',res.data.msg);
                }
              })
          }
        }
        if(this.serial == "5"){
          if(this.companychineseName == ''){
            this.companychineseNameTip = "请输入企业名称"
            return false
          }else if(this.mobile == ''){
            this.mobileTip = "请输入手机号码"
            return false
          }else if(this.mobileTip=='手机号格式不正确'){
              return false
            }else if(this.idimg3 == ''){
            this.licenseimgTip = "上传营业执照照片"
            return false
          }else if(this.idimg4 == ''){
            this.licenseenglishimgTip = "请上传营业执照中英文翻译件照片"
            return false
          }else{
            this.$http.post(this.GLOBAL.base_url+'/api/authentication/updatebusiness',{
                type:this.serial,
                id:this.$route.query.id,
                user_id:this.$cookie.getCookie('u_id'),
                referee:this.name,
                company_name:this.companychineseName,
                company_english:this.companyenglishName,
                mobile:this.mobile,
                license_num:this.companyCode,
                landline:this.fixPhone,
                card_address:this.registerchineseAddress,
                english_address:this.registerenglishAddress,
                business_license:this.idimg_ming3,
                english_license:this.idimg_ming4,
                person:this.person,
                // contact_address_pro:this.a,
                // contact_address_city:shi,
                // contact_address_area:qu,
                // add_detail_address:this.linkDetail,
                reg_num:this.reg_num,
                address:this.address,
                position:this.job
              }).then(res=>{
                if(res.data.code=="1"){
                  this.tip('success',res.data.msg);
                  this.$router.push('/personal/companyComfire');
                }else{
                  this.tip('error',res.data.msg);
                }
              })
          }
        }
      }
  },
    mounted:function(){
      if(this.$route.query.id){
        this.getData();
      }
    },
  components: {
  }
}

</script>

<style scoped>
  .companyComfire-box-form{
    width: 1015px;
    float: left;
    margin: 12px 0 0 16px;
    /* border-top:1px solid #d8d8d8; */
    background-color: #fff;
    padding-top: 32px;
    min-height: 950px;
    box-sizing: border-box;
  }
  .companyComfire-box-form>div{
    margin:0 0 24px 64px;
  }
  #companyComfire-box-form-type{
    margin-top: 13px;
  }
  #companyComfire-box-form-type>img{
    margin-right: 32px;
    vertical-align: middle;
  }
  #companyComfire-box-form-type>span{
    vertical-align: middle;
    font-family: "PingFangSC";
    font-size: 14px;
    color: #333333;
    margin-right: 16px;
  }
  .company-msg{
    height: 32px;
    color: red;
    font-size: 12px;
    line-height: 32px;
    margin-left: 78px;
  }
  .company-msg2{
    height: 32px;
    color: red;
    font-size: 12px;
    line-height: 32px;
    margin-left: 305px;
  }
  .companyComfire-box-form-wrap {
    width: 450px;
  }
  .companyComfire-box-form-wrap>div>input{
    width: 300px;
    height: 32px;
    font-family: "PingFangSC";
    font-size: 14px;
    padding-left: 15px;
    outline: none;
    border-radius: 4px;
    border: solid 1px #d6d6d6;
    box-sizing: border-box;
  }
  .companyComfire-box-form-wrap>div>span{
    vertical-align: middle;
    font-family: "PingFangSC";
    font-size: 14px;
    color: #333333;
  }
  .companyComfire-box-form-wrap>div>img{
    vertical-align: middle;
  }
  #companyComfire-box-form-wrap-companyCode>input{
    width: 280px;
  }
  .companyComfire-box-form-type-select{
    vertical-align: middle;
    width: 300px;
    height: 40px;
  }
   .companyComfire-box-form-type-selectaddress{
    margin-left:150px;
    width: 300px;
    height: 40px;
  }
  .companyComfire-box-form-wrap-detailaddress>input{
    margin-left:150px;
  }
  .companyComfire-box-form-wrap-representative>span,.companyComfire-box-form-wrap-linkname>span{
    margin: 0 16px 0 14px;
  }
  .companyComfire-box-form-wrap-postcode>span{
    margin-right: 14px;
  }
  .companyComfire-box-form-wrap-chineseCompanyname{
    position: relative;
  }
  .catch{
    width: 300px;
    border:1px solid #d6d6d6;
    border-top: none;
    position: absolute;
    z-index: 10;
    top:32px;
    background: #ffffff;
    height: 300px;
    overflow-y: auto;
    left: 77px;
  }
  .catch::-webkit-scrollbar {
            width: 8px;
            height: 8px;
    }
    .catch::-webkit-scrollbar-thumb {
        border-radius: 5px;
        box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
    }
    .catch::-webkit-scrollbar-track {
            opacity: 0;
    }
  .catch>div{
    color: #333333;
    padding-left: 10px;
    margin-bottom: 10px;
    cursor: pointer;
  }
  .catch>div:hover{
    background-color: #f96006;
  }
  .companyComfire-box-form-wrap-mobile>span,.companyComfire-box-form-wrap-chineseCompanyname>span{
    margin: 0 16px 0 0px;
  }
  .companyComfire-box-form-wrap-job{
    margin-bottom: 32px;
  }
  .companyComfire-box-form-wrap-job>span{
    margin: 0 16px 0 27px;
  }
  .companyComfire-box-form-wrap-chineseCompanyname>span:nth-of-type(2){
    color: red;
    font-size: 16px;
  }
  .companyComfire-box-form-wrap-fixPhone,.companyComfire-box-form-wrap-linkaddress{
    margin-bottom: 32px;
  }
  .companyComfire-box-form-wrap-fixPhone>span{
    margin: 0 16px 0 55px;
  }
  .companyComfire-box-form-type-select{
    vertical-align: middle;
    width: 300px;
    height: 40px;
  }
  .companyComfire-box-form-wrap-idnumber>span,.companyComfire-box-form-wrap-idaddress>span{
    margin: 0 2px 0 0px;
  }
  .companyComfire-box-form-wrap-uploadimg>span{
    margin-left: -14px;
  }
  .companyComfire-box-form-wrap-uploadimg-div{
    /* height: 162px; */
    margin: 0px 74px 0 0px;
    float: right;
    /* width: 400px; */
  }
  #span1{
    color: red;
    font-size: 14px;
  }
  .companyComfire-box-form-wrap-uploadimg-div>div{
    float: left;
    width: 120px;
    height: 120px;
  }
  .companyComfire-box-form-wrap-uploadimg-div>div:nth-of-type(1){
    margin-right: 60px;
  }
  .companyComfire-box-form-wrap-uploadsellimg>span{
    margin-left: -14px;
  }
  .idimg{
    width: 120px;
    height: 120px;
  }
  .companyComfire-box-form-wrap-uploadsellimg {
    margin-bottom: 30px;
  }
  .companyComfire-box-form-wrap-uploadimg {
    margin-bottom: 30px;
  }
  .companyComfire-box-form-wrap-uploadsellimgdiv{
    margin: 0px 258px 0 0px;
    width: 120px;
    height: 120px;
    float: right;
  }
  .companyComfire-box-form-wrap-submit{
    margin: 64px 0 60px 86px;
  }
  .companyComfire-box-form-wrap-submit>img{
    cursor: pointer;
  }
  .companyComfire-box-form-wrap-submit>img:nth-of-type(1){
    margin-right: 36px;
  }
  .example{
    cursor: pointer;
    margin-left: 84px;
    color: #f96006;
    margin-top: 10px;
  }
  .tan{
    background: rgba(0,0,0, 0.8);
    position: fixed;
    z-index: 20;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
}
.example-img{
  width: 600px;
  height: 500px;
  position: absolute;
  top:50%;
  left: 50%;
  transform: translate(-50%,-50%)
}
.cha{
  position: absolute;
  left: 66%;
  top:20%;
  cursor: pointer;
}
.increased {
  font-family: PingFangSC;
  font-size: 12px;
  font-weight: 100;
  color:#f96006;
  margin-left: 78px;
}
.ml0 {
  margin-left: 0px !important;
}
.db {
  display: block;
}
.ml14 {
  margin-left: 0px !important;
}
.mt-38 {
  margin-top: -38px !important;
}
.opeartor-ft {
    float: left;
    width: 80px;
    height: 36px;
    text-align: center;
    line-height: 36px;
     background: url(/static/images/invalid-name1h.png);
    color: #f96006;
    font-family: "PingFangSC";
    font-size: 14px;
    margin-right: 32px;
    cursor: pointer;
  }
  .opeartor-ft1 {
    float: left;
    width: 80px;
    height: 36px;
    text-align: center;
    line-height: 36px;
    background: url(/static/images/invalid-name1f.png);
    color: #fff;
    font-family: "PingFangSC";
    font-size: 14px;
    cursor: pointer;
  }
</style>
<style >
   .el-input__inner {
    height: 32px !important;
    line-height: 32px !important;
    margin-top: 5px !important;
    box-sizing: border-box;
  }
</style>
