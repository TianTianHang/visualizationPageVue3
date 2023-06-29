<template>
  <SimpleLayout/>
  <router-view style="visibility: hidden"/>
</template>
<script setup lang="ts">


import { onMounted, onUnmounted} from "vue";
import SimpleLayout from "./containerLayout/SimpleLayout.vue";
// 生命周期
onMounted(()=>{
})
onUnmounted(()=>{})



</script>

<style scoped>


</style>