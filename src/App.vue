<template>
  <DndProvider :backend="HTML5Backend">
    <el-config-provider :locale="locale">
        <el-container style="height: 100vh;">
            <el-header height="50px">
                <HeaderBar/>
            </el-header>
          <el-container>
            <router-view>
            </router-view>
          </el-container>
            <el-footer>
            </el-footer>
        </el-container>
    </el-config-provider>
  </DndProvider>
</template>
<script lang="ts" setup xmlns="http://www.w3.org/1999/html">
import HeaderBar from "./components/HeaderBar.vue";
import {configStore} from "./stores";
import {toRef} from "vue";
import {HTML5Backend} from "react-dnd-html5-backend";
import { DndProvider } from 'vue3-dnd'
const locale = toRef(configStore, "locale")

</script>

<style>
</style>
