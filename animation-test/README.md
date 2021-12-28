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

