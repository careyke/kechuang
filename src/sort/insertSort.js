/**
 * 插入排序
 * 从数组的第二个元素开始，依次将每个元素都取出来，将该元素插入到这个数据和前面所有数据组成的数组的正确位置上。
 * 时间负责度O(n*n)
 */
import { checkArray, exchange } from './sortUtils';

export default function insertSort(array) {
    if (!checkArray(array)) return;
    let len = array.length;
    for (let i = 1; i < len; i++) {
        for (let j = i - 1; j >= 0; j--) {
            if (array[j] > array[j + 1]) exchange(array, j, j + 1);
        }
    }
    return array;
}