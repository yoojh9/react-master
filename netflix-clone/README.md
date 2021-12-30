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

- 코드: https://github.com/yoojh9/react-master/commit/d4de9db43d5b09c2457243374c506f21715b1c39

<br>

### 3) Animation Nav

- **scaleX**: scaleX로 가로축 확장
- **transform-origin**: 변화가 시작하는 위치

- 아래처럼 transform-origin을 right center로 설정하면 input이 scaleX가 0->1로 될 때 중간에서 나오는게 아니라 오른쪽에서부터 나오는 것으로 보임.

```TypeScript
const Input = styled(motion.input)`
    transform-origin: right center;
`
```

- 현재는 검색 아이콘 이후에 input이 출력되는데, 검색 아이콘이랑 input이 겹쳐 보이게 하기 위해 position:absolute를 사용함
- 코드: https://github.com/yoojh9/react-master/commit/6e381fadbdac37050dabd132829ad85458cf3648

<br>

### 4) useAnimation()

- Motion Animation 함수 코드로 만들어보기
- 코드: https://github.com/yoojh9/react-master/commit/f0a44224809bdd12ef7495b4de85ad17a1746675

```TypeScript
const toggleSearch = () => {
    if(searchOpen){
        // trigger the close animation
        inputAnimation.start({
            scaleX: 0
        });
    } else {
        // trigger the open animation
        inputAnimation.start({
            scaleX: 1
        })
    }
    setSearchOpen(prev => !prev);
}
```

<br>

### 5) useViewportScroll()

- 스크롤 할 때 헤더 컬러값 변경하는 기능 추가
- 코드: https://github.com/yoojh9/react-master/commit/71f692609fc343e7573fe585461fdcf9c02e717f

<br><br>

## 3) Home Screen

### 1) get data from The Movie DB API

- API: https://developers.themoviedb.org/3/getting-started/introduction

- get Images: https://developers.themoviedb.org/3/getting-started/images
