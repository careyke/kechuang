/**
 * 节流
 * @param {*} func 
 * @param {*} wait 
 * @param {*} options 默认leading=true,trailing=true
 */
export default function throttle(func, wait = 0, options = { leading: true, trailing: true }) {
    let timer = null;
    let result = null;
    let lastTime = 0;
    //这里头尾同时设置为false的时候没有意义，恢复成尾执行
    if(options.leading === false && options.trailing === false){
        options = {
            leading:false
        }
    }
    const throttled = function (...args) {
        const context = this;
        const now = Date.now();
        if (options.leading === false) { //跳过时间戳的方式，避免立马执行
            lastTime = now;
        }
        const remianTime = wait - (now - lastTime);
        if (remianTime <= 0 || remianTime > wait) { //时间戳的方式
            if (timer) {
                clearTimeout(timer);
                timer = null;
            }
            lastTime = now;
            result = func.apply(context, args);
        } else if (!timer && options.trailing !== false) {  //setTimeout方式，在头尾都设置成true时，确保只有一个执行
            timer = setTimeout(() => {
                timer = null;
                lastTime = Date.now();
                return func.apply(context, args);
            }, remianTime)
        }
        return result;
    }
    return throttled;
}

export function throttleTime(func, wait = 0) {
    let result = null;
    let lastTime = 0;
    const throttled = function (...args) {
        const now = Date.now();
        const context = this;
        if (now - lastTime > wait) {
            lastTime = now;
            result = func.apply(context, args);
        }
        return result;
    }
    return throttled;
}

export function throttleDelay(func, wait = 0) {
    let timer = null;
    const throttled = function (...args) {
        const context = this;
        if (!timer) {
            timer = setTimeout(() => {
                timer = null;
                return func.apply(context, args);
            }, wait)
        }
    }
    return throttled;
}