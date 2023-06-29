import GraphContainerView from "../views/GraphContainerView.vue";
import SettingDialog from "../components/vueplotly/SettingDialog.vue";
import InformationView from "../views/InformationView.vue";
import Post from "../components/Post.vue"
const routes = [
    { path: '/',component: null},
    {
        path: '/containerView',component: GraphContainerView,children: [
            {
                path: ':id', name: 'settingDialog', component: SettingDialog,
                props: route => ({ plotlyId:<string> route.params.id,openSetting:Boolean(route.query.open)})
            }
        ]
    },
    {
        path: '/informationView', component: InformationView,
        children: [
            {
                path: ':id',name:'infoPage',component:Post
            }
        ]
    },
]

export {routes}