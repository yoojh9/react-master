# Animations and Pseudo Selectors

<br><br>

### 1. Pseudo Selector

```
const Box = styled.div`
  height: 200px;
  width: 200px;
  background-color: tomato;
  display: flex;
  justify-content: center;
  align-items: center;
  animation: ${rotateAnimation} 1s linear infinite;
  span {
    font-size: 36px;
    &:hover { // span:hover{} 와 같음
      font-size: 50px;
    }
    &:active {
      opacity: 0;
    }
  }
  /* span:hover {
    font-size: 40px;
  } */
`;


function App() {
  return <Wrapper>
      <Box>
        <span>😄</span>
      </Box>
    </Wrapper>
}
```

<br>

### 2. StateSelector: Box 태그 안에 span 외에 다른 태그가 와도 스타일을 적용시키고 싶다면?

이렇게 작성하면 span 외에 다른 태그가 와도 스타일이 적용됨. 

```
const Emoji = styled.span`
  font-size: 36px;
`;

const Box = styled.div`
  height: 200px;
  width: 200px;
  background-color: tomato;
  display: flex;
  justify-content: center;
  align-items: center;
  animation: ${rotateAnimation} 1s linear infinite;
  ${Emoji} {
    font-size: 36px;
    &:hover { // span:hover{} 와 같음
      font-size: 50px;
    }
    &:active {
      opacity: 0;
    }
  }
  /* span:hover {
    font-size: 40px;
  } */
`;


function App() {
  return <Wrapper>
      <Box>
        <Emoji as="p">😄</Emoji>
      </Box>
    </Wrapper>
}

```