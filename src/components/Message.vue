<template>
  <Transition>
    <div v-show="isShow" :style="style[type]" class="my-message">
      <span>{{ text }}</span>
    </div>
  </Transition>
</template>

<script>
import {createVNode, ref, render} from "vue";
import Message from "@/components/Message.vue";

export default {
  data() {
    return {
      isShow: ref(false),
      style: {
        warn: {
          icon: 'icon-warning',
          color: '#E6A23C',
          backgroundColor: 'rgb(253, 246, 236)',
          borderColor: 'rgb(250, 236, 216)'
        },
        error: {
          icon: 'icon-shanchu',
          color: '#F56C6C',
          backgroundColor: 'rgb(254, 240, 240)',
          borderColor: 'rgb(253, 226, 226)'
        },
        success: {
          icon: 'icon-queren2',
          color: '#67C23A',
          backgroundColor: 'rgb(240, 249, 235)',
          borderColor: 'rgb(225, 243, 216)'
        }
      }
    }
  },
  props: {
    type: {type: String, default: "warn"},
    text: String
  },
  mounted() {
    this.isShow = true
  },
  methods: {
    showMessage(type, text, blockId) {
      const block = document.getElementById(blockId)
      const vnode = createVNode(Message, {text, type})
      render(vnode, block)
      setTimeout(() => render(null, block), 4000)
    },
  }


}
</script>

<style scoped>
.my-message {

}

</style>