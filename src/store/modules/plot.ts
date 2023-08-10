import store from "@/store"
import { defineStore } from "pinia"
import * as Plotly from "plotly.js"
import { ref } from "vue"
import { useGoogleTrendsStore } from "@/store/modules/google-trends"
import { GoogleTrendsRequestData } from "@/api/google-trends/types/google-trends"
import { bingMapApi } from "@/api/bing-map"
import geojson from "@/ne_10m_admin_0_countries.json"
import { unpack } from "@/utils/records"

export interface Plot {
  data: Plotly.Data[]
  layout?: Partial<Plotly.Layout>
  config?: Plotly.Config
}
export const usePlotStore = defineStore("plot", () => {
  const _plot = ref<Plot | null>(null)
  const bing_map_urls = ref<string[] | null>(null)
  const googleTrendStore = useGoogleTrendsStore()

  const create_scatter_plot = async ({ q, date, ...args }: GoogleTrendsRequestData) => {
    const { data } = await googleTrendStore.getOverTimeData({ q, date, ...args })
    // 将时间戳转换为JavaScript日期对象
    data.forEach((entry) => {
      entry.time = new Date(entry.time)
    })

    // 根据时间字段对数据进行排序（如果数据没有按时间顺序排列的话）
    data.sort((a, b) => a.time - b.time)

    // 组织数据
    const trace: Plotly.Data = {
      x: unpack(data, "time"), // 使用时间作为x轴数据
      y: unpack(data, q), // 使用数值作为y轴数据
      type: "scatter",
      mode: "lines+markers",
      name: "折线图",
      line: {
        color: "blue",
        width: 2
      },
      marker: {
        color: "red",
        size: 8
      }
    }
    // 布局
    const layout = {
      xaxis: {
        title: "时间",
        showgrid: true,
        type: "date" // 告诉Plotly使用日期格式显示x轴
      },
      yaxis: {
        title: "数值",
        showgrid: true
      }
    }
    return { data: [trace], layout: layout } as Plot
  }
  const create_choropleth_mapbox_plot = async ({ q, date, ...args }: GoogleTrendsRequestData) => {
    const { data } = await googleTrendStore.getRegionData({ q, date, ...args })
    const trace = {
      type: "choroplethmapbox",
      locations: unpack(data, "geoCode"),
      z: unpack(data, q),
      geojson: geojson,
      featureidkey: "properties.ISO_A2"
    }
    let i = 0
    while (!bing_map_urls.value && i <= 10) {
      await getBingMapUrls()
      i += 1
    }
    const layout: Partial<Plotly.Layout> = {
      mapbox: {
        style: "white-bg",
        center: { lon: -74, lat: 43 },
        zoom: 3.5,
        layers: [
          {
            below: "traces",
            sourcetype: "raster",
            sourceattribution: "bing map",
            source: bing_map_urls
          }
        ]
      }
    }

    return { data: [trace], layout: layout } as Plot
  }
  const getBingMapUrls = async () => {
    const { data } = await bingMapApi()
    bing_map_urls.value = data
  }
  return { bing_map_urls, create_scatter_plot, getBingMapUrls, create_choropleth_mapbox_plot }
})

/** 在 setup 外使用 */
export function usePlotStoreHook() {
  return usePlotStore(store)
}
