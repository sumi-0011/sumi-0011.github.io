---
layout: post


date: 2021-09-30 22:35 +0800

title: CNU TIME 

comments: true
categories: 
  - CNU TIME 
tags: 
  - CNU TIME 
---

---

# react-native설치

- Node버전 확인

```
UserK@Win10-01 MINGW64 ~/STUDY/Handy_Cycling (master)
$  node -v
v12.14.1

UserK@Win10-01 MINGW64 ~/STUDY/Handy_Cycling (master)
$ npm -v
7.5.4
```

- JDK 버전 확인

```
$ java -version
```



## 프로젝트 생성

- 먼저 전에 global `react-native-cli` package을 설치했으면 제거

  ```
  npm uninstall -g react-native-cli
  ```

  을 이용하여 제거

- 그리고 밑의 명령어를 통하여 새 프로젝트를 생성한다. 

  ```
  npx react-native init AwesomeProject
  ```

  이것은 React Native를 기존 애플리케이션에 통합하거나 Expo에서 "제거"하거나 Android 지원을 기존 React Native 프로젝트에 추가하는 경우에는 필요하지 않는다. 

