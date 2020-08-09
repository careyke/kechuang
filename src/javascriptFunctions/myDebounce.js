
/**
 * 可以在开始时立马执行一次
 * @param {*} fn 
 * @param {*} delay 
 * @param {*} immediate 
 */
function myDebounce(fn, delay, immediate = false) {
  let timer = null;
  let called = false;
  return function (...args) {
    if (immediate && !called) {
      fn.apply(this, args);
      called = true;
    }
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      fn.apply(this, args);
      timer = null;
      called = false;
    }, delay);
  }
}