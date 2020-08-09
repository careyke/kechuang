/**
 * forEach
 */
Array.prototype.myForEach = function (fn, context) {
  const len = this.length;
  for (let i = 0; i < len; i++) {
    fn.call(context, this[i], i, this);
  }
}

var a=[1,2,3];
a.myForEach((v)=>{
  console.log(v);
})