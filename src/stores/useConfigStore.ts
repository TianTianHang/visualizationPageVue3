import {defineStore} from "pinia";
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
import en from 'element-plus/dist/locale/en.mjs'
import myzhch from "../language/zh-ch";
import myen from "../language/en"


export const useConfigStore = defineStore("configStore", {
    state: () => ({
        langIndex: 0,
        LangArray: [zhCn, en],
        myLangArray: [myzhch, myen]
    }),
    getters: {
        locale: (state) => (state.LangArray[state.langIndex]),

        myLocal: (state) => (state.myLangArray[state.langIndex])
    },
    actions: {
        changeLanguage(index:number) {
            this.langIndex = index
        }
    }

})