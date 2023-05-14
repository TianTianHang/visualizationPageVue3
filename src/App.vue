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
                    <el-main style="overflow: visible">
                        <DraggableContainer>
                            <Graph height="600" width="600"/>

                        </DraggableContainer>
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
import {DraggableContainer} from 'vue3-draggable-resizable'


const locale = toRef(configStore, "locale")
const zindex = ref(1);
const active = () => {
    zindex.value = 999;
}

</script>

<style>

.graphGroup{

    inset: 20px auto auto auto;
    display: flex;
    flex-direction: column;
    align-items: center;
}

</style>
