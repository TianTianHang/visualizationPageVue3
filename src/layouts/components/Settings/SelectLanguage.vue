<script setup lang="ts">
import { useI18n } from "vue-i18n"
import { setCachedLanguage } from "@/utils/cache/local-storage"
const { t, locale } = useI18n()
</script>

<template>
  <el-select v-model="locale" @change="setCachedLanguage(locale)">
    <el-option value="zhCn" :label="t('setting.languageSetting.zhCn')" />
    <el-option value="en" :label="t('setting.languageSetting.en')" />
  </el-select>
</template>

<style scoped lang="scss"></style>
