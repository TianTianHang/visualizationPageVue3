<template>
  <div class="post">
    <div v-if="loading" class="loading">Loading...</div>

    <div v-if="error" class="error">{{ error }}</div>

    <div v-if="post" class="content">
      <h2>{{post.title}}</h2>
      <component :is="post.title"/>
      <component :is="post.content"/>
    </div>
  </div>
</template>
<script>
import {keyWordsStore} from "@/stores";

export default {
  data() {
    return {
      loading: false,
      post: null,
      error: null,
    }
  },
  created() {
    // watch 路由的参数，以便再次获取数据
    this.$watch(
        () => this.$route.params,
        () => {
          this.fetchData()
        },
        // 组件创建完后获取数据，
        // 此时 data 已经被 observed 了
        { immediate: true }
    )
  },
  methods: {
    fetchData() {
      this.error = this.post = null
      this.loading = true
      // replace `getPost` with your data fetching util / API wrapper
      keyWordsStore.requestKeyWord(this.$route.params.id).then(([err, post]) => {
        this.loading = false
        if (err) {
          this.error = err.message();
        } else {
          this.post = post;
        }
      })
    },
  },
}
</script>

<style scoped>

</style>