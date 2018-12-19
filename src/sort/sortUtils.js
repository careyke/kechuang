/**
 * 排序通用的方法
 */

export function checkArray(array) {
    if (array && array.length > 2) return true;
    return false;
}

export function exchange(array, left, right) {
    let temp = array[left];
    array[left] = array[right];
    array[right] = temp;
}