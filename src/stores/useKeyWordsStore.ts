import {defineStore} from 'pinia';
import {http} from "../http";
import {messageStore} from "./index";
import {cloneDeep} from "lodash";


export const useKeyWordsStore = defineStore("keyWordsStore", {
    state: () => ({
        kw_tree: <KeyWordMoreInfo[]>[],
        id:<number>-1
    }),
    getters: {
        kw_list:(state)=>{
            if(state.kw_tree.length!=0){
                // @ts-ignore
                return state.kw_tree.reduce((a,b)=>{
                    return a.children.concat(b.children)
                })
        }else {
                return []
            }
    },
    },
    actions: {
        requestKeyWords() {
            http({method: 'get', url: 'kwList', param: null}).then(res => {
                if (res instanceof Error) {
                } else {
                    this.kw_tree=res['tree'];
                    this.id=res['nextId'];
                }
            })
        },
        addKeyWord(keyWord:KeyWordMoreInfo) {
            if (this.contain(keyWord)) {
                messageStore.showMessage("duplicateDataWarning")
            } else {
                let words=keyWord.word
                let index=this.kw_tree.indexof((e)=>e.pre_words===words.pre_words)
                this.kw_tree[index].push(keyWord)
            }
        },
        contain(keyWord: KeyWordMoreInfo) {
                return this.kw_tree.some((e) =>{e.some((v)=>{
                    let words=keyWord.word;
                            return  e.word.pre_words ===words.pre_words  &&
                                    e.word.post_words === words.post_words})})
        },
        nextId():number{
            this.id+=1
            return this.id
        }
    }
})


interface KeyWordMoreInfo {
    //word改用数组存储可能更好
    word?: { pre_words: string, post_words: string },
    title?: string,
    img?: string,
    content?: string,
    id:number,
    has_hover:boolean,
    children?: KeyWordMoreInfo[]
}

export type {KeyWordMoreInfo}