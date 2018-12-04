/**
 * 把一个数组最开始的若干个元素搬到数组的末尾，我们称之为数组的旋转。
 * 输入一个非减且排序的数组的一个旋转，输出旋转数组的最小元素。
 * 例如数组{3,4,5,1,2}为{1,2,3,4,5}的一个旋转，该数组的最小值为1。
 * NOTE：给出的所有元素都大于0，若数组大小为0，请返回0。
 */

function minNumberInRotateArray(rotateArray) {
    let len = rotateArray.length;
    if (len === 1) return rotateArray[0];
    if (len === 2) return rotateArray[1];
    let mid = Math.floor(len / 2);
    let left = 0;
    if (rotateArray[mid] >= rotateArray[left]) {
        return minNumberInRotateArray(rotateArray.slice(mid));
    } else {
        return minNumberInRotateArray(rotateArray.slice(left, mid + 1));
    }
}

const arr = [6501,6828,6963,7036,7422,7674,8146,8468,8704,8717,9170,9359,9719,9895,9896,9913,9962,154,293,334,492,1323,1479,1539,1727,1870,1943,2383,2392,2996,3282,3812,3903,4465,4605,4665,4772,4828,5142,5437,5448,5668,5706,5725,6300,6335];

export const result05 = (function test(arr) {
    let r = minNumberInRotateArray(arr);
    console.log('the result of question05 is:', r);
})(arr);