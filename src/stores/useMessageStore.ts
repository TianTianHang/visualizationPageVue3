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
        showMessage(type, message) {
            ElMessage({ type, message, grouping: true });
        },
        showMessageById(id:string){
            let e=this.MessageMap[id]
            this.showMessage(e.type,e.message);
        },
        showSuccessMessage(message) {
            this.showMessage("success", message);
        },
        showWarningMessage(message) {
            this.showMessage("warning", message);
        },
        showErrorMessage(message) {
            this.showMessage("error", message);
        },
        showInfoMessage(message) {
            this.showMessage("info", message);
        }
    }
})
