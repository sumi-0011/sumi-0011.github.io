---

---













ㅇㅇ

타입스크립트란?

타입스크립트는 자바스크립트에 타입을 부여한 언어이다.

자바스크립트와 달리 파일을 변환해주는 complie과정이 필요하다.



사용하는 이유?

- 에러의 사전 방지
- 코드 가이드 + 자동완성



# 타입스크립트 기본 타입

크게 다음 12가지가 존재한다.

- Boolean
- Number
- String
- Object
- Array
- Tuple
- Enum
- Any
- Void
- Null
- Undefined
- Never



## Object

#### Array

타입이 배열인 경우 간단하게 아래와 같이 선언합니다.

```ts
let arr: number[] = [1,2,3];
```

또는 아래와 같이 제네릭을 사용할 수 있습니다.

```ts
let arr: Array<number> = [1,2,3];
```

#### Tuple

튜플은 배열의 길이가 고정되고 각 요소의 타입이 지정되어 있는 배열 형식을 의미합니다.

```ts
let arr: [string, number] = ['hi', 10];
```

만약 정의하지 않은 타입, 인덱스로 접근할 경우 오류가 납니다.

```ts
arr[1].concat('!'); // Error, 'number' does not have 'concat'
arr[5] = 'hello'; // Error, Property '5' does not exist on type '[string, number]'.
```

#### Enum

이넘은 C, Java와 같은 다른 언어에서 흔하게 쓰이는 타입으로 특정 값(상수)들의 집합을 의미합니다.

```ts
enum Avengers { Capt, IronMan, Thor }
let hero: Avengers = Avengers.Capt;
```

---

###  Any

기존에 자바스크립트로 구현되어 있는 웹 서비스 코드에 타입스크립트를 점진적으로 적용할 때 활용하면 좋은 타입입니다. 단어 의미 그대로 모든 타입에 대해서 허용한다는 의미를 갖고 있습니다.

```ts
let str: any = 'hi';
let num: any = 10;
let arr: any = ['a', 2, true];
```

###  Void

변수에는 `undefined`와 `null`만 할당하고, 함수에는 반환 값을 설정할 수 없는 타입입니다.

```ts
let unuseful: void = undefined;
function notuse(): void {
  console.log('sth');
}
```

###  Never

함수의 끝에 절대 도달하지 않는다는 의미를 지닌 타입입니다.

```ts
// 이 함수는 절대 함수의 끝까지 실행되지 않는다는 의미
function neverEnd(): never {
  while (true) {

  }
}
```



# 타입스크립트에서의 함수

웹 애플리케이션을 구현할 때 자주 사용되는 함수는 타입스크립트로 크게 다음 3가지 타입을 정의할 수 있습니다.

- 함수의 파라미터(매개변수) 타입
- 함수의 반환 타입
- 함수의 구조 타입



정의된 매개변수 값만 받을 수 있고 추가로 인자를 받을 수 없다는 의미입니다.

```ts
function sum(a: number, b: number): number {
  return a + b;
}
sum(10, 20); // 30
```



위와 같은 특성은 정의된 매개변수의 갯수 만큼 인자를 넘기지 않아도 되는 자바스크립트의 특성과 반대됩니다. 만약 이러한 특성을 살리고 싶다면 `?`를 이용해서 아래와 같이 정의할 수 있습니다.

```ts
function sum(a: number, b?: number): number {
  return a + b;
}
sum(10, 20); // 30
sum(10, 20, 30); // error, too many parameters
sum(10); // 10
```



매개변수 초기화는 ES6 문법과 동일합니다.

```ts
function sum(a: number, b = '100'): number {
  return a + b;
}
```



## this

타입스크립트에서 `this`가 가리키는 것을 명시하려면 아래와 같은 문법을 사용합니다.

```ts
function 함수명(this: 타입) {
  // ...
}
```

사용 예시

```
interface Vue {
  el: string;
  count: number;
  init(this: Vue): () => {};
}

let vm: Vue = {
  el: '#app',
  count: 10,
  init: function(this: Vue) {
    return () => {
      return this.count;
    }
  }
}

let getCount = vm.init();
let count = getCount();
console.log(count); // 10
```



# 인터페이스

인터페이스는 상호 간에 정의한 약속 혹은 규칙을 의미합니다. 타입스크립트에서의 인터페이스는 보통 다음과 같은 범주에 대해 약속을 정의할 수 있습니다.

- 객체의 스펙(속성과 속성의 타입)
- 함수의 파라미터
- 함수의 스펙(파라미터, 반환 타입 등)
- 배열과 객체를 접근하는 방식
- 클래스



예시

```ts
interface personAge {
  age: number;
}

function logAge(obj: personAge) {
  console.log(obj.age);
}
let person = { name: 'Capt', age: 28 };
logAge(person);
```

## 옵션 속성

인터페이스를 사용할 때 인터페이스에 정의되어 있는 속성을 모두 다 꼭 사용하지 않아도 됩니다. 이를 옵션 속성이라고 합니다. 문법을 보겠습니다.

```ts
interface 인터페이스_이름 {
  속성?: 타입;
}
```

```ts
interface CraftBeer {
  name: string;
  hop?: number;  
}

let myBeer = {
  name: 'Saporo'
};
function brewBeer(beer: CraftBeer) {
  console.log(beer.name); // Saporo
}
brewBeer(myBeer);
```



##  읽기 전용 속성

읽기 전용 속성은 인터페이스로 객체를 처음 생성할 때만 값을 할당하고 그 이후에는 변경할 수 없는 속성을 의미합니다. 문법은 다음과 같이 `readonly` 속성을 앞에 붙입니다.

```ts
interface CraftBeer {
  readonly brand: string;
}
```