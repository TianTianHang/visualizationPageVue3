<template>
    <el-space direction="vertical">
<key-word-info-item  v-for="item in items" :item="item"></key-word-info-item>
  </el-space>
</template>

<script setup lang="ts">
import KeyWordInfoItem from "./KeyWordInfoItem.vue";
import {keyWordsStore} from "../../stores"
import {onMounted, toRef} from "vue";

const items=toRef(keyWordsStore,"kw_list")
onMounted(()=>{

})
</script>

<style scoped>

</style>