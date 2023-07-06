<template>
<div id="app">
  <w-app :key="$route.fullPath">
    <metainfo>
      <template v-slot:title="{ content }">{{ content ? `${content} | SITE_NAME` : `SITE_NAME` }}</template>
    </metainfo>

    <Header />

    <w-flex grow>
      <router-view  />
    </w-flex>
    
    <Footer/>
  </w-app>
</div>
</template>
<script>
import Footer from './components/partials/footer.vue';
import Header from './components/partials/header.vue';
export default {
  name: 'main',
  components: {Footer, Header}
}
</script>
<style lang="scss">
@import "src/scss/main.scss";
/* Demo styles - can be discarded. */
.w-app {background-color: #e6eaea;}
header, footer, main {
  margin: 4px;
  text-transform: uppercase;
  color: #fff;
  border: 1px solid rgba(0, 0, 0, 0.07);
}
header, footer {background-color: $primary;margin:0}
header {
  display: flex;
  min-height: 60px; 
    padding: 0px 12px;
}
footer {
  padding: 10px 15px;
}
.search-block{
    flex: none !important;
    text-align: center;
    margin: auto;
    width: 80%;
    max-width: 380px;
    input{
      text-align: left;
    }
    button{
      border-radius: 0;
      border: 2px solid #202121;
    }
}
.side-nav {
  margin-top:60px;
  padding: 0 20px;
  ul {
    list-style-type: none;
    li {
      cursor: pointer;
      font-size:18px;
      color: $primary;
    }
  }
}
aside {background-color: #fef2ff;}
main {background-color: #efffed;}
.w-breadcrumbs{
  a {
    background:none;
  }
}

</style>