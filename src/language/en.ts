import {Language} from "./index"
// @ts-ignore
const en:Language={
    name:'en',
    el:{
        TimeSelector:{
            text:[
                'Last 1 day',
                'Last 7 days',
                'Last 30 days',
                'Last 90 days',
                'Last 12 months',
                'Last 5 years',
                '2004-present'
            ]
        },
        HeaderBar:{
            title:'visualization',
            router:[{path:'/containerView',text:'home'},{path:'/informationView',text:'wordList'}],
            changeLang:{
                selected:'English',
                langs:['Chinese','English']
            },
        },
        Graph:{
        },
        SetDialog:{
            title:"Set",
            tap:{
                keyWords:"keyword",
                timeFrame:"timeframe",
                other:{
                    title:'other Set',
                    typeItem:['heatMap','lineChart']
                },
            },
            foot:{
                quit:"Quit",
                submit:"Submit",
            }
        },
        HistoryDrawer:{
            title:"History"
        },
        message:{
            'timeFrameAddSuccess': {
                type: 'success',
                message: 'Added successfully!'
            },
            'dataResponseError': {
                type: 'error',
                message: 'The backend is not responding!'
            },
            'sendRequestError': {
                type: 'error',
                message: 'Request sent failed!'
            },
            'successFetchedData':{
                type:'success',
                message: 'Data acquisition successful!'
            },
            'duplicateDataWarning':{
                type:'warning',
                message:'Do not enter duplicate data!'
            },
            'noSpaceForItem': {
                type: 'warning',
                message: 'no space!'
            },
        },
        KeyWordsTree:{
            menuItemLabel:["Peer add","Children add","update","delete"],
            formItemLabel:["word","title","content"],
            buttonText:["close","submit"]
        }
    }

}
export {en as default}
