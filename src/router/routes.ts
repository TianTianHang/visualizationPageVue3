import GraphContainerView from "../views/GraphContainerView.vue";
import SettingDialog from "../components/vueplotly/SettingDialog.vue";
const routes = [
    { path: '/',component: null},
    {
        path: '/containerView', component: GraphContainerView,children: [
            {
                path: ':id', name: 'settingDialog', component: SettingDialog,
                props: route => ({ plotlyId:<string> route.params.id,openSetting:Boolean(route.query.open)})
            }
        ]
    },
]

export {routes}