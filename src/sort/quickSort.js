/**
 * 快速排序
 * 先找一个基准值v，一般是找数组中的第一个值。然后将i=0，j=length-1,
 * 然后从j开始从后往前找，直到找到第一个比v小的值，然后将i和j的值替换，
 * 然后从i开始从前往后找，直到找到第一个比v大的值，然后将i和j的值替换，
 * 然后j--继续查找，直到i==j才结束第一次循环，基准值左边的值都比他小，右边都比他大。
 * 然后取左右两边的数组继续递归执行
 */
import { checkArray, exchange } from './sortUtils';

export function quickSort(array) {
    if (!checkArray(array)) return;

    const sort = (array, left = 0, right = array.length - 1) => {
        if (left >= right) return;
        let i = left, j = right, baseIndex = i;
        const baseVal = array[baseIndex];
        while (i < j) {
            while (j > i) {
                if (array[j] < baseVal) {
                    exchange(array, i, j);
                    baseIndex = j;
                    break;
                }
                j--;
            }
            while (i < j) {
                if (array[i] > baseVal) {
                    exchange(array, i, j);
                    baseIndex = i;
                    break;
                }
                i++;
            }
            j--;
        }
        sort(array, left, baseIndex - 1);
        sort(array, baseIndex + 1, right);
    }
    sort(array);
    return array;
}