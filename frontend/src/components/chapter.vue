<template>
  <div class="novelDetail px6">
  <Loader v-if="isLoading" />
  <w-breadcrumbs class="xs-hide mb0" :items="breadcrumbs" />
  <h1 style="display:none">{{product.title}}</h1>
  <div class="novel-content py6">
    <w-flex wrap>
      <div class="text-center item-detail xs12 lg12">
         <div class="item-content">
          <h2>{{product.title}}</h2>
          <div class="item-rating">
          <w-rating :model-value="rating" readonly
          v-model="setRating"
          class="my2"
          key="chapter"
          bg-color="grey"
          color="primary"
          ></w-rating>
          <div>{{setRating > 0 ? 'Your': 'Novel'}} Rating - {{setRating > 0 ? setRating : rating}} / 5</div>
            <!-- <i class="material-icons active" v-for="i of item.rating">star_rate</i>
            <i class="material-icons" v-for="i of (5-item.rating)">star_border</i> -->
          </div>
        </div>
          <w-flex>
    <w-button class="ma1" @click="incFontSize"><i class="material-icons">text_increase</i></w-button>
    <w-button class="ma1" @click="decFontSize"><i class="material-icons">text_decrease</i></w-button>
  </w-flex>
        <div  :style="{fontSize: fontSize + 'px'}" class="text-left main-content" v-html="prodContent" />
      </div>
    </w-flex>
  </div>
  <div class="buttonGroup">
  <w-flex class="justify-center wrap">
    <w-button class="ma2 py5 px10" :lg="true" bg-color="secondary" target="_blank" :route="'/novels/'+product.novel.slug+'/chapters/'+product.prev" v-if="product.prev"><span class="smu-hide">&lt; </span><span class="xs-hide">Previous</span></w-button>
    <w-button class="ma2 py5 px10" :lg="true" bg-color="secondary" :route="'/novels/'+product.novel.slug+'/chapters/'+product.next" v-if="product.next"><span class="smu-hide">&gt; </span><span class="xs-hide">Next</span></w-button>
  </w-flex>
  <w-button class="ma1 py5 scrolltoTop" :lg="true" bg-color="secondary" @click="scrolltoTop"><i class="material-icons">keyboard_arrow_up</i></w-button>
 
  </div>
  </div>
</template>
<script>
import NovelService from "../services/novelService";
import Loader from '../components/partials/loader.vue';

export default {
  name: "novelDetail",
  components: { Loader },
  setup () {
  },
  metaInfo() { //seo
    let title = this.product.title;
    let desc = '';
    if(this.product.novel.description){
      desc = this.truncate(this.product.novel.description, 100);
    }
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
  data() {
    return {
      isLoading: true,
      setRating: 0,
      breadcrumbs: [
        { label: 'Home', route: '/' }
      ],
      product: {
        title: '',
        novel: {
          description: ''
        }

      },
      rating: 0,
      fontSize: 16
    }
  },
  computed: {
    noProducts() {
      return this.product.length === 0;
    },
    prodContent() {
        let data =  this.product.content;
        // const arrayBuffer = new Uint8Array(data);
        // const blob  = new Blob([arrayBuffer], {type: "text/html"});

        // if(!data)
        //     return;
        // console.log(data)
        return data;
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
    },
    incFontSize(){
      if(this.fontSize < 30){
        this.fontSize++;
      }
    },
    decFontSize(){
      if(this.fontSize > 10) {
        this.fontSize--;
      }
    },
    scrolltoTop(){
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    }
  },
  async mounted(){
    let prod = await NovelService.getChapterBySlug(this.$route.params.slug,this.$route.params.chapter);
    this.isLoading = false
    if(prod) {
      this.product = prod;
      this.rating = prod.novel.rating;
      let desc = this.truncate(prod.novel.description, 100);
      console.log(desc)
      //update meta tags here
      this.breadcrumbs.push({ label: this.truncate(prod.novel.title, 25), route: '/novels/'+prod.novel.slug})
      this.breadcrumbs.push({ label: prod.title, route: '/novels'})
    }
  }
}
</script>
<style lang="scss">
.novelDetail{
  width: 100%;
  padding: 0 15px;
  .novel-content {
    max-width: 1080px;
    margin: auto;
  }
  .buttonGroup{
    button{
      min-width:140px;
    }

  .scrolltoTop{
    position:absolute;
    right:2em;
    bottom:2.5em;
    min-width:50px;
    i{ 
      font-size:2em;
    }
  }
  }
  .item-detail{
    .item-image{
      width:120px;
      height:auto;
      padding-right:20px;
    }
    .main-content{
        p{
            line-height: 1.2;
            padding: 7px 0;
        }
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
}
</style>