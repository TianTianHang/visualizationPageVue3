import axios from "axios";
import api from "./api";
import {useMessageStore} from "../stores/useMessageStore";
import {pinia} from "../stores/store";


const messageStore = useMessageStore(pinia)
let instance = axios.create({
    baseURL: "https://tiantianhang.pythonanywhere.com/api",//服务器地址
    timeout: 250000//默认超时时长
})
instance.interceptors.request.use(
    config => {
        //在发送请求前做些什么

        return config

    },
    err => {
        // 在请求错误的时候做些什么（此处错误，请求没有到后端）

        handleResponseError(err);
        // @ts-ignore
        return Promise.reject(err)//这里返回一个promise对象
    }
)
instance.interceptors.response.use(
    res => {
        //请求成功对响应数据进行处理

        messageStore.showMessageById('successFetchedData');
        return res
    }, err => {
        //响应错误做些什么（此处错误，到达后端后返回）

        handleResponseError(err);
        // @ts-ignore
        return Promise.reject(err)
    }
)

function catUrl(url:string,param:{}){
    let result=url;
    for(let key in param ){
        const value = param[key];
        result += `${value}/`;
    }
    return result;
}
//option={method,url,param}
async function http(option: { method: string, url: string, param: {},query?:{} }) {
    let result = null;
    if (option.method === 'get' || option.method === 'delete') {
        await instance[option.method](
            catUrl(api[option.url],option.param),
            {params: option.query}
        ).then((response) => {
            result = response.data;
        })
            .catch((error) => {
                result = error
                console.log(error);
            })
    } else if (option.method === 'post' || option.method === 'put') {
        await instance[option.method](
            api[option.url],
            option.param
        ).then((response) => {
            result = response.data;
        })
            .catch((error) => {
                result = error;
                console.log(error);
            })
    }
    return result
}
function handleRequestError(error) {
    messageStore.showMessageById('sendRequestError');
    console.error(error);
}

function handleResponseError(error) {
    messageStore.showMessageById('dataResponseError');
    console.error(error);
}

function handleError(error) {
    handleRequestError(error);
    handleResponseError(error);
}
export {http}


