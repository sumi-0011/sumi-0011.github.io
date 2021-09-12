    layout: post


​    
​    date: 2021-09-01 03:48 +0800
​    
    title: 여러가지


​      
​    comments: true
​    categories: 
​      - 
​    tags: 
​      - 

## [목차]


- [종료조건 확인](#-------)
- [react](#react)
    + [Immutability](#immutability)



#### 종료조건 확인

입력의 종료조건으로 맨 마지막에 점 하나(".")가 들어온다.

```py
import sys
while True:
    s = sys.stdin.readline().strip('\n')
    if(s == '.'):
        break;
    print(s
    
```

---







# react

### JavaScript Immutability



> ####  Immutability ?

 = 불변성

 = 데이터의 원본이 훼손되는 것을 막는 것



JavaScript는 값이 바뀌지 않는 원시 데이터 타입과 값이 바뀔 수 있는 객체 타입(Object)을 다르게 취급한다.



**Data Type**

 \- 원시 데이터 타입 (Primitive) : Number, String, Boolean, Null, Undefined, Symbol...

 \- 객체 타입 (Object) : Object, Array, Function...



> #### 원본객체를 수정하지 않고 복제본을 수정하는 방법

```
var o1 = {name:'kim', score:[1,2]}
var o2 = Object.assign({}, o1);
o2.score = o2.score.concat(); // o2.score를 복제
o2.score.push(3);
console.log(o1, o2, o1 === o2, o1.score === o2.score);
// {name:'kim', score:[1,2]} {name:'kim', score:[1,2,3]} false false
```



**- Nested Data의 복제 (concat)**

Object가 Object 형태로 내부 property를 갖고 있는 경우 **Nested Data (중첩된 데이터)라고** 부른다.

아래와 같이 Array(Object)를 property로 가지고 있는 경우, 해당 값 변경 시 원본 데이터 값이 영향을 받게 된다.

따라서 Object와 내부 property 값도 복제(concat)해서 사용해야 원본 데이터를 유지할 수 있다.

 

이렇게 JS는 함수의 파라미터의 인자가 원시 데이터인지 객체인지에 따라 동작 방법이 달라진다.

따라서 아래와 같이 함수를 정의할 때 원본 데이터를 유지할 것인지 아닌지에 따라 **assign, concat** 함수를 통해 불변성을 유지해야 한다.

```
// function fn(person){
//     person = Object.assign({}, person);
//     person.name = 'lee';
//     return person;
// }
// var o1 = {name:'kim'}
// var o2 = fn(o1);
// console.log(o1, o2);
 
function fn(person){
    person.name = 'lee';
}
var o1 = {name:'kim'}
var o2 = Object.assign({}, o1);
fn(o2);
console.log(o1, o2); // {name:'kim'} {name:'lee'}
var score = [1,2,3];
var a = score;
var b = score;
// 1~
// score.push(4);
var score2 = score.concat(4);
console.log(score, score2, a, b); // [1,2,3] [1,2,3,4] [1,2,3] [1,2,3]
```



> #### **const vs Object.freeze ?**

const : name이 가리키는 값을 다른 것으로 못 바꾸게 하는 것

Object.freeze : 값 자체를 못 바꾸게 하는 것

 

따라서 const와 freeze를 적재적소에 활용하면 값을 불변하게 유지할 수 있다.



출처 : https://geniee.tistory.com/6



---

### JSX

> #### JSX란

`const element = <h1>Hello, world!</h1>;`와 같이 사용한다. 

=> js에 대한 구문확장



```jsx
function formatName(user) {
  return user.firstName + ' ' + user.lastName;
}

const user = {
  firstName: 'Harper',
  lastName: 'Perez'
};

const element = (
  <h1>
    Hello, {formatName(user)}!
  </h1>
);

ReactDOM.render(
  element,
  document.getElementById('root')
);
```

이와 같이 사용할수 있다. 

또한 **JSX도 표현**이기 때문에 컴파일후 JSX표현식은 일반 javascript 함수 호출이 되어서 javascript 객체로 평가가 된다. 

따라서 if, for 을 사용하고, 함수에서 반환할수 있다. 





> ####  JSX로 React 시도하는법

![image](https://user-images.githubusercontent.com/49177223/131799683-29953008-3c1f-4754-8066-3693d9de029e.png)

```react
const element = (
  <h1 className="greeting">
    Hello, world!
  </h1>
);
const element = React.createElement(
  'h1',
  {className: 'greeting'},
  'Hello, world!'
);
```

또한 위의 두 예제는 동일하다. 위는 jsx, 밑은 react



> React.createElement()

React.createElement()는 기본적으로 밑과 같은 객체를 생성한다. 

```react
// Note: this structure is simplified
const element = {
  type: 'h1',
  props: {
    className: 'greeting',
    children: 'Hello, world!'
  }
};
```

