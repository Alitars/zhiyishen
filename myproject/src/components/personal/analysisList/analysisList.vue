<template>
  <div class="analysisList-container">
    <div class="analysisList-box">
      <!-- 查询 -->
      <div class="analysisList-query">
        <span>专利名称</span>
        <input type="text" v-model="keyword1">
        <span @click="search">查询</span>
      </div>
      <!-- 数据 -->
      <div class="analysisList-data">
        <!-- 标题 -->
        <div class="analysisList-data-header">
          <ul>
            <li>专利名称</li>
            <!-- <li>专利类型</li> -->
            <li>当前状态</li>
            <li>操作</li>
          </ul>
        </div>
        <!-- 后台数据 -->
        <div class="analysisList-data-backstage" v-for="(v,k) in list" :key="k">
          <ul >
            <li :title="v.patent_name">{{v.patent_name}}</li>
            <!-- <li :title="v.patent_type">{{v.patent_type}}</li> -->
            <li v-if="v.state==1">已申请</li>
            <li v-if="v.state==0">检查中</li>
            <li v-if="v.state==1" class="classBule" @click="jump(v.id,v.patent_type)">查看详情</li>
            <li v-if="v.state==0" class="cur">查看详情</li>
          </ul>
        </div>
      </div>
      <!-- 分页 -->
      <div class="block">
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
    <div style="clear:both"></div>
  </div>
</template>

<script>
  export default {
    name:'analysisList',
    data(){
      return {
        // 分页
        currentPage1:1,
        pageSize:6,
        total:0,
        keyword1:'',
        list:[],
      }
    },
    methods:{
      // 分页
      handleSizeChange(val) {
        this.pageSize = val;
        this.getData();

      },
      handleCurrentChange(val) {
          this.currentPage1 = val;
          this.getData();

      },
      // 数据
      getData(){
        this.list = []
        const loading = this.$loading({
          lock: true,
          text: '请求中',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.3)'
        });
        var user_id = '?user_id=' + this.$cookie.getCookie('u_id')
        var index = '&index=' + this.currentPage1
        var size = '&size=' + this.pageSize
        var keyword = '&keyword=' + this.keyword1
        var zong = user_id+index+size+keyword
        this.$http.get(this.GLOBAL.json+'/get_user_task'+zong
        ).then(res => {
          if(res.data.message == '该用户暂时没有任务') {
            loading.close();
          }else {
            // console.log(res)
          loading.close();
            for(let i=0;i<res.data.id.length;i++) {
              for(let j=0;j<res.data.patent_name.length;j++) {
                for(let k=0;k<res.data.patent_type.length;k++) {
                  for(let l=0;l<res.data.state.length;l++) {
                    if(i==j&&i==k&&i==l) {
                      this.list.push({
                        id:res.data.id[i],
                        patent_name:res.data.patent_name[j],
                        patent_type:res.data.patent_type[k],
                        state:res.data.state[l],
                      })
                    }
                  }
                }
              }
            }
            this.total = res.data.total
          }
          // console.log(this.list)
        })
      },
      // 跳转
      jump(val,val1){
        if(val1 == '外观专利') {
          this.$router.push({
            path:'/appAnalysisDetailed',
            query:{
                  good:val
            }
          })
        }else {
          this.$router.push({
            path:'/patentReports',
            query:{
                  good:val
            }
          })
        }
      },
      search(){
        this.list =[]
        this.currentPage1 = 1
        this.getData()
      }
    },
    mounted(){
      this.getData()
    }
  }
</script>

<style scoped>
  /* 公共样式 */
  ul {
    padding: 0;
    list-style: none;
  }
  .analysisList-box {
    width: 1015px;
    min-height: 1108px;
    background-color: #fff;
    margin:12px 0 0 16px;
    float: left;
    padding-top: 36px;
    padding-left: 97px;
    box-sizing: border-box;
  }
  /* 查询 */
  .analysisList-query {
    height: 36px;
    line-height: 36px;
    position: relative;
    margin-bottom: 37px;
  }
  .analysisList-query > span:nth-child(1) {
    font-family: "PingFangSC";
    font-size: 14px;
    color: #333;
    font-weight: 500;
    margin-right: 16px;
  }
  .analysisList-query > input {
    width: 280px;
    height: 36px;
    border-radius: 4px;
    border: solid 1px #d6d6d6;
    padding: 6px 10px;
    box-sizing: border-box;
  }
  .analysisList-query > span:last-child {
    width: 80px;
    height: 36px;
    line-height: 36px;
    text-align: center;
    border-radius: 4px;
    background-color: #ff5500;
    position: absolute;
    top: 2px;
    left: 277px;
    color: #fff;
    cursor: pointer;
  }
  /* 数据 */
  .analysisList-data {
    height: 252px;
    width: 650px;
  }
    /* 标题 */
    .analysisList-data-header {
      width: 650px;
      height: 36px;
      line-height: 36px;
      background-color: #fafafa;
      border: solid 1px #eeeeee;
      box-sizing: border-box;
    }
    .analysisList-data-header > ul {
      margin-left: 39px;
    }
    .analysisList-data-header > ul > li {
      float: left;
      font-family: "PingFangSC";
      font-size: 14px;
      font-weight: 600;
      color: #333;
    }
    .analysisList-data-header > ul > li:nth-child(1) {
      width: 174px;
      text-align: center;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      margin-right: 55px;
    }
    .analysisList-data-header > ul > li:nth-child(2) {
      width: 84px;
      text-align: center;
      margin-right: 158px;
    }
    .analysisList-data-header > ul > li:nth-child(3) {
      width: 56px;
      margin-right: 82px;
      text-align: center;
    }
    .analysisList-data-header > ul > li:nth-child(4) {
      width: 56px;
      text-align: center;
    }
    /* 后台数据 */
    .analysisList-data-backstage {
      width: 650px;
      height: 36px;
      line-height: 36px;
      background-color: #fff;
      border: solid 1px #eeeeee;
      box-sizing: border-box;
      border-top: none;
    }
    .analysisList-data-backstage > ul {
      margin-left: 39px;
    }
    .analysisList-data-backstage > ul > li {
      float: left;
      font-family: "PingFangSC";
      font-size: 14px;
      color: #333;
    }
    .analysisList-data-backstage > ul > li:nth-child(1) {
      width: 174px;
      text-align: center;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      margin-right: 55px;
    }
    .analysisList-data-backstage > ul > li:nth-child(2) {
      width: 84px;
      text-align: center;
      margin-right: 158px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .analysisList-data-backstage > ul > li:nth-child(3) {
      width: 56px;
      margin-right: 82px;
      text-align: center;
      cursor: pointer;
    }
    .analysisList-data-backstage > ul > li:nth-child(4) {
      width: 56px;
      cursor: pointer;
    }
    .classBule{
      color: #4a90e2 !important;
    }
  /* 分页 */
  .block {
    width: 650px;
    text-align: center;
    margin-top: 36px;
  }
  .cur {
    cursor: default !important;
  }
</style>
