<template>
<el-container>
  <div :ref="graphDrop" style="flex: 1">
    <Graph :id="id" :width="size.width" :height="size.height" :top="1" :left="10"/>
  </div>
</el-container>
</template>
<script setup lang="ts">

import { v4 as uuidv4 } from 'uuid';
import {generateGraphStore} from "../stores";
import Graph from "../components/vueplotly/Graph.vue";
import {onMounted, onUnmounted, reactive, ref, render} from "vue";
import { useDrop } from 'vue3-dnd'

const id=uuidv4();
const dataFormat=(date:Date)=>{
  let year = date.getFullYear().toString();
  let month = (date.getMonth() + 1).toString().padStart(2, '0');
  let day = date.getDate().toString().padStart(2, '0');
  // 格式化日期为 "YYYY-MM-DD" 格式
  return`${year}-${month}-${day}`;
}




const graphStore=generateGraphStore(id);

graphStore.setUrl("heatMap");
const timeframe_list=[]
const currentYear=new Date().getFullYear()
for(let i=2004;i<currentYear;i++){
  const end = new Date()
  const start = new Date()
  start.setFullYear(i,0,1)
  if(i+1!==currentYear){
    end.setFullYear(i+1,0,1)
  }
  timeframe_list.push([dataFormat(start),dataFormat(end)]);
}
const  kw_list=["new","novel"];
const  title="new vs novel";
graphStore.setParam({timeframe_list,kw_list,title});
graphStore.requestFigure();


//定义放置层
const [collectedProps, graphDrop] = useDrop(() => ({
  accept: ['BOX'],
  collect: (monitor) => ({ isOver: monitor.isOver( {shallow: true })}) ,
  drop(item, monitor) {
    const delta = monitor.getDifferenceFromInitialOffset() as {
      x: number
      y: number
    }
    moveGd(item.id, delta)
    return undefined
  }
}))
const moveGd = (id: string, delta:{x: number, y: number}) => {
  let position=generateGraphStore(id).viewState.position
  let left = Math.round(position.left + delta.x)
  let top = Math.round(position.top + delta.y)
  Object.assign(position, { left, top })
}

const size=reactive({width:0,height:0})
// 生命周期
onMounted(()=>{
  // 获取容器元素
  const container = ref(null);
  // 获取容器的大小
  size.width= container.value?.offsetWidth;
  size.height = container.value?.offsetHeight;
})
onUnmounted(()=>{})



</script>

<style scoped>
.hover{
  background: #00bd7e;
}

</style>