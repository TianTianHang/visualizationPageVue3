import {defineStore} from 'pinia';
import {http} from "../http";


export const useKeyWordsStore=defineStore("keyWordsStore",{
    state:()=>({
       kw_list:<KeyWordMoreInfo[]>[] ,
    }),
    getters:{
        concatedKeyWords:(state)=>{
            return state.kw_list.map((e)=>e.word.pre_words+" "+e.word.post_words)
        },
        concatedKeyWord:(state)=>{
            return (e:{pre_words: string, post_words: string})=>{
                return e.pre_words+" "+e.post_words;
            }
        }
    },
    actions:{
        requestKeyWords(){
            http({method: 'get', url: 'kwList', param: null}).then(res => {
                this.kw_list = res
            })
        }
    }
})


interface KeyWordMoreInfo{
    word:{pre_words: string, post_words: string},
    title?:string,
    content?:string,
    img?:string,
    children:KeyWordMoreInfo[]
}
export type {KeyWordMoreInfo}