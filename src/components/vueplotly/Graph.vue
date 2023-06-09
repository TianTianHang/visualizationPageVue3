<template>
  <div :style="{position: 'absolute',
                transform: `translate3d(${left}px, ${top}px, 0)`,
                overflow: 'hidden'
                }"
                class="graph-context"
                :ref="dragPreview"
  >
    <el-card>
      <template #header>
        <div class="toolbar" :ref="dragSource">
          <el-select v-if="kw_list.length>=1" v-model="traceGroupName">
            <el-option
                v-for="kw in kw_list"
                :label="kw"
                :value="kw"
            />
          </el-select>
          <div class="flex-grow"/>
          <el-space>
            <SettingDialog :plotlyId="plotlyId" ref="setDialog" v-model:open-setting="openSetting"/>
            <HistoryDrawer :plotlyId="plotlyId" ref="historyDrawer" @update:historyGraph="historyGraph"/>
          </el-space>
        </div>
      </template>
    <template #default>
      <div :style="{
                    width: `${width}px`,
                    height: `${height}px`,
                    resize: 'both',
                    overflow: 'hidden'
                    }"
           v-resize:debounce.100="onResize"
           >
      <div v-if="graphStore.ok" class="PlotlyGraph">
        <Vue3Plotly
            :id="plotlyId"
            ref="vuePlotly"
            :data="selectedTrace"
            :layout="layout"
        />
        <div v-if="sliderRange>1" class="PlaySlider" ref="sliderDiv">
          <el-space>
            <el-button :icon="VideoPlay" circle @click="playChange(true,animateTimeout)"></el-button>
            <el-button :icon="VideoPause" circle @click="playChange(false,animateTimeout)"></el-button>
          </el-space>
          <el-slider v-model="sliderValue"
                     :format-tooltip="val =>{return `${sliderTime[0]} To ${sliderTime[1]}`}"
                     :marks="marks"
                     :max="sliderRange-1"
                     :min="0"
                     :show-stops="true"
                     tooltip-class="sliderTooltip"
          />
        </div>
      </div>
      <el-empty v-else description="description">
        <el-button :icon="RefreshRight" size="large" @click="generateGraph"></el-button>
      </el-empty>
      </div>
    </template>
    </el-card>
  </div>
</template>

<script lang="ts" setup>
import {Plotly as Vue3Plotly} from "../../../lib/vue3plotly/vue3-plotly.es.js"
import {computed, h, onMounted, onUnmounted, ref, toRef, toRefs, watch, watchEffect,} from "vue";
import {configStore, generateGraphStore} from "../../stores";
import {RefreshRight, VideoPause, VideoPlay} from "@element-plus/icons-vue";
import HistoryDrawer from "./HistoryDrawer.vue";
import SettingDialog from "./SettingDialog.vue";
import { useDrag } from 'vue3-dnd'
import { resizeDirective as vResize } from 'v-resize-observer'


const staticString = computed(() => {
  return configStore.myLocal.el.Graph;
})
const props = withDefaults(defineProps<{
  h?: number,
  w?: number,
  plotlyId: string,
  l?: number
  t?: number
}>(), {})

const layout = ref();
const frames = ref([]);
const graphStore = generateGraphStore(props.plotlyId);

const left = toRef(graphStore?.viewState.position,"left");
const top = toRef(graphStore?.viewState.position,"top");
const width = toRef(graphStore?.viewState.size,"width");
const height = toRef(graphStore?.viewState.size,"height");
const onResize=(size, target)=> {
  let sliderH=0;
  if(sliderDiv.value!=null){
    sliderH=sliderDiv.value.offsetHeight;
  }
  const newSize={width:Math.round(size.width),height:Math.round(size.height-sliderH*1.2)}
  Object.assign(graphStore?.viewState.size, size)
  relayout(newSize);
}
const relayout=(newSize)=>{
  if(vuePlotly.value!=null){
    vuePlotly.value.relayout(newSize)
  }else {
    return;
  }
}
// 定义拖拽元素
const [, dragSource, dragPreview] = useDrag({
  type: 'BOX',
  item: { id: props.plotlyId},
  collect: (monitor) => ({ isDragging: monitor.isDragging() }),
})

//关键字绑定
const traceGroupName = ref(graphStore?.viewState.traceGroupName);



const selectedTrace = computed(() => {
  let filter_frame = frames.value.filter((e) => {
    return e.name === `${traceGroupName.value}-${sliderTime.value[0]} ${sliderTime.value[1]}`
  })
  if (filter_frame.length > 0) {
    return filter_frame[0].data;
  } else {
    return [];
  }
});

const kw_list = computed(() => {
  const groupsSet = new Set<string>();
  if (frames.value.length != 0) {
    frames.value.forEach(obj => {
      groupsSet.add(obj.group);
    });
    return Array.from(groupsSet).sort();
  } else {
    return [];
  }
});

const timeframe_list = ref<string[][]>([]);



const vuePlotly = ref(null);

//滑块绑定值
const sliderValue = toRef(graphStore?.viewState,"sliderValue");
const sliderTime = computed(() => {
  return timeframe_list.value[sliderValue.value]
})
const sliderRange = computed(() => {
  return timeframe_list.value.length
})

const marks = computed(() => {
  let t = {};
  timeframe_list.value.forEach((val, index) => {
    t[index] = {
      style: {
        'font-size': `${100 / sliderRange.value}%`,
        visibility: index === sliderValue.value ? 'visible' : 'hidden'
      },
      label: `${val[0]} To ${val[1]}`
    }
  });
  return t;
})

const sliderDiv=ref(null);

const animateTimeout = toRef(graphStore.viewState,"animateTimeout");
const timer = ref(null);
const playChange = (val, timeout) => {
  if (val) {
    if (timer.value) {
      clearInterval(timer.value);
    }
    timer.value = setInterval(() => {
      sliderValue.value += 1;
      if (sliderValue.value > sliderRange.value) {
        sliderValue.value = 0;
      }
    }, timeout);
  } else {
    clearInterval(timer.value);
  }
}

function generateGraph() {
  layout.value = graphStore.figureInfo.figure.layout;
  frames.value = graphStore.figureInfo.figure.frames;
  timeframe_list.value = graphStore.figureInfo.option.param.timeframe_list;
  traceGroupName.value = kw_list.value[0]
}

function historyGraph(fig) {
  layout.value = fig.figure.layout;
  frames.value = fig.figure.frames;
  timeframe_list.value = fig.option.param.timeframe_list;
  graphStore.setOk(true);
}

const subscribe = graphStore.$subscribe((mutation, state) => {
  if (state.ok) {
    generateGraph();
    relayout(graphStore.viewState.size);
  }
})


const setDialog = ref(null);
const openSetting = ref(false);

defineExpose({playChange})
onMounted(() => {
  if(props.h!=null){
    Object.assign(graphStore?.viewState.size, {height:props.h})
  }
  if(props.w!=null){
    Object.assign(graphStore?.viewState.size, {width:props.w})
  }
  if(props.l!=null){
    Object.assign(graphStore?.viewState.position, {left:props.l})
  }
  if(props.t!=null){
    Object.assign(graphStore?.viewState.position, {top:props.t})
  }
  if(graphStore.figureInfo!=null){
    generateGraph();
    // watch(vuePlotly,()=>{
    //   const size=graphStore.viewState.size;
    //   console.log(size)
    //   const newSize={width:Math.round(size.width*0.9),height:Math.round(size.height*0.75)}
    //   relayout(newSize);
    // })
  }
})

onUnmounted(() => {
  subscribe();
})

</script>

<style>
.sliderTooltip {
  width: max-content;
}

.el-slider__marks {
  width: 90%;
}

.el-slider__button-wrapper {
  transition: all v-bind(animateTimeout+ 'ms') ease;
}

.el-slider__bar {
  transition: all v-bind(animateTimeout+ 'ms') ease;
}

.PlotlyGraph {
  display: flex;
  justify-content: center;
  flex-direction: column;
}

.toolbar {
  display: flex;
  justify-content: space-between;
  cursor: move;
  height: 100%;
}

.PlaySlider {
  display: flex;
  flex-direction: row;
}
.graph-context{
  display: flex;
  flex-direction: column;
}
.el-card__header{
  height: 10%;
  padding: 4px 18px 18px 4px;
}
.el-card__body{
  height: 90%;
}
</style>