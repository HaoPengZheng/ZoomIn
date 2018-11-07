import XLSX from "xlsx";
let wb; //读取完成的数据
let rABS = false; //是否将文件读取为二进制字符串

//将二维数组转换成一维数组对象
export const converterTwoDimArrayToObjectArray=function(array){
  let key = array[0];
  console.log(key);
  let data = [];
  for(let i = 1;i<array.length;i++){
    let object = new Object();
    for(let j=0;j<key.length;j++){
      if(array[i][j]==undefined){
        array[i][j]="";
      }
      let k = key[j].trim();
      if(k==""){
        k="Empty"+j;
      }
      object[k]=array[i][j];
    }
    data.push(object)
  }
  return data;
}
// 将上传的文件转化成JSON
export const converterFileToJson = async function (obj) {
  let jsonPromise = await importf(obj);
  return jsonPromise;
}

export const importf = function (obj) {
  return new Promise((resolve, reject) => {
    if (!obj.files) {
      return;
    }
    var f = obj.files[0];
    var reader = new FileReader();
    let _this = this;
    let tablejsons;
    reader.onload = function (e) {
      var data = e.target.result;
      if (rABS) {
        wb = XLSX.read(btoa(fixdata(data)), {
          //手动转化
          type: "base64"
        });
      } else {
        wb = XLSX.read(data, {
          type: "binary"
        });
      }
      //wb.SheetNames[0]是获取Sheets中第一个Sheet的名字
      //wb.Sheets[Sheet名]获取第一个Sheet的数据
      tablejsons = XLSX.utils.sheet_to_json(
        wb.Sheets[wb.SheetNames[0]],
        {
          blankRows: false,
          defval: ""
        }
      );
      converterJsonBlank(tablejsons);
      resolve(tablejsons);
    };

    if (rABS) {
      reader.readAsArrayBuffer(f);
    } else {
      reader.readAsBinaryString(f);
    }
  })
}
const fixdata = function (data) {
  //文件流转BinaryString
  var o = "",
    l = 0,
    w = 10240;
  for (; l < data.byteLength / w; ++l)
    o += String.fromCharCode.apply(
      null,
      new Uint8Array(data.slice(l * w, l * w + w))
    );
  o += String.fromCharCode.apply(null, new Uint8Array(data.slice(l * w)));
  return o;
}
const converterJsonBlank = function (objArray) {
  objArray.forEach(element => {
    for (let key in element) {
      element[key] = element[key].trim();
    }
  });
}