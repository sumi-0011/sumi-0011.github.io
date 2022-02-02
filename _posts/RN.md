4. componentDidMount 함수
   클래스 컴포넌트가 처음을 화면ㅇ...





# 챕터 6. 할일 리스트 앱


Propds, State, 그리고 Context는 리액트 네이티브가 동작하는 중에 데이터를 다루는데 사용된다. 
따라서, 앱이 종료되거나 다시 실행되면 Props와 State, Context에 있던 데이터는 사라지게 된다. 
이를 유지하기 위해 AsyncStorage를 사용하여 데이터를 앱 내에 저장할수있다. 

## 6.1 ContextAPI
Context는 부모 컴포넌트로부터 자식 컴포너트로 전달되는 데이터의 흐름과는 상관없이, 전역적으로 사용되는 데이터를 다룬다. 
그리고 전역 데이터를 Context에 저장한 후, 필요한 컴포넌틍서 해당하는데이터를 불러와 사용한다. 

Context를 사용하기 위해서는 Context API를 사용하여 Context의 Provider와  Consumer을 생성한다. 
Context에 저장된 데이터를 사용하기 위해서는 공통 부모 컴포넌트에 Context의 프로바이더를 사용하여 데이터를 제공, 사용하려는 컴포넌트에서 컨슈머를 사용하여 데이터를 소비한다. 

## 6.1 AsyncStorage

리액트에서 데이터를 다루는  Props와  State, Context는 휘발성이기 때문에, 데이터를 유지할 방법이  필요하다. 

AsyncStorage는 앱 내에서 간단하게 데이터를 저장할 수 있는 저장소이다. 

Key-value 저장소로써 간단하게 앱 내에 데이터를 저장하는데 유용하다. 

최근에는 커뮤니티 라이브러리로  분리되어서 따로 깔아서 사용해야함