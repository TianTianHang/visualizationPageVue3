import { request } from "@/utils/service"
import type * as Word from "./types/word"

/** 增 */
export function createWordDataApi(data: Word.CreateWordRequestData) {
  return request({
    url: "word",
    method: "post",
    data
  })
}

/** 删 */
export function deleteWordDataApi(id: string) {
  return request({
    url: `word/${id}`,
    method: "delete"
  })
}

/** 改 */
export function updateWordDataApi(data: Word.UpdateWordRequestData) {
  return request({
    url: "word",
    method: "put",
    data
  })
}

/** 查 */
export function getWordDataApi(params: Word.GetWordRequestData) {
  return request<Word.GetWordDataResponseData>({
    url: `word/${params.word_text_or_id}`,
    method: "get"
  })
}
/** 查列表 */
export function getWordListDataApi(params: Word.GetWordListRequestData = {}) {
  return request<Word.GetWordListResponseData>({
    url: "word-list",
    method: "get",
    params
  })
}
