<template>
    <div>
        <el-row>
            <el-col v-for="kw in kw_list" :span="4">
                <el-tag
                        :key="kw"
                        closable
                        @close="handleTagClose(kw)">
                    {{ kw }}
                </el-tag>
            </el-col>
            <el-col>
                <el-select v-model="kw_list"
                           allow-create
                           collapse-tags
                           filterable
                           multiple>
                    <el-option-group
                        v-for="group in kw_tree"
                        :key="group.id"
                        :label="group.word.pre_words"
                    >
                        <el-option
                            v-for="item in group.children"
                            :key="item.id"
                            :label="`${item.word.pre_words} ${item.word.post_words}`"
                            :value="`${item.word.pre_words} ${item.word.post_words}`">
                        </el-option>
                    </el-option-group>
                </el-select>
            </el-col>
        </el-row>
    </div>
</template>

<script lang="ts" setup>
import {onMounted, toRef} from "vue";
import {generateGraphStore, keyWordsStore} from "../stores";

const props = defineProps<{
    id: string,
}>()
const graphStore = generateGraphStore(props.id)
const kw_tree=keyWordsStore.kw_tree
const kw_list = toRef(graphStore.params, "kw_list");
const handleTagClose = (tag: string) => {
    graphStore.deleteKeyWordList(tag)
}
onMounted(() => {

})
</script>

<style scoped>


</style>