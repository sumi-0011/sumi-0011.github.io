---
layout: post


date: 2021-07-24 13:56 +0800


title: javascript30 - 07 - Array Cardio Day 2



categories: 
  - javascript30
tags: 
  - javascript30
  - web
  - study
comments: false
---



#### Array.prototype.some()

**some()** 메서드는 배열 안의 어떤 요소라도 주어진 판별 함수를 통과하는지 테스트합니다.

```js
arr.some(callback[, thisArg])
```



#### Array.prototype.every()

**every()** 메서드는 배열 안의 모든 요소가 주어진 판별 함수를 통과하는지 테스트합니다. Boolean 값을 반환합니다.

```
every(callbackFn, thisArg)
```

- `thisArg` Optional

  `callbackFn`을 실행할 때 `this`로 사용하는 값.



#### Array.prototype.find()

**find()** 메서드는 주어진 판별 함수를 만족하는 **첫 번째 요소**의 **값**을 반환합니다. 그런 요소가 없다면 [undefined](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/undefined)를 반환합니다.



Find is like filter, but instead returns just the one you are looking for

find the comment with the ID of 823423

```
arr.find(callback[, thisArg])
```



#### Array.prototype.findIndex()

**findIndex()** 메서드는 **주어진 판별 함수를 만족하는** 배열의 첫 번째 요소에 대한 **인덱스**를 반환합니다. 만족하는 요소가 없으면 -1을 반환합니다.

```
arr.findIndex(callback(element[, index[, array]])[, thisArg])
```

- callback

  3개의 인수를 취하여 배열의 각 값에 대해 실행할 함수입니다.

  - `element`

    배열에서 처리중인 현재 요소입니다.

  - `index`

    배열에서 처리중인 현재 요소의 인덱스입니다.

  - `array`

    findIndex 함수가 호출된 배열입니다.

- thisArg

  선택 사항. 콜백을 실행할 때 this로 사용할 객체입니다.



출처 : https://developer.mozilla.org/ko/

---

#### javascript30 - 07 - Array Cardio Day 2

**문제**

1.  Array.prototype.some() // is at least one person 19 or older?

   ```js
    isAdult = people.some(el => ((new Date().getFullYear()) - el.year) >=19);
    console.log({isAdult}) ;
   ```

   

2.  Array.prototype.every() // is everyone 19 or older?

   ```js
   allAdult = people.every(el => ((new Date().getFullYear()) - el.year) >=19);
   console.log({allAdult}) ;
   ```

   

3. Find is like filter, but instead returns just the one you are looking for find the comment with the ID of 823423

   ```js
   result1 = comments.find(el => el.id ==823423 );
   console.log(result1);
   ```

   

4. Find the comment with this ID 

   ```js
   result2 = comments.findIndex(el => el.id == 823423);
   console.log(result2);
   ```

   

5. delete the comment with the ID of 823423

   4번에서 index를 찾아서 그 인덱스의 객체를 제거한다. 

    ```js
    const newComments = [
        ...comments.slice(0, index),
        ...comments.slice(index + 1)
    ];
    
    ```

   

##### 결과 화면

![image](https://user-images.githubusercontent.com/49177223/126852655-75cd7b69-8f2c-4430-a906-12de13c58353.png)

