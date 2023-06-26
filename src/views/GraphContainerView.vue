<template>
 <SimpleLayout/>
  <router-view ></router-view>
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