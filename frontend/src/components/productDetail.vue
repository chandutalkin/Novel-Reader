<template>
  <div class="novelDetail">
  <w-breadcrumbs class="xs-hide" :items="breadcrumbs" />

    <Loader v-if="isLoading" />
    <w-flex wrap v-else-if="product">
      <div class="text-center item-detail">
        <img class="item-image" :src="product.img"/>
        <div class="item-content">
          <h2>{{product.title}}</h2>
          <div class="item-rating">
          <w-rating :model-value="product.rating" readonly
          key="home"
          class="my2"
          bg-color="grey"
          color="'secondary'"
          ></w-rating>
            <!-- <i class="material-icons active" v-for="i of item.rating">star_rate</i>
            <i class="material-icons" v-for="i of (5-item.rating)">star_border</i> -->
          </div>
          <p class="item-desc pb4 text-left" v-html="product.description" />
        </div>
      </div>
    </w-flex>
    <w-tabs ref="tabs" :items="tabs">
        <template #item-content="{ item }">
            <div class="chapter-list w-flex wrap">
                <div class="chapter-list-item xs12 sm6 lg4 pa1" v-for="chapter of product.chapters">
                <RouterLink :to="product.slug+'/chapters/'+chapter.slug">{{chapter.title}}</RouterLink>
                </div>
            </div>
        </template>
    </w-tabs>
  </div>
</template>
<script>
import NovelService from "../services/novelService";
import Loader from '../components/partials/loader.vue';
import { useMeta } from 'vue-meta'
export default {
  name: "novelDetail",
  components: { Loader },
  data() {
    return {
      isLoading: true,
      breadcrumbs: [
        { label: 'Home', route: '/' }
      ],
      tabs: [
            { title: 'Chapters' }
        ],
      product: {
        title: '',
        description: ''
      }
    }
  },
  metaInfo() { //seo
    let title = this.product.title;
    let desc = this.product.description
      return {
      title: title,
      description: desc,
      og: {
          title: title,
          description:  desc,
           type: 'novel'
        }
      }
  },
  computed: {
    noProducts() {
      return this.product.length === 0;
    }
  },
  methods:{
    truncate(text, length, clamp="..."){
      if(!text)
        return null;
      text = text.replace(/^\s+/g, '')
      var node = document.createElement('div');
      node.innerHTML = text;
      var content = node.textContent;
      return content.length > length ? content.slice(0, length) + clamp : content;
    }
  },
  async beforeMount(){
    let prod = await NovelService.getNovelBySlug(this.$route.params.slug);
    this.isLoading= false;
    if(prod) {
      this.product = prod;
      // let meta = useMeta({
      //   title: prod.title,
      //   description:  prod.title,
      //   og: {
      //     title: prod.title,
      //     description:  prod.title,
      //     type: 'novel'
      //   }}, window.metaManager);
      // console.log(meta, 'sss')
      //   this.$meta.refresh
      this.breadcrumbs.push({ label: prod.title, route: '/novels'})
      console.log('asa bhanu')
    }
  },
  beforeUnmount() {
    console.log('asa bhanu unmount')
  }
}
</script>
<style lang="scss">
.novelDetail{
  padding: 0 15px;
  .item-detail{
    .item-image{
      width:120px;
      height:auto;
      padding-right:20px;
    }
    .item-content{
      h3 {
        margin-top: 0;
      }
      .item-rating{
        .active {
          color:$primary;
          width:25px;
        }
      }
    }
  }
    .chapter-list{
        .chapter-list-item{
            a {
                display:block;
                background:none;
            }
        }
    }
}
</style>