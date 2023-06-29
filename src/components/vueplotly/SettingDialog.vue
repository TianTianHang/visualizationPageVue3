<template>
    <el-button :icon="Operation" @click="()=>{openSetting=true}"></el-button>
    <el-dialog v-model="openSetting" :title="staticString.title" width="800px" append-to-body>
        <el-tabs v-model="activeName">
            <el-tab-pane name="keyWords" :label="staticString.tap.keyWords">
                <KeyWordSelector :plotlyId="plotlyId"></KeyWordSelector>
            </el-tab-pane>
            <el-tab-pane name="timeFrame" :label="staticString.tap.timeFrame">
                <TimeSelector :plotlyId="plotlyId"></TimeSelector>
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
        <el-button @click="handleQuit">
          {{staticString.foot.quit}}
        </el-button>
        <el-button type="primary" @click="handleSubmit">
          {{staticString.foot.submit}}
        </el-button>
      </span>
        </template>
    </el-dialog>
</template>
<script setup lang="ts">
import {computed, ref, toRef, watch} from "vue";
import {configStore, generateGraphStore} from "../../stores";
import {Operation} from "@element-plus/icons-vue";
import KeyWordSelector from "./KeyWordSelector.vue";
import TimeSelector from "./TimeSelector.vue";
import {useRouter} from "vue-router";

const router = useRouter()


const props=defineProps<{
    plotlyId:string,
    openSetting:boolean
}>();
const emit=defineEmits(['update:openSetting'])
const openSetting=computed({
  get(){
    return props.openSetting;
  },
  set(newValue){
    emit('update:openSetting',newValue);
  }
})
const staticString=computed(()=>{
    return configStore.myLocal.el.SetDialog;
})
const activeName=ref("keyWords");
const graphStore=generateGraphStore(props.plotlyId);
const type=toRef(graphStore,"url");
const handleRouter=()=>{
  if(router.currentRoute.value.name=="settingDialog"){
    router.back()
  }
}
const handleQuit=()=>{
  openSetting.value = false;
  handleRouter();
}

const handleSubmit=()=>{
  graphStore.requestFigure();
  openSetting.value=false;
  handleRouter();
};

</script>