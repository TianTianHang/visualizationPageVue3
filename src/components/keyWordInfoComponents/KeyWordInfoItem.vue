<template>
    <el-card class="box-card" >
        <el-row>
            <el-col :span="16">
                <span>{{ `${props.item.word.pre_words} ${props.item.word.post_words}` }}</span>
            </el-col>
            <el-col :push="4" :span="1">
                <el-button v-if="!props.item.children" :icon="Minus" disabled round size="small"></el-button>
                <NestedPopover v-else :items="props.item.children"/>
            </el-col>
        </el-row>
    </el-card>
</template>

<script lang="ts" setup>
import NestedPopover from "./NestedPopover.vue";
import type {KeyWordMoreInfo} from "../../stores/useKeyWordsStore";
import {keyWordsStore} from "../../stores";
import {Minus} from "@element-plus/icons-vue";

const props = defineProps<{
    item: KeyWordMoreInfo
}>()

</script>
<style>
.box-card > div{
    top:-6px;
}
</style>