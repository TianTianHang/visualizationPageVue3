<template>
  <div class="drag-layer">
      <slot></slot>
  </div>
</template>

<script setup lang="ts">
import {useDragLayer } from 'vue3-dnd'
import {computed, ref, Ref, toRef, watch, watchEffect} from "vue";
import {generateGraphStore} from "../stores";


interface Item{ id: string, left: number|Ref<number>, top: number|Ref<number>,
  width:number|Ref<number>,height:number|Ref<number> }


// 维护当前存在元素的列表
const elements=ref(document.getElementsByClassName("graph-context"))
const items:Ref<Item[]>=computed(()=>{
  const items:Item[]=[];
  for(let e:Element in elements.value){
      let id=e.id;
      let store=generateGraphStore(id);
      let item={id:id,left:toRef(store.viewState.position,"left"),
                top:toRef(store.viewState.position,"top"),width:toRef(store.viewState.size,"width"),
                height:toRef(store.viewState.size,"height")}
      items.push(item);
  }
  return items
})
const update=()=>{elements.value=document.getElementsByClassName("graph-context");}


const collect = useDragLayer((monitor) => ({
  item: monitor.getItem(),
  itemType: monitor.getItemType(),
  initialOffset: monitor.getInitialSourceClientOffset(),
  currentOffset: monitor.getSourceClientOffset(),
  isDragging: monitor.isDragging(),
}))



watchEffect(() => {
  const {isDragging,item}=collect
  if(isDragging){
    const draggingItem=items.value.find((e)=>{return e.id===item})

  }
})

const getItemPosition = (item) => {
  const { left, top } = item
  const gridSize = 100 // Set the size of the grid for alignment
  const x = Math.round(left / gridSize) * gridSize
  const y = Math.round(top / gridSize) * gridSize

  return {
   left:x, top:y
  }
}

defineExpose({update})
</script>

<style scoped>
.drag-layer {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 100;
  pointer-events: none;
}

.drag-item {
  position: absolute;
  background-color: #f0f0f0;
  padding: 8px;
  border-radius: 4px;
  pointer-events: none;
}
</style>
