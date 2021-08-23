---
layout: post
date: 2021-07-30 13:56 +0800
title: javascript30 - 20 - Speech Detection
comments: false
categories: 
  - javascript30
tags: 
  - javascript30
  - web
  - study
---

---

### 20 - Speech Detection

#### 프로젝트 목표

웹에서 음성 인식 추출 API( `Web Speech API` ) 사용하기

즉, SpeechRecognition기능을 이용하여 영어 음성을 텍스트로 변환하기



#### 1. SpeechRecognition사용하기

[SpeechRecognition 링크](https://developer.mozilla.org/en-US/docs/Web/API/SpeechRecognition)

```
let recognition = new SpeechRecognition();
recognition.interimResults = true;
recognition.lang = 'en-US';
```

SpeechRecognition의 설정값

- interimResults : 중간 결과가 반환되어야 하는지 제어
- lang : 반환할 언어를 설정, 영어로 설정하였다. 



#### 2. 음성인식 시작

```
 recognition.addEventListener('end', recognition.start);
 recognition.start();
```

` recognition.start()`을 이용하여 음성 인식을 시작한다. 

end이벤트가 발생하면 음성인식이 끝난것, 끝난것을 확인하면 음성인식을 재시작하게 한다. 



#### 3. 인식한 데이터를 가공해 화면에 나타내기

```
 let p = document.createElement('p');
 const words = document.querySelector('.words');
 words.appendChild(p);
 
 recognition.addEventListener('result', e => {
   const transcript = Array.from(e.results)
     .map(result => result[0])
     .map(result => result.transcript)
     .join('');

     const poopScript = transcript.replace(/poop|poo|shit|dump/gi, '💩');
     p.textContent = poopScript;

     if (e.results[0].isFinal) {
       p = document.createElement('p');
       words.appendChild(p);
     }
 });
```

- result이벤트가 발생하면 음성인식의 결과가 반환된것이다. 
- 음성인식의 결과를 문자열로 연결해 transcript에 저장하고, 결과가 욕(?)이라면 💩으로 바꾸고 
- 결과 문자열을 위에서 생성한 p태그의 text로 설정해 화면에 나타낸다. 
- 그리고 새로운 음성인식을 위해 미리p태그를 생성해둔다. 

