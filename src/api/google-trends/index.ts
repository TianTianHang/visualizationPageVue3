import { request } from "@/utils/service"
import type * as GoogleTrend from "@/api/google-trends/types/google-trends"

/** 获取查询到的数据 */
export function getGoogleTrendsRegionApi(requestData: GoogleTrend.GoogleTrendsRequestData) {
  return request<GoogleTrend.GoogleTrendsResponseData>({
    url: "/trends/region",
    method: "post",
    data: requestData
  })
}
export function getGoogleTrendsOverTimeApi(requestData: GoogleTrend.GoogleTrendsRequestData) {
  return request<GoogleTrend.GoogleTrendsResponseData>({
    url: "/trends/overTime",
    method: "post",
    data: requestData
  })
}
export function getGoogleTrendsTopicsApi(requestData: GoogleTrend.GoogleTrendsRequestData) {
  return request<GoogleTrend.GoogleTrendsTopRisingResponseData>({
    url: "/trends/topics",
    method: "post",
    data: requestData
  })
}
export function getGoogleTrendsQueriesApi(requestData: GoogleTrend.GoogleTrendsRequestData) {
  return request<GoogleTrend.GoogleTrendsTopRisingResponseData>({
    url: "/trends/queries",
    method: "post",
    data: requestData
  })
}
export function getGoogleTrendsCategoriesApi() {
  return request<GoogleTrend.GetCategoriesData>({
    url: "/trends/categories",
    method: "get"
  })
}
