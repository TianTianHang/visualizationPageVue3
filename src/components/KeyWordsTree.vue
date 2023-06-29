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
  <teleport to="body">
    <RightClickMenu v-model:menu-visit="menuVisit"
                    :left="left" :top="top"

    >
      <SimpleDialog
          v-for="(menuItem,index) in menuItems"
          :form-title="menuItem" :form-items="formItems" v-model:form-visit="formVisits[index].value"
          :form-button-text="buttonText"
          :index="index" @form-open="onRightMenuClick"
          @form-close="handleFormClose"
          :form="form"
      >
        {{menuItem}}
      </SimpleDialog>
    </RightClickMenu>

  </teleport>

</template>

<script lang="ts" setup>
import {computed, ComputedRef, h, ref, toRef} from "vue";
import {keyWordsStore} from "../stores";
import RightClickMenu from "./RightClickMenu.vue";
import {configStore} from "../stores";
import {simpleDialog} from "./SimpleDialog.ts";
import SimpleDialog from "./SimpleDialog.vue";
import {ElInput} from "element-plus";
import {KeyWordMoreInfo} from "../stores/useKeyWordsStore";
import {useRouter} from "vue-router";


const staticString=computed(()=>{
    return configStore.myLocal.el.KeyWordsTree;
})
const items = toRef(keyWordsStore, "kw_tree")
const treeProps = {children: 'children', label: 'word'}
const tree =toRef(keyWordsStore, "treeRef")


const router = useRouter()
const handelNodeClick = (data, node,event) => {
  if(data.has_hover){
    router.push({
      name:"infoPage", params: { id: data.id}
    })
  }
}

// 实现右键菜单
// 移除监听器并将菜单卸载
const menuVisit=ref(false);
const menuItems=ref(staticString.value.menuItemLabel);



const onRightMenuClick=(index)=>{
    if(index===0){
      keyWordsStore.handleMethod="insertBefore";
    }else if(index===1){
      keyWordsStore.handleMethod="append";
    }else if(index===2){
      const oldData=keyWordsStore.currentNode.data;
      form.value={word:`${oldData.word.pre_words} ${oldData.word.post_words}`,
                  title:oldData.title,content:oldData.content};
      keyWordsStore.handleMethod="updateKeyChildren";
    }else if(index===3){
      formVisits.value[index].value=false;
      keyWordsStore.remove();
    }
}
const top=ref(0);
const left=ref(0);
const handelNodeContextMenu= (event, data, node) => {
  // 显示右键菜单
  menuVisit.value=true;
  top.value=event.y;
  left.value=event.x;
  keyWordsStore.currentNode=node;
}



// 更改菜单
const formKeys=["word","title","content"];
const form=ref({});
const buttonText:string[]=ref(staticString.value.buttonText);
const formVisits=computed(()=>{
  return staticString.value.menuItemLabel.map(
      (e)=>{return ref(false)})
})
const formItems:ComputedRef<{type:object|string,label:string,key:string}[]>=computed(()=>{
  const val=staticString.value.formItemLabel.map(
      (e)=>{return {label:e,type:ElInput}})
  formKeys.forEach((e,index)=>{
    val[index].key=e;
  })
  val[2].type=h(ElInput,{rows:"4" ,type:"textarea"})
  return val
})

const handleFormClose=(submit:boolean,data:{})=>{
  if(submit){
    console.log(data)
    keyWordsStore.treeMethod(data)
  }
  form.value={}
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