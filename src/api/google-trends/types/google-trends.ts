export interface TimeFrame {
  /**ISO 8601 formatted date-time string, e.g., "2023-07-01T00:00:00"*/
  startTime: string
  /**ISO 8601 formatted date-time string, e.g., "2023-07-15T23:59:59"*/
  endTime: string
}
export interface DataFrame {
  /** 返回数据 */
  data: {
    [key: string]: any
  }[]
  /** 键名 */
  keys: string[]
}

export interface GoogleTrendsRequestData {
  /** 时间段 */
  date: TimeFrame | string
  /** 查询关键词 */
  q: string
  /** 查询类别 */
  cat?: number
  /** 查询国家 */
  geo?: string
  /** 查询范围 国家还是城市 */
  resolution?: string
  /** 查询数据来源 */
  gprop?: string
}
export interface GoogleTrendsCategory extends Record<string, unknown> {
  id: string
  name: string
  children: GoogleTrendsCategory[]
}

export type GoogleTrendsResponseData = ApiResponseData<DataFrame>
export type GoogleTrendsTopRisingResponseData = ApiResponseData<{
  top?: DataFrame
  rising?: DataFrame
}>
export type GetCategoriesData = ApiResponseData<GoogleTrendsCategory[]>
