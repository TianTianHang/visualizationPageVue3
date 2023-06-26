import {defineStore} from "pinia";
import {h, Ref} from "vue";
import Graph from "../components/vueplotly/Graph.vue";
import {generateGraphStore} from "./index";
import {useDrop} from "vue3-dnd";



export const useContainerViewStore = defineStore("containerViewStore", {
    state: () => ({
        items:<{id:string}[]>[],
        layers:<Layer[]>[],
        item2layer:{},
        layer2item:{}
    }),
    getters: {

    },
    actions: {
        updateState(item,layer){
            const oldLayer=this.item2layer[item.id];
            this.layer2item[oldLayer.id]=null;
            this.item2layer[item.id] =layer;
            this.layer2item[layer.id] =item;
        },
        currentComponent(layer){
            const item=this.layer2item[layer.id];
            if(item!=null){
                const {offsetWidth,offsetHeight}=layer.ref.value;
                console.log({offsetWidth,offsetHeight})
                return h(Graph, {plotlyId:item.id,w:offsetWidth*0.9,h:offsetHeight*0.85});
            }else {
                return undefined;
            }
        },
        moveItem(item, delta:{x: number, y: number}) {
            const position=generateGraphStore(item.id).viewState.position
            const left = Math.round(position.left + delta.x)
            const top = Math.round(position.top + delta.y)
            // @ts-ignore
            Object.assign(position, { left, top })
        },
        initItem(item,layer){
            const store=generateGraphStore(item.id);
            const size={width:layer.ref?.value.clientWidth*0.9,height:layer.ref?.value.clientHeight*0.9}
            // @ts-ignore
            Object.assign(store.viewState.position, { left:0, top:0 })
            // @ts-ignore
            Object.assign(store.viewState.size, size)
        },
        dropLayer(layer){
            const state=this;
            return useDrop(() => ({
            accept: ['BOX'],
            collect: (monitor) => ({
                isOver: monitor.isOver({shallow: true}),item:monitor.getItem()}) ,
            drop(item, monitor) {
                const lastDrop=monitor.getDropResult()
                if(lastDrop===layer){
                    const delta = monitor.getDifferenceFromInitialOffset() as {
                        x: number
                        y: number
                    }
                    state.moveItem(item, delta);
                }else {
                    state.initItem(item,layer);
                    state.updateState(item,layer)
                }
                return layer;
            }
        }))
        },
        addItem(item,layer){
            this.item.push(item);
            this.item2layer[item.id]=layer;
            this.layer2item[layer.id]=item;
        }
    }
})
interface Layer{
    id:string,
    ref:Ref<HTMLDivElement | null>
}
