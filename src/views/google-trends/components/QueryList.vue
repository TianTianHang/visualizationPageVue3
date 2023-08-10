<script setup lang="ts">
import { computed, ref } from "vue"
import { DataFrame } from "@/api/google-trends/types/google-trends"
import ListItem from "./ListItem.vue"
import { useRoute } from "vue-router"
import { useI18n } from "vue-i18n"

const props = defineProps<{
  data: {
    top?: DataFrame
    rising?: DataFrame
  }
}>()
const hasTopData = !!props.data?.top
const hasRisingData = !!props.data?.rising
const initialType = hasTopData ? "top" : hasRisingData ? "rising" : ""

const { t } = useI18n()
const selectedType = ref(initialType)
const currentPage = ref(1)
const pageSize = ref(5)
const handleTypeChange = () => {
  currentPage.value = 1
}
const handlePageChange = (newPage: number) => {
  currentPage.value = newPage
}
const handleSizeChange = (newSize: number) => {
  pageSize.value = newSize
  currentPage.value = 1
}
const displayedItems = computed(() => {
  const items = props.data?.[selectedType.value as "top" | "rising"]
  if (!items) {
    return []
  }

  const startIndex = (currentPage.value - 1) * pageSize.value
  return items.data.slice(startIndex, startIndex + pageSize.value)
})

const totalPage = computed(() => {
  return props.data[selectedType.value as "top" | "rising"]?.data.length || 0
})
const route = useRoute()

const handle_router_push = (query: string) => {
  route.query["q"] = query
}
</script>

<template>
  <el-card>
    <template #header>
      <el-row>
        <el-col :span="6">
          <span>{{ t("google_trends.queries") }}</span>
        </el-col>
        <el-col :push="10" :span="8">
          <el-select v-model="selectedType" @change="handleTypeChange">
            <el-option :label="t('google_trends.top')" value="top" />
            <el-option :label="t('google_trends.rising')" value="rising" />
          </el-select>
        </el-col>
      </el-row>
    </template>
    <template #default>
      <ListItem v-for="(item, index) in displayedItems" @explore="handle_router_push(item.query)" :key="index">
        <template #index>
          {{ index + (currentPage - 1) * pageSize + 1 }}
        </template>
        <template #default>
          {{ `${item.query}` }}
        </template>
        <template #number>
          {{ item.value }}
        </template>
      </ListItem>
      <el-pagination
        v-if="displayedItems.length > 0"
        :current-page="currentPage"
        :page-sizes="[5, 10]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="totalPage"
        @size-change="handleSizeChange"
        @current-change="handlePageChange"
      />
    </template>
  </el-card>
</template>

<style scoped lang="scss"></style>
