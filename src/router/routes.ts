import Graph from "../components/Graph.vue";
import {h} from "vue";
import InfoFragments from "../components/InfoFragments.vue";
import {v4} from "uuid";
const gd= h("div",
    {id:"dgContainer1" ,style:"height: 100%;width: 100%;"},
    h(Graph,{height:300 ,width:400 ,id:"plotly"+ v4()}))
const infoPage=h(InfoFragments)
const routes = [
    { path: '/', components: {main:gd} },
    {path:'/wordinfo/:word(\\w)',
        name:"infoPage",
        components: {main:infoPage},
        props: {
        main:(route) => ({
                data: route.query.data
        })
    }
    }
]

export {routes}