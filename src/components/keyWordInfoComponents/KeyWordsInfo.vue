<template>
    <el-space direction="vertical" >
        <key-word-info-item v-for="item in items" :item="item"></key-word-info-item>
        <el-card class="box-card">
            <el-col  v-if="openInput">

                <el-input
                    ref="el_input"
                    v-model="newKeyWord"
                    placeholder="Please Input"
                    clearable
                    @change="handleInputChange"
                    @blur="()=>{newKeyWord='';openInput=false}"
                />
            </el-col>
            <el-col :push="7" v-else>
                <el-button :icon="Plus" :text="true" size="large" @click="()=>{openInput=true;nextTick(()=>el_input.focus())}" />
            </el-col>
        </el-card>
    </el-space>
</template>

<script lang="ts" setup>
import KeyWordInfoItem from "./KeyWordInfoItem.vue";
import {keyWordsStore,messageStore} from "../../stores"
import {Plus} from "@element-plus/icons-vue";
import {nextTick, onMounted, ref, toRef, watch} from "vue";

const items = toRef(keyWordsStore, "kw_list")
const openInput=ref(false)
const newKeyWord=ref('')
const el_input=ref(null)
const handleInputChange=()=>{
    if(newKeyWord.value.match('^\\s*$')){
        openInput.value=false;
    }else{
        keyWordsStore.addKeyWord(newKeyWord.value)
    }
    newKeyWord.value='';
    openInput.value=false;
}

onMounted(() => {

})
</script>

<style scoped>
.box-card {
    width: 180px;
    height: 60px;
    top:10px;
}
</style>