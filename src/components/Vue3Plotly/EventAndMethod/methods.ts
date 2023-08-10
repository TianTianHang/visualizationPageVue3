import Plotly from "plotly.js-dist-min"
interface FunctionMap {
  [functionName: string]: (...args: any[]) => void
}
const plotlyFunctions: string[] = [
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

const methods: FunctionMap = plotlyFunctions.reduce((all: FunctionMap, functionName) => {
  // @ts-ignore
  const func = Plotly[functionName]
  if (typeof func === "function") {
    all[functionName] = function (...args: any[]) {
      return func(this.$el, ...args)
    }
  }
  return all
}, {})
export default methods
