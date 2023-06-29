<template>
  <el-button text @click="handleOpen"><slot></slot></el-button>
  <el-dialog v-model="formVisit" append-to-body @close="handleClose">
    <template #header>
      <span>{{ formTitle }}</span>
    </template>
    <template #default>
      <el-form :model="form" :inline="true">
        <el-form-item v-for="e in formItems" :label="e.label">
          <component :is="e.type" v-model="form[e.key]"/>
        </el-form-item>
      </el-form>
    </template>
    <template #footer>
      <el-button @click="handleClose">{{ formButtonText[0] }}</el-button>
      <el-button @click="handleSubmit" type="primary">{{formButtonText[1]}}</el-button>
    </template>
  </el-dialog>
</template>
<script setup lang="ts">
import {computed, reactive, ref} from "vue";
const props=defineProps<{
  index:string|number,
  formButtonText:string[],
  formTitle:string,
  formVisit:boolean,
  formItems:{type:object|string,label:string,key:string}[],
  form:{}
}>()
const emits = defineEmits<{
  (e:'update:formVisit',newValue:boolean):void
  (e:'formClose',submit:boolean,form:{}):void
  (e:'formOpen',index:string|number):void
}
>()
const formVisit=computed({
  get(){
    return props.formVisit;
  },
  set(newValue){
    emits("update:formVisit",newValue);
  }
})

const handleClose=()=>{
  formVisit.value=false;
  emits("formClose",false,null);
}
const handleSubmit=()=>{
  formVisit.value=false;
  emits("formClose",true,props.form);
}
const handleOpen=()=>{
  formVisit.value=true;
  emits("formOpen",props.index);
}
</script>
<style scoped>

</style>