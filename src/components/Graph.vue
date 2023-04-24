<template>

    <el-row>
        <el-col :span="4">
            <el-select v-model="traceGroupName" v-if="kw_list.length!=0">
                <el-option
                        v-for="kw in kw_list"
                        :label="kw"
                        :value="kw"
                />
            </el-select>
        </el-col>
        <el-col :push="15" :span="4">
            <el-button-group>
                <SetDialog :id="id"/>
                <HistoryDrawer :id="id" @update:historyGraph="historyGraph"/>
            </el-button-group>
        </el-col>
    </el-row>
    <el-row justify="center">
        <VuePlotly :data="selectedTrace"
                :layout="layout"
                :frames="frames"
                :id="id"
                v-if="ok"
                ref="vuePlotly"/>
        <el-empty description="description" v-else>
            <el-button @click="generateGraph">生成</el-button>
        </el-empty>
    </el-row>
  <el-row v-if="sliderRange>1 && ok">
      <el-col :span="1">
          <el-button :icon="CaretRight" circle @click="showAnimate(true,animateTimeout)"></el-button>
      </el-col>
      <el-col :span="20" :push="1">
      <el-slider v-model="sliderValue"
                 :marks="marks"
                 :min="0"
                 :max="sliderRange-1"
                 :format-tooltip="val =>{return `${sliderTime[0]} To ${sliderTime[1]}`}"
                 tooltip-class="sliderTooltip"
                 :show-stops="true"
      />
      </el-col>
  </el-row>





</template>

<script lang="ts" setup>
import {v4} from 'uuid';
import {Plotly as VuePlotly} from "../../lib/vue3plotly/vue3-plotly.es.js"
import {computed, nextTick, onMounted, onUnmounted, ref, toRef, watch} from "vue";
import {configStore, generateGraphStore} from "../stores";
import {CaretRight} from "@element-plus/icons-vue";
import HistoryDrawer from "./HistoryDrawer.vue";
import SetDialog from "./SetDialog.vue";

const staticString=computed(()=>{
    return configStore.myLocal.el.Graph;
})
//关键字绑定
const traceGroupName=ref<string>('');
const selectedTrace=computed(()=>{return frames.value.filter((e)=>{
    return e.name===`(${traceGroupName.value})-(${sliderTime.value[0]} ${sliderTime.value[1]})`})[0].data});

const data=ref([]);
const layout=ref({});
const frames=ref([]);
const kw_list=ref([]);
const timeframe_list=ref<string[][]>([]);




const id="plotly"+v4();
const vuePlotly=ref(null);
const graphStore=generateGraphStore(id);

const ok=toRef(graphStore,"ok");
//滑块绑定值
const sliderValue=ref(0);
const sliderTime=computed(()=>{return timeframe_list.value[sliderValue.value]})
const sliderRange=computed(()=>{return timeframe_list.value.length})
const animateTimeout=ref(500);
const marks = computed(()=>{
    let t={};
    timeframe_list.value.forEach((val,index)=>{
        t[index]={
        style:{'font-size': `${100/sliderRange.value}%`,visibility:index===sliderValue.value?'visible':'hidden'},
        label: `${val[0]} To ${val[1]}`}
    });
    return t;
})

const showAnimate=(isFirst:boolean,timeout:number)=>{
    if(sliderValue.value<sliderRange.value){
        sliderValue.value+=1;
        nextTick().then(()=> {
            setTimeout(()=>showAnimate(false,timeout),timeout)
            }
        )
    }else if(isFirst){
        sliderValue.value=0;
        nextTick().then(()=> {
            setTimeout(()=>showAnimate(false,timeout),timeout)
            }
        )
    }
    return;
}
// const subscribe=graphStore.$subscribe((mutation,state)=>{
//   if (mutation.type==="patch function"){
//     graphStore.getFigure(id);
//   }
// })
function generateGraph(){
    data.value=graphStore.figureInfo.figure.data;
    layout.value=graphStore.figureInfo.figure.layout;
    frames.value=graphStore.figureInfo.figure.frames;
    kw_list.value=graphStore.figureInfo.option.param.kw_list;
    timeframe_list.value=graphStore.figureInfo.option.param.timeframe_list;
    traceGroupName.value=kw_list.value[0]
}
function historyGraph(fig){
    data.value=fig.figure.data;
    layout.value=fig.figure.layout;
    frames.value=fig.figure.frames;
    kw_list.value=fig.option.param.kw_list;
    timeframe_list.value=fig.option.param.timeframe_list;
    graphStore.setOk(true);
}
watch(ok,()=>{
    if(ok) {
      generateGraph();
    }
})

onMounted(() => {
  graphStore.requestFigure();
})
onUnmounted(()=>{
  graphStore.deleteFigure();
  //subscribe();
})

</script>

<style>
.sliderTooltip{
    width: max-content;
}
.el-slider__marks{
    width: 90%;
}
.el-slider__button-wrapper {
    transition: all v-bind(animateTimeout+'ms') ease;
}
.el-slider__bar{
    transition: all v-bind(animateTimeout+'ms') ease;
}


</style>