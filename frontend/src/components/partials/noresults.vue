<template>
 <div class="noresults my10">
  <w-flex class="green bd1 sorry-block pa2 mb5">
    <i class="material-icons" style="font-size:40px;">info</i> 
    <p class="pl4">sorry,we couldn't find any result matching <b class="red">"{{this.$route.query.q}}"</b></p> 
  </w-flex>
  <h3 class="mb3 px2 text-light">Search tips</h3>
  <div>
    <ul class="tips-block pl5">
      <li>check your spelling and try agin</li>
      <li>Try a similar but different search term ,like demon instead "{{this.$route.query.q}}"</li>
      <li>Keep your search term simple as your search facility works best with shorter descripitions</li>
      <li>Try looking within the geners shown below</li>
    </ul>
  </div>
 </div>

 
 

</template>
<script>
export default {
  name: "NoResults"
}
</script>
<style lang="scss">
.noresults{
  .sorry-block{
    border-color: green;
    border-left-width:0px;
    border-right-width:0px;
  }
  .tips-block{
    line-height: 1.5
  }
  
}
</style>