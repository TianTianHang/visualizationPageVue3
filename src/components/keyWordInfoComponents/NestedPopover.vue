<template>
    <div v-for="item  in props.items">
    <el-popover
            placement="bottom-start"
            :title="item.title"
            :width="200"
            trigger="click"
            v-model:visible="visible"
    >
        <template #reference>
            <el-button :icon="ArrowRight" round size="small"></el-button>
        </template>
        <div>
            {{item.content}}
        </div>
        <el-row>
            <el-col :span="6">
                <el-button @click="()=>visible=false" round size="small">close</el-button>
            </el-col>
            <el-col :span="6" :push="5">
                <el-button :icon="Minus" v-if="!item.children" disabled round size="small"></el-button>
                <NestedPopover v-else :items="item.children"/>
            </el-col>
        </el-row>
    </el-popover>
    </div>
</template>
<script setup lang="ts">
import {ref} from "vue";
import {ArrowRight, Minus} from "@element-plus/icons-vue";
import {KeyWordMoreInfo} from "../../stores/useKeyWordsStore";

const props=defineProps<{
    items:KeyWordMoreInfo[]
}>()
const visible=ref(false);
const hasChild=()=>{}
</script>