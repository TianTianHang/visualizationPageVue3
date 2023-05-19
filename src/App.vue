<template>
    <el-config-provider :locale="locale">
        <el-container>
            <el-header height="50px">
                <HeaderBar/>
            </el-header>
            <el-container>
                <el-aside width="15%">
                    <key-words-tree/>
                </el-aside>
                <el-container>
                    <el-main style="overflow: visible" width="85%">
                        <router-view name="main"></router-view>
                    </el-main>
                </el-container>
            </el-container>
        </el-container>
    </el-config-provider>
</template>
<script lang="ts" setup xmlns="http://www.w3.org/1999/html">
import Graph from "./components/Graph.vue";
import HeaderBar from "./components/HeaderBar.vue";
import {configStore} from "./stores";
import {ref, toRef} from "vue";
import KeyWordsTree from "./components/KeyWordsTree.vue";
import {v4} from "uuid";


const locale = toRef(configStore, "locale")

</script>

<style>
</style>
