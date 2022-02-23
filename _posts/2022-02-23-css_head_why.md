---
layout: single


date: 2022-02-23 20:09 +0800

title:  CSS를 head 위에 둬야하는 이유는 무엇일까요?

  
comments: true
categories: 
  - Algo
tags: 
  - hash
  
---



html에서는 css를 `<link>` 태그를 이용하여 import합니다. 
그런데 이 `<link>`태그를 왜 `<head>`내에 선언해야 할까요?

### `<head>`안에 `<link>`를 넣는 이유
`<head>`안에 `<link>`를 넣는 이유는 최적화된 웹사이트를 구출할때 적절한 명세의 일부입니다.
페이지가 처음 로드되면, HTML과 CSS가 동시에 parsing되는데,  이때 HTML은 DOM을 만들고, CSS는 CSSOM(CSS Object Model)을 만들게 됩니다. 

두가지 모두 웹사이트에서 시작적인 부분을 만드는데 필요해 빠른 "first meaningful paint"를 가능하게 합니다. 하지만 문서 최하단 즉, `<head>`가 아닌곳에 stylesheet를 두는 것은 많은 브라우저 상에서 점진적 렌더링을 금지하게 되고, 사용자가 빈화면을 보게 만들게 됩니다. 



> first meaningful paint : 사이트의 성능 지표중 하나, 사이트 최적화의 범주