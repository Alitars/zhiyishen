<template>
  <div class="paycontainer">
  </div>
</template>

<script>
export default {
  name: 'pay',
  components: {
      
  },
  methods:{
    pay(){
      const div = document.createElement('div');
      div.innerHTML = this.$route.query.htmls;
      document.body.appendChild(div);
      document.forms[0].submit();
    }
  },
  mounted(){
    this.pay()
  }
}

</script>

<style scoped>
  
</style>
