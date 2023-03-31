import {defineStore} from 'pinia'
import {ElMessage} from "element-plus";
import MessageInfo from "./MessageInfo";

export const useMessageStore = defineStore('message', {
    state:()=>({
            MessageMap:MessageInfo
    }),
    actions:{
        showMessage(id:string,lang:'zh-cn'|'en'='zh-cn'){
            let e=this.MessageMap[id]
            ElMessage({type:e.type,message:e.message[lang],grouping: true})
        }
    }
})
