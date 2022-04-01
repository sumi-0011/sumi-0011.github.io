---

---



참고 : https://songsong.dev/entry/css-display-none-%EC%95%A0%EB%8B%88%EB%A9%94%EC%9D%B4%EC%85%98-%EC%88%98%EC%A0%95%ED%95%98%EA%B8%B0

display : none;

애니매이션 오류 해결하기



### 문제!!

display: none, -> block에는 transition 애니매이션이 적용되지 않는다. 

글새ㅓ 딱딱 귾어져 보여서 별로 좋지 않다. 



### 왜?

transition 애니매이션은 이전 프로퍼티의 상태와 이후 프로퍼티의 상태를 비교해 그 차이를 부드럽게 이어주는 것이다. 

하지만 `display`와 `visibility`는 숫자로 연산이 되지 않는다. 

따라서 transition 효과가 불가능한것이다. 





### 해결

1. keyframe animation 활용

transision 이 비교할 초기값이 없어 애니매이션이 불가능하다. 

반명 키 프레임 애니메이션은 초기값을 유저가 직접 할당하고 실행시키 때문에 동작이 가능하다. 



하지만 display : none -> block은 사능하지만 반대는 불가능

> none이 되었을 때 렌더 트리에서 바로 삭제해 버리기 때문



2. visibility 이용

display:none 과 달리 `visibility:hidden`은 화면에 보이지 않아도 공간을 차지하고 있다. 

따라서 `visibility:hidden`과 `visibility:none` 상태는 서로 비교가 가능하고 

따라서 transition animation을 사용할 수 있다.



3. pointer event활용

보통 display:none을 사용한 이유는 

화면상에 보이지 않고, 공간을 차지않고, 클릭이 안됬으면 좋겠어서 이다. 



따라서 화면상에 보이지만 않게 처리할거라면 `opacity:0`를 설정하고 마우스 클릭 이벤트를 없애버려도된다. 

이때 사용하는 것이 `pointer-event` 

보이지 않기를 원하는 요소에 `pointer-event:none`으로 지정하면 화면상에서 클릭했을 때 해당 영역은 잡히지 않는다. 

화면상에 다시 나타낼때에는 `pointer-event:auto`로 지정하면 된다. 