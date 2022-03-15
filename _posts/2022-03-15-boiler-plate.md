몽고디비 깔고

---을 복사



그리고몽구스 설치

```
npm install mongoose --save
```



index.js

```
conet mongoose = require('mongoose')
mongoose.connect('mongodb+srv://sumi:<password>@boiler-plate.tsurp.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'. {

})
```





### #4

model은 스키마를 감싸주는 역할을 하고, 

또 스키마는 

![image](https://user-images.githubusercontent.com/49177223/158404023-1e8331e9-b1d5-49eb-ab87-9c4c1ba6f92e.png)

이런 하나하나에 정보들을 이렇게 지정해 줄 수 있는 것을 말한다. 



스키마를 만들고

```
const userSchema = mongoose.Schema({
  name: {
    type: String,
    maxlength: 50,
  },
  email: {
    type: String,
    trim: true, //빈칸을 없애줌
    unique: true, //똑ㄱ같은 이메일을 쓰지 못하게
  },
  password: {
    type: String,
    minLength: 5,
  },
  lastName: {
    type: String,
    maxLength: 50,
  },
  role: {
    type: Number,
    default: 0,
  },
  image: String,
  token: {
    type: String,
  },
  tokenExp: {
    type: Number,
  },
});
```



만든 스키마를 model로 감싸준다. 

```
const User = mongoose.model("User", userSchema); //모델 이름, 스키마

```



### #7 회원가입 기능 

![image](https://user-images.githubusercontent.com/49177223/158412411-9303d2b9-55bd-4c76-a2f0-fa1d67c522a4.png)



client에서 보내주는 정보들을 Server에서 받기 위하여 `Body-parser`이라는 것이 필요



Body-parser 설치

```
npm install body-parser --save
```



로그인을 하거나 회원가입을 할때 UI를 만들어 놓은것이 없기떄문에, 데이터를 찍을 클라이언트 없이 보낼수가 없다. 

그것을 대체하기 위하여 `포스트맨`을 설치한다.



그리고 register route를 만들겠다. 

이제는 회원가입 기능을 만들것이다.



```
const express = require("express");
const app = express();
const port = 5000;
const bodyParser = require("body-parser");
const { User } = require("./models/User");

//applications/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extension: true }));

//applications/json 타입으로 된 것을 분석해서 가져올 수 있게
app.use(bodyParser.json());

...

app.post("/register", (req, res) => {
  //회원 가입 할때 필요한 정보들을 client에서 가져오면
  //그것들을 데이터 베이스에 넣어준다.
  const user = new User(req.body); //정보들을 user모델에 저장해준다.

  user.save((err, userInfo) => {
    if (err) return res.json({ success: false, err });
    //status 200 : 성공했다는 표시
    return res.status(200).json({ success: true });
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

```



postman에서

![image](https://user-images.githubusercontent.com/49177223/158444027-b43bae01-a27a-4826-8f12-2c875a0838f8.png)



### #8 nodemon

NODEMON?? 

소스를 변경할 때 그것 감지해서 자동으로 서버를 재 시작해주는 api



```
$ npm install nodemon --save-dev
```



`dev`를 붙이는 이유는 local에서 할때랑 배포할때랑, local에서만 사용하겠다. 



그리고 편하게 사용하기 위해서 script를 하나 더 추가한다. 

```
 "scripts": {
    "start": "node index.js",
    "backend": "nodemon index.js",
    "test": "echo \"Error: no test specified\" && exit 1"
  },
```



그리고 실행은 

`npm run backend`로 실행



### #9 비밀 설정 정보 관리

지금까지 했던 내용중 디비 연결  username, password부분은 유출되면 안되는 비밀 설정 정보이다. 

그래서 이부분을 따로 빼놓아 git에 올리지 않도록 해야한다. 



여기서 local환경에서의 `development`와 배포한후의 `production`을 따로 생각해 주어야 한다. 

development모드일 때에는 아래에서 `mongoURI`를 가져올수 있다. 

```
module.exports = {
  mongoURI:
    "mongodb+srv://<username>:<password>@boiler-plate.tsurp.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
};
```

