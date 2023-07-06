<template>
    <w-button
          :class="class"
          color="#fff"
          @click="openDrawer = true"
          outline>
          <i class="material-icons">{{icon}}</i>
    </w-button>
    <w-drawer
    v-model="openDrawer"
    :tag="tag"
    :height="height"
    :[position]="true">
    <w-button
        @click="openDrawer = false"
        sm
        outline
        round
        absolute
        icon="wi-cross">
    </w-button>
    <slot />
    </w-drawer>
</template>
<script>
export default {
  name: "Slider",
  props:['position', 'open', 'tag', 'icon', 'height', 'class' ],
  data() {
    return {
      openDrawer: false
    }
  }
}
</script>
<style lang="scss">
.search {
    
}
</style>