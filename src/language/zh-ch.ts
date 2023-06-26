const myzhch={
    name:'zh-ch',
    el:{
        TimeSelector:{
            text:[
                '过去1天',
                '过去7天',
                '过去30天',
                '过去90天',
                '过去12个月',
                '过去5年',
                '2004年至今'
            ]
        },
        HeaderBar:{
            title:'可视化',
            router:['主要区域'],
            changeLang:{
                selected:'中文',
                langs:['中文','英文']
            },
        },
        Graph:{

        },
        SetDialog:{
                title:"设置",
                tap:{
                    keyWords:"关键词",
                    timeFrame:"时间",
                    other:{
                        title:'其他设置',
                        typeItem:['热力图','折线图']
                    },
                },
                foot:{
                    quit:"退出",
                    submit:"应用",
                }
        },
        HistoryDrawer:{
            title:"历史记录"
        },
        message:{
            'timeFrameAddSuccess': {
                type: 'success',
                message: '添加成功!'
            },
            'dataResponseError': {
                type: 'error',
                message: '后端未响应！'
            },
            'sendRequestError': {
                type: 'error',
                message: '请求发送失败！'
            },
            'successFetchedData':{
                type:'success',
                message: '成功获取数据！'
            },
            'duplicateDataWarning':{
                type:'warning',
                message:'请勿输入重复数据！'
            },
            'noSpaceForItem': {
                type: 'warning',
                message: '没有位置了！'
            },
        },
        KeyWordsTree:{
            simpleDialogTitle:"更改",
            menuItemLabel:["平级添加","子级添加","编辑","删除"],
            diaLogForm:["单词","标题","内容","图片"]
        }
    }

}
export {myzhch as default}
