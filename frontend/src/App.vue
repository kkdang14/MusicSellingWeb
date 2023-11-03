<template>
  <div class="page">
    <Header></Header>
    
    <div class="container">
      <router-view/>
    </div>

    <div class="footer">
      <Footer></Footer>
    </div>
  </div>
</template>

<script>
import Footer from './components/Footer.vue';
import Header from './components/Header.vue'

export default {
  components: {
    Header,
    Footer
  },
};
</script>

<style scoped>
    .page{
      height: auto;
      width: 100%;
    }
</style>