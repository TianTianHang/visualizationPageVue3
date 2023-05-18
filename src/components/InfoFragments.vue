<template>
  <el-space direction="vertical">
    <h1><slot name="title"></slot></h1>
    <h3 v-if="title">{{ title }}</h3>
    <el-image v-if="img" :src="img" ></el-image>
    <div>
      <span>{{ content }}</span>
    </div>
  </el-space>
</template>
<script setup lang="ts">
const {title,content,img}= window.history.state.data
</script>
<style scoped>

</style>