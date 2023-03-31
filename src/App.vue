<script lang="ts" setup xmlns="http://www.w3.org/1999/html">
import Graph from "./components/Graph.vue";
import KeyWordsInfo from "./components/KeyWordsInfo.vue"
</script>


<template>
  <div>
      <el-container>
          <el-header></el-header>
          <div>
  <el-container>
    <el-aside width="240px">
        <KeyWordsInfo></KeyWordsInfo>
    </el-aside>
      <el-main style="width: 1000px;">
          <Graph/>
      </el-main>
      <el-aside>
      </el-aside>
  </el-container>
  </div>
          <el-footer></el-footer>
      </el-container>
  </div>
</template>

<style>

</style>
