import {defineStore} from 'pinia';
import {http} from "../http";
import {keyWordsStore, messageStore} from "./index";
import {Ref} from "vue";


export const useKeyWordsStore = defineStore("keyWordsStore", {
    state: () => ({
        kw_tree: <KeyWordMoreInfo[]>[],
        treeRef:<Ref>null,
        handleMethod:<string>null,
        currentNode:<Node>null
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
                    // TODO error错误提示
                } else {
                    this.kw_tree=res['tree'];
                }
            })
        },
        requestKeyWord(id:string) {
            return http({method: 'get', url: 'kwList', param: {id:id}}).then(res => {
                if (res instanceof Error) {
                    // TODO error错误提示
                    return [res,null]
                } else {
                   return [null,res]
                }
            })
        },
        addKeyWord(data,parentNode) {
            if (this.contain(data,parentNode)) {
                messageStore.showMessageById("duplicateDataWarning")
                // @ts-ignore
                return Promise.resolve(false);
            } else {
                // 发送到后端数据库
                data.parent_id=parentNode.data.id
                return http({method: 'post', url: 'kwList', param: data}).then(res =>{
                    if (res instanceof Error) {
                        // TODO error错误提示
                        return false;
                    } else {
                        data.id=res['id']
                        return true;
                    }
                })
            }
        },
        contain(data,parentNode) {
            console.log(parentNode)
                return parentNode.childNodes.some((e) =>{
                    let words=data.word;
                            return  e.data.word.pre_words ===words.pre_words  &&
                                    e.data.word.post_words === words.post_words})
        },
        updateKeyWord(data){
            data.parent_id=this.currentNode.parent.data.id
            data.id=this.currentNode.data.id
            return http({method: 'put', url: 'kwList', param: data}).then(res =>{
                if (res instanceof Error || res['n']==0) {
                    // TODO error错误提示
                    return false;
                } else {
                    return true;
                }
            })
        },
        handleNewData(data){
            if(data.word!=null){
                const words=data.word.split(" ",2)
                data.word={};
                if(words.length==1){
                    data.word.pre_words=words[0];
                    data.word.post_words=null;
                }else if(words.length==2){
                    data.word.pre_words=words[0];
                    data.word.post_words=words[1];
                }
            }
            data.has_hover = data.content != null;
        },
        treeMethod(data){
            if(this.handleMethod==="append"){
                this.append(data);
            }
            else if(this.handleMethod==="insertBefore"){
                this.insertBefore(data);
            }
            else if(this.handleMethod==="insertAfter"){
                this.insertAfter(data);
            }
            else if(this.handleMethod==="remove"){
                this.remove();
            }
            else if(this.handleMethod==="updateKeyChildren"){
                this.updateKeyChildren(data);
            }
        },
        append(data){
            this.handleNewData(data);
            this.addKeyWord(data,this.currentNode.parent).then(rs=>{
                if(rs){
                    this.treeRef?.append(data,this.currentNode);
                }
            })

        },
        insertBefore(data){
            this.handleNewData(data);
            this.addKeyWord(data,this.currentNode.parent).then(rs=>{
                if(rs){
                    this.treeRef?.insertBefore(data,this.currentNode);
                }
            })


        },
        insertAfter(data){
            this.handleNewData(data);
            this.addKeyWord(data,this.currentNode).then(rs=>{
                if(rs){
                    this.treeRef?.insertAfter(data,this.currentNode);
                }
            })

        },
        remove(){
            const id=this.currentNode.data.id;
            http({method: 'delete', url: 'kwList', param: {id:id}}).then(res=>{
                if(res instanceof Error || res['n']==0){
                    // TODO error错误提示
                }else {
                    this.treeRef?.remove(this.currentNode);
                }
            })

        },
        updateKeyChildren(data){
            this.handleNewData(data);
            this.updateKeyWord(data).then(rs=>{
                if(rs){
                    // @ts-ignore
                    Object.assign(this.currentNode.data,data)
                }
            })

        }

    }
})


interface KeyWordMoreInfo {
    //word改用数组存储可能更好
    word?: { pre_words: string, post_words: string },
    title?: string,
    content?: string,
    id:number,
    has_hover:boolean,
    children?: KeyWordMoreInfo[]
}

export type {KeyWordMoreInfo}