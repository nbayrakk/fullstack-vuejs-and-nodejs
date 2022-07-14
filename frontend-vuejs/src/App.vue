<template>
  <div  id="app">
    <Header />
    <router-view></router-view>
    <!-- <HomePage/> -->
    <Footer/>
  </div>
</template>

<script>
import Header from './views/Header.vue'
import Footer from './views/Footer.vue'

export default {
  name: 'App',
  components: {
    Header,
    Footer
  },
  created(){
    
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Exo:wght@100&display=swap');
#app {
  font-family: Exo, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  font-weight: bold;
}
</style>
