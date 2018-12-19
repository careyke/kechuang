/**
 * 冒泡排序
 * 从第一个元素开始，把当前元素和下一个索引元素进行比较。
 * 如果当前元素大，那么就交换位置，重复操作直到比较到最后一个元素，
 * 那么此时最后一个元素就是该数组中最大的数。下一轮重复以上操作，
 * 但是此时最后一个元素已经是最大数了，所以不需要再比较最后一个元素，只需要比较到 length - 1 的位置。
 * 时间复杂度 O(n*n)
 */
import { checkArray, exchange } from './sortUtils';

export default function bubbleSort(array) {
    if (!checkArray(array)) return;
    let len = array.length;
    for (let i = len - 1; i > 0; i--) {
        for (let j = 0; j < i; j++) {
            if (array[j] > array[j + 1]) exchange(array, j, j + 1);
        }
    }
    return array;
}