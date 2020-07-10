<template>
  <div class="container">
    <Top></Top>
    <Fix></Fix>
    <Else></Else>
    <div class="index-box">
        <div style="position:absolute;top:52px;left:0;width:100%;height:481px">
                <el-carousel :interval="5000" height="480px">
                  <el-carousel-item v-for="(v,k) in bannerimg" :key="k" >
                      <img style="width:100%;height:481px;position:absolute;z-index:-2;cursor: pointer;"  :src="v.url" alt="" @click="toactive(k)">
                      <div style="margin-top:20px;" v-if="k==0">
                        <div class="index-title">商标成功率·智能查询</div>
                         <div class="index-dec">4400万+商标数据分析 人工智能深度挖掘 精准结果展现</div>
                      </div>
                      <div v-if="k==1" class="agency-active">
                        <div>知依昇·百万奖池火爆开启</div>
                        <div>福利还剩：<span>{{agencyprice}}</span>元</div>
                      </div>
                  </el-carousel-item>
              </el-carousel>
        </div>
        <div class="index-wrap-box">
              <div class="trade">
                  <router-link  tag="div" :to="{path:'/trade',query: {id: this.id}}">商标服务</router-link>
                    <div class="div1">
                        <!-- <div @click="creatname">商标取名 <span>|</span></div>
                        <div @click="todesign">Logo设计 <span>|</span></div> -->
                        <div v-for="(v,k,index) in myarr" class="div1-box" v-if="v.title != '商标取名'&&v.title != '商标设计'">
                            <p @click="moveto(v.id,v.title)" v-if="v.title != '商标无效宣告&答辩'"> {{v.title}}<span>|</span></p>
                        </div>
                    </div>
              </div>
              <div class="patent">
                  <!-- <div>专利服务</div> -->
                  <router-link tag="div" :to="{path:'/patent',query: {id: 49}}">专利服务</router-link>
                  <div class="div4">
                      <div v-for="(v,k,index) in copyarr" :key="index" class="div2-box">
                          <p @click="moveto1(v.id,v.title,v.pid)">{{v.title}}<span>|</span></p>
                      </div>
                  </div>
              </div>
              <div class="copyright">
                  <router-link tag="div" :to="{path:'/copyright',query: {id: 50}}">版权服务</router-link>
                  <!-- <div>版权服务</div> -->
                  <div class="div3">
                      <div v-for="(v,k,index) in copyright" :key="index" class="div3-box">
                          <p @click="moveto2(v.id,v.title,v.pid)">{{v.title}}<span>|</span></p>
                      </div>
                  </div>
              </div>
              <div class="property">
                  <div @click="brandBuy">知产交易</div>
              </div>
              <div class="index-fix-tool">
                  <div>知产工具</div>
                  <div class="div2">
                      <div @click="toregister">商标评估<span>|</span></div>
                      <div @click="creatname">商标取名<span>|</span></div>
                      <div @click="todesign">Logo设计<span>|</span></div>
                      <div @click="assets">知产管理<span>|</span></div>
                      <div @click="tolisttype">商标分类<span>|</span></div>
                      <div @click="topatentanalyse">专利申请评估</div>
                  </div>
              </div>
              <div class="abouts">
                  <div>关于我们</div>
                  <div class="div5">
                      <router-link tag="p" to="/about">公司介绍</router-link><span>|</span>
                      <router-link tag="p" to="/link">联系我们</router-link><span>|</span>
                      <router-link tag="p" to="/news">新闻中心</router-link>
                  </div>
              </div>
          </div>

          <div class="index-search">
            <div class="index-search-box-div1">商标名</div>
            <div class="index-search-box-div2">
                <input type="text" placeholder="请输入您的商标名称" v-model="word"><img  src="/static/images/searchbutton.png" alt="" @click="moveTo">
            </div>
          </div>
          <div class="index-top-tool">
            <div class="top-tool-bigdiv">
              <div class="big-div1">
                <div>
                  热门工具
                </div>
              </div>
              <div class="big-div2">
                <div v-for="(v,k) in tool">
                    <div class="bigzhen1" @mouseenter="toolshow(k)">
                      <img :src="v.img1" alt="">
                      <div>{{v.title}}</div>
                    </div>
                    <div class="bigzhen2" @mouseleave="toolleave()" v-show="k==currenttool" @click="tohot(k)">
                      <img :src="v.img2" alt="">
                      <div>{{v.title}}</div>
                    </div>
                </div>
              </div>
            </div>
          </div>
    </div>
    <div class="index-tool">
        <div class="Box">
            <div class="content">
              <div class="Box_con clearfix">
                <span class="btnl btn" id="btnl"></span>
                <span class="btnr btn" id="btnr"></span>
                <div class="conbox" id="BoxUl">
                  <ul>
                     <li class="cur" @click="agencyactive"><img src="/static/images/5.png" alt=""/>
                     <div>福利还剩：<span>{{agencyprice}}元</span></div></li>
                    <li class="cur" @click="tomember"><img src="/static/images/1.png" alt=""/></li>
                    <li class="cur" @click="toprogrem"><img src="/static/images/3c.png" alt=""/></li>
                    <li class="cur" @click="toagencyimg"><img src="/static/images/4.png" alt=""/></li>
                   <li class="cur"><img src="/static/images/2.png" alt=""/></li>
                  </ul>
                </div>
                <!-- <p class="BoxSwitch" id="BoxSwitch">
                  <span class="cur"></span>
                  <span></span>
                  <span></span>
                  <span></span>
                </p> -->
              </div>
            </div>
          </div>
          <div class="index-tool-title"><div>高效知识产权专业工具</div> </div>
          <div class="index-tool-title-english">Efficient intellectual property professional tools</div>
          <div class="index-tool-list">
            <div :class="active">
              <div class="div-div1" @mouseenter="change('success')">商标成功率评估</div>
              <div class="div-div2" @mouseenter="change('name')">AI商标取名</div>
              <div class="div-div3" @mouseenter="change('design')">AI-LOGO设计</div>
              <div class="div-div4" @mouseenter="change('manage')">知产管理</div>
            </div>
          </div>
    </div>
    <div class="index-tool-detail">
        <div class="index-success" v-show="changeshow1">
        <div>
          <img src="/static/images/success.png" alt="">
        </div>
        <div>
          <div>商标成功率评估</div>
          <div>
            ·AI分析商标注册成功指数<br/>
            ·AI推荐高成功率商标名称<br/>
            ·智能预警提醒 避免近似商标<br/>
            ·商标星级评估 结果直观展现<br/>
            ·一键快速提交商标注册
          </div>
          <div @click="toregister">立即评估</div>
        </div>
      </div>
      <div class="index-success" v-show="changeshow2">
        <div>
          <img src="/static/images/name.png" alt="">
        </div>
        <div>
          <div>AI商标取名</div>
          <div>
            ·海量词库批量推荐优选商标<br/>
            ·根据您的喜好获取商标名称<br/>
            ·智能监控商标名称变化<br/>
            ·一键快速提交商标注册
          </div>
          <div @click="direct">立即取名</div>
        </div>
      </div>
      <div class="index-success" v-show="changeshow3">
        <div>
          <img src="/static/images/design.png" alt="">
        </div>
        <div>
          <div>AI-LOGO设计</div>
          <div>
            ·AI快速生成原创商标图形<br/>
            ·AI推荐精准匹配商标类别<br/>
            ·简化设计流程轻松完成<br/>
            ·一键快速提交商标注册
          </div>
          <div @click="todesign">立即设计</div>
        </div>
      </div>
      <div class="index-success" v-show="changeshow4">
        <div>
          <img src="/static/images/manage.png" alt="">
        </div>
        <div>
          <div>知产管理</div>
          <div>
            ·监控管理知识产权<br/>
            ·提醒知识产权信息变化<br/>
            ·分析统计知识产权数据<br/>
            ·政策精准匹配 快速扶持企业
          </div>
          <div @click="assets()">立即查看</div>
        </div>
      </div>
    </div>
    <div class="index-risk">
      <div class="index-risk-title"><div>智能服务 专业保证</div> </div>
      <div class="index-risk-title-english">Intelligent service professional guarantee</div>
      <div class="index-risk-list">
        <div class="index-risk-list-left">
          <div class="left1"  @mouseenter="changeimg(1)">商<br>标<br>服<br>务</div>
          <div class="left2"  @mouseenter="changeimg(2)">专<br>利<br>服<br>务</div>
          <div class="left3"  @mouseenter="changeimg(3)">版<br>权<br>服<br>务</div>
          <img src="/static/images/tradeimg.png" alt="" v-show="imgshow1">
          <img src="/static/images/patentimg.png" alt="" v-show="imgshow2">
          <img src="/static/images/copyrightimg.png" alt="" v-show="imgshow3">
        </div>
        <div class="index-risk-list-right" v-show="imgshow1">
          <div class="right1">
              <div v-for="(v,k) in  [...dataarr].splice(0,4)" @mouseenter="showhover(k)" :key="k">
                <div>
                    <div class="right1-title">{{v.title}}</div>
                      <div class="right1-desc">{{v.desc}}</div>
                      <div class="right1-promision" v-html="v.promision">
                      </div>
                      <div class="right1-price"><span>¥</span><span>{{Number(v.price)+Number(v.service_price)}}</span>/件</div>
                </div>
                <div v-show="k==current2" @mouseleave="leave2()" @click="todetail(v.pid,v.id,v.title)">
                    <div class="right1-title">{{v.title}}</div>
                      <div class="right1-desc">{{v.desc}}</div>
                      <div class="right1-promision" v-html="v.promision">
                      </div>
                      <div class="right1-price"><span>¥</span><span>{{Number(v.price)+Number(v.service_price)}}</span>/件</div>
                </div>
            </div>
          </div>
          <div class="right2">
              <div v-for="(v,k) in [...dataarr].splice(4,4)" :key="k" @mouseenter="showhover2(k)">
                <div>
                      <div class="right2-title">{{v.title}}</div>
                      <div class="right2-desc">{{v.desc}}</div>
                      <img v-show="k == 0" src="/static/images/index1.png" alt="">
                      <img v-show="k == 1" src="/static/images/index2.png" alt="">
                      <img v-show="k == 2" src="/static/images/index3.png" alt="">
                      <img v-show="k == 3" src="/static/images/index4.png" alt="">
                      <div class="right2-price"><span>¥</span><span>{{Number(v.price)+Number(v.service_price)}}</span>/件</div>
                </div>
                <div v-show="k==current3" @mouseleave="leave3()" @click="todetail(v.pid,v.id,v.title)">
                      <div class="right2-title">{{v.title}}</div>
                      <div class="right2-desc">{{v.desc}}</div>
                      <img v-show="k == 0" src="/static/images/index1.png" alt="">
                      <img v-show="k == 1" src="/static/images/index2.png" alt="">
                      <img v-show="k == 2" src="/static/images/index3.png" alt="">
                      <img v-show="k == 3" src="/static/images/index4.png" alt="">
                      <div class="right2-price"><span>¥</span><span>{{Number(v.price)+Number(v.service_price)}}</span>/件</div>
                </div>
            </div>
          </div>
        </div>
        <div class="index-risk-list-right" v-show="imgshow2">
          <div class="right1">
              <div v-for="(v,k) in  [...dataarr].splice(0,4)" @mouseenter="showhover(k)" :key="k">
                <div>
                    <div class="right1-title">{{v.title}}</div>
                      <div class="right1-desc">{{v.desc}}</div>
                      <div class="right1-promision" v-html="v.promision">
                      </div>
                      <div class="right1-price"><span>¥</span><span>{{Number(v.price)+Number(v.service_price)}}</span>/件</div>
                </div>
                <div v-show="k==current2" @mouseleave="leave2()" @click="todetail(v.pid,v.id,v.title)">
                    <div class="right1-title">{{v.title}}</div>
                      <div class="right1-desc">{{v.desc}}</div>
                      <div class="right1-promision" v-html="v.promision">
                      </div>
                      <div class="right1-price"><span>¥</span><span>{{Number(v.price)+Number(v.service_price)}}</span>/件</div>
                </div>
            </div>
          </div>
          <div class="right3">
              <div v-for="(v,k) in [...dataarr].splice(4,4)" :key="k" @mouseenter="showhover2(k)">
                <div>
                      <div class="right3-title">{{v.title}}</div>
                      <div class="right3-desc">{{v.desc}}</div>
                      <img v-show="k == 0" src="/static/images/index5.png" alt="">
                      <img v-show="k == 1" src="/static/images/index6.png" alt="">
                      <div class="right3-price"><span>¥</span><span>{{Number(v.price)+Number(v.service_price)}}</span>/件</div>
                </div>
                <div v-show="k==current3" @mouseleave="leave3()" @click="todetail(v.pid,v.id,v.title)">
                      <div class="right3-title">{{v.title}}</div>
                      <div class="right3-desc">{{v.desc}}</div>
                      <img v-show="k == 0" src="/static/images/index5.png" alt="">
                      <img v-show="k == 1" src="/static/images/index6.png" alt="">
                      <div class="right3-price"><span>¥</span><span>{{Number(v.price)+Number(v.service_price)}}</span>/件</div>
                </div>
            </div>
          </div>
        </div>
        <div class="index-risk-list-right" v-show="imgshow3">
          <div class="right1">
              <div v-for="(v,k) in  [...dataarr].splice(0,4)" @mouseenter="showhover(k)" :key="k">
                <div>
                    <div class="right1-title">{{v.title}}</div>
                      <div class="right1-desc">{{v.desc}}</div>
                      <div class="right1-promision" v-html="v.promision">
                      </div>
                      <div class="right1-price"><span>¥</span><span>{{Number(v.price)+Number(v.service_price)}}</span>/件</div>
                </div>
                <div v-show="k==current2" @mouseleave="leave2()" @click="todetail(v.pid,v.id,v.title)">
                    <div class="right1-title">{{v.title}}</div>
                      <div class="right1-desc">{{v.desc}}</div>
                      <div class="right1-promision" v-html="v.promision">
                      </div>
                      <div class="right1-price"><span>¥</span><span>{{Number(v.price)+Number(v.service_price)}}</span>/件</div>
                </div>
            </div>
          </div>
          <div class="right3">
              <div v-for="(v,k) in [...dataarr].splice(4,4)" :key="k" @mouseenter="showhover2(k)">
                <div>
                      <div class="right3-title">{{v.title}}</div>
                      <div class="right3-desc">{{v.desc}}</div>
                      <img v-show="k == 0" src="/static/images/index5.png" alt="">
                      <img v-show="k == 1" src="/static/images/index6.png" alt="">
                      <div class="right3-price"><span>¥</span><span>{{Number(v.price)+Number(v.service_price)}}</span>/件</div>
                </div>
                <div v-show="k==current3" @mouseleave="leave3()" @click="todetail(v.pid,v.id,v.title)">
                      <div class="right3-title">{{v.title}}</div>
                      <div class="right3-desc">{{v.desc}}</div>
                      <img v-show="k == 0" src="/static/images/index5.png" alt="">
                      <img v-show="k == 1" src="/static/images/index6.png" alt="">
                      <div class="right3-price"><span>¥</span><span>{{Number(v.price)+Number(v.service_price)}}</span>/件</div>
                </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="index-advantages">
      <div class="index-advantages-title"><div>我们的服务优势</div> </div>
      <div class="index-advantages-title-english">Our service advantage</div>
      <div class="index-advantages-detail">
        <div>
          <img src="/static/images/advantang1.png" alt="">
          <p>海量数据</p>
          <p>4400万＋数据库快速准确提取商标信息 轻松读秒完成查询流程</p>
        </div>
        <div>
          <img src="/static/images/advantang2.png"  alt="">
          <p>贴心服务</p>
          <p>VIP定制式全方位智能提醒 24小时商标监控预警 省时省力放心托管</p>
        </div>
        <div>
          <img src="/static/images/advantang3.png"  alt="">
          <p>极速响应</p>
          <p>智能机器人极速响应 材料一键递交审查 所有流程拒绝繁琐效率加倍</p>
        </div>
        <div>
          <img src="/static/images/advantang4.png"  alt="">
          <p>专业团队</p>
          <p>顶尖知识产权团队精心打造服务方案 行业权威专家研发企业知产保护系统</p>
        </div>
        <div>
          <img src="/static/images/advantang5.png"  alt="">
          <p>无忧保障</p>
          <p>商标成功率达到四星前期免费申请 交易零风险 有效保证客户权益</p>
        </div>
      </div>
    </div>
    <div class="index-goverment">
      <div class="index-goverment-title"><div>政府项目</div> </div>
      <div class="index-goverment-title-english">Government projects</div>
      <div class="index-goverment-chosecity">
          <div class="chosecity1">
            <span v-for="(v,k) in city" :key="k" :class="{colorChange:v.city==dynamic1}" @click="changeCity(v.city)">{{v.city}}</span>
          </div>
          <div class="chosecity2">
            <span v-for="(v,k) in area" :key="k" :class="{colorChange2:v==dynamic2}" @click="changeArea(v)">{{v}}</span>
          </div>
          <div class="chosecity3">
              <el-carousel :interval="4000" type="card" height="400px">
                <el-carousel-item v-for="(v,k) in lunbo" :key="k">
                    <div class="medium" @mouseenter="enter(k)">
                      <img src="/static/images/govermentshu.png" alt="">
                      <div>
                        <p>{{v.title}}</p>
                        <p>主管单位：{{v.unit}}</p>
                      </div>
                    </div>
                
                    <div class="medium2" v-show="seen&&k==current" @mouseleave="leave()" @click="togovermentDetail(v.id)">
                      <img src="/static/images/govermentshu.png" alt="">
                      <p>{{v.title}}</p>
                      <p>主管单位：{{v.unit}}</p>

                      <div>
                        <div>扶持政策:{{v.policy}}</div>
                        <div><p>主要条件:</p><p v-html="v.condition"></p></div>
                        <div><p>申报日期:</p><p v-html="v.cut_time"></p></div>
                      </div>
                    </div>
              
                </el-carousel-item>
              </el-carousel>
          </div>
          <div class="chosecity4" @click="watchmore">更多 <i class="el-icon-d-arrow-right"></i></div>
      </div>
    </div>
    <div class="index-new">
      <div class="index-new-div1"><div>行业热点动态</div></div>
      <div class="index-new-english">Industry trends</div>
      <div class="index-new-div2">
          <div class="index-new-div2-top">
              <div class="news-top1">
                <el-carousel :interval="5000">
                  <el-carousel-item v-for="(v,k) in newsTop" :key="k" >
                    <div @click="next(v.id)">
                      <img class="news-top1-img" :src="GLOBAL.base_url+v.url_img" alt="">
                      <div class="news-top1-div">
                          <div>{{v.new_title}}</div>
                          <div>{{v.abstract}}</div>
                      </div>
                    </div>
                  </el-carousel-item>
              </el-carousel>
              </div>
              <div class="news-top2" v-for="(v,k) in newsDetail" v-if='k== 3' @click="next(v.id)">
                  <img :src="GLOBAL.base_url+v.url_img" alt="">
                  <div>
                      <div>{{v.new_title}}</div>
                      <div>{{v.abstract}}</div>
                  </div>
              </div>
          </div>
          <div class="index-new-div2-detail">
              <div class="new-detail-list" v-for="(v,k) in [...newsDetail].splice(0,3)" @click="next(v.id)">
                <div class="list1">
                  <div>热点</div>
                  <div>{{v.new_title}}</div>
                </div>
                <div class="list2">{{v.abstract}}</div>
              </div>
          </div>
      </div>
      <div class="index-news-more" @click="tonews">
        <div>
          <span>更多资讯</span>
          <img src="/static/images/goverment5.png" alt="">
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
import {LbMove} from '@/Lunbo.js';
import Else from '../ui/else.vue';
export default {
  name: 'index',
  data(){
    return {
      bannerimg:[
        {url:'/static/images/banner1.png'},
        {url:'/static/images/banner2.png'},
      ],
      myarr:[],
      id:'',
      copyarr:[],
      word:'',
      tool:[{
              img1: '/static/images/hot1.png',
              img2: '/static/images/hot1c.png',
              title:'商标成功率评估'
          },
          {
              img1: '/static/images/hot2.png',
              img2: '/static/images/hot2c.png',
              title:'专利申请评估'
          },
          {
              img1: '/static/images/hot3.png',
              img2: '/static/images/hot3c.png',
              title:'知产管理'
          },
          {
              img1: '/static/images/hot5.png',
              img2: '/static/images/hot5c.png',
              title:'工商核名'
          }],
          see:false,
          currenttool:Number,
          imgArr:[],
          active:'success',
          changeshow1:true,
          changeshow2:false,
          changeshow3:false,
          changeshow4:false,
          imgshow1:true,
          imgshow2:false,
          imgshow3:false,
          type:1,
          dataarr:[],
          city:[],
          area:[],
          lunbo:[],
          dynamic1:'',
          dynamic2:'全部',
          seen:false,
          current:0,
          copyarr:[],
          copyright:[],
          current2:Number,
          current3:Number,
          bigArr:[],
          newsTop:[],
          newsDetail:[],
          // 代理人价格
          agencyprice:''
    }
  },
  components: {
    Top,
    Foot,
    Else,
    Fix
  },
  watch:{
    'active'(value){
      if(value == 'success'){
        this.changeshow1 = true;
        this.changeshow2 = false;
        this.changeshow3 = false;
        this.changeshow4 = false;
      }else if(value == 'name'){
        this.changeshow1 = false;
        this.changeshow2 = true;
        this.changeshow3 = false;
        this.changeshow4 = false;
      }else if(value == 'design'){
        this.changeshow1 = false;
        this.changeshow2 = false;
        this.changeshow3 = true;
        this.changeshow4 = false;
      }else if(value == 'manage'){
        this.changeshow1 = false;
        this.changeshow2 = false;
        this.changeshow3 = false;
        this.changeshow4 = true;
      }
    }
  },
  methods: {
    tip(type,msg){
          return this.$message({
              type:type,
              message:msg,
              showClose:true,
              duration:3000
          })
      },
      toolshow(k){
        this.currenttool = k;
      },
      toolleave(){
        this.currenttool = null;
      },
      tohot(val){
        if(val == 0){
          this.toregister();
        }else if(val == 1){
          this.topatentanalyse();
        }else if(val == 2){
          this.assets();
        }else{
          this.assets2();
        }
      },
      toagencyimg(){
        let routeData = this.$router.resolve({ path: '/agencyimg'});
        window.open(routeData.href, 'blank');
      },
      tomember(){
        let routeData = this.$router.resolve({ path: '/memberCenter'});
        window.open(routeData.href, 'blank');
      },
      agencyactive(){
        let routeData = this.$router.resolve({ path: '/agencyactive'});
        window.open(routeData.href, 'blank');
      },
      toactive(k){
        if(k == 1){
          let routeData = this.$router.resolve({ path: '/agencyactive'});
          window.open(routeData.href, 'blank');
        }
      },
      toprogrem(){
        this.$router.push('/load');
      },
      tolisttype(){
        this.$router.push('/listtype');
      },
      topatentanalyse(){
        if(this.$cookie.getCookie('u_id')){
          this.$router.push('/patentAnalyse');
        }else{
          this.$router.push({
              path:'/login',
              query:{
              good:0
              }
          })
          }
      },
      getNav(){
            this.$http.get(this.GLOBAL.base_url+'/api/index').then(res=>{
              // console.log(res)
              if(res.data.code == "1"){
                this.myarr = res.data.data[0].good;
                this.id = res.data.data[0].id;
                this.imgArr = res.data.others;
              }
            })
        },
        getList1(){
          this.$http.post(this.GLOBAL.base_url+'/api/patent/goodType',{
            type:'专利服务',
            grade:2
          }).then( res => {
            // console.log(res)
            this.copyarr = res.data.data
          })
        },
      getList2(){
        this.$http.post(this.GLOBAL.base_url+'/api/patent/goodType',{
          type:'版权服务',
          grade:2
        }).then( res => {
          // console.log(res)
          this.copyright = res.data.data
        })
      },
      togovermentDetail(val){
        this.$router.push({
              path:'/govermentDetail',
              query:{
                id:val
              }
          })
      },
      moveto(val,val2){
              if(val2 == '商标注册'){
                  if(this.$cookie.getCookie('u_id')){
                    this.$router.push('/recome')
                    }else{
                    this.$router.push({
                        path:'/login',
                        query:{
                        good:0
                        }
                    })
                    }
              }else{
                  this.$router.push({
                  path:'/tradeDetail',
                    query:{
                        id:val,
                        tradeid:this.id,
                        secondid:0
                    }
                });
              }
          },
      moveto1(val,val2,pid){
          this.$router.push({
                path:'/patentDetail',
                query:{
                 id:val,
                 secondid:0,
                 patentId:49
                }
          })


      },
       //版权跳转
        moveto2(val,val2,pid){
            this.$router.push({
                      path:'/copyrightDetail',
                      query:{
                       id:val,
                       secondid:0,
                       patentId:50
                      }
            })

        },
            change(val){
            this.active = val
          },
          toregister(){
          if(this.$cookie.getCookie('u_id')){
            this.$router.push('/recome')
          }else{
            this.$router.push({
              path:'/login',
              query:{
                good:0
              }
            })
          }
        },
         creatname(){
              if(this.$cookie.getCookie('u_id')){
                this.$router.push('/picksize')
                }else{
                this.$router.push({
                    path:'/login',
                    query:{
                    good:0
                    }
                })
                }
          },
      moveTo(){
        this.$router.push({
          path:'/search',
          query:{
            word:this.word
          }
          })
      },
      direct(){
        if(this.$cookie.getCookie('u_id')){
          this.$router.push('/picksize')
        }else{
          this.$router.push({
            path:'/login',
            query:{
              good:0
            }
          })
        }

      },
      todesign(){
        if(this.$cookie.getCookie('u_id')){
          this.$router.push('/designbrand')
        }else{
          this.$router.push({
            path:'/login',
            query:{
              good:0
            }
          })
        }
      },
      assets(){
        if(this.$cookie.getCookie('u_id')){
          this.$router.push('/personal/assetsManagement')
        }else {
          this.$router.push({
                path:'/login',
                query:{
                good:0
              }
          })
        }
      },
      assets2(){
        if(this.$cookie.getCookie('u_id')){
          this.$router.push('/verification')
        }else {
          this.$router.push({
                path:'/login',
                query:{
                good:0
              }
          })
        }
      },
      getrisk(){
          this.$http.get(this.GLOBAL.base_url+'/api/goodServer',{params:{
            text:"",
            user_id:this.$cookie.getCookie('u_id')
          }}).then(res=>{
                    if(res.data.code == "1"){
                      var arr = [];
                      arr = res.data.data;
                      this.bigArr = res.data.data;
                        if(this.type == 1){
                          for(var i =0;i<arr.length;i++){
                            if(arr[i].id == 51){
                              this.dataarr = arr[i].good
                            }
                          }
                        }else if(this.type == 2){
                          for(var i =0;i<arr.length;i++){
                            if(arr[i].id == 49){
                              this.dataarr = arr[i].good
                            }
                          }
                        }else{
                          for(var i =0;i<arr.length;i++){
                            if(arr[i].id == 50){
                              this.dataarr = arr[i].good
                            }
                          }
                        }
                    }
                })
        },
      changeimg(val){
            this.type = val
            if(this.type == 1){
              this.imgshow1 = true;
              this.imgshow2 = false;
              this.imgshow3 = false;
              for(var i =0;i<this.bigArr.length;i++){
                if(this.bigArr[i].id == 51){
                  this.dataarr = this.bigArr[i].good
                }
              }
            }else if(this.type == 2){
              this.imgshow1 = false;
              this.imgshow2 = true;
              this.imgshow3 = false;
              for(var i =0;i<this.bigArr.length;i++){
                if(this.bigArr[i].id == 49){
                  this.dataarr = this.bigArr[i].good
                }
              }
            }else{
              this.imgshow1 = false;
              this.imgshow2 = false;
              this.imgshow3 = true;
              for(var i =0;i<this.bigArr.length;i++){
                if(this.bigArr[i].id == 50){
                  this.dataarr = this.bigArr[i].good
                }
              }
            }
          },
           enter(index){
            this.seen = true;
            this.current = index;
          },
            leave(){
              this.seen = false;
              this.current = null;
          },
          showhover(k){
            this.current2 = k;
          },
          leave2(){
            this.current2= null;
          },
          showhover2(k){
            this.current3 = k;
          },
          leave3(){
            this.current3= null;
          },
          watchmore(){
            this.$router.push('/govermentList')
          },
          todetail(val1,val2,val3){
          if(this.type == 1){
            if(val3 == '普通商标注册'){
              if(this.$cookie.getCookie('u_id')){
                    this.$router.push('/recome')
                  }else{
                  this.$router.push({
                      path:'/login',
                      query:{
                      good:0
                      }
                  })
                }
            }else{
              this.$router.push({
                path:'/tradeDetail',
                query:{
                  id:val1,
                  secondid:val2,
                  tradeid:51
                  }
                });
            }
          }else if(this.type == 2){
            this.$router.push({
                path:'/patentDetail',
                query:{
                  id:val1,
                  secondid:val2,
                  patentid:0
                }
              })
          }else{
            this.$router.push({
                path:'/copyrightDetail',
                query:{
                  id:val1,
                  secondid:val2,
                  patentid:0
                }
              })
          }
        },
        getgoverment(){
          this.$http.get(this.GLOBAL.base_url+'/api/new/governmentNews').then(res=>{
            // console.log(res)
                    if(res.data.code == "1"){
                      this.city = res.data.data.recommend;
                      this.area = res.data.data.recommend[0].county;
                      this.dynamic1 = res.data.data.recommend[0].city;
                      this.lunbo = res.data.data.recommend[0].news;
                      this.newsTop = res.data.data.stick;
                      this.newsDetail = res.data.data.guid;
                    }
                })
        },
        changeCity(val){
          this.dynamic1 = val
          for(var i =0;i<this.city.length;i++){
          if(this.dynamic1 == this.city[i].city){
            this.dynamic2 = this.city[i].county[0];
            this.area = this.city[i].county;
            this.lunbo = this.city[i].news;
          }
        }
        },
        changeArea(val){
          this.dynamic2 = val
          this.$http.post(this.GLOBAL.base_url+'/api/new/areaProject',{
            city:this.dynamic1,
            county:this.dynamic2
          }).then(res=>{
            // console.log(res)
                    if(res.data.code == "1"){
                      this.lunbo = res.data.data;
                    }
                })
        },
      next(val){
        this.$router.push({
          path:'/news/newsdetail',
          query:{
            id:val
          }})
      },
      tonews(){
        this.$router.push('/news')
      },
      getprice(){
      this.$http.post(this.GLOBAL.base_url+'/api/remainPrice').then(res=>{
        // console.log(res)
              if(res.data.code == "1"){
                this.agencyprice = res.data.total_price;
              }
            })
    },
    brandBuy() {
      this.$router.push('/brandBuy')
    }
  },
   mounted() {
     this.getNav();
     this.getrisk();
     this.getList1();
     this.getList2();
     this.getgoverment();
     LbMove('BoxUl','btnl','btnr','BoxSwitch',true,'left',true,305,1000,3000,4);
     this. getprice();
    }
}
</script>

<style scoped>
  .index-box{
    width: 100%;
    height: 463px;
    padding-top: 18px;
    /* background: url('/static/images/banner.png') no-repeat;
    background-size: cover; */
  }
  .index-wrap-box{
    width: 1200px;
    height: 24px;
    left: 50%;
    top:80px;
    transform: translate(-50%,-50%);
    position: absolute;
    z-index: 10;
  }
  .index-wrap-box>div{
    float: left;
    width: 68px;
    font-size: 17px;
    color: #ffffff;
    margin-right: 60px;
  }
  .trade,.copyright,.patent,.property,.abouts,.index-fix-tool{
        position: relative;
        cursor: pointer;
    }
    .div1,.div2,.div3,.div4{
        position:absolute;
        background-color: rgba(51, 51, 51, 0.8);
        height: 0;
        transition: all 1s ease;
        opacity: 0;
        z-index: 10;
        overflow: hidden;
        padding-left: 20px;
    }
    .div5{
        width: 300px;
        position:absolute;
        background-color: rgba(51, 51, 51, 0.9);
        height: 0;
        transition: all 1s ease;
        opacity: 0;
        z-index: 3;
        overflow: hidden;
        left: -75px;
        margin-top: 6px;
        padding-top:13px;
        text-align: center;
    }
    .abouts:hover .div5{
        height: 32px;
        opacity: 1;
    }
    .abouts:hover{
      color: #f96006;
    }
    .div5>p{
        float: left;
        font-size: 12px;
        color: #ffffff;
        height: 30px;
        margin: 0 22px;
        vertical-align: middle;
    }
    .div5>span{
      float: left;
      font-size: 14px;
      color: #ffffff;
      vertical-align: middle;
    }
    .div1,.div4{
        width: 562px;
        margin-top: 6px;
        left: -60px;
    }
    .div1>div,.div4>div{
        width: 150px;
        float: left;
        height: 16px;
        font-size: 12px;
        color: #ffffff;
        line-height: normal;
        margin-right: 30px;
        margin-top: 15px;
        text-align: center;
    }
    .div1>div>span,.div4>div>span{
      float: right;
    }
    .div1>div>p>span,.div4>div>p>span{
      float: right;
    }
    .div2{
        line-height: normal;
        width: 580px;
        margin-top: 6px;
        left: -200px;
    }
    .div2>div{
        float: left;
        width: 95px;
        height: 20px;
         color: white;
         text-align: center;
         font-size: 12px;
         margin-top: 13px;
    }
    .div2>div>span{
        float: right;
    }
    .index-fix-tool:hover .div2{
        height: 40px;
        opacity: 1;
    }
    .index-fix-tool:hover{
      color: #f96006;
    }
    .copyright:hover .div3{
        height: 76px;
        opacity: 1;
    }
    .copyright:hover{
      color: #f96006;
    }
    .div3>div>p>span{
      float: right;
    }
    .div3{
        width:410px;
        margin-top: 6px;
        left: -140px;
    }
    .div3>div{
      width: 120px;
        float: left;
        height: 16px;
        font-size: 12px;
        color: #ffffff;
        line-height: normal;
        margin-top: 15px;
        text-align: center;
    }
    .trade:hover{
      color: #f96006;
    }
    .trade:hover .div1{
        height: 76px;
        opacity: 1;
    }
    .patent:hover{
      color: #f96006;
    }
    .patent:hover .div4{
        height: 110px;
        opacity: 1;
    }
  .index-title{
    width: 672px;
    height: 67px;
    font-size: 48px;
    margin: 80px auto 10px;
    text-align: center;
    color: white;
  }
 .index-dec{
   width: 617px;
    height: 36px;
    font-size: 24px;
    margin: 0 auto 40px;
    text-align: center;
    color: white;
 }
.index-search{
    width: 950px;
    height: 63px;
    left: 50%;
    top:340px;
    transform: translate(-50%,-50%);
    position: absolute;
    z-index: 10;
    padding: 8px 0 0 10px;
    background-color: rgba(255, 255, 255, 0.5);
  }
  .index-search>div{
    float: left;
  }
  .index-search-box-div1{
    width: 160px;
    height: 54px;
    border: solid 1px #e1e2e2;
    background-color: white;
    text-align: center;
    line-height: 54px;
    font-size: 18px;
    color: #333333;
    margin-right: 4px;
  }

  .index-search-box-div2>input{
    width: 600px;
    height: 54px;
    border: solid 1px #d7d8d9;
    font-family: "PingFangSC-Regular";
    outline: none;
    padding-left: 18px;
    font-size: 16px;
    vertical-align: middle;
    color: #333333!important;
    margin-right: 4px;
  }
  .index-search-box-div2>img{
    width: 154px;
    height: 54px;
    margin-bottom: 2px;
    vertical-align: middle;
    cursor: pointer;
  }
  .index-top-tool{
     width: 100%;
     height: 80px;
     position: absolute;
     z-index: 10;
     top:452px;
     background-color: rgba(41, 41, 41, 0.9);
  }
  .top-tool-bigdiv{
    width: 1165px;
    height: 80px;
    margin: 0 auto;
    /* border:1px solid red; */
  }
.top-tool-bigdiv>div{
  float: left;
}
.big-div1{
  width: 71px;
  height: 64px;
  margin: 8px 92px 0 0;
  background: url('/static/images/hottool.png') no-repeat;
}
.big-div1>div{
  width: 42px;
  height: 56px;
  font-size: 20px;
  color: white;
  margin: 4px 0 0 12px;
}
.big-div2{
  height: 64px;
  margin-top: 6px;
  /* border:1px solid red; */
}
.big-div2>div{
  position: relative;
  width: 112px;
  text-align: center;
  font-size: 16px;
  color: white;
  float: left;
}
.big-div2>div>div{
  width: 112px;
  text-align: center;
}
.big-div2>div:nth-of-type(1){
  margin-right: 152px;
}
.big-div2>div:nth-of-type(2){
  margin-right: 160px;
}
.big-div2>div:nth-of-type(3){
  margin-right: 160px;
}
.bigzhen1{
  cursor: pointer;
}
.bigzhen2{
  position: absolute;
  color: #f96006;
  top:0;
  z-index: 10;
  cursor: pointer;
  background-color: rgba(41, 41, 41, 0.4);
}
.index-tool{
  width: 100%;
  height: 378px;
  background-color: #f7f7f7;
  padding-top: 60px;
}
.Box {position: relative;}
.Box .content {width: 1200px;margin: 0 auto 40px;}
.Box .Box_con {position: relative;}
.Box .Box_con .btnl {position: absolute;}
.Box .Box_con .btn {display: block;width: 21px;height: 37px;position: absolute;top: 80px;cursor: pointer;}
.Box .Box_con .btnl {background: url('/static/images/jtl02.png') no-repeat center;left: 0px; z-index: 10;}
.Box .Box_con .btnr {background: url('/static/images/jtr02.png') no-repeat center;right: 0px; z-index: 10;}
.Box .Box_con .conbox {position: relative;overflow: hidden;}
.Box .Box_con .conbox ul {position: relative;list-style: none;}
.Box .Box_con .conbox ul li {float: left;width: 285px;height: 200px;margin-left: 20px;overflow: hidden;cursor: pointer;}
.Box .Box_con .conbox ul li:first-child {margin-left: 0;}
.Box .Box_con .conbox ul li img {display: block;width: 285px;height: 200px;transition: all 0.5s;}
.Box .Box_con .conbox ul li div{width: 285px;height: 50px;line-height: 50px; position: absolute;top:123px;z-index: 2;font-size: 20px;text-align: center;color: #fdd468;}
.Box .Box_con .conbox ul li div span{font-size: 32px; font-weight: 600;}
.Box .Box_con .conbox ul li:hover img {transform: scale(1.1);}
.Box .BoxSwitch {margin-top: 30px;text-align: center;}
.Box .BoxSwitch span {display: inline-block;*display: inline;*zoom: 1;vertical-align: middle;width: 30px;height: 3px;background: #ccc;margin: 0 5px;cursor: pointer;}
.Box .BoxSwitch span.cur {background: red;}
.index-tool-title{
    width: 596px;
    height: 45px;
    background: url('/static/images/title-img.png') no-repeat;
    margin: 0 auto;
    background-position:center;
  }
  .index-tool-title>div{
    width: 320px;
    height: 45px;
    font-size: 32px;
    font-weight: 100;
    margin: 0 auto;
    color: #333333;
  }
  .index-tool-title-english{
    width: 330px;
    height: 20px;
    font-size: 14px;
    text-align: center;
    margin: 0 auto 31px;
    color: #999999;
  }
  .index-tool-list{
    width: 900px;
    height: 40px;
    margin: 0 auto 28px;
  }
  .index-tool-list>div{
    height: 40px;
  }
  .index-tool-list>div>div{
    width: 128px;
    text-align: center;
    float: left;
    height: 37px;
    font-size: 16px;
    color: #333333;
    margin-right: 128px;
    cursor: pointer;
  }
.index-tool-list>div>div:last-child{
  margin-right: 0;
}
.success .div-div1,.name .div-div2,.design .div-div3,.manage .div-div4{
    color: #f96006;
    border-bottom: 3px solid #f96006;
  }
.index-tool-detail{
  width:100%;
  height: 500px;
  padding-top: 28px;
  background: url('/static/images/tool.png') no-repeat;
  background-size: cover;
}
.index-success{
  width: 975px;
  height: 480px;
  margin: 0 auto;
}
.index-success>div{
  float: left;
}
.index-success>div:nth-of-type(2){
  width: 231px;
  margin-left: 142px;
}
.index-success>div:nth-of-type(2)>div:nth-of-type(1){
  margin: 52px 0 25px;
  font-size: 22px;
  color: #333333;
}
.index-success>div:nth-of-type(2)>div:nth-of-type(2){
  margin-bottom: 28px;
  height: 160px;
  font-size: 18px;
  line-height: 1.78;
  color: #999999;
}
.index-success>div:nth-of-type(2)>div:nth-of-type(3){
  width: 118px;
  height: 32px;
  text-align: center;
  line-height: 32px;
  font-size: 16px;
  color: #f96006;
  border: solid 2px #f96006;
  cursor: pointer;
}
.index-risk{
  width: 100%;
  height: 648px;
  padding-top: 37px;
  background: url('/static/images/risk.png') no-repeat;
  background-size: cover;
}
.index-risk-title{
  width: 543px;
  height: 45px;
  background: url('/static/images/title-img2.png') no-repeat;
  margin: 0 auto;
  background-position:center;
}
.index-risk-title>div{
  width: 267px;
  height: 45px;
  font-size: 32px;
  font-weight: 100;
  margin: 0 auto;
  color: #333333;
}
.index-risk-title-english{
  width: 300px;
  margin: 0 auto 51px;
  font-size: 14px;
  text-align: center;
  color: #999999;
}
.index-risk-list{
  width: 1210px;
  height: 450px;
  margin: 0 auto;
  /* border:1px solid red; */
}
.index-risk-list>div{
  float: left;
}
.index-risk-list-left{
  position: relative;
  width: 268px;
  height: 450px;
}
.index-risk-list-left>img{
  width: 288px;
  height: 470px;
  position: absolute;
  top:-10px;
  left: -10px;
}
.index-risk-list-left>div{
  width: 35px;
  height: 75px;
  position: absolute;
  z-index: 10;
  color: white;
  font-size: 16px;
  line-height: 1.13;
  /* border:1px solid red; */
  text-align: center;
  cursor: pointer;
}
.left1{
  top:45px;
}
.left2{
  top:145px;
}
.left3{
  top:245px;
}
.index-risk-list-right{
  width: 940px;
  height: 450px;
  margin-top: -2px;
  box-shadow: 0 2px 8px 0 rgba(255, 107, 0, 0.19);
}
.right1{
  height: 277px;
}
.right1>div{
  float: left;
  width: 234px;
  height: 276px;
  border-right:solid 1px #dadadd;
  border-bottom:solid 1px #dadadd;
  cursor: pointer;
  position: relative;
}
.right1>div>div:nth-of-type(1){
  position: absolute;
  z-index: 2;
  width: 234px;
  height: 276px;
  border-right:solid 1px #dadadd;
  border-bottom:solid 1px #dadadd;
  background: #ffffff;
}
.right1>div>div:nth-of-type(2){
  position: absolute;
  z-index: 10;
  box-shadow: 0 8px 12px 0 rgba(255, 107, 0, 0.19);
  width: 234px;
  height: 276px;
  border-right:solid 1px #dadadd;
  border-bottom:solid 1px #dadadd;
  background: #ffffff;
}
.right1-title{
  margin: 29px 0 6px 21px;
  font-size: 18px;
  font-weight: 500;
  color: #333333;
}
.right1-desc{
  width: 197px;
  height: 40px;
  font-size: 14px;
  margin: 0 0 30px 21px;
  color: #999999;
  overflow : hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}
.right1-promision{
  width: 187px;
  height: 75px;
  overflow: hidden;
  font-size: 14px;
  color: #333333;
  margin: 0 0 8px 21px;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 4;
  -webkit-box-orient: vertical;
}
.right1-price{
  margin-left: 65px;
  font-size: 14px;
  color: #333333;
}
.right1-price>span:nth-of-type(1){
  font-size: 20px;
  color: #f96006;
}
.right1-price>span:nth-of-type(2){
  font-size: 30px;
  color: #f96006;
}
.right2{
  height: 172px;
}
.right2>div{
  float: left;
  width: 234px;
  border-right:solid 1px #dadadd;
  border-bottom:solid 1px #dadadd;
  cursor: pointer;
  height: 172px;
  position: relative;
}
.right2>div>div:nth-of-type(1){
  position: absolute;
  z-index: 2;
  width: 234px;
  height: 172px;
  border-right:solid 1px #dadadd;
  border-bottom:solid 1px #dadadd;
  background: #ffffff;
}
.right2>div>div:nth-of-type(2){
  position: absolute;
  z-index: 10;
  box-shadow: 0 8px 12px 0 rgba(255, 107, 0, 0.19);
  width: 234px;
  height: 172px;
  border-right:solid 1px #dadadd;
  border-bottom:solid 1px #dadadd;
  background: #ffffff;
}
.right2-title{
  font-size: 18px;
  font-weight: 500;
  margin: 20px 0 6px 21px;
  color: #333333;
}
.right2-desc{
  width: 194px;
  height: 40px;
  margin: 0 0 20px 21px;
  font-size: 14px;
  color: #999999;
  overflow : hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}
.right2>div>div>img{
  position: absolute;
  z-index: -10;
  right: 4px;
  bottom: 0;
}
.right2-price{
  margin-left: 21px;
  font-size: 12px;
  color: #333333;
}
.right2-price>span:nth-of-type(1){
  font-size: 14px;
  color: #f96006;
}
.right2-price>span:nth-of-type(2){
  font-size: 26px;
  color: #f96006;
}
.right3{
  height: 172px;
}
.right3>div{
  float: left;
  width: 469px;
  border-right:solid 1px #dadadd;
  border-bottom:solid 1px #dadadd;
  cursor: pointer;
  height: 172px;
  position: relative;
}
.right3>div>div:nth-of-type(1){
  position: absolute;
  z-index: 2;
  width: 469px;
  height: 172px;
  border-right:solid 1px #dadadd;
  border-bottom:solid 1px #dadadd;
  background: #ffffff;
}
.right3>div>div:nth-of-type(2){
  position: absolute;
  z-index: 10;
  box-shadow: 5px 8px 12px 0 rgba(255, 107, 0, 0.19);
  width: 469px;
  height: 172px;
  border-right:solid 1px #dadadd;
  border-bottom:solid 1px #dadadd;
  background: #ffffff;
}
.right3-title{
  font-size: 18px;
  font-weight: 500;
  margin: 20px 0 6px 21px;
  color: #333333;
}
.right3-desc{
  width: 264px;
  height: 40px;
  margin: 0 0 20px 21px;
  font-size: 14px;
  color: #999999;
  overflow : hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}
.right3>div>div>img{
  position: absolute;
  z-index: -10;
  right: 0;
  bottom: 0;
}
.right3-price{
  margin-left: 175px;
  font-size: 12px;
  color: #333333;
}
.right3-price>span:nth-of-type(1){
  font-size: 14px;
  color: #f96006;
}
.right3-price>span:nth-of-type(2){
  font-size: 26px;
  color: #f96006;
}
.index-advantages{
  width: 100%;
  height: 440px;
  padding-top: 55px;
}
.index-advantages-title{
  width: 500px;
  height: 45px;
  background: url('/static/images/title-img3.png') no-repeat;
  margin: 0 auto;
  background-position:center;
}
.index-advantages-title>div{
  width: 224px;
  height: 45px;
  font-size: 32px;
  font-weight: 100;
  margin: 0 auto;
  color: #333333;
}
.index-advantages-title-english{
  width: 285px;
  margin: 0 auto 50px;
  font-size: 14px;
  text-align: center;
  color: #999999;
}
.index-advantages-detail{
  width: 1195px;
  height: 235px;
  margin: 0 auto;
}
.index-advantages-detail>div{
  float: left;
  width: 231px;
  text-align: center;
  margin-right: 10px;
}
.index-advantages-detail>div:last-child{
  margin-right: 0;
}
.index-advantages-detail>div>p:nth-of-type(1){
  margin:6px 0 6px;
  font-size: 20px;
  font-weight: 500;
  color: #333333;
}
.index-advantages-detail>div>p:nth-of-type(2){
  font-size: 14px;
  color: #999999;
}
.index-goverment{
  width: 100%;
  height: 790px;
  padding-top: 55px;
  background: url('/static/images/goverment.png') no-repeat;
  background-size: cover;
  margin-bottom: 1px;
}
.index-goverment-title{
  width: 404px;
  height: 45px;
  background: url('/static/images/title-img4.png') no-repeat;
  margin: 0 auto;
  background-position:center;
}
.index-goverment-title>div{
  width: 128px;
  height: 45px;
  font-size: 32px;
  font-weight: 100;
  font-size: 32px;
  font-weight: 100;
  margin: 0 auto;
  color: white;
}
.index-goverment-title-english{
  width: 285px;
  margin: 0 auto 50px;
  font-size: 14px;
  text-align: center;
  color: #999999;
}
.index-goverment-chosecity{
  width: 1095px;
  height: 600px;
  /* border:1px solid red; */
  margin: 0 auto;
}
.chosecity1{
  height: 34px;
  line-height: 34px;
  margin-bottom: 21px;
}
.chosecity1>span{
  width: 72px;
  text-align: center;
  display: inline-block;
  font-size: 16px;
  font-weight: 500;
  color: #999999;
  margin-right: 55px;
  cursor: pointer;
}
.chosecity2{
  margin-left: 15px;
  margin-bottom: 40px;
}
.chosecity2>span{
  display: inline-block;
  font-size: 14px;
  font-weight: 500;
  color: white;
  margin-right: 36px;
  margin-bottom: 20px;
  cursor: pointer;
}
.chosecity3{
  width: 1095px;
  height: 400px;
  /* border:1px solid red; */
  text-align: center;
  margin-bottom: 30px;
}
.chosecity4{
  color: white;
  font-size: 14px;
  float: right;
  cursor: pointer;
}
 .colorChange{
    width: 72px;
    height: 33px;
    border-radius: 20px;
    background-image: linear-gradient(to bottom, #fb9952, #f96006);
    font-size: 16px;
    font-weight: 500;
    color: white!important;
  }
  .medium>img{
    margin:124px 0 24px;
  }
  .medium>div{
    margin: 0 auto;
    width: 280px;
    height: 65px;
    border-bottom:1px solid white;
  }
  .medium>div>p:nth-of-type(1){
    margin: 0 auto;
    width: 280px;
    font-size: 22px;
    color: white;
    text-align: center;
    white-space:nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
   .medium>div>p:nth-of-type(2){
     width: 280px;
    font-size: 14px;
    color: white;
    text-align: center;
    white-space:nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
   }
  .colorChange2{
    color: #f96006!important;
  }
.medium{
  position: fixed;
  width: 100%;
  height: 100%;
  z-index: 1;
}
.medium2{
  position: fixed;
  width: 100%;
  height: 100%;
  background-image: linear-gradient(to bottom, #ffb765, #ff6924 99%);
  z-index: 1000;
}
.medium2>img{
  margin: 32px 0 10px;
}
.medium2>p:nth-of-type(1){
  width: 280px;
  margin: 0 auto 4px;
  text-align: center;
  white-space:nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: 22px;
  color: white;
}
.medium2>p:nth-of-type(2){
  width: 280px;
  margin: 0 auto 4px;
  text-align: center;
  white-space:nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: 14px;
  color: white;
}
.medium2>div{
  width: 322px;
  height: 195px;
  border: solid 1px rgba(255, 255, 255, 0.5);
  margin: 0 auto;
  padding: 10px;
  font-size: 16px;
  font-weight: 300;
  color: white;
  overflow: hidden;
}
.medium2>div>div:nth-of-type(1){
  width: 322px;
  white-space:nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  margin-bottom: 6px;
}
.medium2>div>div:nth-of-type(2){
  width: 322px;
  height: 145px;
  overflow : hidden;
  margin-bottom: 6px;
}
.medium2>div>div:nth-of-type(3){
  width: 322px;
}
.medium2>div>div:nth-of-type(2)>p{
  float: left!important;
}
.medium2>div>div:nth-of-type(3)>p{
  float: left!important;
}
.medium2>div>div:nth-of-type(3)>p:nth-of-type(2){
  width: 250px!important;
  white-space:nowrap!important;
  overflow: hidden!important;
  text-overflow: ellipsis!important;
}
  .index-new{
    width: 100%;
    height: 830px;
    padding-top: 55px;
     background-color: #f6f7f8;
  }
  .index-new-div1{
    width: 468px;
    height: 45px;
    background: url('/static/images/title-img5.png') no-repeat;
    margin: 0 auto;
    background-position:center;
  }
  .index-new-div1>div{
      width: 192px;
      height: 45px;
      font-size: 32px;
      font-weight: 100;
      text-align: center;
      color: #292929;
      margin: 0 auto;
  }
  .index-new-english{
      width: 192px;
      font-size: 14px;
      text-align: center;
      color: #999999;
      margin: 0 auto 50px;
  }
  .index-new-div2{
    width: 1148px;
    height: 617px;
    margin: 0 auto 33px;
    background-color: #ffffff;
  }
  .index-new-div2-top{
    width: 1148px;
    height: 300px;
    margin-bottom: 60px;
  }
  .index-new-div2-top>div{
    float: left;
    position: relative;
  }
  .news-top1{
    width: 746px;
    height: 300px;
    margin-right: 20px;
    cursor: pointer;
  }
  .news-top1-img{
    width: 746px;
    height: 300px;
  }
  .news-top1-div{
     position: absolute;
     bottom: 0;
     width: 746px;
     height: 168px;
     background-color: rgba(0, 0, 0, 0.6);
   }
   .news-top1-div>div:nth-of-type(1){
    width: 589px;
    height: 40px;
    margin: 24px auto 12px;
    font-size: 28px;
    color: #ffffff;
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
  }
  .news-top1-div>div:nth-of-type(2){
    width: 674px;
    height: 75px;
    font-size: 18px;
    font-weight: 300;
    color: #ffffff;
    margin: 0 auto;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
  }
  .news-top2{
    width: 382px;
    height: 300px;
    cursor: pointer;
  }
   .news-top2>img{
     width: 382px;
     height: 300px;
   }
   .news-top2>div{
     position: absolute;
     bottom: 0;
     width: 382px;
    height: 168px;
     background-color: rgba(0, 0, 0, 0.6);
   }
  .news-top2>div>div:nth-of-type(1){
    width: 168px;
    height: 40px;
    margin: 24px auto 12px;
    font-size: 28px;
    color: #ffffff;
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
  }
  .news-top2>div>div:nth-of-type(2){
    width: 310px;
    height: 75px;
    font-size: 18px;
    font-weight: 300;
    color: #ffffff;
    margin: 0 auto;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
  }
  .index-new-div2-detail{
    width: 100%;
    height: 220px;
  }
  .new-detail-list{
    width: 310px;
    height: 220px;
    float: left;
    cursor: pointer;
    margin: 0 36px;
  }
  .list1{
    width: 310px;
    height: 40px;
    border-bottom:2px solid #333333;
    margin-bottom: 16px;
  }
  .list1>div{
    float: left;
  }
  .list1>div:nth-of-type(1){
    width: 54px;
    height: 22px;
    border: solid 1px #333333;
    font-size: 20px;
    text-align: center;
    line-height: 20px;
    color: #111111;
    margin-top: 2px;
    margin-right: 8px;
  }
  .list1>div:nth-of-type(2){
    width: 245px;
    height: 28px;
    font-size: 20px;
    color: #111111;
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
  }
  .list2{
    width: 310px;
    height: 150px;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 7;
    -webkit-box-orient: vertical;
    font-size: 16px;
    font-weight: 300;
    color: #666666;
  }
  .index-news-more{
    width: 1148px;
    margin: 0 auto;
  }
  .index-news-more>div{
    float: right;
    cursor: pointer;
  }
  .index-news-more>div>span{
    font-size: 14px;
    color: #999999;
    vertical-align: middle;
  }
  .index-news-more>div>img{
    vertical-align: middle;
  }
  .agency-active{
    width: 552px;
    height: 134px;
    margin: 80px auto 0;
  }
  .agency-active>div:nth-of-type(1){
    font-size: 48px;
    text-align: center;
    color: white;
    margin-bottom: 8px;
  }
  .agency-active>div:nth-of-type(2){
    width: 517px;
    height: 64px;
    line-height: 64px;
    font-size: 32px;
    margin: 0 auto;
    text-align: center;
    color: #fdd468;
    background: url('/static/images/priceback.png') no-repeat;
    background-size: cover;
  }
  .agency-active>div:nth-of-type(2)>span{
    font-size: 48px;
    font-weight: 600;
  }
</style>
<style>
  .el-carousel__item div {
    text-align: center;
  }

  .el-carousel__item{
    background: url('/static/images/lunbo2.png') no-repeat;
    background-size: cover;
  }

  .el-carousel>ul>li>button{
    display: none;
  }

</style>
