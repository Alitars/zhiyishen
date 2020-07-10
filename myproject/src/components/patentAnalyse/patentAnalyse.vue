<template>
  <div class="patentAnalyse">
    <Top></Top>
    <Fix></Fix>
    <div class="patentAnalyse-box"  id="box" ref="chatMain">
      <div class="patentAnalyse-box-big">
        <div class="patentAnalyse-box-big-one">
          <p>人工智能专利分析</p>
          <p>免费专利分析</p>
          <img src="/static/images/xiaoguo.png" alt="">
        </div>
        <!-- 第一问 -->
        <div class="patentAnalyse-box-big-title">请选择您的技术方案</div>
        <div class="patentAnalyse-box-big-two">
          <div class="ml36 ml34">
            <input type="radio" value="1" v-model="invoice" name="invoice" id="radio1" disabled>
            <label for="radio1">外观设计方案</label>
            <span class="sizeColor">此业务暂未开通</span>
          </div>
          <div>
            <input type="radio" value="2" v-model="invoice" name="invoice" id="radio2">
            <label for="radio2">技术方案</label>
          </div>
          <p class="next" @click="next1" v-show="!invoiceShow2&&!five_show">下一步</p>
        </div>
        <!-- 第二问 -->
        <div class="patentAnalyse-box-big-title" v-if="invoiceShow2">请问您的技术方案的类别是？</div>
        <div class="patentAnalyse-box-big-two" v-if="invoiceShow2">
          <div class="ml95">
            <input type="radio" value="1" v-model="invoice1" name="invoice1" id="radio3">
            <label for="radio3">方法技术</label>
            <span class="sample" @click="sample1">示例</span>
            <img class="imgs" v-show="sampleShow " src="/static/images/994.png" alt="">
          </div>
          <div class="ml95">
            <input type="radio" value="2" v-model="invoice1" name="invoice1" id="radio4">
            <label for="radio4">产品技术</label>
            <span class="sample" @click="sample2">示例</span>
            <img class="imgs1" v-show="sampleShow1 " src="/static/images/995.png" alt="">
          </div>
          <p class="next" @click="next2" v-show="!invoiceShow3&&!invoiceShow5 ">下一步</p>
        </div>
        <!-- 第三问 -->
        <div class="patentAnalyse-box-big-title" v-if="invoiceShow3">你要选择申请的专利类型是?</div>
        <div class="patentAnalyse-box-big-two" v-if="invoiceShow3" >
          <div class="ml188">
            <input type="radio" value="1" v-model="invoice2" name="invoice2" id="radio5">
            <label for="radio5">无形状，无结构产品</label>
            <span>示例</span>
          </div>
          <div class="ml188">
            <input type="radio" value="2" v-model="invoice2" name="invoice2" id="radio6">
            <label for="radio6">有形状，有结构产品</label>
            <span>示例</span>
          </div>
          <p class="next" @click="next3" v-show="!invoiceShow5">下一步</p>
        </div>
        <!-- 第四问 -->
        <div class="patentAnalyse-box-big-title" v-if="invoiceShow4">你要选择申请的专利类型是?</div>
        <div class="patentAnalyse-box-big-two" v-if="invoiceShow4">
          <div>
            <input type="radio" value="1" v-model="invoice3" name="invoice3" id="radio7">
            <label for="radio7">发明专利</label>
          </div>
          <div class="ml36 ml32" v-show="four_show">
            <input type="radio" value="2" v-model="invoice3" name="invoice3" id="radio8">
            <label for="radio8" >实用新型专利</label>
          </div>
          <div class="ml124" v-show="four_show">
            <input type="radio" value="3" v-model="invoice3" name="invoice3" id="radio9">
            <label for="radio9">发明专利&实用新型专利</label>
          </div>
          <p class="next" @click="next4" v-show="!invoiceShow5">下一步</p>
        </div>
        <!-- 第五问 -->
        <div class="patentAnalyse-box-big-title" v-show="invoiceShow5">请输入发明创造的名称</div>
        <div class="patentAnalyse-box-big-title" v-show="five_show">请输入使用外观设计的产品名称</div>
        <div class="patentAnalyse-box-big-two" v-show="invoiceShow5||five_show">
          <input type="text" placeholder="例如：T恤，运动裤" v-model="patentName">
          <p class="next" @click="next5" v-show="!productName_show&&!six_show">下一步</p>
        </div>
        <!-- 产品名称 -->
        <div class="patentAnalyse-box-big-title" v-show="productName_show">请输入产品名称</div>
        <div class="patentAnalyse-box-big-two" v-show="productName_show">
          <input type="text" placeholder="例如：T恤，运动裤" v-model="productName">
          <p class="next" @click="product" v-show="!invoiceShow6">下一步</p>
        </div>
        <!-- 第六问 -->
        <div class="patentAnalyse-box-big-title" v-show="invoiceShow6">选择你的技术领域</div>
        <div class="patentAnalyse-box-big-two" v-show="invoiceShow6">
          <select name="s1" id="s1" v-model="serial">
            <option id='o1' :value="v.serial" v-for="(v,k) in companytype" :key="k">{{v.difftype}}</option>
          </select>
          <p class="next" @click="next6" v-show="!invoiceShow7">下一步</p>
        </div>
        <!-- 设计下拉 -->
        <div class="patentAnalyse-box-big-title" v-show="six_show">请选择您的设计要点</div>
        <div class="patentAnalyse-box-big-two" v-show="six_show">
          <select name="s2" id="s2" v-model="serialone">
            <option  v-for="(item,index) in essentials" :key="index" :value="item.serialone">{{item.difftype1}}</option>
          </select>
          <p class="next" @click="next7" v-show="!invoiceShow8">下一步</p>
        </div>
        <!-- 第七问 -->
        <div class="patentAnalyse-box-big-title" v-show="invoiceShow7">{{this.describe[this.serial-1].describeText}}</div>
        <div class="patentAnalyse-box-big-title mt0" v-show="invoiceShow7">{{this.describe1[this.serial-1].describeText}}</div>
        <div class="patentAnalyse-box-big-three" v-show="invoiceShow7">
          <textarea v-model="patentAsk7" name="" id=""  style="height: 276px; width: 948px;" placeholder="请做简单的描述"></textarea>
          <p class="next" @click="next8" v-show="!keywordShow">下一步</p>
        </div>
        <!-- 设计说明 -->
        <div class="patentAnalyse-box-big-title" v-show="invoiceShow8">设计特别说明：给出事例（非必填项）</div>
        <div class="patentAnalyse-box-big-three" v-show="invoiceShow8">
          <textarea v-model="patentAsk8" name="" id=""  style="height: 276px; width: 948px;" placeholder="请做简单的描述"></textarea>
          <p @click="next9" class="next" v-if="!keywordShow">下一步</p>
        </div>
        <!-- 关键词 -->
        <div class="patentAnalyse-box-big-title" v-if="keywordShow">请确定技术关键词</div>
        <div class="patentAnalyse-box-big-one" v-if="keywordShow">
          <ul class="keywords" >
            <li v-for="(item,index) in list" :key="index" :title="item" :class="{ colorShow:item.isSelect}" @click="change_color(index)">{{item.name}}</li>
            <li @click="addition">添加</li>
          </ul>
          <p class="mb0">已选中{{num}}个关键词</p>
          <p @click="nextWeb" class="next" v-if="!invoiceShow9">下一步</p>
        </div>
        <!-- 行业 -->
        <!-- <div class="patentAnalyse-box-big-title" v-if="web_show">你要选择申请的专利行业是?</div>
        <div class="patentAnalyse-box-big-two" v-if="web_show">
          <div class="ml36">
            <input type="radio" value="1" v-model="invoice4" name="invoice4" id="invoice1">
            <label for="invoice1">A部-人类生活必需</label>
          </div>
          <div class="mbo32">
            <input type="radio" value="2" v-model="invoice4" name="invoice4" id="invoice2">
            <label for="invoice2">B部-作业；运输</label>
          </div>
          <div class="mbo32">
            <input type="radio" value="3" v-model="invoice4" name="invoice4" id="invoice3">
            <label for="invoice3">C部-化学；冶金</label>
          </div>
          <div class="mbo32">
            <input type="radio" value="4" v-model="invoice4" name="invoice4" id="invoice4">
            <label for="invoice4">D部-纺织；造纸</label>
          </div>
          <div class="mbo32">
            <input type="radio" value="5" v-model="invoice4" name="invoice4" id="invoice5">
            <label for="invoice5">E部-固定建筑物</label>
          </div>
          <div class="mbo32 ml200">
            <input type="radio" value="6" v-model="invoice4" name="invoice4" id="invoice6">
            <label for="invoice6">F部-机械工程；照明；加热；武器；爆破</label>
          </div>
          <div class="mbo32 ml-50">
            <input type="radio" value="7" v-model="invoice4" name="invoice4" id="invoice7">
            <label for="invoice7">G部-物理</label>
          </div>
          <div class="mbo32 ml-50">
            <input type="radio" value="8" v-model="invoice4" name="invoice4" id="invoice8">
            <label for="invoice8">H部-电学</label>
          </div>
          <p class="next" @click="nextWeb" v-show="!invoiceShow9">下一步</p>
        </div> -->
        <!-- 设计图片 -->
        <div class="patentAnalyse-box-big-title" v-show="invoiceShow9">上传产品结构图纸</div>
        <div class="patentAnalyse-box-big-one" v-show="invoiceShow9">
          <input type="text" v-model="name1" disabled="disabled" class="input1">
          <label for="fileNone1" class="stup"></label>
          <input @change="update1($event)" ref="file" type="file" id="fileNone1" multiple style="display:none;" accept="image/*">
          <p @click="step2" class="next">检测</p>
        </div>
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
    name:'patentAnalyse',
    components: {
      Top,
      Foot,
      Fix
    },
    data(){
      return {
        // 第一问
        invoice:'2',
        // 第二问
        invoice1:'2',
        invoiceShow2:false,
        // 第三问
        invoice2:'2',
        invoiceShow3:false,
        // 第四问
        invoice3:'1',
        invoiceShow4:false,
        four_show:true,
        // 第五问
        patentName:'',
        invoiceShow5:false,
        five_show:false,
        // 第六问数据
        serial:'1',
        companytype:[
          {
          serial: '1',
          difftype: '机械'
          },
          {
          serial: '2',
          difftype: '电子'
          },
          {
          serial: '3',
          difftype: '化工'
          },
          {
          serial: '4',
          difftype: '通讯'
          },
          {
          serial: '5',
          difftype: '计算机'
          },
          {
          serial: '6',
          difftype: '生物医药'
          },
        ],
        invoiceShow6:false,
        serialone:'1',
        essentials:[
          {
          serialone: '1',
          difftype1: '形状'
          },
          {
          serialone: '2',
          difftype1: '图案'
          },
          {
          serialone: '3',
          difftype1: '形状+色彩'
          },
          {
          serialone: '4',
          difftype1: '图案+色彩'
          },
          {
          serialone: '5',
          difftype1: '形状+图案+色彩'
          },
          {
          serialone: '6',
          difftype1: '形状+图案'
          }
        ],
        six_show:false,
        // 第七问
        patentAsk7:'',
        invoiceShow7:false,
        // 设计说明
        patentAsk8:'',
        invoiceShow8:false,
        // 设计图片
        name1:'',
        invoiceShow9:false,
        pic2:'',
        // 控制上传相同图片不响应
        clearShow:true,
        // 关键词
        list:[],
        spanIndex:[],
        keywordShow:false,
        tag:'',
        productName_show:false,
        productName:'',
        patent_type:'',
        // 传给后台数据
        plan:'',
        area:'',
        category:'',
        describe:[
          {
            id:1,
            describeText:'通过产品结构图纸中的主要零部件及连接关系'
          },
          {
            id:2,
            describeText:'通过电路图中主要功能模块及连接关系'
          },
          {
            id:3,
            describeText:'通过流程图、原理框图、时序图或算法公式等'
          },
          {
            id:4,
            describeText:'通过所述产品的配比配方、化学方程式、生产流程和工艺等'
          },
          {
            id:5,
            describeText:'通过集成电路布图设计描述其层级设计以及层级间的连接关系'
          }
        ],
        describe1:[
          {
            id:1,
            describeText:'描述该结构的工作原理，如需帮助请点击示例查看'
          },
          {
            id:2,
            describeText:'描述该电路图的工作原理，如需帮助请点击示例查看'
          },
          {
            id:3,
            describeText:'通过产品结构图纸中的主要零部件及连接关系'
          },
          {
            id:4,
            describeText:'描述其工作原理；如需帮助请点击示例查看'
          },
          {
            id:5,
            describeText:'描述其工作原理；如需帮助请点击示例查看'
          }
        ],
        // 实例显示隐藏
        sampleShow:false,
        sampleShow1:false,
        // 行业
        invoice4:'1',
        input9:false,
        ic:'',
        web_show:false,
        industry:'',
        num:0,
        listFalse:[],
        form:'',
        category:''
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
      update1(e) {
        let fileList = [];
        let file = e.target.files;
        //z`(file[0].name)
        let formData = new FormData()
        for (let i = 0;i < file.length;i++) {
          formData.append('img[]',file[i])
          this.name1 += file[i].name +','
        }
        formData.append('user_id',this.$cookie.getCookie('u_id'))
        this.name1 = this.name1.substring(0,this.name1.length-1)
        this.clearShow = false
        let headers = {'Content-Type': 'multipart/form-data'}
        let user_id =this.$cookie.getCookie('u_id')
        this.$http.post(this.GLOBAL.base_url+'/api/patent/uploadImgs',formData).then( res => {
            if(res.data.code == '1') {
              this.pic2 = res.data.data[0]
              // console.log(this.pic2)
              this.clearShow = true;
            }
          },()=> {
            this.clearShow = true;
          })
      },
      next1(){
        if(this.invoice == 1) {
          this.five_show = true
        }else {
          this.invoiceShow2 = true
        }
        this.handleScroll()
      },
      next2(){
        if(this.invoice1 == 1) {
          this.invoiceShow5 = true
        }else {
          this.invoiceShow3 = true
        }
        this.handleScroll()
      },
      next3(){
        this.invoiceShow5 = true
        this.handleScroll()
      },
      next4(){
        this.invoiceShow5 = true
        this.handleScroll()
      },
      next5(){
        if(this.invoice == 1) {
          if(this.patentName == '') {
            this.tip('error','请输入外观设计的产品名称')
          }else {
            const loading = this.$loading({
              lock: true,
              text: '查询中',
              spinner: 'el-icon-loading',
              background: 'rgba(0, 0, 0, 0.3)'
            });
            this.$http.post(this.GLOBAL.json+'/get_related_words',{
              text:this.patentName
            }).then( res => {
              // console.log(res)
              loading.close();
              if(res.data.code == 300) {
                this.six_show = true
                this.handleScroll()
              }
              if( res.data.code == 200) {
                var listData = []
                for(let i=0;i<res.data.list1.length;i++) {
                  listData.push({
                    name:res.data.list1[i],
                    isSelect:true
                  })
                }
                if(res.data.list2.length == 0) {
                  this.listFalse = []
                }else {
                  for(let i=0;i<res.data.list2.length;i++) {
                    this.listFalse.push({
                      name:res.data.list2[i],
                      isSelect:false
                    })
                  }
                }
                this.list = listData.concat(this.listFalse)
                var prolist = this.list.filter(function (val) { return val.isSelect})
                this.num = prolist.length
                this.six_show = true
                this.handleScroll()
              }
            })
          }
        }else {
          if(this.patentName == '') {
            this.tip('error','请输入专利名称')
          }else {
            this.productName_show = true
            this.handleScroll()
          }
        }
      },
      product(){
        if(this.productName == '') {
          this.tip('error','请输入产品名称')
        }else {
          this.invoiceShow6 =true
          this.handleScroll()
        }
      },
      next6(){
        this.invoiceShow7 = true
        this.handleScroll()
      },
      next7(){
        this.invoiceShow8 = true
        this.handleScroll()
      },
      next8(){
        if(this.invoice == '2') {
          if(this.patentAsk7 == '') {
            this.tip('error','请做简单描述')
          }else {
            var test = this.productName + ',' + this.patentAsk7
            // console.log(test)
            const loading = this.$loading({
                  lock: true,
                  text: '提交中',
                  spinner: 'el-icon-loading',
                  background: 'rgba(0, 0, 0, 0.3)'
             });
            this.$http.post(this.GLOBAL.json+'/get_related_words',{
              text:test
            }).then( res => {
              // console.log(res)
              loading.close();
              if(res.data.code == 300) {
                this.keywordShow = true
                this.handleScroll()
              }
              if( res.data.code == 200) {
                var listData = []
                for(let i=0;i<res.data.list1.length;i++) {
                  listData.push({
                    name:res.data.list1[i],
                    isSelect:true
                  })
                }
                if(res.data.list2.length == 0) {
                  this.listFalse = []
                }else {
                  for(let i=0;i<res.data.list2.length;i++) {
                    this.listFalse.push({
                      name:res.data.list2[i],
                      isSelect:false
                    })
                  }
                }
                this.list = listData.concat(this.listFalse)
                var prolist = this.list.filter(function (val) { return val.isSelect})
                this.num = prolist.length
                this.keywordShow = true
                this.handleScroll()
              }
            })
          }
        }
      },
      next9(){
        const loading = this.$loading({
           lock: true,
           text: '查询中',
           spinner: 'el-icon-loading',
           background: 'rgba(0, 0, 0, 0.3)'
        });
        if(this.list.length != 0) {
          loading.close();
          this.keywordShow = true
          this.handleScroll()
        }else {
          loading.close();
          this.keywordShow = true
          this.handleScroll()
        }
      },
      webShow(){
        this.web_show = true
      },
      nextWeb(){
        //方案类型
        if(this.invoice == 1) {
          this.plan = '外观设计方案'
        }else {
          this.plan = '技术方案'
        }
        //
        if(this.serial == 1) {
          this.ic =  '机械'
          this.area = '机械'
        }
        if(this.serial == 2) {
          this.ic =  '电子'
          this.area = '电子'
        }
        if(this.serial == 3) {
          this.ic =  '化工'
          this.area = '化工'
        }
        if(this.serial == 4) {
          this.ic =  '通讯'
          this.area = '通讯'
        }
        if(this.serial == 5) {
          this.ic =  '计算机'
          this.area = '计算机'
        }
        if(this.serial == 6) {
          this.ic =  '生物医药'
          this.area = '生物医药'
        }
        // 类别
        if(this.invoice1 == 1) {
          this.category = '1'
          this.form = ''
        }
        if(this.invoice1 == 2) {
          this.category = '2'
          //专利形状、结构
          if(this.invoice2 == 1) {
            this.form = '1'
          }
          if(this.invoice2 == 2) {
            this.form = '2'
          }
        }
        // 专利类型
        if(this.invoice3 == 1) {
          this.patent_type = '发明专利'
        }
        if(this.invoice3 == 2) {
          this.patent_type = '实用新型专利'
        }
        if(this.invoice3 == 3) {
          this.patent_type = '发明专利&实用新型专利'
        }
        var prolist = this.list.filter(function (val) { return val.isSelect})
        var arr = ''
        for ( let i = 0; i< prolist.length; i++) {
          arr+=prolist[i].name+','
        }
        this.tag = arr.substring(0,arr.length-1)
        if(this.invoice == '2'){
          if(this.patentName == '') {
            this.tip('error','请输入专利名称')
          }else if(this.patentAsk7 == ''){
            this.tip('error','请做简单描述')
          } else {
                const loading = this.$loading({
                  lock: true,
                  text: '提交中',
                  spinner: 'el-icon-loading',
                  background: 'rgba(0, 0, 0, 0.3)'
                });
            this.$http.post(this.GLOBAL.json+'/commit_search_patent_img',{
              upload_img_path:'',
              key_words:this.tag,
              user_id:this.$cookie.getCookie('u_id'),
              product:this.productName,
              patent_name:this.patentName,
              patent_type:this.patent_type,
              test:0,
              description:this.patentAsk7,
              ic:this.ic,
              type1:this.category,
              type2:this.form
            }).then(res => {
              // console.log(res)
                loading.close();
              if(res.data.code == 300) {
                var id = res.data.id
                this.$http.post(this.GLOBAL.base_url+'/api/patent/analyAdd',{
                  user_id:this.$cookie.getCookie('u_id'),
                  no:id,
                  plan:this.plan,
                  name:this.productName,
                  product:this.productName,
                  area:this.area,
                  key_word:this.tag,
                  category:this.category,
                  form:this.form,
                  type:this.patent_type,
                  content:this.patentAsk7,
                  imgs:'',
                  industry:this.ic
                }).then(res => {
                  this.$alert('没有查到相似专利?', '提示', {
                    confirmButtonText: '确定',
                  });
                })
              }
              if(res.data.code == 200) {
                var id = res.data.id
                this.$http.post(this.GLOBAL.base_url+'/api/patent/analyAdd',{
                  user_id:this.$cookie.getCookie('u_id'),
                  no:id,
                  plan:this.plan,
                  name:this.productName,
                  product:this.productName,
                  area:this.area,
                  key_word:this.tag,
                  category:this.category,
                  form:this.form,
                  type:this.patent_type,
                  content:this.patentAsk7,
                  imgs:'',
                  industry:this.ic
                }).then(res => {
                  this.$router.push({
                    path:'/patentReports',
                    query:{
                      good:id
                    }
                  })
                })
              }
            })
          }
        }else {
          this.invoiceShow9 = true
          this.handleScroll()
        }
      },
      // 关键词
      change_color(index){
        var prolist = this.list.filter(function (val) { return val.isSelect})
        this.list[index].isSelect = !this.list[index].isSelect
        if(prolist.length > 6) {
          var prolist1 = this.list.filter(function (val) { return val.isSelect})
          if(prolist1.length > 6) {
            this.tip('error','最多只能选择7个关键词')
          }
          this.list[index].isSelect = false
        }
        var prolist2 = this.list.filter(function (val) { return val.isSelect})
        this.num = prolist2.length
        // console.log(prolist)
      },
      // 添加关键词
      addition(){
        var prolist = this.list.filter(function (val) { return val.isSelect})
        if(prolist.length > 6) {
          this.tip('error','最多只能选择7个关键词')
        }else {
          this.$prompt('请输入关键词', '是否添加关键词', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            inputPattern:  /\S/,
            inputErrorMessage: '不能为空'
          }).then(({ value }) => {
            let c= this.list.length+1
            this.list.push({
              name:value,
              isSelect:true
            })
            var prolist = this.list.filter(function (val) { return val.isSelect})
            this.num = prolist.length
            // console.log(prolist)
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '取消输入'
            });
          });
        }
      },
      step2(){
        //方案类型
        if(this.invoice == 1) {
          this.plan = '外观设计方案'
        }else {
          this.plan = '技术方案'
        }
        //
        if(this.serialone == 1) {
          this.ic =  '形状'
          this.area = '形状'
        }
        if(this.serialone == 2) {
          this.ic =  '图案'
          this.area = '图案'
        }
        if(this.serialone == 3) {
          this.ic =  '形状+色彩'
          this.area = '形状+色彩'
        }
        if(this.serialone == 4) {
          this.ic =  '图案+色彩'
          this.area = '图案+色彩'
        }
        if(this.serialone == 5) {
          this.ic =  '形状+图案+色彩'
          this.area = '形状+图案+色彩'
        }
        if(this.serialone == 6) {
          this.ic =  '形状+图案'
          this.area = '形状+图案'
        }
        var prolist = this.list.filter(function (val) { return val.isSelect})
        var arr = ''
        for ( let i = 0; i< prolist.length; i++) {
          arr+=prolist[i].name+','
        }
        this.tag = arr.substring(0,arr.length-1)
        if(this.patentName == '') {
          this.tip('error','请输入专利名称')
        }else if (this.name1 == ''){
          this.tip('error','请上传图片')
        }else {
        const loading = this.$loading({
              lock: true,
              text: '提交中',
              spinner: 'el-icon-loading',
              background: 'rgba(0, 0, 0, 0.3)'
          });
          this.$http.post(this.GLOBAL.json+'/commit_search_patent_img',{
                upload_img_path:this.pic2,
                key_words:this.tag,
                user_id:this.$cookie.getCookie('u_id'),
                product:this.patentName,
                patent_name:this.patentName,
                patent_type:'外观专利',
                test:0,
                description:this.patentAsk8,
                ic:''
          }).then( res => {
              // console.log(res)
                  loading.close();
              if(res.data.code == 300) {
                var id = res.data.id
                this.$http.post(this.GLOBAL.base_url+'/api/patent/analyAdd',{
                  user_id:this.$cookie.getCookie('u_id'),
                  no:id,
                  plan:this.plan,
                  name:this.productName,
                  product:this.productName,
                  area:this.area,
                  key_word:this.tag,
                  category:this.category,
                  form:this.form,
                  type:this.patent_type,
                  content:this.patentAsk7,
                  imgs:'',
                  industry:this.ic
                }).then(res => {
                  this.$alert('没有查到相似专利?', '提示', {
                    confirmButtonText: '确定',
                  });
                })
              }
              if(res.data.code == 200) {
                // console.log(res)
                var id = res.data.id
                // console.log(id)
                // var id = 3
                this.$http.post(this.GLOBAL.base_url+'/api/patent/analyAdd',{
                  user_id:this.$cookie.getCookie('u_id'),
                  no:id,
                  plan:this.plan,
                  name:'',
                  area:this.area,
                  key_word:this.tag,
                  content:this.patentAsk8,
                  imgs:this.pic2,
                  content:'',
                  type:'外观专利',
                  product:this.patentName,
                  form:'',
                  industry:this.industry
                }).then(res => {
                  // console.log(res)
                  this.$confirm('20-30分钟左右在个人中心专利分析中查看', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type:false
                  }).then(() => {
                    this.$router.push('/personal/analysisList');
                  }).catch(() => {
                    this.$message({
                    type: 'info',
                    message: '取消输入'
                  });
                  });
                })
              }
          })
        }
      },
      handleScroll(){
        setTimeout(function(){
          window.scrollTo(0,10000)
        },200)
      },
      sample1(){
        this.sampleShow = !this.sampleShow
        this.sampleShow1 = false
      },
      sample2(){
        this.sampleShow1 = !this.sampleShow1
        this.sampleShow = false
      },
    },
    watch:{
      'invoice'(newValue) {
        if(this.invoice == '1') {
          this.tip('error','此业务暂未开通')
          this.invoice = '2'
          this.invoiceShow2 = false
          this.invoiceShow3 = false
          this.invoiceShow4 = false
          this.invoiceShow5 = false
          this.invoiceShow6 = false
          this.invoiceShow7 = false
          this.invoiceShow8 = false
          this.patentName = ''
          this.patentAsk7 = ''
          this.keywordShow = false
          this.list = []
          this.productName_show = false
          this.spanIndex = []
          this.web_show = false
        }else {
          this.five_show = false
          this.six_show = false
          this.keywordShow = false
          this.invoiceShow8 = false
          this.invoiceShow9 = false
          this.list = []
          this.spanIndex = []
          this.web_show = false
          this.patentName = ''
        }
      },
      'invoice1'(newValue) {
        if(this.invoice1 == '1') {
          this.invoiceShow3 = false
          this.invoiceShow4 = false
          this.four_show = false
          this.invoiceShow5 = false
          this.invoiceShow6 = false
          this.invoiceShow7 = false
          this.invoiceShow8 = false
          this.patentName = ''
          this.patentAsk7 = ''
          this.keywordShow = false
          this.list = []
          this.web_show = false
          this.productName_show = false
        }else {
          this.invoiceShow3 = false
          this.invoiceShow4 = false
          this.invoiceShow5 = false
          this.invoiceShow6 = false
          this.invoiceShow7 = false
          this.invoiceShow8 = false
          this.patentName = ''
          this.patentAsk7 = ''
          this.keywordShow = false
          this.list = []
          this.web_show = false
          this.productName_show = false
        }
      },
      "invoice2"(newValue) {
        if(this.invoice2 == 1) {
          this.four_show = false
          this.invoiceShow4 = false
          this.invoiceShow5 = false
          this.invoiceShow6 = false
          this.invoiceShow7 = false
          this.invoiceShow8 = false
          this.patentName = ''
          this.patentAsk7 = ''
          this.list = []
          this.keywordShow = false
          this.web_show = false
          this.productName_show = false
        }else {
          this.four_show = true
          this.invoiceShow4 = false
          this.invoiceShow5 = false
          this.invoiceShow6 = false
          this.invoiceShow7 = false
          this.invoiceShow8 = false
          this.patentName = ''
          this.patentAsk7 = ''
          this.list = []
          this.keywordShow = false
          this.web_show = false
          this.productName_show = false
        }
      },
      "invoice3"(newValue) {
        if(this.invoice3 == '1') {
          this.invoiceShow5 = false
          this.invoiceShow6 = false
          this.invoiceShow7 = false
          this.invoiceShow8 = false
          this.patentName = ''
          this.patentAsk7 = ''
          this.list = []
          this.keywordShow = false
          this.web_show = false
          this.productName_show = false
        }
        if(this.invoice3 == '2') {
          this.invoiceShow5 = false
          this.invoiceShow6 = false
          this.invoiceShow7 = false
          this.invoiceShow8 = false
          this.patentName = ''
          this.patentAsk7 = ''
          this.list = []
          this.keywordShow = false
          this.web_show = false
          this.productName_show = false
        }
        if(this.invoice3 == '3') {
          this.invoiceShow5 = false
          this.invoiceShow6 = false
          this.invoiceShow7 = false
          this.invoiceShow8 = false
          this.patentName = ''
          this.patentAsk7 = ''
          this.list = []
          this.keywordShow = false
          this.web_show = false
          this.productName_show = false
        }
      },
      'invoice4'(newValue) {
        if(this.invoice4 == '9') {
          this.input9 = true
        }else {
          this.input9 = false
        }
      },
      // 'num'(newValue) {
      //   this.num = this.listFalse.length + this.list.length
      // }
    },
    mounted(){
      let that = this
      document.addEventListener('click',(e) => {
        let thisClassName = e.target.className;
        if(thisClassName != "imgs" &&thisClassName != "imgs1"&&thisClassName != "sample"){
           that.sampleShow = false
           that.sampleShow1 = false
        }
      })
    }
  }
</script>

<style scoped>
  .patentAnalyse-box {
    background-color:#fcfcfc;
    min-height: 692px;
  }
  .patentAnalyse-box-big {
    width: 1200px;
    margin: 0 auto;
    padding-top: 30px;
    box-sizing: border-box;
    /* height: 5000px; */
    padding-bottom: 68px;
  }
  .patentAnalyse-box-big-one {
    background-color: #fff;
    box-shadow: 3px 5px 19px -1px rgba(217, 217, 217, 0.5);
    text-align: center;
    padding-top: 24px;
    box-sizing: border-box;
    position: relative;
    padding-bottom: 1px;
  }
  .patentAnalyse-box-big-two {
    /* height: 373px; */
    background-color: #fff;
    box-shadow: 3px 5px 19px -1px rgba(217, 217, 217, 0.5);
    text-align: center;
    padding-top: 36px;
    box-sizing: border-box;
    /* position: relative; */
    padding-bottom: 1px;
  }
  .patentAnalyse-box-big-one > p:nth-child(1) {
    font-family: "PingFangSC";
    font-size: 36px;
    font-weight: 600;
    color: #333;
    margin-bottom: 12px;
  }
  .patentAnalyse-box-big-one > p:nth-child(2) {
    font-family: "PingFangSC";
    font-size: 14px;
    font-weight: normal;
    color:#5b5b5b;
    margin-bottom: 40px;
  }
  .patentAnalyse-box-big-one > img {
    position: absolute;
    top:24px;
    right: 240px;
    height: 82px;
    width: 67px;
  }
  /* 标题 */
  .patentAnalyse-box-big-title {
    margin: 48px 0 0px;
    text-align: center;
    font-family: "PingFangSC";
    font-size: 28px;
    font-weight: normal;
    color: #333;
    padding-bottom:32px
  }
  /* 第一问 */
  .patentAnalyse-box-big-two > div:first-child {
    margin-bottom: 32px;
    position: relative;
  }
  .patentAnalyse-box-big-two > div:nth-child(2) {
    margin-bottom: 36px;
    position: relative;
  }
  input[type=radio] {
    display: none;
  }
  .patentAnalyse-box-big-two>div>label {
    position: relative;
    font-size: 18px;
    color:#333;
    cursor: pointer;
  }
  .patentAnalyse-box-big-two>div>label::before {
    position: absolute;
    top: 4px;
    left: -38px;
    display: inline-block;
    content: "";
    width: 16px;
    height: 16px;
    border-radius: 50%;
    border: 1px solid rgb(219, 219, 219);
  }
  .patentAnalyse-box-big-two>div>input[type=radio]:checked+label {
    color: #333;
   }
  .patentAnalyse-box-big-two>div>input[type=radio]:checked+label::before {
    border: 1px solid #333;
  }
  .patentAnalyse-box-big-two>div>input[type=radio]:checked+label::after {
    display: inline-block;
    content: "";
    width: 8px;
    height: 8px;
    border-radius: 50%;
    position: absolute;
    left: -33px;
    bottom: 7px;
    background-color:#333;
  }
  .patentAnalyse-box-big-two>input[type=text] {
    width: 948px;
    height: 80px;
    border: 1px solid #d6d6d6;
    border-radius: 4px;
    margin-bottom: 36px;
    font-family: "PingFangSC";
    font-size: 24px;
    padding: 24px 0 24px 36px;
    box-sizing: border-box;
  }
  select {
    width: 948px;
    height: 80px;
    border-radius: 4px;
    outline: none;
    border: none;
    border: 1px solid #d6d6d6;
    padding: 24px 50px 24px 36px;
    box-sizing: border-box;
    font-family: "PingFangSC";
    font-size: 24px;
    font-weight: normal;
    color: #333;
    -moz-appearance:none;
    -webkit-appearance:none;
    margin-bottom: 36px;
    background: url(/static/images/2227.png)  no-repeat scroll right 24px center transparent;
  }
  textarea {
    padding: 24px 0 0 36px;
    box-sizing: border-box;
    -moz-appearance:none;
    -webkit-appearance:none;
    border: 1px solid #d6d6d6;
    font-family: "PingFangSC";
    font-size: 24px;
    font-weight: normal;
    color: #333;
    resize:none;
    outline:none;
    margin-bottom: 36px;
  }
  .patentAnalyse-box-big-two > div > span {
    margin-left: 64px;
    font-size: 12px;
    color: #4a90e2;
    border-bottom: 1px solid #4a90e2;
    cursor: pointer;
  }
  .patentAnalyse-box-big-three {
    background-color: #fff;
    box-shadow: 3px 5px 19px -1px rgba(217, 217, 217, 0.5);
    text-align: center;
    padding-top: 48px;
    box-sizing: border-box;
    position: relative;
    padding-bottom: 1px;
  }
  .patentAnalyse-box-big-title > span:nth-child(1) {
    display: inline-block;
    width: 214px;
    height: 54px;
    border-radius: 4px;
    background-color: #efefef;
    text-align: center;
    line-height: 54px;
    font-family: "PingFangSC";
    font-size: 18px;
    font-weight: normal;
    color: #f87e03;
    margin-right: 48px;
    margin-top: 32px;
    cursor: pointer;
  }
  .patentAnalyse-box-big-title > span:nth-child(2) {
    display: inline-block;
    width: 214px;
    height: 54px;
    border-radius: 4px;
    background-color: #f96006;
    text-align: center;
    line-height: 54px;
    font-family: "PingFangSC";
    font-size: 18px;
    font-weight: normal;
    color: #fff;
    cursor: pointer;
    margin-top: 32px;
  }
  .next {
    margin:0 auto;
    width: 214px;
    height: 54px;
    line-height: 54px;
    text-align: center;
    border-radius: 4px;
    background-color: #f96006;
    color: #fff !important;
    cursor: pointer;
    margin-bottom: 44px;
    font-size: 18px;
  }
  .ml36 {
    margin-left: 20px;
  }
  .ml124 {
    margin-left: 124px;
    margin-bottom: 36px;
  }
  .mt0 {
    margin-top: 0px;
  }
  .stup {
    width: 88px;
    height: 40px;
    display: block;
    background: url(/static/images/202228.png);
    position: absolute;
    top: 24px;
    right: 127px;
  }
  .patentAnalyse-box-big-one>.input1 {
    width: 948px;
    height: 40px;
    line-height: 40px;
    padding-left: 8px;
    box-sizing: border-box;
    border: 1px solid #d6d6d6;
    font-family: "PingFangSC";
    font-size: 16px;
    color: #999;
    border-radius: 4px;
    background: #fff;
    margin-bottom: 32px;
  }
  .keywords {
    display: flex;
    padding:0;
    margin:0;
    list-style:none;
    margin:48px 126px;
    flex-flow: row wrap;
  }
  .keywords > li {
    width: 158px;
    height: 34px;
    line-height: 34px;
    border: solid 1px #d6d6d6;
    margin-right: 28px;
    margin-bottom: 16px;
    cursor: pointer;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .keywords > li:last-child {
    border: solid 1px #f96006;
    background-color: #fbefe9;
    font-weight: 300;
    font-stretch: normal;
    color:#333;
  }
  .colorShow {
    background-color: #f96006;
    color: #fff;
  }
  .imgs {
    position: absolute;
    top: 21px;
    right: 279px;
    z-index: 997;
  }
  .imgs1 {
    position: absolute;;
    top: 21px;
    z-index: 997;
    right: 279px;
  }
  .mbo32 {
    margin-bottom: 32px !important
    ;
  }
  .ml200 {
    margin-left: 200px;
  }
  .ml-50 {
    margin-left: -50px;
  }
  .ml204 {
    margin-left: 204px !important;
  }
  .mr16 {
    margin-right: 16px;
  }
  .ml-90 {
    margin-left: -90px;
  }
  .input9 {
    width: 272px;
    height: 32px;
    border-radius: 4px;
    border: solid 1px #d6d6d6;
    padding: 4px 12px;
    box-sizing: border-box;
  }
  .ml34 {
    margin-left: 215px !important;
  }
  .ml32 {
    margin-left: 32px !important;
  }
  .mb0 {
    margin-bottom: 20px !important;
  }
  .sizeColor {
    color: #f96006 !important;
    font-size: 16px !important;
    border: none !important;
  }
  .ml95 {
    margin-left: 95px;
  }
  .ml188 {
    margin-left: 188px;
  }
</style>
