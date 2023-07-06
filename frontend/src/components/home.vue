<template>
  <div class="novelList" v-cloak>
    <h1 v-if="products.length != 0" class="py2">Top Novels</h1>
    <w-flex wrap>
      <Loader v-if="isLoading" />
      <NoResults v-else-if="products.length == 0" />
      <div v-else class="list-item xs12 md6 lg6 pa1" v-for="item of products">
        <img @click="this.$router.push('novels/'+item.slug)" class="item-image" :src="item.img"/>
        <div class="item-content">
          <h3 @click="this.$router.push('novels/'+item.slug)">{{item.title}}</h3>
          <div class="item-rating">
          <w-rating :model-value="item.rating" readonly
          key="home"
          class="my2"
          bg-color="grey"
          color="secondary"
          ></w-rating>
            <!-- <i class="material-icons active" v-for="i of item.rating">star_rate</i>
            <i class="material-icons" v-for="i of (5-item.rating)">star_border</i> -->
          </div>
            
          <p class="item-desc" v-html="truncate(item.description,200,'...Read more')" />
        </div>
      </div>
    </w-flex>
    <v-pagination
    class="pagination"
    v-if="pageCount > 1"
    v-model="page"
    :pages="pageCount"
    :range-size="1"
    active-color="#202121"
    @update:modelValue="clickCallback"
  />
</div>

</template>
<script>
import NovelService from "../services/novelService";
import NoResults from '../components/partials/noresults.vue';
import Loader from '../components/partials/loader.vue';
import VPagination from "@hennge/vue3-pagination";
import { useMeta } from 'vue-meta';
import "@hennge/vue3-pagination/dist/vue3-pagination.css";

export default {
  name: "novelList",
  components: { VPagination, NoResults, Loader },
  setup () {
    useMeta({ title: 'Top Novels' }) //seo
  },
  data() {
    return {
      isLoading: true,
      products: [],
      page: 1,
      pageCount: 1,
      searchTerm:"",
    }
  },
  computed: {
    noProducts() {
      return this.products.length === 0;
    }
  },
  methods:{
    truncate(text, length, clamp="..."){
      text = text.replace(/^\s+/g, '')
      var node = document.createElement('div');
      node.innerHTML = text;
      var content = node.textContent;
      return content.length > length ? content.slice(0, length) + clamp : content;
    },
    async clickCallback(pageNum) {
      let path = '/novels?page='+pageNum;
        if(this.searchTerm != '') {
          path += "&q="+ this.searchTerm
        }
       // this.$router.push(path);
        window.history.pushState({}, "",path)
        let prods = await NovelService.getNovels(this.searchTerm, pageNum);
        this.isLoading=false;
        if(prods) {
         this.products = prods.results;
        }
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
      }
  },
  async mounted(){
    if(this.$route.query.page){
        this.page = parseInt(this.$route.query.page);
    }
    if(this.$route.query.q) {
      this.searchTerm = this.$route.query.q
    }
    let prods = await NovelService.getNovels(this.searchTerm, this.$route.query.page);
    this.isLoading=false;
    if(prods) {
      this.products = prods.results;
      this.pageCount = prods.pageCount;
    }
  }
}
</script>
<style lang="scss">
[v-cloak] {
  display: none;
}
.novelList{
  padding: 0 15px;
  .list-item{
    display:flex;
    .item-image{
        cursor:pointer;
      width:150px;
      height:auto;
      padding-right:20px;
    }
    .item-content{
      h3 {
        margin-top: 0;
        cursor:pointer;
      }
      .item-rating{
        .active {
          color:$primary;
          width:25px;
        }
      }
    }
  }
  .pagination{
    padding: 20px 0;
    justify-content: center;
    .Page-active{
        color: #fff;
    }
  }
}
</style>