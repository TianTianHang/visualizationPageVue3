<template>
  <el-row :gutter="4" align="middle">
    <el-col v-for="tf in timeframe_list" :span="6">
      <el-tag :key="`${tf[0]} To ${tf[1]}`" closable @close="handleTagClose(tf)">
        {{ tf[0]}} To {{ tf[1] }}
      </el-tag>
    </el-col>
  </el-row>
  <el-row>
    <el-col :span="12">
      <el-date-picker
          v-model="timeframe"
          end-placeholder="End date"
          range-separator="To"
          size="default"
          start-placeholder="Start date"
          type="daterange"
          value-format="YYYY-MM-DD"
          unlink-panels
          :disabled-date="(data:Date)=>data>new Date()"
          :shortcuts="shortcuts"
          @change="submitTimeFrame"
      />
    </el-col>
    <el-col :offset="6" :span="6">
     <!--这里放一些预选项-->
    </el-col>
  </el-row>
</template>

<script lang="ts" setup>
import {configStore} from "../../stores";
const staticString=computed(()=>{
    return configStore.myLocal.el.TimeSelector;
})

import {computed, reactive, ref, toRef} from "vue";

import {generateGraphStore, messageStore} from "../../stores";

const props=defineProps<{
    id:string,
}>()
const graphStore=generateGraphStore(props.id)
const timeframe_list = toRef(graphStore.params,"timeframe_list")
const timeframe = ref<string[]>([])


const shortcuts =computed(()=>( [
    {
        text: staticString.value.text[0],
        value: () => {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24)
            return [start, end]
        },
    },
    {
        text: staticString.value.text[1],
        value: () => {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
            return [start, end]
        },
    },
    {
        text: staticString.value.text[2],
        value: () => {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
            return [start, end]
        },
    },
    {
        text: staticString.value.text[3],
        value: () => {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
            return [start, end]
        },
    },
    {
        text: staticString.value.text[4],
        value: () => {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 365)
            return [start, end]
        },
    },
    {
        text: staticString.value.text[5],
        value: () => {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 365 * 5)
            return [start, end]
        },
    },
    {
        text: staticString.value.text[6],
        value: () => {
            const end = new Date()
            const start = new Date()
            start.setFullYear(2004,0,1)
            return [start, end]
        },
    },
]))
const submitTimeFrame = () => {
    if(! timeframe_list.value.some((e)=>{return e.toString()===timeframe.value.toString()})){
        graphStore.addTimeFrame(timeframe.value);
    }else {
        messageStore.showWarningMessage("重复的日期!");
    }
}



const handleTagClose = (timeFrame:string[]) => {
    graphStore.deleteTimeFrame(timeFrame);
}



</script>

<style scoped>

el-row {
  margin-bottom: 20px;
}
</style>