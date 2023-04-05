<template>
    <transition name="scale" ref="zoom">
        <div class="zoomAble"  :class="{ 'zoomed': zoomed }"
             :style="{transform: zoomed ? `scale(${scaleX},${scaleY})` : 'scale(1)'}">
            <slot></slot>
        </div>
    </transition>
</template>

<script lang="ts" setup>

import {onMounted, ref, watch} from "vue";
let originalWidth;
let originalHeight;
let scaleX=1;
let scaleY=1;
const zoom=ref(null)
const props=defineProps<{
    zoomed:boolean
}>()

const toggleZoom=()=>{
    // 获取组件的原始大小
    originalWidth = zoom.value.clientWidth;
    originalHeight = zoom.value.clientHeight;
    //获取屏幕大小
    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;
    // 计算放大倍数
    scaleX= screenWidth / originalWidth;
    scaleY= screenHeight / originalHeight;
}
onMounted(()=>toggleZoom())
</script>

<style scoped>
.zoomAble {

    position: relative;
    z-index: 10;
    transition: transform 0.5s ease-in-out;
}
.zoomAble.zoomed {
    position: fixed;
    z-index: 20;

    width: 100%;
    height: 100%;
}
.scale-enter-active, .scale-leave-active {
    transition: transform 0.5s ease-in-out;
}
.scale-enter, .scale-leave-to {
    transform: scale(0);
}
</style>