<template>
  <el-card v-show="menuVisit"
           :style="{
                    position: 'fixed',
                     zIndex: 2001,
                    transform: `translate3d(${compute_left}px, ${compute_top}px, 0)`
                    }"
           body-style="display:flex;flex-direction:column"
           class="right-click-menu"
  >
    <template #default>
      <el-space
          :fill="true"
          :size="0"
          :spacer="spacer"
          direction="vertical"
      >
        <slot></slot>
      </el-space>
    </template>
  </el-card>
</template>

<script lang="ts" setup>

import {computed, h, onMounted, watch} from "vue";
import {ElDivider} from "element-plus";

const props = defineProps<{
  menuVisit: boolean,
  top:number,
  left:number
}>();
const emits = defineEmits<{
  (e: 'RightMenuClick', index: number): void,
  (e: 'update:menuVisit', newValue: boolean)
}
>()
// TODO 右键菜单位置计算，实现菜单整个在屏幕内
const compute_top=computed(()=>{
  return props.top
})
const compute_left=computed(()=>{
  return props.left
})
const menuVisit = computed({
  get() {
    return props.menuVisit;
  },
  set(newValue) {
    emits('update:menuVisit', newValue);
  }
})
const spacer = h(ElDivider, {direction: 'horizontal'})
const handleClick = (index) => {
  emits("RightMenuClick", index)
}
const handelAllPageClick = (event) => {
  document.removeEventListener("click",handelAllPageClick,)
  document.removeEventListener("contextmenu",handelAllPageClick,)
  menuVisit.value=false;
}
watch(menuVisit,()=>{
  if(menuVisit.value){
    document.addEventListener("click",handelAllPageClick,{once:true})
    document.addEventListener("contextmenu",handelAllPageClick,{once:true})
  }
})
</script>

<style scoped>

</style>