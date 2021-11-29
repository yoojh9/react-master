# Styled Components 2

<br><br>

## Styled Component 몇가지 트릭


### 1. as
 
- 컴포넌트의 태그는 바꾸고 싶은데, 스타일은 유지하고 싶은 경우, 'as'를 사용하여 스타일은 유지하고 태그만 변경할 수 있음
   
```
const Btn = styled.button`
  color: white;
  background-color: tomato;
  border: 0;
  border-radius: 15px;
`;

function App() {
  return <Father>
      <Btn>Log in</Btn>
      <Btn as="a" href="/">Log in</Btn>
    </Father>
}

```

<br><br>

### 2. 공통 attr 추가

```

const Input = styled.input.attrs({required:true, minLength: 10})`
  background-color: yellow;
`;

```
