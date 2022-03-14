---

date: 2022-03-14 20:09 +0800

title: 💡 Query String 쿼리스트링이란?

  
comments: true
categories: 
  - TIL
tags: 
  - TIL
  
---



## Query String **쿼리 스트링이란?**

사용자가 입력 데이터를 전달하는 방법 중의 하나로, 

url주소에 미리 협의된 데이터를 parameter을 통해 넘기는 것을 말한다. 



```
http:locahost/path?querystring
```

query parameter을 뒤에 덧붙여서 추가적인 정보를 서버측에 전달하는것

클라이언트가 어떤 특정 리소스에 접근하고 싶어하는지 정보를 담는다. 



- 정해진 엔드포인트 주소 이후에 ? 을 쓰는 것으로 query string이 시작함을 알고

- parameter=value (key-value 형식)으로  필요한 파라미터의 값을 적는다. 

- parameter가 여러개인 경우 `&`을 이용해서 여러개의 parameter을 넘길 수 있다. 

  `http:locahost/path?name=sumi&age=23`

  



#### 참고

https://velog.io/@pear/Query-String-%EC%BF%BC%EB%A6%AC%EC%8A%A4%ED%8A%B8%EB%A7%81%EC%9D%B4%EB%9E%80
