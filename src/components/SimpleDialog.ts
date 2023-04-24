import {h, ref, render, VNode} from 'vue'


import {ElButton, ElDialog, ElForm, ElFormItem} from "element-plus";

export interface FormItem {
    label:string,
    type:any
}
// 自定义dialog关闭事件
export const dialogCloseEvent = new Event("dialogClose");
// 等待直到事件发生
async function waitEvent(dom,event_type) {
    // 创建一个Promise对象，等待close事件
    let promise = new Promise((resolve, reject) => {
        // 定义一个具名函数
        function handleClose() {
            // 移除监听器
            dom.removeEventListener(event_type, handleClose);
            // resolve Promise对象
            resolve();
        }
        // 添加close事件的监听器
        dom.addEventListener(event_type, handleClose);
    });
    // 等待Promise对象resolve
    await promise;
    // 执行后面的代码

}
export const simpleDialog = async (title:string, formItems:FormItem[],oldData=null) => {

    const get_form= (formItems)=>{
        const t={};
        const labels=[];
        formItems.forEach((e)=>{
            t[e.label]=null;
            labels.push(e.label)
        })
        if(oldData!=null){
            Object.keys(oldData).forEach((value,index)=>{
                if(index<3){
                    t[labels[index]]=oldData[value]
                }
            })
        }
        console.log(t)
        return t
    }
    const form=ref(get_form(formItems))
    const formVnode=()=>{
        const formItemVnodes:VNode[]=formItems.map((e)=>{
            const inputItem=h(e.type,{
                modelValue:form.value[e.label],
                'onUpdate:modelValue':(value) =>form.value[e.label]=value
            })

            return h(ElFormItem,{label:e.label},()=>inputItem);
        })
        return h(ElForm, {model:form},{default:()=>formItemVnodes})
    }
    const handleDestroy = () => {
        // 从 body 上移除组件
        render(null, document.getElementById("dialog"))
    }

    const dialogVnode = h(ElDialog ,{
        modelValue:true,
        onClosed:()=>handleDestroy(),
        onClose:()=>{dialogVnode.el.dispatchEvent(dialogCloseEvent);}
    },{
        header:()=>title,
        default:()=>formVnode(),
    })
    dialogVnode.children['footer']=()=>[h(ElButton,{onClick:()=>{dialogVnode.component.props.modelValue=false}},()=>"close")
        ,h(ElButton,{onClick:()=>{
                dialogVnode.component.props.modelValue=false;
        }},()=>"set")]
    // 使用 h 函数创建 vnode

    // 使用 render 函数将 vnode 渲染为真实DOM并挂载到 body 上
    render(dialogVnode, document.getElementById("dialog"))
    await waitEvent(dialogVnode.el,"dialogClose")
    return form.value
}
