---

layout: post


date: 2021-07-27 13:56 +0800

title: javascript30 - 14 - JavaScript References VS Copying

comments: false
categories: 
  - javascript30
tags: 
  - javascript30
  - web
  - study
---


---


원래 배열

`  const players = ['Wes', 'Sarah', 'Ryan', 'Poppy'];`

- 복사본을 만들어라

  let player2 = players;

- You might think we can just do something like this: however what happens when we update that array?

  생성한 복사본 배열을 수정하면 무슨일이 발생하는 가?

  ```
  player2.push("sumi");
  
  console.log(player2);
  console.log(players);
  ```

  ![image](https://user-images.githubusercontent.com/49177223/127181603-b8388d4d-0e5a-4979-a000-96bd70e2001b.png)

  복사본 배열을 수정한것 임에도 불구하고 원래 배열도 수정된것을 볼수있다. 

  **WHY? **배열 복사본이 아니고 배열 참조이기 때문제 players와 player2는 같은 배열을 가르키고 있는것이다!

- 위의 문제를 고쳐라!- 

  - 새로운 배열을 만들거나 이전의 배열을 연결해야 한다. 

  ```
  const players3 = players.slice();
  players3.push("sumi");
  console.log(players3);
  console.log(players);
  ```

  ```
  const team3 = [].concat(players);
  ```

  - 또는 ES6 spread를 이용

  ```
  const team4 = [...players];
  team4[3] = 'heeee hawww';
  ```

  ```
  const team5 = Array.from(players);
  ```

  

  [결과]

  ![image](https://user-images.githubusercontent.com/49177223/127182783-76117961-920e-41e8-9f4f-3b6791ba9ebf.png)

