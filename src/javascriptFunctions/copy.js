/**
 * 拷贝
 * 浅拷贝和深拷贝
 */
import checkType from './checkType';

export function shadowCopy(obj) {
    let type = checkType(obj);
    if (type !== 'object') return;
    let newObj = type === 'array' ? [] : {};
    for (let k in obj) {
        if (obj.hasOwnProperty(k)) {
            newObj[k] = obj[k];
        }
    }
    return newObj;
}

export function deepCopy(obj) {
    let type = checkType(obj);
    if (type !== 'object') return;
    let newObj = type === 'array' ? [] : {};
    for (let k in obj) {
        if (obj.hasOwnProperty(k)){
            newObj[k] = typeof obj[k] === 'object' ? deepCopy(obj[k]) : obj[k];
        }
    }
    return newObj;
}

export function forceDeepCopy(obj){
    return JSON.parse(JSON.stringify(obj));
}

function getTusi(){
    let a = Math.random(0,1)*15;
    let t = '';
    if(a>=0 && a<5){
        t= '招牌吐司'
    }else if(a>=5 && a<10){
        t= '奶酥吐司'
    }else{
        t= '冲绳之恋'
    }
    console.log('本次随机数：',a);
    console.log('本次选中应该是：',t);
}

const options=['招牌原味吐司','招牌奶酥吐司','冲绳之恋吐司']

function helpGFMakeDecision(options){
    let len = options.length;
    if(len===0) {
        console.log('巧妇难为无米之炊！！！');
        return;
    }
    if(len === 1) {
        console.log('你应该选择：',options[0]);
        return;
    }
    while(true){
        let obj={};
        let i = 0;
        for(; i<len;i++){
            let num = parseInt(Math.random(0, 1) * len);
            if(obj[num] === undefined){
                obj[num] = 1;
            }else{
                console.log('你应该选择：',options[num])
                return;
            }
        }
        console.log('稍等一下，再来一次!')
    }
}