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

- code: https://github.com/yoojh9/react-master/commit/ea8d706ec0110150bedc43695ca2622fab98c401

<br>

### 2) 홈 화면 배너 이미지

- code : https://github.com/yoojh9/react-master/commit/8adadd723b3fce69af3b2c646785e1e033bddd8a

<br><br>

## 4) Slider

### 1) Slider 1

- React는 key 값이 다르면 서로 다른 컴포넌트라고 생각함. 그래서 새 key를 가지는 Row를 생성하려고 할 때, 원래 있던 Row는 파괴되므로 key값을 변경하면 AnimatePresence를 통해 애니메이션을 발생시킬 수 있다.
- 그러므로 Row를 하나만 render하고 key만 바꾸면 여러 Row가 서로 옆에 붙어있는 것 같은 효과를 줄 수 있다. 무한히 이어나갈 수 있음.

```TypeScript
<AnimatePresence>
    <Row
        key={index}
        variants={rowVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
    >
        <Box/>
        <Box/>
        <Box/>
    </Row>
</AnimatePresence>
```

- window.outerWidth, window.outerHeight을 통해 사용자 브라우저의 크기를 알 수 있음.

```TypeScript
const rowVariants = {
    hidden: {
        x: window.outerWidth,
    },
    visible: {
        x: 0
    },
    exit: {
        x: -window.outerWidth
    }
}
```

- 코드: https://github.com/yoojh9/react-master/commit/d8132cfd061f49651d00f05f3235323aa68c3f62

<br>

### 2) Slider 2

- 현재 코드에 문제가 있는데, 계속 클릭해서 index를 늘리면 이전 Row 애니메이션이 exit 되지 않았는데, 현재 row가 animate 돼서 겹쳐보이는 현상이 나타난다.
- 이 문제를 해결하기 위해 leaving이라는 state를 두고 \<AnimatePresence\>의 onExitComplete={} 속성에서 state를 변경하는 작업을 추가한다.

```TypeScript

const increaseIndex = () => {
    if(leaving) return;
    toggleLeaving();
    setIndex(prev => prev+1)
}

const toggleLeaving = () => setLeaving(prev => !prev)


return (
    <Wrapper>
        ...
        <Slider>
            <AnimatePresence onExitComplete={toggleLeaving}>
            ...
        </Slider>
    </Wrapper>
)
```

- Slider에 실제 데이터 넣기: https://github.com/yoojh9/react-master/commit/bd9fdc77cb49ba38f48380982622b3212d556ed0

<br><br>

## 5) Box Animation

### 1) Box Animation 1

- 박스 영역에 hover하면 scale이 증가하도록 변경
- 첫번째와 끝의 박스는 scale up 시 화면이 잘리므로, **transform-origin**을 사용하여 scale 방향을 조정한다

```TypeScript
const Box = styled(motion.div)<{bgPhoto: string}>`
    background-color: white;
    background-image: url(${(props) => props.bgPhoto});
    background-size: cover;
    background-position: center center;
    height: 200px;
    color: red;
    font-size: 16px;
    &:first-child {
        transform-origin: center left;
    }
    &:last-child {
        transform-origin: center right;
    }
`;
```

- 코드: https://github.com/yoojh9/react-master/commit/3c11f852f352e0de63480103675926980bf84955

<br>

### 2) Box Animation 2

아래 코드와 같이 부모 컴포넌트가 variants를 가지고 있고, whileHover에 variants의 이름을 넣어준 상태면, 이건 자동적으로 자식에게 상속된다. \<Info whileHover="hover" initial="nomal" \>처럼 prop이 상속된다.

```TypeScript
<Box
    key={movie.id}
    variants={boxVariants}
    whileHover="hover"
    initial="normal"
    bgPhoto={makeImagePath(movie.backdrop_path, "w500")}
>
    <Info />
</Box>
```

- 코드: https://github.com/yoojh9/react-master/commit/0900f8c7b4f48db21abaf76c841069d092ec7998

- Box 컴포넌트 position:relative 지우고 (이미 Row 컴포넌트가 position: absolute라서) boxVariants hover에서 zIndex 지움 (https://github.com/yoojh9/react-master/commit/2233e1094803bde7b74464701b34e0f0e37e4866)

<br><br>

## 6) Movie Modal

### (1) Movie Modal Part 1

#### useHistory()

- useHistory() 훅을 사용하면 URL을 왔다 갔다 할 수 있다.
- 여러 라우트 사이를 이동할 수 있다.

<br>

#### useRouteMatch()

- 지금 그 URL에 있는지 아닌지를 판단할 수 있다.

- 코드: https://github.com/yoojh9/react-master/commit/94e8e3a7b4ba35579092a53b81c8cf225d556db1

<br>

### (2) Movie Modal Part 2

- 스크롤을 해도 화면 중앙에 Modal을 보이게 하고 싶으면 Framer Motion의 useViewportScroll()의 scrollY값을 Motion 영역의 top 값으로 넣어주면 된다.
- 코드: https://github.com/yoojh9/react-master/commit/24eb66c5b24e1ef76d1f93230184f25e42dc36ba

<br>

### (3) Movie Modal Part 3
