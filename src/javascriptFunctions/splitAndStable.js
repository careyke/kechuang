/**
 * 负数在前面，正数在后面 0保持不动
 * kechuang
 */
export default function splitAddStable (arr) {
  const zeroArr = []
  const leftArr = []
  const rightArr = []
  arr.forEach((v, i) => {
    if (v === 0) return
    v > 0 ? rightArr.push(v) : leftArr.push(v)
    zeroArr.push(i)
  })
  let leftLen = leftArr.length
  zeroArr.forEach((v, i) => {
    arr[v] = i < leftLen ? leftArr[i] : rightArr[i - leftLen]
  })
  return arr
}
