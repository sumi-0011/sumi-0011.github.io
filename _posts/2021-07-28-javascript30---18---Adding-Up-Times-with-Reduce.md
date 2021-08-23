---
layout: post


date: 2021-07-28 13:56 +0800

title: javascript30 - 18 - Adding Up Times with Reduce

categories: 
  - javascript30
tags: 
  - javascript30
  - web
  - study
comments: false
---
---


#### 프로젝트 목표

ulist의  video 목록의 time을 모두 더해서 h​ : m:  ​s 형식으로 콘솔에 나타내어라



---

#### reduce()

이를테면 누산기, 

배열의 각 요소에 대해 주어진 **리듀서**(reducer) 함수를 실행하고, 하나의 결과값을 반환한다. 

`arr.reduce(callback[, initialValue])`



reducer함수 예시 : `const reducer = (accumulator, currentValue) => accumulator + currentValue;`

- accumulator : 누적값

- currentValue : 현재 값



#### Array.from()

유사 배열 객체(array-like object)나 반복 가능한 객체(iterable object)를 얕게 복사해 새로운`Array` 객체로 만든다. 

Array.from()를 이용하여 Nodelist등을 array로 변환하여 map, reduce메서드를 사용할수 있게 한다. 



---



##### 다시 찾아본것

- **split()** 메서드 

  const chars = str.split('');

- dataset사용법

  `   <li data-time="5:21">` => item.dataset.time

- Int변환 방법

  parseInt(variable);



---

#### 완성 코드

```js
const li_list = Array.from(document.querySelectorAll('.videos li'))

result = li_list.map(item => item.dataset.time).map(times=> {
	const [m,s] = times.split(":");
	return parseInt(m)*60 + parseInt(s);
}).reduce(reducer,0);

function reducer(acc,item) {
	return acc + item;
}
const h  = parseInt(result/(60*60));
const m  = parseInt((result - h*3600) /60);
const s = result %60;
console.log(h,m,s);
```







