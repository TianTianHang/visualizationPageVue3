<template>
    <el-space direction="vertical">
        <h3 v-if="props.title">{{ props.title }}</h3>
        <el-image v-if="props.img" :src="props.img" ></el-image>
        <div>
            <span>{{ props.content }}</span>
        </div>
    </el-space>
</template>

<script lang="ts" setup>
import {ref} from "vue";
const props = defineProps<{
    title: string,
    content: string,
    img: string
}>();

</script>