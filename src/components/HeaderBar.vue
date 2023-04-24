<template>
  <el-menu
      mode="horizontal"
      popper-effect="light"
  >
      <el-menu-item index="0"><h2>{{ staticString.title }}</h2></el-menu-item>
      <div class="flex-grow" />
      <el-sub-menu index="1">
        <template #title>{{staticString.changeLang.selected}}</template>
          <el-menu-item  v-for="(lang,index) in staticString.changeLang.langs"
                         :index="`1-${index}`"
                         @click="handleMenuItemClick(index)"
          >{{ lang }}</el-menu-item>
      </el-sub-menu>
  </el-menu>
</template>

<script setup lang="ts">
import {configStore} from "../stores";
import {computed} from "vue";

const staticString=computed(()=>{
    return configStore.myLocal.el.HeaderBar;
})
const handleMenuItemClick=(index:number)=>{
  configStore.changeLanguage(index);
}
</script>

<style scoped>
.flex-grow {
    flex-grow: 1;
}
</style>