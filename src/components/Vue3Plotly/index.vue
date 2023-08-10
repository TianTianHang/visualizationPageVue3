<template>
  <div ref="rootRef" :id="id" />
</template>
<script lang="ts">
import Plotly from "plotly.js-dist-min"
import events from "./events"
import methods from "./methods"
import { camelize } from "./helper"
import { defineComponent, PropType } from "vue"

export default defineComponent({
  name: "Vue3Plotly",
  inheritAttrs: false,
  props: {
    data: Object as PropType<Plotly.Data[]>,
    layout: Object as PropType<Partial<Plotly.Layout>>,
    id: { type: String, required: true }
  },
  data(): {
    scheduled: { replot: boolean } | null
    innerLayout: Partial<Plotly.Layout>
  } {
    return {
      scheduled: null,
      innerLayout: { ...this.layout }
    }
  },
  computed: {
    options(): Partial<Plotly.Config> {
      const optionsFromAttrs = Object.keys(this.$attrs).reduce((acc, key) => {
        // @ts-ignore
        acc[camelize(key)] = this.$attrs[key]
        return acc
      }, {} as Partial<Plotly.Config>)
      return {
        responsive: false,
        ...optionsFromAttrs
      } as Partial<Plotly.Config>
    }
  },
  watch: {
    data: {
      handler() {
        this.schedule({ replot: true })
      },
      deep: true
    },
    options: {
      handler(value, old) {
        if (JSON.stringify(value) === JSON.stringify(old)) {
          return
        }
        this.schedule({ replot: true })
      },
      deep: true
    },
    layout(layout) {
      this.innerLayout = { ...layout }
      this.schedule({ replot: false })
    }
  },
  mounted() {
    Plotly.newPlot(this.$el, this.data || [], this.innerLayout, this.options)
    events.forEach((evt) => {
      this.$el.addEventListener(evt.completeName, evt.handler(this))
    })
  },
  beforeUnmount() {
    events.forEach((event) => this.$el.removeAllListeners(event.completeName))
    Plotly.purge(this.$el)
  },
  methods: {
    ...methods,
    onResize() {
      Plotly.Plots.resize(this.$el)
    },
    schedule(context: { replot: boolean }) {
      const { scheduled } = this
      if (scheduled) {
        scheduled.replot = scheduled.replot || context.replot
        return
      }
      this.scheduled = context
      this.$nextTick(() => {
        const { scheduled } = this
        const { replot } = scheduled as { replot: boolean }
        this.scheduled = null
        if (replot) {
          this.react()
          return
        }
        // @ts-ignore
        this.relayout(this.$el, this.innerLayout)
      })
    },
    toImage(options: Plotly.ToImgopts) {
      const allOptions = Object.assign(this.getPrintOptions(), options)
      return Plotly.toImage(this.$el, allOptions)
    },
    downloadImage(options: Plotly.DownloadImgopts) {
      const filename = `plot--${new Date().toISOString()}`
      const allOptions = Object.assign(this.getPrintOptions(), { filename }, options)
      return Plotly.downloadImage(this.$el, allOptions)
    },
    getPrintOptions() {
      const { $el } = this
      return {
        format: "png",
        width: $el.clientWidth,
        height: $el.clientHeight
      }
    },
    react() {
      Plotly.react(this.$el, this.data || [], this.innerLayout, this.options)
    }
  }
})
</script>
