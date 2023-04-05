<template>
    <el-row>
        <el-col :span="12">
            <el-card class="box-card">
                <el-row>
                    <el-col :span="12">
                        <span>{{keyWordsStore.concatedKeyWord(props.item.word)}}</span>
                    </el-col>
                    <el-col :span="6" :push="5">
                        <el-button :icon="Minus" v-if="!props.item.children" disabled></el-button>
                        <NestedPopover v-else :items="props.item.children" />
                    </el-col>
                </el-row>
            </el-card>
        </el-col>
    </el-row>
</template>

<script setup lang="ts">
import NestedPopover from "./NestedPopover.vue";
import type {KeyWordMoreInfo} from "../../stores/useKeyWordsStore";
import {keyWordsStore} from "../../stores";
import {Minus} from "@element-plus/icons-vue";

const props=defineProps<{
    item:KeyWordMoreInfo
}>()

</script>
<style>
.box-card{
    width: 240px;
}
</style>