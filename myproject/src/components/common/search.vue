<template>
  <div id="search">
      <Top></Top>
      <Fix></Fix>
      <div class="search-box">
        <div class="search-box-top">
            <span>商标搜索</span>
            <input type="text" v-model="word"><img src="/static/images/searchbutton.png" alt="" @click="search">
        </div>
        <div class="search-box-title">
            <div :class="chose">
                <div class="div1" @click="findtrade('excat')">精准商标</div>
                <div class="div2" @click="findtrade('like')">近似商标</div>
                <div class="div3" @click="findtrade('apply')">申请人</div>
                <div class="div4" @click="findtrade('num')">注册号</div>
            </div>
        </div>
        <div class="search-box-middle">
            <div class="search-box-middle-condition">
                <div class="search-box-middle-condition-div1">
                    <div>筛选条件</div>
                    <div>
                        <div v-for="(v,k) in choose1" @click="remove(k,v.id)">
                            {{v.name}}
                            <a href="javascript:;">x</a>
                        </div>
                        <div v-for="(v,k) in choose2" @click="removelay(k,v)">
                            {{v}}
                            <a href="javascript:;">x</a>
                        </div>
                        <div v-if="time1" @click="removetime">
                            {{time1}}
                            <a href="javascript:;">x</a>
                        </div>
                    </div>
                    <div style="clear:both"></div>
                </div>
                <div class="search-box-middle-condition-div2">
                    <div>类别</div>
                    <div class="type1" :class="{ 'active1':style1 }">
                        <div v-for="(v,k) in list1" @click="addtype(v,k,v.id)" :class="{seActive: isTags(v.id)}">{{v.name}}</div>
                    </div>
                    <div @click="show1">更多</div>
                    <div style="clear:both"></div>
                </div>
                <!-- <div class="search-box-middle-condition-div3">
                    <div>商标状态</div>
                    <div class="type2" :class="{ 'active2':style2 }">
                        <div v-for="(v,k) in list2" @click="addlayw(v,k)" :class="{seActive: isTags2(v)}">{{v}}</div>
                    </div>
                    <div @click="show2">更多</div>
                    <div style="clear:both"></div>
                </div> -->
                <!-- <div class="search-box-middle-condition-div4">
                    <div class="nian">申请年份</div>
                    <div class="input-box" :="look">
                        <input type="number" v-model="year1" placeholder="1975">
                        <span>至</span>
                        <input type="number" v-model="year2" placeholder="2019">
                    </div>
                    <div class="confire" @click="que">确定</div>
                    <div class="tip">{{tip}}</div>
                </div> -->
            </div>
            <div class="search-box-detail">
                <div class="search-box-detail-total">检索到“{{word}}”相关的商标<span>{{total}}</span>个</div>
                <div v-show="exist">
                    <div class="search-box-detail-box" v-for="(v,k) in list">
                        <div class="search-box-detail-box-img">
                            <img :src="v.BrandImg?v.BrandImg:'/static/images/no.png'" alt="">
                        </div>
                        <div class="search-box-detail-box-des">
                            <div class="search-box-detail-box-de-div1">
                                <div>{{v.Sbmc}}</div>
                                <div>
                                    <span class="span1">申请人:</span>
                                    <span class="search-box-detail-box-de-div1-span2">{{v.AppNewName}}</span>
                                </div>
                                <div>
                                    <span class="span1">申请日期:</span>
                                    <span class="search-box-detail-box-de-div1-span2">{{v.AppDate}}</span>
                                </div>
                            </div>
                            <div class="search-box-detail-box-de-div2">
                                <div>
                                    <span class="span1">当前状态:</span>
                                    <span class="span3">{{v.BrandStatus}}</span>
                                </div>
                                <div>
                                    <span class="span1">申请/注册号:</span>
                                    <span class="search-box-detail-box-de-div2-span2">{{v.RegId}}</span>
                                </div>
                                <div>
                                    <span class="span1">初审公告日期:</span>
                                    <span class="search-box-detail-box-de-div2-span2">{{v.PreAnnouncementDate}}</span>
                                </div>
                            </div>
                            <div class="search-box-detail-box-de-div3">
                                <div>
                                    <span class="span1">商品类别:</span>
                                    <span class="search-box-detail-box-de-div3-span2">{{v.IntCls}}</span>
                                </div>
                                <div>
                                    <span class="span1">注册公告日期:</span>
                                    <span class="search-box-detail-box-de-div3-span2">{{v.Ggdate}}</span>
                                </div>
                            </div>
                        </div>
                        <div class="search-box-detail-box-do">
                            <p id="p1" @click="tosearchdetail(v.RegId,v.IntCls)">查看详情</p>
                            <!-- <p>关注商标 ></p>
                            <p>购买商标 ></p> -->
                        </div>
                    </div>
                    <div class="search-page">
                            <el-pagination
                                @size-change="handleSizeChange"
                                @current-change="handleCurrentChange"
                                :current-page="currentPage1"
                                :page-size="pageSize"
                                layout="prev, pager, next"
                                :total="total">
                            </el-pagination>
                        </div>
                </div>
                <div class="search-box-nodata" v-show="!exist">
                    <img src="static/images/nosearch.png" alt="">
                    <div>未能检测到您要查询的商标</div>
                    <!-- <div>申请注册</div> -->
                </div>
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
  name: 'search',
  data(){
      return{
          chose:'excat',
          style1:false,
          style2:false,
          list1:[{id:"01",name:"01类 化学原料"},{id:"02",name:"02类 颜料油漆"},{id:"03",name:"03类 日化用品"},{id:"04",name:"04类 燃料油脂"},{id:"05",name:"05类 医药"},
          {id:"06",name:"06类 金属材料"},{id:"07",name:"07类 机械设备"},{id:"08",name:"08类 手工器械"},{id:"09",name:"09类 科学仪器"},{id:"10",name:"10类 医疗器械"},
          {id:"11",name:"11类 灯具空调"},{id:"12",name:"12类 运输工具"},{id:"13",name:"13类 军火烟火"},{id:"14",name:"14类 珠宝钟表"},{id:"15",name:"15类 乐器"},
          {id:"16",name:"16类 办公用品"},{id:"17",name:"17类 橡胶制品"},{id:"18",name:"18类 皮革皮具"},{id:"19",name:"19类 建筑材料"},{id:"20",name:"20类 家具"},
          {id:"21",name:"21类 厨房洁具"},{id:"22",name:"22类 绳网袋蓬"},{id:"23",name:"23类 纱线丝"},{id:"24",name:"24类 布料床单"},{id:"25",name:"25类 服装鞋帽"},
          {id:"26",name:"26类 钮扣拉链"},{id:"27",name:"27类 地毯席垫"},{id:"28",name:"28类 健身器材"},{id:"29",name:"29类 食品"},{id:"30",name:"30类 方便食品"},
          {id:"31",name:"31类 农林生鲜"},{id:"32",name:"32类 啤酒饮料"},{id:"33",name:"33类 酒"},{id:"34",name:"34类 烟草烟具"},{id:"35",name:"35类 广告销售"},
          {id:"36",name:"36类 金融物管"},{id:"37",name:"37类 建筑修理"},{id:"38",name:"38类 通讯服务"},{id:"39",name:"39类 运输贮藏"},{id:"40",name:"40类 材料加工"},
          {id:"41",name:"41类 教育娱乐"},{id:"42",name:"42类 科技服务"},{id:"43",name:"43类 餐饮住宿"},{id:"44",name:"44类 医疗园艺"},{id:"45",name:"45类 社会服务"}],
          list2:["变更程序中","受理通知书发文","商标注册证","申请收文","初审公告",
          "异议程序中","已注册","商标质押登记","驳回复审中","公告被无效","商标续展",
          "转让程序中","驳回待复审","商标无效"],
          choose1:{},
          key:[],
          choose2:{},
          laykey:[],
          year1:'',
          year2:'',
          time1:'',
          time2:'',
          tip:'',
          cate_id:'',
          word:'',
          list:[],
          total:0,
          currentPage1: 1,
          pageSize: 10,
          exist:true
      }
  },
  components: {
      Top,
      Foot,
      Fix
  },
  computed:{
      look(){
          if(this.year1 == ''&&this.year2 == ''){
              this.tip = '';
          }
      }
  },
  methods:{
      show1(){
        this.style1 = !this.style1;
      },
      show2(){
        this.style2 = !this.style2;
      },
      addtype(v,k,value){
           this.$set(this.choose1,k,v);
           if(!this.key.includes(value)){
               this.key.push(value);
           }
           this.cate_id= this.key.join(',')
           this.currentPage1 = 1;
           this.getdata();
      },
      remove(k,value){
          this.$delete(this.choose1,k);
          for(var i = 0;i<this.key.length;i++){
              if(value == this.key[i]){
                  this.key.splice(i,1);
              }
          }
          this.cate_id= this.key.join(',')
          this.currentPage1 = 1;
          this.getdata();
      },
      isTags(tagId) {
        if (this.key.includes(tagId)) {
            return true;
        } else {
            return false;
        }
      },
      addlayw(v,k){
          this.$set(this.choose2,k,v);
          if(!this.laykey.includes(v)){
               this.laykey.push(v);
           }
      },
      removelay(k,v){
          this.$delete(this.choose2,k);
          for(var i = 0;i<this.laykey.length;i++){
              if(v == this.laykey[i]){
                  this.laykey.splice(i,1);
              }
          }
      },
      isTags2(tagId) {
        if (this.laykey.includes(tagId)) {
            return true;
        } else {
            return false;
        }
      },
      que(){
          if(this.year1 == ''&&this.year2 == ''){
              this.tip = "请输入年份"
              return false;
          }else if(this.year1 == ''&&this.year2 != ''){
              this.tip = "请输入初始年份"
              return false;
          }else if(this.year1 != ''&&this.year2 == ''){
              this.tip = "请输入截至年份"
              return false;
          }else if(this.year1.length!=4||this.year2.length!=4){
              this.tip = "请输入正确的年份"
              return false;
          }else{
              this.tip= '';
              this.time1 = this.year1+'-'+this.year2;
              this.time2 = this.year1+'-'+'01'+'-'+'01'+'至'+this.year2+'-'+'12'+'-'+'31';
              this.currentPage1 = 1;
              this.getdata();
          }
      },
      removetime(){
          this.tip= ''
          this.year1='';
          this.year2='';
          this.time1 = '';
          this.time2 = '';
          this.currentPage1 = 1;
          this.getdata();
      },
      findtrade(value){
          this.chose = value;
          this.currentPage1 = 1;
          if(this.chose == value){
              this.getdata();
          }
      },
      search(){
          this.getdata();
      },
      getdata(){
          if(this.chose == "excat"){
              if(this.time2 != ''){
                  this.$http.get(this.GLOBAL.base_url+'/app/getdata',{params:{
                         channelroad:1,
                    user_id:this.$cookie.getCookie('u_id'),
                        type:1,
                        date:this.time2,
                        cate_id:this.cate_id,
                        keywords:this.word,
                        size:10,
                        index:this.currentPage1
                    }}).then(res=>{
                        this.list = res.data.data;
                        this.total = res.data.others;
                        if(this.total == "0"){
                            this.exist = false
                        }else{
                            this.exist = true;
                            for(var i =0;i<this.list.length;i++){
                                this.list[i].BrandImg = 'data:image/png;base64,'+this.list[i].BrandImg
                            }
                            // for(var i = 0;i<this.list.length;i++){
                            //     for(var j = 0;j<this.list1.length;j++){
                            //         if(this.list[i].IntCls == this.list1[j].id){
                            //             this.list[i].IntCls = this.list1[j].name;
                            //         }
                            //     }
                            // }
                        }
                    })
              }else{
                  this.$http.get(this.GLOBAL.base_url+'/app/getdata',{params:{
                         channelroad:1,
                    user_id:this.$cookie.getCookie('u_id'),
                        type:1,
                        cate_id:this.cate_id,
                        keywords:this.word,
                        size:10,
                        index:this.currentPage1
                    }}).then(res=>{
                        this.list = res.data.data;
                        this.total = res.data.others;
                        if(this.total == "0"){
                            this.exist = false
                        }else{
                            this.exist = true;
                            for(var i =0;i<this.list.length;i++){
                                this.list[i].BrandImg = 'data:image/png;base64,'+this.list[i].BrandImg
                            }
                            // for(var i = 0;i<this.list.length;i++){
                            //     for(var j = 0;j<this.list1.length;j++){
                            //         if(this.list[i].IntCls == this.list1[j].id){
                            //             this.list[i].IntCls = this.list1[j].name;
                            //         }
                            //     }
                            // }
                        }
                    })
              }
          }
          if(this.chose == "like"){
              if(this.time2 != ''){
                  this.$http.get(this.GLOBAL.base_url+'/app/getdata',{params:{
                       channelroad:1,
                    user_id:this.$cookie.getCookie('u_id'),
                        type:2,
                        date:this.time2,
                        cate_id:this.cate_id,
                        keywords:this.word,
                        size:10,
                        index:this.currentPage1
                    }}).then(res=>{
                        this.list = res.data.data;
                        this.total = res.data.others;
                        if(this.total == "0"){
                            this.exist = false
                        }else{
                            this.exist = true;
                            for(var i =0;i<this.list.length;i++){
                                this.list[i].BrandImg = 'data:image/png;base64,'+this.list[i].BrandImg
                            }
                            // for(var i = 0;i<this.list.length;i++){
                            //     for(var j = 0;j<this.list1.length;j++){
                            //         if(this.list[i].IntCls == this.list1[j].id){
                            //             this.list[i].IntCls = this.list1[j].name;
                            //         }
                            //     }
                            // }
                        }
                    })
              }else{
                //   this.$http.get('http://51guolao.yiqibnb.com/app/getdata',{params:{
                //         type:2,
                //         cate_id:this.cate_id,
                //         keywords:this.word,
                //         size:10,
                //         index:this.currentPage1
                //     }}).then(res=>{
                //         this.list = res.data.data;
                //         this.total = res.data.others;
                //         if(this.total == "0"){
                //             this.exist = false
                //         }else{
                //             this.exist = true;
                //             for(var i =0;i<this.list.length;i++){
                //                 this.list[i].BrandImg = 'data:image/png;base64,'+this.list[i].BrandImg
                //             }
                //             for(var i = 0;i<this.list.length;i++){
                //                 for(var j = 0;j<this.list1.length;j++){
                //                     if(this.list[i].IntCls == this.list1[j].id){
                //                         this.list[i].IntCls = this.list1[j].name;
                //                     }
                //                 }
                //             }
                //         }
                //     })
                this.$http.post(this.GLOBAL.base_url+'/app/likeselect',{
                     channelroad:1,
                    user_id:this.$cookie.getCookie('u_id'),
                    text:this.word,
                    group:'',
                    type:4,
                    cate_id:this.cate_id,
                    size:10,
                    index:this.currentPage1
                }).then(res=>{
                    // console.log(res)
                    if(res.data.code == "1"){
                        // this.$http.get(this.GLOBAL.base_url+'/app/getdata',{params:{
                        // type:4,
                        // cate_id:this.cate_id,
                        // keywords:res.data.data,
                        // size:10,
                        // index:this.currentPage1
                        // }}).then(res=>{
                        //     this.list = res.data.data;
                        //     this.total = res.data.others;
                        //     if(this.total == "0"){
                        //         this.exist = false
                        //     }else{
                        //         this.exist = true;
                        //         for(var i =0;i<this.list.length;i++){
                        //             this.list[i].BrandImg = 'data:image/png;base64,'+this.list[i].BrandImg
                        //         }
                        //     }
                        // })
                        this.list = res.data.data;
                            this.total = res.data.others;
                            if(this.total == "0"){
                                this.exist = false
                            }else{
                                this.exist = true;
                                for(var i =0;i<this.list.length;i++){
                                    this.list[i].BrandImg = 'data:image/png;base64,'+this.list[i].BrandImg
                                }
                            }
                    }else{
                        this.total = 0;
                        this.exist = false;
                    }
                })
              }
          }
          if(this.chose == "apply"){
              if(this.time2 != ''){
                  this.$http.get(this.GLOBAL.base_url+'/app/getdata',{params:{
                       channelroad:1,
                    user_id:this.$cookie.getCookie('u_id'),
                        type:3,
                        date:this.time2,
                        cate_id:this.cate_id,
                        keywords:this.word,
                        size:10,
                        index:this.currentPage1
                    }}).then(res=>{
                        this.list = res.data.data;
                        this.total = res.data.others;
                        if(this.total == "0"){
                            this.exist = false
                        }else{
                            this.exist = true;
                            for(var i =0;i<this.list.length;i++){
                                this.list[i].BrandImg = 'data:image/png;base64,'+this.list[i].BrandImg
                            }
                            // for(var i = 0;i<this.list.length;i++){
                            //     for(var j = 0;j<this.list1.length;j++){
                            //         if(this.list[i].IntCls == this.list1[j].id){
                            //             this.list[i].IntCls = this.list1[j].name;
                            //         }
                            //     }
                            // }
                        }
                    })
              }else{
                  this.$http.get(this.GLOBAL.base_url+'/app/getdata',{params:{
                       channelroad:1,
                    user_id:this.$cookie.getCookie('u_id'),
                        type:3,
                        cate_id:this.cate_id,
                        keywords:this.word,
                        size:10,
                        index:this.currentPage1
                    }}).then(res=>{
                        this.list = res.data.data;
                        this.total = res.data.others;
                        if(this.total == "0"){
                            this.exist = false
                        }else{
                            this.exist = true;
                            for(var i =0;i<this.list.length;i++){
                                this.list[i].BrandImg = 'data:image/png;base64,'+this.list[i].BrandImg
                            }
                            // for(var i = 0;i<this.list.length;i++){
                            //     for(var j = 0;j<this.list1.length;j++){
                            //         if(this.list[i].IntCls == this.list1[j].id){
                            //             this.list[i].IntCls = this.list1[j].name;
                            //         }
                            //     }
                            // }
                        }
                    })
              }
          }
          if(this.chose == "num"){
              if(this.time2 != ''){
                  this.$http.get(this.GLOBAL.base_url+'/app/getdata',{params:{
                       channelroad:1,
                    user_id:this.$cookie.getCookie('u_id'),
                        type:4,
                        date:this.time2,
                        cate_id:this.cate_id,
                        keywords:this.word,
                        size:10,
                        index:this.currentPage1
                    }}).then(res=>{
                        this.list = res.data.data;
                        this.total = res.data.others;
                        if(this.total == "0"){
                            this.exist = false
                        }else{
                            this.exist = true;
                            for(var i =0;i<this.list.length;i++){
                                this.list[i].BrandImg = 'data:image/png;base64,'+this.list[i].BrandImg
                            }
                            // for(var i = 0;i<this.list.length;i++){
                            //     for(var j = 0;j<this.list1.length;j++){
                            //         if(this.list[i].IntCls == this.list1[j].id){
                            //             this.list[i].IntCls = this.list1[j].name;
                            //         }
                            //     }
                            // }
                        }
                    })
              }else{
                  this.$http.get(this.GLOBAL.base_url+'/app/getdata',{params:{
                       channelroad:1,
                    user_id:this.$cookie.getCookie('u_id'),
                        type:4,
                        cate_id:this.cate_id,
                        keywords:this.word,
                        size:10,
                        index:this.currentPage1
                    }}).then(res=>{
                        this.list = res.data.data;
                        this.total = res.data.others;
                        if(this.total == "0"){
                            this.exist = false
                        }else{
                            this.exist = true;
                            for(var i =0;i<this.list.length;i++){
                                this.list[i].BrandImg = 'data:image/png;base64,'+this.list[i].BrandImg
                            }
                            // for(var i = 0;i<this.list.length;i++){
                            //     for(var j = 0;j<this.list1.length;j++){
                            //         if(this.list[i].IntCls == this.list1[j].id){
                            //             this.list[i].IntCls = this.list1[j].name;
                            //         }
                            //     }
                            // }
                        }
                    })
              }
          }
      },
      handleSizeChange(val) {
              this.pageSize = val;
              this.getdata();
            },

        handleCurrentChange(val) {
            this.currentPage1 = val;
            this.getdata();
        },
        tosearchdetail(value1,value2){
            let routeData = this.$router.resolve({ path: '/searchdetail', query: { RegId:value1,
                    IntCls:value2 }});
              window.open(routeData.href, '_blank');
        }
  },
  mounted(){
      if(this.$route.query.word){
          this.word = this.$route.query.word;
          this.getdata();
      }
    this.getdata();
  }
}

</script>

<style scoped>
    .search-box{
        background-color: #fafafa;
        padding-top:30px;
    }
    .search-box-top{
        width: 1200px;
        height: 50px;
        margin: 0 auto 53px;
    }
    .search-box-top>span{
        font-family: "PingFangSC-Semibold";
        font-size: 36px;
        font-weight: 600;
        color: #f96006;
        margin:0 32px;
        vertical-align: middle;
    }
    .search-box-top>input{
        width: 622px;
        height: 42px;
        border: solid 1px #d7d8d9;
        outline: none;
        font-family: "PingFangSC-Regular";
        font-size: 16px;
        padding-left: 18px;
        color: #999999;
        vertical-align: middle;
    }
    .search-box-top>img{
        vertical-align: middle;
        cursor: pointer;
    }
    .search-box-middle{
        width: 1200px;
        margin: 0 auto;
    }
    .search-box-title{
        height: 40px;
        border-bottom:2px solid #f96006;
    }
    .search-box-title>div{
        width: 1200px;
        margin: 0 auto;
        height: 40px;
    }
    .seActive{
        color: red!important;
    }
    .search-box-title>div>div{
        float: left;
        width: 120px;
        height: 40px;
        text-align: center;
        line-height: 40px;
        font-family: "PingFangSC-Semibold";
        font-size: 20px;
        /* font-weight: 600; */
        color: #333333;
        cursor: pointer;
    }
    .search-box-title>div>div:nth-of-type(1){
        margin-left: 40px;
    }
    .excat .div1,.like .div2,.apply .div3,.num .div4{
       color: #ffffff;
       background: #f96006;
    }
    .search-box-middle-condition{
        background: #ffffff;
        padding-left: 48px;
        padding-bottom: 9px;
    }
    .search-box-middle-condition-div1,.search-box-middle-condition-div2,.search-box-middle-condition-div3{
        border-bottom: 1px dotted #dddddd;
    }
    .search-box-middle-condition-div1>div:nth-of-type(1){
        height: 56px;
        font-family: "PingFangSC-Thin";
        font-size: 14px;
        font-weight: 100;
        color: #666666;
        line-height: 56px;
        float: left;
        margin-right: 17px;
    }
    .search-box-middle-condition-div1>div:nth-of-type(2){
        width: 1075px;
        float: left;
        margin-top: 17px;
    }
    .search-box-middle-condition-div1>div:nth-of-type(2)>div{
        float: left;
        width: 122px;
        height: 24px;
        margin-right: 32px;
        background-color: #fed18e;
        margin-bottom: 5px;
        font-size: 12px;
        color: #ffffff;
        text-align: center;
        line-height: 24px;
        cursor: pointer;
    }
    .search-box-middle-condition-div1>div:nth-of-type(2)>div>a{
        text-decoration: none;
        margin-left: 6px;
        color: #ffffff;
    }
    .search-box-middle-condition-div1>div:nth-of-type(2)>div:nth-of-type(7n){
        margin-right: 0;
    }
    .search-box-middle-condition-div2>div:nth-of-type(1){
        height: 45px;
        line-height: 45px;
        font-family: "PingFangSC-Thin";
        font-size: 14px;
        font-weight: 100;
        color: #666666;
        float: left;
        margin-right: 48px;
    }
    .type1{
        width: 900px;
        float: left;
        height: 31px;
        margin-top: 12px;
        overflow: hidden;
    }
    .active1{
        height: 270px;
    }
    .type1>div{
        width: 91px;
        float: left;
        font-size: 14px;
        color: #333333;
        margin-right: 60px;
        margin-bottom: 15px;
        cursor: pointer;
    }
    .type1>div:nth-child(6n){
        margin-right: 0;
    }
    .search-box-middle-condition-div2>div:nth-of-type(3){
        float: left;
        height: 45px;
        line-height: 45px;
        margin-left: 65px;
        font-size: 14px;
        font-weight: 600;
        color: #333333;
        cursor: pointer;
    }
    .search-box-middle-condition-div3>div:nth-of-type(1){
        height: 45px;
        line-height: 45px;
        font-family: "PingFangSC-Thin";
        font-size: 14px;
        font-weight: 100;
        color: #666666;
        float: left;
        margin-right: 19px;
    }
    .type2{
        width: 900px;
        float: left;
        height: 26px;
        margin-top: 12px;
        overflow: hidden;
    }
    .active2{
        height: 58px;
    }
    .type2>div{
        float: left;
        font-size: 14px;
        color: #333333;
        margin-right: 55px;
        margin-bottom: 6px;
        cursor: pointer;
    }
    .type2>div:nth-child(7n){
        margin-right: 0;
    }
    .search-box-middle-condition-div3>div:nth-of-type(3){
        float: left;
        height: 45px;
        line-height: 45px;
        margin-left: 65px;
        font-size: 14px;
        font-weight: 600;
        color: #333333;
        cursor: pointer;
    }
    .search-box-middle-condition-div4{
        height: 42px;
        line-height: 42px;
    }
    .search-box-middle-condition-div4>div{
       float: left;
    }
    .nian{
        font-family: "PingFangSC-Thin";
        font-size: 14px;
        font-weight: 100;
        color: #666666;
        margin-right: 25px;
    }
    .input-box{
        margin-right: 5px;
    }
    input::-webkit-outer-spin-button,input::-webkit-inner-spin-button{
        -webkit-appearance: none !important;
       }
    input[type="number"]{
        -moz-appearance:textfield;
        outline: none;
        width: 77px;
        height: 28px;
        border-radius: 4px;
        border: solid 1px #d6d6d6;
       }
    .input-box>span{
        font-size: 14px;
        color: #333333;
    }
    .confire{
        width: 72px;
        height: 28px;
        border-radius: 4px;
        background-color:#f96006;
        font-size: 14px;
        line-height: 28px;
        text-align: center;
        color: #ffffff;
        margin-top: 7px;
        cursor: pointer;
    }
    .tip{
        color: red;
        font-size: 14px;
        height: 42px;
        line-height: 42px;
        margin-left: 10px;
    }
    .search-box-detail{
        margin-top: 20px;
        padding: 27px 48px 102px;
        background-color: #ffffff;
        /* margin-bottom: 102px; */
    }
    .search-box-detail-total{
        font-size: 14px;
        margin-bottom: 28px;
        color: #000000;
    }
    .search-box-detail-total>span{
        color: #f96006;
    }
    .search-box-detail-box{
        height: 150px;
        border: solid 1px #e6e6e6;
        margin-bottom: 16px;
    }
    .search-box-detail-box>div{
        float: left;
    }
    .search-box-detail-box-img{
        width: 118px;
        height: 118px;
        border: solid 1px #e6e6e6;
        margin: 16px 47px 16px 16px;
    }
    .search-box-detail-box-img>img{
        width: 118px;
        height: 118px;
    }
    .search-box-detail-box-des{
        height: 120px;
        margin-top: 21px;
    }
    .search-box-detail-box-des>div{
        float: left;
    }
    .search-box-detail-box-de-div1{
        width: 252px;
        font-size: 12px;
    }
    .search-box-detail-box-de-div1>div:nth-of-type(1){
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        height: 27px;
        font-family: "PingFangSC-Medium";
        font-size: 20px;
        font-weight: 500;
        margin:0 0 19px 30px;
        color: #333333;
    }
    .search-box-detail-box-de-div1>div:nth-of-type(2){
        margin:0 0 24px 12px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
    }
    .span1{
        color: #999999;
    }
    .search-box-detail-box-de-div1-span2,.search-box-detail-box-de-div2-span2,.search-box-detail-box-de-div3-span2{
        font-weight: 500;
        color: #333333;
    }
    .search-box-detail-box-de-div2{
        width: 276px;
        font-size: 12px;
    }
    .search-box-detail-box-de-div2>div:nth-of-type(1){
        margin: 6px 0 24px 21px;
    }
    .span3{
        font-weight: 500;
        color: #f96006;
    }
    .search-box-detail-box-de-div2>div:nth-of-type(2){
        margin: 0 0 24px 6px;
    }
    .search-box-detail-box-de-div3{
        margin-top: 48px;
        width: 262px;
        font-size: 12px;
    }
    .search-box-detail-box-de-div3>div:nth-of-type(1){
        margin: 0 0 23px 24px;
    }
    .search-box-detail-box-do{
        height: 120px;
        font-size: 12px;
        margin-top: 16px;
        padding-left: 25px;
        border-left: 1px dotted  #e6e6e6;
    }
    .search-box-detail-box-do>p{
        margin-bottom: 24px;
        color: #f96006;
        cursor: pointer;
    }
    #p1{
        margin-top: 11px;
        color: #4a90e2;
    }
    .search-page{
        text-align: center;
        margin-top:40px;
    }
    .search-box-nodata{
        text-align: center;
        margin-top: 60px;
    }
    .search-box-nodata>div:nth-of-type(1){
        margin: 36px 0 48px;
        font-size: 14px;
        color: #333333;
    }
    .search-box-nodata>div:nth-of-type(2){
        width: 144px;
        height: 38px;
        margin: 0 auto;
        border-radius: 4px;
        line-height: 38px;
        background-color:#f96006;
        font-size: 16px;
        cursor: pointer;
        text-align: center;
        color: #ffffff;
    }
</style>
