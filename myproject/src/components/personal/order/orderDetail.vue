<template>
  <div class="orderDetail-container">
      <div class="orderDetail-box">
          <div style="width:780px; margin-left:50px;">
          <!-- <div class="orderDetail-box-top">
              <div>订单详情</div>
          </div> -->
          <!-- 订单信息 -->
          <div class="orderDetail-box-orderInfo">订单信息</div>
          <div class="orderDetail-box-infor">
             <div>
                 <div>
                     <span>订单号:</span>
                     <span>{{order_id}}</span>
                 </div>
                 <div>
                     <span>业务名称:</span>
                     <span>{{regist_num}}</span>
                 </div>
                 <div>
                     <span>下单时间:</span>
                     <span>{{created_at}}</span>
                 </div>
             </div>
             <div>
                 <div>
                     <span>订单状态:</span>
                     <span>{{orderStatus}}</span>
                 </div>
                 <div>
                     <span>服务类型:</span>
                     <span>{{click_type}}</span>
                 </div>
                 <div>
                     <span>支付方式:</span>
                     <span>{{pay_type}}</span>
                 </div>
             </div>
             <div>
                 <div>
                     <span>优惠券金额:</span>
                     <span>RMB,{{coupon}}</span>
                 </div>
                 <div>
                     <span>订单金额:</span>
                     <span>RMB,{{price}}</span>
                 </div>
                 <div>
                     <span>实付金额:</span>
                     <span>RMB,{{total_price}}</span>
                 </div>
             </div>
          </div>
          <div class="orderDetail-box-changeTitle">
               <div :class="change">
                   <div class="div1" @click="tab('infor')">商标信息</div>
                   <div class="div2" @click="tab('about')">关联订单</div>
               </div>
          </div>
          <div class="orderDetail-box-tradeMark" v-show="show1">
              <div class="orderDetail-box-image">
                  <div>商标图形:</div>
                  <div>
                      <img :src="brand_img" alt="">
                  </div>
                  <div>
                      <span>商标状态:</span>
                      <span>{{status}}</span>
                  </div>
                  <div>
                      <span>有效日期:</span>
                      <span v-if="time1">{{time1}}至{{time2}}</span>
                  </div>
              </div>
              <div class="orderDetail-box-information">
                  <span class="span1">申请人名称：</span>
                  <span class="span2">{{name}}</span>
                  <span>申请/注册号:</span>
                  <span class="span3">{{regid}}</span>
                  <span>申请日期:</span>
                  <span>{{applydate}}</span>
              </div>
              <div class="orderDeatil-box-choseTy">
                  <div class="orderDetail-box-good-type">商品类别：</div>
                  <div class="orderDetail-box-good-detail">
                        <div class="orderDetail-box-good-detail-div1" v-if="intcls"><span>{{intcls}}</span>类
                        <!-- <span>{{intcls_name}}</span> -->
                        <div class="star-div" v-if="good=='商标注册'">
                            <span>成功指数</span>
                            <el-rate
                                v-model="star"
                                disabled
                                score-template="{value}">
                            </el-rate>
                        </div>
                        </div>
                        <div class="orderDetail-box-good-detail-div2" >
                            <div v-for="(v,k) in three_cate" v-if="good=='商标注册'">
                                <span>{{v.num}}</span>
                                <span>{{v.name}}</span>
                            </div>
                            <div v-for="(v,k) in three_cate" v-if="good !='商标注册'">
                                <span>{{v.DetailType}}</span>
                                <span>{{v.DetailName}}</span>
                            </div>
                        </div>
                    </div>
              </div>
          </div>
          <div class="orderDetail-box-risk" v-show="show2">
              <div class="orderDetail-box-risk-title">
                  <span>业务名称</span>
                  <span>办理时间</span>
                  <span>订单编号</span>
              </div>
              <div class="orderDetail-box-planDetail">
                    <el-timeline>
                        <el-timeline-item
                        v-for="(activity, index) in activities"
                        :key="index"
                        :timestamp="activity.date">
                        {{activity.click_type}}
                        <span>{{activity.order_id}}</span>
                        </el-timeline-item>
                    </el-timeline>
                </div>
          </div>
          <div class="orderDetail-box-rate">订单进度</div>
          <div class="orderDetail-box-pragrom">
              <div class="orderDetail-box-pragrom-div1">
                  <div class="orderDetail-box-pragrom-div2" :style="{width:progress+'%'}"></div>
              </div>
              <div class="orderDetail-box-pragrom-div3">
                  <div class="orderDetail-box-pragrom-div3-title">
                      <span v-for="(v,k) in title" @mouseenter="enter(k)" @mouseleave="leave()">{{v.item}}</span>
                  </div>
                  <div class="orderDetail-box-pragrom-div3-list">
                      <div  v-for="(item,index) in 4" v-show="seen&&index==current">
                        <p  class='p1' v-for="(m,n) in orderDetailp" v-if='order_schedule >= Number(current)+1'>{{m.status}}</p>
                        <p class='p2'  v-for="(m,n) in orderDetailp" v-if='order_schedule < Number(current)+1'>{{m.status}}</p>
                     </div>
                  </div>
              </div>
          </div>
          <div class="orderDetail-box-file" v-show="fileshow">
              <div class="orderDetail-box-file-infor">相关文件信息</div>
              <div class="orderDetail-box-file-wrap " v-show="good == '商标注册'">
                  <div class="orderDetail-box-file-top" v-show="contract">
                    <div class="orderDetail-box-file-top-img"></div>
                    <div class="orderDetail-box-file-top-div">
                        <div>合同</div>
                        <div>
                            <a :href="GLOBAL.win_url+this.contract" target="_blank">下载</a>
                        </div>
                    </div>
                 </div>
                 <div class="orderDetail-box-file-top" v-show="one">
                    <div class="orderDetail-box-file-top-img"></div>
                    <div class="orderDetail-box-file-top-div">
                        <div>受理通知书</div>
                        <div>
                            <a :href="GLOBAL.base_url+this.natice_acceptance" target="_blank">预览</a>
                            <a :href="GLOBAL.base_url+'/api/order/fileDownload?name='+this.natice_acceptances+'&type=1'">下载</a>
                        </div>
                    </div>
                 </div>
                 <div class="orderDetail-box-file-top" v-show="two">
                    <div class="orderDetail-box-file-top-img"></div>
                    <div class="orderDetail-box-file-top-div">
                        <div>驳回通知书</div>
                        <div>
                            <a :href="GLOBAL.base_url+this.reject_acceptance" target="_blank">预览</a>
                            <a :href="GLOBAL.base_url+'/api/order/fileDownload?name='+this.reject_acceptances+'&type=1'">下载</a>
                        </div>
                    </div>
                 </div>
                 <div class="orderDetail-box-file-top" v-show="three">
                    <div class="orderDetail-box-file-top-img"></div>
                    <div class="orderDetail-box-file-top-div">
                        <div>部分驳回通知书</div>
                        <div>
                            <a :href="GLOBAL.base_url+this.portion_acceptance" target="_blank">预览</a>
                            <a :href="GLOBAL.base_url+'/api/order/fileDownload?name='+this.portion_acceptances+'&type=1'">下载</a>
                        </div>
                    </div>
                 </div>
                 <div class="orderDetail-box-file-top" v-show="four">
                    <div class="orderDetail-box-file-top-img"></div>
                    <div class="orderDetail-box-file-top-div">
                        <div>初审公告通知书</div>
                        <div>
                            <a :href="GLOBAL.base_url+this.first_notice" target="_blank">预览</a>
                            <a :href="GLOBAL.base_url+'/api/order/fileDownload?name='+this.first_notices+'&type=1'">下载</a>
                        </div>
                    </div>
                 </div>
                 <div class="orderDetail-box-file-top" v-show="five">
                    <div class="orderDetail-box-file-top-img"></div>
                    <div class="orderDetail-box-file-top-div">
                        <div>注册证书</div>
                        <div>
                            <a :href="GLOBAL.base_url+this.brand_certificate" target="_blank">预览</a>
                            <a :href="GLOBAL.base_url+'/api/order/fileDownload?name='+this.brand_certificates+'&type=1'">下载</a>
                        </div>
                    </div>
                 </div>
                 <!-- <div class="orderDetail-box-file-top" v-show="six">
                    <div class="orderDetail-box-file-top-img"></div>
                    <div class="orderDetail-box-file-top-div">
                        <div>商标注册申请书</div>
                        <div>
                            <a :href="GLOBAL.win_url+this.apply_url" target="_blank">预览</a>
                            <a :href="GLOBAL.win_url+'/api/order/fileDownload?name='+this.apply_urls+'&type=3'">下载</a>
                        </div>
                    </div>
                 </div> -->
                 <div class="orderDetail-box-file-top" v-show="seven">
                    <div class="orderDetail-box-file-top-img"></div>
                    <div class="orderDetail-box-file-top-div">
                        <div>商标代理委托书</div>
                        <div>
                            <a :href="GLOBAL.win_url+this.brand_bailment" target="_blank">预览</a>
                            <a :href="GLOBAL.win_url+'/api/order/fileDownload?name='+this.brand_bailments+'&type=3'">下载</a>
                        </div>
                    </div>
                 </div>
              </div>
              <div class="orderDetail-box-file-wrap" v-show="type == '商标变更'||type =='商标续展'||type =='商标宽展'||type =='商标转让'">
                  <div class="orderDetail-box-file-top" v-show="contract">
                    <div class="orderDetail-box-file-top-img"></div>
                    <div class="orderDetail-box-file-top-div">
                        <div>合同</div>
                        <div>
                            <a :href="GLOBAL.win_url+this.contract" target="_blank">下载</a>
                        </div>
                    </div>
                 </div>
                  <div class="orderDetail-box-file-top" v-show="one">
                    <div class="orderDetail-box-file-top-img"></div>
                    <div class="orderDetail-box-file-top-div">
                        <div>受理通知书</div>
                        <div>
                            <a :href="GLOBAL.base_url+this.natice_acceptance" target="_blank">预览</a>
                            <a :href="GLOBAL.base_url+'/api/order/fileDownload?name='+this.natice_acceptances+'&type=1'">下载</a>
                        </div>
                    </div>
                  </div>
                  <div class="orderDetail-box-file-top" v-show="two">
                    <div class="orderDetail-box-file-top-img"></div>
                    <div class="orderDetail-box-file-top-div">
                        <div>核准通知书</div>
                        <div>
                            <a :href="GLOBAL.base_url+this.reject_acceptance" target="_blank">预览</a>
                            <a :href="GLOBAL.base_url+'/api/order/fileDownload?name='+this.reject_acceptances+'&type=1'">下载</a>
                        </div>
                    </div>
                  </div>
                  <div class="orderDetail-box-file-top" v-show="six">
                    <div class="orderDetail-box-file-top-img"></div>
                    <div class="orderDetail-box-file-top-div">
                        <div>{{type}}申请书</div>
                        <div>
                            <a :href="GLOBAL.win_url+this.apply_url" target="_blank">预览</a>
                            <a :href="GLOBAL.win_url+'/api/order/fileDownload?name='+this.apply_urls+'&type=3'">下载</a>
                        </div>
                    </div>
                  </div>
                  <div class="orderDetail-box-file-top" v-show="seven">
                    <div class="orderDetail-box-file-top-img"></div>
                    <div class="orderDetail-box-file-top-div">
                        <div>{{type}}委托书</div>
                        <div>
                            <a :href="GLOBAL.win_url+this.brand_bailment" target="_blank">预览</a>
                            <a :href="GLOBAL.win_url+'/api/order/fileDownload?name='+this.brand_bailments+'&type=3'">下载</a>
                        </div>
                    </div>
                  </div>
                  <div class="orderDetail-box-file-top" v-show="type =='商标转让'&&three">
                    <div class="orderDetail-box-file-top-img"></div>
                    <div class="orderDetail-box-file-top-div">
                        <div>受让委托书</div>
                        <div>
                            <a :href="GLOBAL.win_url+this.portion_acceptance" target="_blank">预览</a>
                            <a :href="GLOBAL.win_url+'/api/order/fileDownload?name='+this.portion_acceptances+'&type=3'">下载</a>
                        </div>
                    </div>
                  </div>
                  <div class="orderDetail-box-file-top" v-show="type =='商标转让'&&four">
                    <div class="orderDetail-box-file-top-img"></div>
                    <div class="orderDetail-box-file-top-div">
                        <div>转让证明</div>
                        <div>
                            <a :href="GLOBAL.win_url+this.first_notice" target="_blank">预览</a>
                            <a :href="GLOBAL.win_url+'/api/order/fileDownload?name='+this.first_notices+'&type=3'">下载</a>
                        </div>
                    </div>
                  </div>
              </div>
              <div class="orderDetail-box-file-wrap" v-show="type == '商标许可备案'">
                  <div class="orderDetail-box-file-top" v-show="contract">
                    <div class="orderDetail-box-file-top-img"></div>
                    <div class="orderDetail-box-file-top-div">
                        <div>合同</div>
                        <div>
                            <a :href="GLOBAL.win_url+this.contract" target="_blank">下载</a>
                        </div>
                    </div>
                 </div>
                  <div class="orderDetail-box-file-top" v-show="one">
                    <div class="orderDetail-box-file-top-img"></div>
                    <div class="orderDetail-box-file-top-div">
                        <div>受理通知书</div>
                        <div>
                            <a :href="GLOBAL.base_url+this.natice_acceptance" target="_blank">预览</a>
                            <a :href="GLOBAL.base_url+'/api/order/fileDownload?name='+this.natice_acceptances+'&type=1'">下载</a>
                        </div>
                    </div>
                  </div>
                  <div class="orderDetail-box-file-top" v-show="two">
                    <div class="orderDetail-box-file-top-img"></div>
                    <div class="orderDetail-box-file-top-div">
                        <div>决定书</div>
                        <div>
                            <a :href="GLOBAL.base_url+this.reject_acceptance" target="_blank">预览</a>
                            <a :href="GLOBAL.base_url+'/api/order/fileDownload?name='+this.reject_acceptances+'&type=1'">下载</a>
                        </div>
                    </div>
                  </div>
                  <div class="orderDetail-box-file-top" v-show="six">
                    <div class="orderDetail-box-file-top-img"></div>
                    <div class="orderDetail-box-file-top-div">
                        <div>商标许可备案表</div>
                        <div>
                            <a :href="GLOBAL.win_url+this.apply_url" target="_blank">预览</a>
                            <a :href="GLOBAL.win_url+'/api/order/fileDownload?name='+this.apply_urls+'&type=3'">下载</a>
                        </div>
                    </div>
                  </div>
                  <div class="orderDetail-box-file-top" v-show="seven">
                    <div class="orderDetail-box-file-top-img"></div>
                    <div class="orderDetail-box-file-top-div">
                        <div>商标代理委托书</div>
                        <div>
                            <a :href="GLOBAL.win_url+this.brand_bailment" target="_blank">预览</a>
                            <a :href="GLOBAL.win_url+'/api/order/fileDownload?name='+this.brand_bailments+'&type=3'">下载</a>
                        </div>
                    </div>
                  </div>
              </div>
              <div class="orderDetail-box-file-wrap" v-show="type=='补发商标证书'">
                  <div class="orderDetail-box-file-top" v-show="contract">
                    <div class="orderDetail-box-file-top-img"></div>
                    <div class="orderDetail-box-file-top-div">
                        <div>合同</div>
                        <div>
                            <a :href="GLOBAL.win_url+this.contract" target="_blank">下载</a>
                        </div>
                    </div>
                 </div>
                  <div class="orderDetail-box-file-top" v-show="one">
                    <div class="orderDetail-box-file-top-img"></div>
                    <div class="orderDetail-box-file-top-div">
                        <div>注册证书</div>
                        <div>
                            <a :href="GLOBAL.base_url+this.natice_acceptance" target="_blank">预览</a>
                            <a :href="GLOBAL.base_url+'/api/order/fileDownload?name='+this.natice_acceptances+'&type=1'">下载</a>
                        </div>
                    </div>
                  </div>
                  <div class="orderDetail-box-file-top" v-show="six">
                    <div class="orderDetail-box-file-top-img"></div>
                    <div class="orderDetail-box-file-top-div">
                        <div>补发商标注册证申请书</div>
                        <div>
                            <a :href="GLOBAL.win_url+this.apply_url" target="_blank">预览</a>
                            <a :href="GLOBAL.win_url+'/api/order/fileDownload?name='+this.apply_urls+'&type=3'">下载</a>
                        </div>
                    </div>
                  </div>
                  <div class="orderDetail-box-file-top" v-show="seven">
                    <div class="orderDetail-box-file-top-img"></div>
                    <div class="orderDetail-box-file-top-div">
                        <div>商标代理委托书</div>
                        <div>
                            <a :href="GLOBAL.win_url+this.brand_bailment" target="_blank">预览</a>
                            <a :href="GLOBAL.win_url+'/api/order/fileDownload?name='+this.brand_bailments+'&type=3'">下载</a>
                        </div>
                    </div>
                  </div>
              </div>
              <div class="orderDetail-box-file-wrap" v-show="type == '商标驳回复审'||type =='商标异议申请'||type =='商标异议答辩'||type =='商标撤三申请'||type =='商标撤三答辩'">
                  <div class="orderDetail-box-file-top" v-show="contract">
                    <div class="orderDetail-box-file-top-img"></div>
                    <div class="orderDetail-box-file-top-div">
                        <div>合同</div>
                        <div>
                            <a :href="GLOBAL.win_url+this.contract" target="_blank">下载</a>
                        </div>
                    </div>
                 </div>
                  <div class="orderDetail-box-file-top" v-show="one">
                    <div class="orderDetail-box-file-top-img"></div>
                    <div class="orderDetail-box-file-top-div">
                        <div>受理通知书</div>
                        <div>
                            <a :href="GLOBAL.base_url+this.natice_acceptance" target="_blank">预览</a>
                            <a :href="GLOBAL.base_url+'/api/order/fileDownload?name='+this.natice_acceptances+'&type=1'">下载</a>
                        </div>
                    </div>
                  </div>
                  <div class="orderDetail-box-file-top" v-show="two">
                    <div class="orderDetail-box-file-top-img"></div>
                    <div class="orderDetail-box-file-top-div">
                        <div>裁定书</div>
                        <div>
                            <a :href="GLOBAL.base_url+this.reject_acceptance" target="_blank">预览</a>
                            <a :href="GLOBAL.base_url+'/api/order/fileDownload?name='+this.reject_acceptances+'&type=1'">下载</a>
                        </div>
                    </div>
                  </div>
                  <div class="orderDetail-box-file-top" v-if="type =='商标驳回复审'&&six||type =='商标异议申请'&&six||type =='商标撤三申请'&&six">
                    <div class="orderDetail-box-file-top-img"></div>
                    <div class="orderDetail-box-file-top-div">
                        <div>申请书</div>
                        <div>
                            <a :href="GLOBAL.win_url+this.apply_url" target="_blank">预览</a>
                            <a :href="GLOBAL.win_url+'/api/order/fileDownload?name='+this.apply_urls+'&type=3'">下载</a>
                        </div>
                    </div>
                  </div>
                  <div class="orderDetail-box-file-top" v-show="seven">
                    <div class="orderDetail-box-file-top-img"></div>
                    <div class="orderDetail-box-file-top-div">
                        <div>代理委托书</div>
                        <div>
                            <a :href="GLOBAL.win_url+this.brand_bailment" target="_blank">预览</a>
                            <a :href="GLOBAL.win_url+'/api/order/fileDownload?name='+this.brand_bailments+'&type=3'">下载</a>
                        </div>
                    </div>
                  </div>
                  <div class="orderDetail-box-file-top" v-show="type =='商标驳回复审'&&five||type =='商标异议申请'&&five||type =='商标驳回复审'&&five||type =='商标异议答辩'&&five||type =='商标撤三答辩'&&five">
                    <div class="orderDetail-box-file-top-img"></div>
                    <div class="orderDetail-box-file-top-div">
                        <div>正文</div>
                        <div>
                            <a :href="GLOBAL.base_url+this.brand_certificate" target="_blank">预览</a>
                            <a :href="GLOBAL.base_url+'/api/order/fileDownload?name='+this.brand_certificates+'&type=1'">下载</a>
                        </div>
                    </div>
                  </div>
              </div>
              <div style="clear:both;"></div>
          </div>
          <div class="orderDetail-box-suggest">
              <div class="orderDetail-box-suggest-top">关联业务推荐</div>
              <div class="orderDetail-box-suggest-detail">
                  <div v-for="(v,k) in recommend" @click="totrade(v.cate_id,v.pid,v.id)">
                      <img :src="GLOBAL.base_url+v.pic" alt="">
                      <p>{{v.title}}</p>
                      <p>{{Number(v.price)+Number(v.service_price)}}</p>
                  </div>
              </div>
          </div>
          <div class="orderDetail-box-refund" v-show="refundshow">
              <div>退款信息</div>
              <div @click="backdraw">申请退款 ></div>
          </div>
          <div class="drawback" v-show="backshow">
              <div class="drawback-div">
                  <img src="/static/images/orderdetailcha.png" alt="" @click="ordercha">
                  <div>
                    <div class="back-div1">申请退款</div>
                    <div class="back-div2">
                        <span>退款方式</span>
                        <span>{{pay_type}}</span>
                    </div>
                    <div class="back-div3">
                        <span>退款账号</span>
                        <input type="text" v-model="refundcount">
                    </div>
                    <div class="back-div4">
                        <div>退款原因</div>
                        <div>
                            <textarea name="" id="" class="write" v-model="refundreason"></textarea>
                        </div>
                    </div>
                    <div class="back-div5" @click="refundsubmit">提交</div>
                  </div>
              </div>
          </div>
          <div class="order-refund-status" v-show="refundstatus">
             <div>退款信息</div>
             <div>
                 <div>
                     <span>申请退款金额:</span>
                     <span>￥{{refund_amount}}</span>
                 </div>
                 <div>
                     <span>实际退款金额:</span>
                     <span>￥{{reality_amount}}</span>
                 </div>
                 <div>
                     <span>退款方式:</span>
                     <span>{{pay_type}}</span>
                 </div>
                 <div>
                     <span>退款状态:</span>
                     <span>{{orderStatus}}</span>
                 </div>
             </div>
          </div>
        </div>
      </div>
    <div style="clear:both;"></div>
    
  </div>

</template>

<script>
export default {
  name: 'orderDetail',
  data(){
      return{
        good:'',
        type:'',
        fileshow:Boolean,
        //  判断鼠标移入消失隐藏
        seen:false,
        current:0,
        activities: [],
        change:'infor',
        show1:true,
        show2:false,
        progress:Number,
        title:[{
            item:'付款阶段'
        },{
            item:'材料准备阶段'
        },{
            item:'官方审核阶段'
        },{
            item:'下发'
        }],
        // 订单信息字段
         order_id:'',
        click_type:'',
        coupon:'',
        orderStatus:'',
        price:'',
        created_at:'',
        pay_type:'',
        total_price:'',
        regist_num:'',
        order_schedule:'',
        orderrefundstatus:'',
        // 订单进度框里面的内容
        orderDetail:[],
        orderDetailp:[],
        // 文件信息字段(预览)
        natice_acceptance:'',
        reject_acceptance:'',
        portion_acceptance:'',
        first_notice:'',
        brand_certificate:'',
        apply_url:'',
        brand_bailment:'',
        // 文件信息字段加s（下载）
        natice_acceptances:'',
        reject_acceptances:'',
        portion_acceptances:'',
        first_notices:'',
        brand_certificates:'',
        apply_urls:'',
        brand_bailments:'',
        // 判断文件显示隐藏
        one:Boolean,
        two:Boolean,
        three:Boolean,
        four:Boolean,
        five:Boolean,
        six:Boolean,
        seven:Boolean,
        // 商标信息里的字段
        brand_img:'',
        status:'',
        time1:'',
        time2:'',
        name:'',
        regid:'',
        intcls:'',
        intcls_name:'',
        applydate:'',
        Ggdate:'',
        brand_upload:{},
        three_cate:[],
        // 退款弹窗
        backshow:false,
        // 判断退款和退款状态显示隐藏
        refundshow:false,
        refundstatus:false,
        // 退款账号
        refundcount:'',
        // 退款原因
        refundreason:'',
        // 实际退款金额
        reality_amount:'',
        // 申请退款金额
        refund_amount:'',
        // 合同
        contract:'',
        // 推荐业务
        recommend:[],
        // 星星
        star:''
      }
  },
  components: {
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
      tab(item){
          this.change = item;
          if(this.change == "infor"){
              this.show1 = true;
              this.show2 = false;
          }else if(this.change == "about"){
              this.show1 = false;
              this.show2 = true;
          }
      },
      enter(index){
        this.seen = true;
        this.current = index;
        this.orderDetailp = this.orderDetail[index];
      },
      leave(){
        this.seen = false;
        this.current = null;
      },
      backdraw(){
          this.backshow = true;
      },
      ordercha(){
          this.backshow = false;
      },
      totrade(val1,val2,val3){
          this.$router.push({
              path:'/tradeDetail',
              query:{
                  tradeid:val1,
                  secondid:val3,
                  id:val2
              }
          })
      },
    //   退款
    refundsubmit(){
        if(this.refundcount == ''){
            return false;
        }else if(this.refundreason == ''){
            return false;
        }else{
            this.$http.post(this.GLOBAL.base_url+'/api/order/refundApply',{
                 order_id:this.order_id,
                 user_id:this.$cookie.getCookie('u_id'),
                 refund_account:this.refundcount,
                 refund_explain:this.refundreason
            }).then(res=>{
                // console.log(res)
                if(res.data.code == "1"){
                    this.backshow = false;
                    this.tip('success','您的退款已提交')
                    this.$router.go(0);
                }
            })
        }
    },
      getdata(){
          this.$http.post(this.GLOBAL.base_url+'/api/order/orderDetail',{
                 id:this.$route.query.id
            }).then(res=>{
                // console.log(res)
               if(res.data.code == "1"){
                this.brand_upload = res.data.brand_upload;
                this.regid = res.data.order.regist_num;
                    if(this.brand_upload !=null){
                        this.intcls = this.brand_upload.one_cate;
                        this.star = this.brand_upload.recommend_rate;
                    }
                    if(this.good == "商标注册"){
                        this.brand_img = this.GLOBAL.base_url+this.brand_upload.brand_img;
                        this.intcls_name = this.brand_upload.first_cate;
                        this.name = this.brand_upload.apply_name;
                        this.three_cate = this.brand_upload.three_brand;
                        this.applydate = res.data.order.declare_time;
                    }
                this.order_id=res.data.order.order_id;
                this.click_type=res.data.order.click_type;
                this.coupon=res.data.order.coupon;
                this.orderStatus=res.data.order.orderStatus;
                this.price=res.data.order.price;
                this.created_at=res.data.order.created_at;
                this.pay_type=res.data.order.pay_type;
                this.total_price=res.data.order.total_price;
                this.regist_num=res.data.order.good_name;
                this.activities = res.data.relevanceOrder;
                this.order_schedule=res.data.order.order_schedule;
                this.orderDetail = res.data.orderStatus;
                this.orderrefundstatus = res.data.order.status;
                this.contract = res.data.order.contract;
                this.recommend = res.data.recommend;
                if(this.orderrefundstatus == 2 ||this.orderrefundstatus == 3||this.orderrefundstatus == 4||this.orderrefundstatus == 6){
                    if(this.type != '四星商标注册'){
                        this.refundshow = true;
                    }
                }
                if(this.orderrefundstatus == 17||this.orderrefundstatus == 18||this.orderrefundstatus == 19||this.orderrefundstatus == 20){
                    this.refundstatus = true;
                }
                if(res.data.refund != null){
                    this.reality_amount= res.data.refund.reality_amount;
                    this.refund_amount= res.data.refund.refund_amount;
                }

                if(this.order_schedule == 1){
                    this.progress = 25;
                }
                if(this.order_schedule == 2){
                    this.progress = 50;
                }
                if(this.order_schedule == 3){
                    this.progress = 75;
                }
                if(this.order_schedule == 4){
                    this.progress = 100;
                }
                // 文件信息、
                if(res.data.certificate == null && this.contract == ''){
                    this.fileshow = false
                }else{
                    this.fileshow = true
                    if(res.data.certificate != null){
                        this.natice_acceptance =  res.data.certificate.natice_acceptance;
                        this.natice_acceptances =  res.data.certificate.natice_acceptances;
                        this.reject_acceptance = res.data.certificate.reject_acceptance;
                        this.reject_acceptances = res.data.certificate.reject_acceptances;
                        this.portion_acceptance = res.data.certificate.portion_acceptance;
                        this.portion_acceptances = res.data.certificate.portion_acceptances;
                        this.first_notice = res.data.certificate.first_notice;
                        this.first_notices = res.data.certificate.first_notices;
                        this.brand_certificate = res.data.certificate.brand_certificate;
                        this.brand_certificates = res.data.certificate.brand_certificates;
                        this.apply_url = res.data.certificate.apply_url;
                        this.apply_urls = res.data.certificate.apply_urls;
                        this.brand_bailment = res.data.certificate.brand_bailment;
                        this.brand_bailments = res.data.certificate.brand_bailments;
                    }

                    if(this.natice_acceptance !=''){
                        this.one = true
                    }else{
                        this.one = false
                    }
                    if(this.reject_acceptance !=''){
                        this.two = true
                    }else{
                        this.two = false
                    }
                    if(this.portion_acceptance !=null&&this.portion_acceptance !=''){
                        this.three = true
                    }else{
                        this.three = false
                    }
                    if(this.first_notice !=''){
                        this.four = true
                    }else{
                        this.four = false
                    }
                    if(this.brand_certificate !=''){
                        this.five = true
                    }else{
                        this.five = false
                    }
                    if(this.apply_url !=''){
                        this.six = true
                    }else{
                        this.six = false
                    }
                    if(this.brand_bailment !=''){
                        this.seven = true
                    }else{
                        this.seven = false
                    }
                }
                this.getsearchdata();
               }
            })
      },
    //  调取商标搜索里面的接口获取商标信息
     getsearchdata(){
         if(this.regid!=''&&this.good !="商标注册"){
             this.$http.get(this.GLOBAL.base_url+'/app/getdata',{params:{
                        type:4,
                        keywords:this.regid,
                        cate_id:this.intcls,
                        size:10,
                        index:1
                    }}).then(res=>{
                        // console.log(res);
                        if(res.data.code == "1"){
                            if(res.data.data.length!=0){
                                this.brand_img = 'data:image/png;base64,'+res.data.data[0].BrandImg;
                                this.applydate = res.data.data[0].AppDate;
                                this.status = res.data.data[0].BrandStatus;
                                this.intcls_name = this.brand_upload.first_cate;
                                this.Ggdate = res.data.data[0].Ggdate;
                                this.name = res.data.data[0].AppNewName;
                                this.intcls = res.data.data[0].IntCls;
                            if(this.Ggdate == null){
                                this.time1 = '';
                                this.time2 = '';
                            }else{
                                this.time1 = this.Ggdate;
                                var d=new Date(this.time1);
                                if((d.getMonth() + 1) <10){
                                    var m1;
                                    m1 = '0'+ (d.getMonth()+1);
                                }else{
                                    m1 = d.getMonth()+1;
                                }
                                if((d.getDate() - 1) <10){
                                    var m2;
                                    m2 = '0'+ (d.getDate()-1);
                                }else{
                                    m2 = d.getDate()-1;
                                }
                                this.time2 = (d.getFullYear()+10) + '-' + m1 + '-' + m2;
                            }
                        }
                        this.getdatatype();
                    }
                })
         }
     },
    //  获取服务信息
      getdatatype(){
          if(this.regid!=''&&this.intcls!=''&&this.good != "商标注册"){
                  this.$http.get(this.GLOBAL.base_url+'/app/getdataone',{params:{
                       regid:this.regid,
                       intcls:this.intcls
                    }}).then(res=>{
                            if(res.data.code == "1"){
                                this.three_cate = res.data.data;
                            }
                    })
              }
      }
  },
  created(){
      this.getdata();
  },
  mounted(){
      this.good = this.$route.query.good_name;
      this.type = this.$route.query.click_type;

  }
}

</script>

<style>
    .orderDetail-box{
        width:1015px;
        margin-left: 16px;
        margin-top: 12px;
        float: left;
        background-color: #fff;
    }
    .orderDetail-box-top{
        height: 43px;
        padding-top: 64px;
        border-bottom: 1px solid #d8d8d8;
    }
    .orderDetail-box-top>div{
        width: 96px;
        height: 33px;
        font-family: "PingFangSC-Thin";
        font-size: 22px;
        font-weight: 100;
        color: #999999;
        margin: 0 0 16px 28px;
    }
    .orderDetail-box-orderInfo{
        width: 734px;
        height: 35px;
        font-family: "PingFangSC-Medium";
        font-size: 20px;
        font-weight: 500;
        color: #000000;
        padding: 30px 0 16px 39px;
        border-bottom: 1px solid #d8d8d8;
        margin-left: 20px;
    }
    .orderDetail-box-infor{
        width: 780px;
        margin-bottom: 54px;
        height: 128px;
    }
    .orderDetail-box-infor>div{
        float: left;
    }
    .orderDetail-box-infor>div:nth-of-type(1){
        margin: 16px 70px  0 36px;
    }
    .orderDetail-box-infor>div:nth-of-type(2){
        margin: 16px 85px  0 0;
    }
    .orderDetail-box-infor>div:nth-of-type(3){
        margin-top: 16px;
    }
    .orderDetail-box-infor>div>div{
        margin-bottom: 24px;
    }
    .orderDetail-box-infor>div>div>span:nth-of-type(1){
        font-family: "PingFangSC-Medium";
        font-size: 14px;
        font-weight: 500;
        color: #333333;
    }
    .orderDetail-box-infor>div>div>span:nth-of-type(2){
        font-family: "PingFangSC-Regular";
        font-size: 14px;
        color: #999999;
    }
    .orderDetail-box-changeTitle{
        width: 780px;
        height: 44px;
        margin-bottom: 24px;
        border-bottom:1px solid #d8d8d8;
        margin-left: 20px;
    }
    .orderDetail-box-changeTitle>div>div{
        float: left;
        width: 100px;
        height: 44px;
        text-align: center;
        font-family: "PingFangSC-Regular";
        font-size: 20px;
        color: #999999;
        cursor: pointer;
    }
    .orderDetail-box-changeTitle>div>div:nth-of-type(1){
        margin: 0 30px 0 29px;
    }
    .infor .div1,.about .div2{
        border-bottom:1px solid #f96006;
        font-family: "PingFangSC-Medium";
        font-size: 20px;
        font-weight: 500;
        color: #000000;
    }
    .orderDetail-box-tradeMark{
        width: 780px;
        margin-bottom: 54px;
    }
    .orderDetail-box-image{
        height: 120px;
        margin-bottom: 24px;
    }
    .orderDetail-box-image>div{
        float: left;
    }
    .orderDetail-box-image>div:nth-of-type(1){
        font-family: "PingFangSC-Medium";
        font-size: 14px;
        font-weight: 500;
        margin-left: 35px;
        color: #333333;
    }
    .orderDetail-box-image>div:nth-of-type(2){
        width: 120px;
        height: 120px;
        border: solid 1px #d8d8d8;
        text-align: center;
        margin-right: 85px;
        margin-left: 10px;
    }
    .orderDetail-box-image>div:nth-of-type(2)>img{
        width: 120px;
        height: 120px;
    }
    .orderDetail-box-image>div:nth-of-type(3){
        width: 225px;
    }
    .orderDetail-box-image>div:nth-of-type(3)>span{
        font-family: "PingFangSC-Medium";
        font-size: 14px;
        font-weight: 500;
        color: #333333;
    }
    .orderDetail-box-image>div:nth-of-type(3)>span:nth-of-type(2){
        color: #f96006;
    }
    .orderDetail-box-image>div:nth-of-type(4)>span{
        font-family: "PingFangSC-Medium";
        font-size: 14px;
        font-weight: 500;
        color: #333333;
    }
    .orderDetail-box-image>div:nth-of-type(4)>span:nth-of-type(2){
        color:#999990;
    }
    .orderDetail-box-information{
        margin-bottom: 24px;
    }
    .orderDetail-box-information>span:nth-child(2n+1){
         font-family: "PingFangSC-Medium";
         font-size: 14px;
         font-weight: 500;
         color: #333333;
         vertical-align: middle;
    }
    .orderDetail-box-information>span:nth-child(2n){
         font-family: "PingFangSC-Regular";
         font-size: 14px;
         color: #999999;
         vertical-align: middle;
    }
    .span1{
        margin-left: 21px;
        margin-right: 6px;
    }
    .span2{
        display: inline-block;
        width: 200px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        vertical-align: middle;
    }
    .span3{
        display: inline-block;
        width: 142px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        vertical-align: middle;
    }
    .orderDeatil-box-choseTy{
        width: 780px;
        overflow: hidden;
    }
    .orderDetail-box-good-type{
        float: left;
    }
    .orderDetail-box-good-detail{
        float: left;
        margin-left: 25px;
    }
    .orderDetail-box-good-type{
        font-family: "PingFangSC-Medium";
        font-size: 14px;
        font-weight: 500;
        margin-left: 35px;
        color: #333333;
    }
    .orderDetail-box-good-detail-div1{
        margin-bottom: 12px;
        font-family: "PingFangSC-Regular";
        font-size: 14px;
        color: #999990;
    }
    .orderDetail-box-good-detail-div2{
        width: 640px;
        overflow: hidden;
    }
    .orderDetail-box-good-detail-div2>div{
        float: left;
        font-family: "PingFangSC-Thin";
        font-size: 14px;
        font-weight: 100;
        color: #999990;
        margin:0 24px 10px 0;
    }
    .orderDetail-box-risk{
        width: 780px;
        margin-bottom: 54px;
    }
    .orderDetail-box-risk-title{
        margin-bottom: 24px;
        font-family: "PingFangSC-Medium";
        font-size: 14px;
        font-weight: 500;
        color: #333333;
    }
    .orderDetail-box-risk-title>span:nth-of-type(1){
        margin:0 204px 0 82px;
    }
    .orderDetail-box-risk-title>span:nth-of-type(2){
        margin-right:200px;
    }
   .orderDetail-box-planDetail{
       margin-left:29px;
   }
   .orderDetail-box-rate,.orderDetail-box-refund>div:nth-of-type(1){
        width: 741px;
        height: 28px;
        font-family: "PingFangSC-Medium";
        font-size: 20px;
        font-weight: 500;
        color: #000000;
        padding: 0 0 16px 39px;
        border-bottom: 1px solid #d8d8d8;
        margin-left: 20px;
   }
   .orderDetail-box-pragrom{
       height: 118px;
       margin-bottom: 16px;
   }
   .orderDetail-box-pragrom-div1{
       margin: 36px 0 16px 30px;
       width: 720px;
       height: 6px;
       border-radius: 3px;
       background-color: #d8d8d8;
   }
   .orderDetail-box-pragrom-div2{
       height: 6px;
       border-radius: 3px;
       background-color: #f96006;
   }
   .orderDetail-box-pragrom-div3-title>span{
       font-family: "PingFangSC-Regular";
       font-size: 12px;
       color: #111111;
       cursor: pointer;
   }
   .orderDetail-box-pragrom-div3-title>span:nth-of-type(1){
       margin: 0 136px 0 78px;
   }
   .orderDetail-box-pragrom-div3-title>span:nth-of-type(3){
       margin: 0 136px;
   }
   .orderDetail-box-pragrom-div3-list{
       position: relative;
   }
   .orderDetail-box-pragrom-div3-list>div{
       position: absolute;
       width: 96px;
       text-align: center;
       background-color: #ffffff;
       box-shadow: 2px 2px 8px 0 rgba(51, 51, 51, 0.3);
   }
   .p1{
       font-family: "PingFangSC-Thin";
       font-size: 10px;
       font-weight: 100;
       color: #f96006;
       margin: 8px 0;
   }
   .p2{
       font-family: "PingFangSC-Thin";
       font-size: 10px;
       font-weight: 100;
       color: gray;
       margin: 8px 0;
   }
   .orderDetail-box-pragrom-div3-list>div:nth-of-type(1){
       left: 60px;
   }
   .orderDetail-box-pragrom-div3-list>div:nth-of-type(2){
       left: 250px;
   }
   .orderDetail-box-pragrom-div3-list>div:nth-of-type(3){
       left: 460px;
   }
   .orderDetail-box-pragrom-div3-list>div:nth-of-type(4){
       left: 650px;
   }
   .orderDetail-box-file{
       margin-bottom: 54px;
   }
   .orderDetail-box-file-infor,.orderDetail-box-suggest-top{
        width: 761px;
        height: 28px;
        font-family: "PingFangSC-Medium";
        font-size: 20px;
        font-weight: 500;
        color: #000000;
        padding: 0 0 16px 19px;
        border-bottom: 1px solid #d8d8d8;
        margin-left: 20px;
   }
   .orderDetail-box-file-wrap{
       width: 780px;

   }
   .orderDetail-box-file-top{
       float: left;
       width: 230px;
       height: 64px;
       margin: 32px 40px 0 0;
   }
   .orderDetail-box-file-top:nth-of-type(3n){
       margin-right: 0;
   }
   .orderDetail-box-file-top>div{
       float: left;
   }
   .orderDetail-box-file-top-div>div:nth-of-type(1){
        font-family: "PingFangSC-Regular";
        font-size: 14px;
        color: #333333;
        margin: 4px 0 12px;
   }
   .orderDetail-box-file-top-div>div:nth-of-type(2)>a{
       text-decoration: none;
        font-family: "PingFangSC-Regular";
        font-size: 14px;
        color: #f96006;
        cursor: pointer;
   }
   .orderDetail-box-file-top-div>div:nth-of-type(2)>a:nth-of-type(1){
       margin-right: 30px;
   }
   .orderDetail-box-file-top-img{
        width: 64px;
        height: 64px;
        background: url("/static/images/datawrite.png") no-repeat;
        background-size: cover;
        margin-right: 10px;
   }
   .orderDetail-box-suggest{
       margin-bottom: 54px;
   }
   .orderDetail-box-suggest-detail{
       margin-top: 30px;
       height: 135px;
   }
   .orderDetail-box-suggest-detail>div{
       width: 260px;
       float: left;
       text-align: center;
       cursor: pointer;
   }
   .orderDetail-box-suggest-detail>div>img{
       width: 64px;
       height: 64px;
   }
   .orderDetail-box-suggest-detail>div>p{
        font-family: "PingFangSC-Medium";
        font-size: 16px;
        font-weight: 500;
        color: #333333;
   }
   .orderDetail-box-suggest-detail>div>p:nth-of-type(1){
       margin: 15px 0 8px;
   }
   .orderDetail-box-refund{
       margin-bottom: 160px;
   }
   .orderDetail-box-refund>div:nth-of-type(2){
        font-family: "PingFangSC-Regular";
        font-size: 20px;
        color: #f96006;
        margin: 16px 0 0 39px;
        cursor: pointer;
    }
    .order-refund-status{
        margin-bottom: 160px;
    }
    .order-refund-status>div:nth-of-type(1){
        width: 761px;
        height: 28px;
        font-family: "PingFangSC-Medium";
        font-size: 20px;
        font-weight: 500;
        color: #000000;
        padding: 0 0 16px 19px;
        border-bottom: 1px solid #d8d8d8;
    }
    .order-refund-status>div:nth-of-type(2){
        height: 50px;
        line-height: 50px;
    }
    .order-refund-status>div:nth-of-type(2)>div{
        float: left;
        margin-right: 60px;
    }
    .order-refund-status>div:nth-of-type(2)>div>span:nth-of-type(1){
        font-size: 14px;
        font-weight: 500;
        color: #333333;
    }
    .order-refund-status>div:nth-of-type(2)>div>span:nth-of-type(2){
        font-size: 14px;
        color:#999990;
    }
    .drawback{
        background: rgba(0,0,0, 0.8);
        position: fixed;
        z-index: 20;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
    }
    .drawback-div{
        width: 600px;
        height: 437px;
        background-color: #ffffff;
        position: absolute;
        top:50%;
        left: 50%;
        z-index: 30;
        transform: translate(-50%,-50%);
    }
    .drawback-div>img{
        position: absolute;
        right: 17px;
        top: 17px;
        cursor: pointer;
    }
    .drawback-div>div{
        position: absolute;
        top:30px;
        left: 112px;
        width: 390px;
    }
    .back-div1{
        font-size: 16px;
        color: #333333;
        width: 64px;
        margin: 0 auto 32px;
    }

    .back-div2{
        margin-bottom: 30px;
    }
    .back-div2>span,.back-div3>span{
        font-size: 14px;
        color: #333333;
        margin-right: 15px;
    }
    .back-div3{
        margin-bottom: 30px;
    }
    .back-div3>input{
        width: 290px;
        height: 32px;
        border-radius: 4px;
        border: solid 1px #d6d6d6;
        padding-left: 10px;
        outline: none;
    }
    .back-div4{
        height: 96px;
        margin-bottom: 33px;
    }
    .back-div4>div{
        float: left;
    }
    .back-div4>div:nth-of-type(1){
        font-size: 14px;
        color: #333333;
        margin-right: 18px;
    }
    .write{
        width: 300px;
        height: 96px;
        border-radius: 4px;
        border: solid 1px #d6d6d6;
        outline: none;
    }
    .back-div5{
        width: 108px;
        height: 36px;
        border-radius: 4px;
        background: #f96006;
        color: #ffffff;
        text-align: center;
        line-height: 36px;
        margin: 0 auto;
        font-size: 14px;
        cursor: pointer;
    }
    .star-div{
        float:right;
        margin-right:395px;
        width:200px;
    }
    .star-div>span{
        float:left;
        margin-right:8px;
    }
    .ml20 {
      margin-left: 20px;
    }
</style>
<style>
.el-timeline-item__node{
    background: #f97527;
}
.el-timeline-item__tail{
    border-left: 1px solid #f97527;
}
.el-timeline-item__content{
    width: 200px;
    font-family: "PingFangSC-Thin";
    font-size: 14px;
    font-weight: 100;
    color: #333333;
}
.el-timeline-item__timestamp{
    position: absolute;
    left: 280px;
    top:-8px;
}
.el-timeline-item__content>span{
    position: absolute;
    left: 540px;
    top:-5px;
    font-family: "PingFangSC-Regular";
    font-size: 14px;
    color: #999990;
}

</style>
