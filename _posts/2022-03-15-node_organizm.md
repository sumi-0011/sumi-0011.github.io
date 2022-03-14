> inflearn egoing님의 Node.js 를 이용해 웹애플리케이션 만들기강좌를 보고 정리한 내용입니다. 
>
>
> ## Node.js란?
> 개발자가 모든 종류의 서버 사이드 도구들과 어플리케이션을 js로 만들수 있도록 해주는 런타임 환경입니다. 
>
> 이벤트 기반으로 개발이 가능하며, Non-Blocking I/O를 지원하여 **비동기식 프로그래밍**이 가능해, I/O부하가 심한 대규모 서비스를 개발하는데 적합합니다. 
>
> Node.js는 Chrome V8엔진을 이용하여 브라우저에서 js를 해석하듯이 서버에서 js를 동작하도록 하는 환경인데, 환경(플랫폼)에 불과하기 때문에 Node.js자체로는 구현하는데 한계가 존재합니다. 
> 그래서 주로 Node는 서버 형식으로 개발합니다. 
>
>
> ## node를 이용하여 웹서버 만들기
>
> [nodejs 시작 가이드](https://nodejs.org/ko/docs/guides/getting-started-guide/)
>
> 첫번째로 node.js를 설치한다.
> 그리고 첫번째 node웹사이트를 구축해보자. 
>
> 폴더 하나를 만든 후 터미널에 
> `$ node init -y` 
> 을 입력하여 pakage.json을 생성한다. 
>
> > -y옵션은 pakage.json에서 모든 옵션을 기본값으로 설정한다는 옵션이다. 
> > https://docs.npmjs.com/cli/v8/commands/npm-init
>
> 생성한 폴더에 `app.js`이름의 파일을 만들고
> ```
> const http = require('http');
> 
> const hostname = '127.0.0.1';
> const port = 3000;
> 
> const server = http.createServer((req, res) => {
>   res.statusCode = 200;
>   res.setHeader('Content-Type', 'text/plain');
>   res.end('Hello World');
> });
> 
> server.listen(port, hostname, () => {
>   console.log(`Server running at http://${hostname}:${port}/`);
> });
> ```
> 위의 코드를 작성한 후
> 터미널에 `node app.js`를 입력하여 웹 사이트를 실행한다. 
>
>  > 위는 node.js를 이용해서 웹 서버를 생성하고, 그 웹서버가 `port`를 listening라도록 시킨다. 그리고 `hostname`을 통해 접속한 사용자에 대해서 응답하라는 코드이다. 
>  > 그리고 그 응답의 결과는  ` res.end("Hello World\n");`부분의 `"Hello World"`라는 text이다. 
>
> ## Express.js란?
> Express.js는 Node.js를 위한 빠르고 간편한 웹 프레임워크입니다. 
> 다양한 Node.js 웹 프레임워크중 현재 가장 많이 사용되고 있습니다. 
>
> express.js는 Node.js 개발시 개발을 빠르고 손쉽게 할 수 있도록 도와주는 역할을 하는데, 이는 미들웨어(middle ware)구조를 가지고 있기 때문에 가능한 일입니다.
>
>
> ### Express 설치
>
> ```
> npm install express --save
> ```
>
> ### express helloworld예제
>
> 디렉토리에 app.js라는 이름의 파일을 작성한 후 다음과 같은 코드를 추가한다. 
>
> ```
> const express = require('express')
> const app = express()
> const port = 3000
> 
> app.get('/', (req, res) => {
>   res.send('Hello World!')
> })
> 
> app.listen(port, () => {
>   console.log(`Example app listening on port ${port}`)
> })
> ```
>
> 웹은 서버를 시작하며 3000번 포트에서 연결을 리스닝한다. 
> 웹은 루트 URL(/) 또는 라우트에 대한 요청에 “Hello World!”로 응답한다. 
>
> 위의 node.js에서 웹 서버를 실행하는 것과 같은 역할을 하는 코드이다. 
>
> 앱을 실행하려면 `$ node app.js`를 입력하면 된다!
>
>
> > 사용자가 웹에 접속할 때에는 get방식이나 post방식으로 접근 할 수 있다. 
> > 일반적으로 url을 직접 쳐서 들어오는 방식은 get방식이며, 이러한 get방식으로 접근한 사용자를 받기 위해서 `get`이라는 메소드를 호출한다. 
> > 그리고 get방식으로 접근한 사용자 중에서 홈페이지(root경로)로 접근한 사용자를 구분하기 위해 `app.get("/",접속했을때 실행시킬 함수)` 를 이용한다. 
>
> > 응답을 해줄때에는 두번째 인사인 `res`에 `send()`함수를 호출하여 이용한다. 
>
>
> ### 정적파일 제공
>
> 이미지, css파일 및 js파일과 같은 정적파일을 제공하려면 express의 기본 제공 미들웨어 함수인 `express.static`을 이용하면 된다. 
>
> express는 express.static 미들웨어 함수를 이용해 정적 디렉토리를 설정한 순서대로 파일을 검색한다. 
>
> ```
> app.use(express.static('public'));
> ```
> 위의 코드를 이용하면 `public`이라는 이름의 디렉토리에 포함된 파일을 로드할수있습니다. 
>
> > 여러개의 정적 자산 디렉토리를 이용하려면 `express.static` 미들웨어 함수를 여러번 호출하면 된다. 
>
> 참고 링크 : [express](https://expressjs.com/ko/starter/static-files.html)
>
> 
>
> ### express 템플릿 엔진
>
> 템플릿이 제공하는 기본적인 틀을 이용하여 더 빠르고 수월하게 개발할 수 있다. 
>
> ![image](https://user-images.githubusercontent.com/49177223/158160525-ad850dbb-5e7e-48e0-8ed5-9ba8a0c33456.png)
>
> 템플릿 엔진 중 이 강의에서는 `jade`를 사용하였다. 
>
> 여기에는 관심이 없기 때문에 pass 뒤에서 `jade`를 사용하는 부분은 코드를 그대로 쳐서 진행하였다. 
> 다만 `jade` 설치는 필요
> `$ npm install jade --save`
>
> - views, 템플리트가 있는 디렉토리. 예: app.set('views', './views')
> - view engine, 사용할 템플리트 엔진. 예: app.set('view engine', 'pug')
>
>
> ## URL을 이용한 정보 전달
>
> ### Query String
>
> **Query String**이란?
> 사용자가 입력 데이터를 전달하는 방법 중의 하나로, 
> url주소에 미리 협의된 데이터를 parameter을 통해 넘기는 것을 말한다. 
>
> ```
> http:locahost/path?querystring
> ```
>
> query parameter을 뒤에 덧붙여서 추가적인 정보를 서버측에 전달하는것
>
> 클라이언트가 어떤 특정 리소스에 접근하고 싶어하는지 정보를 담는다. 
>
> 
>
> - 정해진 엔드포인트 주소 이후에 ? 을 쓰는 것으로 query string이 시작함을 알고
>
> - parameter=value (key-value 형식)으로  필요한 파라미터의 값을 적는다. 
>
> - parameter가 여러개인 경우 `&`을 이용해서 여러개의 parameter을 넘길 수 있다. 
>
>   `http:locahost/path?name=sumi&age=23`
>
>   
>
> **Query string 사용방법**
> 예시
> ```
> app.get("/topic", function (req, res) {
>   res.send(req.query.id);
> });
> ```