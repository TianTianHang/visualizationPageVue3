<template>
    <Teleport to="body">
        <el-card v-if="props.menuVisit" :style="`inset: ${props.mousePosition.mouseY}px auto auto ${props.mousePosition.mouseX+100}px;`"
                 body-style="display:flex;flex-direction:column"
                 class="right-click-menu"
        >
            <el-space
                direction="vertical"
                :size="0"
                :spacer="spacer"
                :fill="true"
            >
                <el-button
                    v-for="(menuItem,index) in props.menuItems"
                    text @click="handleClick(index)"
                >
                    {{ menuItem }}
                </el-button>
            </el-space>
        </el-card>
    </Teleport>
</template>

<script lang="ts" setup>

import {h, onMounted, ref} from "vue";
import {ElDivider} from "element-plus";

const props = defineProps<{
    menuVisit: boolean,
    mousePosition: { mouseX: number, mouseY: number },
    menuItems: string[]
}>();
const emits = defineEmits<{
    (e: 'RightMenuClick', index: number): void
}
>()
const spacer = h(ElDivider, { direction: 'horizontal' })
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