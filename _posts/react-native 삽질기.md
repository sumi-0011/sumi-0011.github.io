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



---

## react-navigation/native 설치

https://reactnavigation.org/docs/getting-started/ 공식문서를 참고하여 

1. 설치

   ```
   yarn add @react-navigation/native
   ```

2. 의존성 설치

   ```
   yarn add react-native-screens react-native-safe-area-context
   ```

   

3. 안드로이드 설정

   `react-native-screens` package requires one additional configuration step to properly work on Android devices. Edit `MainActivity.java` file which is located in `android/app/src/main/java/<your package name>/MainActivity.java`.

   Add the following code to the body of `MainActivity` class:

   ```
   @Override
   
   protected void onCreate(Bundle savedInstanceState) {
   
     super.onCreate(null);
   
   }
   ```

   and make sure to add an import statement at the top of this file:

   ```
   import android.os.Bundle;
   ```

   



- tabl을 추가하기 위해

```
yarn add @react-navigation/bottom-tabs
```

후 App.js파일을



```
import * as React from 'react';
import { Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

function HomeScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Home!</Text>
    </View>
  );
}

function SettingsScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Settings!</Text>
    </View>
  );
}

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Settings" component={SettingsScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
```

로 교체해 주었다. 

출처 : https://reactnavigation.org/docs/tab-based-navigation/
