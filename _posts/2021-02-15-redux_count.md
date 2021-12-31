---
date: 2021-02-15 13:56 +0800

title: redux 카운트 만들기,TypeError:Cannot read property 'number' of undefined

comments: false
categories:
  - react
tags:
  - react
  - redux
---

### 인프런 React & Express 를 이용한 웹 어플리케이션 개발하기

https://www.inflearn.com/course/react-%EA%B0%95%EC%A2%8C-velopert/dashboard  
섹션 4. 섹션 5. Redux 를 다 듣고 만들어본 카운터

![image](https://user-images.githubusercontent.com/49177223/107945090-757eed80-6fd2-11eb-96c0-36a21fa92dd1.png)

중간에 밑의 오류때문에 한참 찾았지만 결국 완성했다.  
아직 여기에 쓰인것들을 모두 이해한것은 아니지만 더 공부하면 이해할수있을거 같다.

---

store이 하는일

- dispath(action) : action을 reducer로 보낸다는것, 현재 자신의 상태와 받은 액션을
  디스 패치가 실행되면 스토어는 리듀서의 함수에 현재 자신의 상태와 방금 전달받은 액션을 전달해준다.
  그러면 리듀서가 어떠한 변화가 필요한지 알아내서 변화를 주면은 현 생태에 새로 갈아끼우는것이다.

- getState() : 현재 상태를 반환하는 함수
- subscribe(listener) : 상태가 바뀔때마다 실행할 함수를 등록하는것

---

### TypeError: Cannot read property 'number' of undefined 오류 해결

![image](https://user-images.githubusercontent.com/49177223/107945456-ff2ebb00-6fd2-11eb-8a02-7ed8c9284ae4.png)

이러한 오류가 코드에 이상이 없는데도 불구하고 계속 떠서 찾아보니
https://github.com/RealOrangeOne/react-native-mock/issues/139 이 링크에 따르면  
 `Note: React.PropTypes is deprecated as of React v15.5. Please use the prop-types library instead.` 라고 써있다.  
따라서 https://reactjs.org/docs/typechecking-with-proptypes.html 이 링크에 따라서

` import React, { Component, PropTypes } from 'react';`  
대신

```
import React, { Component } from 'react';
import PropTypes from "prop-types";
```

로 바꾸어 주면 해결된다.
