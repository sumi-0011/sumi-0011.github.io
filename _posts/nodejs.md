## Post 요청 처리

중요한 데이터가 url에 나타날 수 있기 때문에 post를 사용

form.html

```
<form action="email_post" method="post">
	<input type="text" nam="email"/>
</form>
```

/email_post로 post를 보낸다. 



app.js

```
app.post('/email_post', function(req,res) {
	//get의 경우 : req.param('email')
	//get은 위와 같이 url에서 뽑아서 사용 가능, post의 경우에는 별도의 모듈이 필요
	// `body-parser` 이용
	res.send("post response")
})
```



get의 경우 : req.param('email')
get은 위와 같이 url에서 뽑아서 사용 가능, post의 경우에는 별도의 모듈이 필요
따라서 Post요청을 처리 할때는  `body-parser` 이용한다!!

**설치 방법**

```
# body-parser 설치
npm install body-parser --save
```
****

```
var express = require('express');
var app = express();
var bodyParser = require('body-parser'); //body-parser 모듈 불러옴

app.listen(3000, function () {
  console.log('start Server 3000');
});

app.use(express.static('public'));
//express에 bodyParser을 쓴다는것을 알린다 (json형태로 받으면 bodyPaser.json())
app.use(bodyParser.json());	
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/email_post', function (req, res) {
	//console.log(req.body.email)
  console.log(req.body);
  res.send(req.body);
});
```



express에 bodyParser을 쓴다는것을 알린다 (json형태로 받으면 bodyPaser.json())

`app.use(bodyParser.json());	`



### get vs post

두 방식 모두, 서버에 요청을 하는 메소드로

요청에는 자원을 보내야 하는 경우들이 존재한다. 

- get방식 

  클라이언트의 데이터를  URL뒤에 붙여 보낸다. 

  예시 : `www.example.com?id=mommoo&pass=1234`

  URL형태로 표현되므로, 다른 사람이 특정 페이지에 접속 할 수 있다.

  간단한 데이터로 표현되어, 데이터를 보내는 양에 한계가 있다. 



- Post방식

  get방식과는 달리, 데이터 전송을 기반으로 한 요청 메소드이다. 

  URL에 붙여서 보내지 않고 **Body에 데이터를 넣어 보낸다. **

​	

> 출처 : https://mommoo.tistory.com/60





### View engine을 활용한 응답 처리

ejs라는 뷰 템플릿을 이용해서

express에서 html응답을 줄 때 data와 html을 어떻게 결합해서 줄까?



```
$ npm install ejs --save
```

명령어를 입력하여 `ejs`를 설치



그리고 app.js에 추가

```
app.set("view engine","ejs");
```

"view engine"가 나오면 `"ejs"`라는 것을 express가 기억한다. 



view는 지정된 디렉터리가 있기 때문에

root폴더 하위에 `views`라는 폴더를 생성한다. 

views/email.ejs

```
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <title>email ehs template</title>
</head>

<body>
  <h1>Welcom !! <%= email %>
  </h1>
  <p>정말로 반가워요 ^^</p>
</body>

</html>
```



결과 화면

![image](https://user-images.githubusercontent.com/49177223/157892043-ef49b296-d89c-4f37-a336-4a5afcb789bd.png)

### JSON 활용한 Ajax처리



form.html에 ajax로 보내는 button을 추가

```
 <form action="email_post" method="post">
    <input type="text" name="email" />
    <input type="submit" value="submit">
  </form>
  //추가 부분
  <button class="ajaxsend">ajaxsend </button>
```

