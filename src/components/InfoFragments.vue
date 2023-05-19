<template>
    <el-card body-style="height:600px">
      <template #header>
        <h1 v-if="title">{{ title }}</h1>
      </template>

      <div style="display: flex;height: 100%;width: 100%;">
        <el-image v-if="img" :src="<string>img" ></el-image>
        <div class="text-block">
          <span>{{ content }}</span>
        </div>
        <div id="dgContainer1" style="height: 100%;width: 100%;">
          <Graph :id="id"/>
        </div>
      </div>

    </el-card>
</template>
<script lang="ts">
import Graph from "../App.vue";
import {v4} from "uuid";

export default {
  components: {Graph},
  props: {
    data: {
      type: String,
      required: true,
    }
  },
  data(){
    return{
      id:"plotly"+ v4()
    }
  },
  setup(props){
    const {title,img,content}=JSON.parse(props.data)
    return {
      title,img,content
    }

  }
}
</script>
<style scoped>

</style>