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



로그인을 하거나 회원가입을 할때 




