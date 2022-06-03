let _ = require('underscore');
let arr = [3, 6, 9, 10, 12];
console.log(arr[0]);
console.log(_.first(arr));
console.log(arr[arr.length-1]);
console.log(_.last(arr));

//npm init으로 패키지구축 후
//모듈을 사용할 패키지를 설치하려면
//npm install underscore 후
//dependency에 들어가져 있는지 확인할것