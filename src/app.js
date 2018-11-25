import debounce from './javascriptFunctions/debounce';
import throttle from './javascriptFunctions/throttle';
import styles from './app.less';
import exeUnique from './javascriptFunctions/unique';
import checkType from './javascriptFunctions/checkType';

const ele = document.querySelector('#app');
ele.className = styles['app'];
const handler = (e) => {
    ele.innerHTML = parseInt(ele.innerHTML) + 1;
}
const debounceHandler = debounce(handler, 1000, true);
const throttleHandler = throttle(handler, 1000, { leading: false, trailing: false });
ele.onmousemove = throttleHandler;

exeUnique(); //测试数组去重

//测试类型检测
(function () {
    let arr = [1, '123', true, undefined, null, { a: 1 }, [1, 2], new Date(), new Error(), /a/g, function f() { }];
    arr.forEach((item) => {
        console.log('value:', item);
        console.log('type:', checkType(item));
    })
})()