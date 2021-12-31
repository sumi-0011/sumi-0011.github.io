---
layout: single


date: 2021-12-30 22:09 +0800

title: 모각코처음하는사람들 1회차  2021.12.30 10시
author_profile: true# 왼쪽부분 프로필을 띄울건지
  
comments: true
categories: 
  - 모각코
tags: 
  - 모각코
  
---



---

## 목표

- solved.ac class 3 한문제 풀기

- **React 기반 Gatsby로 기술 블로그 개발하기**

  아래 링크를 토대로 개발

  https://www.inflearn.com/course/gatsby-%EA%B8%B0%EC%88%A0%EB%B8%94%EB%A1%9C%EA%B7%B8/dashboard



---

## 학습

### 백준 1992번 : 쿼드트리



#### 문제

​	흑백 영상을 압축하여 표현하는 데이터 구조로 쿼드 트리(Quad Tree)라는 방법이 있다. 흰 점을 나타내는 0과 검은 점을 나타내는 1로만 이루어진 영상(2차원 배열)에서 같은 숫자의 점들이 한 곳에 많이 몰려있으면, 쿼드 트리에서는 이를 압축하여 간단히 표현할 수 있다.

주어진 영상이 모두 0으로만 되어 있으면 압축 결과는 "0"이 되고, 모두 1로만 되어 있으면 압축 결과는 "1"이 된다. 만약 0과 1이 섞여 있으면 전체를 한 번에 나타내지를 못하고, 왼쪽 위, 오른쪽 위, 왼쪽 아래, 오른쪽 아래, 이렇게 4개의 영상으로 나누어 압축하게 되며, 이 4개의 영역을 압축한 결과를 차례대로 괄호 안에 묶어서 표현한다

![img](https://www.acmicpc.net/JudgeOnline/upload/201007/qq.png)

위 그림에서 왼쪽의 영상은 오른쪽의 배열과 같이 숫자로 주어지며, 이 영상을 쿼드 트리 구조를 이용하여 압축하면 "`(0(0011)(0(0111)01)1)`"로 표현된다. N ×N 크기의 영상이 주어질 때, 이 영상을 압축한 결과를 출력하는 프로그램을 작성하시오.



#### 해결

0과 1이 섞여있는 경우 왼쪽위, 오른쪽 위, 왼쪽 아래, 오른쪽 아래 와 같이 4개의 영상으로 나눈다. 

영상을 나누어야 한다는 판단을 위해선 0과1이 섞여있는지 확인해야 한다. 

arr안의 0의 개수가 0이거나 arr.length ** 2와 같으면 0과 1이 섞여있지 않다는것을 의미한다. 

섞여있지 않을떄는 그 숫자를 리턴해주고,

섞여있는 경우 영상을 네 부분으로 나누어 재귀를 이용해 앞의 과정을 반복하면 된다. 

![image](https://user-images.githubusercontent.com/49177223/147750730-28c875ee-3764-467e-8024-120081aafef4.png)

#### 코드

```py
def func(arr):
    cnt = 0
    for a in arr:
        cnt += a.count('0')
    if len(arr)*len(arr) == cnt:
        # 모두 0
        return "0"
    elif cnt ==0:
        #모두 1
        return "1"
    else:
        m= len(arr) // 2
        # [row[j:j + m] for row in field[i:i + n]]
        arr1 = [row[0:m] for row in arr[0:m]]
        arr2 = [row[m:len(arr)] for row in arr[0:m]]
        arr3 = [row[0:m] for row in arr[m:len(arr)]]
        arr4 = [row[m:len(arr)] for row in arr[m:len(arr)]]
        result = func(arr1)+func(arr2)+func(arr3)+func(arr4)
        return ("("+result+")")


if __name__ == '__main__':
    n = int(input())
    input_arr = []
    for _ in range(n):
        input_arr.append(list(input())) #문자열을 그대로 list에 넣으면 한글자씩 분리되어서 넣어진다.

    print(func(input_arr))
```



![image](https://user-images.githubusercontent.com/49177223/147750249-fcb81281-0c27-428a-97d5-3a3635f2afc8.png)



### Gatsby로 기술 블로그 개발하기

https://www.inflearn.com/course/gatsby-%EA%B8%B0%EC%88%A0%EB%B8%94%EB%A1%9C%EA%B7%B8/dashboard

- 섹션 1. 간단하게 페이지 띄워보기
- 섹션 2. 글 목록을 띄워 줄 메인페이지 구현하기
- 섹션 3. 메인 페이지에 실제 데이터 띄어보기



섹션 3 에서 `gatsby-plugin-image 라이브러리` 사용에서 에러가 너무 많이나 힘들었지만

결국 해결하고, 해결하는 과정 동안에 코드를 더욱 이해하는 과정이 되었던것 같다. 



- **Gatsby** 에 대해서
- EmotionJs 라이브러리란, 
- 메인 페이지 구성 및 반응형 디자인
- markdown 파일 추가, 세팅
- gatsby-plugin-image 라이브러리로 최적화된 사진 띄워주기

#### 결과물

![image](https://user-images.githubusercontent.com/49177223/147758527-1c582541-bf58-4aa9-a44d-b9a1f81dfa2c.png)

