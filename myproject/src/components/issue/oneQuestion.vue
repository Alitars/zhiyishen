<template>
  <div class="oneQuestion">
    <Top></Top>
    <Fix></Fix>
    <div class="oneQuestion-box">
      <div class="oneQuestion-box-big">
        <div class="oneQuestion-box-big-one">
          <p>人工智能技术交底书撰写</p>
          <p>免费撰写技术交底书</p>
          <img src="/static/images/xiaoguo.png" alt="">
        </div>
        <!-- 第一问 -->
        <div class="oneQuestion-box-big-title">请输入发明创造的名称</div>
        <div class="oneQuestion-box-big-two">
          <input type="text" placeholder="例如：T恤，运动裤" v-model="oneAsk">
          <p @click="oneStep" class="next" v-show="show1">下一步</p>
        </div>
        <!-- 第二问 -->
        <div class="oneQuestion-box-big-title" v-show="twoshow">选择你的技术领域</div>
        <div class="oneQuestion-box-big-two" v-show="twoshow">
          <select name="" id="" v-model="serial" @change="choseCompany">
            <option :value="v.serial" v-for="(v,k) in companytype" :key="k">{{v.difftype}}</option>
          </select>
          <p @click="twoStep" class="next" v-show="show2">下一步</p>
          <div></div>
        </div>
        <!-- 第三问 -->
        <div class="oneQuestion-box-big-title" v-show="threeShow">请描述现有技术的优点和缺点？</div>
        <div class="oneQuestion-box-big-three" v-show="threeShow">
          <textarea v-model="threeAsk" name="" id=""  style="height: 276px; width: 948px;" placeholder="请做简单的描述"></textarea>
          <p @click="threeStep" class="next" v-show="show3">下一步</p>
        </div>
        <!-- 第四问 -->
        <div class="oneQuestion-box-big-title" v-show="fourShow">您的发明所需解决的问题及目的？</div>
        <div class="oneQuestion-box-big-three" v-show="fourShow">
          <textarea v-model="fourAsk" name="" id=""  style="height: 276px; width: 948px;" placeholder="请做简单的描述"></textarea>
          <p @click="fourStep" class="next" v-show="show4">下一步</p>
        </div>
        <!-- 第五问 -->
          <!-- 机械 -->
          <div class="oneQuestion-box-big-title" v-show="five_show1&&fiveShow">通过产品结构图纸中的主要零部件及连接关系</div>
          <div class="oneQuestion-box-big-title mtn" v-show="five_show1&&fiveShow">描述该结构的工作原理及实现方式，如需帮助请点击示例查看。</div>
          <!-- 电子 -->
          <div class="oneQuestion-box-big-title" v-show="five_show2&&fiveShow">通过电路图中主要功能模块及连接关系，</div>
          <div class="oneQuestion-box-big-title mtn" v-show="five_show2&&fiveShow">描述该电路图的工作原理及实现方式，如需帮助请点击示例查看</div>
          <!-- 软件系统 -->
          <div class="oneQuestion-box-big-title" v-show="five_show3&&fiveShow">通过流程图、原理框图、时序图或算法公式等</div>
          <div class="oneQuestion-box-big-title mtn" v-show="five_show3&&fiveShow">描述其工作原理及实现方式；如需帮助请点击示例查看</div>
          <!-- 化工&医药 -->
          <div class="oneQuestion-box-big-title" v-show="five_show4&&fiveShow">通过所述产品的配比配方、化学方程式、生产流程和工艺等</div>
          <div class="oneQuestion-box-big-title mtn" v-show="five_show4&&fiveShow">描述其工作原理及实现方式；如需帮助请点击示例查看</div>
          <!-- 半导体芯片布图设计 -->
          <div class="oneQuestion-box-big-title" v-show="five_show5&&fiveShow">通过集成电路布图设计描述其层级设计以及层级间的连接关系</div>
          <div class="oneQuestion-box-big-title mtn" v-show="five_show5&&fiveShow">描述其工作原理及实现方式；如需帮助请点击示例查看</div>
          <!-- 生物基因 -->
          <!-- <div class="oneQuestion-box-big-title" v-show="five_show6">通过所述产品的配比配方、化学方程式、生产流程和工艺等</div> -->
          <!-- <div class="oneQuestion-box-big-title mtn" v-show="five_show6">描述其工作原理及实现方式；如需帮助请点击示例查看</div> -->
        <div class="oneQuestion-box-big-three" v-show="fiveShow">
          <textarea v-model="fiveAsk" name="" id=""  style="height: 276px; width: 948px;" placeholder="请做简单的描述" ></textarea>
          <p @click="fiveStep" class="next" v-show="show5">下一步</p>
        </div>
        <!-- 第六问 -->
          <!-- 机械 -->
          <div class="oneQuestion-box-big-title" v-show="five_show1&&sixShow">上传产品结构图纸</div>
          <!-- 电子 -->
          <div class="oneQuestion-box-big-title" v-show="five_show2&&sixShow">上传电路图、方块图等</div>
          <!-- 软件系统 -->
          <div class="oneQuestion-box-big-title" v-show="five_show3&&sixShow">上传该方法的流程图、原理框图、时序图</div>
          <!-- 化工&医药 -->
          <div class="oneQuestion-box-big-title" v-show="five_show4&&sixShow">上传化学方程式</div>
          <!-- 半导体芯片布图设计 -->
          <div class="oneQuestion-box-big-title" v-show="five_show5&&sixShow">上传集成电路布局图</div>
          <!-- 生物基因 -->
          <!-- <div class="oneQuestion-box-big-title" v-show="five_show6">上传化学方程式</div> -->
        <div class="oneQuestion-box-big-one" v-show="sixShow">
          <input type="text" v-model="name1" disabled="disabled">
          <label for="fileNone"></label>
          <input @change="update($event)" v-if="clearShow" type="file" id="fileNone" ref="file" style="display:none;" >
          <p @click="sixStep" class="next" v-show="show6">下一步</p>
        </div>
        <!-- 第七问 -->
          <!-- 机械 -->
          <div class="oneQuestion-box-big-title" v-show="five_show1&&sevenShow">请描述该结构改进带来的有益效果，如产能、质量、精度的提高，效率的增加</div>
          <!-- 电子 -->
          <div class="oneQuestion-box-big-title" v-show="five_show2&&sevenShow">请描述该结构的改进带来的有益效果，如稳压</div>
          <!-- 软件系统 -->
          <div class="oneQuestion-box-big-title" v-show="five_show3&&sevenShow">请描述该方法的有益效果或优点</div>
          <!-- 化工&医药 -->
          <div class="oneQuestion-box-big-title" v-show="five_show4&&sevenShow">请描述该结构的改进带来的有益效果，如增韧</div>
          <!-- 半导体芯片布图设计 -->
          <div class="oneQuestion-box-big-title" v-show="five_show5&&sevenShow">请描述该方法的有益效果或优点</div>
          <!-- 生物基因 -->
          <!-- <div class="oneQuestion-box-big-title" v-show="five_show6">请描述该结构的改进带来的有益效果，如增韧</div> -->
        <div class="oneQuestion-box-big-three" v-show="sevenShow">
          <textarea v-model="sevenAsk" name="" id=""  style="height: 276px; width: 948px;" placeholder="请做简单的描述"></textarea>
          <p @click="sevenStep" class="next" v-show="show7">下一步</p>
        </div>
        <!-- 化工&医药选择 -->
        <div class="oneQuestion-box-big-title" v-show="five_show4&&eightShow">请问该生产工艺的生产设备是研发的，还是外购的</div>
        <div class="oneQuestion-box-big-one" v-show="five_show4&&eightShow">
          <input type="radio" value="1" v-model="find" name="invoice">
          <span>外购</span>
          <input type="radio" value="2" v-model="find" name="invoice">
          <span>研发</span>
          <p @click="medicineStep" class="next" v-show="show9">下一步</p>
        </div>
        <!-- 第八问 -->
        <div class="oneQuestion-box-big-title" v-show="eightShow&&show10">为了实现发明目的的具体实施方案，如须帮助请点击示例查看</div>
        <div class="oneQuestion-box-big-three" v-show="eightShow&&show10">
          <textarea v-model="eightAsk" name="" id=""  style="height: 276px; width: 948px;" placeholder="请做简单的描述"></textarea>
          <p @click="eightStep" class="next" v-show="show8">下一步</p>
        </div>
        <!-- 第九问 -->
        <div class="oneQuestion-box-big-title" v-show="outsourcing&&nineShow">请问是否还有别的替代方案同样能完成此发明目的，如须帮助请点击示例查看</div>
        <div class="oneQuestion-box-big-three" v-show="outsourcing&&nineShow">
          <textarea v-model=" nineAsk" name="" id=""  style="height: 276px; width: 948px;" placeholder="请做简单的描述"></textarea>
        </div>
        <!-- 化工&医药选择 -- 研发 -->
        <div class="oneQuestion-box-big-title" v-show="!outsourcing&&medicineShow">通过产品结构图纸中的主要零部件及连接关系</div>
        <div class="oneQuestion-box-big-title mtn" v-show="!outsourcing&&medicineShow">描述该结构的工作原理及实现方式，如需帮助请点击示例查看</div>
        <div class="oneQuestion-box-big-three" v-show="!outsourcing&&medicineShow">
          <textarea v-model="outsourcing1" name="" id=""  style="height: 276px; width: 948px;" placeholder="请做简单的描述"></textarea>
          <p @click="step1" class="next" v-show="show11">下一步</p>
        </div>
        <!--  -->
        <div class="oneQuestion-box-big-title" v-show="!outsourcing&&step1Show">上传产品结构图纸</div>
        <div class="oneQuestion-box-big-one" v-show="!outsourcing&&step1Show">
          <input type="text" v-model="name2" disabled="disabled">
          <label for="fileNone1"></label>
          <input @change="update1" type="file" id="fileNone1"  style="display:none;" >
          <p @click="step2" class="next" v-show="show12">下一步</p>
        </div>
        <!--  -->
        <div class="oneQuestion-box-big-title" v-show="!outsourcing&&step5Show">请描述该结构改进带来的有益效果，如产能、质量、精度的提高，效率的增加</div>
        <div class="oneQuestion-box-big-three" v-show="!outsourcing&&step5Show">
          <textarea v-model="outsourcing2" name="" id=""  style="height: 276px; width: 948px;" placeholder="请做简单的描述"></textarea>
          <p @click="step5" class="next" v-show="show15">下一步</p>
        </div>
        <!--  -->
        <div class="oneQuestion-box-big-title" v-show="!outsourcing&&step3Show">为了实现发明目的的具体实施方案，如须帮助请点击示例查看</div>
        <div class="oneQuestion-box-big-three" v-show="!outsourcing&&step3Show">
          <textarea v-model="outsourcing3" name="" id=""  style="height: 276px; width: 948px;" placeholder="请做简单的描述"></textarea>
          <p @click="step3" class="next" v-show="show13">下一步</p>
        </div>
        <!--  -->
        <div class="oneQuestion-box-big-title" v-show="!outsourcing&&step4Show">请问是否还有别的替代方案同样能完成此发明目的，如须帮助请点击示例查看</div>
        <div class="oneQuestion-box-big-three" v-show="!outsourcing&&step4Show">
          <textarea v-model="outsourcing4" name="" id=""  style="height: 276px; width: 948px;" placeholder="请做简单的描述"></textarea>
        </div>
        <!-- 提交 -->
        <div class="oneQuestion-box-big-title" v-show="nineShow">
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
    name:'oneQuestion',
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
          // 第二问显示隐藏
          twoshow:false,
          // 第三问
          threeShow:false,
          // 第四问
          fourShow:false,
          // 第五问
          fiveShow:false,
          // 第六问
          sixShow:false,
          // 第七问
          sevenShow:false,
          // 第八问
          eightShow:false,
          eightShow1:false,
          nineShow:false,
          show1:true,
          show2:true,
          show3:true,
          show4:true,
          show5:true,
          show6:true,
          show7:true,
          show8:true,
          // 医药
          medicineShow:false,
          step1Show:false,
          step3Show:false,
          step4Show:false,
          step5Show:false,
          show9:true,
          show10:true,
          show11:true,
          show12:true,
          show13:true,
          show14:true,
          show15:true,
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
          this.show10 = true
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
          this.show10 = true
        }
        if(this.serial == '3') {
          // 第五问
          this.five_show1 = false
          this.five_show2 = false
          this.five_show3 = true
          this.five_show4 = false
          this.five_show5 = false
          this.show10 = true
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
          this.show10 = false
          this.nineShow = false
          this.show8 = true
        }
        if(this.serial == '5') {
          // 第五问
          this.five_show1 = false
          this.five_show2 = false
          this.five_show3 = false
          this.five_show4 = false
          this.five_show5 = true
          this.five_show6 = false
          this.show10 = true

        }
        if(this.serial == '6') {
          // 第五问
          this.five_show1 = false
          this.five_show2 = false
          this.five_show3 = false
          this.five_show4 = false
          this.five_show5 = false
          this.five_show6 = true
          this.show10 = true

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
        if(formData.get('url_img') !=  "undefined" ) {
          this.name2 = formData.get('url_img').name
          let config = {
            headers:{'Content-Type':'multipart/form-data'}
          };
          this.$http.post(this.GLOBAL.base_url+'/api/BrandUpload/brandUploadFile',formData).then( res => {
            // console.log(res)
            if(res.data.code == '1') {
              this.pic2 = res.data.filepath
            }
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
      oneStep() {
        if(this.oneAsk == '') {
          this.tip('error','请输入名称')
        }else {
          this.twoshow = true
          this.show1 =false
        }
      },
      twoStep() {
        this.threeShow =true
        this.show2 =false
      },
      threeStep() {
        if(this.threeAsk == '') {
          this.tip('error','请输入现有技术的优点和缺点？')
        }else {
          this.fourShow =true
          this.show3 =false
        }
      },
      fourStep() {
        if(this.fourAsk == '') {
          this.tip('error','请输入发明所需解决的问题及目的？')
        }else {
          this.fiveShow =true
          this.show4 =false
        }
      },
      fiveStep() {
        if(this.fiveAsk == '') {
          this.tip('error','此项不能为空')
        }else {
          this.sixShow =true
          this.show5 =false
        }
      },
      sixStep() {
        if(this.name1 == '') {
          this.tip('error','请上传文件')
        }else {
          this.sevenShow =true
          this.show6 =false
        }
      },
      sevenStep() {
        if(this.sevenAsk == '') {
          this.tip('error','此项不能为空')
        }else{
          this.eightShow =true
          this.show7 =false
        }
      },
      eightStep() {
        if(this.eightAsk == '') {
          this.tip('error','此项不能为空')
        }else {
          this.nineShow =true
          this.show8 =false
        }
      },
      medicineStep() {
        if(this.find == '2') {
          this.medicineShow = true
          this.show9 =false
        }else{
          this.eightShow = true
          this.show10 = true
          this.show9 = false
          this.show8 = true
        }
      },
      step1() {
        if(this.outsourcing1 == '') {
          this.tip('error','此项不能为空')
        }else{
          this.step1Show = true
          this.show11 = false
        }
      },
      step2() {
        if(this.name2 == '') {
          this.tip('error','上传产品结构图纸')
        }else{
          this.step5Show = true
          this.show12 = false
        }
      },
      step5() {
        if(this.outsourcing2 == '') {
          this.tip('error','请描述该结构改进带来的有益效果')
        }else{
          this.step3Show = true
          this.show15 = false
        }
      },
      step3() {
        if(this.outsourcing3 == '') {
          this.tip('error','请输入具体实施方案')
        }else{
          this.step4Show = true
          this.show13 = false
          this.nineShow = true
        }
      },
    },
    watch:{
      'find'(newValue) {
        if(this.find == '1') {
          this.outsourcing = true
          this.show9 = true
          this.nineShow = false
        }else{
          this.outsourcing = false
          this.show10 =false
          this.show9 = true
          this.step1Show = false
          this.step5Show = false
          this.step3Show = false
          this.step4Show = false
          this.medicineShow = false
          this.nineShow = false
        }
      },
      'serial'(val,oldval) {
        // console.log(val,oldval)
        if(this.val != oldval) {
          // console.log(val,oldval,1)
          this.show2 = true
          this.threeShow = false
          this.threeAsk = ''
          this.fourAsk = ''
          this.fiveAsk = ''
          this.name1 = ''
          this.sevenAsk = ''
          this.eightAsk = ''
          this.nineAsk = ''
          this.outsourcing1 = ''
          this.outsourcing2 = ''
          this.outsourcing3 = ''
          this.outsourcing4 = ''
          this.name2 = ''
          this.fourShow = false
          this.fiveShow = false
          this.sixShow = false
          this.sevenShow = false
          this.eightShow1 = false
          this.nineShow = false
          this.eightShow = false
          this.sixShow = false
          this.step1Show = false
          this.step5Show = false
          this.step3Show = false
          this.step4Show = false
          this.medicineShow = false
          this.show3 = true
          this.show4 = true
          this.show5 = true
          this.show6 = true
          this.show7 = true
          this.show8 = true
          this.show9 = true
          this.show15 = true
          this.show13 = true
          this.show12 = true
          this.show11 = true
        }
      }
    }
  }
</script>

<style scoped>
  .oneQuestion-box {
    background-color:#fcfcfc;
    min-height: 692px;
  }
  .oneQuestion-box-big {
    width: 1200px;
    margin: 0 auto;
    padding-top: 30px;
    box-sizing: border-box;
    /* height: 5000px; */
    padding-bottom: 68px;
  }
  .oneQuestion-box-big-one {
    background-color: #fff;
    box-shadow: 3px 5px 19px -1px rgba(217, 217, 217, 0.5);
    text-align: center;
    padding-top: 24px;
    box-sizing: border-box;
    position: relative;
    padding-bottom: 1px;
  }
  .oneQuestion-box-big-two {
    /* height: 373px; */
    background-color: #fff;
    box-shadow: 3px 5px 19px -1px rgba(217, 217, 217, 0.5);
    text-align: center;
    padding-top: 48px;
    box-sizing: border-box;
    /* position: relative; */
    padding-bottom: 1px;
  }
  .oneQuestion-box-big-one > p:nth-child(1) {
    font-family: "PingFangSC";
    font-size: 36px;
    font-weight: 600;
    color: #333;
    margin-bottom: 12px;
  }
  .oneQuestion-box-big-one > p:nth-child(2) {
    font-family: "PingFangSC";
    font-size: 14px;
    font-weight: normal;
    color:#5b5b5b;
    margin-bottom: 40px;
  }
  .oneQuestion-box-big-one > img {
    position: absolute;
    top:24px;
    right: 240px;
    height: 82px;
    width: 67px;
  }
  .oneQuestion-box-big-title {
    margin: 48px 0 0px;
    text-align: center;
    font-family: "PingFangSC";
    font-size: 28px;
    font-weight: normal;
    color: #333;
    padding-bottom:32px
  }
  /* 第一问 */
  .oneQuestion-box-big-two > input[type=text] {
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
  .oneQuestion-box-big-two > select {
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
  .oneQuestion-box-big-three {
    /* height: 388px; */
    background-color: #fff;
    box-shadow: 3px 5px 19px -1px rgba(217, 217, 217, 0.5);
    text-align: center;
    padding-top: 48px;
    box-sizing: border-box;
    position: relative;
    padding-bottom: 1px;
  }
  .oneQuestion-box-big-three > textarea {
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
  .oneQuestion-box-big-one > label {
    width: 88px;
    height: 40px;
    display: block;
    background: url(/static/images/202228.png);
    position: absolute;
    top: 48px;
    right: 126px;
  }
  .oneQuestion-box-big-one > input {
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
  .oneQuestion-box-big-title > span:nth-child(1) {
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
  .oneQuestion-box-big-title > span:nth-child(2) {
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
  .oneQuestion-box-big-one > input[type=radio] {
    width: 16px;
    height: 16px;
    vertical-align: middle;
    margin-right: 16px;
  }
  .oneQuestion-box-big-one >span {
    margin-top: -40px;
    display: inline-block;
    vertical-align: middle;
    color: #333;
    font-family: "PingFangSC";
    font-size: 18px;
    font-weight: normal;
  }
  .oneQuestion-box-big-one >span:nth-child(2) {
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
