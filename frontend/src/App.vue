<template>
  <div class="page">
    
    <Header v-if="showHeader" :isHomePage="isHomePage"></Header>
    
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
      const excludedRoutes = ['login','login-admin', 'register',
                              'notfound', 'add-product', 'product-form'];
      return !excludedRoutes.includes(this.$route.name);
    },
    showFooter() {
      const excludedRoutes = ['login','login-admin', 'register', 'admin', 'product-management',
                              'user-management', 'overall', 'order', 'notfound', 'add-product', 'product-form'];
      return !excludedRoutes.includes(this.$route.name);
    },

    isHomePage() {
      // Adjust the condition based on the route where you want the homepage style
      return this.$route.name === 'home'; 
    },
  },
};
</script>

<style >
    .page{
      height: auto;
      width: 100%;
      /* background: var(--black); */
    }
    
    .router-view {
      width: 100%; 
    }
</style>