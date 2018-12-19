import debounce from './javascriptFunctions/debounce';
import throttle from './javascriptFunctions/throttle';
import styles from './app.less';
import * as result from './arithmetic';
import exeUnique from './javascriptFunctions/unique';
import checkType from './javascriptFunctions/checkType';
import { shadowCopy, deepCopy, forceDeepCopy } from './javascriptFunctions/copy';
import { bubbleSort, insertSort, selectSort } from './sort'

// const ele = document.querySelector('#app');
// ele.className = styles['app'];
// const handler = (e) => {
//     ele.innerHTML = parseInt(ele.innerHTML) + 1;
// }
// const debounceHandler = debounce(handler, 1000, true);
// const throttleHandler = throttle(handler, 1000, { leading: false, trailing: false });
// ele.onmousemove = throttleHandler;

// exeUnique(); //测试数组去重

// //测试类型检测
// (function () {
//     let arr = [1, '123', true, undefined, null, { a: 1 }, [1, 2], new Date(), new Error(), /a/g, function f() { }];
//     arr.forEach((item) => {
//         console.log('value:', item);
//         console.log('type:', checkType(item));
//     })
// })();

// //测试浅拷贝
// (function () {
//     let obj = {
//         a: {
//             c: 1,
//             d: 2
//         },
//         b: 3
//     }
//     let newObj = shadowCopy(obj);
//     obj.b = 4;
//     obj.a.c = 5;
//     console.log('shadow');
//     console.log('origin:', obj);
//     console.log('copied:', newObj);
// })();

// //测试深拷贝
// (function () {
//     let obj = {
//         a: {
//             c: 1,
//             d: 2
//         },
//         b: 3,
//         f:function fun1(){}
//     }
//     // let newObj = forceDeepCopy(obj);
//     let newObj = deepCopy(obj);
//     obj.b = 4;
//     obj.a.c = 5;
//     obj.f = function fun2(){};
//     console.log('deep');
//     console.log('origin:', obj);
//     console.log('copied:', newObj);
// })();

(function (arr){
    console.log('origin array',arr.slice());
    // let array = bubbleSort(arr);
    // let array = insertSort(arr);
    let array = selectSort(arr);
    console.log('sorted array',array);
})([3,8,4,6,2,9,7])