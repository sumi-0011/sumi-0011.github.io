---
date: 2021-07-25 13:56 +0800

title: javascript30 - 12 - Key Sequence Detection

comments: false
categories:
  - javascript30
tags:
  - javascript30
  - web
  - study
---

---

## 12. Key Sequence Detection

키 입력을 받아 콘솔창에 배열로 뜨게 하고, secretCode를 입력하면 유니콘이 나오게 설정한다.

##### 초기코드

```js
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Key Detection</title>
  <script type="text/javascript" src="https://www.cornify.com/js/cornify.js"></script>
</head>
<body>
<script>
</script>
</body>
</html>

```

head의 ` <script type="text/javascript" src="https://www.cornify.com/js/cornify.js"></script>` 가 무엇인지 확인해보니 cornify의 유니콘서비스?라고 한다.

finishied파일에서 확인해보면 cornify_add()를 이용해 랜덤한 위치에 고정 이미지를 생성시키고, 생성된 이미지를 다시 클릭하면 새로운 이미지를 생성시키는 역할을 하는것 같다.

### 과정

1. key event확인

   ```js
   window.addEventListener("keyup", (e) => {
     console.log(e.key);
   });
   ```

   keyup동작을 통해 어떤 키보드 입력을 수행했는지 console에서 확인해본다.

2. 배열에 저장하기

   ```js
   let pressed = [];
   const secretCode = "wesbos";
   window.addEventListener("keyup", (e) => {
     pressed.push(e.key);
   });
   ```

   array.push를 이용하여 입력한 키를 배열에 저장한다.

3. secretCode인지 확인하기

   ```js
   let pressed = [];
   const secretCode = "wesbos";
   window.addEventListener("keyup", (e) => {
     pressed.push(e.key);
     pressed.splice(-secretCode.length - 1, pressed.length - secretCode.length);
     console.log(pressed);
     if (pressed.join("").includes(secretCode)) {
       console.log("DING DING!");
     }
   });
   ```

   `pressed.splice(-secretCode.length - 1, pressed.length - secretCode.length);`을 이용해서 secretCode의 길이만큼의 배열 길이를 유지해준다.

   그리고 배열 pressed의 원소들을 한 문자열로 합쳐서 secretCode가 포함되어있는지확인한다.

4. 유니콘 화면에 표시하기

   ```js
   if (pressed.join("").includes(secretCode)) {
     console.log("DING DING!");
     cornify_add();
   }
   ```

   cornify_add() 을 이용하여 유니콘을 표시한다.

#### 완성본

<iframe src="https://codesandbox.io/embed/crazy-visvesvaraya-ohxjj?expanddevtools=1&fontsize=14&theme=dark"
     style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;"
     title="12. Key Sequence Detection"
     allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
     sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
   ></iframe>
