import { createI18n } from "vue-i18n"
import zhCn from "./zh-cn"
import en from "./en"
import { getCachedLanguage } from "@/utils/cache/local-storage"

// 创建 i18n
const i18n = createI18n({
  legacy: false,
  globalInjection: true, // 全局模式，可以直接使用 $t
  locale: getCachedLanguage() || "zhCn",
  messages: {
    zhCn,
    en
  }
})

console.log(i18n.allowComposition) // output is true
export default i18n
