<template>
    <el-button :icon="Operation" @click="openDialog=true"></el-button>
    <el-dialog v-model="openDialog" :title="staticString.title" width="800px">
        <el-tabs v-model="activeName">
            <el-tab-pane name="keyWords" :label="staticString.tap.keyWords">
                <KeyWordSelector :id="id"></KeyWordSelector>
            </el-tab-pane>
            <el-tab-pane name="timeFrame" :label="staticString.tap.timeFrame">
                <TimeSelector :id="id"></TimeSelector>
            </el-tab-pane>
            <el-tab-pane name="type" :label="staticString.tap.other.title">
                <div>
                    <el-select v-model="type">
                        <el-option disabled value="">Please select one</el-option>
                        <el-option selected="selected" value="heatMap"
                                   :label="staticString.tap.other.typeItem[0]"/>
                        <el-option value="lineChart" :label="staticString.tap.other.typeItem[1]"/>
                    </el-select>
                </div>
            </el-tab-pane>
        </el-tabs>
        <template #footer>
      <span class="dialog-footer">
        <el-button @click="openDialog = false">
          {{staticString.foot.quit}}
        </el-button>
        <el-button type="primary" @click="()=>{graphStore.requestFigure();openDialog=false;}">
          {{staticString.foot.submit}}
        </el-button>
      </span>
        </template>
    </el-dialog>
</template>
<script setup lang="ts">
import {computed, ref, toRef} from "vue";
import {configStore, generateGraphStore} from "../stores";
import {Operation} from "@element-plus/icons-vue";
import KeyWordSelector from "./KeyWordSelector.vue";
import TimeSelector from "./TimeSelector.vue";

const props=defineProps<{
    id:string,
}>();
const staticString=computed(()=>{
    return configStore.myLocal.el.SetDialog;
})
const activeName=ref("keyWords");
const openDialog=ref(false);
const graphStore=generateGraphStore(props.id);
const type=toRef(graphStore,"url");
const setOpenDialog= (e:boolean) => {
  openDialog.value=e;
}
defineExpose({setOpenDialog})
</script>