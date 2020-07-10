<template>
  <div class="recome">
    <Top></Top>
    <Fix></Fix>
     <div class="recome-box">
         <div class="recome-middle">
             <div class="recome-middle-top">
                 <div>AI商标注册</div>
                 <img src="/static/images/xiaoguo.png" alt="">
             </div>
             <div class="recome-name" v-show="nameshow">
                 <div class="recome-name-title">请输入你要申请的商标名称</div>
                 <div class="recome-name-picktype">
                     <div class="recome-name-picktype-detail">
                         <div class="detail-div1">
                             <span>商标类型</span>
                             <input  value="1" v-model="picked1" name="type1" type="radio"><span>文字商标</span>
                             <input  value="2" v-model="picked1" name="type1" type="radio"><span>图形商标</span>
                             <input  value="3" v-model="picked1" name="type1" type="radio"><span>图文组合</span>
                         </div>
                         <div class="detail-div2" v-if="picked1 == '1'">
                             <div class="detail-div2-writename">
                                 <span>商标名称</span>
                                 <input type="text" v-model.trim="printkey" @blur="motecreat">
                             </div>
                             <div class="detail-div2-img">
                                 <span>商标图样</span>
                                 <input  value="1" v-model="picked2" name="type2" type="radio"><span>自动生成</span>
                                 <input  value="2" v-model="picked2" name="type2" type="radio"><span>手动上传</span>
                             </div>
                             <div class="detail-div2-imgshow" v-if="picked2 == '1'">
                                 <div>
                                     <img :src="GLOBAL.base_url+this.pic1" alt="">
                                 </div>
                                 <div>
                                     <p>如：</p><img src="/static/images/zhiyi.png" alt="">
                                     <p>指仅用文字构成的商标，包括中国汉字和少数名族字、外国文字和阿拉伯数字或以各种不同字组合的商标</p>
                                 </div>
                             </div>
                             <div class="detail-div2-uploadimgshow" v-if="picked2 == '2'">
                                 <div>
                                     <el-upload
                                    accept="image/*"
                                    :http-request="upload"
                                    :show-file-list="false"
                                    action="">
                                    <img class="idimg" :src="pic2_url?pic2_url:'/static/images/please2.png'" alt="">
                                    </el-upload>
                                    <div class="remark1">注：黑白注册，注册后可以更换商标颜色使用，上传的图样必须是黑白颜色；指定颜色注册，注册后只能按照上传图样的颜色使用</div>
                                 </div>
                                
                                <div class="detail-div2-uploadimgshow-div">
                                    <input  value="1" v-model="picked3" name="type3" type="radio"><span>原图</span>
                                    <input  value="2" v-model="picked3" name="type3" type="radio"><span>黑白</span>
                                </div>
                            </div>
                            <div class="detail-picksize" v-if="picked2 == '1'">
                                <span>商标字体</span>
                                <el-select v-model="value" @change="getimg">
                                    <!-- <el-option  value="选择字体"></el-option> -->
                                    <el-option
                                    v-for="item in fontoptions"
                                    :key="item.id"
                                    :label="item.font_name"
                                    :value="item.id">
                                    </el-option>
                                </el-select>
                            </div>
                         </div>
                         <div class="detail-tuxing" v-if="picked1 == '2'">
                             <span>商标图样</span>
                             <div>
                                 <div>
                                        <el-upload
                                        accept="image/*"
                                        :http-request="upload2"
                                        :show-file-list="false"
                                        action="">
                                        <img class="idimg" :src="pic3_url?pic3_url:'/static/images/please2.png'" alt="">
                                    </el-upload>
                                    <div>
                                        <div class="recome-tip">
                                            <p>如：</p><img src="/static/images/recomelogo1.png" alt="">
                                            <p>指仅用图形构成的商标，不包含任何文字</p>
                                        </div>
                                        <div class="remark1">注：黑白注册，注册后可以更换商标颜色使用，上传的图样必须是黑白颜色；指定颜色注册，注册后只能按照上传图样的颜色使用</div>
                                    </div>
                                 </div>
                                <div class="detail-tuxing-div">
                                    <input  value="1" v-model="picked4" name="type4" type="radio"><span>原图</span>
                                    <input  value="2" v-model="picked4" name="type4" type="radio"><span>黑白</span>
                                </div>
                             </div>
                         </div>
                         <div class="detail-tuwen" v-if="picked1 == '3'">
                             <div class="detail-div2-writename">
                                 <span>商标名称</span>
                                 <input type="text" v-model.trim="printkey2">
                             </div>
                              <div class="detail-tuwendetail">
                                <span>商标图样</span>
                                <div>
                                    <div>
                                        <el-upload
                                        accept="image/*"
                                        :http-request="upload3"
                                        :show-file-list="false"
                                        action="">
                                        <img class="idimg" :src="pic4_url?pic4_url:'/static/images/please2.png'" alt="">
                                    </el-upload>
                                    <div>
                                        <div class="recome-tip">
                                            <p>如：</p><img src="/static/images/recomelogo2.jpg" alt="">
                                            <p>指由文字、图形等两种或两种以上元素结合构成的商标</p>
                                        </div>
                                        <div class="remark1">注：黑白注册，注册后可以更换商标颜色使用，上传的图样必须是黑白颜色；指定颜色注册，注册后只能按照上传图样的颜色使用</div>
                                    </div>
                                    </div>
                                    
                                    <div class="detail-tuwendetail-div">
                                        <input  value="1" v-model="picked5" name="type5" type="radio"><span>原图</span>
                                        <input  value="2" v-model="picked5" name="type5" type="radio"><span>黑白</span>
                                    </div>
                                </div>
                            </div>
                         </div>
                         <div class="recome-next1" @click="namenext">下一步</div>
                     </div>
                 </div>
             </div>
             <div class="recome-type" v-show="typeshow">
                 <div class="recome-type-title">请选择你添加商标类别的方式</div>
                 <div class="recome-type-chosetype">
                     <div>
                         <div :class="changetype">
                            <div class="chosetype1" @click="picktype('guild')">智能推荐</div>
                            <div v-show="historyshow" class="chosetype2" @click="picktype('history')">历史类别</div>
                            <div class="chosetype3" @click="picktype('chose')">自助选择</div>
                            <div class="chosetype4" @click="picktype('all')">全类保护</div>
                        </div>
                        <div class="recome-next1" @click="typenext">下一步</div>
                     </div>
                 </div>
             </div>
             <div class="recome-guild" v-show="pickguildshow">
                <div class="recome-guild-title">请选择你所在的行业领域</div>
                <div class="recome-guild-pickguild">
                    <div>输入您的产品名称或者服务行业</div>
                    <div>
                        <div><input type="text" placeholder="例如：T恤，酒店" v-model="key"></div>
                        <div @click="guildcomfire">确定</div>
                    </div>
                    <div v-show="guildshow">
                        <div class="guild-box-get">
                            <div v-for="(m,n) in 7">
                                <div v-for="(v,k) in [...trade].splice((m-1)*3,3)" @click="find(v.id,m)" class="guild-box-get-big" :class='{active:v.id==id}'>
                                <span >{{v.title}}</span>   
                                </div>
                                <div class="guild-box-get-little">
                                    <div v-show="num1 == m"  v-for="(item,index) in little">
                                    <input type="checkbox" v-model="box1" :value="item.groups" checked="pick(item.groups)">
                                    <span> {{item.title}}</span>
                                    </div>
                                </div>
                                <div style="clear:both"></div>
                            </div>
                        </div>
                        <div class="recome-next1" @click="guildnext">下一步</div>
                    </div>
                </div>
             </div>
             <div class="recome-pickhistory" v-show="pickhistoryshow">
                 <div class="recome-pickhistory-title">请选择你要注册的同类别的商标</div>
                 <div class="recome-pickhistory-list">
                     <div class="recome-pickhistory-list-div1">
                         <div :class="changeClass">
                             <div @click="changeType('history')" class="historytrade">历史商标</div>
                             <div @click="changeType('import')" class="importtrade">导入的商标</div>
                             <div class="recome-pickhistory-list-div1-search">
                                 <input type="text" placeholder="请输入大类或商标名称" v-model="searchkey"><div @click="historysearch">搜索</div>
                             </div>
                         </div>
                     </div>
                     <div class="recome-pickhistory-list-div2">
                         <div v-for="(v,k) in history">
                             <img v-if="changeClass == 'history'" :src="GLOBAL.base_url+v.brand_img" alt="" :class="{historychange: historyisTags(v.id)}" @click="gethistorylittle(v.id)">
                            <img v-if="changeClass == 'import'" :src="'data:image/png;base64,'+v.brand_img" :class="{historychange: historyisTags(v.id)}" @click="gethistorylittle(v.id)" alt="">
                            <div>{{v.one_cate}}类</div>
                            <p @click="watchhistorylittle(v.one_cate,k)">查看类别</p>
                         </div>
                     </div>
                     <div class="recome-next1" @click="historynext">下一步</div>
                     <div class="recome-pickhistory-list-watchlittle" v-show="historylittleshow">
                        <div class="recome-pickhistory-list-watchlittle-detail">
                            <img src="/static/images/cha.png" alt="" @click="historycha">
                            <div class="recome-pickhistory-list-watchlittle-detail-div">
                                <div><span></span><span></span></div>
                                <div>
                                    <div>商标类别</div>
                                    <div>
                                        <div>{{historycate}}类</div>
                                        <div>
                                            <span v-for="(item,index) in historyarr">{{item.num}} {{item.name}}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                 </div>
             </div>
             <div class="recome-recomed" v-show="recomedshow">
                 <div class="recomed1">请选择你要注册的类别</div>
                 <div class="recomed2">
                     <div class="recomed2-bigdiv">
                         <div class="recomed2-bigdiv-left">
                             <div class="recomed2-bigdiv-left-search">
                                 <input type="text" placeholder="请输入产品或服务名称" v-model="searchkeyword" @keyup.enter="regsearch">
                                 <img src="/static/images/orderSearch.png" alt="">
                             </div>
                            <div class="recomed2-bigdiv-left-three-link">
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
                         </div>
                         <div class="recomed2-bigdiv-right">
                             <div class="recomed2-bigdiv-right-top">
                                 <div>推荐注册的商品项目</div>
                                 <div @click="showprice">费用标准说明</div>
                                 <div v-show="priceshow">
                                     <p>1.每个类别的基础价格包含10个小商品，超过10个商品的每个小商品加收50元；</p>
                                    <p>2.每个类别的总计金额为:官费+服务费+50*(小商品数量-10)，小商品数量不足10个的以10个计算；</p>
                                    <p>3.四星商标注册(成功指数高于三星)，首次无需支付任何费用，初审公告后再支付全部费用；</p>
                                    <p>4.三星商标注册(成功指数为三星)，首次支付费用为：300+30*(小商品数量-10)，初审公告后再支付尾款；</p>
                                    <p>5.普通商标注册(成功指数低于三星)，首次需支付全部费用；</p>
                                 </div>
                             </div>
                             <div class="recomed2-bigdiv-right-showtype">
                                  <div class="recomed2-bigdiv-right-showtype-cirl" v-for="(item,index) in suggest">
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
                                                <div @click="del(item.num,v.num,index,n,m.id,k)">x</div>
                                            </div>
                                            <div id="clear"></div>
                                            <!-- <div class="add" @click="zu(item.num,v.num)">添加</div> -->
                                        </div>
                                        <div style="clear:both;"></div>
                                    </div>
                                    <div class="type-box-right-showtype-choose"> 
                                        <div class="type-box-right-showtype-choose-div1">
                                            <div>已选<span>{{item.chose}}</span>项 <span v-if="agency == 2">(超过10项，每项加收{{littleprice}}元)</span> <span v-else>(超过10项，每项加收50元)</span></div>
                                            <div>
                                                <span>总计金额：</span>
                                                <span>￥{{item.price}} </span>
                                            </div>
                                        </div>
                                        <div class="type-box-right-showtype-choose-div2">
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
                             <div class="type-box-right-showtype-addcart">
                                <div>
                                    <input type="checkbox" :checked='allcheck' @click="choseall"><span>全选</span>
                                </div>
                                <div id="type-box-right-showtype-addcart-del" @click="deldata">删除</div>
                            </div>
                         </div>
                     </div>
                     <div class="type-box-total">
                         <div @click="rightbuy" v-show="buttonshow">立即购买</div>
                         <div @click="addcart">加入购物车</div>
                         <div :="money">
                             <span>已选{{totalnum}}项，应付总额：</span>
                             <span>￥{{totalprice}}</span>
                         </div>
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
     <div class="table" v-show="maskshow">
        <el-table
         v-loading="loading" class="table">
         </el-table>
     </div>
  </div>
</template>

<script>
import Top from '../ui/top.vue';
import Foot from '../ui/foot.vue';
import Fix from '../ui/fix.vue';
export default {
  name: 'recome',
  data(){
    return{
        nameshow:true,
        picked1:"1",
        picked2:"1",
        picked3:"1",
        picked4:'1',
        picked5:'1',
        pic1:'',
        pic2:'',
        pic2_url:'',
        pic3:'',
        pic3_url:'',
        pic4:'',
        pic4_url:'',
        value:1,
        printkey:'',
        printkey2:'',
        fontoptions:[],
        typeshow:false,
        type1:'',
        type2:'',
        type3:'',
        type4:'',
        type5:'',
        type6:'',
        loading: true,
        maskshow:false,
        // 总的商标名称
        keyword:'',
        // 总的图片路径
        srcurl:'',
        // 判断历史类别显示隐藏
        pickhistoryshow:false,
        historyshow:Boolean,
        changetype:'guild',
        // 输入的行业名称
        // 小行业
        littlejob:'',
        pickguildshow:false,
        key:'',
        guildshow:false,
        trade:[],
        id:'',
        little:[],
        num1:'',
        box1:[],
        // 历史类别
        history:[],
        changeClass:'history',
        searchkey:'',
        // 历史类别大类
        historylittleshow:false,
        historycate:'',
        historyarr:[],
        historychange:'',
        historyid:[],
        // 推荐的数据
        threeshow:true,
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
          recomedshow:false,
            // 价格说明的显示隐藏
            priceshow:false,
            //右边推荐的数据    
            suggest:[],
            options:[],
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
            //  保存所有三级id判断左边三级字体变红
            array:[],
            // 左边45大类的搜索关键词
            searchkeyword:'',
            //   搜索出来的数据数组
            searcharr:[],
            //    保存搜索出来所有一级和二级的id判断二级和三级的显示隐藏
            firstid:[],
            secondid:[],
            //    判断箭头是否向下
            secondshow:true,
            thirdshow:true,
            //    判断是显示45大类和搜索数据的显示隐藏
            threeshow:true,
            type:'',
            //   删除提示
            dialogVisible: false,

            firstnum: 0,
            secondnum:0,

            // 判断立即购买显示隐藏
            buttonshow:true,

            // 代理人小商品价格
            littleprice:'',
            agency:'',
            // 判断是否是自主注册
            select_type:'',
            // 总的价格
            totalprice:0,
            totalnum:0
    }
  },
  components: {
      Top,
      Foot,
      Fix
  },
  computed:{
    money(){
        this.totalprice = 0;
        this.totalnum = 0;
      for(var i =0;i<this.suggest.length;i++){
            this.totalprice +=this.suggest[i].price;
            this.totalnum +=this.suggest[i].chose;
        }
    }
  },
  watch:{
      "picked1"(newValue){
          if(newValue =='1'){
               this.typeshow = false;
               this.pickguildshow = false;
               this.pickhistoryshow = false;
               this.recomedshow = false;
          }else if(newValue =='2'){
              this.typeshow = false;
              this.pickguildshow = false;
               this.pickhistoryshow = false;
               this.recomedshow = false;
          }else{
              this.typeshow = false;
              this.pickguildshow = false;
               this.pickhistoryshow = false;
               this.recomedshow = false;
          }
      },
      "picked2"(newValue){
          if(newValue =='1'){
               this.motecreat();
          }
      },
      "picked3"(newValue){
          if(newValue =='1'){
               if(this.pic2 != ''){
                    this.pic2 = this.type1;
                    this.pic2_url = this.GLOBAL.base_url+this.type1
                }
          }else{
              if(this.pic2 != ''){
                this.pic2 = this.type2;
                this.pic2_url = this.GLOBAL.base_url+this.type2
            }
          }
      },
      "picked4"(newValue){
          if(newValue =='1'){
               if(this.pic3 != ''){
                    this.pic3 = this.type3;
                    this.pic3_url = this.GLOBAL.base_url+this.type3
                }
          }else{
              if(this.pic3 != ''){
                this.pic3 = this.type4;
                this.pic3_url = this.GLOBAL.base_url+this.type4
            }
          }
      },
      "picked5"(newValue){
          if(newValue =='1'){
               if(this.pic4 != ''){
                    this.pic4 = this.type5;
                    this.pic4_url = this.GLOBAL.base_url+this.type5
                }
          }else{
              if(this.pic4 != ''){
                this.pic4 = this.type6;
                this.pic4_url = this.GLOBAL.base_url+this.type6
            }
          }
      },
      "changetype"(newValue){
          if(newValue == 'guild'||newValue == 'all'){
               this.pickguildshow = true;
              this.pickhistoryshow = false;
              this.recomedshow = false;
          }else if(newValue == 'history'){
              this.pickguildshow = false;
              this.pickhistoryshow = true;
              this.recomedshow = false;
          }else{
              this.pickguildshow = false;
              this.pickhistoryshow = false;
              this.recomedshow = false;
          }
      },
  },
  methods:{
      tip(type,msg){
          return this.$message({
              type:type,
              message:msg,
              showClose:true,
              duration:3000
          })
      },
      upload(img){
            let formData = new FormData();
            formData.append('url_img',img.file);
            this.$http.post(this.GLOBAL.base_url+"/api/BrandUpload/colorImage",formData).then(res => {
                // console.log(res)
                if(res.data.code == "1"){
                    this.type1 = res.data.filepath.yuantu;
                    this.type2 = res.data.filepath.heibai;
                    if(this.picked3 == '2'){
                        this.pic2 = res.data.filepath.heibai;
                        this.pic2_url = this.GLOBAL.base_url+res.data.filepath.heibai;
                    }else{
                        this.pic2 = res.data.filepath.yuantu;
                        this.pic2_url = this.GLOBAL.base_url+res.data.filepath.yuantu;
                    }
                    
                }
            })
      },
      upload2(img){
            let formData = new FormData();
            formData.append('url_img',img.file);
            this.$http.post(this.GLOBAL.base_url+"/api/BrandUpload/colorImage",formData).then(res => {
                // console.log(res)
                if(res.data.code == "1"){
                    this.type3 = res.data.filepath.yuantu;
                    this.type4 = res.data.filepath.heibai;
                    if(this.picked4 == '2'){
                        this.pic3 = res.data.filepath.heibai;
                        this.pic3_url = this.GLOBAL.base_url+res.data.filepath.heibai;
                    }else{
                        this.pic3 = res.data.filepath.yuantu;
                        this.pic3_url = this.GLOBAL.base_url+res.data.filepath.yuantu;
                    }
                    
                }
            })
      },
      upload3(img){
            let formData = new FormData();
            formData.append('url_img',img.file);
            this.$http.post(this.GLOBAL.base_url+"/api/BrandUpload/colorImage",formData).then(res => {
                // console.log(res)
                if(res.data.code == "1"){
                    this.type5 = res.data.filepath.yuantu;
                    this.type6 = res.data.filepath.heibai;
                    if(this.picked5 == '2'){
                        this.pic4 = res.data.filepath.heibai;
                        this.pic4_url = this.GLOBAL.base_url+res.data.filepath.heibai;
                    }else{
                        this.pic4 = res.data.filepath.yuantu;
                        this.pic4_url = this.GLOBAL.base_url+res.data.filepath.yuantu;
                    }
                    
                }
            })
      },
      namenext(){
          let reg=/^[0-9]*$/;
          let reg2 = /[`~!@#$%^&*()_\-+=<>?:"{}|,.\/;'\\[\]·~！@#￥%……&*（）——\-+={}|《》？：“”【】、；‘’，。、]/im;
          if(this.picked1 == "1"){
              if(this.printkey == ''){
                    this.tip('error',"请输入商标名称")
                    return false
                }else if(reg.test(this.printkey)){
                     this.tip('error',"请输入汉字或字母")
                    return false
                }else if(reg2.test(this.printkey)){
                     this.tip('error',"请输入正确的商标名称")
                    return false
                }else if(this.picked2 == "1"){
                    if(this.pic1 ==''){
                        this.tip('error',"请生成商标图片")
                        return false
                    }else{
                        this.maskshow = true;
                        this.$http.get(this.GLOBAL.base_url+'/app/lawselect',{params:{
                            channelroad:1,
                            user_id:this.$cookie.getCookie('u_id'),
                            keywords:this.printkey
                        }}).then(res=>{
                            if(res.data.data == 1){
                                this.maskshow = false;
                                this.typeshow = true;
                                this.keyword = this.printkey
                                this.srcurl = this.pic1
                            }else{
                                this.tip('error',res.data.msg);
                                this.maskshow = false;
                            }
                        })
                    } 
                }else if(this.picked2 == "2"){
                    if(this.pic2 ==''){
                        this.tip('error',"请上传商标图片")
                        return false
                    }else{
                        this.maskshow = true;
                        this.$http.get(this.GLOBAL.base_url+'/app/lawselect',{params:{
                            channelroad:1,
                            user_id:this.$cookie.getCookie('u_id'),
                            keywords:this.printkey
                        }}).then(res=>{
                            if(res.data.data == 1){
                                this.maskshow = false;
                                this.typeshow = true;
                                this.keyword = this.printkey
                                this.srcurl = this.pic2
                            }else{
                                this.tip('error',res.data.msg);
                                this.maskshow = false;
                            }
                        })
                    }
                    
                }
          }else if(this.picked1 == "2"){
              if(this.pic3 == ''){
                  this.tip('error',"请上传商标图片")
                    return false
              }else{
                  this.keyword = '';
                  this.srcurl = this.pic3;
                  this.typeshow = true;
              }
          }else{
               if(reg.test(this.printkey2)&&this.printkey2 != ''){
                     this.tip('error',"请输入汉字或字母")
                    return false
                }else if(reg2.test(this.printkey2)&&this.printkey2 != ''){
                     this.tip('error',"请输入汉字或字母")
                    return false
                }else if(this.pic4 == ''){
                    this.tip('error',"请上传商标图片")
                    return false
                }else{
                    this.keyword = this.printkey2;
                    this.srcurl = this.pic4;
                    this.typeshow = true;
                }
          }
      },
      typenext(){
          if(this.suggest.length != 0){
                    this.namenext()
                }
          if(this.changetype == 'guild'||this.changetype == 'all'){
              this.pickguildshow = true;
              this.pickhistoryshow = false;
              this.recomedshow = false;
          }else if(this.changetype == 'history'){
              this.pickguildshow = false;
              this.pickhistoryshow = true;
              this.recomedshow = false;
          }else{
              this.pickguildshow = false;
              this.pickhistoryshow = false;
              this.recomedshow = true;
              this.getdata3();
          }
      },
      getfont(){
                this.$http.post(this.GLOBAL.base_url+'/app/shopCar/fonts').then(res=>{
                    // console.log(res)
                    if(res.data.code == "1"){
                        this.fontoptions = res.data.data;
                    }
                })
        },
      getimg(){
            this.motecreat();
        },
        motecreat(){
            if(this.printkey == ''){
                return false
            }else{
                this.$http.post(this.GLOBAL.base_url+'/api/BrandUpload/operationFile',{
                    brand_name:this.printkey,
                    type:this.value
                }).then(res=>{
                    if(res.data.code == "1"){
                        this.pic1 = res.data.img;
                    }
                })
            }
        },
        gethistory(){
           this.$http.post(this.GLOBAL.base_url+'/api/shopCar/historyOrder',{
                user_id:this.$cookie.getCookie('u_id')
            }).then(res=>{
                    // console.log(res)
                    if(res.data.code == "1"){
                        if(res.data.data.length == 0){
                          this.historyshow = false
                        }else{
                          this.historyshow = true
                        }
                }
            })
        },
        picktype(val){
            this.changetype = val
        },
        guildcomfire(){
                if(this.suggest.length != 0){
                    this.namenext()
                }
                if(this.key != ''){
                    this.maskshow = true;
                    this.$http.get(this.GLOBAL.base_url+'/app/registercateall',{params:{
                    channelroad:1,
                    user_id:this.$cookie.getCookie('u_id'),
                    text:this.key
                    }}).then(res=>{
                    // console.log(res)
                    if(res.data.code == "1"){
                        this.maskshow = false;
                        if(res.data.data.is_empty == 1){
                            this.guildshow = true;
                            this.trade = res.data.data.data;
                            this.find(this.trade[0].id,1)
                        }else{
                           this.littlejob = res.data.data.group;
                           this.recomedshow = true;
                           this.getdata3();
                        }
                    }
                    })
                }else{
                    this.tip('error',"请输入您的产品名称或者服务行业")
                    return false
                }
                },
                find(val,m){
                // console.log(val,m)
                    this.id = val;
                    this.num1 = m;
                    for(var i = 0;i<this.trade.length;i++){
                        if(val == this.trade[i].id){
                        this.little = this.trade[i].sec;
                        }
                    }
                },
                pick(val){
                    if(this.box1.length == 0){
                        return false;
                    }else{
                        for(var i = 0;i<this.box1.length;i++){
                            if(val == this.box1[i]){
                              return true;
                            }else{
                              return false
                            }
                        }
                    }
                },
                guildnext(){
                    if(this.suggest.length != 0){
                    this.namenext()
                }
                    if(this.key == ''){
                        this.tip('error','请输入您的产品名称或者服务行业')
                        return false;
                    }else if(this.box1.length == 0 ){
                        this.tip('error','请选择小行业')
                        return false;
                    }else{
                        this.littlejob = this.box1.join(",");
                        this.recomedshow = true;
                        this.getdata3();;
                    }
                },
                changeType(val){
                    this.changeClass = val;
                    this.historyid = [];
                    this.searchkey = '';
                    this.gethistorydata();
                },
                historysearch(){
                    this.historyid = [];
                    this.gethistorydata();
                },
                gethistorydata(){
                    this.history = [];
                    var type;
                    if(this.changeClass == 'history'){
                        type = 1;
                    }else{
                        type = 2;
                    }
                    this.maskshow = true;
                    this.$http.post(this.GLOBAL.base_url+'/api/shopCar/historyOrder',{
                        user_id:this.$cookie.getCookie('u_id'),
                        type:type,
                        keywords:this.searchkey
                    }).then(res=>{
                        // console.log(res)
                            if(res.data.code == "1"){
                                this.maskshow = false;
                                this.history = res.data.data;
                        }
                    })
        },
        watchhistorylittle(val1,val2){
            this.historylittleshow = true;
            this.historycate = val1;
            this.historyarr= this.history[val2].three_brand;
        },
        historycha(){
            this.historylittleshow = false;
        },
        historyisTags(tagId) {
        if (this.historyid.includes(tagId)) {
            return true;
        } else {
            return false;
        }
      },
      gethistorylittle(val){
          if(this.historyid.length == 0){
            this.historyid.push(val)
          }else{
            if(this.historyid.includes(val)){
              for(var i = 0; i<this.historyid.length;i++){
                if(val == this.historyid[i]){
                  this.$delete(this.historyid,i);
                }
              }
            }else{
              this.historyid.push(val)
            }
          }
        },
        historynext(){
            if(this.historyid.length == 0){
                this.tip('error','请选择您要选择的历史类别')
            }else{
                var cate = [];
                for(var i=0;i<this.history.length;i++){
                    for(var j=0;j<this.historyid.length;j++){
                        if(this.historyid[j] == this.history[i].id){
                            cate.push(this.history[i].one_cate);
                        }
                    }
                }
                if((new Set(cate)).size != cate.length){
                    this.tip('error',"请不要选择同大类的小商品")
                        return false
                }else{
                    this.recomedshow = true;
                    this.getdata3();
                }
            }
        },
        //   获取检索推荐的数据
      getdata1(){
          this.suggest = [];
          this.array= [];
          this.allcheck = false;
          if(this.$route.query.shop_id){
              this.maskshow = true;
              this.$http.post(this.GLOBAL.base_url+'/api/shopCar/regShopcarDetail',{
                shop_id:this.$route.query.shop_id
            }).then(res=>{
                // console.log(res)
                if(res.data.code == "1"){
                    this.suggest = res.data.data;
                    this.type = res.data.others;
                    this.select_type = res.data.select_type;
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

          }else if(this.changetype == "history"){
              var a;
              this.maskshow = true;
              if(this.changeClass == 'history'){
                  a = 1
              }else{
                  a = 2
              }
              this.$http.post(this.GLOBAL.base_url+'/api/shopCar/anotherList',{
                keywords:this.keyword,
                id:this.historyid.join(','),
                type:a
            }).then(res=>{
                // console.log(res)
                if(res.data.code == 1){
                    this.suggest = res.data.data;
                    var _this=this;
                    // 给推荐的一级数据里面添加属性
                    this.suggest.map(function (item) {
                        _this.$set(item, 'isSelect1', false);
                        _this.$set(item, 'chose', 0);
                        _this.$set(item, 'price', 0);
                        _this.$set(item, 'firstprice', 0);
                    })
                    this.getdata2();
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
              
          }else if(this.changetype == "chose"){
              this.maskshow = true;
              this.getdata2();
              this.choseall()
          }else{
              var all_class;
              if(this.changetype == "all"){
                  all_class = 1;
              }else{
                  all_class = 0;
              }
              this.maskshow = true;
              this.$http.post(this.GLOBAL.base_url+'/app/voiceselect',{
                     channelroad:1,
                    user_id:this.$cookie.getCookie('u_id'),
                    keywords:this.key,
                    text:this.keyword,
                    all_class: all_class,
                    groups:this.littlejob
                }).then(res=>{
                    // console.log(res);
                    if(res.data.code == "1"){
                        if(res.data.data.length != 0){
                            this.suggest = res.data.data;
                            var _this=this;
                            // 给推荐的一级数据里面添加属性
                            this.suggest.map(function (item) {
                                _this.$set(item, 'isSelect1', false);
                                _this.$set(item, 'chose', 0);
                                _this.$set(item, 'price', 0);
                                _this.$set(item, 'firstprice', 0);
                            });
                            this.getdata2();
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
                        }
                    }
                })
          }
      },
      getdata2(){
          var a ='';
          if(this.$route.query.shop_id){
              if(this.select_type == 1){
                  a = ''
              }else{
                  a = this.type
              }
          }else if(this.changetype == 'chose'){
              a = ''
          }else{
              a = this.keyword
          }
          this.$http.get(this.GLOBAL.base_url+'/app/recommfirst',{params:{
              keywords: a
          }}).then(res=>{
            //   console.log(res)
              if(res.data.code == "1"){
                  this.threelink = res.data.data;
                   this.maskshow = false;
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
      //   根据推荐所有的id的数组判断左边的三级是否变红
      isexit(val) {
            if (this.array.includes(String(val))) {
                return true;
            } else {
                return false;
            }
      },
      //   判断价格说明的显示隐藏
      showprice(){
          this.priceshow = !this.priceshow;
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
      del(val1,val2,val3,val4,val5,val6){
            for(var j=0;j<this.suggest[val3].sec.length;j++){
                if(val2 == this.suggest[val3].sec[j].num){
                    this.$delete(this.suggest[val3].sec[j].third,val4);
                    // if(this.suggest[val3].sec[j].third.length == 0){
                    //     this.suggest[val3].sec.splice(val6,1)
                    // }
                }
                // if(this.suggest[val3].sec.length == 0){
                //         this.suggest.splice(val3,1)
                //     }
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
            let routeData = this.$router.resolve({ path: '/like', query: { type:this.keyword,cate_id:val1,
                    num:val2 }});
              window.open(routeData.href, '_blank');
        }
    },
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
        var name;

        if(this.$route.query.shop_id){
            name = this.$route.query.type;
        }else{
            name = this.keyword;
           if(this.changetype == 'chose'){
               this.select_type = 1;
           }else{
               this.select_type = 0;
           }
        }
        this.$http.post(this.GLOBAL.base_url+'/api/shopCar/registerAddShopCar',{
            one_cate:one_cate,
            two_cate:str1,
            three_cate:str2,
            user_id:this.$cookie.getCookie('u_id'),
            shop_id:this.$route.query.shop_id,
            click_type:click_type,
            brand_img:this.srcurl,
            brand_name:name,
            recommend_rate:star_str,
            select_type:this.select_type,
            is_design:this.$route.query.is_design
        }).then(res=>{
            // console.log(res)
            if(res.data.code == "1"){
                this.$router.push({
                    path:'/personal/buyCart',
                    query:{
                        type:this.keyword
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
            brand_img:this.srcurl,
            brand_name:this.keyword,
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
    //  搜索45大类
      regsearch(){
          var brand_name;
          var type;
          if(this.$route.query.shop_id){
              brand_name = this.$route.query.type;
              type = this.select_type
          }else{
              brand_name = this.keyword
                if(this.changetype == 'chose'){
                   type = 1;
            }else{
                   type = 0;
            }
          }
          if(this.searchkeyword != ""){
              this.maskshow = true
              this.$http.get(this.GLOBAL.base_url+'/api/brandSearch',{params:{
                    text:this.searchkeyword,
                    keywords:brand_name,
                    type:type
                }}).then(res=>{
                    // console.log(res)
                    if(res.data.code == "1"){
                        this.threeshow = false;
                        this.maskshow = false;
                        this.searcharr = res.data.data;
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
                        this.maskshow = false;
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
    },
  mounted(){
      this.getfont();
      this.gethistory();
      this.gethistorydata();
      if(this.$route.query.shop_id){
          this.buttonshow = false;
          this.nameshow = false;
          this.recomedshow = true;
          this.getdata3();
      }
  },
  created(){
        
    },
    destroyed(){
        
    }
}

</script>

<style scoped>
    .recome-box{
        width: 100%;
        height: 100%;
        background:#fcfcfc;
    }
    .recome-middle{
        width: 1200px;
        padding-bottom: 80px;
        margin: 0 auto;
    }
    .recome-middle-top{
        width: 1200px;
        height: 130px;
        box-shadow: 3px 5px 19px -1px rgba(217, 217, 217, 0.5);
        background-color: white;
        margin-bottom: 48px;
    }
    .recome-middle-top>div{
        float: left;
        width: 180px;
        height: 50px;
        font-size: 36px;
        font-weight: 500;
        color: black;
        margin: 40px 0 0 511px;
    }
    .recome-middle-top>img{
        width: 58px;
        height: 68px;
        float: left;
        margin: 27px 0 0 204px;
    }
    .recome-name{
        width: 1200px;
        height: 840px;
        margin-bottom: 48px;
    }
    .recome-name-title{
        width: 336px;
        height: 60px;
        margin:0 auto 32px;
        font-size: 28px;
        line-height: 2.14;
        text-align: center;
        color: black;
    }
    .recome-name-picktype{
        width: 1200px;
        height: 690px;
        padding-top: 55px;
        box-shadow: 3px 5px 19px -1px rgba(217, 217, 217, 0.5);
        background-color: white;
    }
    .recome-name-picktype-detail{
        width: 948px;
        height: 610px;
        margin: 0 auto;
    }
    .detail-div1{
        height: 32px;
        line-height: 32px;
        margin-bottom: 44px;
    }
    .detail-div1>span,.detail-div2-img>span{
        font-size: 18px;
        color: black;
        margin-right: 160px;
        vertical-align: middle;
    }
    .detail-div1>span:nth-of-type(1),.detail-div2-img>span:nth-of-type(1){
        margin-right: 80px;
    }
    .detail-div1>span:nth-of-type(4){
        margin-right: 0;
    }
    .detail-div1>input,.detail-div2-img>input{
        width: 16px;
        height: 16px;
        vertical-align: middle;
        margin-right: 16px;
        cursor: pointer;
    }
    .detail-div2,.detail-tuxing,.detail-tuwen{
        /* border:1px solid red; */
        height: 460px;
        margin-bottom: 60px;
    }
    .detail-div2-writename{
        height: 50px;
        margin-bottom: 44px;
    }
    .detail-div2-writename>span{
        vertical-align: middle;
        font-size: 18px;
        color: black;
        margin-right: 36px;
    }
    .detail-div2-writename>input{
        width: 820px;
        padding-left: 10px;
        height: 48px;
        font-size: 18px;
        border-radius: 4px;
        outline: none;
        border: solid 1px #d6d6d6;
    }
    .detail-div2-img{
        /* border:1px solid red; */
        margin-bottom: 20px;
    }
    .detail-div2-imgshow{
        margin-left: 115px;
        height: 250px;
    }
    .detail-div2-imgshow>div:nth-of-type(1){
        float: left;
        width: 205px;
        border: solid 1px #d4d4d4;
        height: 205px;
    }
    .detail-div2-imgshow>div:nth-of-type(1)>img{
        width: 205px;
        height: 205px;
    }
    .detail-div2-imgshow>div:nth-of-type(2){
        float: left;
        margin-left: 100px;
        width: 350px;
    }
    .detail-div2-imgshow>div:nth-of-type(2)>p{
        color:gray;
    }
    .detail-div2-imgshow>div:nth-of-type(2)>img{
       height: 100px;
    }
    .detail-div2-uploadimgshow{
         height: 250px;
        margin-left: 115px;
    }
    .detail-div2-uploadimgshow>div:nth-of-type(1),.detail-tuxing>div>div:nth-of-type(1),.detail-tuwendetail>div>div:nth-of-type(1){
        height: 204px;
    }
    .detail-div2-uploadimgshow>div:nth-of-type(1)>div,.detail-tuxing>div>div:nth-of-type(1)>div,.detail-tuwendetail>div>div:nth-of-type(1)>div{
        float: left;
    }
    .remark1{
        width: 400px;
        color: red;
        margin-left: 50px;
    }
    .idimg{
       width: 204px;
       height: 204px;
       /* border: dotted 1px #d4d4d4; */
    }
    .detail-div2-uploadimgshow-div{
        margin: 15px 0 0 44px;
    }
    .detail-div2-uploadimgshow-div>span,.detail-tuxing-div>span,.detail-tuwendetail-div>span{
        font-size: 18px;
        color: black;
        margin-right: 200px;
        vertical-align: middle;
    }
    .detail-div2-uploadimgshow-div>input,.detail-tuxing-div>input,.detail-tuwendetail-div>input{
        margin-right: 16px;
        width: 16px;
        height: 16px;
        vertical-align: middle;
        cursor: pointer;
    }
    .detail-picksize{
        margin-top: 20px;
    }
    .detail-picksize>span{
        font-size: 18px;
        color: black;
        margin-right: 36px;
    }
    .detail-tuxing>span,.detail-tuwendetail>span{
        float: left;
        font-size: 18px;
        color: black;
        margin-right: 36px;
    }
    .detail-tuxing>div,.detail-tuwendetail>div{
        float: left;
    }
    .detail-tuxing-div,.detail-tuwendetail-div{
        margin:30px 0 0 44px;
    }
    .recome-tip{
        width: 400px;
        margin-left: 50px;
        margin-bottom: 10px;
    }
    .recome-tip>img{
        width: 200px;
        height: 100px;
    }
    .recome-tip>p{
        color: gray;
    }
    .detail-tuwendetail{
        height: 367px;
    }
    .recome-next1{
        width: 214px;
        height: 54px;
        line-height: 54px;
        border-radius: 4px;
        background-color: #f96006;
        cursor: pointer;
        margin: 0 auto;
        text-align: center;
        font-size: 18px;
        color: white;
    }
    .table{
      width: 100%;
      height: 100%;
      position: fixed;
      top:0;
      left: 0;
      background: rgba(0,0,0,0.1);
  }
  .recome-type{
      height: 370px;
      margin-bottom: 48px;
  }
  .recome-type-title{
      width: 380px;
      height: 60px;
      margin: 0 auto 32px;
      font-size: 28px;
      text-align: center;
      line-height: 2.14;
      color: black;
  }
  .recome-type-chosetype{
      padding-top: 48px;
      width: 1200px;
      height: 227px;
      margin-bottom: 64px;
      box-shadow: 3px 5px 19px -1px rgba(217, 217, 217, 0.5);
      background-color: #ffffff;
  }
 .recome-type-chosetype>div>div:nth-of-type(1){
     width: 948px;
     margin: 0 auto 64px;
     height: 45px;
 }
 .recome-type-chosetype>div>div:nth-of-type(1)>div{
     float: left;
     width: 159px;
    height: 43px;
    color: black;
    font-size: 18px;
    margin-right: 100px;
    border-radius: 4px;
    text-align: center;
    line-height: 43px;
    cursor: pointer;
    border: solid 1px #f96006;
 }
 .recome-type-chosetype>div:nth-of-type(1)>div>div:last-child{
     margin-right: 0;
 }
 .guild .chosetype1,.history .chosetype2,.chose .chosetype3,.all .chosetype4{
     background-color:#f96006!important;
     color: #ffffff!important;
 }
 .recome-guild{
     margin-bottom: 48px;
 }
 .recome-guild-title{
     width: 320px;
     height: 60px;
     font-size: 28px;
     line-height: 2.14;
     text-align: center;
     color: black;
     margin: 0 auto 32px;
 }
 .recome-guild-pickguild{
     width: 1200px;
     padding: 48px 0 64px;
    box-shadow: 3px 5px 19px -1px rgba(217, 217, 217, 0.5);
    background-color: white
 }
  .recome-guild-pickguild>div:nth-of-type(1){
      width: 257px;
      height: 24px;
      margin: 0 auto 32px;
      font-size: 18px;
      text-align: center;
      color: black;
  }
  .recome-guild-pickguild>div:nth-of-type(2){
      width: 750px;
      height: 50px;
      margin: 0 auto 36px;
  }
  .recome-guild-pickguild>div:nth-of-type(2)>div{
      float: left;
  }
  .recome-guild-pickguild>div:nth-of-type(2)>div>input{
      width: 622px;
      height: 48px;
      border-radius: 4px;
      border: solid 1px #d6d6d6;
      padding-left: 20px;
      font-size: 18px;
      outline: none;
  }
  .recome-guild-pickguild>div:nth-of-type(2)>div:nth-of-type(2){
      width: 100px;
      height: 50px;
      border-radius: 4px;
      background-color: #f96006;
      font-size: 18px;
      color: white;
      margin-left: -2px;
      text-align: center;
      line-height: 50px;
      cursor: pointer;
  }
  .guild-box-get{
    width: 947px;
    margin: 0 auto 64px;
  }
  .guild-box-get-big{
    float: left;
    border-radius: 4px;
    border:1px solid #f96006;
    width: 250px;
    height: 45px;
    text-align: center;
    line-height: 45px;
    margin-right: 90px;
    margin-bottom: 20px;
    cursor: pointer;
    overflow: hidden;
  }
  .guild-box-get-big:nth-child(3n){
    margin-right: 0;
  }
  .active{
    background-color:#f96006;
    color: #ffffff;
  }
  .guild-box-get-little{
    width: 947px;
    margin-bottom: 20px;
    box-shadow: 0 0 30px -1px rgba(217, 217, 217, 0.5);
  }
  .guild-box-get-little>div{
    float: left;
    margin: 10px 0 10px 20px;
  }
  .guild-box-get-little>div>input{
    vertical-align: middle;
    cursor: pointer;
  }
  .guild-box-get-little>div>span{
    vertical-align: middle;
    font-size: 16px;
  }
  .recome-pickhistory{
      height: 750px;
      margin-bottom: 48px;
  }
  .recome-pickhistory-title{
      width: 400px;
      height: 60px;
      font-size: 28px;
      line-height: 2.14;
      text-align: center;
      color: black;
      margin: 0 auto 33px;
  }
  .recome-pickhistory-list{
      width: 1200px;
      height: 610px;
      padding-top: 43px;
      box-shadow: 3px 5px 19px -1px rgba(217, 217, 217, 0.5);
      background-color: white;
  }
  .recome-pickhistory-list-div1{
      height: 30px;
      margin-bottom: 20px;
      margin-left: 126px;
  }
  .recome-pickhistory-list-div1>div{
      height: 30px;
  }
  .recome-pickhistory-list-div1>div>div{
      float: left;
      width: 100px;
      height: 30px;
      border-radius: 4px;
      color: black;
      text-align: center;
      line-height: 30px;
      border: solid 1px #f96006;
      margin-right: 30px;
      cursor: pointer;
  }
  .recome-pickhistory-list-div1>div>div:nth-of-type(3){
      width: 400px;
      height: 30px;
      margin-left: 280px;
      border: none;
  }
  .recome-pickhistory-list-div1-search>input{
      float: left;
      width: 306px;
      height: 30px;
      padding-left: 12px;
      outline: none;
      border:1px solid #d6d6d6;
      border-radius: 4px;
  }
  .recome-pickhistory-list-div1-search>div{
      float: left;
      width: 80px;
      height: 30px;
      font-size: 14px;
      text-align: center;
      color: white;
      border-radius: 4px;
      background-color:#f96006;
  }
  .history .historytrade,.import .importtrade{
      background-color:#f96006!important;
        color: #ffffff!important;
  }
  .recome-pickhistory-list-div2{
      width: 948px;
      height: 370px;
      overflow-y: auto;
      /* border:1px solid red; */
      margin: 0 auto 64px;
  }
  .recome-pickhistory-list-div2::-webkit-scrollbar {
            width: 8px;     
            height: 8px;
    }
    .recome-pickhistory-list-div2::-webkit-scrollbar-thumb {
        border-radius: 5px;
        box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
    }
    .recome-pickhistory-list-div2::-webkit-scrollbar-track {
            opacity: 0;
    }
    .recome-pickhistory-list-div2>div{
        float: left;
        width: 120px;
        height: 165px;
        text-align: center;
        margin-right: 65px;
        margin-bottom: 30px;
    }
    .recome-pickhistory-list-div2>div>img{
        width: 118px;
        height: 118px;
        border: 1px solid #d6d6d6;
        cursor: pointer;
        margin-bottom: 8px;
    }
    .recome-pickhistory-list-div2>div>div{
        font-size: 14px;
        margin-bottom: 8px;
    }
    .recome-pickhistory-list-div2>div>p{
        font-size: 14px;
        color: #4a90e2;
        cursor: pointer;
    }
    .recome-pickhistory-list-watchlittle{
        position: fixed;
        width: 100%;
        height: 100%;
         background-color: rgba(0, 0, 0, 0.8);
         top:0;
         left: 0;
         z-index: 10;
    }
    .recome-pickhistory-list-watchlittle-detail{
        width: 600px;
        height: 380px;
        padding-top: 14px;
        background: #ffffff;
        position: absolute;
        top:50%;
        left: 50%;
        z-index: 300;
        text-align: start;
        transform: translate(-50%,-50%);
    }
    .recome-pickhistory-list-watchlittle-detail>img{
        width: 17px;
        height: 17px;
        margin: 0 0 35px 570px;
        cursor: pointer;
    }
    .recome-pickhistory-list-watchlittle-detail-div{
        margin-left: 67px;
    }
    .recome-pickhistory-list-watchlittle-detail-div>div:nth-of-type(1){
        margin-bottom: 42px;
    }
     .recome-pickhistory-list-watchlittle-detail-div>div:nth-of-type(1)>Span{
         margin-right: 25px;
         font-size: 14px;
         color: black;
     }
     .recome-pickhistory-list-watchlittle-detail-div>div:nth-of-type(2){
         height: 200px;
     }
     .recome-pickhistory-list-watchlittle-detail-div>div:nth-of-type(2)>div{
         float: left;
         font-size: 14px;
         color: black;
     }
      .recome-pickhistory-list-watchlittle-detail-div>div:nth-of-type(2)>div:nth-of-type(2){
          width: 390px;
          margin-left: 25px;
      }
      .recome-pickhistory-list-watchlittle-detail-div>div:nth-of-type(2)>div:nth-of-type(2)>div:nth-of-type(2){
          margin-top: 8px;
          height: 170px;
          overflow: auto;
      }
      .recome-pickhistory-list-watchlittle-detail-div>div:nth-of-type(2)>div:nth-of-type(2)>div:nth-of-type(2)::-webkit-scrollbar {
            width: 8px;     
            height: 8px;
    }
    .recome-pickhistory-list-watchlittle-detail-div>div:nth-of-type(2)>div:nth-of-type(2)>div:nth-of-type(2)::-webkit-scrollbar-thumb {
        border-radius: 5px;
        box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
    }
    .recome-pickhistory-list-watchlittle-detail-div>div:nth-of-type(2)>div:nth-of-type(2)>div:nth-of-type(2)::-webkit-scrollbar-track {
            opacity: 0;
    }
    .recome-pickhistory-list-watchlittle-detail-div>div:nth-of-type(2)>div:nth-of-type(2)>div:nth-of-type(2)>span{
          font-size: 12px;
          font-weight: 300;
          color: #666666;
          margin: 0 25px 6px 0;
      }
    .historychange{
      border:1px solid  #f96006!important;
    }
    .recome-recomed{
        height: 1190px;
    }
    .recomed1{
        width: 300px;
        height: 60px;
        font-size: 28px;
        line-height: 2.14;
        text-align: center;
        color: black;
        margin: 0 auto 32px;
    }
    .recomed2{
        width: 1200px;
        height: 1050px;
        padding-top: 48px;
        box-shadow: 3px 5px 19px -1px rgba(217, 217, 217, 0.5);
        background-color: white;
    }
    .recomed2-bigdiv{
        width: 948px;
        height: 868px;
        border: solid 1px #e1e1e1;
        margin: 0 auto;
    }
    .recomed2-bigdiv>div{
        float: left;
        height: 868px;
    }
    .recomed2-bigdiv-left{
        width: 317px;
        border-right: solid 1px #e1e1e1;
    }
    .recomed2-bigdiv-left-search{
        width: 270px;
        height: 36px;
        margin: 16px auto 23px;
        position: relative;
    }
    .recomed2-bigdiv-left-search>input{
        width: 240px;
        height: 34px;
        padding-left: 27px;
        border-radius: 4px;
        outline: none;
        border: solid 1px #e1e1e1;
    }
    .recomed2-bigdiv-left-search>img{
        width: 13px;
        height: 13px;
        position: absolute;
        top:11px;
        left: 9px;
    }
    .recomed2-bigdiv-left-three-link{
        width: 295x;
        height: 750px;
        margin-left: 20px;
        overflow-y: auto;
    }
    .recomed2-bigdiv-left-three-link::-webkit-scrollbar {
            width: 8px;     
            height: 8px;
    }
    .recomed2-bigdiv-left-three-link::-webkit-scrollbar-thumb {
        border-radius: 5px;
        box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
    }
    .recomed2-bigdiv-left-three-link::-webkit-scrollbar-track {
            opacity: 0;
    }
    .el-icon-caret-right,.el-icon-caret-bottom{
      color: #f96006;
      font-size: 20px;
      vertical-align: middle;
      margin-right: 14px;
  }
    .link-div1{
      margin-bottom: 13px;
      font-size: 16px;
      width: 285px;
      height: 25px;
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
      width: 260px;
      cursor: pointer;
      color: #333333;
  }
  .link-div2>div{
      overflow: hidden;
      text-overflow:ellipsis;
      white-space: nowrap;
  }
  .link-div3{
      width: 200px;
      margin-left: 60px;
      margin-top: 10px;
      font-size: 12px;
      cursor: pointer;
      color: #333333;
  }
  .recomed2-bigdiv-right{
       width: 630px;
  }
  .recomed2-bigdiv-right-top{
       width: 630px;
       height: 60px;
       border-bottom: solid 1px #e1e1e1;
       background-color: #fafafa;
       position: relative;
  }
  .recomed2-bigdiv-right-top>div{
      position: absolute;
  }
  .recomed2-bigdiv-right-top>div:nth-of-type(1){
      font-size: 20px;
      color: black;
      top:16px;
      left:36px;
  }
  .recomed2-bigdiv-right-top>div:nth-of-type(2){
      font-size: 14px;
      color: #f96006;
      top:21px;
      left: 236px;
      cursor: pointer;
  }
  .recomed2-bigdiv-right-top>div:nth-of-type(3){
      width: 430px;
      height: 200px;
      box-shadow: 0 0 30px -1px rgba(217, 217, 217, 0.5);
      background-color: #ffffff;
      position: absolute;
      left: 100px;
      top:60px;
      color: #333333;
      padding: 10px 10px 0 10px;
      z-index: 10;
  }
  .recomed2-bigdiv-right-top>div:nth-of-type(3)>p{
      font-size: 12px;
      margin-bottom: 10px;
  }
  .recomed2-bigdiv-right-showtype{
      height: 710px;
      overflow-y: auto;
      border-bottom: solid 1px #e1e1e1;
  }
  .recomed2-bigdiv-right-showtype::-webkit-scrollbar {
            width: 8px;     
            height: 8px;
    }
    .recomed2-bigdiv-right-showtype::-webkit-scrollbar-thumb {
        border-radius: 5px;
        box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
    }
    .recomed2-bigdiv-right-showtype::-webkit-scrollbar-track {
            opacity: 0;
    }
    .recomed2-bigdiv-right-showtype-cirl{
        border-bottom: dotted 1px #e1e1e1;
        padding:24px 0 25px 36px;
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
      font-size: 12px;
      font-weight: 500;
      color: #999999;
      margin-left: 24px;
  }
  .container{
      margin-bottom: 18px;
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
      width: 170px;
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
      border: dotted 1px #d6d6d6;
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
      border-left:1px dotted #d6d6d6;
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
  .type-box-right-showtype-choose{
      height: 50px;
      margin: 24px 0 20px;
  }
  .type-box-right-showtype-choose-div1{
      height: 20px;
      margin-bottom: 10px;
  }
  .type-box-right-showtype-choose-div1>div{
      float: left;
  }
  .type-box-right-showtype-choose-div1>div:nth-of-type(1){
      font-size: 14px;
      font-weight: 300;
      margin: 0 190px 0 16px;
  }
  .type-box-right-showtype-choose-div1>div:nth-of-type(1)>span{
      color: #f96006;
  }
  .type-box-right-showtype-choose-div1>div:nth-of-type(2)>span{
      font-size: 14px;
      font-weight: 300;
  }
  .type-box-right-showtype-choose-div1>div:nth-of-type(2)>span:nth-of-type(2){
      color: #f96006;
  }
  .type-box-right-showtype-choose-div2{
      height: 20px;
  }
  .type-box-right-showtype-choose-div2>div{
      float: left;
  }
  .type-box-right-showtype-choose-div2>div:nth-of-type(1){
      font-size: 14px;
      font-weight: 300;
      color: #f96006;
      margin: 0 45px 0 16px;
  }
  .type-box-right-showtype-choose-div2>div:nth-of-type(2){
      font-size: 14px;
      font-weight: 300;
      color: #f96006;
  }
  .type-box-right-showtype-addcart{
      height: 40px;
      margin: 23px 0 0 35px;
  }
  .type-box-right-showtype-addcart>div:nth-of-type(1){
      float: left;
      margin-top: 10px;
  }
  .type-box-right-showtype-addcart>div:nth-of-type(1)>input{
      width: 16px;
      height: 16px;
      vertical-align: middle;
      margin-right: 14px;
      cursor: pointer;
  }
  .type-box-right-showtype-addcart>div:nth-of-type(1)>span{
      vertical-align: middle;
      font-size: 16px;
      color: #333333;
  }
  #type-box-right-showtype-addcart-del{
      float: left;
      width: 146px;
      height: 39px;
      border-radius: 4px;
      background-color: #efefef;
      font-size: 16px;
      color: #f87e03;
      text-align: center;
      line-height: 39px;
      cursor: pointer;
      margin-left: 30px;
  }
  .setActive{
      color: #f96006!important;
  }
  .type-box-total{
      width: 948px;
     height: 71px;
     padding-top: 32px;
     border: solid 1px #e1e1e1;
     margin: 0 auto;
     border-top:none;
  }
  .type-box-total>div{
      float: right;
  }
  .type-box-total>div:nth-of-type(1){
      width: 146px;
      height: 39px;
      border-radius: 4px;
      background-color: #f96006;
      font-size: 16px;
      color: #ffffff;
      text-align: center;
      line-height: 39px;
      cursor: pointer;
      margin-right: 36px;
  }
  .type-box-total>div:nth-of-type(2){
      width: 144px;
      height: 37px;
      border-radius: 4px;
      border: solid 1px #f96006;
      background-color: #fbefe9;
      font-size: 16px;
      color: #f96006;
      text-align: center;
      margin-right: 12px;
      line-height: 39px;
      cursor: pointer;
  }
  .type-box-total>div:nth-of-type(3){
      margin-right: 36px;
      height: 38px;
  }
   .type-box-total>div:nth-of-type(3)>span:nth-of-type(1){
       font-size: 14px;
       font-weight: 300;
       margin: 20px 8px 0 0;
   }
   .type-box-total>div:nth-of-type(3)>span:nth-of-type(2){
       font-size: 32px;
       font-weight: 600;
       color: #f96006;
   }
</style>
<style>
  .detail-picksize>div>div>input{
      width: 830px;
      height: 48px!important;
      border: solid 1px #d4d4d4;
      font-size: 24px;
      color: #666666;
  }
  .detail-picksize .el-select .el-input.is-focus .el-input__inner,.el-select .el-input__inner:focus{
      border-color: #C0C4CC;
  }
  .el-select-dropdown__item.selected{
       color: #f96006;
   }
   .el-icon-delete{
        cursor: pointer;
        margin-left: 20px;
    }
    .el-rate__icon{
        font-size: 12px!important;
    }
</style>

