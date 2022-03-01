---
layout: single


date: 2022-02-18 20:09 +0800

title: 💡 event.target과 event.currentTarget의 차이는 무엇일까?

  
comments: true
categories: 
  - TIL
tags: 
  - TIL
  

---



day : 2022.03.01

event.target과 event.currentTarget의 차이는 무엇일까?

React를 이용해서 onClick 핸들러를 구현하다가 의문이 들게되었다. 

그래서 React onClick 이벤트에서 event.target과 event.currentTarget의 차이점을 정리해보려고 한다. 

MDN문서를 보면

```
event.currentTarget == the element to which the event handler has been attached.
```

이라고 적혀져 있는데

여기서 중요한 것은 event.currentTarget은 이벤트 핸들러가 부착된 것을 가리킨다는 것이다.



즉, event.target은 부모로부터 이벤트가 위임되어 발생하는 자식의위치, 내가 클릭한 자식요소를 반환하는데

currentTarget은 이벤트가 부착된 부모의 위치를 반환한다는 것이다. 



```
<button onClick={onClick} >
	<span>BTN</span>
</button>

const onClick = () => {

}
```

이 있을때 span을 click하게 되면 