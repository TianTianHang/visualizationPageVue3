interface EventMap {
  completeName: string
  handler: (...args: any[]) => any
}
const eventsName = [
  "AfterExport",
  "AfterPlot",
  "Animated",
  "AnimatingFrame",
  "AnimationInterrupted",
  "AutoSize",
  "BeforeExport",
  "ButtonClicked",
  "Click",
  "ClickAnnotation",
  "Deselect",
  "DoubleClick",
  "Framework",
  "Hover",
  "LegendClick",
  "LegendDoubleClick",
  "Relayout",
  "Restyle",
  "Redraw",
  "Selected",
  "Selecting",
  "SliderChange",
  "SliderEnd",
  "SliderStart",
  "Transitioning",
  "TransitionInterrupted",
  "Unhover"
]

const events: EventMap[] = eventsName
  .map((evt) => evt.toLocaleLowerCase())
  .map((eventName) => ({
    completeName: "plotly_" + eventName,
    handler:
      (context) =>
      (...args: any[]) => {
        context.$emit(eventName, ...args)
      }
  }))

export default events
