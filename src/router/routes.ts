import Graph from "../components/vueplotly/Graph.vue";
import {h} from "vue";
import InfoFragments from "../components/InfoFragments.vue";
import {v4} from "uuid";
const gd= h("div",
    {id:"dgContainer1" ,style:"height: 100%;width: 100%;"},
    h(Graph,{height:300 ,width:400 ,id:"plotly"+ v4()}))

const routes = [
    { path: '/', components: {main:gd} },
]

export {routes}