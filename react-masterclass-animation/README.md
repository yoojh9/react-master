# Animations and Pseudo Selectors

<br><br>

### 1. Pseudo Selector

```TypeScript
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
    &:hover { // span:hover{} μ κ°μ
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
        <span>π</span>
      </Box>
    </Wrapper>
}
```

<br>

### 2. Box νκ·Έ μμ span μΈμ λ€λ₯Έ νκ·Έκ° μλ μ€νμΌμ μ μ©μν€κ³  μΆλ€λ©΄?

μ΄λ κ² μμ±νλ©΄ span μΈμ λ€λ₯Έ νκ·Έκ° μλ μ€νμΌμ΄ μ μ©λ¨. 

```TypeScript
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
    &:hover { // span:hover{} μ κ°μ
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
        <Emoji as="p">π</Emoji>
      </Box>
    </Wrapper>
}

```
