/**
 * 输入一个整数，输出该数二进制表示中1的个数。其中负数用补码表示。
 * 正数的原码、反码和补码是一样的
 * 负数的反码=原码符号位不变，其他位取反（0 ->1 ; 1->0 ）
 * 负数的补码=反码+1
 * 0的反码、补码都是0
 * 
 * 关键点：位运算,用1来进行位与（&）运算，返回值大于0就是符合的位数
 * 负数位运算是以补码参与运算的，运算之前都会转化成补码
 * 整数是4个字节 32个二进制位
 */

function NumberOf1(n) {
    if (n === 0) return 0;
    let count = 0, flag = 1;
    while (flag) {
        if (n & flag) count++;
        flag = flag << 1;
    }
    return count;
}

export const result11 = (function test(arr) {
    let r = arr.map((i) => {
        return NumberOf1(i);
    })
    console.log('the result of question11 is:', r);
})([10, -10]);