import {defineStore, getActivePinia} from 'pinia'
import {ElMessage} from "element-plus";
import {configStore} from "./index";


export const useMessageStore = defineStore('message', {
    state:()=>({
    }),
    getters:{
        MessageMap:(state)=>{
            if(getActivePinia){
                return configStore.myLocal.el.message
            }else {
                return null;
            }
        },
    },
    actions:{
        showMessage(id:string){
            let e=this.MessageMap[id]
            ElMessage({type:e.type,message:e.message,grouping: true})
        },
        showCusMessage(info:string,type:"success" | "warning" | "error" | "info"){
            ElMessage({type:type,message:info,grouping: true})
        }
    }
})
