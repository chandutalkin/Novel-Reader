<template>
  <header class="wrap justify-space-between">
      <div class="logo" style="cursor:pointer"><svg @click="goHome" height="55" width="200"><text x="0" y="35" fill="white">Top Novels!</text></svg></div> 
      <!-- Search bar for desktops -->
      <w-flex class="smd-hide search-block bd1" style="border:1px solid #fff">
        <w-input
        @keyup="handleKeyup"
          bg-color="white"
          v-model="searchVal"
          :tile="true"
          label-position="right"
          outline
          inner-icon-left="wi-search">
        </w-input>
        <w-button class="pa3" @click="$refs.searchBar.openDrawer =false; this.searchNovels()">Search</w-button>
      </w-flex>
      <!-- Button groups -->
      <div class="button-group pt3">
      <!-- Search bar for tablets & mobiles -->
        <slider
        class="mdu-hide ma1"
        ref="searchBar"
        position="top" 
        :open="openDrawer" 
        tag="div"
        icon="search" 
        key="searchBar"
        :height="60">
          <w-flex class="search-block">
            <w-input
            @keyup="handleKeyup"
              v-model="searchVal"
              :tile="true"
              class="mb2"
              label-position="right"
              outline
              inner-icon-left="wi-search">
            </w-input>
            <w-button class="pa3 mb2" @click="$refs.searchBar.openDrawer =false; this.searchNovels()">Search</w-button>
          </w-flex>
        </slider>
        <!-- Side Bar -->
        <slider class="ma1" ref="navBar" position="right" :open="openDrawer" icon="menu" key="navBar" :height="0">
           <div class="side-nav">
            <ul>
              <li @click="$refs.navBar.openDrawer =false; this.goHome();">Novels</li>
            </ul>
          </div>
        </slider>
      </div>
      <!-- Button groups end -->
    </header>
</template>
<script>
import Slider from './slider.vue';
export default {
  name: "Header",
  data() {
    return {
      openDrawer: false,
      searchVal: '',
    }
  },
  components: {Slider},
  methods: {
    goHome() {
      this.$router.push('/');
    },
    handleKeyup(key) {
      if(key.keyCode == "13" || key.key == "Enter") {
        if(this.$refs.searchBar){
          this.$refs.searchBar.openDrawer =false;
        }
        this.searchNovels();
      }
    },
    searchNovels() {
      this.$router.push('/novels?q='+this.searchVal);
    }
  },
}
</script>
<style lang="scss">
.header{
  padding:20px;
}
</style>