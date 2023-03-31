import {defineStore} from 'pinia';
import {http} from "../http";
import {keyWordsStore, messageStore} from "./index";


export const useGraphStore = (id)=> {
    // @ts-ignore
    // @ts-ignore
    return defineStore(id, {
        state: () => ({
            figures: <{ time: Date, option: Option, figure: FigureInfo }[]>[],
            method: <"get" | "post" | "delete" | "put">'post',
            url: <string>"hotMap",
            params:<Params>{timeframe_list: [], kw_list: keyWordsStore.concatedKeyWords, title: "test"}
        }),
        getters: {
            option: (state) => {
                return {
                    method: state.method,
                    url: state.url,
                    param: state.params
                }
            },
            figure: (state) => {
                // @ts-ignore
                return state.figures.at(-1)
            },
        },
        actions: {
            requestFigure() {
                http(this.option)
                    .then(
                        res => {
                            this.figures.push({
                                time: new Date(), option: {
                                    method: this.option.method,
                                    url: this.option.url,
                                    param: this.option.param
                                }, figure: res
                            });
                            messageStore.showMessage('successFetchedData','zh-cn');
                        })
            },
            deleteFigure() {
                this.figures.splice(this.figures.indexOf((e) => e.time == this.figure.time), 1)
            },
            setParam(params:Params={timeframe_list:[],kw_list:[],title:"test"}) {
                this.params = params;
            },
            //param{timeframe?,id?}
            //只传timeframe向timeframe_list添加
            //只传id删除指定id的timeframe
            changeTimeFrameList(timeframe?:{ start: string, end: string, id: string },id?:string){
                if(timeframe){
                    this.params.timeframe_list.push(timeframe)
                }else if(id){
                    this.params.timeframe_list.splice(this.params.timeframe_list.indexOf((e)=> id == e.id), 1)
                }
            },
            addKeyWordList(kw:string){
                this.params.kw_list.push(kw)
            },
            deleteKeyWordList(kw:string){
                this.params.kw_list.splice(this.params.kw_list.indexOf(kw), 1)
            },
        }
    })
}

interface Option {
    method: "get" | "post" | "delete" | "put",
    url: string,
    param: { timeframe_list: { start: string, end: string }[], kw_list: string[], title: string }
}

interface FigureInfo {
    data?: [],
    layout?: {},
    frames?: []
    config?: {}
}
interface Params{
    timeframe_list: { start: string, end: string, id: string }[],
    kw_list: string[],
    title: string
}