<template>
  <el-row :gutter="4" align="middle">
    <el-col v-for="tf in timeframe_list" :span="6">
      <el-tag :key="tf.id" closable @close="handleTagClose(tf.id)">
        {{ tf.start }} To {{ tf.end }}
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
          :disabled-date="(data:Date)=>data>new Date()"
      />
    </el-col>
    <el-col :offset="6" :span="6">
      <el-button @click="submitTimeFrame(timeframe)">提交</el-button>
    </el-col>
  </el-row>
</template>

<script lang="ts" setup>

import {ref, toRef} from "vue";
import {v4} from 'uuid';
import {generateGraphStore, messageStore} from "../stores";

const props=defineProps<{
    id:string,
}>()
const graphStore=generateGraphStore(props.id)
const timeframe_list = toRef(graphStore.params,"timeframe_list")
const timeframe = ref<string[]>([])
const submitTimeFrame = (timeframe: Array<string>) => {
    graphStore.changeTimeFrameList(new TimeFrame('timeframe-' + v4(), timeframe))
    messageStore.showMessage('timeFrameAddSuccess', 'zh-cn')
}



const handleTagClose = (id:string) => {
    graphStore.changeTimeFrameList(undefined,id)
    console.log(id)
}


class TimeFrame {
  id: string
  start: string
  end: string

  constructor(id: string, frame: Array<string>) {
    this.id = id;
    this.start = frame[0];
    this.end = frame[1];
  }
}
</script>

<style scoped>

.el-row {
  margin-bottom: 20px;
}
</style>