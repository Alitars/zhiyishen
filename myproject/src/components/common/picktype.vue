<template>
  <div class="picktype">
    <Top></Top>
    <Fix></Fix>
     <div class="type-box">
         <div class="type-box-wrap">
            <div class="type-box-title">注册类别推荐：</div>
            <div class="type-box-search">
                <input type="text" placeholder="请输入产品或服务名称" v-model="keyword" @keyup.enter="regsearch">
                <img src="/static/images/orderSearch.png" alt="">
                <div @click="regsearch">搜索</div>
            </div>
            <div class="type-box-big">
                <div class="type-box-big-left">
                    <div v-for="(v,k) in threelink" class="three-link" v-show="threeshow">
                        <div @click="change1(v.num)" class="link-div1"> 
                            <i :class="num1 == v.num && activeClass1? 'el-icon-caret-bottom':'el-icon-caret-right'"></i> 第{{v.name}}
                        </div> 
                        <div v-for="(item,index) in v.sec" v-if="num1 == v.num && activeClass1" class="link-div2">
                          <div @click="change2(item.num)"><i :class="num2 == item.num && activeClass2? 'el-icon-caret-bottom':'el-icon-caret-right'"></i>{{item.num}} {{item.name}}</div>  
                          <div v-for="(m,n) in third" v-show="num2 == item.num&& activeClass2" class="link-div3" @click="addcate(v.num,v.name,item.num,item.name,item.sscore,m.id,m.name)"><span :class="{setActive: isexit(m.id)}">{{m.num}} {{m.name}}</span></div>
                        </div>
                    </div>
                    <div class="three-link" v-for="(v,k) in searcharr" v-show="!threeshow">
                        <div class="link-div1" @click="stretch1(v.num)">
                            <i :class="secondshow==isTags(v.num)? 'el-icon-caret-bottom':'el-icon-caret-right'"></i> 第{{v.name}}
                        </div>
                        <div class="link-div2" v-for="(item,index) in v.sec" v-show="isTags(v.num)">
                            <div @click="stretch2(item.num)"><i :class="thirdshow==isTags2(item.num)? 'el-icon-caret-bottom':'el-icon-caret-right'"></i> {{item.num}} {{item.name}}</div>
                             <div class="link-div3" v-show="isTags2(item.num)" v-for="(m,n) in item.third" @click="addcate(v.num,v.name,item.num,item.name,item.sscore,m.id,m.name)"><span :class="{setActive: isexit(m.id)}">{{m.num}} {{m.name}}</span></div>
                        </div>
                    </div>
                </div>
                <div class="type-box-right">
                    <div>
                        <div class="type-box-right-title">
                            <div class="type-box-right-title-div1">推荐注册的商品项目</div>
                            <div class="type-box-right-title-div2" @click="showprice">费用标准说明</div>
                            <div class="type-box-right-title-div3" @click="onemore">返回</div>
                            <div class="type-box-right-title-div4" v-show="priceshow">
                                <p>1.每个类别的基础价格包含10个小商品，超过10个商品的每个小商品加收50元；</p>
                                <p>2.每个类别的总计金额为:官费+服务费+50*(小商品数量-10)，小商品数量不足10个的以10个计算；</p>
                                <p>3.四星商标注册(成功指数高于三星)，首次无需支付任何费用，初审公告后再支付全部费用；</p>
                                <p>4.三星商标注册(成功指数为三星)，首次支付费用为：300+30*(小商品数量-10)，初审公告后再支付尾款；</p>
                                <p>5.普通商标注册(成功指数低于三星)，首次需支付全部费用；</p>
                            </div>
                        </div>
                        <div class="type-box-right-showtype" >
                            <div class="type-box-right-fail" v-show="!datashow">
                                <div class="type-box-right-fail-div1">
                                    <i class="el-icon-caret-right"></i>
                                    <span>不好意思，您指定的产品名称与商标尼斯分类商品名称不符，请重新输入</span>
                                </div>
                                <div class="type-box-right-fail-div2">
                                    <input type="text" v-model="secondkey">
                                    <div @click="recheck">重新检测</div>
                                </div>
                                <div class="type-box-right-fail-div3">
                                    <i class="el-icon-caret-right"></i>
                                    <div>
                                        <p>您也可以根据 <span @click="guildsuggest">行业推荐</span> 自主选择注册类别，或者咨询我们的客服哦</p>
                                        <p>客服热线：400-630-2718</p>  
                                    </div>
                                </div>
                            </div>
                            <div class="type-box-right-showtype-cirl" v-for="(item,index) in suggest" v-show="datashow">
                                <div class="div1">
                                    <input type="checkbox" @click="selectfirst(item.isSelect1,index)" v-bind:checked="item.isSelect1">
                                    <span>第{{item.name}}</span>
                                    <span v-if="item.primary == 1">主要推荐类别</span>
                                    <span v-if="item.primary == 0">相关推荐类别</span>
                                    <span class="el-icon-delete" @click="delfirst(index)"></span>
                                </div>
                                <div class="container" v-for="(v,k) in item.sec">
                                    <div class="div2">
                                        <div>
                                            <input type="checkbox" v-bind:checked="v.isSelect2" @click="selectsecond(v.isSelect2,index,k)">
                                            <div :title="v.name">{{v.num}}  {{v.name}}</div>
                                            <i class="el-icon-delete" @click="delsecond(index,k)"></i>
                                        </div>
                                        <div v-if="v.sscore != 0">
                                            <span>成功指数</span>
                                            <el-rate
                                                v-model="v.sscore"
                                                disabled
                                                score-template="{value}">
                                            </el-rate>
                                            <div v-if="v.sscore<=3" @click="like(item.num,v.num)">查看近似商标</div>
                                        </div>
                                    </div>
                                    <div class="div3">
                                        <div v-for="(m,n) in v.third">
                                            <div >{{m.name}}</div>
                                            <div @click="del(item.num,v.num,index,n,m.id)">x</div>
                                        </div>
                                        <div id="clear"></div>
                                        <!-- <div class="add" @click="zu(item.num,v.num)">添加</div> -->
                                    </div>
                                    <div style="clear:both;"></div>
                                </div>
                                <div class="type-box-choose"> 
                                    <div class="type-box-choose-div1">
                                        <div>已选{{item.chose}}项 <span v-if="agency == 2">(超过10项，每项加收{{littleprice}}元)</span> <span v-else>(超过10项，每项加收50元)</span></div>
                                        <div>
                                            <span>总计金额：</span>
                                            <span>￥{{item.price}} </span>
                                        </div>
                                    </div>
                                    <div class="type-box-choose-div2">
                                        <div>
                                            <span>服务类型:</span>
                                            <span>{{item.difftype}}</span>
                                        </div>
                                          <div v-if="item.difftype == '四星商标注册'">
                                              （首次支付金额：<span>0</span>，初审公告后支付金额￥<span>{{item.price}}</span> ）
                                          </div>
                                          <div v-if="item.difftype == '三星商标注册'">
                                              （首次支付金额：￥<span>{{item.firstprice}}</span>，初审公告后支付金额：￥<span>{{Number(item.price) - Number(item.firstprice)}}</span> ）
                                          </div>
                                          <div v-if="item.difftype == '普通商标注册'">
                                              （首次支付金额：￥<span>{{item.price}}</span>，初审公告后支付金额：<span>0</span> ）
                                          </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="type-box-right-addcart">
                        <div>
                            <input type="checkbox" :checked='allcheck' @click="choseall"><span>全选</span>
                        </div>
                        <div @click="addcart">加入购物车</div>
                        <div v-show="buttonshow" @click="rightbuy">立即购买</div>
                        <div id="type-box-right-addcart-del" @click="deldata">删除</div>
                    </div>
                </div>
            </div>
         </div>
        <div class="type-box-cover" v-show="waitshow">
            <img src="/static/images/wait.gif" alt="">
        </div>
        <div class="type-box-save" v-show="saveshow">
            <div class="save-div">
                <div class="save-little">
                    <p>是否要保存当前推荐类别？</p>
                    <div>
                        <div @click="agreesave">是</div>
                        <div @click="nosave">否</div>
                    </div>
                </div>  
            </div>
        </div>
        <el-dialog
            title="提示"
            :visible.sync="dialogVisible"
            width="30%">
            <span>确定要删除该类别吗？</span>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="confireQuit">确 定</el-button>
            </span>
        </el-dialog>
     </div>
     <Foot></Foot>
  </div>
</template>

<script>
import Top from '../ui/top.vue';
import Foot from '../ui/foot.vue';
import Fix from '../ui/fix.vue';
export default {
  name: 'picktype',
  data(){
    return{
        // 获取推荐和45大类一级name是全名，本地缩写
        list1:[{id:"1",name:"01类 化学原料"},{id:"2",name:"02类 颜料油漆"},{id:"3",name:"03类 日化用品"},{id:"4",name:"04类 燃料油脂"},{id:"5",name:"05类 医药"},
          {id:"6",name:"06类 金属材料"},{id:"7",name:"07类 机械设备"},{id:"8",name:"08类 手工器械"},{id:"9",name:"09类 科学仪器"},{id:"10",name:"10类 医疗器械"},
          {id:"11",name:"11类 灯具空调"},{id:"12",name:"12类 运输工具"},{id:"13",name:"13类 军火烟火"},{id:"14",name:"14类 珠宝钟表"},{id:"15",name:"15类 乐器"},
          {id:"16",name:"16类 办公用品"},{id:"17",name:"17类 橡胶制品"},{id:"18",name:"18类 皮革皮具"},{id:"19",name:"19类 建筑材料"},{id:"20",name:"20类 家具"},
          {id:"21",name:"21类 厨房洁具"},{id:"22",name:"22类 绳网袋蓬"},{id:"23",name:"23类 纱线丝"},{id:"24",name:"24类 布料床单"},{id:"25",name:"25类 服装鞋帽"},
          {id:"26",name:"26类 钮扣拉链"},{id:"27",name:"27类 地毯席垫"},{id:"28",name:"28类 健身器材"},{id:"29",name:"29类 食品"},{id:"30",name:"30类 方便食品"},
          {id:"31",name:"31类 农林生鲜"},{id:"32",name:"32类 啤酒饮料"},{id:"33",name:"33类 酒"},{id:"34",name:"34类 烟草烟具"},{id:"35",name:"35类 广告销售"},
          {id:"36",name:"36类 金融物管"},{id:"37",name:"37类 建筑修理"},{id:"38",name:"38类 通讯服务"},{id:"39",name:"39类 运输贮藏"},{id:"40",name:"40类 材料加工"},
          {id:"41",name:"41类 教育娱乐"},{id:"42",name:"42类 科技服务"},{id:"43",name:"43类 餐饮住宿"},{id:"44",name:"44类 医疗园艺"},{id:"45",name:"45类 社会服务"}],
        //   下拉免费商标注册类型
        options: [],
        value: '',
        // 价格说明的显示隐藏
       priceshow:false,
      //右边推荐的数据    
       suggest:[],
      // 左边第一大类的数据
       threelink:[],
        // 左边第二大类的数据
       second:[],
       // 左边第三大类的数据
       third:[],
      // 根据类名和参数判断45大类第二级是否隐藏   
       activeClass1:false,
       num1:-1,
       // 根据类名和参数判断45大类第三级级是否隐藏 
       activeClass2:false,
       num2:-1,
       num:0,
      // 全选的属性   
       allcheck:false,
       star:'',
    //    推荐无结果第二次检索的关键字
       secondkey:'',
    //  保存所有三级id判断左边三级字体变红
       array:[],
    // 左边45大类的搜索关键词
       keyword:'',
    //   搜索出来的数据数组
       searcharr:[],
    //    保存搜索出来所有一级和二级的id判断二级和三级的显示隐藏
       firstid:[],
       secondid:[],
    //    判断箭头是否向下
       secondshow:true,
       thirdshow:true,
    //   判断管理删除按钮的显示隐藏
    //    mangeshow:true,
    //    判断智能推荐等待透明背景的显示隐藏
       waitshow:true,
    // 判断智能推荐是否有数据，显示重新搜索的框
       datashow:true,
    //    判断是显示45大类和搜索数据的显示隐藏
       threeshow:true,
       type:'',
    //   删除提示
    dialogVisible: false,

    firstnum: 0,
    secondnum:0,

    saveshow:false,
    // 判断立即购买显示隐藏
    buttonshow:this.$route.query.pic_url,

    // 代理人小商品价格
    littleprice:'',
    agency:''
    }
  },
  components: {
      Top,
      Foot,
      Fix
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
    // zu(num,second){
    //     if(this.secondnum == second){
    //         return false
    //     }else{
    //         if(this.firstnum != num){
    //             if(this.num1 == -1){
    //                 this.num1 = num;
    //                 this.activeClass1 = true;
    //             }else if(this.num1 == num){
    //                 this.num1 = -1;
    //                 this.activeClass1 = false;
    //             }else if(this.num1 != num){
    //                 this.num1 = num;
    //                 this.activeClass1 = true;
    //             }
    //     }
    //         this.change2(second)
    //         this.firstnum = num;
    //         this.secondnum = second;
    //     }
    // },
    //   判断价格说明的显示隐藏
      showprice(){
          this.priceshow = !this.priceshow;
      },
      onemore(){
          this.saveshow = true
      },
      agreesave(){
          this.saveshow = false;
          this.addcart();
      },
      nosave(){
          this.$router.push('/pickname');
      },
    //   45大类根据第一大类的id和商标名称获取第二大类的数据和星星及判断二类显示隐藏
      change1(num){
            // console.log(res)
                if(this.num1 == -1){
                    this.num1 = num;
                    this.activeClass1 = true;
                }else if(this.num1 == num){
                    this.num1 = -1;
                    this.activeClass1 = false;
                }else if(this.num1 != num){
                    this.num1 = num;
                    this.activeClass1 = true;
                }
      },
      //   45大类根据第二大类的id获取第三大类的数据及判断三类显示隐藏
      change2(num){
          this.$http.post(this.GLOBAL.base_url+'/app/recommthird',{
              num:num
          }).then(res=>{
            //   console.log(res)
                if(this.num2 == -1){
                    this.num2 = num;
                    this.activeClass2 = true;
                }else if(this.num2 == num){
                    this.num2 = -1;
                    this.activeClass2 = false;
                }else if(this.num2 != num){
                    this.num2 = num;
                    this.activeClass2 = true;
                }
                if(res.data.code == "1"){
                    this.third = res.data.data;
                }
            })
      },
    //  点击右边推荐的第一大类的多选判断二类的多选的状态和全选状态
      selectfirst(isSelect1,index){
          if(isSelect1 == false){
              for(var i =0;i<this.suggest[index].sec.length;i++){
                    this.suggest[index].sec[i].isSelect2 = !isSelect1;
                }
                     this.suggest[index].isSelect1 = true; 
              var all=[]
              for(var i=0;i<this.suggest.length;i++){
                  all.push(this.suggest[i].isSelect1);
                  for(var j =0;j<this.suggest[i].sec.length;j++){
                      all.push(this.suggest[i].sec[j].isSelect2)
                  }
              } 
              if(all.indexOf(false)==-1){
                  this.allcheck = !this.allcheck;
              }
            //   实时检测改变服务类型的变化
            var star = [];
            for(var i =0;i<this.suggest[index].sec.length;i++){
                if(this.suggest[index].sec[i].isSelect2 == true){
                    star.push(this.suggest[index].sec[i].sscore)
                }
            }
            if(this.$cookie.getCookie('type') == 2){
                this.suggest[index].difftype = "普通商标注册"
            }else{
                if(Math.min.apply(null, star) == 0 || Math.min.apply(null, star) == 1 ||Math.min.apply(null, star) == 2){
                    this.suggest[index].difftype = '普通商标注册'
                }else if(Math.min.apply(null, star) == 3){
                    this.suggest[index].difftype = '三星商标注册'
                }else{
                    this.suggest[index].difftype = '四星商标注册'
                }
            }
            
            // console.log(Math.min.apply(null, star))
            // 判断选了多少项和计算价格
            var m_index = 0;
            for(var i =0;i<this.suggest[index].sec.length;i++){
               m_index+= this.suggest[index].sec[i].third.length;
            }
            this.suggest[index].chose = m_index;
            for(var i =0;i<this.options.length;i++){
                if(this.suggest[index].difftype == this.options[i].title){
                    if(this.$cookie.getCookie('type') == 2){
                        if(m_index>10){
                        this.suggest[index].price = Number(this.options[i].service_price)+ Number(this.options[i].price)+(m_index - 10)*Number(this.options[i].agency_little_price);
                        // this.suggest[index].firstprice = Number(this.options[i].price)+(m_index - 10)*30;
                        }else if(0<m_index&&m_index<=10){
                            // this.suggest[index].firstprice = Number(this.options[i].price);
                            this.suggest[index].price = Number(this.options[i].service_price)+ Number(this.options[i].price)
                        }else{
                            // this.suggest[index].firstprice = 0;
                            this.suggest[index].price =0;
                        }
                    }else{
                        if(m_index>10){
                            this.suggest[index].price = Number(this.options[i].service_price)+ Number(this.options[i].price)+(m_index - 10)*50;
                            this.suggest[index].firstprice = Number(this.options[i].price)+(m_index - 10)*30;
                        }else if(0<m_index&&m_index<=10){
                            this.suggest[index].firstprice = Number(this.options[i].price);
                            this.suggest[index].price = Number(this.options[i].service_price)+ Number(this.options[i].price)
                        }else{
                            this.suggest[index].firstprice = 0;
                            this.suggest[index].price =0;
                        }
                    }
                    
                }
            }
          }else{
              for(var i =0;i<this.suggest[index].sec.length;i++){
                    this.suggest[index].sec[i].isSelect2 = !isSelect1;
                }
                this.suggest[index].isSelect1 = false; 
                this.allcheck = false;
                //   实时检测改变服务类型的变化
                var star = [];
                for(var i =0;i<this.suggest[index].sec.length;i++){
                        star.push(this.suggest[index].sec[i].sscore)
                }
            
                if(this.$cookie.getCookie('type') == 2){
                    this.suggest[index].difftype = "普通商标注册"
                }else{
                    if(Math.min.apply(null, star) == 0 || Math.min.apply(null, star) == 1 ||Math.min.apply(null, star) == 2){
                        this.suggest[index].difftype = '普通商标注册'
                    }else if(Math.min.apply(null, star) == 3){
                        this.suggest[index].difftype = '三星商标注册'
                    }else{
                        this.suggest[index].difftype = '四星商标注册'
                    }
                }
                // 判断选了多少项和计算价格
                this.suggest[index].chose =0;
                this.suggest[index].price = 0;
                this.suggest[index].firstprice = 0;
          }
      },
    //   点击右边推荐的第二大类多选判断三类多选的状态
      selectsecond(isSelect2,index,k){
         if(isSelect2 == false){
            //  console.log(11111)
              this.suggest[index].sec[k].isSelect2 =true;
              var m_index = []
              for(var i =0;i<this.suggest[index].sec.length;i++){
                  if(this.suggest[index].sec[i].isSelect2 ==true){
                      m_index.push(this.suggest[index].sec[i].isSelect2);
                  }
              }
             if(m_index.length ==this.suggest[index].sec.length){
                 this.suggest[index].isSelect1 = true;
             }
              var all=[]
              for(var i=0;i<this.suggest.length;i++){
                  all.push(this.suggest[i].isSelect1);
                  for(var j =0;j<this.suggest[i].sec.length;j++){
                      all.push(this.suggest[i].sec[j].isSelect2)
                  }
              } 
              if(all.indexOf(false)==-1){
                  this.allcheck = !this.allcheck;
              } 
             //   实时检测改变服务类型的变化
            var star = [];
            for(var i =0;i<this.suggest[index].sec.length;i++){
                if(this.suggest[index].sec[i].isSelect2 == true){
                    star.push(this.suggest[index].sec[i].sscore)
                }
            }
            if(this.$cookie.getCookie('type') == 2){
                this.suggest[index].difftype = "普通商标注册"
            }else{
                if(Math.min.apply(null, star) == 0 || Math.min.apply(null, star) == 1 ||Math.min.apply(null, star) == 2){
                    this.suggest[index].difftype = '普通商标注册'
                }else if(Math.min.apply(null, star) == 3){
                    this.suggest[index].difftype = '三星商标注册'
                }else{
                    this.suggest[index].difftype = '四星商标注册'
                }
            }
            
              // 判断选了多少项和计算价格
              var m_index = 0;
            for(var i =0;i<this.suggest[index].sec.length;i++){
                if(this.suggest[index].sec[i].isSelect2 ==true){
                    m_index+= this.suggest[index].sec[i].third.length;
                }
            }
            this.suggest[index].chose = m_index;
            for(var i =0;i<this.options.length;i++){
                if(this.suggest[index].difftype == this.options[i].title){
                    if(this.$cookie.getCookie('type') == 2){
                        if(m_index>10){
                       this.suggest[index].price = Number(this.options[i].service_price)+ Number(this.options[i].price)+(m_index - 10)*Number(this.options[i].agency_little_price);
                    //    this.suggest[index].firstprice =  Number(this.options[i].price)+(m_index - 10)*30;
                    }else if(0<m_index&&m_index<=10){
                        // this.suggest[index].firstprice =  Number(this.options[i].price);
                        this.suggest[index].price = Number(this.options[i].service_price)+ Number(this.options[i].price);
                    }else{
                        this.suggest[index].price =0;
                        // this.suggest[index].firstprice = 0;
                    }
                    }else{
                        if(m_index>10){
                            this.suggest[index].price = Number(this.options[i].service_price)+ Number(this.options[i].price)+(m_index - 10)*50;
                            this.suggest[index].firstprice =  Number(this.options[i].price)+(m_index - 10)*30;
                        }else if(0<m_index&&m_index<=10){
                            this.suggest[index].firstprice =  Number(this.options[i].price);
                            this.suggest[index].price = Number(this.options[i].service_price)+ Number(this.options[i].price);
                        }else{
                            this.suggest[index].price =0;
                            this.suggest[index].firstprice = 0;
                        }
                    }
                    
                }
            }

          }else{
            //    console.log(11111)
                this.suggest[index].sec[k].isSelect2 = false; 
                this.suggest[index].isSelect1 = false;
                this.allcheck = false;
                //   实时检测改变服务类型的变化
            var star = [];
            var all = [];
            for(var i =0;i<this.suggest[index].sec.length;i++){
                all.push(this.suggest[index].sec[i].isSelect2);
                // console.log(all)
                if(all.indexOf(true)==-1){
                    star.push(this.suggest[index].sec[i].sscore)
                }else{
                    if(this.suggest[index].sec[i].isSelect2 == true){
                        star.push(this.suggest[index].sec[i].sscore)
                    }
                }
            }
            // console.log(star)
            if(this.$cookie.getCookie('type') == 2){
                this.suggest[index].difftype = "普通商标注册"
            }else{
                if(Math.min.apply(null, star) == 0 || Math.min.apply(null, star) == 1 ||Math.min.apply(null, star) == 2){
                    this.suggest[index].difftype = '普通商标注册'
                }else if(Math.min.apply(null, star) == 3){
                    this.suggest[index].difftype = '三星商标注册'
                }else{
                    this.suggest[index].difftype = '四星商标注册'
                }
            }
            
                 // 判断选了多少项和计算价格
              var m_index = 0;
            for(var i =0;i<this.suggest[index].sec.length;i++){
                if(this.suggest[index].sec[i].isSelect2 ==true){
                    m_index+= this.suggest[index].sec[i].third.length;
                }
            }
            this.suggest[index].chose = m_index;
            for(var i =0;i<this.options.length;i++){
                if(this.suggest[index].difftype == this.options[i].title){
                    if(this.$cookie.getCookie('type') == 2){
                        if(m_index>10){
                            this.suggest[index].price = Number(this.options[i].service_price)+ Number(this.options[i].price)+(m_index - 10)*Number(this.options[i].agency_little_price);
                            // this.suggest[index].firstprice = Number(this.options[i].price)+(m_index - 10)*30;
                        }else if(0<m_index&&m_index<=10){
                            this.suggest[index].price = Number(this.options[i].service_price)+ Number(this.options[i].price);
                            // this.suggest[index].firstprice = Number(this.options[i].price);
                        }else{
                            this.suggest[index].price =0;
                            // this.suggest[index].firstprice = 0;
                        }
                    }else{
                        if(m_index>10){
                            this.suggest[index].price = Number(this.options[i].service_price)+ Number(this.options[i].price)+(m_index - 10)*50;
                            this.suggest[index].firstprice = Number(this.options[i].price)+(m_index - 10)*30;
                        }else if(0<m_index&&m_index<=10){
                            this.suggest[index].price = Number(this.options[i].service_price)+ Number(this.options[i].price);
                            this.suggest[index].firstprice = Number(this.options[i].price);
                        }else{
                            this.suggest[index].price =0;
                            this.suggest[index].firstprice = 0;
                        }
                    }
                    
                }
            }
          }
      },
    //   点击全选的状态判断第一类的多选状态
      choseall(){
          if(this.allcheck == true){
              for(var i=0;i<this.suggest.length;i++){
                  this.suggest[i].isSelect1 = false;
                  for(var j =0;j<this.suggest[i].sec.length;j++){
                      this.suggest[i].sec[j].isSelect2 = false
                  }
              }
              this.allcheck =false
              //   判断多少项和价格
              for(var i=0;i<this.suggest.length;i++){
                   this.suggest[i].chose =0;
                  this.suggest[i].price = 0;
                  this.suggest[i].firstprice = 0;
              }
              //   实时检测改变服务类型的变化
            var star = [];
            for(var i =0;i<this.suggest.length;i++){
                star[i] = [];
                for(j=0;j<this.suggest[i].sec.length;j++){
                     star[i].push(this.suggest[i].sec[j].sscore)
                }
                if(this.$cookie.getCookie('type') == 2){
                    this.suggest[i].difftype = "普通商标注册"
                }else{
                    if(Math.min.apply(null, star[i]) == 0 || Math.min.apply(null, star[i]) == 1 ||Math.min.apply(null, star[i]) == 2){
                        this.suggest[i].difftype = '普通商标注册'
                    }else if(Math.min.apply(null, star[i]) == 3){
                        this.suggest[i].difftype = '三星商标注册'
                    }else{
                        this.suggest[i].difftype = '四星商标注册'
                    }
                }
            }
            
            
          }else{
              for(var i=0;i<this.suggest.length;i++){
                  this.suggest[i].isSelect1 = true;
                  for(var j =0;j<this.suggest[i].sec.length;j++){
                      this.suggest[i].sec[j].isSelect2 = true
                  }
              }
              this.allcheck =true
            //   判断多少项和价格
            var star = [];
            for(var i=0;i<this.suggest.length;i++){
                var m_i = 0;
               star[i] = [];
                  for(var j =0;j<this.suggest[i].sec.length;j++){
                       m_i+= this.suggest[i].sec[j].third.length;
                      star[i].push(this.suggest[i].sec[j].sscore)
                  }
                  if(this.$cookie.getCookie('type') == 2){
                            this.suggest[i].difftype = "普通商标注册"
                 }else{
                        if(Math.min.apply(null, star[i]) == 0 || Math.min.apply(null, star[i]) == 1 ||Math.min.apply(null, star[i]) == 2){
                        this.suggest[i].difftype = '普通商标注册'
                    }else if(Math.min.apply(null, star[i]) == 3){
                        this.suggest[i].difftype = '三星商标注册'
                    }else{
                        this.suggest[i].difftype = '四星商标注册'
                    }
                     }
                  this.suggest[i].chose = m_i;
                  for(var m =0;m<this.options.length;m++){
                    if(this.suggest[i].difftype == this.options[m].title){
                        if(this.$cookie.getCookie('type') == 2){
                            if(m_i>10){
                                this.suggest[i].price = Number(this.options[m].service_price)+ Number(this.options[m].price)+(m_i - 10)*Number(this.options[m].agency_little_price);
                                // this.suggest[i].firstprice = Number(this.options[m].price)+(m_i - 10)*30;
                            }else{
                                this.suggest[i].price = Number(this.options[m].service_price)+ Number(this.options[m].price);
                                // this.suggest[i].firstprice = Number(this.options[m].price);
                            }
                        }else{
                            if(m_i>10){
                                this.suggest[i].price = Number(this.options[m].service_price)+ Number(this.options[m].price)+(m_i - 10)*50;
                                this.suggest[i].firstprice = Number(this.options[m].price)+(m_i - 10)*30;
                            }else{
                                this.suggest[i].price = Number(this.options[m].service_price)+ Number(this.options[m].price);
                                this.suggest[i].firstprice = Number(this.options[m].price);
                            }
                        }
                        
                    }
                }
              }
              
          }
      },
    //   点击右边推荐三类的x删除数组里的数据和计算价格和选项
      del(val1,val2,val3,val4,val5){
            for(var j=0;j<this.suggest[val3].sec.length;j++){
                if(val2 == this.suggest[val3].sec[j].num){
                    this.$delete(this.suggest[val3].sec[j].third,val4);
                }
            }
            // 计算价格和多少项
            var arr_val3 = 0;
            for(var i=0;i<this.suggest[val3].sec.length;i++){
                if(this.suggest[val3].sec[i].isSelect2 == true){
                    for(var j =0;j<this.suggest[val3].sec[i].third.length;j++){
                        arr_val3 +=1
                    }
                }
            }
            this.suggest[val3].chose = arr_val3
            for(var i =0;i<this.options.length;i++){
                if(this.suggest[val3].difftype == this.options[i].title){
                    if(this.$cookie.getCookie('type') == 2){
                        if(arr_val3>10){
                            this.suggest[val3].price = Number(this.options[i].service_price)+ Number(this.options[i].price)+(arr_val3 - 10)*Number(this.options[i].agency_little_price);
                            // this.suggest[val3].firstprice = Number(this.options[i].price)+(arr_val3 - 10)*30;
                        }else if(0<arr_val3&&arr_val3<=10){
                            // this.suggest[val3].firstprice = Number(this.options[i].price);
                            this.suggest[val3].price = Number(this.options[i].service_price)+ Number(this.options[i].price);
                        }else{
                            this.suggest[val3].price =0;
                            // this.suggest[val3].firstprice = 0;
                        }
                    }else{
                        if(arr_val3>10){
                            this.suggest[val3].price = Number(this.options[i].service_price)+ Number(this.options[i].price)+(arr_val3 - 10)*50;
                            this.suggest[val3].firstprice = Number(this.options[i].price)+(arr_val3 - 10)*30;
                        }else if(0<arr_val3&&arr_val3<=10){
                            this.suggest[val3].firstprice = Number(this.options[i].price);
                            this.suggest[val3].price = Number(this.options[i].service_price)+ Number(this.options[i].price);
                        }else{
                            this.suggest[val3].price =0;
                            this.suggest[val3].firstprice = 0;
                        }
                    }
                    
                }
            }
            // console.log(arr_val3)
            // 把三类的id从获取推荐所有三类id的数组中删除，左边相对应的三级不变红
            for(var i =0;i<this.array.length;i++){
                if(String(val5) == this.array[i]){
                    this.$delete(this.array,i);
                }
            }
      },
    //   点击下拉免费商标注册选项，计算价格
      changeType(e,k){
            this.suggest[k].difftype = e.target.value;
            // console.log(this.suggest)
            // console.log(this.suggest[k].difftype)
            // console.log(e)
            var m_k =0;
            
                for(var i =0;i<this.suggest[k].sec.length;i++){
                    if(this.suggest[k].sec[i].isSelect2 ==true){
                        m_k+= this.suggest[k].sec[i].third.length;
                    }
                    for(var j =0;j<this.options.length;j++){
                        if(this.suggest[k].difftype == this.options[j].title){
                            // console.log(1111)
                            if(m_k>10){
                            this.suggest[k].price = Number(this.options[j].service_price)+ Number(this.options[j].price)+(m_k - 10)*50
                            }else if(0<m_k&&m_k<=10){
                                this.suggest[k].price = Number(this.options[j].service_price)+ Number(this.options[j].price)
                            }else{
                                this.suggest[k].price =0;
                            }

                        }
                    }
                 }
      },
    //   根据推荐所有的id的数组判断左边的三级是否变红
      isexit(val) {
            if (this.array.includes(String(val))) {
                return true;
            } else {
                return false;
            }
      },
    //   点击左边三级自动添加到右边推荐数组里面
      addcate(val1,val2,val3,val4,val5,val6,val7){
          if(this.suggest.length != 0){
              for(var i =0;i<this.array.length;i++){
                if(val6 == this.array[i]){
                    return false
                }
            }
            var str1 =[];
            var str2 = []
          for(var i=0;i<this.suggest.length;i++){
              str1.push(this.suggest[i].num);
              for(var j=0;j<this.suggest[i].sec.length;j++){
                  str2.push(this.suggest[i].sec[j].num);
            }
          }
          if(this.$route.query.shop_id){
              if(str1.indexOf(val1) == -1){
                  return false
              }else{
                  if(str2.indexOf(val3) != -1){
                        let objcate3 = {id:val6,name:val7}
                        for(var i =0;i<this.suggest.length;i++){
                            for(var j=0;j<this.suggest[i].sec.length;j++){
                                if(val3 == this.suggest[i].sec[j].num){
                                    this.suggest[i].sec[j].third.push(objcate3)
                                    this.array.push(String(val6))
                                    this.isexit(String(val6))
                                }
                            }
                        }
                 }else{
                     let objcate2 = {isSelect2:true,name:val4,num:val3,sscore:val5,third:[{id:val6,name:val7}]}
                     for(var i = 0;i<this.suggest.length;i++){
                         if(val1 == this.suggest[i].num){
                             this.suggest[i].sec.push(objcate2)
                             this.array.push(String(val6))
                             this.isexit(String(val6))
                         }
                     }
                 }
              }
          }else{
              if(str1.indexOf(val1) != -1){
                 if(str2.indexOf(val3) != -1){
                        let objcate3 = {id:val6,name:val7}
                        for(var i =0;i<this.suggest.length;i++){
                            for(var j=0;j<this.suggest[i].sec.length;j++){
                                if(val3 == this.suggest[i].sec[j].num){
                                    this.suggest[i].sec[j].third.push(objcate3)
                                    this.array.push(String(val6))
                                    this.isexit(String(val6))
                                }
                            }
                        }
                 }else{
                     let objcate2 = {isSelect2:true,name:val4,num:val3,sscore:val5,third:[{id:val6,name:val7}]}
                     for(var i = 0;i<this.suggest.length;i++){
                         if(val1 == this.suggest[i].num){
                             this.suggest[i].sec.push(objcate2)
                             this.array.push(String(val6))
                             this.isexit(String(val6))
                         }
                     }
                 }
              }else{
                  let objcate = {chose:0,isSelect1:true,firstprice:0,price:0,num:val1,name:val2,type:'',difftype:'',
                  sec:[{isSelect2:true,name:val4,num:val3,sscore:val5,third:[{id:val6,name:val7}]}]};
                  if(this.$cookie.getCookie('type') == 2){
                      objcate.type = "普通商标注册"
                      objcate.difftype = "普通商标注册"
                  }else{
                      if(val5>=4){
                        objcate.type = "四星商标注册"
                        objcate.difftype = "四星商标注册"
                    }else if(val5 == 3){
                        objcate.type = "三星商标注册"
                        objcate.difftype = "三星商标注册"
                    }else{
                        objcate.type = "普通商标注册"
                        objcate.difftype = "普通商标注册"
                    }
                  } 
                
                  this.suggest.push(objcate)
                  this.array.push(String(val6))
                  this.isexit(String(val6))
              }
          }
          }else{
              let objcate = {chose:0,isSelect1:true,firstprice:0,price:0,num:val1,name:val2,type:'',difftype:'',
                  sec:[{isSelect2:true,name:val4,num:val3,sscore:val5,third:[{id:val6,name:val7}]}]}; 
                  if(this.$cookie.getCookie('type') == 2){
                      objcate.type = "普通商标注册"
                      objcate.difftype = "普通商标注册"
                  }else{
                      if(val5>=4){
                        objcate.type = "四星商标注册"
                        objcate.difftype = "四星商标注册"
                    }else if(val5 == 3){
                        objcate.type = "三星商标注册"
                        objcate.difftype = "三星商标注册"
                    }else{
                        objcate.type = "普通商标注册"
                        objcate.difftype = "普通商标注册"
                    }
                  }
                
                  this.suggest.push(objcate)
                  this.array.push(String(val6))
                  this.isexit(String(val6))
          }
          //  计算价格和选项
            for(var i =0;i<this.suggest.length;i++){
                if(val1 == this.suggest[i].num){
                    var total_i =0;
                    for(var j=0;j<this.suggest[i].sec.length;j++){
                        if(this.suggest[i].sec[j].isSelect2 == true){
                            total_i+=this.suggest[i].sec[j].third.length;
                        }
                    }
                    this.suggest[i].chose = total_i;
                    for(var m =0;m<this.options.length;m++){
                        if(this.suggest[i].difftype == this.options[m].title){
                            if(this.$cookie.getCookie('type') == 2){
                                if(total_i>10){
                                    this.suggest[i].price = Number(this.options[m].service_price)+ Number(this.options[m].price)+(total_i - 10)*Number(this.options[m].agency_little_price);
                                    // this.suggest[i].firstprice = Number(this.options[m].price)+(total_i - 10)*30;
                                }else if(0<total_i&&total_i<=10){
                                    // this.suggest[i].firstprice = Number(this.options[m].price);
                                    this.suggest[i].price = Number(this.options[m].service_price)+ Number(this.options[m].price)
                                }else{
                                    this.suggest[i].price =0;
                                    // this.suggest[i].firstprice =0;
                                }
                            }else{
                                if(total_i>10){
                                    this.suggest[i].price = Number(this.options[m].service_price)+ Number(this.options[m].price)+(total_i - 10)*50;
                                    this.suggest[i].firstprice = Number(this.options[m].price)+(total_i - 10)*30;
                                }else if(0<total_i&&total_i<=10){
                                    this.suggest[i].firstprice = Number(this.options[m].price);
                                    this.suggest[i].price = Number(this.options[m].service_price)+ Number(this.options[m].price)
                                }else{
                                    this.suggest[i].price =0;
                                    this.suggest[i].firstprice =0;
                                }
                            }
                            
                        }
                    }
                }
            }
      },
    //   点击大类垃圾桶
      delfirst(index){
          var threenum = []
            for(var j =0;j<this.suggest[index].sec.length;j++){
                    for(var m =0;m<this.suggest[index].sec[j].third.length;m++){
                    threenum.push(this.suggest[index].sec[j].third[m].id)
                }
            }
          for(var i =0;i<threenum.length;i++){
              for(var j =0;j<this.array.length;j++){
                  if(threenum[i] == this.array[j]){
                      this.array.splice(j,1);
                  }
              }
          }
        this.suggest.splice(index,1)
      },
    //   点击组别垃圾桶
      delsecond(index,k){
          var threenum = []
        for(var m =0;m<this.suggest[index].sec[k].third.length;m++){
            threenum.push(this.suggest[index].sec[k].third[m].id)
        }
          for(var i =0;i<threenum.length;i++){
              for(var j =0;j<this.array.length;j++){
                  if(threenum[i] == this.array[j]){
                      this.array.splice(j,1);
                  }
              }
          }
        this.suggest[index].sec.splice(k,1)
        //  计算价格和选项
        if(this.suggest[index].sec.length == 0){
            this.suggest[index].chose =0;
            this.suggest[index].price = 0;
            this.suggest[index].firstprice = 0;
            this.suggest.splice(index,1)
        }else{
            //   实时检测改变服务类型的变化
            var star = [];
            var all = [];
            for(var i =0;i<this.suggest[index].sec.length;i++){
                all.push(this.suggest[index].sec[i].isSelect2);
                if(all.indexOf(true)==-1){
                    star.push(this.suggest[index].sec[i].sscore)
                }else{
                    if(this.suggest[index].sec[i].isSelect2 == true){
                        star.push(this.suggest[index].sec[i].sscore)
                    }
                }
            }
            if(this.$cookie.getCookie('type') == 2){
                this.suggest[index].difftype = '普通商标注册'
            }else{
                if(Math.min.apply(null, star) == 0 || Math.min.apply(null, star) == 1 ||Math.min.apply(null, star) == 2){
                    this.suggest[index].difftype = '普通商标注册'
                }else if(Math.min.apply(null, star) == 3){
                    this.suggest[index].difftype = '三星商标注册'
                }else{
                    this.suggest[index].difftype = '四星商标注册'
                }
            }
            
            // 判断选了多少项和计算价格
            var total =0;
             for(var i =0;i<this.suggest[index].sec.length;i++){
                if(this.suggest[index].sec[i].isSelect2 == true){
                     total+=this.suggest[index].sec[i].third.length;
                }
             }
            this.suggest[index].chose = total;
            for(var i =0;i<this.options.length;i++){
                if(this.suggest[index].difftype == this.options[i].title){
                    if(this.$cookie.getCookie('type') == 2){
                        if(total>10){
                            this.suggest[index].price = Number(this.options[i].service_price)+ Number(this.options[i].price)+(total - 10)*Number(this.options[i].agency_little_price);
                            // this.suggest[index].firstprice = Number(this.options[i].price)+(total - 10)*30;
                        }else if(0<total&&total<=10){
                            this.suggest[index].price = Number(this.options[i].service_price)+ Number(this.options[i].price);
                            // this.suggest[index].firstprice = Number(this.options[i].price);
                        }else{
                            this.suggest[index].price =0;
                            // this.suggest[index].firstprice = 0;
                        }
                    }else{
                        if(total>10){
                            this.suggest[index].price = Number(this.options[i].service_price)+ Number(this.options[i].price)+(total - 10)*50;
                            this.suggest[index].firstprice = Number(this.options[i].price)+(total - 10)*30;
                        }else if(0<total&&total<=10){
                            this.suggest[index].price = Number(this.options[i].service_price)+ Number(this.options[i].price);
                            this.suggest[index].firstprice = Number(this.options[i].price);
                        }else{
                            this.suggest[index].price =0;
                            this.suggest[index].firstprice = 0;
                        }
                    }
                    
                }
            }
        } 
      },
    //   查看近似商标
    like(val1,val2){
        if(this.$route.query.shop_id){
            let routeData = this.$router.resolve({ path: '/like', query: { type:this.type,cate_id:val1,
                    num:val2 }});
              window.open(routeData.href, '_blank');
        }else{
            let routeData = this.$router.resolve({ path: '/like', query: { type:this.$route.query.type,cate_id:val1,
                    num:val2 }});
              window.open(routeData.href, '_blank');
        }
    },
    //  搜索45大类
      regsearch(){
          if(this.keyword != ""){
              this.$http.get(this.GLOBAL.base_url+'/api/voicesearch',{params:{
                    text:this.keyword,
                    keywords:this.$route.query.type
                }}).then(res=>{
                    // console.log(res)
                    if(res.data.code == "1"){
                        this.threeshow = false
                        this.searcharr = res.data.data.selected;
                        for(var i =0;i<this.searcharr.length;i++){
                            this.firstid.push(this.searcharr[i].num);
                            for(var j =0;j<this.list1.length;j++){
                                if(this.searcharr[i].num == this.list1[j].id){
                                    this.searcharr[i].name = this.list1[j].name;
                                }
                            }
                        }
                        for(var i =0;i<this.searcharr.length;i++){
                            for(var j =0;j<this.searcharr[i].sec.length;j++){
                                this.secondid.push(this.searcharr[i].sec[j].num);
                                if(Number(this.searcharr[i].sec[j].num<1000)){
                                    this.searcharr[i].sec[j].num = '0'+this.searcharr[i].sec[j].num;
                                }
                            }
                        }
                    }else{
                        this.tip('error',res.data.msg)
                    }
                })
          }else{
              this.threeshow = true
          }
      },
    //   判断搜索数据的展开和隐藏（以下4个方法）
      stretch1(val){
            if (this.firstid.includes(val)) {
              for(var i =0;i<this.firstid.length;i++){
                  if(val == this.firstid[i]){
                      this.firstid.splice(i,1)
                  }
              }
          }else{
              this.firstid.push(val);
          }
      },
       stretch2(val){
            if (this.secondid.includes(val)) {
              for(var i =0;i<this.secondid.length;i++){
                  if(val == this.secondid[i]){
                      this.secondid.splice(i,1)
                  }
              }
          }else{
              this.secondid.push(val);
          }
      },
      isTags(val){
          if (this.firstid.includes(val)) {
            return true;
        } else {
            return false;
        }
      },
      isTags2(val){
            if (this.secondid.includes(val)) {
            return true;
        } else {
            return false;
        }
      },
    //   点击管理判断删除显示隐藏
    //   manage(){
    //       this.mangeshow = !this.mangeshow;
    //   },
    //   finsh(){
    //       this.mangeshow = !this.mangeshow;
    //   },
      deldata(){
          var all=[]
              for(var i=0;i<this.suggest.length;i++){
                  all.push(this.suggest[i].isSelect1);
                  for(var j =0;j<this.suggest[i].sec.length;j++){
                      all.push(this.suggest[i].sec[j].isSelect2)
                  }
              } 
              if(all.indexOf(true)==-1){
                  this.tip('error','请选择删除类别')
                  return false
              }else{
                  this.dialogVisible = true;
              }
      },
    //   点击删除把选中的项从推荐的数组中删除
      confireQuit(){
        //   删除让左边不变红
         var threenum = []
          for(var i =0;i<this.suggest.length;i++){
              for(var j =0;j<this.suggest[i].sec.length;j++){
                  if(this.suggest[i].sec[j].isSelect2 == true){
                      for(var m =0;m<this.suggest[i].sec[j].third.length;m++){
                        threenum.push(this.suggest[i].sec[j].third[m].id)
                    }
                  }
              }
          }
          for(var i =0;i<threenum.length;i++){
              for(var j =0;j<this.array.length;j++){
                  if(threenum[i] == this.array[j]){
                      this.array.splice(j,1);
                  }
              }
          }
        //   从推荐数组中删除选中的数据
          for(var i = this.suggest.length - 1; i >= 0; i--){
              if(this.suggest[i].isSelect1 == true){
                 this.suggest.splice(i,1)
              }else{
                  for(var j = this.suggest[i].sec.length - 1; j >= 0; j--){
                    if(this.suggest[i].sec[j].isSelect2 == true){
                     this.suggest[i].sec.splice(j,1)
                     this.suggest[i].chose = 0;
                     this.suggest[i].price = 0;
                     this.suggest[i].firstprice = 0;
                    }
                }
              }
          }
          this.dialogVisible = false;
          //   实时检测改变服务类型的变化
            var star = [];
            for(var i =0;i<this.suggest.length;i++){
                star[i] = [];
                for(j=0;j<this.suggest[i].sec.length;j++){
                     star[i].push(this.suggest[i].sec[j].sscore)
                }
                if(this.$cookie.getCookie('type') == 2){
                    this.suggest[i].difftype = '普通商标注册'
                }else{
                    if(Math.min.apply(null, star[i]) == 0 || Math.min.apply(null, star[i]) == 1 ||Math.min.apply(null, star[i]) == 2){
                        this.suggest[i].difftype = '普通商标注册'
                    }else if(Math.min.apply(null, star[i]) == 3){
                        this.suggest[i].difftype = '三星商标注册'
                    }else{
                        this.suggest[i].difftype = '四星商标注册'
                    }
                }
                
            }
      },
    //   重新检索获取数据
      recheck(){
          if(this.secondkey == ''){
              return false
          }else{
              this.waitshow = true;
              this.$route.query.good = this.secondkey;
              this.getdata1();
          }
          
      },
    //   根据行业推荐
    guildsuggest(){
        this.$http.post(this.GLOBAL.base_url+'/app/handrecommed',{
            text:this.$route.query.type,
            groups:this.$route.query.guild
        }).then(res=>{
            if(res.data.code == "1"){
                this.datashow = true;
                this.suggest = res.data.data;
                var _this=this;
                // 给推荐的一级数据里面添加属性
                this.suggest.map(function (item) {
                    _this.$set(item, 'isSelect1', false);
                    _this.$set(item, 'chose', 0);
                    _this.$set(item, 'price', 0);
                    _this.$set(item, 'firstprice', 0);
                })
                // 给推荐一级数据简洁的标题
                for(var i =0;i<this.suggest.length;i++){
                    for(var j =0;j<this.list1.length;j++){
                        if(this.suggest[i].num == this.list1[j].id){
                            this.suggest[i].name = this.list1[j].name;
                        }
                    }
                    // 根据星星给一级添加下拉框项对应的选项
                    var star_i = []
                    for(var j=0;j<this.suggest[i].sec.length;j++){
                        star_i.push(this.suggest[i].sec[j].sscore);
                        _this.$set(this.suggest[i].sec[j],'isSelect2', false)
                    }
                    if(star_i.indexOf(3) == -1 && star_i.indexOf(2) == -1 && star_i.indexOf(1) == -1 && star_i.indexOf(0) == -1){
                        this.suggest[i].type = "四星商标注册"
                        this.suggest[i].difftype = "四星商标注册"
                        }else if(star_i.indexOf(5) == -1 &&star_i.indexOf(4) == -1 && star_i.indexOf(2) == -1 && star_i.indexOf(1) == -1 && star_i.indexOf(0) == -1){
                        this.suggest[i].type = "三星商标注册"
                        this.suggest[i].difftype = "三星商标注册"
                        }else{
                            this.suggest[i].type = "普通商标注册"
                            this.suggest[i].difftype = "普通商标注册"
                        }
                    }
                    this.choseall();
                    for(var i =0;i<this.suggest.length;i++){
                        for(var j=0;j<this.suggest[i].sec.length;j++){
                            for(var m =0;m<this.suggest[i].sec[j].third.length;m++){
                                this.array.push(String(this.suggest[i].sec[j].third[m].id))
                            }
                        }
                    }
            }
        })
    },
    // 加入购物车
    addcart(){
        var one_cate = [];
        var two_cate = [];
        var star_cate = [];
        var three_cate = [];
        var click_type = [];
       for(var i = 0;i <this.suggest.length;i++){
             var arr_i = [];
             var str_i = [];
             var star_i = [];
           for(var j =0;j<this.suggest[i].sec.length;j++){
               if(this.suggest[i].sec[j].third.length!=0&&this.suggest[i].sec[j].isSelect2 ==true){
                   
                   if(one_cate.indexOf(this.suggest[i].num) ==-1){
                       one_cate.push(this.suggest[i].num)
                       click_type.push(this.suggest[i].difftype)
                   }
                   arr_i.push(this.suggest[i].sec[j].num);
                   star_i.push(this.suggest[i].sec[j].sscore);
                    for(var m = 0;m<this.suggest[i].sec[j].third.length;m++){
                        str_i.push(this.suggest[i].sec[j].third[m].id)
                    }
               }else if(this.suggest[i].sec[j].third.length == 0&&this.suggest[i].sec[j].isSelect2 ==true){
                   this.tip('error','请确认小商品不为空')
                   return false;
               }
           }
           
           if(arr_i.length !=0){
               two_cate.push(arr_i)
           }
           if(star_i.length !=0){
               star_cate.push(star_i)
           }
            if(str_i.length !=0){
               three_cate.push(str_i)
           }
       }
    //    console.log(star_cate)
       one_cate = one_cate.join(',')
       click_type = click_type.join(',')
       var  str1='';
       var  str2= '';
       var star_str = '';
       for(var i =0;i<two_cate.length;i++){
           for(var j=0;j<two_cate[i].length;j++){
               str1 += two_cate[i][j]+',';
           }
            str1 =  str1.substring(0,str1.length-1);
            str1 += '|';
       }
       for(var i =0;i<three_cate.length;i++){
           for(var j=0;j<three_cate[i].length;j++){
               str2 += three_cate[i][j]+',';
           }
            str2 =  str2.substring(0,str2.length-1);
            str2 += '|';
       }
       for(var i =0;i<star_cate.length;i++){
           for(var j=0;j<star_cate[i].length;j++){
               star_str += star_cate[i][j]+',';
           }
            star_str =  star_str.substring(0,star_str.length-1);
            star_str += '|';
       }
        str1 =  str1.substring(0,str1.length-1);
        str2 =  str2.substring(0,str2.length-1);
        star_str =  star_str.substring(0,star_str.length-1);
        if(three_cate.length==0){
            return false;
        }
        this.$http.post(this.GLOBAL.base_url+'/api/shopCar/registerAddShopCar',{
            one_cate:one_cate,
            two_cate:str1,
            three_cate:str2,
            user_id:this.$cookie.getCookie('u_id'),
            shop_id:this.$route.query.shop_id,
            click_type:click_type,
            brand_img:this.$route.query.pic_url,
            brand_name:this.$route.query.type,
            recommend_rate:star_str,
            is_design:this.$route.query.is_design
        }).then(res=>{
            // console.log(res)
            if(res.data.code == "1"){
                this.$router.push({
                    path:'/personal/buyCart',
                    query:{
                        type:this.$route.query.type
                    }
                })
            }else{
                this.tip('error',res.data.msg)
            }
        })
    },
    // 立即购买
    rightbuy(){
        var one_cate = [];
        var two_cate = [];
        var star_cate = [];
        var three_cate = [];
        var click_type = [];
       for(var i = 0;i <this.suggest.length;i++){
             var arr_i = [];
             var str_i = [];
             var star_i = [];
           for(var j =0;j<this.suggest[i].sec.length;j++){
               if(this.suggest[i].sec[j].third.length!=0&&this.suggest[i].sec[j].isSelect2 ==true){
                   
                   if(one_cate.indexOf(this.suggest[i].num) ==-1){
                       one_cate.push(this.suggest[i].num)
                       click_type.push(this.suggest[i].difftype)
                   }
                   arr_i.push(this.suggest[i].sec[j].num);
                   star_i.push(this.suggest[i].sec[j].sscore);
                    for(var m = 0;m<this.suggest[i].sec[j].third.length;m++){
                        str_i.push(this.suggest[i].sec[j].third[m].id)
                    }
               }else if(this.suggest[i].sec[j].third.length == 0&&this.suggest[i].sec[j].isSelect2 ==true){
                   this.tip('error','请确认小商品不为空')
                   return false;
               }
           }
           
           if(arr_i.length !=0){
               two_cate.push(arr_i)
           }
           if(star_i.length !=0){
               star_cate.push(star_i)
           }
            if(str_i.length !=0){
               three_cate.push(str_i)
           }
       }
    //    console.log(star_cate)
       one_cate = one_cate.join(',')
       click_type = click_type.join(',')
       var  str1='';
       var  str2= '';
       var star_str = '';
       for(var i =0;i<two_cate.length;i++){
           for(var j=0;j<two_cate[i].length;j++){
               str1 += two_cate[i][j]+',';
           }
            str1 =  str1.substring(0,str1.length-1);
            str1 += '|';
       }
       for(var i =0;i<three_cate.length;i++){
           for(var j=0;j<three_cate[i].length;j++){
               str2 += three_cate[i][j]+',';
           }
            str2 =  str2.substring(0,str2.length-1);
            str2 += '|';
       }
       for(var i =0;i<star_cate.length;i++){
           for(var j=0;j<star_cate[i].length;j++){
               star_str += star_cate[i][j]+',';
           }
            star_str =  star_str.substring(0,star_str.length-1);
            star_str += '|';
       }
        str1 =  str1.substring(0,str1.length-1);
        str2 =  str2.substring(0,str2.length-1);
        star_str =  star_str.substring(0,star_str.length-1);
        if(three_cate.length==0){
            return false;
        }
        this.$http.post(this.GLOBAL.base_url+'/api/shopCar/brandOrder',{
            one_cate:one_cate,
            two_cate:str1,
            three_cate:str2,
            user_id:this.$cookie.getCookie('u_id'),
            click_type:click_type,
            brand_img:this.$route.query.pic_url,
            brand_name:this.$route.query.type,
            recommend_rate:star_str,
            is_design:this.$route.query.is_design
        }).then(res=>{
            // console.log(res)
            if(res.data.code == "1"){
                this.$router.push({
                    path:'/checkOrder',
                    query:{
                        order:res.data.order
                    }
                })
            }else{
                this.tip('error',res.data.msg)
            }
        })
    },
    //   获取检索推荐的数据
      getdata1(){
          if(this.$route.query.shop_id){
              this.datashow = true;
              this.waitshow = false;
              this.$http.post(this.GLOBAL.base_url+'/api/shopCar/regShopcarDetail',{
                shop_id:this.$route.query.shop_id
            }).then(res=>{
                // console.log(res)
                if(res.data.code == "1"){
                    this.suggest = res.data.data;
                    this.type = res.data.others;
                    var _this=this;
                    this.getdata2();
                    // 给推荐的一级数据里面添加属性
                    this.suggest.map(function (item) {
                        _this.$set(item, 'isSelect1', false);
                        _this.$set(item, 'chose', 0);
                        _this.$set(item, 'price', 0);
                        _this.$set(item, 'firstprice', 0);
                    })
                    // 给推荐一级数据简洁的标题
                    for(var i =0;i<this.suggest.length;i++){
                        for(var j =0;j<this.list1.length;j++){
                            if(this.suggest[i].num == this.list1[j].id){
                                this.suggest[i].name = this.list1[j].name;
                            }
                        }
                        // 根据星星给一级添加下拉框项对应的选项
                        var star_i = []
                        for(var j=0;j<this.suggest[i].sec.length;j++){
                            star_i.push(this.suggest[i].sec[j].sscore);
                            _this.$set(this.suggest[i].sec[j],'isSelect2', false)
                            if(Number(this.suggest[i].sec[j].num<1000)){
                                        this.suggest[i].sec[j].num = '0'+this.suggest[i].sec[j].num;
                                    }
                        }
                        if(this.$cookie.getCookie('type') == 2){
                            this.suggest[i].difftype = "普通商标注册"
                        }else{
                            if(star_i.indexOf(3) == -1 && star_i.indexOf(2) == -1 && star_i.indexOf(1) == -1 && star_i.indexOf(0) == -1){
                            this.suggest[i].type = "四星商标注册"
                            this.suggest[i].difftype = "四星商标注册"
                            }else if(star_i.indexOf(5) == -1 &&star_i.indexOf(4) == -1 && star_i.indexOf(2) == -1 && star_i.indexOf(1) == -1 && star_i.indexOf(0) == -1){
                                this.suggest[i].type = "三星商标注册"
                                this.suggest[i].difftype = "三星商标注册"
                                }else{
                                    this.suggest[i].type = "普通商标注册"
                                    this.suggest[i].difftype = "普通商标注册"
                                }
                        }
                        
                        }
                        this.choseall();
                        // 把所有三级的id保存在数组判断右边变红
                        for(var i =0;i<this.suggest.length;i++){
                            for(var j=0;j<this.suggest[i].sec.length;j++){
                                for(var m =0;m<this.suggest[i].sec[j].third.length;m++){
                                    this.array.push(String(this.suggest[i].sec[j].third[m].id))
                                }
                            }
                        }
                }
            })

          }else if(this.$route.query.data){
              this.datashow = true;
              this.waitshow = false;
              this.suggest = this.$route.query.data
              var _this=this;
                    // 给推荐的一级数据里面添加属性
                    this.suggest.map(function (item) {
                        _this.$set(item, 'isSelect1', false);
                        _this.$set(item, 'chose', 0);
                        _this.$set(item, 'price', 0);
                        _this.$set(item, 'firstprice', 0);
                    })
                    for(var i =0;i<this.suggest.length;i++){
                        for(var j =0;j<this.list1.length;j++){
                            if(this.suggest[i].num == this.list1[j].id){
                                this.suggest[i].name = this.list1[j].name;
                            }
                        }
                        // 根据星星给一级添加下拉框项对应的选项
                        var star_i = []
                        for(var j=0;j<this.suggest[i].sec.length;j++){
                            star_i.push(this.suggest[i].sec[j].sscore);
                            _this.$set(this.suggest[i].sec[j],'isSelect2', false)
                            // if(Number(this.suggest[i].sec[j].num<1000)){
                            //             this.suggest[i].sec[j].num = '0'+this.suggest[i].sec[j].num;
                            //         }
                        }
                        if(this.$cookie.getCookie('type') == 2){
                            this.suggest[i].difftype = "普通商标注册"
                        }else{
                             if(star_i.indexOf(3) == -1 && star_i.indexOf(2) == -1 && star_i.indexOf(1) == -1 && star_i.indexOf(0) == -1){
                                this.suggest[i].type = "四星商标注册"
                                this.suggest[i].difftype = "四星商标注册"
                                }else if(star_i.indexOf(5) == -1 &&star_i.indexOf(4) == -1 && star_i.indexOf(2) == -1 && star_i.indexOf(1) == -1 && star_i.indexOf(0) == -1){
                                    this.suggest[i].type = "三星商标注册"
                                    this.suggest[i].difftype = "三星商标注册"
                                    }else{
                                        this.suggest[i].type = "普通商标注册"
                                        this.suggest[i].difftype = "普通商标注册"
                                    }
                        }
                       
                        }
                        this.choseall();
                        // 把所有三级的id保存在数组判断右边变红
                        for(var i =0;i<this.suggest.length;i++){
                            for(var j=0;j<this.suggest[i].sec.length;j++){
                                for(var m =0;m<this.suggest[i].sec[j].third.length;m++){
                                    this.array.push(String(this.suggest[i].sec[j].third[m].id))
                                }
                            }
                        }
          }else if(this.$route.query.id){
              this.$http.post(this.GLOBAL.base_url+'/api/shopCar/anotherList',{
                keywords:this.$route.query.type,
                id:this.$route.query.id,
                type:this.$route.query.from
            }).then(res=>{
                // console.log(res)
                if(res.data.code == 1){
                     this.waitshow = false;
                    this.suggest = res.data.data;
                    var _this=this;
                    // 给推荐的一级数据里面添加属性
                    this.suggest.map(function (item) {
                        _this.$set(item, 'isSelect1', false);
                        _this.$set(item, 'chose', 0);
                        _this.$set(item, 'price', 0);
                        _this.$set(item, 'firstprice', 0);
                    })
                     for(var i =0;i<this.suggest.length;i++){
                                for(var j =0;j<this.list1.length;j++){
                                    if(this.suggest[i].num == this.list1[j].id){
                                        this.suggest[i].name = this.list1[j].name;
                                    }
                                }
                                // 根据星星给一级添加下拉框项对应的选项
                                var star_i = []
                                for(var j=0;j<this.suggest[i].sec.length;j++){
                                    star_i.push(this.suggest[i].sec[j].sscore);
                                    _this.$set(this.suggest[i].sec[j],'isSelect2', false)
                                    if(Number(this.suggest[i].sec[j].num<1000)){
                                        this.suggest[i].sec[j].num = '0'+this.suggest[i].sec[j].num;
                                    }
                                }
                                // this.choseall();
                               if(this.$cookie.getCookie('type') == 2){
                                    this.suggest[i].difftype = "普通商标注册"
                                }else{
                                    if(star_i.indexOf(3) == -1 && star_i.indexOf(2) == -1 && star_i.indexOf(1) == -1 && star_i.indexOf(0) == -1){
                                        this.suggest[i].type = "四星商标注册"
                                        this.suggest[i].difftype = "四星商标注册"
                                        }else if(star_i.indexOf(5) == -1 &&star_i.indexOf(4) == -1 && star_i.indexOf(2) == -1 && star_i.indexOf(1) == -1 && star_i.indexOf(0) == -1){
                                            this.suggest[i].type = "三星商标注册"
                                            this.suggest[i].difftype = "三星商标注册"
                                            }else{
                                                this.suggest[i].type = "普通商标注册"
                                                this.suggest[i].difftype = "普通商标注册"
                                            }
                                    }
                                }
                                this.choseall();
                                // 把所有三级的id保存在数组判断右边变红
                                for(var i =0;i<this.suggest.length;i++){
                                    for(var j=0;j<this.suggest[i].sec.length;j++){
                                        for(var m =0;m<this.suggest[i].sec[j].third.length;m++){
                                            this.array.push(String(this.suggest[i].sec[j].third[m].id))
                                        }
                                    }
                                }
                }
            })
              
          }else{
              this.$http.post(this.GLOBAL.base_url+'/app/voiceselect',{
                     channelroad:1,
                    user_id:this.$cookie.getCookie('u_id'),
                    keywords:this.$route.query.good,
                    text:this.$route.query.type,
                    groups:this.$route.query.guild
                }).then(res=>{
                    // console.log(res);
                    if(res.data.code == "1"){
                        this.waitshow = false;
                        if(res.data.data.length != 0){
                            // 判断是否有数据重新检索是否出现
                            this.datashow =true;
                            this.suggest = res.data.data;
                            var _this=this;
                            // 给推荐的一级数据里面添加属性
                            this.suggest.map(function (item) {
                                _this.$set(item, 'isSelect1', false);
                                _this.$set(item, 'chose', 0);
                                _this.$set(item, 'price', 0);
                                _this.$set(item, 'firstprice', 0);
                            })
                            // 给推荐一级数据简洁的标题
                            for(var i =0;i<this.suggest.length;i++){
                                for(var j =0;j<this.list1.length;j++){
                                    if(this.suggest[i].num == this.list1[j].id){
                                        this.suggest[i].name = this.list1[j].name;
                                    }
                                }
                                // 根据星星给一级添加下拉框项对应的选项
                                var star_i = []
                                for(var j=0;j<this.suggest[i].sec.length;j++){
                                    star_i.push(this.suggest[i].sec[j].sscore);
                                    _this.$set(this.suggest[i].sec[j],'isSelect2', false)
                                    if(Number(this.suggest[i].sec[j].num<1000)){
                                        this.suggest[i].sec[j].num = '0'+this.suggest[i].sec[j].num;
                                    }
                                }
                                if(this.$cookie.getCookie('type') == 2){
                                    this.suggest[i].difftype = "普通商标注册"
                                }else{
                                    if(star_i.indexOf(3) == -1 && star_i.indexOf(2) == -1 && star_i.indexOf(1) == -1 && star_i.indexOf(0) == -1){
                                    this.suggest[i].type = "四星商标注册"
                                    this.suggest[i].difftype = "四星商标注册"
                                    }else if(star_i.indexOf(5) == -1 &&star_i.indexOf(4) == -1 && star_i.indexOf(2) == -1 && star_i.indexOf(1) == -1 && star_i.indexOf(0) == -1){
                                        this.suggest[i].type = "三星商标注册"
                                        this.suggest[i].difftype = "三星商标注册"
                                        }else{
                                            this.suggest[i].type = "普通商标注册"
                                            this.suggest[i].difftype = "普通商标注册"
                                        }
                                    }
                                }
                                this.choseall();
                                // 把所有三级的id保存在数组判断右边变红
                                for(var i =0;i<this.suggest.length;i++){
                                    for(var j=0;j<this.suggest[i].sec.length;j++){
                                        for(var m =0;m<this.suggest[i].sec[j].third.length;m++){
                                            this.array.push(this.suggest[i].sec[j].third[m].id)
                                        }
                                    }
                                }
                                
                        }else{
                             this.suggest = res.data.data;
                            this.datashow =false;
                        }
                    }
                })
          }
      },
      getdata2(){
          var a ='';
          if(this.$route.query.shop_id){
              a = this.type
          }else{
              a = this.$route.query.type
          }
          this.$http.get(this.GLOBAL.base_url+'/app/recommfirst',{params:{
              keywords: a
          }}).then(res=>{
            //   console.log(res)
              if(res.data.code == "1"){
                  this.threelink = res.data.data;
                   for(var i =0;i<this.threelink.length;i++){
                       if(this.threelink[i].num == this.list1[i].id){
                           this.threelink[i].name = this.list1[i].name
                       }
                       for(var j=0;j<this.threelink[i].sec.length;j++){
                           if(Number(this.threelink[i].sec[j].num<1000)){
                               this.threelink[i].sec[j].num = '0'+this.threelink[i].sec[j].num;
                           }
                       }
                   }
              }
          })
      },
     getdata3(){
        this.$http.get(this.GLOBAL.base_url+'/api/goods/paydetail',{params:{
            user_id:this.$cookie.getCookie('u_id')
        }}).then(res=>{
            // console.log(res)
            if(res.data.code == "1"){
                this.options = res.data.data;
                this.agency = this.$cookie.getCookie('type');
                if(this.$cookie.getCookie('type') == 2){
                    for(var i =0;i<this.options.length;i++){
                        if(this.options[i].title == '普通商标注册'){
                            this.littleprice = Number(this.options[i].agency_little_price);
                    }
                }
              }
              this.getdata1();
            }
        })
     }
  },
  mounted(){
    //   this.getdata1();
      this.getdata2();
      this.getdata3();
  },
}

</script>

<style scoped>
  .type-box{
     background-color: #fcfcfc;
     padding-top: 45px;
     padding-bottom: 38px;
  }
  .type-box-wrap{
      width: 1200px;
      margin: 0 auto;
  }
  .type-box-title{
      font-size: 24px;
      color:#333333;
      margin: 0 0 45px 28px;
  }
  .type-box-search{
      position: relative;
      height: 65px;
  }
  .type-box-search>input{
      width: 863px;
      height: 63px;
      outline: none;
      padding-left: 90px;
      font-size: 16px;
      font-weight: 300;
      color: #a6a6a6;
      border:1px solid #f96006;
  }
  .type-box-search>img{
      position: absolute;
      width: 20px;
      height: 20px;
      top:24px;
      left: 28px;
  }
  .type-box-search>div{
      width: 245px;
      height: 65px;
      position: absolute;
      right:0;
      top:0;
      background-color: #f96006;
      text-align: center;
      line-height: 65px;
      font-size: 18px;
      color: #ffffff;
      cursor: pointer;
  }
  .type-box-big{
      height: 870px;
  }
  .type-box-big>div{
      float: left;
      height: 870px;
  }
  .type-box-big-left{
      width: 344px;
      height: 710px!important;
      border-right:1px solid #e1e1e1;
      overflow-y:auto;
      margin-top: 35px;
  }
  .link-div1{
      margin-bottom: 10px;
      font-size: 16px;
      width: 300px;
      height: 23px;
      cursor: pointer;
      color: #333333;
      overflow: hidden;
      text-overflow:ellipsis;
      white-space: nowrap;
  }
  .link-div2{
      margin-left: 25px;
      margin-bottom: 10px;
      font-size: 14px;
      width: 300px;
      cursor: pointer;
      color: #333333;
  }
  .link-div2>div{
      overflow: hidden;
      text-overflow:ellipsis;
      white-space: nowrap;
  }
  .link-div3{
      margin-left: 60px;
      margin-top: 10px;
      font-size: 12px;
      width: 250px;
      cursor: pointer;
      color: #333333;
  }
  .type-box-big-left::-webkit-scrollbar {
            width: 8px;     
            height: 8px;
    }
    .type-box-big-left::-webkit-scrollbar-thumb {
        border-radius: 5px;
        box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
    }
    .type-box-big-left::-webkit-scrollbar-track {
            opacity: 0;
    }
  .type-box-right{
      width: 855px;
  }
  .type-box-right>div:nth-of-type(1){
      width: 742px;
      margin: 35px 0 0 42px;
  }
  .type-box-right-title{
      height: 40px;
      position: relative;
  }
  .type-box-right-title-div1{
      font-size: 20px;
      color: #333333;
      position: absolute;
      top:7px;
  }
  .type-box-right-title-div2{
      position: absolute;
      font-size: 14px;
      color: #f96006;
      top:13px;
      left: 200px;
      cursor: pointer;
  }
  .type-box-right-title-div3{
      width: 146px;
      height: 39px;
      font-size: 16px;
      text-align: center;
      line-height: 39px;
      color: #ffffff;
      cursor: pointer;
      border-radius: 4px;
      background: #f96006;
      position: absolute;
      right: 0;
      top: 0;
  }
  .type-box-right-title-div4{
      width: 430px;
      height: 200px;
      box-shadow: 0 0 30px -1px rgba(217, 217, 217, 0.5);
      background-color: #ffffff;
      position: absolute;
      left: 200px;
      top:45px;
      color: #333333;
      padding: 10px 10px 0 10px;
      z-index: 10;
  }
  .type-box-right-title-div4>p{
      font-size: 12px;
      margin-bottom: 10px;
  }
  .type-box-right-fail{
      margin: 94px 0 0 104px;
  }
  .type-box-right-fail-div1{
       font-size: 16px;
       color: #333333;
       margin-bottom: 25px;
       vertical-align: middle;
  }
  .el-icon-caret-right,.el-icon-caret-bottom{
      color: #f96006;
      font-size: 20px;
      vertical-align: middle;
      margin-right: 14px;
  }
  .type-box-right-fail-div2{
      width: 514px;
      height: 56px;
       box-shadow: 0 0 30px -1px rgba(217, 217, 217, 0.5);
       margin-bottom: 45px;
  }
  .type-box-right-fail-div2>input{
      width: 370px;
      height: 56px;
      float: left;
      outline: none;
      border: none;
      padding-left: 16px;
  }
  .type-box-right-fail-div2>div{
      width: 128px;
      height: 56px;
      background-color: #f8f8f8;
      float: left;
      text-align: center;
      line-height: 56px;
      font-size: 12px;
      color: #f96006;
      cursor: pointer;
  }
  .type-box-right-fail-div3{
      height: 38px;
  }
  .type-box-right-fail-div3>i{
      float: left;
  }
  .type-box-right-fail-div3>div{
      float: left;
      margin-top: -10px;
  }
  .type-box-right-fail-div3>div>p{
      font-size: 12px;
       color: #333333;
       margin-bottom: 2px;
  }
  .type-box-right-fail-div3>div>p:nth-of-type(1)>span{
      display: inline-block;
      width: 80px;
      text-align: center;
      border-radius: 3px;
      height: 20px;
      line-height: 20px;
      font-size: 14px;
      background-color: #f96006;
      color: #ffffff;
      cursor: pointer;
  }
  .type-box-right-showtype{
      height: 635px;
      margin-top: 35px;
       border-right:1px solid #e1e1e1;
      overflow-y: auto;
  }
  .type-box-right-showtype::-webkit-scrollbar {
            width: 8px;     
            height: 8px;
    }
    .type-box-right-showtype::-webkit-scrollbar-thumb {
        border-radius: 5px;
        box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
    }
    .type-box-right-showtype::-webkit-scrollbar-track {
            opacity: 0;
    }
  .type-box-right-showtype-cirl{
      border-bottom: solid 1px #e1e1e1;
      margin-bottom: 20px;
  }
  .div1{
      font-size: 18px;
      color: #333333;
      margin-bottom: 10px;
  }
  .div1>input{
      width: 16px;
      height: 16px;
      vertical-align: middle;
      margin-right: 10px;
      cursor: pointer;
  }
  .div1>span{
      vertical-align: middle;
  }
  .div1>span:nth-of-type(2){
      font-size: 16px;
      font-weight: 600;
      color: #333333;
      margin-left: 24px;
  }
   /* .div1>span:nth-of-type(3){
      margin-left: 24px;
  } */
  .container{
      margin-bottom: 16px;
  }
  .div2{
      height: 22px;
      margin:0 0 8px 16px;
  }
  .div2>div{
      float: left;
  }
  .div2>div:nth-of-type(1)>input{
      float: left;
      width: 16px;
      height: 16px;
      vertical-align: middle;
      margin-right: 14px;
      cursor: pointer;
      margin-top: 3px;
  }
  .div2>div:nth-of-type(1)>div{
      width: 300px;
      float: left;
      font-size: 16px;
      color: #333333;
      overflow: hidden;
      text-overflow:ellipsis;
      white-space: nowrap;
  }
  .div2>div:nth-of-type(2){
      float: left;
      margin-left: 60px;
  }
  .div2>div:nth-of-type(2)>span{
      font-size: 14px;
      font-weight: 500;
      float: left;
  }
  .div2>div:nth-of-type(2)>div:nth-of-type(1){
      float: left;
      height: 23px;
      margin:2px 0 0 8px;
  }
   .div2>div:nth-of-type(2)>div:nth-of-type(2){
       float: left;
       width: 96px;
       height: 21px;
       border:1px solid red;
       font-size: 14px;
       color:#f96006;
       text-align: center;
       line-height: 21px;
       border-radius: 4px;
       cursor: pointer;
       background: #fbefe9;
       margin-left: 8px;
   }
  .div3{
      margin-left: 16px;
  }
  .div3>div{
      float: left;
      height: 33px;
      padding-left: 8px;
      border: solid 1px #d6d6d6;
      margin: 0 20px 8px 0;
  }
  .div3>div>div{
      float: left;
  }
  .div3>div>div:nth-of-type(1){
      height: 33px;
      text-align: center;
      line-height: 33px;
      font-size: 14px;
      font-weight: 300;
      padding-right: 8px;
      color: #333333;
      font-size: 14px;
      font-weight: 300;
  }
  .div3>div>div:nth-of-type(2){
      width: 35px;
      height: 33px;
      border-left:1px solid #d6d6d6;
      background-color: #f5f5f5;
      font-size: 20px;
      color: #d6d6d6;
      text-align: center;
      cursor: pointer;
  }
  #clear{
      width: 0px;
      height: 0px;
      clear:both;
      border: none;
      margin: 0;
  }
  /* .add{
      float: none;
      width: 157px;
      height: 32px;
      border: solid 1px #f96006!important;
      background-color: #fbefe9;
      line-height: 32px;
      text-align: center;
      font-size: 14px;
      font-weight: 300;
      color: #333333;
      cursor: pointer;
      padding-left: 0px!important;
  } */
  .type-box-right-addcart{
      height: 40px;
      margin: 45px 0 0 42px;
  }
  /* .type-box-right-addcart>div{
      float: left;
  } */
  .type-box-right-addcart>div:nth-of-type(1){
      float: left;
      margin-top: 10px;
  }
  .type-box-right-addcart>div:nth-of-type(1)>input{
      width: 16px;
      height: 16px;
      vertical-align: middle;
      margin-right: 14px;
      cursor: pointer;
  }
  .type-box-right-addcart>div:nth-of-type(1)>span{
      vertical-align: middle;
      font-size: 16px;
      color: #333333;
  }
  .type-box-right-addcart>div:nth-of-type(3){
      float: right;
      width: 146px;
      height: 39px;
      border-radius: 4px;
      background-color: #efefef;
      font-size: 16px;
      color: #f96006;
      text-align: center;
      margin-right: 12px;
      line-height: 39px;
      cursor: pointer;
  }
  .type-box-right-addcart>div:nth-of-type(2){
      float: right;
      width: 146px;
      height: 39px;
      border-radius: 4px;
      background-color: #f96006;
      font-size: 16px;
      color: #ffffff;
      text-align: center;
      line-height: 39px;
      cursor: pointer;
      margin-right: 80px;
  }
  #type-box-right-addcart-del{
      float: right;
      width: 146px;
      height: 39px;
      border-radius: 4px;
      background-color: #efefef;
      font-size: 16px;
      color: #f87e03;
      text-align: center;
      line-height: 39px;
      cursor: pointer;
      margin-right: 12px;
  }
  .type-box-choose{
      height: 50px;
      margin: 32px 0 20px;
  }
  .type-box-choose-div1{
      height: 20px;
      margin-bottom: 10px;
  }
  .type-box-choose-div1>div{
      float: left;
  }
  .type-box-choose-div1>div:nth-of-type(1){
      font-size: 14px;
      font-weight: 300;
      color: #f96006;
      margin: 0 325px 0 16px;
  }
  .type-box-choose-div1>div:nth-of-type(2)>span{
      font-size: 14px;
      font-weight: 300;
  }
  .type-box-choose-div1>div:nth-of-type(2)>span:nth-of-type(1){
      color: #333333;
  }
  .type-box-choose-div1>div:nth-of-type(2)>span:nth-of-type(2){
      color: #f96006;
  }
  .type-box-choose-div2{
      height: 20px;
  }
  .type-box-choose-div2>div{
      float: left;
  }
  .type-box-choose-div2>div:nth-of-type(1){
      font-size: 14px;
      font-weight: 300;
      color: #f96006;
      margin: 0 150px 0 16px;
  }
  .type-box-choose-div2>div:nth-of-type(2){
      font-size: 14px;
      font-weight: 300;
      color: #f96006;
  }
  .type-box-cover{
    background: rgba(0,0,0, 0.7);
    position: fixed;
    z-index: 20;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
  .type-box-cover>img{
    position: absolute;
    top:50%;
    left: 50%;
    z-index: 30;
    transform: translate(-50%,-50%)
  }
  .setActive{
      color: #f96006!important;
  }
  .type-box-save{
       background: rgba(0,0,0, 0.7);
        position: fixed;
        z-index: 20;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
  }
.save-div{
   width: 480px;
    height: 252px;
    background-color: #ffffff;
    position: absolute;
    top:50%;
    left: 50%;
    z-index: 30;
    transform: translate(-50%,-50%);
}
.save-little{
    width: 296px;
    position: absolute;
    top:60px;
    left: 92px;
    text-align: center;
}
.save-little>p{
    font-size: 16px;
    font-weight: 600;
    color: #333333;
    margin-bottom: 60px;
}
.save-little>div{
    height: 36px;
  }
  .save-little>div>div{
    float: left;
    width: 108px;
    height: 36px;
    text-align: center;
    line-height: 36px;
    font-size: 14px;
    cursor: pointer;
    border-radius: 4px;
  }
  .save-little>div>div:nth-of-type(1){
    color: #f96006;
    border: solid 1px #f96006;
    background-color: #fbefe9;
    margin: 0 60px 0 10px;
  }
  .save-little>div>div:nth-of-type(2){
    background-color:#f96006;
    color: #ffffff;
  }
</style>
<style>
    .el-rate__icon{
        font-size: 12px!important;
    }
   .type-box .el-dialog{
        margin-top: 40vh!important;
    }
    .el-icon-delete{
        cursor: pointer;
        margin-left: 20px;
    }
</style>

