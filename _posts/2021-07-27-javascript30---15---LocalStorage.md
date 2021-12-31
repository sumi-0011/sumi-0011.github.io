---
date: 2021-07-28 13:56 +0800

title: javascript30 - 15 - LocalStorage

categories:
  - javascript30
tags:
  - javascript30
  - web
  - study

comments: false
---

---

#### localStorege에 저장하기

- JSON.stringify() : object 객체를 string으로 변환
- JSON.parse() : string을 object로 변환

localstorege에서 items string을 가져와 object로 변환한다.

```js
const items = JSON.parse(localStorage.getItem("items")) || [];
```

변환한 items 객체에 입력한 value == object를 추가해준후 json string으로 변환해 localstorage에 저장한다.

```js
let object = {
  text: addItems.querySelector('input[type="text"]').value,
  done: false,
};
items.push(object);
localStorage.setItem("items", JSON.stringify(items));
```

[localstorage 결과]

![image](https://user-images.githubusercontent.com/49177223/127299963-285903b7-d7af-4fcf-b17d-e9593287477b.png)

#### ul list에 추가하기

items 객체를 돌아가면서 li를 생성해서 ul에 추가해주었다.

cnt를 이용해서 item을 구별할수 있는 키를 만들었다.

```js
function setItems() {
  let ulist = "";
  let cnt = 0;
  items.forEach((item) => {
    ulist += `<li>
            <input type="checkbox" data-index="${cnt}" id="item${cnt}">
            <label for="item${cnt++}">${item.text}</label>
        </li>`;
  });
  itemsList.innerHTML = ulist;
}
```

![image](https://user-images.githubusercontent.com/49177223/127299985-5b00c099-97dc-4c99-b795-4bf7dc10fec8.png)

마지막으로 체크박스 선택 여부만 localstorage에 적용하면 된다.

checkbox의 data-index속성을 이용해 index을 알아와서 checked여부를 적용해준다.

checkbox를 체크하면 실행하기 위해 checkbox에 click이벤트를 적용한다.

```js
itemsList.querySelectorAll('li input[type="checkbox"]').forEach((chk) => {
  chk.addEventListener("click", clickChk);
});
```

```js
function clickChk(e) {
  items[e.target.dataset.index].done = e.target.checked;
  localStorage.setItem("items", JSON.stringify(items)); //localstorage에 적용
}
```

그리고 변경된 localstorage의 check여부를 화면에도 적용시켜 주어야 한다.

따라서 위의 setItems함수를 수정한다. 체크박스 선택여부 item.done이 true이면 checked !!

```js
ulist += `<li>
            <input type="checkbox" data-index="${cnt}" id="item${cnt}" ${
  item.done ? "checked" : ""
}>
            <label for="item${cnt++}">${item.text}</label>
 </li>`;
```

![image](https://user-images.githubusercontent.com/49177223/127306727-272a4686-2a9f-446e-88f9-d38457b5a374.png)

#### 새로 알게된 것

##### HTMLElement.dataset

https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/dataset

**[예시]**

```js
<div id="user" data-id="1234567890" data-user="johndoe" data-date-of-birth>
  John Doe
</div>
```

```js
const el = document.querySelector("#user");

// el.id === 'user'
// el.dataset.id === '1234567890'
// el.dataset.user === 'johndoe'
// el.dataset.dateOfBirth === ''
```

---

#### 완성본

<iframe height="300" style="width: 100%;" scrolling="no" title="" src="https://codepen.io/sumi-0011/embed/oNWqvEX?default-tab=js" frameborder="no" loading="lazy" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href="https://codepen.io/sumi-0011/pen/oNWqvEX">
  </a> by sumi (<a href="https://codepen.io/sumi-0011">@sumi-0011</a>)
  on <a href="https://codepen.io">CodePen</a>.
</iframe>

이 곳에서는 안돌아가는것 같습니다. 코드만! 확인
