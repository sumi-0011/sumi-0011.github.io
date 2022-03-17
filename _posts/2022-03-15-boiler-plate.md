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



config/dev.js을 만들어 추가

```
module.exports = {
  mongoURI:
    "mongodb+srv://<username>:<password>@boiler-plate.tsurp.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
};
```







여기서 local환경에서의 `development`와 배포한후의 `production`을 따로 생각해 주어야 한다. 

development모드일 때에는 아래에서 `mongoURI`를 가져올수 있다. 

```
module.exports = {
  mongoURI:
    "mongodb+srv://<username>:<password>@boiler-plate.tsurp.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
};
```



만약 배포시, haroku사이트를 사용한다면, 따로 `mongoURI`를 입력할 수 있는 부분이 있다. 

따라서 `config/dev.js`와 `config/prod.js`를 따로 만들어 관리한다. 



그리고 `config/key.js`를 생성해 모드에 따라 다른 파일을 사용하도록 한다. 

```
if (process.env.NODE_ENV === "production") {
  module.exports = require("./prod");
} else {
  module.exports = require("./dev");
}
```



그리고 index.js를 수정한다. 

```
...

const config = require("./config/key");

...

const mongoose = require("mongoose");
mongoose
  .connect(config.mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Mongoose Connect...."))
  .catch((err) => console.log(err));
  
...
```



### #10 Bcrypt로 비밀번호 암호화 하기

그냥 password를 보내자니 너무 위험성이 크다. 암호화가 필요하다. 

현재 데이터베이스에 저장된 비밀번호를 보면 너무 안전하지 않다. 

그래서 `Bcrypt`를 이용하여 비밀번호를 암호화 해줘 데이터베이스에 저장해줘야 한다. 

[bcrypt - npm](https://www.npmjs.com/package/bcrypt)



`bcrypt`설치

```
npm install bcrypt --save
```



index.js

```
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
```

user을 save하기 전에 암호화를 시켜 주어야 한다. 



salt를 이용해서 비밀번호를 암호화 해야한다. 

그럴려면 	`salt`를 먼저 생성하고, `saltRounds=10`으로 설정한다. salt의 길이를 10자리로 설정



공식 문서 참고 : To hash a password: Technique 1

```
  //비밀번호를 암호화 시킨다.
  bcrypt.genSalt(saltRounds, function (err, salt) {
    bcrypt.hash(myPlaintextPassword, salt, function (err, hash) {
      // Store hash in your password DB.
    });
  });
```



작성 코드

User.js

```
...

userSchema.pre("save", function (next) {
  let user = this; //암호화 전 비밀번호가 필요하므로 가져온다.

  //비밀번호를 암호화 시킨다.
  bcrypt.genSalt(saltRounds, function (err, salt) {
    if (err) return next(err); //에러가 나면

    //hash(plain pwd, salt, function)
    bcrypt.hash(user.password, salt, function (err, hash) {
      // Store hash in your password DB.
      //hash는 암호화된 비밀번호
      if (err) return next(err);
      user.password = hash;
    });
  });
  next(); //돌아가기
});

...
```

위의 코드는 이메일등을 바꿀때에도 비밀번호 암호화를 진행한다. 

하지만 비밀번호를 바꿀때만 암호화를 해야하기 때문에 조건을 걸어주어야 한다. 





```
userSchema.pre("save", function (next) {
  let user = this; //암호화 전 비밀번호가 필요하므로 가져온다.

  if (user.isModified("password")) {
    //비밀번호가 바뀌었을 때만 비밀번호를 암호화 시킨다.
    bcrypt.genSalt(saltRounds, function (err, salt) {
      if (err) return next(err); //에러가 나면

      //hash(plain pwd, salt, function)
      bcrypt.hash(user.password, salt, function (err, hash) {
        // Store hash in your password DB.
        //hash는 암호화된 비밀번호
        if (err) return next(err);
        user.password = hash;
        next(); //돌아가기
      });
    });
  } else {
    next();
  }
});

```



결과

![image](https://user-images.githubusercontent.com/49177223/158554364-b00fa8a5-3893-4ffb-ae12-59e80d0fef2a.png)

![image](https://user-images.githubusercontent.com/49177223/158554073-9f810ac1-913e-4c59-b79d-e732a71d94b5.png)

암호화 된것을 확인 할 수 있다. 





### #11 로그인 기능

로그인 기능을 만들기 위해서는 

먼저 login route를 만들어야 한다. 



1. 요청된 이메일일을 데이터베이스에서 찾고

   몽고 디비에서 지원하는 메소드를 사용

   

2. 요청된 이메일이 데이터 베이스에 있다면 비밀번호가 맞는 비밀번호인지 확인

   plainPassword와 암호화된 비밀번호가 같은지 확인을 해야하는데

   암호화 된 비밀번호를 복구할수 는 없으므로 plainPassword를 암호화 해야한다. 

   ```
    user.comparePassword(req.body.password, (err, isMatch) => {
         if (!isMatch) {
           return res.json({
             loginSuccess: false,
             message: "비밀번호가 틀렸습니다. ",
           });
         }
         //비밀번호 까지 같다면 토큰을 생성하기
   
         user.generateToken((err, res) => {});
       });
   ```

​	user.js

```
userSchema.methods.comparePassword = (plainPassword, cd) => {
  // plainPassword 1234567 암호화된 비밀번호 $2b$10$xcJJ0hYXZuaSqYmY9qT2QOEqmxpvHmeoDT4DFwVFhafUsUlKJeH9i

  bcrypt.compare(plainPassword, this.password, (err, isMatch) => {
    if (err) return cd(err), cd(null, isMatch);
    
  });
};

```

​	

3. 비밀번호 까지 같다면 토큰을 생성한다. 

```
  user.generateToken((err, res) => {});
```

위 부분을 구현해 토큰을 생성해야 하는데

토큰을 생성하기 위해서는 

먼저 `JSONWEBTOKEN`라이브러리를 다운로드 해야한다. 

```
$ npm install jsonwebtoken --save
```



[jsonwebtoken - npm](https://www.npmjs.com/package/jsonwebtoken) - 사이트를 참조하여 토큰 생성



기본으로

Synchronous Sign with default (HMAC SHA256)

```
var jwt = require('jsonwebtoken');
var token = jwt.sign({ foo: 'bar' }, 'shhhhh');
```

sign이라는 메소드를 이용하여 합쳐주면 토큰이 생성된다. 



사용방법

User.js 추가

```
userSchema.methods.generateToken = (cd) => {
  let user = this;

  // jsonwebtoken을 이용하여 token생성
  jwt.sign(user._id, "secretToken");

  //user._id + secretToken = token
  // ->
  //secretToken -> user._id

  user.token = token;
  user.save((err, user) => {
    if (err) return cd(err);
    cd(null, user);
  });
};
```

index.js 수정

```
 user.comparePassword(req.body.password, (err, isMatch) => {
      if (!isMatch) {
        return res.json({
          loginSuccess: false,
          message: "비밀번호가 틀렸습니다. ",
        });
      }
      //비밀번호 까지 같다면 토큰을 생성하기
      user.generateToken((err, res) => {
        if (err) return res.status(400).send(err);

        // 토큰을 저장한다. 어디에 ? 쿠키, 로컬스토리지?
      });
    });
```



어디에 토큰을 저장하는게 좋을까?

쿠키? 로컬스토리지? 어디가 딱 좋다고 할수 없다. 



여기에서는 쿠키에서 하겠다. 각지 장단점ㅇ 있음



쿠키를 사용하려면 `cookie-parser`을 설치해야 한다. 

```
$ npm i cookie-parser --save
```



설치하고 index.js에 추가

```
const cookieParser = require("cookie-parser");
app.use(cookieParser());
```

이제 토큰을 저장해야 하는데 

`user.token`이 토큰이다. 이것을 저장하면 됨 

```
user.generateToken((err, user) => {
        if (err) return res.status(400).send(err);

        // 토큰을 저장한다. 어디에? 쿠키, 로컬스토리지 중 쿠키
        res
          .cookie("x_auth", user.token)
          .status(200)
          .json({ loginSuccess: true, userId: user._id });
      });
```





최종 코드

```
...

const cookieParser = require("cookie-parser");...


app.use(cookieParser());

app.post("/api/users/login", (req, res) => {
  // 요청된 이메일을 데이터베이스에서 았는지 찾는다.
  User.findOne({ email: req.body.email }, (err, user) => {
    if (!user) {
      return res.json({
        loginSuccess: false,
        message: "제공된 이메일에 해당하는 유저가 없습니다.",
      });
    }

    // 요청된 이메일이 데이터 베이스에 있다면 비밀번호가 맞는 비밀번호인지 확인

    user.comparePassword(req.body.password, (err, isMatch) => {
      if (!isMatch)
        return res.json({
          loginSuccess: false,
          message: "비밀번호가 틀렸습니다.",
        });

      // 비밀번호까지 맞다면 토큰을 생성하기
      user.generateToken((err, user) => {
        if (err) return res.status(400).send(err);

        // 토큰을 저장한다. 어디에? 쿠키, 로컬스토리지 중 쿠키
        res
          .cookie("x_auth", user.token)
          .status(200)
          .json({ loginSuccess: true, userId: user._id });
      });
    });
  });
});

...

```



### #13 Auth

어떤 사이트를 들어갔을때 

페이지 이동 때마다 로그인이 되어있는지 안되어 있는지, 관리자 유저인지 체크

글을 쓸때나 지울때 같을때 권한이 있는지 가은 것도 체크



![image-20220316233026486](C:\Users\user\AppData\Roaming\Typora\typora-user-images\image-20220316233026486.png)



client에서 서버에 쿠키에 담겨져있는 토큰을 전달을 한다. 

서버 쿠키를 전달할때 인코드 되어있는 토큰이 userid와 같다면 로그인이 되어있는 것?



1. 쿠키에서 저장된 토큰을 서버에서 가져와서 복화화를 한다. 





2. 복호화를 하면 user id가 나오는데 그 user id를 이용해서 데이터베이스 user collection에서 유저를 찾은 후 쿠키에서 받아온 token이 유저도 가지고 있는지 확인한다. 

쿠키가 일치하지 않는다면 : Authentication false

쿠키가 일치 한다면 :Authentication ture, 



미들웨어 란?

엔드포인트에서 get을 ㅂ받은 후에 콜백 함수 전에 중간에서 무언가를 해주는 것



auth라는 미들웨어를 추가

// 클라이언트 쿠키에서 토큰을 가져온다. cookie-parser 필요

 let token = req.cookies.x_auths; //쿠키 이름이 "x_auths"



middleware/auth.js

```
const { User } = require("../models/User");
let auth = (req, res, next) => {
  //인증 처리를 하는 곳

  // 클라이언트 쿠키에서 토큰을 가져온다. cookie-parser 필요
  let token = req.cookies.x_auths; //쿠키 이름이 "x_auths"

  // 토큰을 복호화 한후, 유저를 찾는다.
  //User Model이 필요, User model에 토큰으로 유저를 찾는 메소드
  User.findByToken();	// User.js에 구현
  // 유저가 있으면 인증 okay
  //유저가 없으면 인증  No
};

```

User.js에 추가 findByToken()구현

```
userSchema.statics.findByToken = function (token, cb) {
  let user = this;

  // 토큰 제작 과정 : user._id + "String" = token
  //토큰을 decode
  jwt.verify(token, "secretToken", function (err, decoded) {
    //유저 아이디를 이용해서 유저를 찾은 다음에
    //클라리언트에서 가져온 token과 DB에 보관된 토큰이 일치하는지 확인
    user.findOne({ _id: decoded, token: token }, function (err, user) {
      if (err) return cd(err);
      cd(null, user);
    });
  });
};
```



auth.js 추가구현

```
const { User } = require("../models/User");
let auth = (req, res, next) => {
  //인증 처리를 하는 곳

  // 클라이언트 쿠키에서 토큰을 가져온다. cookie-parser 필요
  let token = req.cookies.x_auths; //쿠키 이름이 "x_auths"

  // 토큰을 복호화 한후, 유저를 찾는다.
  //User Model이 필요, User model에 토큰으로 유저를 찾는 메소드
  User.findByToken(token, (err, user) => {
    if (err) throw err;
    if (!user) return res.json({ isAuth: false, error: true });

    //토큰과 user을 req에 넣어줌으로 있어서 index.js에서 req.user로 받을수 있다.
    req.token = token;
    req.user = user;
    next(); //next가 없으면 미들웨어에 갖힘
  });
  // 유저가 있으면 인증 okay
  //유저가 없으면 인증  No
};

```



index.js 수정

```
//auth 라는 미들웨어를 추가
app.get("/api/users/auth", auth, (req, res) => {
  //엔드포인트에서 get을 받은 후에 콜백function하기 전에 중간에서 무언가를 해주는 것

  /*
  role 1 어드민, role 2 특정 부서 어드민
  role 0 -> 일반유저 role 0 이아니면 관리자
  */
  //여기까지 미들웨어를 통과해 왔다는 이야기는 Authentication이 true이다
  res.status(200).json({
    _id: req.user._id,
    isAdmin: req.user.role === 0 ? false : true,
    email: req.user.email,
    lastname: req.user.lastname,
    role: req.user.role,
    image: req.user.image,
  });
});

```

이렇게 하여서 auth라우터 완성



### #14 로그아웃 기능

로그아웃 route만들기 

- 로그아웃 하려는 유저를 데이터베이스에서 찾아서
- 그 유저의 토큰을 지워준다.



```
app.get("/api/users/logout", auth, (req, res) => {
  //로그아웃 하려는 유저를 데이터베이스에서 찾아서
  User.findOneAndUpdate(
    {
      _id: req.user._id, //로그아웃 하려는 유저를 미들웨어에서 찾아줌
    },
    {
      token: "", //토큰을 지워준다.
    },
    (err, user) => {
      if (err) return res.json({ success: false, err });
      return res.status(200).send({ success: true });
    }
  );
});
```





### # 16 create-react-app

root폴더에

`client`와 `server`폴더를 생성하고

위에서 작업했던 `config`, `middleware`, `models`폴더와 `index.js`를 `server`폴더로 옮긴다. 

![image-20220317002213300](C:\Users\user\AppData\Roaming\Typora\typora-user-images\image-20220317002213300.png)



그리고 client에 create-react0app

```
$ cd client
$ npx create-react-app .
```

.(dot)의 의미는 client즉 현재 위치의 폴더에 react를 설치 하겠다. 





### #17 npx npm 차이





### #18 구조 설명

![image-20220317002156604](C:\Users\user\AppData\Roaming\Typora\typora-user-images\image-20220317002156604.png)
