import { request } from "@/utils/service"
import { BingMapResponseData } from "./types/bing-map"
/** 获取bing_map 最新的url */
export function bingMapApi() {
  return request<BingMapResponseData>({
    url: "/bingMap",
    method: "get"
  })
}
