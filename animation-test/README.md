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
- 코드: https://github.com/yoojh9/react-master/commit/4553675fbba3a77f13090c190bf496e1f5391839

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

<br><br>

# 7. AnimatePresence

- https://www.framer.com/docs/animate-presence/
- AnimatePresence는 Component인데, React 트리에서 컴포넌트가 제거될 때 제거되는 컴포넌트에 애니메이션 효과를 줄 수 있다.

```TypeScript
function App() {
  const [showing, setShowing] = useState(false);
  const toggleShowing = () => setShowing((prev) => !prev);

  return (
    <Wrapper>
      <button onClick={toggleShowing}>Click</button>
      {showing ? <Box/> : null}
    </Wrapper>
  );
}
```

<br>

- 위와 같은 코드가 있고, \<Box\> 컴포넌트가 사라질 때 에니메이션을 적용하고 싶다면 \<AnimatePresence\>를 사용한다.
- AnimatePresence의 딱 한가지 규칙은 visible한 상태여야 하고, AnimatePresence의 내부에는 condition(조건문)이 있어야 한다라는 점이다.
- AnimatePresence는 내부에서 나타나거나 사라지는 게 있다면 그것을 animate 할 수 있게 해준다.
- 코드: https://github.com/yoojh9/react-master/commit/c73c9ef1224d2c988018133f194c7ccae4e2b28b

<br><br>

# 8. Slide

- AimatePresence를 사용하여 slider를 만들 수 있다.
- 코드: https://github.com/yoojh9/react-master/commit/d2a5f87b16c53c47ce9a10994f5a99fe23cc19c9

```TypeScript
const boxVariants = {
  invisible: {
    x: 500,
    opacity: 0,
    scale: 0
  },
  visible: {
    x: 0,
    opacity: 1,
    scale: 1,
    transition: {
      duration: 1,
    }
  },
  exit: {
    x: -500,
    opacity: 0,
    scale: 0,
    transition: {
      duration: 1,
    }
  }
}


function App() {
  const [visible, setVisible] = useState(1);
  const nextPlease = () => setVisible(prev => prev === 10 ? 10 : prev+1);
  const prevPlease = () => setVisible(prev => prev === 1 ? 1 : prev-1);


  return (
    <Wrapper>
      <AnimatePresence>
        {
          [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((number) =>
            number === visible ? (
              <Box
                variants={boxVariants}
                initial="invisible"
                animate="visible"
                exit="exit"
                key={number}>
                  {number}
              </Box>
            ) : null
          )
        }
      </AnimatePresence>
      <button onClick={nextPlease}>next</button>
      <button onClick={prevPlease}>prev</button>
    </Wrapper>
  );
}
```

- 위의 코드에서 문제가 있는데, prev 버튼을 누르면 next 버튼과 똑같이 오른쪽에서(x:500) 나타나서 왼쪽으로(x:-500) 사라진다. prev는 왼쪽에서 나타나서 오른쪽으로 사라지게 만들고 싶음.

<br>

## 1) custom

- custom은 variants에 데이터를 보낼 수 있게 해주는 property이다.
- custom 값을 variants에 보내서 prev와 next 애니메이션을 구현할 수 있다.
- 코드: https://github.com/yoojh9/react-master/commit/cf8da9412cf5c77f57a049c03719c024f09f143c

<br>

## 2) exitBeforeEnter

현재 코드는 entry 애니메이션과 exit 애니메이션이 동시에 실행되는데, exitBeforeEnter 프로퍼티를 사용하면 exit 애니메이션이 끝난 후 다음 element들이 올 수 있게 해준다

- 코드: https://github.com/yoojh9/react-master/commit/ec57a4a5b6d4165d23f259200c3f168400f8c1a2

<br><br>

# 9. LayoutAnimation

- Framer Motion은 무언가 외부의 힘에 의해 바뀐 것을 감지함
- layout이라는 prop을 element에게 주면 그 element는 layout이 바뀔 때 알아서 animation이 됨
- style이나 css는 State에 의해 바뀔 수 있고 그 변화가 element를 움직이게 함.
- 코드: https://github.com/yoojh9/react-master/commit/6d3e72adb6a5e1fb743e39e608d55942b8cab197

```TypeScript
function App() {
  const [clicked, setClicked] = useState(false);
  const toggleClicked = () => setClicked(prev => !prev);

  return (
    <Wrapper onClick={toggleClicked}>
        <Box style={{
            justifyContent: clicked ? 'center' : 'flex-start',
            alignItems: clicked ? " center": "flex-start"
          }}
        >
          <Circle layout></Circle>
        </Box>
    </Wrapper>
  );
}
```

<br><br>

# 10. Shared Layout Animation

- **layoutId**: layoutId prop에 같은 값을 주면 Framer Motion은 같은 UI Component라고 생각한다.
- Framer는 같은 layoutId 컴포넌트를 연결하고 애니메이션을 만든다.
- 아래 코드는 layoutId prop이 없었을 경우에는 (hide, show), (show, hide)가 각각 일어났었다.
- 하지만 layoutId를 주면 클릭 시 hide, show가 아닌 왼쪽에서 오른쪽으로 circle 컴포넌트가 이동하고, 다시 한번 클릭하면 오른쪽에서 왼쪽으로 circle 컴포넌트가 이동하는 것을 볼 수 있다.
- 코드: https://github.com/yoojh9/react-master/commit/3879a761e4f84ccb9f8ec80a9826eea1ecb04c87

```TypeScript
function App() {
  const [clicked, setClicked] = useState(false);
  const toggleClicked = () => setClicked(prev => !prev);

  return (
    <Wrapper onClick={toggleClicked}>
        <Box >
          { !clicked ? <Circle layoutId="circle"/> : null}
        </Box>
        <Box >
          { clicked ? <Circle layoutId="circle"/> : null}
        </Box>
    </Wrapper>
  );
}
```

<br><br>

# 11. Shared Layout Animation

<img src="./image1.png" width="400px"/>
<img src="./image2.png" width="400px"/>

- 위 이미지처럼 박스 클릭 시 해당 박스가 사라지고, 화면 중간에 오는 애니메이션을 만들고 싶다면, layoutId로 연결해주면 된다.
- 아래 코드는 첫번째 박스 클릭 시 화면 중간에 박스가 새로 뜨는데 layoutId로 연결하여, 클릭 시 첫번째 박스는 사라지는 것처럼 보인다
- 코드: https://github.com/yoojh9/react-master/commit/cb8b4a407cb0b9e786eddc052dbd017365f91fbd

```TypeScript
function App() {
  const [clicked, setClicked] = useState(false);
  const toggle = () => setClicked(prev => !prev);

  return (
    <Wrapper onClick={toggle}>
      <Grid>
        <Box layoutId="hello"/>
        <Box />
        <Box />
        <Box />
      </Grid>
      <AnimatePresence>
        {clicked ?
          <Overlay
            initial={{ backgroundColor: 'rgba(0, 0, 0, 0)' }}
            animate={{ backgroundColor: 'rgba(0, 0, 0, 0.5)'}}
            exit={{ backgroundColor: 'rgba(0, 0, 0, 0)' }}>
              <Box layoutId="hello" style={{width:400, height: 200}}/>
          </Overlay> :
          null}
      </AnimatePresence>
    </Wrapper>
  );
}

```

<br>

## 1) 다른 박스를 선택할 때도 적용하려면

- 코드: https://github.com/yoojh9/react-master/commit/887f04496706370ababb798af9f84b7455285551
