<template>
  <div class="personalComfire-container">
    <div class="personalComfire-box-form">
      <div id="personalComfire-box-form-type">
        <!-- 修改前图标 -->
          <!-- <img src="/static/images/star.png" alt=""> -->
          <span>个人类型</span>
          <el-select @change="choseType(value)" v-model="value" class="personalComfire-box-form-type-select">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
      </div>

      <div class="personalComfire-box-form-wrap">
        <div class="personalComfire-box-form-name">
          <!-- <img src="/static/images/star.png" alt=""> -->
          <span>姓名</span>
          <input v-model="chineseName" type="text">
          <div class="form-msg">{{chineseNameTip}}</div>
        </div>

        <!-- <div class="personalComfire-box-form-name" v-show="type3">
          <img src="/static/images/star.png" alt="">
          <span>英文姓名</span>
          <input v-model="englishName" type="text">
          <div class="form-msg">{{englishNameTip}}</div>
        </div> -->

        <div class="personalComfire-box-form-mobile">
          <!-- <img src="/static/images/star.png" alt=""> -->
          <span>手机号码</span>
          <input maxlength="11" v-model="mobile" type="text">
          <div class="form-msg">{{mobileTip}}</div>
        </div>

        <div class="personalComfire-box-form-type-number" v-show="type1">
          <!-- <img src="/static/images/star.png" alt=""> -->
          <span class="mr2">身份证号码</span>
          <input maxlength="18" v-model="idNum" type="text">
          <div class="form-msg">{{idNumTip}}</div>
        </div>

        <!-- <div id="personalComfire-box-form-type-idAddress" v-show="type1">
          <img src="/static/images/star.png" alt="">
          <span>身份证地址</span>
          <input v-model="idAddress" type="text">
          <div class="form-msg">{{idAddressTip}}</div>
        </div> -->
         <!-- <div class="personalComfire-box-form-linkaddress">
          <img src="/static/images/star.png" alt="">
          <span>联系地址</span>
          <el-select v-model="sheng" @change="choseProvince" placeholder="省级地区" class="personalComfire-box-form-type-selectaddress">
            <el-option
              v-for="item in province"
              :key="item.id"
              :label="item.value"
              :value="item.id">
            </el-option>
          </el-select>
        </div>
        <div class="personalComfire-box-form-chose">
          <el-select v-model="shi" @change="choseCity" placeholder="市级地区" class="personalComfire-box-form-type-selectaddress">
            <el-option
              v-for="item in shi1"
              :key="item.id"
              :label="item.value"
              :value="item.id">
            </el-option>
          </el-select>
        </div>
        <div class="personalComfire-box-form-chosequ">
          <el-select v-model="qu" @change="choseBlock" placeholder="区级地区" class="personalComfire-box-form-type-selectaddress">
            <el-option
              v-for="item in qu1"
              :key="item.id"
              :label="item.value"
              :value="item.id">
            </el-option>
          </el-select>
        </div> -->
        <div class="personalComfire-box-form-type-input">
          <span>详细地址</span>
          <input v-model="detailAddress" type="text" placeholder="请输入详细地址">
          <div class="form-msg">{{detailAddressTip}}</div>
        </div>

        <div class="personalComfire-box-form-type-idimg" v-show="type1">
          <!-- <img src="/static/images/star.png" alt=""> -->
          <span>上传身份证照片</span>
          <!-- <span id="span1">(身份证复印件签字后拍照上传,只能上传png或jpg格式)</span> -->
          <div class="personalComfire-box-form-type-idimg-div">
              <div>
                <el-upload
                  accept="image/*"
                  :http-request="uploadid1"
                  :show-file-list="false"
                  action="">
                  <img class="idimg" :src="idimg1?idimg1:'/static/images/please.png'" alt="">
                </el-upload>
              </div>
              <div >
                <el-image
                  style="width: 100px; height: 120px"
                  :src="url"
                  :preview-src-list="srcList">
                </el-image>
                <span style="color:red;margin-left:30px;">示例</span>
              </div>
          </div>
          <div style = "clear: both;"></div>
          <!-- 新增 -->
          <div class="increased">（签字后拍照上传）</div>
          <div class="form-msg">{{idimgTip}}</div>
        </div>

        <!-- <div class="personalComfire-box-form-type-passport" v-show="type2">
          <img src="/static/images/star.png" alt="">
          <span>护照号码</span>
          <input v-model="passportNum" type="text">
          <div class="form-msg">{{passportNumTip}}</div>
        </div> -->

        <!-- <div class="personalComfire-box-form-type-passport-address" v-show="type2">
          <img src="/static/images/star.png" alt="">
          <span>护照地址(中文)</span>
          <input v-model="passportchinaAddress" type="text">
          <div class="form-msg">{{passportchinaAddressTip}}</div>
        </div> -->

        <!-- <div class="personalComfire-box-form-type-passport-address" v-show="type4">
          <img src="/static/images/star.png" alt="">
          <span>护照地址(英文)</span>
          <input v-model="passportenglishAddress" type="text">
          <div class="form-msg">{{passportenglishAddressTip}}</div>
        </div> -->

        <div class="personalComfire-box-form-type-idimg" v-show="type2">
          <!-- <img src="/static/images/star.png" alt=""> -->
          <span class="ml">护照图片</span>
          <!-- <span id="span1">(护照复印件签字后拍照上传,只能上传png或jpg格式)</span> -->
          <div class="personalComfire-box-form-type-idimg-div">
            <div class="mr180">
                <el-upload
                  accept="image/*"
                  :http-request="uploadid3"
                  :show-file-list="false"
                  action="">
                  <img class="idimg" :src="idimg3?idimg3:'/static/images/please.png'" alt="">
                </el-upload>
              </div>
            <!-- <div>
                <el-upload
                  accept="image/*"
                  :http-request="uploadid4"
                  :show-file-list="false"
                  action="">
                  <img class="idimg" :src="idimg4?idimg4:'/static/images/fan.png'" alt="">
              </el-upload>
              </div> -->
          </div>
          <!-- 新增 -->
          <div style = "clear: both;"></div>
          <div class="increased">（签字后拍照上传）</div>
          <div class="form-msg">{{passportimgTip}}</div>
        </div>

        <div class="personalComfire-box-form-type-idimg" v-show="type4">
          <!-- <img src="/static/images/star.png" alt=""> -->
          <span class="ml10">护照翻译件</span>
          <!-- <span id="span1">(只能上传png或jpg格式)</span> -->
          <div class="personalComfire-box-form-type-idimg-div">
            <div class="mr180">
                <el-upload
                  accept="image/*"
                  :http-request="uploadid5"
                  :show-file-list="false"
                  action="">
                  <img class="idimg" :src="idimg5?idimg5:'/static/images/please.png'" alt="">
                </el-upload>
              </div>
          </div>
          <!-- 新增 -->
          <div style = "clear: both;"></div>
          <div class="increased">（签字后拍照上传）</div>
          <div class="form-msg">{{passportenglishimgTip}}</div>
        </div>

        <div class="opeartor" v-show="status1">
          <!-- 修改后 -->
          <div class="opeartor-ft" @click="identquit1">取消</div>
          <div class="opeartor-ft1"  @click="send">提交</div>
          <!-- 修改前 -->
          <!-- <img @click="send" class="personalComfire-box-form-type-submit-img" src="/static/images/submit.png" alt="">
          <img @click="identquit1" src="/static/images/quit.png" alt=""> -->
        </div>
        <div class="opeartor" v-show="status2">
          <div class="opeartor-ft" @click="identquit2">取消</div>
          <div class="opeartor-ft1"  @click="edit">修改</div>
          <!-- <img @click="edit" class="personalComfire-box-form-type-submit-img" src="/static/images/edit.png" alt="">
          <img @click="identquit2" src="/static/images/quit.png" alt=""> -->
        </div>
      </div>
    </div>
    <div style="clear:both;"></div>

  </div>

</template>

<script>
export default {
  name: 'personalForm',
   data() {
      return {
        options: [{
          value: '0',
          label: '国内个人'
        }, {
          value: '1',
          label: '港澳个人'
        }, {
          value: '2',
          label: '台湾个人'
        }, {
          value: '3',
          label: '国外个人'
        }],
        value: '0',
        url: 'http://admin.iguolao.com/public/uploads/20200401101351443.jpg',
        srcList: [
          'http://admin.iguolao.com/public/uploads/20200401101351443.jpg'
        ],
        // 三级联动
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
        // 不同表单数据不同显示隐藏
        type1:true,
        type2:false,
        type3:false,
        type4:false,
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
        idimg_ming4:'',
        idimg_ming5:'',
        // 表单数据
        chineseName:'',
        chineseNameTip:'',
        englishName:'',
        englishNameTip:'',
        mobile:'',
        mobileTip:'',
        detailAddress:'',
        detailAddressTip:'',
        idNum:'',
        idNumTip:'',
        idAddress:'',
        idAddressTip:'',
        idimgTip:'',
        passportNum:'',
        passportNumTip:'',
        passportchinaAddress:'',
        passportchinaAddressTip:'',
        passportenglishAddress:'',
        passportenglishAddressTip:'',
        passportimgTip:'',
        passportenglishimgTip:'',
        // 根据状态显示不同的操作
        status1:true,
        status2:false
      }
    },
  components: {

  },
  watch:{
    'chineseName'(newValue){
                if(newValue == ""){
                   return this.chineseNameTip='请输入姓名';
                }
                this.chineseNameTip= ""
            },
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
        "idNum"(newValue){
            let reg=/(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
            if(newValue ==''){
                return this.idNumTip='请输入身份证号码';
            }
            if(!reg.test(newValue)){
                return this.idNumTip='身份证号码格式不正确';
            }
            return this.idNumTip='';
        },
      // 'englishName'(newValue){
      //     if(newValue == ""){
      //         return this.englishNameTip='请输入英文姓名';
      //     }
      //     this.englishNameTip= ""
      // },
      // 'passportNum'(newValue){
      //       if(newValue == ""){
      //           return this.passportNumTip='请输入护照号码';
      //       }
      //       this.passportNumTip= ""
      //   },
      //   'passportchinaAddress'(newValue){
      //       if(newValue == ""){
      //           return this.passportchinaAddressTip='请输入护照地址中文';
      //       }
      //       this.passportchinaAddressTip= ""
      //   },
      //   'passportenglishAddress'(newValue){
      //       if(newValue == ""){
      //           return this.passportenglishAddressTip='请输入护照地址英文';
      //       }
      //       this.passportenglishAddressTip= ""
      //   },
      //   'idAddress'(newValue){
      //     if(newValue == ""){
      //         return this.idAddressTip='请输入身份证地址';
      //     }
      //     this.idAddressTip= ""
      // },
      // 'a'(newValue){
      //     if(newValue == ""){
      //         return this.detailAddressTip='请输入联系地址城市';
      //     }
      //     this.detailAddressTip= ""
      // },
      'detailAddress'(newValue){
          if(newValue == ""){
              return this.detailAddressTip='请输入详细地址';
          }
          this.detailAddressTip= ""
      },
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
                return this.passportimgTip='请上传护照照片';
            }
            this.passportimgTip= ""
        },
        // 'idimg4'(newValue){
        //     if(newValue == ""){
        //         return this.passportimgTip='请上传护照反面照片';
        //     }
        //     this.passportimgTip= ""
        // },
        'idimg5'(newValue){
            if(newValue == ""){
                return this.passportenglishimgTip='请上传护照中文翻译件图片';
            }
            this.passportenglishimgTip= ""
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
      identquit1(){
        if(this.$route.query.submitData == "0"){
            this.$router.go(-1)
          }else{
            this.$router.push('/personal/personalComfire');
          }
      },
      identquit2(){
        this.$router.push('/personal/personalComfire')
      },
      choseType(){
        if(this.value == "0"){
          this.type1 = true;
          this.type2 = false;
          this.type3 = false;
          this.type4 = false;
        }else if(this.value == "1"){
          this.type1 = false;
          this.type2 = true;
          this.type3 = true;
          this.type4 = false;
        }else if(this.value == "2"){
          this.type1 = false;
          this.type2 = true;
          this.type3 = false;
          this.type4 = false;
        }else if(this.value == "3"){
          this.type1 = false;
          this.type2 = true;
          this.type3 = true;
          this.type4 = true;
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
            this.$http.post(this.GLOBAL.base_url+'/api/authentication/upload_card',formData).then(res=>{
              if(res.data.code == "1"){
                this.idimg_ming3 = res.data.data;
                this.idimg3 = this.GLOBAL.base_url+ res.data.data;
              }
            });
      },
      // uploadid4(img){
      //   let formData=new FormData();
      //       formData.append('pic',img.file);
      //       this.$http.post(this.GLOBAL.base_url+'/authentication/upload_card',formData).then(res=>{
      //         if(res.data.code == "1"){
      //           this.idimg_ming4 = res.data.data;
      //           this.idimg4 = this.GLOBAL.base_url+ res.data.data;
      //         }
      //       });
      // },
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
      send(){
        if(this.value == "0"){
            if(this.chineseName == ''){
              this.chineseNameTip = "请输入姓名"
              return false
            }else if(this.mobile==''){
              this.mobileTip = "请输入手机号码"
              return false
            }else if(this.mobileTip=='手机号格式不正确'){
              return false
            }else if(this.idNum==''){
              this.idNumTip = "请输入身份证号码"
              return false
            }else if(this.idNumTip=='身份证号码格式不正确'){
              return false
            }else if(this.detailAddress == ''){
              this.detailAddressTip = '请输入详细地址'
              return false
            }else if(this.idimg1 == ''){
              this.idimgTip = "请上传身份证照片"
              return false
            }else{
              this.$http.post(this.GLOBAL.base_url+'/api/authentication/addauth',{
                type:this.value,
                user_id:this.$cookie.getCookie('u_id'),
                chinese_name:this.chineseName,
                car_num:this.idNum,
                mobile:this.mobile,
                // contact_address_pro:this.a,
                // contact_address_city:shi,
                // contact_address_area:qu,
                // add_detail_address:this.detailAddress,
                idcard_address:this.detailAddress,
                card_address:this.idAddress,
                idcard_img:this.idimg_ming1,
                idcard_img_reverse:this.idimg_ming2
              }).then(res=>{
                if(res.data.code=="1"){
                  this.tip('success',res.data.msg);
                  if(this.$route.query.submitData == "0"){
                    this.$router.go(-1)
                  }else{
                    this.$router.push('/personal/personalComfire');
                  }
                }else{
                  this.tip('error'.res.data.msg)
                }
              })
            }
        }
        if(this.value == "1"){
            if(this.chineseName == ''){
              this.chineseNameTip = "请输入姓名"
              return false
            }else if(this.mobile==''){
              this.mobileTip = "请输入手机号码"
              return false
            }else if(this.mobileTip=='手机号格式不正确'){
              return false
            }else if(this.detailAddress == ''){
              this.detailAddressTip = '请输入详细地址'
              return false
            }else if(this.idimg3 == ''){
              this.passportimgTip = "请上传护照照片"
              return false
            }else{
              this.$http.post(this.GLOBAL.base_url+'/api/authentication/addauth',{
                type:this.value,
                user_id:this.$cookie.getCookie('u_id'),
                chinese_name:this.chineseName,
                english_name:this.englishName,
                car_num:this.passportNum,
                mobile:this.mobile,
                // contact_address_pro:this.a,
                // contact_address_city:shi,
                // contact_address_area:qu,
                // add_detail_address:this.detailAddress,
                idcard_address:this.detailAddress,
                idcard_img:this.idimg_ming3,
                idcard_img_reverse:this.idimg_ming4,
              }).then(res=>{
                if(res.data.code=="1"){
                  this.tip('success',res.data.msg);
                  if(this.$route.query.submitData == "0"){
                    this.$router.go(-1)
                  }else{
                    this.$router.push('/personal/personalComfire');
                  }
                }else{
                  this.tip('error',res.data.msg)
                }
              })
            }
        }
        if(this.value == "2"){
            if(this.chineseName == ''){
              this.chineseNameTip = "请输入姓名"
              return false
            }else if(this.mobile==''){
              this.mobileTip = "请输入手机号码"
              return false
            }else if(this.mobileTip=='手机号格式不正确'){
              return false
            }else if(this.detailAddress == ''){
              this.detailAddressTip = '请输入详细地址'
              return false
            }else if(this.idimg3 == ''){
              this.passportimgTip = "请上传护照照片"
              return false
            }else{
              this.$http.post(this.GLOBAL.base_url+'/api/authentication/addauth',{
                type:this.value,
                user_id:this.$cookie.getCookie('u_id'),
                chinese_name:this.chineseName,
                car_num:this.passportNum,
                mobile:this.mobile,
                idcard_address:this.detailAddress,
                // contact_address_pro:this.a,
                // contact_address_city:shi,
                // contact_address_area:qu,
                // add_detail_address:this.detailAddress,
                idcard_img:this.idimg_ming3,
                idcard_img_reverse:this.idimg_ming4,
              }).then(res=>{
                if(res.data.code=="1"){
                  this.tip('success',res.data.msg);
                  if(this.$route.query.submitData == "0"){
                    this.$router.go(-1)
                  }else{
                    this.$router.push('/personal/personalComfire');
                  }
                }else{
                  this.tip('error',res.data.msg)
                }
              })
            }
        }
        if(this.value == "3"){
            if(this.chineseName == ''){
              this.chineseNameTip = "请输入姓名"
              return false
            }else if(this.mobile==''){
              this.mobileTip = "请输入手机号码"
              return false
            }else if(this.mobileTip=='手机号格式不正确'){
              return false
            }else if(this.detailAddress == ''){
              this.detailAddressTip = '请输入详细地址'
              return false
            }else if(this.idimg3 == ''){
              this.passportimgTip = "请上传护照照片"
              return false
            }else if(this.idimg5 == ''){
              this.passportenglishimgTip = "请上传护照中文翻译照片"
              return false
            }else{
              this.$http.post(this.GLOBAL.base_url+'/api/authentication/addauth',{
                type:this.value,
                user_id:this.$cookie.getCookie('u_id'),
                chinese_name:this.chineseName,
                english_name:this.englishName,
                car_num:this.passportNum,
                mobile:this.mobile,
                // contact_address_pro:this.a,
                // contact_address_city:shi,
                // contact_address_area:qu,
                // add_detail_address:this.detailAddress,
                idcard_address:this.detailAddress,
                english_address:this.passportenglishAddress,
                idcard_img:this.idimg_ming3,
                idcard_img_reverse:this.idimg_ming4,
                english_img:this.idimg_ming5
              }).then(res=>{
                if(res.data.code=="1"){
                  this.tip('success',res.data.msg);
                  if(this.$route.query.submitData == "0"){
                    this.$router.go(-1)
                  }else{
                    this.$router.push('/personal/personalComfire');
                  }
                }else{
                  this.tip('error',res.data.msg)
                }
              })
            }
        }
      },
      getData(){
        this.$http.get(this.GLOBAL.base_url+'/api/authentication/editauth',{params:{
          id:this.$route.query.id
        }}).then(res=>{
          // console.log(res)
          if(res.data.code == "1"){
            this.value = String(res.data.data.type);
            this.chineseName = res.data.data.chinese_name;
            this.englishName = res.data.data.english_name;
            this.mobile=res.data.data.mobile;
            // this.sheng=res.data.data.contact_address_pro;
            // this.a = res.data.data.contact_address_pro;
            // this.shi=res.data.data.contact_address_city;
            // this.qu=res.data.data.contact_address_area;
            this.detailAddress=res.data.data.idcard_address;
            if(this.value == "0"){
              this.type1 = true;
              this.type2 = false;
              this.type3 = false;
              this.type4 = false;
              this.idNum=res.data.data.car_num;
              this.idAddress=res.data.data.card_address;
              if(res.data.data.idcard_img != ''&&res.data.data.idcard_img!=null){
                this.idimg_ming1 = res.data.data.idcard_img;
                this.idimg1= this.GLOBAL.base_url+ res.data.data.idcard_img;
              }
              if(res.data.data.idcard_img_reverse!=''&&res.data.data.idcard_img_reverse!=null){
                this.idimg_ming2 = res.data.data.idcard_img_reverse;
                this.idimg2= this.GLOBAL.base_url+ res.data.data.idcard_img_reverse;
              }
            }else if(this.value == "1"){
              this.type1 = false;
              this.type2 = true;
              this.type3 = true;
              this.type4 = false;
              this.passportNum= res.data.data.car_num;
              this.passportchinaAddress= res.data.data.idcard_address;
              if(res.data.data.idcard_img!=''&&res.data.data.idcard_img!=null){
                this.idimg_ming3 = res.data.data.idcard_img;
                this.idimg3= this.GLOBAL.base_url+ res.data.data.idcard_img;
              }
              if(res.data.data.idcard_img_reverse!=''&&res.data.data.idcard_img_reverse!=null){
                this.idimg_ming4 = res.data.data.idcard_img_reverse;
                this.idimg4= this.GLOBAL.base_url+ res.data.data.idcard_img_reverse;
              }
            }else if(this.value == "2"){
              this.type1 = false;
              this.type2 = true;
              this.type3 = false;
              this.type4 = false;
              this.passportNum= res.data.data.car_num;
              this.passportchinaAddress= res.data.data.idcard_address;
              if(res.data.data.idcard_img!=''&&res.data.data.idcard_img!=null){
                this.idimg_ming3 = res.data.data.idcard_img;
                this.idimg3= this.GLOBAL.base_url+ res.data.data.idcard_img;
              }
              if(res.data.data.idcard_img_reverse!=''&&res.data.data.idcard_img_reverse!=null){
                this.idimg_ming4 = res.data.data.idcard_img_reverse;
                this.idimg4= this.GLOBAL.base_url+ res.data.data.idcard_img_reverse;
              }
            }else if(this.value == "3"){
              this.type1 = false;
              this.type2 = true;
              this.type3 = true;
              this.type4 = true;
              this.passportNum=res.data.data.car_num;
              this.passportchinaAddress=res.data.data.idcard_address;
              this.passportenglishAddress=res.data.data.english_address;
              if(res.data.data.idcard_img!=''&&res.data.data.idcard_img!=null){
                this.idimg_ming3 = res.data.data.idcard_img;
                this.idimg3= this.GLOBAL.base_url+ res.data.data.idcard_img;
              }
              if(res.data.data.idcard_img_reverse!=''&&res.data.data.idcard_img_reverse!=null){
                this.idimg_ming4 = res.data.data.idcard_img_reverse;
                this.idimg4= this.GLOBAL.base_url+ res.data.data.idcard_img_reverse;
              }
              if(res.data.data.english_img!=''&&res.data.data.english_img!=null){
                this.idimg_ming5 = res.data.data.english_img;
                this.idimg5= this.GLOBAL.base_url+res.data.data.english_img;
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
      edit(){
        if(this.value == "0"){
            if(this.chineseName == ''){
              this.chineseNameTip = "请输入姓名"
              return false
            }else if(this.mobile==''){
              this.mobileTip = "请输入手机号码"
              return false
            }else if(this.mobileTip=='手机号格式不正确'){
              return false
            }else if(this.idNum==''){
              this.idNumTip = "请输入身份证号码"
              return false
            }else if(this.idNumTip=='身份证号码格式不正确'){
              return false
            }else if(this.detailAddress == ''){
              this.detailAddressTip = '请输入详细地址'
              return false
            }else if(this.idimg1 == ''){
              this.idimgTip = "请上传身份证照片"
              return false
            }else{
              this.$http.post(this.GLOBAL.base_url+'/api/authentication/updateauth',{
                id:this.$route.query.id,
                type:this.value,
                chinese_name:this.chineseName,
                car_num:this.idNum,
                mobile:this.mobile,
                card_address:this.idAddress,
                idcard_img:this.idimg_ming1,
                idcard_img_reverse:this.idimg_ming2,
                idcard_address:this.detailAddress
                // contact_address_pro:this.a,
                // contact_address_city:shi,
                // contact_address_area:qu,
                // add_detail_address:this.detailAddress
              }).then(res=>{
                if(res.data.code=="1"){
                  this.tip('success',res.data.msg);
                  this.$router.push('/personal/personalComfire');
                }else{
                  this.tip('error',res.data.msg)
                }
              })
            }
        }
        if(this.value == "1"){
            if(this.chineseName == ''){
              this.chineseNameTip = "请输入姓名"
              return false
            }else if(this.mobile==''){
              this.mobileTip = "请输入手机号码"
              return false
            }else if(this.mobileTip=='手机号格式不正确'){
              return false
            }else if(this.detailAddress == ''){
              this.detailAddressTip = '请输入详细地址'
              return false
            }else if(this.idimg3 == ''){
              this.passportimgTip = "请上传护照照片"
              return false
            }else{
              this.$http.post(this.GLOBAL.base_url+'/api/authentication/updateauth',{
                id:this.$route.query.id,
                type:this.value,
                chinese_name:this.chineseName,
                english_name:this.englishName,
                car_num:this.passportNum,
                mobile:this.mobile,
                idcard_address:this.detailAddress,
                idcard_img:this.idimg_ming3,
                idcard_img_reverse:this.idimg_ming4,
                // contact_address_pro:this.a,
                // contact_address_city:shi,
                // contact_address_area:qu,
                // add_detail_address:this.detailAddress
              }).then(res=>{
                if(res.data.code=="1"){
                  this.tip('success',res.data.msg);
                  this.$router.push('/personal/personalComfire');
                }else{
                  this.tip('error',res.data.msg)
                }
              })
            }
        }
        if(this.value == "2"){
            if(this.chineseName == ''){
              this.chineseNameTip = "请输入姓名"
              return false
            }else if(this.mobile==''){
              this.mobileTip = "请输入手机号码"
              return false
            }else if(this.mobileTip=='手机号格式不正确'){
              return false
            }else if(this.detailAddress == ''){
              this.detailAddressTip = '请输入详细地址'
              return false
            }else if(this.idimg3 == ''){
              this.passportimgTip = "请上传护照照片"
              return false
            }else{
              this.$http.post(this.GLOBAL.base_url+'/api/authentication/updateauth',{
                id:this.$route.query.id,
                type:this.value,
                chinese_name:this.chineseName,
                car_num:this.passportNum,
                mobile:this.mobile,
                idcard_address:this.detailAddress,
                idcard_img:this.idimg_ming3,
                idcard_img_reverse:this.idimg_ming4,
                // contact_address_pro:this.a,
                // contact_address_city:shi,
                // contact_address_area:qu,
                // add_detail_address:this.detailAddress
              }).then(res=>{
                if(res.data.code=="1"){
                  this.tip('success',res.data.msg);
                  this.$router.push('/personal/personalComfire');
                }else{
                  this.tip('error',res.data.msg)
                }
              })
            }
        }
        if(this.value == "3"){
            if(this.chineseName == ''){
              this.chineseNameTip = "请输入姓名"
              return false
            }else if(this.mobile==''){
              this.mobileTip = "请输入手机号码"
              return false
            }else if(this.mobileTip=='手机号格式不正确'){
              return false
            }else if(this.detailAddress == ''){
              this.detailAddressTip = '请输入详细地址'
              return false
            }else if(this.idimg3 == ''){
              this.passportimgTip = "请上传护照照片"
              return false
            }else if(this.idimg5 == ''){
              this.passportenglishimgTip = "请上传护中文翻译照片"
              return false
            }else{
              this.$http.post(this.GLOBAL.base_url+'/api/authentication/updateauth',{
                id:this.$route.query.id,
                type:this.value,
                chinese_name:this.chineseName,
                english_name:this.englishName,
                car_num:this.passportNum,
                mobile:this.mobile,
                idcard_address:this.detailAddress,
                english_address:this.passportenglishAddress,
                idcard_img:this.idimg_ming3,
                idcard_img_reverse:this.idimg_ming4,
                english_img:this.idimg_ming5,
                // contact_address_pro:this.a,
                // contact_address_city:shi,
                // contact_address_area:qu,
                // add_detail_address:this.detailAddress
              }).then(res=>{
                if(res.data.code=="1"){
                  this.tip('success',res.data.msg);
                  this.$router.push('/personal/personalComfire');
                }else{
                  this.tip('error',res.data.msg)
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
    }
}

</script>

<style scoped>
  .personalComfire-box-form{
    width: 1015px;
    float: left;
    margin: 12px 0 0 16px;
    /* border-top:1px solid #d8d8d8; */
    background-color: #fff;
    padding-top: 32px;
    min-height: 950px;
    box-sizing: border-box;
  }
  .form-msg{
    height: 32px;
    line-height: 32px;
    margin-left: 79px;
    color: red;
    font-size: 14px;
  }
  .personalComfire-box-form-wrap{
    width: 453px;
    margin-left: 64px;
  }
  .personalComfire-box-form-wrap>div>input{
    width: 285px;
    height: 32px;
    line-height: 32px;
    font-size: 14px;
    padding-left: 15px;
    outline: none;
    font-family: " PingFangSC";
    border-radius: 4px;
    border: solid 1px #d6d6d6;
  }
  #personalComfire-box-form-type{
    width: 453px;
    margin: 0px 0 30px 64px;
  }
  #personalComfire-box-form-type>img{
    margin-right: 32px;
    vertical-align: middle;
  }
  #personalComfire-box-form-type>span{
    font-family: " PingFangSC";
    margin-right: 18px;
    font-size: 14px;
    vertical-align: middle;
    color: #333333;
  }
  .personalComfire-box-form-type-selectaddress{
    width: 300px;
    height: 40px;
  }
  .personalComfire-box-form-name>img,.personalComfire-box-form-type-passport>img,.personalComfire-box-form-mobile>img{
    vertical-align: middle;
    margin-right: 32px;
  }
  .personalComfire-box-form-linkaddress,.personalComfire-box-form-chose,.personalComfire-box-form-chosequ{
    margin-bottom: 32px;
  }
  .personalComfire-box-form-type-number>span,
  .personalComfire-box-form-mobile>span,#personalComfire-box-form-type-idAddress>span,.personalComfire-box-form-type-passport>span{
    font-family: " PingFangSC";
    font-size: 14px;
    vertical-align: middle;
    color: #333333;
    margin-right: 16px;
  }
  .personalComfire-box-form-name>span{
    font-family: " PingFangSC";
    font-size: 14px;
    vertical-align: middle;
    color: #333333;
    margin-right: 16px;
    margin-left: 29px;
  }
  .personalComfire-box-form-type-passport-address>img{
    vertical-align: middle;
  }
  .personalComfire-box-form-type-passport-address>span{
    font-family: " PingFangSC";
    font-size: 14px;
    vertical-align: middle;
    color: #333333;
  }
  .personalComfire-box-form-type-input>span{
    font-family: " PingFangSC";
    font-size: 14px;
    vertical-align: middle;
    color: #333333;
    margin-right: 16px;
  }
  /* .personalComfire-box-form-type-input>input{

  } */
  .personalComfire-box-form-type-number>img,#personalComfire-box-form-type-idAddress>img,.personalComfire-box-form-type-idimg>img{
    vertical-align: middle;
    margin-right: 14px;
  }
  .idimg{
    width: 120px;
    height: 120px;
  }
  #span1{
    font-size: 14px;
    color:red;
  }
  .personalComfire-box-form-type-idimg>span{
    font-family: " PingFangSC";
    font-size: 14px;
    vertical-align: middle;
    color: #333333;
    margin-left: -42px;
  }
  .personalComfire-box-form-type-idimg-div{
    /* margin: 0px 0 0 px; */
    height: 120px;
    float: right;
    margin-right: 76px;
  }
  /* #idimg{
    margin-right: 179px;
  } */
  .personalComfire-box-form-type-idimg-div>div{
    float: left;
    width: 120px;
    height: 120px;
  }
  .personalComfire-box-form-type-idimg-div>div:nth-of-type(1){
    margin-right: 60px;
  }
  .personalComfire-box-form-type-submit-img{
    margin: 0 36px  0 86px;
  }
  .opeartor{
    margin-top: 32px;
    margin-bottom: 100px;
    margin-left: 84px;
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
  .opeartor>img{
    cursor: pointer;
  }
  .personalComfire-box-form-type-select{
    vertical-align: middle;
    width: 300px;
    height: 40px;
    border-color:none;
  }
  .increased {
  font-family: "PingFangSC";
  font-size: 12px;
  font-weight: 100;
   color: #f96006;
   margin: 18px 0 0 72px;
  }
  .ml {
    margin-left: 0px !important;
  }
  .mr180 {
    margin-right: 180px !important ;
  }
  .mr2 {
    margin-left: -14px;
  }
  .ml10 {
    margin-left: -14px !important;
  }
</style>
<style>
  .el-input__inner {
    height: 32px !important;
    line-height: 32px !important;
    margin-top: 5px !important;
    box-sizing: border-box;
  }
  .el-input__suffix {
    position: absolute !important;
    top:4px !important;
  }
</style>



