import {cloneDeep} from 'lodash';
import {defineStore} from 'pinia';
import {http} from "../http";
import { messageStore} from "./index";


export const useGraphStore = (id) => {
    // @ts-ignore
    return defineStore(id, {
        state: () => ({
            figures: <{ time: Date, option: Option, figure: FigureInfo }[]>[],
            method: <"get" | "post" | "delete" | "put">'post',
            url: <string>"hotMap",
            params: <Params>{timeframe_list: [], kw_list: [], title: ""},
            ok: <boolean>false
        }),
        getters: {
            option: (state) => {
                return {
                    method: state.method,
                    url: state.url,
                    param: state.params
                }
            },
            figureInfo: (state) => {
                // @ts-ignore
                return state.figures.at(-1)
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
            deleteFigure() {
                this.figures.splice(this.figures.indexOf((e) => e.time == this.figure.time), 1)
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
                messageStore.showMessage('timeFrameAddSuccess')
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
            }
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

interface Params {
    timeframe_list: string[][],
    kw_list: string[],
    title: string
}