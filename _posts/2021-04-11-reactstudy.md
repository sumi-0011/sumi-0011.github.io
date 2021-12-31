---
date: 2021-04-11 13:56 +0800

title: DataBase - STANDARD JOIN
comments: false
categories:
  - react
tags:
  - react
  - study
---

#### 2021/04/11일 react study

- 주제 : https://heekang2271.github.io/react-study/array/

### [함수설명]

- cloneBySelf : 배열 안에 있는 각각의 숫자들 뒤에 자기 자신을 한 번 더 붙인 숫자들로 새로운 배열을 만듭니다.
- sortDescending : 배열 안에 있는 숫자들을 내림차순으로 정렬합니다.
- moreThanFifty : 배열 안에 있는 숫자들 중 50보다 큰 숫자만 뽑아 새로운 배열을 만듭니다.
- sumAll : 배열 안에 있는 모든 숫자를 더해 그 값을 반환합니다.
- divide : sumAll의 결과의 앞에 0 3개, 뒤에 0 4개를 붙인 문자열을 만들고 이를 각 자리수별로 나누어 새로운 배열을 만듭니다.

#### [처음 코드]

```js
class ArrayFunctions {
  /* 여기에 함수를 작성하면 됩니다. */
}

/* 이 밑으로는 아무것도 작성하면 안됩니다. */

const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];

const cloneNumbers = ArrayFunctions.cloneBySelf(numbers);
console.log(cloneNumbers);

const sortNumbers = ArrayFunctions.sortDescending(cloneNumbers);
console.log(sortNumbers);

const moreThanFifty = ArrayFunctions.moreThanFifty(sortNumbers);
console.log(moreThanFifty);

const sumAll = ArrayFunctions.sumAll(moreThanFifty);
console.log(sumAll);

const divide = ArrayFunctions.divide(sumAll);
console.log(divide);
```

1. **cloneBySelf** : 배열 안에 있는 각각의 숫자들 뒤에 자기 자신을 한 번 더 붙인 숫자들로 새로운 배열을 만듭니다.

   ```js
   static cloneBySelf = (arr) => {
   for (var i in arr) arr[i] *= 11;
   return arr;
   };
   ```

   나는 처음에 위코드로 풀었는데 arr[i] = arr[i] \*10 +arr[i]와 같으니까...  
   나중에 스터디 원들이 푼것을 보고 고친것 밑의 코드이다.

   `static cloneBySelf = (numbers) => numbers.map((num)=>num*10+num);`

   map을 사용하면 더 간단하게 된다는 것을 알게되었고, react에서는 특히 많이 쓰인다고 해서 이 방법을 더 익혀봐야겠다고 생각했다.

2. sortDescending : 배열 안에 있는 숫자들을 내림차순으로 정렬합니다.

   ```js
    static sortDescending = (cloneNumbers) => {
      cloneNumbers.sort(function (a, b) {
        return b - a;
      });
    return cloneNumbers;
    };
   ```

   이것을 더 간단하게 하면 밑처럼 바꿀수있다.

   ```js
   static sortDescending = (numbers)  => numbers.slice().sort((a,b) => b-a);
   ```

   - slice는 깊은 복사를위해 사용하는 것이고,
   - sort를 arrow 함수를 이용해 내림차순으로 정렬한다.

   ```
   function (a, b) {
     return b - a;
   }
   ```

   `(a,b) => b-a`  
    위의 두 코드는 내용이 같다. (es6)

3. moreThanFifty : 배열 안에 있는 숫자들 중 50보다 큰 숫자만 뽑아 새로운 배열을 만듭니다.

- 나의 처음 코드
  ```js
  static moreThanFifty = (arr) => {
    var t = arr.findIndex((e) => {
      if (e < 50) return true;
    });
    return arr.slice(0, t);
  };
  ```
  수정후
  ````js
  static moreThanFifty = (arr) => {
    return arr.filter(num => num >50);
  }
  ```js
  - filter 함수를 사용해 num이 50보다 큰 숫자만 거른 배열을 리턴한다.
  - findIndex함수 : https://hianna.tistory.com/405
  - filter 함수 : https://hianna.tistory.com/406
  ````

4.  sumAll : 배열 안에 있는 모든 숫자를 더해 그 값을 반환합니다.

    ```js
    static sumAll = (arr) =>
      arr.reduce(function add(sum, currValue) {
        return sum + currValue;
      }, 0);
    ```

    위 코드 또한 아래 코드와 같이 바꿀수 있다.

    ```js
    static sumAll = (arr) => arr.reduce((sum, currValue) => (sum += currValue), 0);
    ```

    - reduce함수를 이용해서 합계 그러니까 누적 합계를 구할수 있다.
    - reduce 함수의 두번째 인자값은 여기선 sum의 초기값을 나타내고, 입력하지 않으면 default값은 0이다.
    - reduce 함수 : https://hianna.tistory.com/408

5.  divide : sumAll의 결과의 앞에 0 3개, 뒤에 0 4개를 붙인 문자열을 만들고 이를 각 자리수별로 나누어 새로운 배열을 만듭니다.
    ```js
    static divide = (n) => {
      return ("000" + n + "0000").split("");
    };
    ```
    위처럼 사용할수도 있지만 es6문법을 이용하면 아래와 같이 더 깔끔하게 구현할수 있다. ( ` )사용!
    ```js
    static divide = (n) => `000${n}0000`.split("");
    ```

#### [최종 코드]

```js
class ArrayFunctions {
  /* 여기에 함수를 작성하면 됩니다. */
  static cloneBySelf = (numbers) => numbers.map((num) => num * 10 + num);
  static sortDescending = (numbers) => numbers.slice().sort((a, b) => b - a);

  static moreThanFifty = (arr) => {
    return arr.filter((num) => num > 50);
  };

  static sumAll = (arr) =>
    arr.reduce((sum, currValue) => (sum += currValue), 0);

  static divide = (n) => `000${n}0000`.split("");
}

/* 이 밑으로는 아무것도 작성하면 안됩니다. */

const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];

const cloneNumbers = ArrayFunctions.cloneBySelf(numbers);
console.log(cloneNumbers);

const sortNumbers = ArrayFunctions.sortDescending(cloneNumbers);
console.log(sortNumbers);

const moreThanFifty = ArrayFunctions.moreThanFifty(sortNumbers);
console.log(moreThanFifty);

const sumAll = ArrayFunctions.sumAll(moreThanFifty);
console.log(sumAll);

const divide = ArrayFunctions.divide(sumAll);
console.log(divide);
```
