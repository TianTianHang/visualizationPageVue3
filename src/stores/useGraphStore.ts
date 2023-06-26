import {cloneDeep} from 'lodash';
import {defineStore} from 'pinia';
import {http} from "../http";
import { messageStore} from "./index";


export const useGraphStore = (id) => {
    // @ts-ignore
    return defineStore(id, {
        state: () => ({
            figures: <{ time: Date, option: Option, figure: FigureInfo }[]>[],
            url: <string>"heatMap",
            params: <Params>{timeframe_list: [], kw_list: [], title: ""},
            ok: <boolean>false,
            viewState:<{traceGroupName:string,sliderValue:number,
                position:{left:number,top:number},size:{width:number,height:number},animateTimeout:number}>{traceGroupName:'HeatValue',sliderValue:0,
                position:{left:0,top:0},size:{width:400,height:400}, animateTimeout:500}
        }),
        getters: {
            option: (state) => {
                return {
                    method: 'post',
                    url: state.url,
                    param: state.params
                }
            },
            figureInfo: (state) => {
                if(state.figures.length!=0){
                    return state.figures[state.figures.length-1]
                }else {
                    return null;
                }

            },
        },
        actions: {
            requestFigure() {
                http(this.option)
                    .then(res => {
                            if (res instanceof Error) {
                                this.ok = false;
                            } else {
                                this.figures.push({
                                    time: new Date(), option: cloneDeep(this.option), figure: res
                                });
                                this.ok = true;
                            }
                        },
                    )
            },
            deleteFigure(time:Date) {
                this.figures.splice(this.figures.indexOf((e) => e.time == time), 1)
            },
            setParam(params: Params = {timeframe_list: [], kw_list: [], title: "test"}) {
                this.params = params;
            },
            //添加并进行排序
            addTimeFrame(timeframe: string[]) {
                this.params.timeframe_list.push(timeframe)
                this.params.timeframe_list.sort((t1, t2) => {
                    if (t1[0] > t2[0]) {
                        return 1;
                    } else if (t1[0] < t2[0]) {
                        return -1;
                    } else {
                        if (t1[1] > t2[1]) {
                            return 1;
                        } else if (t1[1] < t2[1]) {
                            return -1;
                        } else {
                            return 0;
                        }
                    }
                })
                messageStore.showMessageById('timeFrameAddSuccess')
            },
            deleteTimeFrame(timeframe: string[]) {
                this.params.timeframe_list.splice(this.params.timeframe_list.indexOf((e) => {
                    return timeframe.toString() === e.toString()
                }), 1)
            },
            addKeyWordList(kw: string) {
                this.params.kw_list.push(kw)
            },
            deleteKeyWordList(kw: string) {
                this.params.kw_list.splice(this.params.kw_list.indexOf(kw), 1)
            },
            setOk(isOk: boolean) {
                this.ok = isOk;
            },
            setUrl(url:string){
                this.url=url;
            },
            setTraceGroupName(val:string){
                this.viewState.traceGroupName=val;
            }
        }
    })
}

interface Option {
    method: "get" | "post" | "delete" | "put",
    url: string,
    param: Params
}

interface FigureInfo {
    data?: [],
    layout?: {},
    frames?: []
    config?: {}
}

interface Params {
    timeframe_list: string[][],
    kw_list: string[],
    title: string
}