# Animation Test

<br>

# 1. Framer Motion

- [Framer Motion](https://www.framer.com/motion/) 라이브러리를 사용할 것임
- API 문서: https://www.framer.com/docs/

```
  $ npm install framer-motion
```

<br>

- 만약 \<div\>를 animation 하기를 원한다면 \<motion.div\>와 같이 작성해야 함
- 평범한 HTML 태그들이랑 똑같은데 앞에 motion을 붙여야 함

<br><br>

## 1) style component를 animation 시키기

```TypeScript
const Box = styled(motion.div)`
  width: 200px;
  height: 200px;
  background-color: white;
  border-radius: 15px;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 20px rgba(0, 0, 0, 0.06);
`;


function App() {
  return (
    <Wrapper>
      <Box animate={{borderRadius: "100px"}}>
      </Box>
    </Wrapper>
  );
}
```

<br><br>

# 2. Variants

- Variants를 사용하면 코드를 더 깔끔하게 유지할 수 있음
- https://github.com/yoojh9/react-master/commit/4da3b9892397bfc55c5e9643154257ad539bcf22

```TypeScript
// Variants 사용 전
function App() {
  <Wrapper>
    <Box
      transition={{ type: "spring", bounce: 0.8, delay: 1 }}
      initial={{ scale: 0 }}
      animate={{ rotateZ: 360, scale: 1 }} />
  </Wrapper>
}
```

<br>

```TypeScript
const myVars = {
  start: { scale: 0 },
  end: { rotateZ: 360, scale: 1 , transition: { type: "spring", bounce: 0.8, delay: 1 }}
}

function App() {
  return (
    <Wrapper>
      <Box variants={myVars} initial="start" animate="end" />
    </Wrapper>
  );
}

```

<br>

- motion에서는 기본적으로 부모에 적용되어 있는 animation은 자식에 그대로 적용 됨. 아래처럼 적용된다고 보면 됨

```TypeScript
<Box variants={boxVariants} initial="start" animate="end">
  <Circle initial="start" animate="end"/>
  <Circle initial="start" animate="end"/>
  <Circle initial="start" animate="end"/>
  <Circle initial="start" animate="end"/>
</Box>
```

<br>

- Circle 컴포넌트는 initial과 animate 속성을 그대로 가져가므로, circleVariants를 만들경우 아래와 같이 작성할 수 있음.

```TypeScript

const circleVariants = {
  start: {
    scale: 0
  },
  end: {
    scale: 1,
    transition: {
      type: "spring",
      duration: 5,
      bound: 0.8
    }
  }
}

function App() {
  return (
    <Wrapper>
      <Box variants={boxVariants} initial="start" animate="end">
        <Circle variants={circleVariants} />
        <Circle variants={circleVariants} />
        <Circle variants={circleVariants} />
        <Circle variants={circleVariants} />
      </Box>
    </Wrapper>
  );
}

```

<br><br>

---

# 3. Transition

## 1) [Orchestration](https://www.framer.com/docs/transition/#orchestration)

<br>

### (1) delayChildren

- When using variants, children animations will start after this duration
- 자식 컴포넌트에 직접 delay를 주지 않고, 부모 컴포넌트의 transitaion에 delayChildren 속성으로 줄 수 있음

```TypeScript
const boxVariants = {
  start: {
    opacity: 0,
    scale: 0,
  },
  end: {
    opacity: 1,
    scale: 1,
    transition: {
      type: "spring",
      duration: 2,
      bounce: 0.5,
      delayChildren: 2,
    }
  }
}

const circleVariants = {
  start: {
    opacity: 0
  },
  end: {
    opacity: 1,
    transition: {
      // delay: 2,
    }
  }
}
```

<br>

### (2) staggerChildren

- 자식 컴포넌트에 delay를 시차를 둘 수 있다.
- **staggerChildren: 0.5** 이렇게만 작성하면 자동으로 첫번쨰 자식에 0.5, 두번째 자식 컴포넌트에 0.5*2, n번쨰 자식 컴포넌트에 0.5*n의 딜레이를 줄 수 있다.
- https://github.com/yoojh9/react-master/commit/033cc9e3661749e25fd3ffd6ec2e456337ec41d9

<br><br>

---

# 4. Gesture

- https://www.framer.com/docs/gestures/
- whileHover
- whileTap
- drag
  - 기본값으로는 상하좌우 모두 드래그 되지만, drag="x" 와 같이 지정하면 좌우로만 드래그 됨
- whileDrag
  - backgroundColor: 'blue' 처럼 string 값을 넣으면 바로 변함
  - rgba(129, 236, 236,1.0)와 같이 숫자값을 쓰면 Motion이 그 값을 알아서 animate 해주므로, 점진적으로 바뀌는 것처럼 보인다.
- dragConstraints
  - 드래깅이 허용될 수 있는 영역을 지정함.
- dragSnapToOrigin
  - 드래그 했다가 놓으면 원래의 위치로 돌아옴

```
whileDrag={{ backgroundColor: 'rgba(129, 236, 236,1.0)' }}

```

- drag: https://github.com/yoojh9/react-master/commit/0dde5e109a6018a46c371c0bb72a7b1ca0bce0e1
- drag2: https://github.com/yoojh9/react-master/commit/38d1fecc34411e618bb9901a781be4ae5f42690f

<br><br>

---

# 5. Motion Value

- https://www.framer.com/docs/motionvalue/
- 애니메이션 내의 수치를 트래킹 할 때 필요하다.
- MontionValue는 업데이트 될 때 React Rendering Cycle(렌더링 사이클)을 발동시키지 않는다. 즉 MotionValue는 React의 State가 아니다.
- 예) 드래그를 왼쪽으로 하면 배경색이 빨간색으로 바뀌고, 오른쪽으로 하면 배경색이 파란색으로 변함.

```TypeScript
function App() {
  const x = useMotionValue(0);

  return (
    <Wrapper>
      <Box
        style={{ x: x }}
        drag="x"
        dragSnapToOrigin
      />
    </Wrapper>
  );
}
```

<br>

### 1) useMotionValue()

- Motion 값 추적
  - Motion 값은 값이 변할 때마다 렌더링 되지 않으므로 console.log()는 한번만 실행된다
  - Motion 값의 변화를 추적하기 위해서는 useEffect()를 이용하여 onChange() 핸들러를 호출한다.
- https://github.com/yoojh9/react-master/commit/017a8f903bcb0ce38d0822bdd8a55a7e3b55be73

```TypeScript
function App() {
  const x = useMotionValue(0);
  console.log('rendering:', x);
  useEffect(() => {
    x.onChange(() => console.log(x.get()))
  }, [x])
  return (
    <Wrapper>
      <Box
        style={{ x: x }}
        drag="x"
        dragSnapToOrigin
      />
    </Wrapper>
  );
}

```

<br>

### 2) useTransform()

- useTransform\<unknown, number\>(value: MotionValue\<number\>, inputRange: InputRange, outputRange: number[], options?: TransformOptions\<number\> | undefined)

```TypeScript
  const x = useMotionValue(0);  // -800 ~ 800 사이의 값
  const scale = useTransform(x, [-800, 0, 800], [2, 1, 0.1]);

  useEffect(() => {
    //x.onChange(() => console.log(x.get()))
    scale.onChange(() => console.log(scale.get())) // 0.1 ~ 2 사이의 값이 출력 됨
  }, [x])
```

- 실제로 왼쪽으로 드래그 하면 커지고, 오른쪽으로 드래그 하면 작아지는 scale을 적용하고 싶다면, style 속성에 scale 값을 넣어주어야 함
- https://github.com/yoojh9/react-master/commit/66eff18269302a113d1251ec268406822bb4a501

```TypeScript
<Wrapper>
  <Box
    style={{ x: x, scale: scale }}
    drag="x"
    dragSnapToOrigin
  />
</Wrapper>
```

- 좌우 드래그 할 때마다 배경색 바꾸기: https://github.com/yoojh9/react-master/commit/52774e701f235e64d38ee2024ba7b4ba5b1a66ee

<br>

### 3) useViewportScroll()

- https://www.framer.com/docs/motionvalue/##useviewportscroll
- useViewportScroll()은 스크롤의 MotionValue를 넘겨준다.
- useViewPortScroll()은 scrollX, scrollY, scrollXProgress, scrollYProgress 값을 리턴한다
- scrollX, scrollY는 스크롤한 픽셀 값이고, scrollXProgress, scrollYProgress는 스크롤 한 범위 값이며 0 ~ 1 사이의 값을 갖는다.
- 코드: https://github.com/yoojh9/react-master/commit/f3fead540e98909bc7c8cb716125fcdd41dc871e

```TypeScript
  const { scrollY, scrollYProgress } = useViewportScroll();

  useEffect(() => {
    scrollY.onChange(() => console.log(scrollY.get(), scrollYProgress.get()))
  }, [scrollY, scrollYProgress])
```

<br><br>

---

# 6. SVG Animation

- [fontawesome](https://fontawesome.com/): awesome한 SVG font들을 찾을 수 있음.
- 모든 svg는 path를 가지고 있고, path는 fill을 가지고 있다.
- \<path fill="currentColor"\> 에서 currentColor의 의미는 path가 Svg의 color를 가질거라는 의미이다.

```TypeScript
    <Wrapper>
      <Svg aria-hidden="true" focusable="false" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" >
        <path
          stroke='white'
          strokeWidth="2"
          fill="transparent"
          d="M224 373.12c-25.24-31.67-40.08-59.43-45-83.18-22.55-88 112.61-88 90.06 0-5.45 24.25-20.29 52-45 83.18zm138.15 73.23c-42.06 18.31-83.67-10.88-119.3-50.47 103.9-130.07 46.11-200-18.85-200-54.92 0-85.16 46.51-73.28 100.5 6.93 29.19 25.23 62.39 54.43 99.5-32.53 36.05-60.55 52.69-85.15 54.92-50 7.43-89.11-41.06-71.3-91.09 15.1-39.16 111.72-231.18 115.87-241.56 15.75-30.07 25.56-57.4 59.38-57.4 32.34 0 43.4 25.94 60.37 59.87 36 70.62 89.35 177.48 114.84 239.09 13.17 33.07-1.37 71.29-37.01 86.64zm47-136.12C280.27 35.93 273.13 32 224 32c-45.52 0-64.87 31.67-84.66 72.79C33.18 317.1 22.89 347.19 22 349.81-3.22 419.14 48.74 480 111.63 480c21.71 0 60.61-6.06 112.37-62.4 58.68 63.78 101.26 62.4 112.37 62.4 62.89.05 114.85-60.86 89.61-130.19.02-3.89-16.82-38.9-16.82-39.58z" >
        </path>
      </Svg>
    </Wrapper>
```

- SVG를 animate 하기 위해서는 path를 그냥 쓰는게 아니라 motion.path로 사용해야 한다.
- 코드: https://github.com/yoojh9/react-master/commit/8493239182b18405ec5800e099c5de9f39da2ef3

<br>

### 1) path 속성

- stroke: 선
- strokeWidth: 선 굵기
- fill: 색

<br>

### 2) pathLength

- SVG가 가지고 있는 속성
- 현재 우리 위치까지의 path의 길이
- 모든 거리 계산을 스케일링하여, 총 길이를 지정할 수 있음.

<br>

### 3) property마다 각각 다른 transition 설정하기

- 특정한 property의 transition 시간을 정할 수 있다.
- 아래 예제는 default로는 duration: 5초이지만 fill 프로퍼티는 delay: 5초 후 실행된다.

```TypeScript
  end: {
    fill: 'rgba(255, 255, 255, 1)',
    pathLength: 1,
    transition: {
      //duration: 5,
      default: {
        duration: 5,
      },
      fill: {
        duration: 2,
        delay: 3,
      }
    },
  }
```
