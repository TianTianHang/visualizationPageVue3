<script lang="ts" setup>
import { ref } from "vue"
import { useGoogleTrendsStore } from "@/store/modules/google-trends"

defineOptions({
  // 命名当前组件
  name: "GoogleTrends"
})
const loading = ref<boolean>(true)
const googleTrendsStore = useGoogleTrendsStore()
const googleTrendsData = ref<{ data: {}[]; keys: string[] }>({} as { data: {}[]; keys: string[] })
googleTrendsStore
  .getRegionData({ q: "new", date: "all_2008" })
  .then((res) => {
    googleTrendsData.value = res
  })
  .finally(() => {
    loading.value = false
  })
</script>

<template>
  <el-card v-loading="loading" shadow="never">
    <el-table :data="googleTrendsData.data" style="width: 100%">
      <el-table-column v-for="(key, index) in googleTrendsData.keys" :label="key" :prop="key" :key="index" />
    </el-table>
  </el-card>
</template>

<style lang="scss" scoped></style>
