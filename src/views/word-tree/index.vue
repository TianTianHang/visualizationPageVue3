<script setup lang="ts">
import { useFetchSelect } from "@/hooks/useFetchSelect"
import { getWordListDataApi } from "@/api/word"
import { GetWordData } from "@/api/word/types/word"
import Post from "@/views/word-tree/components/Post.vue"
defineOptions({
  name: "WordTree"
})

const { loading, options, value } = useFetchSelect<GetWordData>({
  api: getWordListDataApi
})
</script>

<template>
  <el-select :loading="loading" v-model="value" filterable>
    <el-option
      v-for="(item, index) in options"
      :label="item.word_text"
      :value="item.word_text"
      :key="index"
      placeholder="请选择"
    >
      <span style="float: left">{{ item.word_text }}</span>
      <span style="float: right; color: var(--el-text-color-secondary); font-size: 13px">{{ item.word_category }}</span>
    </el-option>
    <Post :word_text="value" />
  </el-select>
</template>

<style scoped lang="scss"></style>
