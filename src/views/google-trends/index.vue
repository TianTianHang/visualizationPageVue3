<script lang="ts" setup>
import { reactive, ref, watch } from "vue"
import { CascaderInstance, FormInstance, FormRules } from "element-plus"
import { DataFrame, GoogleTrendsCategory, GoogleTrendsRequestData } from "@/api/google-trends/types/google-trends"
// @ts-ignore
import gprops from "@/views/google-trends/assets/google-trends-gprops.json"
// @ts-ignore
import geos from "@/views/google-trends/assets/google-trends-geo.json"
// @ts-ignore
import timeframes from "@/views/google-trends/assets/google-trends-timeframe.json"
import Vue3Plotly from "@/components/Vue3Plotly/index.vue"
import { Plot, usePlotStore } from "@/store/modules/plot"
import { useGoogleTrendsStore } from "@/store/modules/google-trends"
import TopicsList from "@/views/google-trends/components/TopicsList.vue"
import QueryList from "@/views/google-trends/components/QueryList.vue"
import { LocationQueryRaw, useRoute, useRouter } from "vue-router"
import { useI18n } from "vue-i18n"
import { useFetchSelect } from "@/hooks/useFetchSelect"
import { getGoogleTrendsCategoriesApi } from "@/api/google-trends"
defineOptions({
  // 命名当前组件
  name: "GoogleTrends"
})

const { t } = useI18n()

const loading_over_time = ref(false)
const loading_region = ref(false)
const loading_topics = ref(false)
const loading_query = ref(false)
const cascaderRef = ref<CascaderInstance | null>(null)
const googleTrendsFormRef = ref<FormInstance | null>(null)
const googleTrendsFormData: GoogleTrendsRequestData = reactive({
  geo: "",
  cat: 0,
  date: "all",
  q: "",
  gprop: ""
})
const googleTrendsFormRules: FormRules = {
  keyword: [{ required: true, trigger: "blur" }]
}

const scatter_plot = ref<Plot | null>(null)
const choropleth_mapbox_plot = ref<Plot | null>(null)
const topics_data = ref<{ top?: DataFrame; rising?: DataFrame }>({})
const queries_data = ref<{ top?: DataFrame; rising?: DataFrame }>({})

const route = useRoute()
const router = useRouter()

watch(
  () => route.query,
  () => {
    cascaderRef.value?.togglePopperVisible(false)
    Object.assign(googleTrendsFormData, route.query)
    submit_google_trends_explore()
  }
)

const submit_google_trends_explore = () => {
  googleTrendsFormRef.value?.validate((valid: boolean, fields) => {
    if (valid) {
      loading_region.value = true
      loading_over_time.value = true

      const plotStore = usePlotStore()

      plotStore
        .create_choropleth_mapbox_plot(googleTrendsFormData)
        .then((plot) => {
          choropleth_mapbox_plot.value = plot
        })
        .catch((reason) => {
          console.log(reason)
        })
        .finally(() => {
          loading_region.value = false
        })

      plotStore
        .create_scatter_plot(googleTrendsFormData)
        .then((plot) => {
          scatter_plot.value = plot
        })
        .catch((reason) => {
          console.log(reason)
        })
        .finally(() => {
          loading_over_time.value = false
        })
      loading_topics.value = true
      loading_query.value = true

      const googleTrendsStore = useGoogleTrendsStore()

      googleTrendsStore
        .getTopicsData(googleTrendsFormData)
        .then((topics) => {
          topics_data.value = topics
        })
        .catch((reason) => {
          console.error(reason)
        })
        .finally(() => {
          loading_topics.value = false
        })

      googleTrendsStore
        .getQueriesData(googleTrendsFormData)
        .then((topics) => {
          queries_data.value = topics
        })
        .catch((reason) => {
          console.error(reason)
        })
        .finally(() => {
          loading_query.value = false
        })
    } else {
      console.error("表单校验不通过", fields)
    }
  })
}
const handle_google_trends_explore = () => {
  const queryData: LocationQueryRaw = Object.entries(googleTrendsFormData).reduce((res, [k, v]) => {
    if (v != "") {
      res[k] = v
    }
    return res
  }, {} as LocationQueryRaw)
  router.push({ path: "/trends/explore", query: queryData })
}
const { loading: loading_category, options: category } = useFetchSelect<GoogleTrendsCategory>({
  api: getGoogleTrendsCategoriesApi
})
</script>

<template>
  <div class="google-trends-container">
    <el-form
      ref="googleTrendsFormRef"
      :model="googleTrendsFormData"
      :rules="googleTrendsFormRules"
      @keyup.enter="handle_google_trends_explore"
    >
      <el-form-item prop="q">
        <el-input v-model="googleTrendsFormData.q" type="search" />
      </el-form-item>
      <el-card>
        <el-row :gutter="1">
          <el-col :span="6">
            <el-form-item prop="geo">
              <el-select v-model="googleTrendsFormData.geo" @change="handle_google_trends_explore">
                <el-option label="Worldwide" value="" />
                <el-option v-for="(geo, index) in geos" :key="index" :label="geo.geoName" :value="geo.geoCode" />
              </el-select>
            </el-form-item>
          </el-col>

          <el-col :span="6">
            <el-form-item prop="date">
              <el-select v-model="googleTrendsFormData.date" @change="handle_google_trends_explore">
                <el-option v-for="(timeframe, index) in timeframes" :key="index" v-bind="timeframe" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item prop="cat">
              <div v-loading="loading_category">
                <el-cascader
                  ref="cascaderRef"
                  v-model="googleTrendsFormData.cat"
                  :options="category"
                  :props="{
                    label: 'name',
                    value: 'id',
                    checkStrictly: true,
                    emitPath: false
                  }"
                  @change="handle_google_trends_explore"
                />
              </div>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item prop="gprop">
              <el-select v-model="googleTrendsFormData.gprop" @change="handle_google_trends_explore">
                <el-option v-for="(gprop, index) in gprops" :key="index" v-bind="gprop" />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
      </el-card>
    </el-form>
    <div class="plotly-container">
      <el-skeleton :loading="loading_over_time" :throttle="500" animated>
        <template #template />
        <template #default>
          <el-card v-if="scatter_plot?.data">
            <template #header>
              <span>{{ t("google_trends.overTime") }}</span>
            </template>
            <template #default>
              <Vue3Plotly id="plotly-over-time" :data="scatter_plot?.data" :layout="scatter_plot?.layout" />
            </template>
          </el-card>
        </template>
      </el-skeleton>
      <el-skeleton :loading="loading_region" :throttle="500" animated>
        <template #template />
        <template #default>
          <el-card v-if="choropleth_mapbox_plot?.data">
            <template #header>
              <span>{{ t("google_trends.region") }}</span>
            </template>
            <template #default>
              <Vue3Plotly
                id="plotly-region"
                :data="choropleth_mapbox_plot?.data"
                :layout="choropleth_mapbox_plot?.layout"
              />
            </template>
          </el-card>
        </template>
      </el-skeleton>
      <el-row>
        <el-col :span="12">
          <el-skeleton :loading="loading_topics" :throttle="500" animated>
            <template #template />
            <template #default>
              <TopicsList v-if="Object.keys(topics_data).length > 0" :data="topics_data" />
            </template>
          </el-skeleton>
        </el-col>
        <el-col :span="12">
          <el-skeleton :loading="loading_query" :throttle="500" animated>
            <template #template />
            <template #default>
              <QueryList v-if="Object.keys(queries_data).length > 0" :data="queries_data" />
            </template>
          </el-skeleton>
        </el-col>
      </el-row>
    </div>
  </div>
</template>
