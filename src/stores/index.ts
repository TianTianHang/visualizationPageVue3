import {useGraphStore} from "./useGraphStore";
import {useMessageStore} from "./useMessageStore";
import {useKeyWordsStore} from "./useKeyWordsStore";
import {useConfigStore} from "./useConfigStore";
import {useContainerViewStore} from "./useContainerViewStore";
const generateGraphStore=(id)=>{return useGraphStore(id)()}
const messageStore=useMessageStore()
const keyWordsStore =useKeyWordsStore()
const configStore=useConfigStore();
const containerViewStore=useContainerViewStore();
//向后端请求keyWords
keyWordsStore.requestKeyWords()
export {generateGraphStore,messageStore,keyWordsStore,configStore,containerViewStore}