
<template>
<el-aside>
  <KeyWordsTree/>
</el-aside>
<el-main>
  <router-view/>
</el-main>
</template>

<script setup>
import KeyWordsTree from "@/components/KeyWordsTree.vue";
import {keyWordsStore} from "@/stores";
//向后端请求keyWords
if(keyWordsStore.kw_tree.length===0){
  keyWordsStore.requestKeyWords()
}

</script>
<style scoped>

</style>