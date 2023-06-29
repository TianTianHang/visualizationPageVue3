import {routes} from "./routes";
import {createRouter, createWebHashHistory} from "vue-router";

const router = createRouter({
    // 4. 内部提供了 history 模式的实现。为了简单起见，我们在这里使用 hash 模式。
    history: createWebHashHistory(),
    // @ts-ignore
    routes, // `routes: routes` 的缩写
    scrollBehavior(to, from, savedPosition) {
        // 始终滚动到顶部
        return { top: 0 }
    },
})
export {router}