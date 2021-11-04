– Orientation assignment 

• Angle histogram에서 가장 큰 값을 가지는 angle을 keypoint의 방향으로 설정

• 가장 큰 angle * 0.8보다 큰 다른 angle도 keypoint의 방향으로 설정



```
    x, y = keypoints[i].pt
        orient_hist = np.zeros(36, ) #point의 방향을 저장
        for row in range(-8, 8):
            for col in range(-8, 8):
                p_y = int(y + row)
                p_x = int(x + col)
                if p_y < 0 or p_y > src.shape[0] - 1 or p_x < 0 or p_x > src.shape[1] - 1:
                    continue # 이미지를 벗어나는 부분에 대한 처리
                gaussian_weight = np.exp((-1 / 16) * (row ** 2 + col ** 2))
                orient_hist[int(angle[p_y, p_x] // 10)] += magnitude[p_y, p_x] * gaussian_weight
      print("orient_hist",orient_hist)
        show_patch_hist(orient_hist)
```

![image](https://user-images.githubusercontent.com/49177223/138601569-64627e07-3195-4bff-951a-0e30a149f852.png)

![image](https://user-images.githubusercontent.com/49177223/138601576-ac3613df-6b96-4aca-a96f-5a968a297c54.png)

```
orient_hist [2.30414493e+00 1.13933436e+00 1.08322124e+01 1.05674797e+01
 7.20600913e+00 5.63545982e+00 9.77894485e+00 7.03291101e+00
 7.41756951e+00 1.23612981e+01 2.66776142e+00 1.68950020e+00
 8.01548059e+00 7.23506877e-01 5.70975292e+00 1.75547848e+00
 4.49051154e+00 2.47570942e+00 1.02779129e+01 5.13398887e+01
 1.82486957e+03 1.16258356e+03 4.52954652e+02 3.68113602e+01
 1.76481273e+02 3.13267847e+02 3.82965271e+02 1.01655360e+02
 3.65360644e+02 1.17656922e+03 1.94865581e+02 1.92427365e+02
 3.72048078e+02 2.98540751e+02 4.65930879e+02 1.83998628e+02]
```

```
orient_hist [1.45686493e+02 5.07971763e+02 1.34437350e+02 2.74535185e+02
 4.15082935e+01 2.83722419e+02 7.92071696e+02 6.73305704e+02
 1.52323016e+03 4.32530791e+02 1.75133836e+02 1.94816847e+01
 1.98111457e+00 1.23751975e+01 0.00000000e+00 2.96865080e+01
 2.29850812e+00 0.00000000e+00 0.00000000e+00 8.26496215e-01
 7.72764415e+00 6.26378116e+00 2.78859570e-02 3.26889308e-01
 5.10922753e+00 0.00000000e+00 3.83188406e+01 1.12068919e+01
 9.71054925e+01 1.15716138e+02 1.42691886e+02 4.50204436e+02
 3.55548547e+02 3.65952576e+02 2.22909744e+02 5.58456324e+02]
```





max 구해보기

```
print("orient_hist max",np.max(orient_hist),np.argmax(orient_hist))
결과
orient_hist max 1824.8695675235501 20
orient_hist max 1523.2301553815455 8
```



```

```

