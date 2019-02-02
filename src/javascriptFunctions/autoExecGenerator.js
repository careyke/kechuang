/**
 * 自定执行generator
 * 参考co模块
 */
function autoExecGenerator(generator) {
    let context = this;
    let args = Array.prototype.slice.call(arguments, 1);
    return new Promise((resolve, reject) => {
        let gen;
        if (typeof generator === 'function') gen = generator.apply(context, args);
        if (!gen || typeof gen.next !== 'function') return resolve(gen);
        const onFulfilled = (res) => {
            let result;
            try {
                result = gen.next(res);
            } catch (error) {
                return reject(error);
            }
            next(result);
        }
        const onReject = (err) => {
            let result;
            try {
                result = gen.throw(err);  //顺带执行下一次next
            } catch (error) {
                return reject(error);
            }
            next(result);
        }
        const isPromise = (obj) => {
            return 'function' == typeof obj.then;
        }
        const next = (result) => {
            if (result.done) return resolve(result.value);
            let { value } = result;
            //这里有一个toPromise的逻辑，这里简化处理不做。可以参看co源码
            if (value && isPromise(value)) return value.then(onFulfilled, onReject);
            return onReject(new TypeError('You may only yield a function, promise, generator, array, or object, '
                + 'but the following object was passed: "' + String(result.value) + '"'));
        }

        //begin exe generator
        onFulfilled();
    })
}

function* gen() {
    let r1,r2,r3;
    // try{
    //     r1 = yield Promise.resolve(1);
    //     r2 = yield Promise.reject(2);
    //     r3 = yield Promise.resolve(3);
    // } catch(e) {
    //     console.log('throw err',e)
    // }
    r1 = yield Promise.resolve(1);
    try{
        r2 = yield Promise.reject(2);
    } catch(e) {
        console.log('throw err',e)
    }
    r3 = yield Promise.resolve(3);
    console.log('results:', [r1, r2, r3]);
    return [r1, r2, r3];
}

export default function textCO(){
    autoExecGenerator(gen).then((res)=>{console.log(res)})
}
