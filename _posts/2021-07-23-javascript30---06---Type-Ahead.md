---
date: 2021-07-23 13:56 +0800

title: javascript30 - 06 - Type Ahead

categories:
  - javascript30
tags:
  - javascript30
  - web
  - study

comments: false
---

---

### 06 - Type Ahead

---

##### json파일에서 정보를 추출하기

fetch를 이용해서 endpoint라는 json경로에서 object객체를 추출해 배열에 저장시켜준다.

```js
const endpoint =
  "https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json";
const cities = [];
// json파일에서 추출하여 cities배열에 저장
fetch(endpoint)
  .then((response) => response.json())
  .then((data) => cities.push(data));
```

---

##### 특정 문자열을 포함하는 도시만을 찾기

기준에 따라 배열에서 골라내는 것은 filter을 이용하면 되는데

그중 기준을 ''특정 문자열을 포함'' 으로 하려면 .includes()메서드를 사용하면 된다.

> [includes()](https://www.codingfactory.net/10899)는 문자열이 특정 문자열을 포함하는 지 확인하는 메서드
>
> 문법 : string.includes( searchString, length )
>
> - searchString : 검색할 문자열로 필수 요소입니다. 대소문자를 구분합니다.
> - length : 검색을 시작할 위치입니다. 선택 요소로, 값이 없으면 전체 문자열을 대상으로 합니다.

---

##### 정규식 사용 RegExp

```js
var wordReg = new RegExp(wordToMatch, "gi");
```

###### ExgExp 메소드

| **Method** | **Description**                                                                                                                       |
| ---------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| exec       | 매칭된 문자열을 찾기 위한 메소드입니다. 매칭된 문자열이 있다면 매칭된 값의 배열을 리턴하고, 매칭된 문자열이 없다면 null을 리턴합니다. |
| test       | 매칭된 문자열이 있는지 확인하기 위한 메소드입니다. 매칭된 문자열이 있다면 ture를 리턴하고, 매칭된 문자열이 없다면 false를 리턴합니다. |

ex) ` var myArray = /d(b+)d/g.exec('cdbbdbsb');`

출처: https://beomy.tistory.com/21 [beomy]

---

알게된것

- `Document.querySelector()`는 제공한 선택자 또는 선택자 뭉치와 일치하는 문서 내 첫 번째 [Element](https://developer.mozilla.org/ko/docs/Web/API/Element)를 반환합니다. 일치하는 요소가 없으면 `null`을 반환합니다.

- cities.push(...data)와 cities.push(data)의 차이 ?

- **join()** 메서드는 배열의 모든 요소를 연결해 하나의 문자열로 만듭니다.

---

#### 완성본

<iframe height="300" style="width: 100%;" scrolling="no" title="06 - Type Ahead [js30]" src="https://codepen.io/sumi-0011/embed/wvdrpJq?default-tab=result" frameborder="no" loading="lazy" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href="https://codepen.io/sumi-0011/pen/wvdrpJq">
  06 - Type Ahead [js30]</a> by sumi (<a href="https://codepen.io/sumi-0011">@sumi-0011</a>)
  on <a href="https://codepen.io">CodePen</a>.
</iframe>
