import Plotly from "plotly.js-dist-min"
import { getCurrentInstance } from "vue"
getCurrentInstance()
const plotlyFunctionList: string[] = [
  "restyle",
  "relayout",
  "update",
  "addTraces",
  "deleteTraces",
  "moveTraces",
  "extendTraces",
  "prependTraces",
  "purge"
]

type plotlyFunction = keyof typeof plotlyFunctionList
type FunctionMap = {
  [key in plotlyFunction]: (...args: any[]) => void
}

const methods: FunctionMap = plotlyFunctionList.reduce((all: FunctionMap, functionName) => {
  const func = Plotly[functionName as keyof typeof Plotly]
  all[functionName as keyof FunctionMap] = function (...args: any[]) {
    //@ts-ignore
    return func(this.$el, ...args)
  }
  return all
}, {} as FunctionMap)
export default methods
