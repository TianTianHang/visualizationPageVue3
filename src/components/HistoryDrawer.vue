
<template>
    <el-button :icon="Clock" @click="openDrawer=true"></el-button>
    <el-drawer
            :title="staticString.title"
            v-model="openDrawer"
            direction="rtl"
    >
        <el-descriptions
                :column="1"
                v-for="fig in graphStore.figures"
                :title="fig.time.toLocaleDateString()+' '+fig.time.toLocaleTimeString()">
            <el-descriptions-item label="keyWord">
                <span v-for="kw in fig.option.param.kw_list">{{kw}}&nbsp</span>
            </el-descriptions-item>
            <el-descriptions-item label="timeFrame">
                <span v-for="tf in fig.option.param.timeframe_list">{{tf[0]+" To "+tf[1]}}&nbsp</span>
            </el-descriptions-item>
            <el-descriptions-item>
                <el-button :icon="Select" @click="handleClick(fig)"></el-button>
            </el-descriptions-item>
        </el-descriptions>
    </el-drawer>
</template>
<script setup lang="ts">
import {computed, ref} from "vue";
import {configStore, generateGraphStore} from "../stores";
import {Clock, Select} from "@element-plus/icons-vue";
const staticString=computed(()=>{
    return configStore.myLocal.el.HistoryDrawer;
})
const props=defineProps<{
    id:string,
}>();
const emits=defineEmits<{
    (e: 'update:historyGraph', historyGraph:{}): void
}>()
const graphStore=generateGraphStore(props.id);

const openDrawer=ref(false);
function handleClick(fig){
    emits("update:historyGraph",fig)
}
</script>