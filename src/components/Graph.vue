<template>
    <div>
        <el-row>
            <el-col :span="4">
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
            </el-col>
            <el-col :push="16" :span="2">
                <el-space>
                    <SetDialog :id="id"/>
                    <HistoryDrawer :id="id" @update:historyGraph="historyGraph"/>
                </el-space>
            </el-col>
        </el-row>
        <div class="plotlyGraph">
            <el-row justify="center">
                <el-col>
                    <VuePlotly
                            v-if="ok"
                            :id="id"
                            ref="vuePlotly"
                            :data="selectedTrace"
                            :layout="layout"
                    />
                    <el-empty v-else description="description">
                        <el-button :icon="RefreshRight" size="large" @click="generateGraph"></el-button>
                    </el-empty>

                </el-col>
            </el-row>
            <el-row></el-row>
            <el-row v-if="sliderRange>1 && ok">
                <el-col :span="1">
                    <el-button :icon="CaretRight" circle @click="showAnimate(true,animateTimeout)"></el-button>
                </el-col>
                <el-col :push="1" :span="20">
                    <el-slider v-model="sliderValue"
                               :format-tooltip="val =>{return `${sliderTime[0]} To ${sliderTime[1]}`}"
                               :marks="marks"
                               :max="sliderRange-1"
                               :min="0"
                               :show-stops="true"
                               tooltip-class="sliderTooltip"
                    />
                </el-col>
            </el-row>
        </div>
    </div>


</template>

<script lang="ts" setup>
import {v4} from 'uuid';
import {Plotly as VuePlotly} from "../../lib/vue3plotly/vue3-plotly.es.js"
import {computed, nextTick, onMounted, onUnmounted, ref, toRef, watch} from "vue";
import {configStore, generateGraphStore} from "../stores";
import {CaretRight, RefreshRight} from "@element-plus/icons-vue";
import HistoryDrawer from "./HistoryDrawer.vue";
import SetDialog from "./SetDialog.vue";

const staticString = computed(() => {
    return configStore.myLocal.el.Graph;
})
const props = withDefaults(defineProps<{
    height?: string
}>(), {height: '100%'})
//关键字绑定
const traceGroupName = ref<string>('');
const selectedTrace = computed(() => {
    let filter_frame=frames.value.filter((e) => {
        return e.name === `${traceGroupName.value}-${sliderTime.value[0]} ${sliderTime.value[1]}`
    })
    if(filter_frame.length>0){
        return filter_frame[0].data;
    }else {
        return [];
    }
});


const layout = ref({});
const frames = ref([]);
const kw_list = ref([]);
const timeframe_list = ref<string[][]>([]);


const id = "plotly" + v4();
const vuePlotly = ref(null);
const graphStore = generateGraphStore(id);

const ok = toRef(graphStore, "ok");
//滑块绑定值
const sliderValue = ref(0);
const sliderTime = computed(() => {
    return timeframe_list.value[sliderValue.value]
})
const sliderRange = computed(() => {
    return timeframe_list.value.length
})
const animateTimeout = ref(500);
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

const showAnimate = (isFirst: boolean, timeout: number) => {
    if (sliderValue.value < sliderRange.value) {
        sliderValue.value += 1;
        nextTick().then(() => {
                setTimeout(() => showAnimate(false, timeout), timeout)
            }
        )
    } else if (isFirst) {
        sliderValue.value = 0;
        nextTick().then(() => {
                setTimeout(() => showAnimate(false, timeout), timeout)
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

watch(ok, () => {
    if (ok) {
        generateGraph();
    }
})

onMounted(() => {
})
onUnmounted(() => {
    graphStore.deleteFigure();
    //subscribe();
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

.plotlyGraph {
    height: v-bind(props ['height']);
}


</style>