<template>
  <div class="searchimg">
    <img :src="pdfUrl" alt="" style="width:1000px;height:1000px">
    <!-- <iframe class="prism-player" :src="pdfUrl" width="100%" height="100%"></iframe> -->
  </div>
</template>

<script>
export default {
  name: 'searchimg',
  components: {
      
  },
  data(){
      return{
        pdfUrl:''
      }
  },
  methods:{
   getdata(){
        this.$http.get('http://51guolao.yiqibnb.com/app/getbyregidpic',{params:{
            trialnum:this.$route.query.trialnum,
            pagenum:this.$route.query.pagenum
        }}).then(res=>{
            console.log(res.data)
            if(res.data.code == "1"){
                // this.pdfUrl = this.getObjectURL(res.data);
                // this.pdfUrl = window.url.createobjecturl(res.data);
                // this.pdfUrl = res.data;
                // this.pdfUrl = `/static/pdf/web/viewer.html?file=${encodeURIComponent(res.data)}&.pdf`
                // console.log(this.pdfUrl)
                this.pdfUrl = 'data:image/png;base64,'+res.data;
            }
                
        })
    },
  },
  mounted(){
      this.getdata();
  }
}

</script>

<style scoped>
    
</style>
