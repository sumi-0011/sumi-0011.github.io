#### 종료조건 확인

입력의 종료조건으로 맨 마지막에 점 하나(".")가 들어온다.

```py
import sys
while True:
    s = sys.stdin.readline().strip('\n')
    if(s == '.'):
        break;
    print(s)
```



