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
- whileHover
- whileTap
- drag
- whileDrag
    - backgroundColor: 'blue' 처럼 string 값을 넣으면 바로 변함
    - rgba(129, 236, 236,1.0)와 같이 숫자값을 쓰면 Motion이 그 값을 알아서 animate 해주므로, 점진적으로 바뀌는 것처럼 보인다.
```
whileDrag={{ backgroundColor: 'rgba(129, 236, 236,1.0)' }}

```
  
