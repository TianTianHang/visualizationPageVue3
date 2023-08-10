export interface CreateWordRequestData {
  word_text: string
  word_category: string
  word_details?: string
}

export interface UpdateWordRequestData {
  id: string
  word_text: string
  word_category: string
  word_details?: string
}
export interface GetWordListRequestData {
  /** 查询参数：category */
  word_category?: string
}

export interface GetWordRequestData {
  /** 查询参数：id 单词 */
  word_text_or_id?: string
}
export interface GetWordData {
  id: string
  word_text: string
  word_category: string
  word_details: string
}

export type GetWordListResponseData = ApiResponseData<GetWordData[]>
export type GetWordDataResponseData = ApiResponseData<GetWordData>
