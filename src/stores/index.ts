import {useGraphStore} from "./useGraphStore";
import {useMessageStore} from "./useMessageStore";
import {useKeyWordsStore} from "./useKeyWordsStore";

const generateGraphStore=(id)=>{return useGraphStore(id)()}
const messageStore=useMessageStore()
const keyWordsStore =useKeyWordsStore()
//向后端请求keyWords
keyWordsStore.requestKeyWords()
export {generateGraphStore,messageStore,keyWordsStore}