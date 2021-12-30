# netflix-clone

## 1) Building Router

- https://github.com/yoojh9/react-master/commit/afd6a80f24819d9ca651b91b210ce865d3cdf9cd

<br><br>

## 2) Create Header

### 1) Part 1

- https://github.com/yoojh9/react-master/commit/cd3925bc34d727c1c4909ecd190f6026d9fc685c

### 2) Part 2

- 무언가 정중앙에 위치시키고 싶으면 아래와 같이 Css 속성을 쓰면 됨

```TypeScript
    left: 0;
    right: 0;
    margin: 0 auto;
```

- 같은 도메인으로 이동시킬 때는 \<a\> 태그 말고 react-router-dom의 \<Link\> 태그를 사용한다.

- **useRouteMatch()** : URL이 어느 라우팅에 위치하고 있는지 알려줌.
