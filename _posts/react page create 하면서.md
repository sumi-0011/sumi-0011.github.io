---
layout: single

classes: wide

date: 2021-09-30 22:35 +0800

title: CNU TIME 

comments: true
categories: 
  - CNU TIME 
tags: 
  - CNU TIME 


---



## icon 사용



## awesome icon 사용

### 설치

```
npm i @fortawesome/fontawesome-svg-core
npm i @fortawesome/free-solid-svg-icons @fortawesome/free-regular-svg-icons @fortawesome/free-brands-svg-icons
npm i @fortawesome/react-fontawesome
```



### 사용법 

```
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";

<FontAwesomeIcon icon={faChevronRight} />
```



## react-router-dom 내장 컴포넌트

**설치법 **

```javascript
npm install react-router-dom
```

```javascript
yarn add react-router-dom
```



> **BrowserRouter**: html5의 history API를 이용해 UI 업데이트를 합니다.

> **Switch**: Route로 생성된 자식컴포넌트 중에 매칭되는 첫번째 Route를 렌더링 해줍니다. 이것을 이용해 특정 컴포넌트만 렌더링 해 화면에 띄울 수 있습니다.

> **Route**: 컴포넌트 별로 원하는 url을 지정합니다.

> **Link**: 지정한 URL로 이동되게 해줍니다. 아예 새로운 페이지를 불러오므로 기존 컴포넌트의 상태값은 소멸됩니다.



### 2-1. BrowerRouter, Route, Switch

세 컴포넌트는 SPA구조에서 전체적인 라우팅 구조를 잡는데 사용된다. 

라우팅 할 컴포넌트들을 `<BrowserRouter>`로 감싸고

 `<Router>` 로 컴포넌트 별로 원하는 URL주소를 할당한다. 

그리고 `<Switch>`로 감싸면 특정 URL에 따라 특정 컴포넌트만을 라우팅할 수 있다. 



- `<BrowserRouter>`

  - BrowserRouter는 HTML5의 HistoryAPI를 사용하여 페이지를 새로고침 하지 않고 주소 변경할 수 있게 해준다. 
  - (즉, 페이지 변경으로 인한 깜빡임이 없다. ) 
  - 또한 현재 수고에 관련된 정보를 props로 조회하거나 사용가능하다.

  

ex) 

nav는 언제나 실행되고, switch로 감싸져 있으면 한번에 하나씩만 렌더링한다. 

```
<BrowserRouter>
      <Nav />
      <Switch>
        <Route exact path="/" component={Main} />
        //전달할 props가 있는 경우
        <Route exact path="/info" render={() => <Info userInfo={userInfo} />} />
      </Switch>
    </BrowserRouter>
```



### 2.2 Link

`<Link>`는 특정 주소로 넘어가는 역할을 해준다.

- 페이지를 새로 불러오지 않고 원하는 라우트로 화면전환을 해준다

- 다른 라우트로 이동되길 원한다면, 일반 <a href...>를 사용하면 안된다

  > 왜냐하면, 이렇게하면 새로고침을 해버리기 때문이다.



참고)

> ### **2) window.location과 this.props.history.push**
>
> - **window.location**을 사용해서 이동하게 하면 **'/' 주소의 페이지 전체를 리로드** 한다. 즉 **'주소 url/'에 들어가면 보이는 모든 컴포넌트**를 리로드 한다.
>   그래서 로그인 완료 후 window.location = '/' 를 써주게 되면 '/' 주소의 페이지에 있는 Nav 컴포넌트가 리로딩되어 버튼도 Mypage와 logout으로 바뀌면서 Main컴포에 들어있는 CardList에도 + 버튼이 보인다.
> - **this.props.history.push는 '/' 주소에 연결되어 있는 컴포넌트만 리로드**합니다.
>   나는 Nav.js에서 <Route exact path="/" component={Main}></Route>로 **'/'에 Main 컴포넌트를 라우팅 등록**해주었다.
>   그래서 로그인 후 this.props.history.push는 '/'를 써주게 되면 Nav 컴포의 버튼은 리로드가 되지 않아서 여전히 Signup, login이지만 Main컴포만 리로드 외어 그 안애 에 들어있는 CardList에는 + 버튼이 보이게 된다.
>
> 그래서 페이지 전체가 리로드 되어야 하는 경우인, 로그인 후, 회원탈퇴 후, 개인정보 수정 후 에 대해서만
> window.location= '/' 을 사용하고. 나머지는 모두 this.props.history.push='/' 로 바꾸어 무분별해 보이는 리로딩을 제거했다.

특히

> 그래서 페이지 전체가 리로드 되어야 하는 경우인, 로그인 후, 회원탈퇴 후, 개인정보 수정 후 에 대해서만
> window.location= '/' 을 사용하고. 나머지는 모두 this.props.history.push='/' 로 바꾸어 무분별해 보이는 리로딩을 제거했다.

이부분을 참고하기위해서. 

ex)

```
<Link to="/">
        <button>메인 화면으로</button>
      </Link>
      <Link to="/login">
        <button>로그인 화면으로</button>
</Link>
```



> 출처 : https://velog.io/@devstone/react-router-dom-%EC%9D%B4%ED%95%B4%ED%95%98%EA%B3%A0-%ED%99%9C%EC%9A%A9%ED%95%98%EA%B8%B0

---



#### ./pages/index.js를 통해서 한번에 import 할 수 있도록 하는법

**src/pages/index.js**

```
export { default as Card } from '../components/Card';
export { default as CardEdit } from '../components/CardEdit';
export { default as CardList } from '../components/CardList';
export { default as CardWrite } from '../components/CardWrite';
export { default as Login } from '../components/Login';
export { default as Main } from '../components/Main';
export { default as Menu } from '../components/Menu';
```

매번 라우딩을 위해 컴포넌트를 import할때마다 하나씩 선언해주는 것이 불편하여 **src/pages/index.js**에 모아두는 것이다. 



사용시에는 

```
import { SignUp, Login, Main, CardWrite, Mypage, Findid, Findpw, Infoedit } from '../pages';
```

이와 같이 사용해 한번에 불러올수있다. 



>  출처 : https://libertegrace.tistory.com/entry/6-React-Routing-Oct-24-2020-Nov-1-2020%ED%9A%8C%EA%B3%A0



---

## react에서 부트스트랩 사용하기

> 출처 : https://flamingotiger.github.io/style/react-bootstrap/



사용방법

- `npm install react-bootstrap bootstrap`로 패키지를 설치 합니다.

- 그리고 최상단의 루트파일인 src/index.js 또는 App.js 파일에 다음 스타일을 추가

```
import 'bootstrap/dist/css/bootstrap.min.css';
```



### import 하는 방법 두가지

```
import Button from 'react-bootstrap/Button';
// or 
import { Button } from 'source/_posts/style/react-bootstrap';
```

---

### Link를 사용하면서 props넘기기

https://rrecoder.tistory.com/101

React에서는 링크를 걸어줄때 **<a> tage** 대신 **<Link>**를 사용하게 된다.

a tag를 사용하게 되면 링크를 누를때마다 재 렌더링 되기 때문에 웹페이지가 새로고침 되버리기 때문이다.

 

<Link> 는 **링크를 연결**시켜줄 뿐 아니라 **object 전달**이 가능함 

```
<Link to={{
            pathname: `/movie/${id}`,
            state: {
                year:year,
                title:title,
                summary:summary,
                poster:poster,
                genres:genres
            }
          }}>
```

이런식으로 path 와 state를 지정하여 링크연결, 속성(props) 으로 전달 

 

전달한 속성(props)를 받아 원하는대로 render 하여 사용 가능 

```
const { location } = this.props;
       if (location.state) {
            return (
               <div className="detail__container">
                    <h1>🎞 Movie details</h1>
                    <span>{location.state.title}</span>
                    <span>{location.state.summary}</span>
                </div>
            );
 }
```



---

###  리액트 라우터를 설치

그 다음엔, 해당 프로젝트 디렉토리로 이동하여 리액트 라우터를 설치하세요.

```bash
$ yarn add react-router-dom
$ yarn add cross-env --dev
```

- react-router-dom: 브라우저에서 사용되는 리액트 라우터 입니다.
- cross-env: 프로젝트에서 NODE_PATH 를 사용하여 절대경로로 파일을 불러오기 위하여 환경 변수를 설정 할 때 운영체제마다 방식이 다르므로 공통적인 방법으로 설정 할 수 있게 해주는 라이브러리입니다.



---

# https://velopert.com/3417 읽기





# 반응형 웹

## 모바일 우선 미디어 쿼리

```
// Mobile
@media screen and (min-width: 768px) and (max-width: 1023px) {
// Tablet
}
@media screen and (min-width: 1024px) {
// PC
}
```

