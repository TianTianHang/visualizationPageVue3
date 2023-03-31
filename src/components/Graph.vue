<template>
  <el-button :icon="Operation" @click="openDialog=true"></el-button>
  <VuePlotly :obj="figureInfo" ref="refPlotly"/>
  <el-button @click="generateGraph">生成</el-button>


  <el-dialog v-model="openDialog" :title="staticString.dialogTitle" width="1000px">
    <el-tabs v-model="activeName">
      <el-tab-pane name="keyWords" :label="staticString.keyWords">
        <KeyWordSelector :id="id"></KeyWordSelector>
      </el-tab-pane>
      <el-tab-pane name="timeFrame" :label="staticString.timeFrame">
        <TimeSelector :id="id"></TimeSelector>
      </el-tab-pane>
        <el-tab-pane name="type" :label="staticString.type">
            <div>
                <el-select v-model="type">
                    <el-option disabled value="">Please select one</el-option>
                    <el-option selected="selected" value="hotMap">热力图</el-option>
                    <el-option value="lineChart">折线图</el-option>
                </el-select>
            </div>
        </el-tab-pane>
    </el-tabs>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="openDialog = false">
          {{staticString.quit}}
        </el-button>
        <el-button type="primary" @click="()=>{graphStore.requestFigure();openDialog=false;}">
          {{staticString.submitOption}}
        </el-button>
      </span>
    </template>
  </el-dialog>

</template>

<script lang="ts" setup>
import {VuePlotly} from "vue3-plotly/dist/library.mjs";
import {onMounted, onUnmounted, ref, toRef} from "vue";
import {generateGraphStore} from "../stores";
import {Operation} from "@element-plus/icons-vue";
import KeyWordSelector from "./KeyWordSelector.vue";
import TimeSelector from "./TimeSelector.vue";

const staticString={
  keyWords:"关键词",
  timeFrame:"时间",
  dialogTitle:"设置",
  quit:"退出",
  submitOption:"应用",
    type:"类型"
}


const refPlotly=ref(null);
const figureInfo=ref(null);
const openDialog=ref(false);
const activeName=ref("keyWords");
let graphStore
let type
let id;

// const subscribe=graphStore.$subscribe((mutation,state)=>{
//   if (mutation.type==="patch function"){
//     graphStore.getFigure(id);
//   }
// })
function generateGraph(){
  figureInfo.value= graphStore.figure.figure;
  console.log(figureInfo);
}
onMounted(() => {
  id=refPlotly.value.$data.plotlyId;
  graphStore=generateGraphStore(id);
  type=toRef(graphStore,"url");
  graphStore.requestFigure();
})
onUnmounted(()=>{
  graphStore.deleteFigure();
  //subscribe();
})

</script>

<style scoped>

</style>