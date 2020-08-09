// Promise.allFinally = function(promiseArr){
//   return new Promise(function(resolve, reject){
//     const result = [];
//     const len = promiseArr.length;
//     for(let p of promiseArr){
//       Promise.resolve(p).then((value)=>{
//         result.push({status:'fulfilled', value: value});
//         if(result.length === len){
//           resolve(result);
//         }
//       },(reason)=>{
//         result.push({status:'rejected', reason: reason});
//         if(result.length === len){
//           resolve(result);
//         }
//       })
//     }
//   });
// }

function convert(list,parentKey,key,rootId){
  const map = new Map();
  const res={id:rootId}

  // 构建id映射
  list.reduce((object,item)=>{
    object.set(item[key] , item);
    return object;
  },map);

  console.log(map);

  for(let item of list){
    if(item[parentKey] === rootId){
      res.children = res.children || [];
      res.children.push(item);
      continue;
    }
    let parentNode = map.get(item[parentKey]);
    if(parentNode){
      parentNode.children = parentNode.children || [];
      parentNode.children.push(item);
    }
  }

  return res;
}
let list = [
  { id: 1, name: '部门A', parentId: 0 },
  { id: 2, name: '部门B', parentId: 0 },
  { id: 3, name: '部门C', parentId: 1 },
  { id: 4, name: '部门D', parentId: 1 },
  { id: 5, name: '部门E', parentId: 2 },
  { id: 6, name: '部门F', parentId: 3 },
  { id: 7, name: '部门G', parentId: 2 },
  { id: 8, name: '部门H', parentId: 4 }
];
console.log(convert(list,'parentId','id',0));