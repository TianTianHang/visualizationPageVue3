import { ref, onMounted, Ref } from "vue"

type OptionValue = string | number

/** 入参格式，暂时只需要传递 api 函数即可 */
interface FetchSelectProps<T> {
  api: () => Promise<ApiResponseData<T[]>>
}

export function useFetchSelect<T>(props: FetchSelectProps<T>) {
  const { api } = props
  const loading = ref<boolean>(false)
  const options = ref<T[]>([]) as Ref<T[]>
  const value = ref<OptionValue>("")

  /** 调用接口获取数据 */
  const loadData = () => {
    loading.value = true
    options.value = []
    api()
      .then((res) => {
        options.value = res.data
      })
      .finally(() => {
        loading.value = false
      })
  }

  onMounted(() => {
    loadData()
  })

  return {
    loading,
    options,
    value
  }
}
