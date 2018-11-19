/**
 * 防抖
 * 在一定时间内，连续执行某个操作时，该动作只会触发一次
 * 当调用动作过n毫秒之后才会执行，在等待时间如果继续触发这个函数，会重置等待时间
 * @param {*} func 
 * @param {*} wait 
 * @param {*} headerCalled 
 */
export default function debounce(func, wait = 0, headerCalled = false) {
    let timer = null;
    let result = null;

    const debounced = function (...args) {  //涉及到原始函数的this的取值，不能用箭头函数
        const context = this;
        if (timer) clearTimeout(timer);
        if (headerCalled) { //先执行，后延时
            let hasCalled = !!timer;
            if (!hasCalled) {
                result = func.apply(context, args);
            }
            timer = setTimeout(() => {
                timer = null;
            }, wait)
        } else { //先延时，后执行
            timer = setTimeout(() => {
                return func.apply(context, args);
            }, wait)
        }
        return result;
    }

    debounced.cancel = function () {
        clearTimeout(timer);
        timer = null;
    }

    return debounced;
}