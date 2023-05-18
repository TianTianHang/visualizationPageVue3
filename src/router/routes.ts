import {Plus} from "@element-plus/icons-vue";
import {DraggableContainer} from "vue3-draggable-resizable";
import Graph from "../components/Graph.vue";
import {h} from "vue";
import InfoFragments from "../components/InfoFragments.vue";
const gd= h(DraggableContainer,[h(Graph,{height:"300" ,width:"400" ,id:"'plotly'+ v4()"})])
const infoPage=h("div",[h(InfoFragments)])
const routes = [
    { path: '/', components: {main:gd,} },
    {path:'/:word(\\w)',name:"infoPage",components: {main:infoPage}}
]

export {routes}