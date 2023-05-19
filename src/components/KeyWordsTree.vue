<template>
<div class="down-tree">
    <el-tree
            :data="items"
            :expand-on-click-node="false"
            :height="600"
            :props="treeProps"
            accordion
            node-key="id"
            @node-contextmenu="handelNodeContextMenu"
            @node-click="handelNodeClick"
            :default-expanded-keys="[1]"
            ref="tree"
    >
        <template #default="{ node, data }">
            <span v-if="data.word.post_words">{{ `${data.word.pre_words} ${data.word.post_words}` }}</span>
            <span v-else>{{ data.word.pre_words }}</span>
        </template>
    </el-tree>
</div>
    <div id="dialog"></div>
    <div id="rightClickMenu"></div>

</template>

<script lang="ts" setup>
import {computed, h, reactive, ref, render, toRef} from "vue";
import {keyWordsStore} from "../stores";
import {More} from "@element-plus/icons-vue";
import ExtraInfoForm from "./ExtraInfoForm.vue";
import RightClickMenu from "./RightClickMenu.vue";
import {configStore} from "../stores";
import {simpleDialog} from "./SimpleDialog.ts";
import {ElInput} from "element-plus";
import {KeyWordMoreInfo} from "../stores/useKeyWordsStore";
import {useRoute, useRouter} from "vue-router";


const staticString=computed(()=>{
    return configStore.myLocal.el.KeyWordsTree;
})

const items = toRef(keyWordsStore, "kw_tree")
const treeProps = {children: 'children', label: 'word'}
const tree =ref(null)

const router = useRouter()
const route = useRoute()
const handelNodeClick = (data, node,event) => {
  if(data.has_hover){
    const str = JSON.stringify(data);
    router.push({
      name:"infoPage",
      params:{word:`${data.word.pre_words} ${data.word.post_words}`},
      query:{data:str}
    }
    )
  }
}
// 实现右键菜单
// 移除监听器并将菜单卸载
const handelAllPageClick = (event) => {
    document.removeEventListener("click",handelAllPageClick,)
    document.removeEventListener("contextmenu",handelAllPageClick,)
    render(null,document.getElementById("rightClickMenu"))
}

const handelNodeContextMenu= (event, data, node) => {
    const menu=h(RightClickMenu,{
        menuVisit:true,
        mousePosition:{mouseX:event.clientX,mouseY:event.clientY},
        menuItems:staticString.value.menuItemLabel,
        onRightMenuClick:(index)=>{
            if(index===0){
                nodeChange(tree.value.insertAfter,node)
            }else if(index===1){
                nodeChange(tree.value.append,node)
            }else if(index===2){
                const oldData={word:data.word.pre_words+" "+data.word.post_words,
                    title:data.title,img:data.img,content:data.content,id:data.id,children:data.children}
                nodeChange(tree.value.updateKeyChildren,node,true,oldData)
            }else if(index===3){
                tree.value.remove(node)
            }
        }
    })
    setTimeout(()=>render(menu,document.getElementById("rightClickMenu")),10)
    document.addEventListener("click",handelAllPageClick,{once:true})
    document.addEventListener("contextmenu",handelAllPageClick,{once:true})
}
//处理节点的增加
const nodeChange=(func,node,isf=false,oldData=null)=>{
    let data:KeyWordMoreInfo={word:{pre_words:null,post_words:null},title:null,img:null,content:null,has_hover: false, id: null};
    const dataKeys=["word","title","content","img"];
    simpleDialog(staticString.value.simpleDialogTitle,staticString.value.diaLogForm.map((e)=>{return {label:e,type:ElInput}}),oldData).then(
        (res)=>{
            Object.keys(res).forEach((value,index)=>{
                if(index==0){
                    const words=res[value]!=null?res[value].split(" ",2):[]
                    data[dataKeys[index]].pre_words=words.length>=1?words[0]:null;
                    data[dataKeys[index]].post_words=words.length==2?words[1]:null;
                }else {
                    data[dataKeys[index]] = res[value]
                }
            })
            if(data.img!=null || data.content!=null){
                data.has_hover=true;
            }
            if(data.id===null){
                data.id=keyWordsStore.nextId()
            }
            if(isf){
                func(node.key,data)
            }else {
                func(data,node.key)
            }
        }
    )
}

</script>

<style scoped>
.el-tree {
    width: 80%;
}
.down-tree{
    height: 600px;
    display: block;
    overflow-y: scroll;
    inset: 10px auto auto auto
}
</style>