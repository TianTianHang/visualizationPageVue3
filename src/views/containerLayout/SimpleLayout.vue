<template>
  <el-container>
  <el-main style="display: flex;flex-direction: column;">
    <div :ref="layers[0].ref" style="flex-grow: 1">
      <component :is="store.currentComponent(layers[0])"></component>
    </div>
  </el-main>
  <el-aside style="display: flex;flex-direction: column;"  width="40%">
    <div :ref="layers[1].ref" style="flex-grow: 1 ;background: #00bd7e" >
      <component :is="store.currentComponent(layers[1])"></component>
    </div>
    <div :ref="layers[2].ref" style="flex-grow: 1">
      <component :is="store.currentComponent(layers[2])"></component>
    </div>
  </el-aside>
  </el-container>
</template>
<script setup lang="ts">

import {onMounted, ref} from "vue";
import {containerViewStore} from "../../stores";


const store=containerViewStore;
//定义放置层
const layers=[{id:'1',ref:ref(null)},{id:'2',ref:ref(null)},{id:'3',ref:ref(null)}]
const layoutState={items:[],layers:layers,
  item2layer:{},layer2item:{}
};
for(let layer of layers){
  const [,graphDrop]=store.dropLayer(layer);
  graphDrop(layer.ref);
  layoutState.layer2item[layer.id]=null;
}
store.$patch(layoutState as any);
onMounted(()=>{

})




// test
// const id=uuidv4();
// const dataFormat=(date:Date)=>{
//   let year = date.getFullYear().toString();
//   let month = (date.getMonth() + 1).toString().padStart(2, '0');
//   let day = date.getDate().toString().padStart(2, '0');
//   // 格式化日期为 "YYYY-MM-DD" 格式
//   return`${year}-${month}-${day}`;
// }
//
// const graphStore=generateGraphStore(id);
//
// graphStore.setUrl("heatMap");
// const timeframe_list=[]
// const currentYear=new Date().getFullYear()
// for(let i=2004;i<currentYear;i++){
//   const end = new Date()
//   const start = new Date()
//   start.setFullYear(i,0,1)
//   if(i+1!==currentYear){
//     end.setFullYear(i+1,0,1)
//   }
//   timeframe_list.push([dataFormat(start),dataFormat(end)]);
// }
// const  kw_list=["new","novel"];
// const  title="new vs novel";
// graphStore.setParam({timeframe_list,kw_list,title});
// graphStore.requestFigure();
// store.layer2item['1']={id:id};
// store.item2layer[id]=store.layers[0];

</script>
<style scoped>

</style>