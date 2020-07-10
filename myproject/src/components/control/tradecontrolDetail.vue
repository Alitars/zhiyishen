<template>
  <div class="tradecontrolDetail">
    <Top></Top>
    <div class="tradecontrolDetail-box">
        <div class="tradecontrolDetail-middle">
            <div class="middle-left">
                <div class="middle-left-img">
                    <img src="/static/images/4.png" alt="">
                </div>
                <div class="middle-left-type">
                    <div :class="changeclass">
                        <div class="typedetail" @click="chosetype('detail')">商标详情</div>
                        <div class="typeall" @click="chosetype('all')">全部近似商标<span>（10）</span></div>
                        <div class="typeport" @click="chosetype('port')">公告期商标(近似)<span>（10）</span></div>
                        <div class="typexu" @click="chosetype('xu')">可续展商标(近似)<span>（10）</span></div>
                        <div class="typeobject" @click="chosetype('object')">可异议商标(近似)<span>（10）</span></div>
                        <div class="typequit" @click="chosetype('quit')">可撤三商标(近似)<span>（10）</span></div>
                    </div>
                </div>
            </div>
            <div class="middle-right" v-if="changeclass == 'detail'">
                <div class="right-box">
                    <div class="right-box-title">商标详情</div>
                    <div class="right-box-detail">
                        <div class="right-box-detail-div1">
                            <div class="detail-name"><span>商标名称：</span>果老</div>
                            <div class="detail-num"><span>申请/注册号：</span>256985623</div>
                            <div class="detail-num"><span>国际分类：</span>35类 广告销售</div>
                            <div class="detail-ser">
                                <div class="ser">商品/服务：</div>
                                <div>
                                    <p v-for="(v,k) in 5">3501 计算机网络上的在线广告</p>
                                </div>
                            </div>
                            <!-- <div style="clear:both"></div> -->
                            <div class="detail-name"><span>类似群：</span>3505；3502；3503；3506；3508；</div>
                            <div class="detail-num"><span>申请人中文名称：</span>果老(上海)互联网技术有限公司</div>
                            <div class="detail-num"><span>申请人英文名称：</span>35类 广告销售</div>
                            <div class="detail-num"><span>申请人中文地址：</span>上海市松江区车墩镇莘莘路32号2645</div>
                            <div class="detail-num"><span>申请人英文地址：</span>35类 广告销售</div>
                            <div class="detail-num"><span>申请日期：</span>2016-04-26</div>
                            <div class="detail-date">
                                <span>初审公告日期：</span><span>2016-04-26</span>
                                <span>初审公告号：</span><span id="no">9999</span>
                            </div>
                            <div class="detail-date">
                                <span>注册公告日期：</span><span>2016-04-26</span>
                                <span>注册公告号：</span><span id="no">9999</span>
                            </div>
                            <div class="detail-date">
                                <span>专用权期限：</span><span>2016-04-26</span>
                                <span>是否共有商标：</span><span>否</span>
                            </div>
                             <div class="detail-date">
                                <span>国际注册日期：</span><span>2016-04-26</span>
                                <span>后期指定日期：</span><span>2016-04-26</span>
                            </div>
                            <div class="detail-num"><span>优先权日期：</span>2016-04-26</div>
                            <div class="detail-num"><span>代理/办理机构：</span>上海祺盛知识产权代理有限公司</div>
                        </div>
                        <div class="detail-status">驳回待复审</div>
                    </div>
                </div>
            </div>
            <div class="middle-right" v-else>
                <div class="right-box">
                    <div class="right-box-title">全部近似商标</div>
                    <div class="right-box-detail">
                        <div class="right-box-top">
                            <div>针对近似商标的你可以采取一些措施对你的商标加以保护，你可以办理以下业务：商标异议，商标撤三申请，商标无效宣告等</div>
                            <div>咨询专家</div>
                        </div>
                        <div class="right-box-ser">
                            <input type="text" placeholder="请输入商标名称">
                            <div class="box-ser1">搜索</div>
                            <div class="box-ser2">
                                <span>综合排序</span>
                                <span>申请时期
                                    <i class="regularTriangle"></i>
                                    <i class="downTriangle"></i>
                                </span>
                                <span>初审日期
                                    <i class="regularTriangle"></i>
                                    <i class="downTriangle"></i>
                                </span>
                                <span>注册日期
                                    <i class="regularTriangle"></i>
                                    <i class="downTriangle"></i>
                                </span>
                            </div>
                        </div>
                    </div>
                    <div class="right-box-list">
                        <div v-for="(v,k) in 4">
                            <div class="list1">
                                <img src="/static/images/4.png" alt="">
                            </div>
                            <div class="list2">
                                <div>
                                    <div class="list-div1">guolao</div>
                                    <div class="list-div2">
                                        <span>当前状态:</span>
                                        <span id="span1">已注册</span>
                                    </div>
                                    <div>
                                        <span>申请/注册号:</span>
                                        <span>256231265</span>
                                    </div>
                                </div>
                                <div>
                                    <div class="list-div3">
                                        <span>商品类别:</span>
                                        <span>第45类 社会服务</span>
                                    </div>
                                    <div class="list-div3">
                                        <span>申请人:</span>
                                        <span id="span2">果老(上海)互联网技术有限公司</span>
                                    </div>
                                    <div>
                                        <span>申请日期:</span>
                                        <span>2016-04-26</span>
                                    </div>
                                </div>
                            </div>
                            <div class="list3">
                                <p>查看详情</p>
                                <p>监控商标</p>
                                <p>购买商标</p>
                            </div>
                        </div>
                    </div>
                    <div class="right-box-page">
                        <el-pagination
                            @size-change="handleSizeChange"
                            @current-change="handleCurrentChange"
                            :current-page="currentPage1"
                            :page-size="pageSize"
                            layout="total,prev, pager, next"
                            :total="total">
                        </el-pagination>
                    </div>
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
export default {
  name: 'tradecontrolDetail',
  data(){
      return{
          changeclass:"detail",
          total:100,
          currentPage1: 1,
         pageSize: 4,
      }
  },
  components: {
    Top,
    Foot
  },
  methods:{
      chosetype(val){
          this.changeclass = val;
      },
       handleSizeChange(){

      },
      handleCurrentChange(){

      },
  }
}

</script>

<style scoped>
    .tradecontrolDetail-box{
        width: 100%;
        height: 100%;
        background-color: #fafafa;
        padding: 16px 0 80px;
    }
    .tradecontrolDetail-middle{
        width: 1200px;
        margin: 0 auto;
        height: 912px;
    }
    .tradecontrolDetail-middle>div{
        float: left;
    }
    .middle-left{
        margin-right: 16px;
    }
    .middle-left-img{
        width: 224px;
        height: 224px;
        margin-bottom: 16px;
        background: white;
    }
    .middle-left-img>img{
         width: 180px;
        height: 180px;
        margin: 22px;
    }
    .middle-left-type{
        width: 192px;
        padding:32px 0 0 32px;
        height: 640px;
        background: white;
    }
    .middle-left-type>div>div{
        font-size: 16px;
        margin-bottom: 32px;
        cursor: pointer;
    }
    .middle-left-type>div>div:nth-of-type(2)>span{
        margin-left: 32px;
    }
    .middle-left-type>div>div>span{
        margin-left: 6px;
    }
    .middle-right{
        width: 960px;
        padding-top: 30px;
        min-height: 882px;
        background-color: white;
    }
    .detail .typedetail,.all .typeall,.port .typeport,.xu .typexu,.object .typeobject,.quit .typequit{
        color:#f96006!important;
    }
    .right-box{
        width: 900px;
        margin: 0 auto;
    }
    .right-box-title{
        font-size: 18px;
        margin: 0 0 4px 28px;
    }
    .right-box-detail{
        border-top:1px solid #d8d8d8;
    }
    .right-box-detail-div1{
        width: 720px;
        float: left;
        margin: 22px 60px 0 0;
    }
    .right-box-detail-div1>div{
        font-size: 14px;
        font-weight: 300;
    }
    .right-box-detail-div1>div>span{
        display: inline-block;
        width: 120px;
    }
    .detail-name{
        height: 28px;
        border-bottom:1px dotted #d6d6d6;
    }
    .detail-num,.detail-date{
        height: 35px;
         border-bottom:1px dotted #d6d6d6;
         line-height: 35px;
    }
    .detail-ser{
        overflow: hidden;
        margin: 7px 0 16px;
    }
    .detail-ser>div{
        float: left;
    }
    .ser{
        width: 120px;
    }
    .detail-ser>div>p{
        margin-bottom: 8px;
    }
    .detail-date>span:nth-of-type(2){
        display: inline-block;
        font-weight: 300;
        width: 325px;
    }
    .detail-date>span:nth-of-type(4){
        font-weight: 300;
    }
    #no{
        color: #f96006;
    }
    .detail-status{
        float: left;
        width: 120px;
        height: 36px;
        margin-top: 14px;
        border-radius: 4px;
        background-color: #fafafa;
        text-align: center;
        line-height: 36px;
        font-size: 14px;
        font-weight: 300;
        color: #f96006;
    }
    .right-box-top{
        height: 32px;
        margin: 6px 0 16px;
    }
    .right-box-top>div{
        float: left;
        height: 32px;
        line-height: 32px;
        font-size: 14px;
    }
    .right-box-top>div:nth-of-type(1){
        font-weight: 100;
        margin-right: 40px;
    }
    .right-box-top>div:nth-of-type(2){
        width: 80px;
        height: 32px;
        border-radius: 4px;
        text-align: center;
        line-height: 32px;
        color: white;
        cursor: pointer;
        background-color: #f96006;
    }
    .right-box-ser{
        height: 48px;
        margin-bottom: 16px;
       border-bottom: 1px solid #d8d8d8;
    }
    .right-box-ser>input{
        float: left;
        outline: none;
        width: 216px;
        height: 30px;
        padding-left: 12px;
        border-radius: 4px;
        border: solid 1px #d6d6d6;
        margin-right: 30px;
    }
    .box-ser1{
        float: left;
        width: 80px;
        height: 32px;
        border-radius: 4px;
        background-color: #f96006;
        text-align: center;
        line-height: 32px;
        color: white;
        margin-right: 168px;
        cursor: pointer;
    }
    .box-ser2{
        float: left;
        height: 20px;
        margin-top: 12px;
    }
    .box-ser2>span{
        font-size: 16px;
        margin-right: 30px;
        position: relative;
    }
    .regularTriangle{
        position: absolute;
        width: 0;
        height: 0;
        top: 4px;
        right: -12px;
        border-style: solid;
        border-width: 4px;
        border-color: transparent transparent #000 #000;
        transform: rotate(135deg);
        cursor: pointer;
        z-index: 20;
    }
    .downTriangle{
        position: absolute;
        width: 0;
        height: 0;
        top:8px;
        right: -12px;
        border-style: solid;
        border-width: 4px;
        border-color: transparent transparent #000 #000;
        transform: rotate(-45deg);
        cursor: pointer;
        z-index: 20;
    }
    .right-box-list{
        margin-bottom: 32px;
    }
    .right-box-list>div{
        height: 160px;
        border:1px solid #d8d8d8;
        border-top:none;
    }
    .right-box-list>div:first-child{
        border-top:1px solid #d8d8d8;
    }
    .right-box-list>div>div{
        float: left;
        height: 120px;
        margin-top: 20px;
    }
    .list1{
        width: 118px;
        height: 118px;
        border: solid 1px #d8d8d8;
        margin: 0 24px 0 20px;
    }
    .list1>img{
        width: 119px;
        height: 119px;
    }
    .list2{
        width: 614px;
        height: 120px;
        font-size: 14px;
        border-right:1px dotted #d8d8d8;
    }
    .list2>div:nth-of-type(1){
        float: left;
        width: 265px;
    }
    .list2>div>div>span:nth-of-type(1){
        display: inline-block;
        width: 80px;
        text-align: right;
        vertical-align: middle;
    }
    .list2>div>div>span:nth-of-type(2){
        color: #999999;
        vertical-align: middle;
    }
    .list-div1{
        font-size: 18px;
        margin: 0 0 23px 20px;
    }
    #span1{
        color: #f96006;
    }
    #span2{
        width: 250px;
        display: inline-block;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
    }
    .list-div2{
        margin-bottom: 24px;
    }
    .list-div3{
        margin-bottom: 26px;
    }
    .list2>div:nth-of-type(2){
        float: left;
        width: 335px;
    }
    .list3{
        width: 118px;
        text-align: center;
    }
    .list3>p{
        font-size: 14px;
        margin-bottom: 24px;
        color: #4a90e2;
        cursor: pointer;
    }
    .right-box-page{
        float: right;
    }
</style>
