---
layout: post

date: 2021-07-28 13:56 +0800

categories: 
  - javascript30
tags: 
  - javascript30
  - web
  - study

title: javascript30 -17 - Sort Without Articles

comments: false
---


---





#### 프로젝트 내용

정규 표현식을 이용하여, array의 텍스트를 수정(replace)한 상태에서 알파벳 순으로 정렬(sort)한 후, 웹페이지에 < li >로 보여주는 내용



---

#### 정규식 사용



##### 정규식을 만드는 방법

1. ` var re = /ab+c/;`
2. `var re = new RegExp("ab+c");` : 정규식 패턴이 바뀌는 경우 동적으로 정규식을 바꿀수 있다. 

이중에 1번째 방법을 사용



##### 정규식 패턴 만들기

앞의 접두사 an, a, the를 없앨려고 하므로

- 시작문자열을 의미하는 ^
- (a | an | the) : a나 an이나 the
- /i는 flag중 하나로 대소문자 구별없이 검색한다는 의미이다. 

이러한 정규식 패턴에 맞는 부분을 빈문자열로 바꾸어주어 접두사를 제거한다. 



따라서 

```js
replace(/^(a | an | the)/i, '').trim() 
```

이 된다. trim은 양쪽 빈공간을 없애주는 함수이다. 



#### 접두사 제거후 정렬

`const sortedBands = bands.sort((a, b) => strip(a) > strip(b) ? 1 : -1);`



#### 완성본

<iframe height="300" style="width: 100%;" scrolling="no" title="" src="https://codepen.io/sumi-0011/embed/xxdWbjJ?default-tab=js%2Cresult" frameborder="no" loading="lazy" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href="https://codepen.io/sumi-0011/pen/xxdWbjJ">
  </a> by sumi (<a href="https://codepen.io/sumi-0011">@sumi-0011</a>)
  on <a href="https://codepen.io">CodePen</a>.
</iframe>