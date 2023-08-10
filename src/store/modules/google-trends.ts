import { defineStore } from "pinia"
import { ref } from "vue"
import { DataFrame, GoogleTrendsRequestData } from "@/api/google-trends/types/google-trends"
import {
  getGoogleTrendsOverTimeApi,
  getGoogleTrendsQueriesApi,
  getGoogleTrendsRegionApi,
  getGoogleTrendsTopicsApi
} from "@/api/google-trends"
import store from "@/store"

export const useGoogleTrendsStore = defineStore("google-trends", () => {
  const regionData = ref<{ data: {}[]; keys: string[] }>({ data: [], keys: [] })
  const overTimeData = ref<{ data: {}[]; keys: string[] }>({ data: [], keys: [] })
  const topicsData = ref<{ top?: DataFrame; rising?: DataFrame }>()
  const queriesData = ref<{ top?: DataFrame; rising?: DataFrame }>()
  const getRegionData = async ({ q, date, ...args }: GoogleTrendsRequestData) => {
    const { data } = await getGoogleTrendsRegionApi({ q, date, ...args })
    // 请求到的数据进行缓存
    regionData.value = data
    return data
  }
  const getOverTimeData = async ({ q, date, ...args }: GoogleTrendsRequestData) => {
    const { data } = await getGoogleTrendsOverTimeApi({ q, date, ...args })
    // 请求到的数据进行缓存
    overTimeData.value = data
    return data
  }
  const getTopicsData = async ({ q, date, ...args }: GoogleTrendsRequestData) => {
    const { data } = await getGoogleTrendsTopicsApi({ q, date, ...args })
    // 请求到的数据进行缓存
    topicsData.value = data
    return data
  }
  const getQueriesData = async ({ q, date, ...args }: GoogleTrendsRequestData) => {
    const { data } = await getGoogleTrendsQueriesApi({ q, date, ...args })
    // 请求到的数据进行缓存
    queriesData.value = data
    return data
  }
  return {
    getRegionData,
    getOverTimeData,
    getTopicsData,
    getQueriesData,
    regionData,
    overTimeData,
    topicsData,
    queriesData
  }
})

/** 在 setup 外使用 */
export function useGoogleTrendsHook() {
  return useGoogleTrendsStore(store)
}
