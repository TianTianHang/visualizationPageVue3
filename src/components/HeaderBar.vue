<template>
  <el-menu
      mode="horizontal"
      popper-effect="light"
      :ellipsis="false"
  >
      <el-menu-item index="title">
        <h2>{{ staticString.title }}</h2>
      </el-menu-item>
      <el-menu-item v-for="(value,key) in staticString.router" :index="'button'+key">
        <router-link :to="value.path">{{ value.text }}</router-link>
      </el-menu-item>
      <div class="flex-grow" />
      <el-sub-menu index="selecter">
        <template #title>{{staticString.changeLang.selected}}</template>
          <el-menu-item  v-for="(lang,index) in staticString.changeLang.langs"
                         :index="`1-${index}`"
                         @click="handleLangeChange(index as number)"
          >
            {{ lang }}
          </el-menu-item>
      </el-sub-menu>
      <el-menu-item index="add" @click="handleAddGraph()">
        <div>
          <el-icon><Plus/></el-icon>
        </div>
     </el-menu-item>
  </el-menu>
</template>

<script setup lang="ts">
import {configStore, containerViewStore, messageStore} from "../stores";
import {computed, h, inject, render, toRef} from "vue";
import {Plus} from "@element-plus/icons-vue";
import {v4} from "uuid";
import {useRouter} from "vue-router";

const staticString=computed(()=>{
    return configStore.myLocal.el.HeaderBar;
})

const router = useRouter()
const handleLangeChange=(index:number)=>{
  configStore.changeLanguage(index);
}
const handleAddGraph = () => {
  const id= "plotly"+ v4()
  const store=containerViewStore;
  for(let layer:any of store.layers){
    if(store.layer2item[layer.id]==null){
      store.layer2item[layer.id]={id:id};
      store.item2layer[id]=layer;
      router.push({ name: 'settingDialog', params: { id: id }, query: {open:true}})
      return;
    }
  }
  // 提示信息
  messageStore.showMessageById('noSpaceForItem');
  console.log("没有位置了！")
}
</script>

<style scoped>
.flex-grow {
    flex-grow: 1;
}
</style>