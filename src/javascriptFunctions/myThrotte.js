
/**
 * 头必执行一次 尾不执行
 * @param {*} fn 
 * @param {*} delay 
 */
function myThrottle(fn, delay) {
  let prevTime = Date.now();

  return function (...args) {
    let now = Date.now();
    if (now - prevTime > delay) {
      fn.apply(this, args);
      prevTime = now;
    }
  }
}

/**
 * 头尾都可以执行，但是尾必执行
 * @param {*} fn 
 * @param {*} delay 
 * @param {*} immediate 
 */
function myThrottleTimeOut(fn, delay, immediate = false) {
  let timer = null;
  let called = false;

  return function (...args) {
    if(immediate && !called){
      fn.apply(this, args);
      called = true;
    }
    if (timer) {
      return;
    }
    timer = setTimeout(() => {
      fn.apply(this, args);
      timer = null;
    }, delay);
  }
}