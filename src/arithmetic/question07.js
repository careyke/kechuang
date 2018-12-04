/**
 * 大家都知道斐波那契数列，现在要求输入一个整数n，请你输出斐波那契数列的第n项（从0开始，第0项为0）。
 * n<=39
 * 
 * 递归虽然代码简单，但是嵌套的层数太多，容易溢出堆栈
 */

function Fibonacci(n) {
    if (n <= 1) return n;
    let v0 = 0, v1 = 1, v;
    for (let i = 2; i <= n; i++) {
        v = v0 + v1;
        v0 = v1;
        v1 = v;
    }
    return v;
}

export const result07 = (function test(n) {
    let r = Fibonacci(n);
    console.log('the result of question07 is:', r);
})(19);