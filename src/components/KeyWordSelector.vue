<template>
  <div>
  <el-row>
    <el-col v-for="kw in kw_list" :span="4">
      <el-tag
          :key="kw"
          closable
          @close="handleTagClose(kw)">
        {{ kw }}
      </el-tag>
    </el-col>
    <el-col>
    <el-select v-model="kw_list"
               allow-create
               collapse-tags
               filterable
               multiple>
      <el-option
          v-for="item in keyWordsStore.concatedKeyWords"
          :key="item"
          :label="item"
          :value="item">
      </el-option>
    </el-select>
    </el-col>
  </el-row>
</div>
</template>

<script lang="ts" setup>
import {onMounted, toRef} from "vue";
import {generateGraphStore, keyWordsStore} from "../stores";

const props=defineProps<{
 id:string,
}>()
const graphStore=generateGraphStore(props.id)
const kw_list =toRef(graphStore.params,"kw_list");
const handleTagClose = (tag: string) => {
        graphStore.deleteKeyWordList(tag)
}
onMounted(() => {

})
</script>

<style scoped>


</style>