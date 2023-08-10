<script setup lang="ts">
import { ref } from "vue"
import { More, TrendCharts } from "@element-plus/icons-vue"

const visible = ref(false)
const emits = defineEmits(["explore"])
</script>
<template>
  <el-card class="list-item" shadow="never">
    <div class="list-item-content">
      <div class="label-line-number"><slot name="index" /></div>
      <div class="label-text"><slot /></div>
      <div class="rising-value"><slot name="number" /></div>
      <el-popover :visible="visible" placement="left-end" :width="160">
        <div style="width: 100%; margin: 0">
          <el-button
            size="default"
            text
            @click="
              () => {
                visible = false
                emits('explore')
              }
            "
          >
            <div>
              <el-icon><TrendCharts /></el-icon>
              <span> Explore </span>
            </div>
          </el-button>
        </div>
        <template #reference>
          <el-button @click="visible = !visible" :icon="More" text style="transform: rotate(0.25turn); float: right" />
        </template>
      </el-popover>
    </div>
  </el-card>
</template>

<style scoped lang="scss">
.list-item-content {
}
.rising-value {
  float: right;
  color: var(--el-text-color-secondary);
  font-size: 13px;
}
.label-line-number {
  float: left;
  width: 24px;
}
.label-text {
  float: left;
}
</style>
