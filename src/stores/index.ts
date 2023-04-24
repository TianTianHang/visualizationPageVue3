import {useGraphStore} from "./useGraphStore";
import {useMessageStore} from "./useMessageStore";
import {useKeyWordsStore} from "./useKeyWordsStore";
import {useConfigStore} from "./useConfigStore";
const generateGraphStore=(id)=>{return useGraphStore(id)()}
const messageStore=useMessageStore()
const keyWordsStore =useKeyWordsStore()
const configStore=useConfigStore();
//向后端请求keyWords
keyWordsStore.requestKeyWords()
export {generateGraphStore,messageStore,keyWordsStore,configStore}