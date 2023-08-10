import Plotly from "plotly.js-dist-min"
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
  [key in keyof plotlyFunction]: (...args: any[]) => void
}

const methods: FunctionMap = plotlyFunctionList.reduce((all: FunctionMap, functionName) => {
  // @ts-ignore
  const func = Plotly[functionName]
  if (typeof func === "function") {
    all[functionName as keyof FunctionMap] = function (...args: any[]) {
      return func(this.$el, ...args)
    }
  }
  return all
}, {})
export default methods
