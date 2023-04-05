<template>
    <Zoomable v-model:zoomed="zoomed">
    <el-row >
        <el-col  :span="1">
            <el-button :icon="FullScreen" @click="zoomed=!zoomed"></el-button>
        </el-col>
        <el-col :push="20" :span="1">
            <el-button :icon="Operation" @click="openDialog=true"></el-button>
        </el-col>
        <el-col :push="21" :span="1">
            <el-button :icon="Clock" @click="openDrawer=true"></el-button>
        </el-col>
    </el-row>
  <Plotly :data="figureInfo.data"
          :layout="figureInfo.layout"
          :frames="figureInfo.frames"
          :id="id"
  />

</Zoomable>

  <el-button @click="generateGraph">生成</el-button>


  <el-dialog v-model="openDialog" :title="staticString.dialogTitle" width="800px">
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

  <el-drawer
    :title="staticString.historyDrawer"
    v-model="openDrawer"
    direction="rtl"
  >
  <el-descriptions
          :column="1"
          v-for="fig in graphStore.figures" :title="fig.time.toLocaleDateString()+' '+fig.time.toLocaleTimeString()">
      <el-descriptions-item label="keyWord" >
          <span v-for="kw in fig.option.param.kw_list">{{kw}}&nbsp</span>
      </el-descriptions-item>
      <el-descriptions-item label="timeFrame" >
          <span v-for="tf in fig.option.param.timeframe_list">{{tf.start+" To "+tf.end}}&nbsp</span>
      </el-descriptions-item>
      <el-descriptions-item>
          <el-button :icon="Select" @click="figureInfo=fig.figure"></el-button>
      </el-descriptions-item>
  </el-descriptions>
  </el-drawer>

</template>

<script lang="ts" setup>
import { v4 } from 'uuid';
import {Plotly}  from "../../lib/vue3plotly/vue3-plotly.es.js"
import {onMounted, onUnmounted, ref, toRef} from "vue";
import {generateGraphStore} from "../stores";
import {Operation,Select,Clock,FullScreen} from "@element-plus/icons-vue";
import KeyWordSelector from "./KeyWordSelector.vue";
import TimeSelector from "./TimeSelector.vue";
import Zoomable from "./Zoomable.vue";

const staticString={
  keyWords:"关键词",
  timeFrame:"时间",
  dialogTitle:"设置",
  quit:"退出",
  submitOption:"应用",
    type:"类型",
    historyDrawer:"历史记录"
}


const refPlotly=ref(null);
const figureInfo=ref({});
const openDialog=ref(false);
const openDrawer=ref(false);
const zoomed=ref(false);
const activeName=ref("keyWords");
const id="plotly"+v4();
const graphStore=generateGraphStore(id);
const type=toRef(graphStore,"url");
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
  graphStore.requestFigure();
})
onUnmounted(()=>{
  graphStore.deleteFigure();
  //subscribe();
})

</script>

<style scoped>

</style>