<template>
  <div class="editQuestion">
    <Top></Top>
    <Fix></Fix>
    <div class="editQuestion-box">
      <div class="editQuestion-box-big">
        <div class="editQuestion-box-big-one">
          <p>人工智能技术交底书撰写</p>
          <p>免费撰写技术交底书</p>
          <img src="/static/images/xiaoguo.png" alt="">
        </div>
        <!-- 第一问 -->
        <div class="editQuestion-box-big-title">请输入发明创造的名称</div>
        <div class="editQuestion-box-big-two">
          <input type="text" placeholder="例如：T恤，运动裤" v-model="oneAsk">
          <!-- <p @click="oneStep" class="next" v-show="show1">下一步</p> -->

        </div>
        <!-- 第二问 -->
        <div class="editQuestion-box-big-title" >选择你的技术领域</div>
        <div class="editQuestion-box-big-two" >
          <select name="" id="" v-model="serial" @change="choseCompany">
            <option :value="v.serial" v-for="(v,k) in companytype" :key="k">{{v.difftype}}</option>
          </select>
          <!-- <p @click="twoStep" class="next" v-show="show2">下一步</p> -->
          <div></div>
        </div>
        <!-- 第三问 -->
        <div class="editQuestion-box-big-title" >请描述现有技术的优点和缺点？</div>
        <div class="editQuestion-box-big-three" >
          <textarea v-model="threeAsk" name="" id=""  style="height: 276px; width: 948px;" placeholder="请做简单的描述"></textarea>
          <!-- <p @click="threeStep" class="next" v-show="show3">下一步</p> -->
        </div>
        <!-- 第四问 -->
        <div class="editQuestion-box-big-title">您的发明所需解决的问题及目的？</div>
        <div class="editQuestion-box-big-three">
          <textarea v-model="fourAsk" name="" id=""  style="height: 276px; width: 948px;" placeholder="请做简单的描述"></textarea>
          <!-- <p @click="fourStep" class="next" v-show="show4">下一步</p> -->
        </div>
        <!-- 第五问 -->
          <!-- 机械 -->
          <div class="editQuestion-box-big-title" v-show="five_show1">通过产品结构图纸中的主要零部件及连接关系</div>
          <div class="editQuestion-box-big-title mtn" v-show="five_show1">描述该结构的工作原理及实现方式，如需帮助请点击示例查看。</div>
          <!-- 电子 -->
          <div class="editQuestion-box-big-title" v-show="five_show2">通过电路图中主要功能模块及连接关系，</div>
          <div class="editQuestion-box-big-title mtn" v-show="five_show2">描述该电路图的工作原理及实现方式，如需帮助请点击示例查看</div>
          <!-- 软件系统 -->
          <div class="editQuestion-box-big-title" v-show="five_show3">通过流程图、原理框图、时序图或算法公式等</div>
          <div class="editQuestion-box-big-title mtn" v-show="five_show3">描述其工作原理及实现方式；如需帮助请点击示例查看</div>
          <!-- 化工&医药 -->
          <div class="editQuestion-box-big-title" v-show="five_show4">通过所述产品的配比配方、化学方程式、生产流程和工艺等</div>
          <div class="editQuestion-box-big-title mtn" v-show="five_show4">描述其工作原理及实现方式；如需帮助请点击示例查看</div>
          <!-- 半导体芯片布图设计 -->
          <div class="editQuestion-box-big-title" v-show="five_show5">通过集成电路布图设计描述其层级设计以及层级间的连接关系</div>
          <div class="editQuestion-box-big-title mtn" v-show="five_show5">描述其工作原理及实现方式；如需帮助请点击示例查看</div>
          <!-- 生物基因 -->
          <!-- <div class="editQuestion-box-big-title" v-show="five_show6">通过所述产品的配比配方、化学方程式、生产流程和工艺等</div> -->
          <!-- <div class="editQuestion-box-big-title mtn" v-show="five_show6">描述其工作原理及实现方式；如需帮助请点击示例查看</div> -->
        <div class="editQuestion-box-big-three" >
          <textarea v-model="fiveAsk" name="" id=""  style="height: 276px; width: 948px;" placeholder="请做简单的描述" ></textarea>
          <!-- <p @click="fiveStep" class="next" v-show="show5">下一步</p> -->
        </div>
        <!-- 第六问 -->
          <!-- 机械 -->
          <div class="editQuestion-box-big-title" v-show="five_show1">上传产品结构图纸</div>
          <!-- 电子 -->
          <div class="editQuestion-box-big-title" v-show="five_show2">上传电路图、方块图等</div>
          <!-- 软件系统 -->
          <div class="editQuestion-box-big-title" v-show="five_show3">上传该方法的流程图、原理框图、时序图</div>
          <!-- 化工&医药 -->
          <div class="editQuestion-box-big-title" v-show="five_show4">上传化学方程式</div>
          <!-- 半导体芯片布图设计 -->
          <div class="editQuestion-box-big-title" v-show="five_show5">上传集成电路布局图</div>
          <!-- 生物基因 -->
          <!-- <div class="editQuestion-box-big-title" v-show="five_show6">上传化学方程式</div> -->
        <div class="editQuestion-box-big-one">
          <input type="text" v-model="name1" disabled="disabled">
          <label for="fileNone"></label>
          <input @change="update($event)" v-if="clearShow" type="file" id="fileNone" ref="file" style="display:none;" >
          <!-- <p @click="sixStep" class="next" v-show="show6">下一步</p> -->
        </div>
        <!-- 第七问 -->
          <!-- 机械 -->
          <div class="editQuestion-box-big-title" v-show="five_show1">请描述该结构改进带来的有益效果，如产能、质量、精度的提高，效率的增加</div>
          <!-- 电子 -->
          <div class="editQuestion-box-big-title" v-show="five_show2">请描述该结构的改进带来的有益效果，如稳压</div>
          <!-- 软件系统 -->
          <div class="editQuestion-box-big-title" v-show="five_show3">请描述该方法的有益效果或优点</div>
          <!-- 化工&医药 -->
          <div class="editQuestion-box-big-title" v-show="five_show4">请描述该结构的改进带来的有益效果，如增韧</div>
          <!-- 半导体芯片布图设计 -->
          <div class="editQuestion-box-big-title" v-show="five_show5">请描述该方法的有益效果或优点</div>
          <!-- 生物基因 -->
          <!-- <div class="editQuestion-box-big-title" v-show="five_show6">请描述该结构的改进带来的有益效果，如增韧</div> -->
        <div class="editQuestion-box-big-three">
          <textarea v-model="sevenAsk" name="" id=""  style="height: 276px; width: 948px;" placeholder="请做简单的描述"></textarea>
          <!-- <p @click="sevenStep" class="next" v-show="show7">下一步</p> -->
        </div>
        <!-- 化工&医药选择 -->
        <div class="editQuestion-box-big-title" v-show="five_show4">请问该生产工艺的生产设备是研发的，还是外购的</div>
        <div class="editQuestion-box-big-one" v-show="five_show4">
          <input type="radio" value="1" v-model="find" name="invoice">
          <span>外购</span>
          <input type="radio" value="2" v-model="find" name="invoice">
          <span>研发</span>
          <!-- <p @click="medicineStep" class="next" v-show="show9">下一步</p> -->
        </div>
        <!-- 第八问 -->
        <div class="editQuestion-box-big-title" v-show="outsourcing">为了实现发明目的的具体实施方案，如须帮助请点击示例查看</div>
        <div class="editQuestion-box-big-three" v-show="outsourcing">
          <textarea v-model="eightAsk" name="" id=""  style="height: 276px; width: 948px;" placeholder="请做简单的描述"></textarea>
          <!-- <p @click="eightStep" class="next" v-show="show8">下一步</p> -->
        </div>
        <!-- 第九问 -->
        <div class="editQuestion-box-big-title" v-show="outsourcing">请问是否还有别的替代方案同样能完成此发明目的，如须帮助请点击示例查看</div>
        <div class="editQuestion-box-big-three" v-show="outsourcing">
          <textarea v-model=" nineAsk" name="" id=""  style="height: 276px; width: 948px;" placeholder="请做简单的描述"></textarea>
        </div>
        <!-- 化工&医药选择 -- 研发 -->
        <div class="editQuestion-box-big-title" v-show="!outsourcing">通过产品结构图纸中的主要零部件及连接关系</div>
        <div class="editQuestion-box-big-title mtn" v-show="!outsourcing">描述该结构的工作原理及实现方式，如需帮助请点击示例查看</div>
        <div class="editQuestion-box-big-three" v-show="!outsourcing">
          <textarea v-model="outsourcing1" name="" id=""  style="height: 276px; width: 948px;" placeholder="请做简单的描述"></textarea>
          <!-- <p @click="step1" class="next" v-show="show11">下一步</p> -->
        </div>
        <!--  -->
        <div class="editQuestion-box-big-title" v-show="!outsourcing">上传产品结构图纸</div>
        <div class="editQuestion-box-big-one" v-show="!outsourcing">
          <input type="text" v-model="name2" disabled="disabled">
          <label for="fileNone1"></label>
          <input @change="update1" type="file" id="fileNone1"  style="display:none;" >
          <!-- <p @click="step2" class="next" v-show="show12">下一步</p> -->
        </div>
        <!--  -->
        <div class="editQuestion-box-big-title" v-show="!outsourcing">请描述该结构改进带来的有益效果，如产能、质量、精度的提高，效率的增加</div>
        <div class="editQuestion-box-big-three" v-show="!outsourcing">
          <textarea v-model="outsourcing2" name="" id=""  style="height: 276px; width: 948px;" placeholder="请做简单的描述"></textarea>
          <!-- <p @click="step5" class="next" v-show="show15">下一步</p> -->
        </div>
        <!--  -->
        <div class="editQuestion-box-big-title" v-show="!outsourcing">为了实现发明目的的具体实施方案，如须帮助请点击示例查看</div>
        <div class="editQuestion-box-big-three" v-show="!outsourcing">
          <textarea v-model="outsourcing3" name="" id=""  style="height: 276px; width: 948px;" placeholder="请做简单的描述"></textarea>
          <!-- <p @click="step3" class="next" v-show="show13">下一步</p> -->
        </div>
        <!--  -->
        <div class="editQuestion-box-big-title" v-show="!outsourcing">请问是否还有别的替代方案同样能完成此发明目的，如须帮助请点击示例查看</div>
        <div class="editQuestion-box-big-three" v-show="!outsourcing">
          <textarea v-model="outsourcing4" name="" id=""  style="height: 276px; width: 948px;" placeholder="请做简单的描述"></textarea>
        </div>
        <!-- 提交 -->
        <div class="editQuestion-box-big-title" >
          <span @click="save">保存技术交底书</span>
          <span @click="pay">生成技术交底书</span>
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
    name:'editQuestion',
    components: {
      Top,
      Foot,
      Fix
    },
    data(){
      return {
        // 第一问
        oneAsk:'',
        // 第三问
        threeAsk:'',
        // 第四问
        fourAsk:'',
        // 第五问
        fiveAsk:'',
        // 第六问
        name1:'',
        // 第七问
        sevenAsk:'',
        // 第八问
        eightAsk:'',
        // 第九问
        nineAsk:'',
        // 第二问
        serial:'1',
        companytype:[
          {
          serial: '1',
          difftype: '机械(有产品,有结构的归为此类)'
          },
          {
          serial: '2',
          difftype: '电子'
          },
          {
          serial: '3',
          difftype: '软件系统&控制系统&通讯'
          },
          {
          serial: '4',
          difftype: '化工&医药'
          },
          {
          serial: '5',
          difftype: '半导体芯片布图设计'
          },
          // {
          // serial: '6',
          // difftype: '生物基因'
          // }
        ],
        // 控制显示隐藏
          // 第五问的显示隐藏
          five_show1:true,
          five_show2:false,
          five_show3:false,
          five_show4:false,
          five_show5:false,
          five_show6:false,
          // 化工&医药选择
          find:'1',
          // 研发
          name2:'',
          outsourcing1:'',
          outsourcing2:'',
          outsourcing3:'',
          outsourcing4:'',
          // 控制外购研发显示隐藏
          outsourcing:true,
          // 图纸
          pic1:'',
          pic2:'',
          clearShow:true
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
      choseCompany() {
        if(this.serial == '1') {
          // 第五问
          this.five_show1 = true
          this.five_show2 = false
          this.five_show3 = false
          this.five_show4 = false
          this.five_show5 = false
          this.five_show6 = false
        }
        if(this.serial == '2') {
          // 第五问
          this.five_show1 = false
          this.five_show2 = true
          this.five_show3 = false
          this.five_show4 = false
          this.five_show5 = false
          this.five_show6 = false
        }
        if(this.serial == '3') {
          // 第五问
          this.five_show1 = false
          this.five_show2 = false
          this.five_show3 = true
          this.five_show4 = false
          this.five_show5 = false
          this.five_show6 = false

        }
        if(this.serial == '4') {
          // 第五问
          this.five_show1 = false
          this.five_show2 = false
          this.five_show3 = false
          this.five_show4 = true
          this.five_show5 = false
          this.five_show6 = false
        }
        if(this.serial == '5') {
          // 第五问
          this.five_show1 = false
          this.five_show2 = false
          this.five_show3 = false
          this.five_show4 = false
          this.five_show5 = true
          this.five_show6 = false

        }
        if(this.serial == '6') {
          // 第五问
          this.five_show1 = false
          this.five_show2 = false
          this.five_show3 = false
          this.five_show4 = false
          this.five_show5 = false
          this.five_show6 = true

        }
      },
      update(e) {
        let file = e.target.files[0]
        // console.log(file)
        let formData = new FormData();
        formData.append('url_img',file);
        // console.log(formData.get('url_img'))
        this.clearShow = false
        if(formData.get('url_img') !=  "undefined" ) {
          this.name1 = formData.get('url_img').name
          let config = {
            headers:{'Content-Type':'multipart/form-data'}
          };
          this.$http.post(this.GLOBAL.base_url+'/api/BrandUpload/brandUploadFile',formData).then( res => {
            // console.log(res)
            if(res.data.code == '1') {
              this.pic1 = res.data.filepath
              this.clearShow = true;
            }
          },()=> {
            this.clearShow = true;
          })
        }
      },
      update1(e) {
        let file = e.target.files[0]
        let formData = new FormData();
        formData.append('url_img',file);
        this.clearShow = false
        if(formData.get('url_img') !=  "undefined" ) {
          this.name2 = formData.get('url_img').name
          let config = {
            headers:{'Content-Type':'multipart/form-data'}
          };
          this.$http.post(this.GLOBAL.base_url+'/api/BrandUpload/brandUploadFile',formData).then( res => {
            // console.log(res)
            if(res.data.code == '1') {
              this.pic2 = res.data.filepath
              this.clearShow = true;
            }
          },()=> {
            this.clearShow = true;
          })
        }
      },
      // 保存
      save() {
        if(this.oneAsk == '') {
          this.tip('error','请输入发明创造的名称')
          return false
        }else {
          // 机械
          if(this.serial == '1') {
            if(this.threeAsk == '') {
              this.tip('error','请描述现有技术的优点和缺点？')
            }else if (this.fourAsk == ''){
              this.tip('error','您的发明所需解决的问题及目的？')
            }else if (this.fiveAsk == '') {
              this.tip('error','请描述该结构的工作原理及实现方式')
            }else if (this.name1 == '') {
              this.tip('error','上传产品结构图纸')
            }else if (this.sevenAsk == '') {
              this.tip('error','请描述该结构改进带来的有益效果，如产能、质量、精度的提高，效率的增加')
            }else if (this.eightAsk == '') {
               this.tip('error','请输入为了实现发明目的的具体实施方案')
            }else if (this.nineAsk == '') {
              this.tip('error','请输入是否还有别的替代方案同样能完成此发明目的')
            }else {
              this.$http.post(this.GLOBAL.base_url+'/api/patent/answer',{
                user_id:this.$cookie.getCookie('u_id'),
                name:this.oneAsk,
                area:1,
                ans1:this.threeAsk,
                ans2:this.fourAsk,
                ans3:this.fiveAsk,
                pic1:this.pic1,
                ans4:this.sevenAsk,
                ans5:this.eightAsk,
                ans6:this.nineAsk
              }).then( res => {
                console.log(res)
                this.tip('success','保存成功')
              })
            }
          }
          // 电子
          if(this.serial == '2') {
            if(this.threeAsk == '') {
              this.tip('error','请描述现有技术的优点和缺点？')
            }else if (this.fourAsk == ''){
              this.tip('error','您的发明所需解决的问题及目的？')
            }else if (this.fiveAsk == '') {
              this.tip('error','请描述该电路图的工作原理及实现方式')
            }else if (this.name1 == '') {
              this.tip('error','上传电路图、方块图等')
            }else if (this.sevenAsk == '') {
              this.tip('error','请描述该结构的改进带来的有益效果，如稳压')
            }else if (this.eightAsk == '') {
               this.tip('error','请输入为了实现发明目的的具体实施方案')
            }else if (this.nineAsk == '') {
              this.tip('error','请输入是否还有别的替代方案同样能完成此发明目的')
            }else {
              this.$http.post(this.GLOBAL.base_url+'/api/patent/answer',{
                user_id:this.$cookie.getCookie('u_id'),
                name:this.oneAsk,
                area:2,
                ans1:this.threeAsk,
                ans2:this.fourAsk,
                ans3:this.fiveAsk,
                pic1:this.pic1,
                ans4:this.sevenAsk,
                ans5:this.eightAsk,
                ans6:this.nineAsk
              }).then( res => {
                this.tip('success','保存成功')
              })
            }
          }
          // 软件系统
          if(this.serial == '3') {
            if(this.threeAsk == '') {
              this.tip('error','请描述现有技术的优点和缺点？')
            }else if (this.fourAsk == ''){
              this.tip('error','您的发明所需解决的问题及目的？')
            }else if (this.fiveAsk == '') {
              this.tip('error','请描述其工作原理及实现方式')
            }else if (this.name1 == '') {
              this.tip('error','上传该方法的流程图、原理框图、时序图')
            }else if (this.sevenAsk == '') {
              this.tip('error','请描述该方法的有益效果或优点')
            }else if (this.eightAsk == '') {
               this.tip('error','请输入为了实现发明目的的具体实施方案')
            }else if (this.nineAsk == '') {
              this.tip('error','请输入是否还有别的替代方案同样能完成此发明目的')
            }else {
              this.$http.post(this.GLOBAL.base_url+'/api/patent/answer',{
                user_id:this.$cookie.getCookie('u_id'),
                name:this.oneAsk,
                area:3,
                ans1:this.threeAsk,
                ans2:this.fourAsk,
                ans3:this.fiveAsk,
                pic1:this.pic1,
                ans4:this.sevenAsk,
                ans5:this.eightAsk,
                ans6:this.nineAsk
              }).then( res => {
                this.tip('success','保存成功')
              })
            }
          }
          // 化工&医药 外购
          if( this.serial == '4'&&this.find == '1') {
            if(this.threeAsk == '') {
              this.tip('error','请描述现有技术的优点和缺点？')
            }else if (this.fourAsk == ''){
              this.tip('error','您的发明所需解决的问题及目的？')
            }else if (this.fiveAsk == '') {
              this.tip('error','请描述其工作原理及实现方式')
            }else if (this.name1 == '') {
              this.tip('error','上传化学方程式')
            }else if (this.sevenAsk == '') {
              this.tip('error','请描述该结构的改进带来的有益效果，如增韧')
            }else if (this.eightAsk == '') {
               this.tip('error','请输入为了实现发明目的的具体实施方案')
            }else if (this.nineAsk == '') {
              this.tip('error','请输入是否还有别的替代方案同样能完成此发明目的')
            }else {
              this.$http.post(this.GLOBAL.base_url+'/api/patent/answer',{
                user_id:this.$cookie.getCookie('u_id'),
                name:this.oneAsk,
                area:4,
                ans1:this.threeAsk,
                ans2:this.fourAsk,
                ans3:this.fiveAsk,
                pic1:this.pic1,
                ans4:this.sevenAsk,
                type:1,
                ans5:this.eightAsk,
                ans6:this.nineAsk
              }).then( res => {
                this.tip('success','保存成功')
              })
            }
          }
          // 化工&医药 研发
          if( this.serial == '4'&&this.find == '2') {
            if(this.threeAsk == '') {
              this.tip('error','请描述现有技术的优点和缺点？')
            }else if (this.fourAsk == ''){
              this.tip('error','您的发明所需解决的问题及目的？')
            }else if (this.fiveAsk == '') {
              this.tip('error','请描述其工作原理及实现方式')
            }else if (this.name1 == '') {
              this.tip('error','上传化学方程式')
            }else if (this.sevenAsk == '') {
              this.tip('error','请描述该结构的改进带来的有益效果，如增韧')
            }else if (this.outsourcing1 == '') {
               this.tip('error','请描述该结构的工作原理及实现方式')
            }else if (this.name2 == '') {
              this.tip('error','请上传产品结构图纸')
            }else if (this.outsourcing2 == '') {
              this.tip('error','请描述该结构改进带来的有益效果，如产能、质量、精度的提高，效率的增加')
            }else if (this.outsourcing3 == '') {
              this.tip('error','请为了实现发明目的的具体实施方案')
            }else if (this.outsourcing4 == '') {
              this.tip('error','请问是否还有别的替代方案同样能完成此发明目的')
            }else {
              this.$http.post(this.GLOBAL.base_url+'/api/patent/answer',{
                user_id:this.$cookie.getCookie('u_id'),
                name:this.oneAsk,
                area:4,
                ans1:this.threeAsk,
                ans2:this.fourAsk,
                ans3:this.fiveAsk,
                pic1:this.pic1,
                ans4:this.sevenAsk,
                type:2,
                ans5:this.outsourcing3,
                ans6:this.outsourcing4,
                ans7:this.outsourcing1,
                ans8:this.outsourcing2,
                pic2:this.pic2
              }).then( res => {
                this.tip('success','保存成功')
              })
            }
          }
          // 半导体芯片布图设计
          if(this.serial == '5') {
            if(this.threeAsk == '') {
              this.tip('error','请描述现有技术的优点和缺点？')
            }else if (this.fourAsk == ''){
              this.tip('error','您的发明所需解决的问题及目的？')
            }else if (this.fiveAsk == '') {
              this.tip('error','请描述其工作原理及实现方式')
            }else if (this.name1 == '') {
              this.tip('error','上传集成电路布局图')
            }else if (this.sevenAsk == '') {
              this.tip('error','请描述该方法的有益效果或优点')
            }else if (this.eightAsk == '') {
               this.tip('error','请输入为了实现发明目的的具体实施方案')
            }else if (this.nineAsk == '') {
              this.tip('error','请输入是否还有别的替代方案同样能完成此发明目的')
            }else {
              this.$http.post(this.GLOBAL.base_url+'/api/patent/answer',{
                user_id:this.$cookie.getCookie('u_id'),
                name:this.oneAsk,
                area:5,
                ans1:this.threeAsk,
                ans2:this.fourAsk,
                ans3:this.fiveAsk,
                pic1:this.pic1,
                ans4:this.sevenAsk,
                ans5:this.eightAsk,
                ans6:this.nineAsk
              }).then( res => {
                this.tip('success','保存成功')
              })
            }
          }
        }
      },
      // 生成
      pay() {
        if(this.oneAsk == '') {
          this.tip('error','请输入发明创造的名称')
          return false
        }else {
          // 机械
          if(this.serial == '1') {
            if(this.threeAsk == '') {
              this.tip('error','请描述现有技术的优点和缺点？')
            }else if (this.fourAsk == ''){
              this.tip('error','您的发明所需解决的问题及目的？')
            }else if (this.fiveAsk == '') {
              this.tip('error','请描述该结构的工作原理及实现方式')
            }else if (this.name1 == '') {
              this.tip('error','上传产品结构图纸')
            }else if (this.sevenAsk == '') {
              this.tip('error','请描述该结构改进带来的有益效果，如产能、质量、精度的提高，效率的增加')
            }else if (this.eightAsk == '') {
               this.tip('error','请输入为了实现发明目的的具体实施方案')
            }else if (this.nineAsk == '') {
              this.tip('error','请输入是否还有别的替代方案同样能完成此发明目的')
            }else {
              this.$http.post(this.GLOBAL.base_url+'/api/patent/answer',{
                user_id:this.$cookie.getCookie('u_id'),
                name:this.oneAsk,
                area:1,
                ans1:this.threeAsk,
                ans2:this.fourAsk,
                ans3:this.fiveAsk,
                pic1:this.pic1,
                ans4:this.sevenAsk,
                ans5:this.eightAsk,
                ans6:this.nineAsk
              }).then( res => {
                this.$router.push({
                  path:'/twoQuestion',
                  query:{
                    Bid:res.data.data
                  }
                });
              })
            }
          }
          // 电子
          if(this.serial == '2') {
            if(this.threeAsk == '') {
              this.tip('error','请描述现有技术的优点和缺点？')
            }else if (this.fourAsk == ''){
              this.tip('error','您的发明所需解决的问题及目的？')
            }else if (this.fiveAsk == '') {
              this.tip('error','请描述该电路图的工作原理及实现方式')
            }else if (this.name1 == '') {
              this.tip('error','上传电路图、方块图等')
            }else if (this.sevenAsk == '') {
              this.tip('error','请描述该结构的改进带来的有益效果，如稳压')
            }else if (this.eightAsk == '') {
               this.tip('error','请输入为了实现发明目的的具体实施方案')
            }else if (this.nineAsk == '') {
              this.tip('error','请输入是否还有别的替代方案同样能完成此发明目的')
            }else {
              this.$http.post(this.GLOBAL.base_url+'/api/patent/answer',{
                user_id:this.$cookie.getCookie('u_id'),
                name:this.oneAsk,
                area:2,
                ans1:this.threeAsk,
                ans2:this.fourAsk,
                ans3:this.fiveAsk,
                pic1:this.pic1,
                ans4:this.sevenAsk,
                ans5:this.eightAsk,
                ans6:this.nineAsk
              }).then( res => {
                this.$router.push({
                  path:'/twoQuestion',
                  query:{
                    Bid:res.data.data
                  }
                });
              })
            }
          }
          // 软件系统
          if(this.serial == '3') {
            if(this.threeAsk == '') {
              this.tip('error','请描述现有技术的优点和缺点？')
            }else if (this.fourAsk == ''){
              this.tip('error','您的发明所需解决的问题及目的？')
            }else if (this.fiveAsk == '') {
              this.tip('error','请描述其工作原理及实现方式')
            }else if (this.name1 == '') {
              this.tip('error','上传该方法的流程图、原理框图、时序图')
            }else if (this.sevenAsk == '') {
              this.tip('error','请描述该方法的有益效果或优点')
            }else if (this.eightAsk == '') {
               this.tip('error','请输入为了实现发明目的的具体实施方案')
            }else if (this.nineAsk == '') {
              this.tip('error','请输入是否还有别的替代方案同样能完成此发明目的')
            }else {
              this.$http.post(this.GLOBAL.base_url+'/api/patent/answer',{
                user_id:this.$cookie.getCookie('u_id'),
                name:this.oneAsk,
                area:3,
                ans1:this.threeAsk,
                ans2:this.fourAsk,
                ans3:this.fiveAsk,
                pic1:this.pic1,
                ans4:this.sevenAsk,
                ans5:this.eightAsk,
                ans6:this.nineAsk
              }).then( res => {
                this.$router.push({
                  path:'/twoQuestion',
                  query:{
                    Bid:res.data.data
                  }
                });
              })
            }
          }
          // 化工&医药 外购
          if( this.serial == '4'&&this.find == '1') {
            if(this.threeAsk == '') {
              this.tip('error','请描述现有技术的优点和缺点？')
            }else if (this.fourAsk == ''){
              this.tip('error','您的发明所需解决的问题及目的？')
            }else if (this.fiveAsk == '') {
              this.tip('error','请描述其工作原理及实现方式')
            }else if (this.name1 == '') {
              this.tip('error','上传化学方程式')
            }else if (this.sevenAsk == '') {
              this.tip('error','请描述该结构的改进带来的有益效果，如增韧')
            }else if (this.eightAsk == '') {
               this.tip('error','请输入为了实现发明目的的具体实施方案')
            }else if (this.nineAsk == '') {
              this.tip('error','请输入是否还有别的替代方案同样能完成此发明目的')
            }else {
              this.$http.post(this.GLOBAL.base_url+'/api/patent/answer',{
                user_id:this.$cookie.getCookie('u_id'),
                name:this.oneAsk,
                area:4,
                ans1:this.threeAsk,
                ans2:this.fourAsk,
                ans3:this.fiveAsk,
                pic1:this.pic1,
                ans4:this.sevenAsk,
                type:1,
                ans5:this.eightAsk,
                ans6:this.nineAsk
              }).then( res => {
                this.$router.push({
                  path:'/twoQuestion',
                  query:{
                    Bid:res.data.data
                  }
                });
              })
            }
          }
          // 化工&医药 研发
          if( this.serial == '4'&&this.find == '2') {
            if(this.threeAsk == '') {
              this.tip('error','请描述现有技术的优点和缺点？')
            }else if (this.fourAsk == ''){
              this.tip('error','您的发明所需解决的问题及目的？')
            }else if (this.fiveAsk == '') {
              this.tip('error','请描述其工作原理及实现方式')
            }else if (this.name1 == '') {
              this.tip('error','上传化学方程式')
            }else if (this.sevenAsk == '') {
              this.tip('error','请描述该结构的改进带来的有益效果，如增韧')
            }else if (this.outsourcing1 == '') {
               this.tip('error','请描述该结构的工作原理及实现方式')
            }else if (this.name2 == '') {
              this.tip('error','请上传产品结构图纸')
            }else if (this.outsourcing2 == '') {
              this.tip('error','请描述该结构改进带来的有益效果，如产能、质量、精度的提高，效率的增加')
            }else if (this.outsourcing3 == '') {
              this.tip('error','请为了实现发明目的的具体实施方案')
            }else if (this.outsourcing4 == '') {
              this.tip('error','请问是否还有别的替代方案同样能完成此发明目的')
            }else {
              this.$http.post(this.GLOBAL.base_url+'/api/patent/answer',{
                user_id:this.$cookie.getCookie('u_id'),
                name:this.oneAsk,
                area:4,
                ans1:this.threeAsk,
                ans2:this.fourAsk,
                ans3:this.fiveAsk,
                pic1:this.pic1,
                ans4:this.sevenAsk,
                type:2,
                ans5:this.outsourcing3,
                ans6:this.outsourcing4,
                ans7:this.outsourcing1,
                ans8:this.outsourcing2,
                pic2:this.pic2
              }).then( res => {
                this.$router.push({
                  path:'/twoQuestion',
                  query:{
                    Bid:res.data.data
                  }
                });
              })
            }
          }
          // 半导体芯片布图设计
          if(this.serial == '5') {
            if(this.threeAsk == '') {
              this.tip('error','请描述现有技术的优点和缺点？')
            }else if (this.fourAsk == ''){
              this.tip('error','您的发明所需解决的问题及目的？')
            }else if (this.fiveAsk == '') {
              this.tip('error','请描述其工作原理及实现方式')
            }else if (this.name1 == '') {
              this.tip('error','上传集成电路布局图')
            }else if (this.sevenAsk == '') {
              this.tip('error','请描述该方法的有益效果或优点')
            }else if (this.eightAsk == '') {
               this.tip('error','请输入为了实现发明目的的具体实施方案')
            }else if (this.nineAsk == '') {
              this.tip('error','请输入是否还有别的替代方案同样能完成此发明目的')
            }else {
              this.$http.post(this.GLOBAL.base_url+'/api/patent/answer',{
                user_id:this.$cookie.getCookie('u_id'),
                name:this.oneAsk,
                area:5,
                ans1:this.threeAsk,
                ans2:this.fourAsk,
                ans3:this.fiveAsk,
                pic1:this.pic1,
                ans4:this.sevenAsk,
                ans5:this.eightAsk,
                ans6:this.nineAsk
              }).then( res => {
                this.$router.push({
                  path:'/twoQuestion',
                  query:{
                    Bid:res.data.data
                  }
                });
              })
            }
          }
        }
      },
    },
    watch:{
      'find'(newValue) {
        if(this.find == '1') {
          this.outsourcing = true
        }else{
          this.outsourcing = false
        }
      },
      'serial'(newValue) {
        if(this.serial == 4) {
          this.five_show1 = false
          this.five_show2 = false
          this.five_show3 = false
          this.five_show4 = true
          this.five_show5 = false
          this.five_show6 = false
        }
      }
    },
    mounted(){
      this.$http.post(this.GLOBAL.base_url+'/api/patent/answerDetails',{
        user_id:this.$cookie.getCookie('u_id'),
        id:this.$route.query.Bid
      }).then(res => {
        // console.log(res)
        if(res.data.code == 1) {
          this.oneAsk = res.data.data.name
          this.serial = res.data.data.area
          this.threeAsk = res.data.data.pcons
          this.fourAsk = res.data.data.quepro
          this.fiveAsk = res.data.data.details
          this.name1 = res.data.data.imgs
          this.sevenAsk = res.data.data.benefit
          this.eightAsk = res.data.data.plan
          this.nineAsk = res.data.data.instead
          if(res.data.data.source == 1) {
            this.find = res.data.data.source
          }
          if(res.data.data.source == 2) {
            this.find = res.data.data.source
            this.outsourcing1 = res.data.data.ji_details
            this.outsourcing2 = res.data.data.ji_benefit
            this.name2 = res.data.data.imgss
            this.outsourcing3 =  res.data.data.plan
            this.outsourcing4 = res.data.data.instead
          }
        }
      })
    }
  }
</script>

<style scoped>
  .editQuestion-box {
    background-color:#fcfcfc;
  }
  .editQuestion-box-big {
    width: 1200px;
    margin: 0 auto;
    padding-top: 30px;
    box-sizing: border-box;
    /* height: 5000px; */
    padding-bottom: 68px;
  }
  .editQuestion-box-big-one {
    background-color: #fff;
    box-shadow: 3px 5px 19px -1px rgba(217, 217, 217, 0.5);
    text-align: center;
    padding-top: 24px;
    box-sizing: border-box;
    position: relative;
    padding-bottom: 1px;
  }
  .editQuestion-box-big-two {
    /* height: 373px; */
    background-color: #fff;
    box-shadow: 3px 5px 19px -1px rgba(217, 217, 217, 0.5);
    text-align: center;
    padding-top: 48px;
    box-sizing: border-box;
    /* position: relative; */
    padding-bottom: 1px;
  }
  .editQuestion-box-big-one > p:nth-child(1) {
    font-family: "PingFangSC";
    font-size: 36px;
    font-weight: 600;
    color: #333;
    margin-bottom: 12px;
  }
  .editQuestion-box-big-one > p:nth-child(2) {
    font-family: "PingFangSC";
    font-size: 14px;
    font-weight: normal;
    color:#5b5b5b;
    margin-bottom: 40px;
  }
  .editQuestion-box-big-one > img {
    position: absolute;
    top:24px;
    right: 240px;
    height: 82px;
    width: 67px;
  }
  .editQuestion-box-big-title {
    margin: 48px 0 0px;
    text-align: center;
    font-family: "PingFangSC";
    font-size: 28px;
    font-weight: normal;
    color: #333;
    padding-bottom:32px
  }
  /* 第一问 */
  .editQuestion-box-big-two > input[type=text] {
    width: 948px;
    height: 80px;
    border-radius: 4px;
    outline: none;
    border: none;
    border: 1px solid #d6d6d6;
    padding: 24px 0px 24px 36px;
    box-sizing: border-box;
    font-family: "PingFangSC";
    font-size: 24px;
    font-weight: normal;
    color: #333;
    margin-bottom: 64px;
  }
  input::-webkit-input-placeholder,textarea::-webkit-input-placeholder{
    color:#999;
  }

  /* 第二问 */
  .editQuestion-box-big-two > select {
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
    margin-bottom: 64px;
    background: url(/static/images/2227.png)  no-repeat scroll right 24px center transparent;
  }
  /* 第三问 */
  .editQuestion-box-big-three {
    /* height: 388px; */
    background-color: #fff;
    box-shadow: 3px 5px 19px -1px rgba(217, 217, 217, 0.5);
    text-align: center;
    padding-top: 48px;
    box-sizing: border-box;
    position: relative;
    padding-bottom: 1px;
  }
  .editQuestion-box-big-three > textarea {
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
    margin-bottom: 64px;
  }
  .editQuestion-box-big-one > label {
    width: 88px;
    height: 40px;
    display: block;
    background: url(/static/images/202228.png);
    position: absolute;
    top: 48px;
    right: 126px;
  }
  .editQuestion-box-big-one > input {
    width: 948px;
    height: 40px;
    line-height: 40px;
    padding-left: 8px;
    box-sizing: border-box;
    border: solid 1px #d6d6d6;
    font-family: "PingFangSC";
    font-size: 16px;
    color: #999999;
    border-radius: 4px;
    margin-top: 24px;
    margin-bottom: 64px;
  }
  .editQuestion-box-big-title > span:nth-child(1) {
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
  .editQuestion-box-big-title > span:nth-child(2) {
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
  .editQuestion-box-big-one > input[type=radio] {
    width: 16px;
    height: 16px;
    vertical-align: middle;
    margin-right: 16px;
  }
  .editQuestion-box-big-one >span {
    margin-top: -40px;
    display: inline-block;
    vertical-align: middle;
    color: #333;
    font-family: "PingFangSC";
    font-size: 18px;
    font-weight: normal;
  }
  .editQuestion-box-big-one >span:nth-child(2) {
    margin-right: 312px;
  }
  .mtn {
    margin-top: 0px;
  }
  input[disabled] {
    background: #fff;
  }
  .pb68 {
    padding-bottom: 68px;
  }
  .next {
    margin:0 auto;
    width: 214px;
    height: 54px;
    line-height: 54px;
    text-align: center;
    border-radius: 4px;
    background-color: #f96006;
    color: #fff;
    cursor: pointer;
    margin-bottom: 63px;
  }
</style>
