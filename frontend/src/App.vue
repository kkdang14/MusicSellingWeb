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
      const excludedRoutes = ['login', 'register', 'admin', 'product-management',
                              'user-management', 'overall', 'order', 'dashboard'];
      return !excludedRoutes.includes(this.$route.name);
    },
    showFooter() {
      const excludedRoutes = ['login', 'register', 'admin', 'product-management',
                              'user-management', 'overall', 'order', 'dashboard'];
      return !excludedRoutes.includes(this.$route.name);
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