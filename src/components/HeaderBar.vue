<template>
  <el-menu
      mode="horizontal"
      popper-effect="light"
  >
    <el-menu-item index="1">first</el-menu-item>
    <el-sub-menu index="2">
      <template #title>second</template>
      <el-menu-item index="2-1">2-1</el-menu-item>
      <el-menu-item index="2-2">2-2</el-menu-item>
    </el-sub-menu>
  </el-menu>
</template>

<script setup>

</script>

<style scoped>

</style>