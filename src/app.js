import debounce from './javascriptFunctions/debounce';
import styles from './app.less';

const ele = document.querySelector('#app');
ele.className = styles['app'];
const handler = (e)=>{console.log('mousemove')}
const debounceHandler = debounce(handler,1000, true);
ele.onmousemove = debounceHandler;