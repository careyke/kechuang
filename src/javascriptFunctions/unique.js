/**
 * 数组去重
 * 测试数组
 * const arr = [1, 1, '1', '1', null, null, undefined, undefined, new String('1'), new String('1'), /a/, /a/, NaN, NaN]
 */
const arr = [1, 1, '1', '1', null, null, undefined, undefined, new String('1'), new String('1'), /a/, /a/, NaN, NaN];
export default function exeUnique() {
    console.log('origin array:', arr);
    console.log('unique array:', unique(arr));
}

export function unique(arr) {
    // return uniqueByIndexOf(arr);
    // return uniqueByIndexOfFilter(arr);
    return uniqueBySort(arr);
    // return uniqueBySortFilter(arr);
    // return uniqueByObject(arr);
    // return uniqueBySet(arr);
}

const uniqueByIndexOf = (arr) => {
    if (arr.length < 2) {
        return arr;
    }
    let targetArr = [];
    arr.forEach((item) => {
        if (targetArr.indexOf(item) === -1) {
            targetArr.push(item);
        }
    })
    return targetArr;
}

const uniqueByIndexOfFilter = (arr) => {
    if (arr.length < 2) {
        return arr;
    }
    return arr.filter((item, index, arr) => {
        return arr.indexOf(item) === index;
    })
}

const uniqueBySort = (arr) => {
    if (arr.length < 2) {
        return arr;
    }
    let targetArr = [];
    let sortedArr = arr.slice(0).sort();  //sort方法在对特殊类型进行排序时会出现结果错乱的问题
    sortedArr.forEach((item, index) => {
        if (index === 0) {
            targetArr.push(item);
        } else {
            if (sortedArr[index - 1] !== item) {
                targetArr.push(item);
            }
        }
    })
    return targetArr;
}

const uniqueBySortFilter = (arr) => {
    if (arr.length < 2) {
        return arr;
    }
    let sortedArr = arr.slice(0).sort();  //sort方法在对特殊类型进行排序时会出现结果错乱的问题
    return sortedArr.filter((item, index) => {
        return !index || item !== sortedArr[index - 1];
    })
}

const uniqueByObject = (arr) => {
    if (arr.length < 2) {
        return arr;
    }
    let object = {};
    return arr.filter((item) => {
        let key = typeof item + JSON.stringify(item);
        return object.hasOwnProperty(key) ? false : (object[key] = true);
    })
}

const uniqueBySet = (arr) => {
    if (arr.length < 2) {
        return arr;
    }
    return [...new Set(arr)];
}
