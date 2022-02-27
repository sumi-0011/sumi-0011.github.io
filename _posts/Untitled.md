

### React.memo

컴포넌트의 props가 바뀌지 않았다면, 리 렌더링을 방지하여 컴포넌트의 리렌더링 성능 최적화를 해줄 수 있는 함수

=> 컴포넌트에서 리 렌더링이 필요한 상황에서만 리 렌더링을 하도록 설정할 수 있다. 





### useReducer



```
const [state, dispatch] = useReducer(reducer, initialState);
```

- `state` 는 우리가 앞으로 컴포넌트에서 사용 할 수 있는 상태를 가르키게 되고,
- `dispatch` 는 액션을 발생시키는 함수이다. 
- `dispatch`함수 사용방법 :  `dispatch({ type: 'INCREMENT' })`.



- action에 객체가 전달되는데 그 안에 type이라는 프로퍼티를 주로 성정해서 사용한다. 
- type 프로퍼티를 이용해 switch문으로 분기
- state는 useReducer를 통해 저장된 변수이고
- 주로 **initialState라는 객체**에 초기 정보를 담아 useReducer에 전달한다. 

예시

```
function reducer(state, action) {
  //reducer함수에서는 새로운 상태를 만들때 불변성을 지켜주어야 하기 때문에 spread연산자를 사용한다.

  switch (action.type) {
    case "CHANGE_INPUT":
      return {
        ...state,
        inputs: {
          ...state.inputs,
          [action.name]: action.value,
        },
      };
    case "CREATE_USER":
      return {
        inputs: initialState.inputs,
        users: state.users.concat(action.user),
      };
   }
}


const onChange = useCallback((e) => {
    const { name, value } = e.target;
    dispatch({
      type: "CHANGE_INPUT",
      name,
      value,
    });
  });
  const onCreate = useCallback(() => {
    dispatch({
      type: "CREATE_USER",
      user: {
        id: nextId.current,
        username,
        email,
      },
    });
    nextId.current += 1;
  }, [username, email]);
```



### useReducer vs useState 무엇을 쓰는게 좋을까?

정해진 답은 없다. 상황에 따라 맞춰 쓰면 된다. 

예를 들어, 컴포넌트에서 관리하는 값이 하나고, 그 값이 단순한 숫자나 문자열,  boolean값이라면 `useState`를 사용하는 것이 편하다. 

```javascript
const [value, setValue] = useState(true);
```

하지만 만약에 컴포넌트에서 관리하는 값이 여러개가 되고, 상태의 구조가 복잡해지면 `useReducer`로 관리하는 것이 편할수도 있다. 

필자의 경우 setter를한 함수에서 여러번 사용해야 할때 `useReducer`사용을 고민한다고 합니다. 



> useReducer 은 상태 업데이트, 로직 분리에 사용하며 `useState`와는 다르게 컴포넌트 밖에 작성이 가능해 다은파일에서 작성 후 불러와서 사용하는 것 또한 가능하다. 
>
> 또한 컴포넌트에서 관리하는 값이 여러개가 되어 상태의 구조가 복합해질때 사용한다. 