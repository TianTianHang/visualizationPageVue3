

<template>
    <el-config-provider :locale="locale">
    <el-container>

        <el-header height="50px">
            <HeaderBar/>
        </el-header>

        <el-container>

            <el-aside width="240px">
                <key-words-tree />
            </el-aside>

            <el-main style="width: 740px;overflow: visible">
                <Graph/>
            </el-main>

            <el-aside style="overflow: unset" width="340px">
                <el-space
                    style="inset: 10px 50px auto auto"
                    direction="vertical"
                >

                        <Graph/>
                        <Graph/>

                </el-space>
            </el-aside>

        </el-container>

    </el-container>
        </el-config-provider>
</template>
<script lang="ts" setup xmlns="http://www.w3.org/1999/html">
import Graph from "./components/Graph.vue";
import KeyWordsInfo from "./components/keyWordInfoComponents/KeyWordsInfo.vue"
import HeaderBar from "./components/HeaderBar.vue";
import {configStore} from "./stores";
import {toRef} from "vue";
import KeyWordsTree from "./components/KeyWordsTree.vue";


const locale = toRef(configStore,"locale")


</script>

<style>

</style>
