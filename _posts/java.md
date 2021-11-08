# 컴프 2 java 코테



## 마침표 . 으로 split

split메소드의 인자는 정규표현식인데 

정규표현식에서 `.`는 스ㅍ셜 문자로 any character를 의미한다.

따라서 

1. \\.
2. [.]

이 두가지의 방법을 사용해야 한다. 



## HashMap

HashMap은 내부에 '키'와 '값'을 저장하는 자료 구조를 가지고 있습니다.

 HashMap은 해시 함수를 통해 '키'와 '값'이 저장되는 위치를 결정하므로, 사용자는 그 위치를 알 수 없고, 삽입되는 순서와 들어 있는 위치 또한 관계가 없습니다. 

### 선언

```
HashMap<String,String> map = new HashMap<String,String>();//HashMap생성
```





### 값 추가

```
map.put(1,"사과");
```



### 값 제거

```
map.remove(1); //key값 1 제거
map.clear(); //모든 값 제거
```



### 값 출력

```
HashMap<Integer,String> map = new HashMap<Integer,String>(){{//초기값 지정
    put(1,"사과");
    put(2,"바나나");
    put(3,"포도");
}};
		
System.out.println(map); //전체 출력 : {1=사과, 2=바나나, 3=포도}
System.out.println(map.get(1));//key값 1의 value얻기 : 사과
		
//entrySet() 활용
for (Entry<Integer, String> entry : map.entrySet()) {
    System.out.println("[Key]:" + entry.getKey() + " [Value]:" + entry.getValue());
}
//[Key]:1 [Value]:사과
//[Key]:2 [Value]:바나나
//[Key]:3 [Value]:포도

//KeySet() 활용
for(Integer i : map.keySet()){ //저장된 key값 확인
    System.out.println("[Key]:" + i + " [Value]:" + map.get(i));
}
//[Key]:1 [Value]:사과
//[Key]:2 [Value]:바나나
//[Key]:3 [Value]:포도
```

**특정 key값의 value**를 가져오고싶다면 **get(key)**를 사용하면 되고 

**전체**를 출력하려면 **entrySet()**이나 keySet()메소드를 활용하여 Map의 객체를 반환받은 후 출력하면 됩니다. 

**entrySet()은 key와 value 모두가 필요할 경우** 사용하며 

**keySet()**은 key 값만 필요할 경우 사용



### key값이 있는지 확인

HashMap에 containsKey 메소드에 키값을 넘겨주면

해당 키값이 HashMap에 있을경우 true/ 없을 경우 false

```
System.out.println(map.containsKey("A"));

출처: https://programacion.tistory.com/189 [KA's Regalo]
```





## ArrayList 



### 정렬 

: 오름차순 / 내림차순 / 대소문자 구분없이 정렬하기

```
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
public class SortArrayList {
    public static void main(String[] args) {
    	// ArrayList 준비
        ArrayList<String> list = new ArrayList<>(Arrays.asList("C", "A", "B", "a"));
        System.out.println("원본 : " + list); // [C, A, B, a]
        // 오름차순으로 정렬
        Collections.sort(list);
        System.out.println("오름차순 : " + list); // [A, B, C, a]
        // 내림차순으로 정렬
        Collections.sort(list, Collections.reverseOrder());
        System.out.println("내림차순 : " + list); // [a, C, B, A]
        // 대소문자 구분없이 오름차순
        Collections.sort(list, String.CASE_INSENSITIVE_ORDER);
        System.out.println("대소문자 구분없이 오름차순 : " + list); // [a, A, B, C]
        // 대소문자 구분없이 내림차순
        Collections.sort(list, Collections.reverseOrder(String.CASE_INSENSITIVE_ORDER));
        System.out.println("대소문자 구분없이 내림차순 : " + list); // [C, B, a, A]
	}
}


출처: https://hianna.tistory.com/569 [어제 오늘 내일]
```



또는

=> List객체의 sort메소드 이용

```
public class SortArrayList {
    public static void main(String[] args) {
        // ArrayList 준비
        ArrayList<String> list = new ArrayList<>(Arrays.asList("C", "A", "B", "a"));
        System.out.println("원본 : " + list); // [C, A, B, a]
        // 오름차순으로 정렬
        list.sort(Comparator.naturalOrder());
        System.out.println("오름차순 : " + list); // [A, B, C, a]
        // 내림차순으로 정렬
        list.sort(Comparator.reverseOrder());
        System.out.println("내림차순 : " + list); // [a, C, B, A]
        // 대소문자 구분없이 오름차순 정렬
        list.sort(String.CASE_INSENSITIVE_ORDER);
        System.out.println("대소문자 구분없이 오름차순 : " + list); // [a, A, B, C]
        // 대소문자 구분없이 내림차순 정렬
        list.sort(Collections.reverseOrder(String.CASE_INSENSITIVE_ORDER));
        System.out.println("대소문자 구분없이 내림차순 : " + list); // [C, B, a, A]
    }
}

출처: https://hianna.tistory.com/569 [어제 오늘 내일]
```





SQLD 자격증