import axios from "axios";
import api from "./api";
import {useMessageStore} from "../stores/useMessageStore";
import {pinia} from "../stores/store";

const messageStore=useMessageStore(pinia)
let instance = axios.create({
    baseURL: "http://127.0.0.1:5000",//服务器地址
    timeout: 25000//默认超时时长
})
instance.interceptors.request.use(
    config => {
        //在发送请求前做些什么
        return config
    },
    err => {
        // 在请求错误的时候做些什么（此处错误，请求没有到后端）
        messageStore.showMessage('sendRequestError','zh-cn')
        // @ts-ignore
        return Promise.reject(err)//这里返回一个promise对象
    }
)
instance.interceptors.response.use(
    res => {
        //请求成功对响应数据进行处理
        return res
    }, err => {
        //响应错误做些什么（此处错误，到达后端后返回）
        messageStore.showMessage('dataResponseError','zh-cn')
        // @ts-ignore
        return Promise.reject(err)
    }
)




//option={method,url,param}
async function http(option: { method: string, url: string, param: {} }) {
    let result = null;
    if (option.method === 'get' || option.method === 'delete') {
        await instance[option.method](
            api[option.url],
            {params: option.param}
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
export {http}


