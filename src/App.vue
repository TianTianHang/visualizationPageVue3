<script lang="ts" setup xmlns="http://www.w3.org/1999/html">
import Graph from "./components/Graph.vue";
import KeyWordsInfo from "./components/keyWordInfoComponents/KeyWordsInfo.vue"

</script>


<template>
    <div>
        <el-container>
            <el-header>
            </el-header>
                <el-container>
                    <el-aside width="240px">
                        <KeyWordsInfo/>
                    </el-aside>
                    <el-main style="width: 840px;">
                        <Graph/>
                    </el-main>
                    <el-aside>
                        <el-row>
                            <el-col>

                            </el-col>
                            <el-col>

                            </el-col>
                        </el-row>
                    </el-aside>
                </el-container>
            <el-footer></el-footer>
        </el-container>
    </div>
</template>

<style>

</style>
