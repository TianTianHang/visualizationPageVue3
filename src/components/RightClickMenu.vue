<template>
    <Teleport to="body">
        <el-card v-if="props.menuVisit" :style="`inset: ${props.mousePosition.mouseY}px auto auto ${props.mousePosition.mouseX+100}px;`"
                 body-style="display:flex;flex-direction:column"
                 class="right-click-menu"
        >
            <el-button-group v-for="(menuItem,index) in props.menuItems">
                <el-button text @click="handleClick(index)">{{ menuItem }}</el-button>
            </el-button-group>
        </el-card>
    </Teleport>
</template>

<script lang="ts" setup>

import {onMounted, ref} from "vue";

const props = defineProps<{
    menuVisit: boolean,
    mousePosition: { mouseX: number, mouseY: number },
    menuItems: string[]
}>();
const emits = defineEmits<{
    (e: 'RightMenuClick', index: number): void
}
>()
const handleClick = (index) => {
    emits("RightMenuClick", index)
}
</script>

<style scoped>
.right-click-menu {
    z-index: 2001;
    position: fixed;
}
</style>