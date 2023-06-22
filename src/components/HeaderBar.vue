<template>
  <el-menu
      mode="horizontal"
      popper-effect="light"
      :ellipsis="false"
  >
      <el-menu-item index="0">
        <h2>{{ staticString.title }}</h2>
      </el-menu-item>
      <el-menu-item index="1">
        <router-link to="/">{{ staticString.router[0] }}</router-link>
      </el-menu-item>
      <div class="flex-grow" />
      <el-sub-menu index="2">
        <template #title>{{staticString.changeLang.selected}}</template>
          <el-menu-item  v-for="(lang,index) in staticString.changeLang.langs"
                         :index="`1-${index}`"
                         @click="handleLangeChange(index as number)"
          >
            {{ lang }}
          </el-menu-item>
      </el-sub-menu>
      <el-menu-item index="3" @click="handleAddGraph()">
        <div>
          <el-icon><Plus/></el-icon>
        </div>
     </el-menu-item>
  </el-menu>
</template>

<script setup lang="ts">
import {configStore} from "../stores";
import {computed, h, render} from "vue";
import {Plus} from "@element-plus/icons-vue";
import Graph from "./vueplotly/Graph.vue";
import {v4} from "uuid";
import SetDialog from "./vueplotly/SettingDialog.vue";
const staticString=computed(()=>{
    return configStore.myLocal.el.HeaderBar;
})
const handleLangeChange=(index:number)=>{
  configStore.changeLanguage(index);
}
const handleAddGraph = () => {
  const id= "plotly"+ v4()
  const g=h(Graph,{height:400,width:400,id:id});
  render(g,document.getElementById("dgContainer1"));
  g.component.exposed.setDrActive(true);
  g.component.exposed.setStateOfDialog(true);
}
</script>

<style scoped>
.flex-grow {
    flex-grow: 1;
}
</style>