<template>
  <span v-if="isUp" class="icon-color">
    <svg class="icon" aria-hidden="true">
      <use xlink:href="#icon-sort_desc"></use>
    </svg>
  </span>
  <span v-else class="icon-color">
    <svg class="icon" aria-hidden="true">
      <use xlink:href="#icon-sort_asc"></use>
    </svg>
  </span>
</template>
<script>
export default {
  props:{
    isUp:true,
  },
  data(){
    return{}
  }
};
</script>

