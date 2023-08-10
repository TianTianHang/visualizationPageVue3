<script setup lang="ts">
import { getWordDataApi } from "@/api/word"
import { ref, watch } from "vue"

const props = defineProps<{
  word_text: string
}>()
const loading = ref(false)
const word_detail = ref<string | null>(null)
watch(
  () => props.word_text,
  () => {
    loading.value = true
    getWordDataApi({ word_text_or_id: props.word_text })
      .then((res) => {
        const { data } = res
        word_detail.value = data.word_details
      })
      .finally(() => {
        loading.value = false
      })
  }
)
</script>

<template>
  <el-card>
    <template #header>
      <span>{{ word_text }}</span>
    </template>
    <template #default>
      <div v-loading="loading">
        {{ word_detail }}
      </div>
    </template>
  </el-card>
</template>

<style scoped lang="scss"></style>
