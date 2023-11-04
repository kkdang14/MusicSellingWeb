<template>
  <div class="page">
    
    <Header v-if="showHeader"></Header>
    
    <router-view class="router-view"></router-view>

    <Footer v-if="showFooter"></Footer>
  </div>
</template>

<script>
import Footer from './components/Footer.vue';
import Header from './components/Header.vue'

export default {
  components: {
    Header,
    Footer,
  },
  computed: {
    showHeader() {
      return (this.$route.name !== 'login' && this.$route.name !== 'register' && this.$route.name !== 'admin'
        && this.$route.name !== 'product-management');
    },
    showFooter() {
      return (this.$route.name !== 'login' && this.$route.name !== 'register' && this.$route.name !== 'admin'
        && this.$route.name !== 'product-management');
    },
  },
};
</script>

<style >
    .page{
      height: auto;
      width: 100%;
    }
    
    .router-view {
      width: 100%; 
    }
</style>