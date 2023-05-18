<template>

  <Vue3DraggableResizable
      :draggable="draggable"
      :active="drActive"
      :initH="props.height"
      :initW="props.width"
      :minH="300"
      :minW="400"
      :parent="true"
      @dblclick.prevent="()=>{draggable=true}"
      @deactivated="()=>{draggable=false}"
      @resize-end="resizeEndHandle"
  >
    <div>
      <div class="toolbar">
        <el-select v-if="kw_list.length>=1" v-model="traceGroupName">
          <el-option
              v-for="kw in kw_list"
              :label="kw"
              :value="kw"
          />
          <el-option v-if="graphStore.url!='hotMap'"
                     label="all"
                     value="all"
          />
        </el-select>
        <div class="flex-grow"/>
        <el-space>
          <SetDialog :id="id" ref="setDialog"/>
          <HistoryDrawer :id="id" @update:historyGraph="historyGraph" ref="historyDrawer"/>
        </el-space>
      </div>

      <div v-if="graphStore.ok" class="PlotlyGraph">
        <VuePlotly
            :id="id"
            ref="vuePlotly"
            :data="selectedTrace"
            :layout="layout"
        />
        <div v-if="sliderRange>1" class="PlaySlider">

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
  </Vue3DraggableResizable>

</template>

<script lang="ts" setup>
import {Plotly as VuePlotly} from "../../lib/vue3plotly/vue3-plotly.es.js"
import {computed, onMounted, onUnmounted, ref, toRef, watch} from "vue";
import {configStore, generateGraphStore} from "../stores";
import {RefreshRight, VideoPause, VideoPlay} from "@element-plus/icons-vue";
import HistoryDrawer from "./HistoryDrawer.vue";
import Vue3DraggableResizable from 'vue3-draggable-resizable'
import 'vue3-draggable-resizable/dist/Vue3DraggableResizable.css'

const staticString = computed(() => {
  return configStore.myLocal.el.Graph;
})
const props = withDefaults(defineProps<{
  height?: number,
  width?: number,
  layout?,
  frames?,
  id:string
}>(), {height: 350, width: 400, layout: {}, frames: []})
//关键字绑定
const traceGroupName = ref<string>('');
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
const layout = ref(props.layout)
const frames = ref(props.frames)
const kw_list = ref([]);
const timeframe_list = ref<string[][]>([]);
const draggable = ref(false)
const drActive = ref(false)

const vuePlotly = ref(null);
const graphStore = generateGraphStore(props.id);
//滑块绑定值
const sliderValue = ref(0);
const sliderTime = computed(() => {
  return timeframe_list.value[sliderValue.value]
})
const sliderRange = computed(() => {
  return timeframe_list.value.length
})
const animateTimeout = ref(500);
const timer = ref(null);
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

const resizeEndHandle = (x, y, w, h) => {
  if (vuePlotly.value != null) {
    vuePlotly.value.onResize()
  }
}

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
  kw_list.value = graphStore.figureInfo.option.param.kw_list;
  timeframe_list.value = graphStore.figureInfo.option.param.timeframe_list;
  traceGroupName.value = kw_list.value[0]
}

function historyGraph(fig) {
  layout.value = fig.figure.layout;
  frames.value = fig.figure.frames;
  kw_list.value = fig.option.param.kw_list;
  timeframe_list.value = fig.option.param.timeframe_list;
  graphStore.setOk(true);
}

const subscribe =graphStore.$subscribe((mutation, state)=>{
  if(state.ok){
    generateGraph();
  }
})

const setDialog=ref(null);
const setStateOfDialog = (e:boolean) => {
  setDialog.value.setOpenDialog(e)
}
const setDrActive = (e:boolean) => {
  drActive.value=e
}
defineExpose({setStateOfDialog,playChange, setDrActive})
onMounted(() => {
})
onUnmounted(() => {
  graphStore.deleteFigure();
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
}

.PlaySlider {
  display: flex;
  flex-direction: row;
}
</style>