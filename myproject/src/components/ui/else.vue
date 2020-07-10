<template>
    <div class="yb_conct">
  <div class="yb_bar">
    <ul>
      <li class="yb_top" @click="totop">返回顶部</li>
      <li class="yb_phone">400-630-2718</li>
      <li class="yb_QQ">
      	<a target="_blank" href="http://wpa.qq.com/msgrd?v=3&uin=1045854265&site=qq&menu=yes&from=message&isappinstalled=0" title="即刻发送您的需求">在线咨询1</a>
      </li>
	  <li class="yb_QQ">
      	<a target="_blank" href="http://wpa.qq.com/msgrd?v=3&uin=251363934&site=qq&menu=yes&from=message&isappinstalled=0" title="即刻发送您的需求">在线咨询2</a>
      </li>
      <li class="yb_ercode">微信二维码 <br>
        <img class="hd_qr" src="/static/images/weixin.jpg" alt="关注你附近"> </li>
    </ul>
  </div>
</div>
</template>

<script>
    export default {
        name: "else",
        components:{

        },
        data(){
          return {
           
          }
        },
        methods:{
            totop(){
              window.scrollTo(0,0)
            }
        }
    }
</script>

<style scoped>

    .clear:after{content:'\20';display:block;height:0;clear:both;visibility:hidden;}
/*固定的悬浮窗*/
.yb_conct{position:fixed;z-index:9999999;top:200px;right:-127px;cursor:pointer;transition:all .3s ease;}
.yb_bar ul li{width:180px;height:53px;font:16px/53px 'Microsoft YaHei';color:#fff;text-indent:54px;margin-bottom:3px;border-radius:3px;transition:all .5s ease;list-style: none;}
.yb_bar .yb_top{background:#ff4a00 url(/static/images/fixCont.png) no-repeat 0 0;}
.yb_bar .yb_phone{background:#ff4a00 url(/static/images/fixCont.png) no-repeat 0 -57px;}
.yb_bar .yb_QQ{text-indent:0;background:#ff4a00 url(/static/images/fixCont.png) no-repeat 0 -113px;}
.yb_bar .yb_ercode{background:#ff4a00 url(/static/images/fixCont.png) no-repeat 0 -169px;overflow: hidden;}
.hd_qr{padding:0 29px 25px 29px; width: 130px;height: 130px;}
.yb_QQ a{display:block;text-indent:54px;width:100%;height:100%;color:#fff;text-decoration: none;}
.yb_conct:hover{
    right:5px
}
.yb_conct:hover .yb_ercode{
   height: 200px;
} 

</style>
