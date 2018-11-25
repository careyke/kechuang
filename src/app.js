import debounce from './javascriptFunctions/debounce';
import throttle from './javascriptFunctions/throttle';
import styles from './app.less';
import exeUnique from './javascriptFunctions/unique';

const ele = document.querySelector('#app');
ele.className = styles['app'];
const handler = (e) => {
    ele.innerHTML = parseInt(ele.innerHTML) + 1;
}
const debounceHandler = debounce(handler, 1000, true);
const throttleHandler = throttle(handler, 1000, { leading: false, trailing: false });
ele.onmousemove = throttleHandler;

exeUnique(); //测试数组去重