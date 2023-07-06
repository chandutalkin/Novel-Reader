<template>
<div class="loader">
  <div class="content white">
    Loading....
    <!-- <i class="material-icons">refresh</i> -->
  </div>
</div>
</template>
<script>
export default {
  name: "Loader"
}
</script>
<style lang="scss">
.loader {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    z-index: 9;
    background: rgba(0,0,0,0.7);
    .content{
        text-align:center;
        font-size:40px;
        margin-top: 50%;
        transform: translateY(-50%);
    }
}
</style>